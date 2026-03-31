"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Send, Bot, User, Sparkles, Loader2, Paperclip, MoreVertical, ShieldCheck, Activity, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  action?: 'terminal_link'; // Our new graceful UI trigger
}

const quickReplies = [
  "Predict my KEA chances",
  "Hidden fees in private colleges",
  "NRI quota negotiation",
  "Round 2 vs Mop-up strategy"
];

export default function ChatInterface() {
  const { currentUser, subscriptionTier } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: 'Hello! I am your Premium AI Counselor. I analyze 12+ years of KEA and AACCC data to help you secure the best possible medical seat. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = text;
    const currentScore = score;
    
    // 1. Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage, timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Fetch from n8n Webhook
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_AI_WEBHOOK || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          score: currentScore ? parseInt(currentScore) : null,
          tier: subscriptionTier,
          uid: currentUser?.uid || 'anonymous'
        })
      });

      if (!response.ok) throw new Error("Webhook failed");
      
      const data = await response.json();
      let aiText = data.reply || "I encountered an error processing that request.";
      let actionTrigger: 'terminal_link' | undefined = undefined;

      // 3. THE GRACEFUL UI TRIGGER LOGIC
      const triggerRegex = /\{"trigger":\s*"terminal"(.*?)\}/g;
      const match = triggerRegex.exec(aiText);

      if (match) {
        aiText = aiText.replace(triggerRegex, '').trim();
        
        // Check if we are on the homepage
        if (window.location.pathname === '/' || window.location.pathname === '') {
          // Smooth scroll to terminal
          setTimeout(() => {
            const terminalElement = document.getElementById('cutoff-terminal');
            if (terminalElement) {
              terminalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              terminalElement.classList.add('ring-4', 'ring-brand-cyan', 'transition-all', 'duration-500');
              setTimeout(() => terminalElement.classList.remove('ring-4', 'ring-brand-cyan'), 2000);
            }
          }, 500);
        } else {
          // User is reading an article. Do NOT redirect. Render an inline CTA button instead.
          actionTrigger = 'terminal_link';
        }
      }

      // 4. Update UI
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: aiText, 
        timestamp: new Date(),
        action: actionTrigger
      }]);

    } catch (error) {
      console.error("AI Fetch Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: "My intelligence engine is currently initializing. Please try again in a few moments.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] max-h-[85vh] w-full max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden font-poppins relative">
      
      {/* --- HEADER --- */}
      <div className="bg-slate-950 p-5 sm:p-6 flex items-center justify-between relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-cyan/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-cyan/20 border border-white/10">
              <Bot size={24} className="text-slate-950" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div>
            <h2 className="text-white font-black font-montserrat text-lg tracking-tight flex items-center gap-2">
              AI Admission Counselor <ShieldCheck size={16} className="text-brand-cyan" />
            </h2>
            <p className="text-slate-400 text-[11px] font-inter uppercase tracking-widest font-bold mt-0.5 flex items-center gap-1.5">
              <Activity size={10} className="text-brand-cyan" /> Tier: {subscriptionTier}
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white transition-colors relative z-10 p-2 rounded-lg hover:bg-white/5">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* --- MESSAGE AREA --- */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-50/50 relative">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className="shrink-0 mt-auto">
                {msg.role === 'ai' ? (
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-slate-700">
                    <Bot size={14} className="text-brand-cyan" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center shadow-sm border border-brand-cyan/50">
                    <User size={14} className="text-slate-950" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className={`px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-cyan text-slate-950 rounded-2xl rounded-br-sm font-medium' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-sm'
                  }`}>
                  {msg.content}
                  
                  {/* INLINE TERMINAL BUTTON (Appears if not on homepage) */}
                  {msg.action === 'terminal_link' && (
                    <Link href="/#cutoff-terminal" className="mt-4 flex items-center justify-center gap-2 w-full bg-slate-950 text-brand-cyan py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-cyan hover:text-slate-950 transition-colors border border-brand-cyan/30 shadow-md">
                      <Activity size={14} /> Open Prediction Terminal
                    </Link>
                  )}
                </div>
                <span className={`text-[9px] font-bold text-slate-400 font-inter uppercase tracking-widest px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] sm:max-w-[75%] flex-row">
              <div className="shrink-0 mt-auto">
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-slate-700">
                  <Bot size={14} className="text-brand-cyan" />
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- QUICK REPLIES --- */}
      {messages.length === 1 && !isTyping && (
        <div className="px-5 pb-2 bg-slate-50/50 overflow-x-auto no-scrollbar flex gap-2">
          {quickReplies.map((reply, idx) => (
            <button key={idx} onClick={() => handleSend(reply)} className="shrink-0 bg-white border border-slate-200 hover:border-brand-cyan hover:text-brand-cyan text-slate-600 text-xs font-medium px-4 py-2 rounded-full shadow-sm transition-colors flex items-center gap-1.5">
              <Sparkles size={12} /> {reply}
            </button>
          ))}
        </div>
      )}

      {/* --- INPUT AREA --- */}
      <div className="p-4 sm:p-5 bg-white border-t border-slate-100 shrink-0">
        {!currentUser && (
          <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-[11px] text-amber-800 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" /> 
            Browsing anonymously. Sign in to unlock verified predictions and memory.
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Score (Opt)" 
            className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-700 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/10 transition-all text-center font-mono font-bold"
          />
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-brand-cyan focus-within:ring-4 focus-within:ring-brand-cyan/10 transition-all shadow-inner">
            <button className="p-2 text-slate-400 hover:text-brand-cyan transition-colors rounded-lg hover:bg-white shrink-0">
              <Paperclip size={18} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about cutoffs, fees..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium w-full min-w-0"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="bg-slate-900 hover:bg-brand-cyan text-white hover:text-slate-950 w-10 h-10 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
            >
              {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}