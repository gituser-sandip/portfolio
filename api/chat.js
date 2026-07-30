const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot.
Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu.
His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation.
His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva).
His recent experience includes being an Event Coordinator at Elite Events and building Web Portfolios.
Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

// ── Security constants ────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://www.sandeepmeche.com.np',
  'https://sandeepmeche.com.np',
  'http://localhost:3000',
  'http://localhost:5173'
];

const MAX_MESSAGES        = 20;   // max conversation turns kept
const MAX_MESSAGE_LENGTH  = 500;  // chars per individual message
const MAX_TOKENS_RESPONSE = 300;  // max tokens in AI reply

// ── In-memory rate limiter (resets per serverless cold-start) ─────────────────
// Vercel serverless functions can share state within the same instance.
// This provides a best-effort limit; for hard limits use Vercel KV or Upstash.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQS  = 10;     // max 10 requests per IP per window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQS) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ── Helper: get real client IP ────────────────────────────────────────────────
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ── Helper: check allowed origin ──────────────────────────────────────────────
function isAllowedOrigin(req) {
  const origin  = req.headers['origin']  || '';
  const referer = req.headers['referer'] || '';

  return (
    ALLOWED_ORIGINS.some(o => origin.startsWith(o)) ||
    ALLOWED_ORIGINS.some(o => referer.startsWith(o))
  );
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers — only allow portfolio origin
  const origin = req.headers['origin'] || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 1. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Origin / referer guard
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden: invalid origin.' });
  }

  // 3. Rate limiting
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before trying again.' });
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

    // 6. Cap conversation history length (prevent huge payloads)
    const trimmedMessages = messages.slice(-MAX_MESSAGES);

    // 7. Validate and sanitize each message
    for (const msg of trimmedMessages) {
      if (typeof msg.text !== 'string') {
        return res.status(400).json({ error: 'Invalid message format.' });
      }
      if (msg.text.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({
          error: `Message too long. Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`
        });
      }
    }

    // 8. Build OpenRouter-compatible message list
    const openRouterMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedMessages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text.trim()
      }))
    ];

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://sandeepmeche.com.np',
        'X-Title': 'Sandeep AI Portfolio'
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: openRouterMessages,
        max_tokens: MAX_TOKENS_RESPONSE
      })
    });

    const orData = await orRes.json();

    if (orData.error) {
      console.error('OpenRouter API error:', orData.error);
      return res.status(502).json({ error: 'AI provider returned an error.' });
    }

    const reply = orData.choices?.[0]?.message?.content || 'I could not generate a response.';
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI provider.' });
  }
}
