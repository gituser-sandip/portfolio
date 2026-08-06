import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot. Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu. His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation. His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva). His recent experience includes building Web Portfolios and improving responsive frontend interfaces. Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;
const MAX_TOTAL_MESSAGE_LENGTH = 2_500;
const MAX_TOKENS_RESPONSE = 220;
const REQUEST_TIMEOUT_MS = 15_000;

const devHits = new Map();

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

function enforceLocalRateLimit(req) {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 8;
  const key = getClientIp(req);
  const hits = (devHits.get(key) || []).filter((time) => now - time < windowMs);
  hits.push(now);
  devHits.set(key, hits);
  return hits.length <= limit;
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

  if (trimmedMessages.some((message) => message.text.length > MAX_MESSAGE_LENGTH)) {
    return { error: `Each message must stay under ${MAX_MESSAGE_LENGTH} characters.` };
  }

  if (trimmedMessages.some((message) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(message.text))) {
    return { error: 'Message contains unsupported characters.' };
  }

  return { messages: trimmedMessages };
}

// This plugin lets the chatbot work during local development (npm run dev).
// In production on Vercel, the real api/chat.js serverless function handles it instead.
function openRouterDevProxy() {
  return {
    name: 'openrouter-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          return sendJson(res, 405, { error: 'Method Not Allowed' });
        }

        const contentType = req.headers['content-type'] || '';
        if (!contentType.toLowerCase().includes('application/json')) {
          return sendJson(res, 415, { error: 'Content-Type must be application/json.' });
        }

        if (!enforceLocalRateLimit(req)) {
          return sendJson(res, 429, { error: 'Too many requests. Try again soon.' });
        }

        // Read the request body
        let body = '';
        for await (const chunk of req) body += chunk;

        if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
          return sendJson(res, 413, { error: 'Request is too large.' });
        }

        try {
          const { messages } = JSON.parse(body);
          const apiKey = process.env.OPENROUTER_API_KEY;

          if (!apiKey) {
            return sendJson(res, 503, { error: 'OPENROUTER_API_KEY is missing in your .env file.' });
          }

          const normalized = normalizeMessages(messages);
          if (normalized.error) {
            return sendJson(res, 400, { error: normalized.error });
          }

          // Convert our chat format to OpenAI-compatible format used by OpenRouter
          const openRouterMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...normalized.messages.map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text
            }))
          ];

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

          const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'Sandeep AI Portfolio'
            },
            body: JSON.stringify({
              model: process.env.OPENROUTER_MODEL || 'openrouter/free',
              messages: openRouterMessages,
              max_tokens: MAX_TOKENS_RESPONSE,
              temperature: 0.4
            })
          });

          clearTimeout(timeout);
          const orData = await orRes.json().catch(() => ({}));

          if (!orRes.ok || orData.error) {
            console.error('OpenRouter API error:', orData.error);
            return sendJson(res, 502, { error: 'AI provider returned an error.' });
          }

          const reply = orData.choices?.[0]?.message?.content?.trim() || 'I could not generate a response.';

          return sendJson(res, 200, { reply });

        } catch (err) {
          console.error('Dev proxy error:', err);
          return sendJson(res, 500, { error: 'Dev proxy encountered an error.' });
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load .env variables so they are available via process.env in the dev plugin
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), openRouterDevProxy()],
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    publicDir: 'public'
  };
});
