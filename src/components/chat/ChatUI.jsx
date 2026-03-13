import React, { useState, useEffect, useRef } from 'react';

const INITIAL_MESSAGES = [
  { id: 1, sender: 'Dr. Sarah Jenkins', text: 'Hello! How are you feeling today?', time: '10:00 AM', isDoctor: true },
  { id: 2, sender: 'Me', text: 'Hi doctor, I am feeling a bit better, but still have some anxiety.', time: '10:05 AM', isDoctor: false },
  { id: 3, sender: 'Dr. Sarah Jenkins', text: 'That is normal. Have you been practicing the breathing exercises we discussed?', time: '10:06 AM', isDoctor: true },
];

function ChatUI() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'Me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDoctor: false
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate doctor response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'Dr. Sarah Jenkins',
        text: 'I understand. Let\'s talk more about that during our next session.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: true
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      {/* CHAT HEADER */}
      <div style={{ padding: '1.25rem 2rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>S</div>
        <div>
          <h6 style={{ fontWeight: 700, margin: 0 }}>Dr. Sarah Jenkins</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Now</span>
          </div>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ alignSelf: msg.isDoctor ? 'flex-start' : 'flex-end', maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: msg.isDoctor ? 'flex-start' : 'flex-end' }}>
             <div style={{ background: msg.isDoctor ? '#f1f5f9' : 'var(--primary)', color: msg.isDoctor ? '#1e293b' : 'white', padding: '12px 18px', borderRadius: msg.isDoctor ? '20px 20px 20px 4px' : '20px 20px 4px 20px', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
               {msg.text}
             </div>
             <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>{msg.time}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* CHAT INPUT */}
      <form onSubmit={sendMessage} style={{ padding: '1.5rem 2rem', background: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Type your message here..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '14px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: '0.95rem' }} 
        />
        <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(99,102,241,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
          <span>➤</span>
        </button>
      </form>
    </div>
  );
}

export default ChatUI;
