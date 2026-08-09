import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

type RateLimitResult =
  | { success: true }
  | { success: false; error: string; status: number };

const SYSTEM_PROMPT =
  'You are Sandeep AI, a friendly virtual assistant for Sandeep Meche\'s portfolio. Sandeep is a frontend engineer based in Nepal who builds fast, accessible and conversion-focused digital experiences. His core strengths are React, Next.js, TypeScript, JavaScript, Tailwind CSS, responsive UI systems, Framer Motion, accessibility, performance, Firebase, Supabase, REST APIs and n8n automation. His work includes a performance-first portfolio system, conversion-focused commerce UI, and workflow automation interfaces. Answer politely and concisely in two or three short sentences. Suggest the Contact section when someone wants to hire or collaborate.';

const configuredProductionOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const PRODUCTION_ORIGINS = new Set([
  'https://www.sandeepmeche.com.np',
  'https://sandeepmeche.com.np',
  ...configuredProductionOrigins,
]);

const DEVELOPMENT_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://127.0.0.1:3003',
  'http://127.0.0.1:5173',
]);

const MAX_BODY_BYTES = 12000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;
const MAX_TOTAL_MESSAGE_LENGTH = 2500;
const MAX_TOKENS_RESPONSE = 220;
const REQUEST_TIMEOUT_MS = 15000;
const DEFAULT_CHAT_MODEL = 'openai/gpt-oss-20b:free';
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
const requireDistributedRateLimit = process.env.REQUIRE_DISTRIBUTED_RATE_LIMIT !== 'false';
const allowedOrigins = new Set([
  ...PRODUCTION_ORIGINS,
  ...(isProduction ? [] : DEVELOPMENT_ORIGINS),
]);

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(8, '60 s'),
        analytics: true,
        prefix: 'sandeep_ai',
      })
    : null;

function getRequestOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) return origin;

  const referer = request.headers.get('referer');
  if (!referer) return '';

  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function securityHeaders(request: NextRequest) {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'same-origin',
    'X-Content-Type-Options': 'nosniff',
    Vary: 'Origin',
  });
  const origin = getRequestOrigin(request);

  if (allowedOrigins.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With');
    headers.set('Access-Control-Max-Age', '600');
  }

  return headers;
}

function json(request: NextRequest, payload: Record<string, string>, status = 200) {
  return NextResponse.json(payload, { status, headers: securityHeaders(request) });
}

function normalizeMessages(messages: unknown): { messages?: ChatMessage[]; error?: string } {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: 'Invalid messages payload.' };
  }

  const normalized = messages.slice(-MAX_MESSAGES).map((message) => {
    const item = message as { role?: unknown; text?: unknown } | undefined;
    return {
      role:
        item?.role === 'assistant' || item?.role === 'ai'
          ? 'assistant'
          : item?.role === 'user'
            ? 'user'
            : '',
      text: typeof item?.text === 'string' ? item.text.trim() : '',
    };
  });

  if (!normalized.every((message) => message.role && message.text)) {
    return { error: 'Invalid message format.' };
  }

  if (normalized[normalized.length - 1].role !== 'user') {
    return { error: 'Last message must come from the user.' };
  }

  const totalLength = normalized.reduce((sum, message) => sum + message.text.length, 0);
  if (totalLength > MAX_TOTAL_MESSAGE_LENGTH) {
    return { error: 'Conversation is too long. Please start a shorter chat.' };
  }

  if (normalized.some((message) => message.text.length > MAX_MESSAGE_LENGTH)) {
    return { error: 'Each message must stay under 500 characters.' };
  }

  if (normalized.some((message) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(message.text))) {
    return { error: 'Message contains unsupported characters.' };
  }

  return { messages: normalized as ChatMessage[] };
}

