const SYSTEM_PROMPT = `You are "Sandeep AI", a friendly virtual assistant for Sandeep Meche's portfolio. You take the form of a friendly digital pet robot.
Sandeep is a frontend-focused creator and a computing undergraduate studying AI at Islington College, Kathmandu.
His core skills are HTML, CSS, JavaScript, React, Responsive UI, and n8n Automation.
His secondary skills are Video Editing (DaVinci Resolve) and Graphic Design (Canva).
His recent experience includes being an Event Coordinator at Elite Events and building Web Portfolios.
Answer questions politely, concisely, and with a bit of a friendly, helpful tone. Keep your answers brief (2-3 sentences max). Suggest reaching out via the Contact section if they want to hire or collaborate.`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing on the server.' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages array provided.' });
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
        'HTTP-Referer': 'https://sandeepmeche.com.np',
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
      return res.status(500).json({ error: orData.error.message || 'AI provider error.' });
    }

    const reply = orData.choices?.[0]?.message?.content || 'I could not generate a response.';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI provider.' });
  }
}
