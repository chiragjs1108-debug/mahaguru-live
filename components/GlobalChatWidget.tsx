"use client";

import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function GlobalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      
      {/* --- THE CHAT POPOVER --- */}
      <div 
        className={`pointer-events-auto transition-all duration-300 origin-bottom-right mb-4 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
        }`}
      >
        <div className="w-[calc(100vw-3rem)] sm:w-[400px] shadow-2xl rounded-[2rem] overflow-hidden border border-slate-700/50">
          <ChatInterface />
        </div>
      </div>

      {/* --- THE FLOATING BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-slate-950 text-brand-cyan rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(8,145,178,0.4)] border border-slate-800 hover:scale-105 transition-transform hover:bg-brand-cyan hover:text-slate-950 relative group"
      >
        {/* Pulsing ring effect when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-brand-cyan/20 animate-ping" />
        )}
        
        {isOpen ? (
          <X size={24} className="relative z-10 text-white group-hover:text-slate-950 transition-colors" />
        ) : (
          <Bot size={26} className="relative z-10" />
        )}
      </button>

    </div>
  );
}