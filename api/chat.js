import { Ratelimit } from '@upstash/ratelimit';
import { Redis }     from '@upstash/redis';

const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot.
Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu.
His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation.
His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva).
His recent experience includes being an Event Coordinator at Elite Events and building Web Portfolios.
Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

// ── Security constants ──────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://www.sandeepmeche.com.np',
  'https://sandeepmeche.com.np',
  'http://localhost:3000',
  'http://localhost:5173'
];

const MAX_MESSAGES        = 20;   // max conversation turns forwarded
const MAX_MESSAGE_LENGTH  = 500;  // chars per individual message
const MAX_TOKENS_RESPONSE = 300;  // max tokens in AI reply

// ── Upstash rate limiter (distributed — works across all serverless instances) ──
// Uses a sliding window: max 10 requests per IP per 60 seconds.
// Gracefully degrades to allow-all if UPSTASH env vars are missing (local dev).
let ratelimit = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url:   process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'),
    analytics: true,
    prefix: 'sandeep_ai'
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function isAllowedOrigin(req) {
  const origin  = req.headers['origin']  || '';
  const referer = req.headers['referer'] || '';
  return (
    ALLOWED_ORIGINS.some(o => origin.startsWith(o)) ||
    ALLOWED_ORIGINS.some(o => referer.startsWith(o))
  );
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  const origin = req.headers['origin'] || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  // 1. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Origin guard
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden: invalid origin.' });
  }

  // 3. Distributed rate limit (Upstash Redis)
  if (ratelimit) {
    const ip     = getClientIp(req);
    const result = await ratelimit.limit(ip);

    // Set standard rate-limit response headers
    res.setHeader('X-RateLimit-Limit',     result.limit);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Reset',     result.reset);

    if (!result.success) {
      const retryAfterSec = Math.ceil((result.reset - Date.now()) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      return res.status(429).json({
        error: `Too many requests. Try again in ${retryAfterSec} seconds.`
      });
    }
  }

  // 4. API key check
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const { messages } = req.body;

    // 5. Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages payload.' });
    }

    // 6. Cap history length
    const trimmedMessages = messages.slice(-MAX_MESSAGES);

    // 7. Validate each message
    for (const msg of trimmedMessages) {
      if (typeof msg.text !== 'string') {
        return res.status(400).json({ error: 'Invalid message format.' });
      }
      if (msg.text.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({
          error: `Message too long. Keep it under ${MAX_MESSAGE_LENGTH} characters.`
        });
      }
    }

    // 8. Build OpenRouter request
    const openRouterMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedMessages.map(m => ({
        role:    m.role === 'ai' ? 'assistant' : 'user',
        content: m.text.trim()
      }))
    ];

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer':  'https://sandeepmeche.com.np',
        'X-Title':       'Sandeep AI Portfolio'
      },
      body: JSON.stringify({
        model:      'openrouter/free',
        messages:   openRouterMessages,
        max_tokens: MAX_TOKENS_RESPONSE
      })
    });

    const orData = await orRes.json();

    if (orData.error) {
      console.error('OpenRouter error:', orData.error);
      return res.status(502).json({ error: 'AI provider returned an error.' });
    }

    const reply = orData.choices?.[0]?.message?.content || 'I could not generate a response.';
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI provider.' });
  }
}
