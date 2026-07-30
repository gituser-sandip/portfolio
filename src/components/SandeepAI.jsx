import React, { useState, useRef, useEffect } from 'react';


export default function SandeepAI() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Beep boop! I am Sandeep AI. Ask me about his skills or projects!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    // Keep a local reference to send to the backend
    const updatedMessages = [...messages, { role: 'user', text: userText }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Backend responded with an error.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Backend Proxy Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error reaching the server. My circuits are tangled!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
      {/* Header with Pet */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="ai-pet-container relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <svg viewBox="0 0 100 100" className={`h-8 w-8 ${isLoading ? 'pet-thinking' : 'pet-idle'}`}>
              <circle cx="50" cy="50" r="45" fill="#2a2a2a" stroke="#ef4444" strokeWidth="6" />
              <line x1="50" y1="5" x2="50" y2="-5" stroke="#ef4444" strokeWidth="6" className="pet-antenna" />
              <circle cx="50" cy="-5" r="6" fill="#ef4444" className={isLoading ? 'animate-pulse' : ''} />
              <g className="pet-eyes">
                <rect x="25" y="35" width="16" height="20" rx="8" fill="#ef4444" />
                <rect x="59" y="35" width="16" height="20" rx="8" fill="#ef4444" />
              </g>
              {isLoading ? (
                <circle cx="50" cy="65" r="5" fill="#ef4444" />
              ) : (
                <path d="M 35 65 Q 50 75 65 65" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
              )}
            </svg>
            <div className="pet-orbit absolute h-full w-full rounded-full border border-dashed border-red-500/40" />
          </div>
          <div>
            <h3 className="font-bold text-white">Sandeep AI</h3>
            <span className="text-xs text-red-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              {isLoading ? 'Processing...' : 'Online'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex h-[320px] w-full flex-col bg-black/20">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-red-500/80 text-white rounded-tr-none backdrop-blur-sm border border-red-400/30' 
                    : 'bg-white/10 text-slate-100 rounded-tl-none border border-white/10 backdrop-blur-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-3 flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-none border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-slate-300 backdrop-blur-sm">
                <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
              </div>
            </div>
          )}

        </div>
        
        <div className="border-t border-white/10 bg-black/20 p-3 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-300 backdrop-blur-sm focus:border-red-500 focus:bg-white/10 focus:outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-red-500/25"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
