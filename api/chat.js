import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot.
Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu.
His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation.
His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva).
His recent experience includes building Web Portfolios and improving responsive frontend interfaces.
Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

const PRODUCTION_ORIGINS = new Set([
  'https://www.sandeepmeche.com.np',
  'https://sandeepmeche.com.np'
]);

const DEVELOPMENT_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]);

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
const allowedOrigins = new Set([
  ...PRODUCTION_ORIGINS,
  ...(isProduction ? [] : DEVELOPMENT_ORIGINS)
]);

const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;
const MAX_TOTAL_MESSAGE_LENGTH = 2_500;
const MAX_TOKENS_RESPONSE = 220;
const REQUEST_TIMEOUT_MS = 15_000;
const REQUIRE_DISTRIBUTED_RATE_LIMIT = process.env.REQUIRE_DISTRIBUTED_RATE_LIMIT !== 'false';

let ratelimit = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(8, '60 s'),
    analytics: true,
    prefix: 'sandeep_ai'
  });
}

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  return (
    (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : '') ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function getRequestOrigin(req) {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && origin) return origin;

  const referer = req.headers.referer;
  if (typeof referer !== 'string' || !referer) return '';

  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
}

function applySecurityHeaders(req, res) {
  const origin = getRequestOrigin(req);
  if (allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '600');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
}

function isAllowedRequestOrigin(req) {
  return allowedOrigins.has(getRequestOrigin(req));
}

function hasValidContentType(req) {
  const contentType = req.headers['content-type'];
  return typeof contentType === 'string' && contentType.toLowerCase().includes('application/json');
}

function hasValidRequestMarker(req) {
  return req.headers['x-requested-with'] === 'SandeepAI';
}

function getBodyByteLength(body) {
  try {
    return Buffer.byteLength(JSON.stringify(body || {}), 'utf8');
  } catch {
    return MAX_BODY_BYTES + 1;
  }
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: 'Invalid messages payload.' };
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES).map((message) => ({
    role: message?.role === 'ai' ? 'ai' : message?.role === 'user' ? 'user' : '',
    text: typeof message?.text === 'string' ? message.text.trim() : ''
  }));

  if (!trimmedMessages.every((message) => message.role && message.text)) {
    return { error: 'Invalid message format.' };
  }

  if (trimmedMessages[trimmedMessages.length - 1].role !== 'user') {
    return { error: 'Last message must come from the user.' };
  }

  const totalLength = trimmedMessages.reduce((sum, message) => sum + message.text.length, 0);
  if (totalLength > MAX_TOTAL_MESSAGE_LENGTH) {
    return { error: 'Conversation is too long. Please start a shorter chat.' };
  }

  const tooLong = trimmedMessages.some((message) => message.text.length > MAX_MESSAGE_LENGTH);
  if (tooLong) {
    return { error: `Each message must stay under ${MAX_MESSAGE_LENGTH} characters.` };
  }

  const hasControlChars = trimmedMessages.some((message) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(message.text));
  if (hasControlChars) {
    return { error: 'Message contains unsupported characters.' };
  }

  return { messages: trimmedMessages };
}

async function enforceRateLimit(req, res) {
  if (!ratelimit) {
    if (isProduction && REQUIRE_DISTRIBUTED_RATE_LIMIT) {
      return { errorStatus: 503, error: 'Chat is temporarily unavailable.' };
    }
    return { success: true };
  }

  const result = await ratelimit.limit(getClientIp(req));

  res.setHeader('X-RateLimit-Limit', String(result.limit));
  res.setHeader('X-RateLimit-Remaining', String(result.remaining));
  res.setHeader('X-RateLimit-Reset', String(result.reset));

  if (!result.success) {
    const retryAfterSec = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
    res.setHeader('Retry-After', String(retryAfterSec));
    return { errorStatus: 429, error: `Too many requests. Try again in ${retryAfterSec} seconds.` };
  }

  return { success: true };
}

async function verifyTurnstile(token, req) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: true };

  if (typeof token !== 'string' || !token) {
    return { success: false };
  }

  const formData = new URLSearchParams();
  formData.set('secret', secret);
  formData.set('response', token);
  formData.set('remoteip', getClientIp(req));

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) return { success: false };

  const data = await response.json();
  return { success: Boolean(data.success) };
}

export default async function handler(req, res) {
  applySecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  if (!isAllowedRequestOrigin(req)) {
    return sendJson(res, 403, { error: 'Forbidden.' });
  }

  if (!hasValidContentType(req)) {
    return sendJson(res, 415, { error: 'Content-Type must be application/json.' });
  }

  if (isProduction && !hasValidRequestMarker(req)) {
    return sendJson(res, 403, { error: 'Forbidden.' });
  }

  if (getBodyByteLength(req.body) > MAX_BODY_BYTES) {
    return sendJson(res, 413, { error: 'Request is too large.' });
  }

  const rateLimit = await enforceRateLimit(req, res);
  if (!rateLimit.success) {
    return sendJson(res, rateLimit.errorStatus, { error: rateLimit.error });
  }

  const turnstile = await verifyTurnstile(req.body?.turnstileToken, req);
  if (!turnstile.success) {
    return sendJson(res, 403, { error: 'Verification failed.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return sendJson(res, 503, { error: 'Chat is temporarily unavailable.' });
  }

  const normalized = normalizeMessages(req.body?.messages);
  if (normalized.error) {
    return sendJson(res, 400, { error: normalized.error });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const openRouterMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...normalized.messages.map((message) => ({
        role: message.role === 'ai' ? 'assistant' : 'user',
        content: message.text
      }))
    ];

    const providerResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://sandeepmeche.com.np',
        'X-Title': 'Sandeep AI Portfolio'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openrouter/free',
        messages: openRouterMessages,
        max_tokens: MAX_TOKENS_RESPONSE,
        temperature: 0.4
      })
    });

    const providerData = await providerResponse.json().catch(() => ({}));

    if (!providerResponse.ok || providerData.error) {
      console.error('OpenRouter error:', providerData.error || providerResponse.status);
      return sendJson(res, 502, { error: 'AI provider returned an error.' });
    }

    const reply = providerData.choices?.[0]?.message?.content?.trim();
    return sendJson(res, 200, { reply: reply || 'I could not generate a response.' });
  } catch (error) {
    console.error('Chat handler error:', error.name === 'AbortError' ? 'Provider timeout' : error);
    return sendJson(res, 500, { error: 'Failed to communicate with AI provider.' });
  } finally {
    clearTimeout(timeout);
  }
}
