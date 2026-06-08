
import React, { useState, useEffect, useRef, useCallback } from 'react';

const WEBHOOK_URL = 'https://n8n.lezacconsultoria.com/webhook/lezac-chat';
const STORAGE_KEY = 'lezac_chat';
const MAX_MESSAGES = 30;
const WELCOME_MSG = 'Soy Lezac, tu asistente comercial 👋 si deseas me puedes contar en que te gustaría que te ayude en tu negocio.';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
}

function getSession(): ChatSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const id = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return { id, messages: [] };
}

function saveSession(session: ChatSession) {
  const trimmed = { ...session, messages: session.messages.slice(-MAX_MESSAGES) };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<ChatSession>(getSession);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [welcomed, setWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (localStorage.getItem('lezac_chat_dismissed')) return;
    const timer = setTimeout(() => {
      if (!localStorage.getItem('lezac_chat_dismissed')) {
        setOpen(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && !welcomed && session.messages.length === 0) {
      setWelcomed(true);
      const welcomeMsg: ChatMessage = { role: 'bot', content: WELCOME_MSG, timestamp: Date.now() };
      setSession(prev => {
        const updated = { ...prev, messages: [...prev.messages, welcomeMsg] };
        saveSession(updated);
        return updated;
      });
    }
  }, [open, welcomed, session.messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, typing]);

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text && !imageBase64) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: imageBase64 ? (text ? `[Imagen] ${text}` : '[Imagen]') : text,
      timestamp: Date.now(),
    };

    const updatedSession = { ...session, messages: [...session.messages, userMsg] };
    setSession(updatedSession);
    saveSession(updatedSession);
    setInput('');
    clearImage();
    setTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const body: Record<string, string> = { sessionId: session.id, message: text };
      if (imageBase64) body.imageBase64 = imageBase64;

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const botText = data.response || data.output || 'No pude procesar la respuesta.';

      const botMsg: ChatMessage = { role: 'bot', content: botText, timestamp: Date.now() };
      setSession(prev => {
        const s = { ...prev, messages: [...prev.messages, botMsg] };
        saveSession(s);
        return s;
      });
    } catch {
      const errMsg: ChatMessage = { role: 'bot', content: 'Hubo un error al conectar. Intentá de nuevo.', timestamp: Date.now() };
      setSession(prev => {
        const s = { ...prev, messages: [...prev.messages, errMsg] };
        saveSession(s);
        return s;
      });
    } finally {
      setTyping(false);
    }
  }, [input, imageBase64, session]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      <style>{`
        @keyframes lz-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(37,245,164,0.45), 0 0 0 0 rgba(37,245,164,0.4); }
          50% { box-shadow: 0 4px 24px rgba(37,245,164,0.45), 0 0 0 10px rgba(37,245,164,0); }
        }
        #lz-chat-bubble {
          animation: lz-pulse 2.2s ease-in-out infinite;
        }
        .lz-msg-user { align-self: flex-end; background: #25F5A4; color: #0A0A0B; border-radius: 16px 16px 4px 16px; padding: 10px 14px; max-width: 80%; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
        .lz-msg-bot { align-self: flex-start; background: #f3f0f8; color: #1a1a2e; border-radius: 16px 16px 16px 4px; padding: 10px 14px; max-width: 80%; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
        .lz-typing { align-self: flex-start; display: flex; gap: 5px; padding: 12px 16px; background: #f3f0f8; border-radius: 16px 16px 16px 4px; }
        .lz-dot { width: 7px; height: 7px; background: #25F5A4; border-radius: 50%; animation: lz-bounce 1.2s infinite; }
        .lz-dot:nth-child(2) { animation-delay: 0.2s; }
        .lz-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes lz-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-7px); } }
        #lz-chat-panel {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 360px;
          height: 680px;
          max-height: calc(100vh - 120px);
          background: #ffffff;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(118,23,207,0.15);
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          z-index: 9998;
          overflow: hidden;
          transform: scale(0.95) translateY(10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
          font-family: Inter, sans-serif;
        }
        #lz-chat-panel.lz-open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        @media (max-width: 480px) {
          #lz-chat-panel { right: 0; left: 0; width: 100%; border-radius: 16px 16px 0 0; bottom: 72px; }
        }
      `}</style>

      {/* Panel */}
      <div id="lz-chat-panel" className={open ? 'lz-open' : ''}>
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(118,23,207,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#25F5A4,#00C87E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Asistente Lezac</div>
            <div style={{ color: '#25F5A4', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366', display: 'inline-block' }}></span>
              en línea
            </div>
          </div>
          <button onClick={() => { localStorage.setItem('lezac_chat_dismissed', '1'); setOpen(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#958DA1', padding: 4, borderRadius: 6, lineHeight: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {session.messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'lz-msg-user' : 'lz-msg-bot'}>
              {msg.content}
            </div>
          ))}
          {typing && (
            <div className="lz-typing">
              <div className="lz-dot"></div>
              <div className="lz-dot"></div>
              <div className="lz-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={imagePreview} alt="preview" style={{ height: 52, borderRadius: 8, border: '1px solid rgba(118,23,207,0.3)' }} />
            <button onClick={clearImage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#958DA1', fontSize: 18, lineHeight: 1 }}>✕</button>
          </div>
        )}

        {/* Input row */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(118,23,207,0.1)', display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <button onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#958DA1', padding: '6px 4px', flexShrink: 0 }} title="Adjuntar imagen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])} />
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu mensaje..."
            rows={1}
            style={{ flex: 1, background: '#f7f5fb', border: '1px solid rgba(118,23,207,0.2)', borderRadius: 10, padding: '8px 12px', color: '#1a1a2e', fontSize: 14, resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 120, overflowY: 'auto', fontFamily: 'inherit' }}
          />
          <button onClick={sendMessage} disabled={typing} style={{ background: '#25F5A4', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', flexShrink: 0, opacity: typing ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bubble */}
      <button
        id="lz-chat-bubble"
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          background: 'linear-gradient(135deg,#25F5A4,#00C87E)',
          border: 'none',
          borderRadius: 9999,
          height: 52,
          padding: '0 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          color: '#0A0A0B',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Asistente Comercial</span>
      </button>
    </>
  );
};

export default Chatbot;
