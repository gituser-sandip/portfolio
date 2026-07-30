import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot. Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu. His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation. His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva). His recent experience includes being an Event Coordinator at Elite Events and building Web Portfolios. Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

// This plugin lets the chatbot work during local development (npm run dev).
// In production on Vercel, the real api/chat.js serverless function handles it instead.
function openRouterDevProxy() {
  return {
    name: 'openrouter-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        // Read the request body
        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const { messages } = JSON.parse(body);
          const apiKey = process.env.OPENROUTER_API_KEY;

          if (!apiKey) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'OPENROUTER_API_KEY is missing in your .env file.' }));
            return;
          }

          // Convert our chat format to OpenAI-compatible format used by OpenRouter
          const openRouterMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text
            }))
          ];

          const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'Sandeep AI Portfolio'
            },
            body: JSON.stringify({
              model: 'openrouter/free',
              messages: openRouterMessages,
              max_tokens: 300
            })
          });

          const orData = await orRes.json();

          if (orData.error) {
            console.error('OpenRouter API error:', orData.error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: orData.error.message || 'OpenRouter API error' }));
            return;
          }

          const reply = orData.choices?.[0]?.message?.content || 'I could not generate a response.';

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply }));

        } catch (err) {
          console.error('Dev proxy error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Dev proxy encountered an error.' }));
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