function fallbackReply(messages: ChatMessage[]) {
  const question = messages[messages.length - 1]?.text.toLowerCase() || '';

  if (/hire|collaborat|available|contact|freelance/.test(question)) {
    return 'Sandeep is open to focused remote frontend and UI engineering engagements. Please use the Contact section to share the product, scope, and timeline.';
  }

  if (/project|work|case stud|build/.test(question)) {
    return 'Sandeep builds fast, accessible, conversion-focused web experiences, including React fitness platforms, property discovery interfaces, and workflow tools. His case studies show the product decisions behind each build.';
  }

  return 'Sandeep is a frontend engineer based in Nepal, focused on React, Next.js, TypeScript, Tailwind CSS, accessible UI systems, and performance. For project details or availability, please use the Contact section.';
}

async function enforceRateLimit(request: NextRequest, responseHeaders: Headers): Promise<RateLimitResult> {
  if (!ratelimit) {
    if (isProduction && requireDistributedRateLimit) {
      return { success: false, status: 503, error: 'Chat is temporarily unavailable.' };
    }
    return { success: true };
  }

  const result = await ratelimit.limit(getClientIp(request));
  responseHeaders.set('X-RateLimit-Limit', String(result.limit));
  responseHeaders.set('X-RateLimit-Remaining', String(result.remaining));
  responseHeaders.set('X-RateLimit-Reset', String(result.reset));

  if (!result.success) {
    const retryAfterSec = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
    responseHeaders.set('Retry-After', String(retryAfterSec));
    return { success: false, status: 429, error: 'Too many requests. Try again in ' + retryAfterSec + ' seconds.' };
  }

  return { success: true };
}

async function verifyTurnstile(token: unknown, request: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;

  const formData = new URLSearchParams();
  formData.set('secret', secret);
  formData.set('response', token);
  formData.set('remoteip', getClientIp(request));

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: securityHeaders(request),
  });
}

export async function POST(request: NextRequest) {
  const origin = getRequestOrigin(request);
  if (!allowedOrigins.has(origin)) {
    return json(request, { error: 'Forbidden.' }, 403);
  }

  if (request.headers.get('content-type')?.toLowerCase().includes('application/json') !== true) {
    return json(request, { error: 'Content-Type must be application/json.' }, 415);
  }

  if (isProduction && request.headers.get('x-requested-with') !== 'SandeepAI') {
    return json(request, { error: 'Forbidden.' }, 403);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json(request, { error: 'Request is too large.' }, 413);
  }

  let body: { messages?: unknown; turnstileToken?: unknown };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(request, { error: 'Invalid JSON payload.' }, 400);
  }

  const normalized = normalizeMessages(body.messages);
  if (normalized.error || !normalized.messages) {
    return json(request, { error: normalized.error || 'Invalid messages payload.' }, 400);
  }

  const responseHeaders = securityHeaders(request);
  const rateLimit = await enforceRateLimit(request, responseHeaders);
  if (!rateLimit.success) {
    return NextResponse.json({ error: rateLimit.error }, { status: rateLimit.status, headers: responseHeaders });
  }

  if (!(await verifyTurnstile(body.turnstileToken, request))) {
    return NextResponse.json({ error: 'Verification failed.' }, { status: 403, headers: responseHeaders });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Chat is temporarily unavailable.' }, { status: 503, headers: responseHeaders });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const providerResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
        'HTTP-Referer': 'https://sandeepmeche.com.np',
        'X-Title': 'Sandeep AI Portfolio',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...normalized.messages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        ],
        max_tokens: MAX_TOKENS_RESPONSE,
        temperature: 0.4,
      }),
    });

    const providerData = await providerResponse.json().catch(() => ({}));
    const reply = providerData.choices?.[0]?.message?.content?.trim();

    if (!providerResponse.ok || providerData.error || !reply) {
      console.warn('Sandeep AI provider unavailable', { status: providerResponse.status });
      return NextResponse.json({ reply: fallbackReply(normalized.messages) }, { status: 200, headers: responseHeaders });
    }

    return NextResponse.json({ reply }, { status: 200, headers: responseHeaders });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError'
      ? 'The AI provider timed out. Please try again.'
      : 'Failed to communicate with the AI provider.';
    console.warn('Sandeep AI provider request failed', { message });
    return NextResponse.json({ reply: fallbackReply(normalized.messages) }, { status: 200, headers: responseHeaders });
  } finally {
    clearTimeout(timeout);
  }
}
