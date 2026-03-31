"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Database, Bot, ChevronDown, ArrowRight, 
  Menu, X, Landmark, BookOpen, 
  LineChart, Navigation, Globe, Zap, FileText
} from 'lucide-react';
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)]' : 'bg-white/95 backdrop-blur-xl border-b border-slate-100'} h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-8`}>
      
      {/* 1. LOGO */}
      <Link href="/" onClick={closeMenu} className="flex items-center space-x-2 sm:space-x-2.5 shrink-0 group">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-cyan/20 blur-md rounded-full group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
          <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-brand-cyan relative z-10 group-hover:scale-105 transition-transform duration-300" />
        </div>
        <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-montserrat">
          cutoffs<span className="text-brand-cyan">.info</span>
        </span>
      </Link>

      {/* 2. ELITE DESKTOP NAVIGATION (Strict Core Palette) */}
      <div className="hidden lg:flex items-center gap-2 xl:gap-5 font-poppins text-[13px] xl:text-[14px] font-bold text-slate-700">
        
        {/* PILLAR 1: BAMS Colleges (Direct Link) */}
        <Link href="/bams-colleges" className="flex items-center gap-1.5 hover:text-brand-cyan px-2 py-6 transition-colors group">
          <Landmark size={16} className="text-slate-400 group-hover:text-brand-cyan transition-colors" /> BAMS Colleges
        </Link>

        {/* PILLAR 2: Counselling 2026 */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 hover:text-brand-cyan px-2 py-6 transition-colors relative">
            <Globe size={16} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
            Counselling 2026 
            <ChevronDown size={14} className="group-hover:rotate-180 text-slate-400 group-hover:text-brand-cyan transition-transform duration-300"/>
          </button>
          
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[380px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-2.5 pt-3">
             <div className="absolute -top-4 left-0 w-full h-8 bg-transparent"></div>
             
             <Link href="/counselling/bams/aaccc" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
               <div className="bg-slate-50 border border-slate-200 shadow-sm p-2 rounded-lg group-hover/link:border-brand-cyan/40 group-hover/link:text-brand-cyan text-slate-500 transition-colors"><Globe size={18} strokeWidth={2.5}/></div>
               <div>
                 <span className="block text-sm font-bold text-slate-800 group-hover/link:text-brand-cyan transition-colors">AACCC AYUSH UG 2026</span>
                 <span className="block text-[11px] font-medium text-slate-500 mt-0.5">15% All India Quota</span>
               </div>
             </Link>
             
             <Link href="/counselling/bams/state-level" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link mt-1">
               <div className="bg-slate-50 border border-slate-200 shadow-sm p-2 rounded-lg group-hover/link:border-brand-cyan/40 group-hover/link:text-brand-cyan text-slate-500 transition-colors"><Navigation size={18} strokeWidth={2.5}/></div>
               <div>
                 <span className="block text-sm font-bold text-slate-800 group-hover/link:text-brand-cyan transition-colors">State Level Counselling</span>
                 <span className="block text-[11px] font-medium text-slate-500 mt-0.5">KEA, MH CET, UP & More</span>
               </div>
             </Link>

             <Link href="/counselling/bams" className="mx-2 mt-2 pt-3 border-t border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-cyan transition-colors flex items-center justify-between group/viewall">
               <span>All States Ayush Counselling Process</span>
               <ArrowRight size={14} className="group-hover/viewall:translate-x-1 transition-transform"/>
             </Link>
          </div>
        </div>

        {/* PILLAR 3: NEET Cutoffs */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 hover:text-brand-cyan px-2 py-6 transition-colors relative">
            <LineChart size={16} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
            NEET Cutoffs 
            <ChevronDown size={14} className="group-hover:rotate-180 text-slate-400 group-hover:text-brand-cyan transition-transform duration-300"/>
          </button>
          
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[360px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-2.5 pt-3">
             <div className="absolute -top-4 left-0 w-full h-8 bg-transparent"></div>

             <div className="grid grid-cols-1 gap-1">
               <Link href="/cutoffs/bams/aaccc" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
                 <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 group-hover/link:text-brand-cyan group-hover/link:border-brand-cyan/40 flex items-center justify-center shrink-0 transition-colors"><Database size={16} strokeWidth={2.5}/></div>
                 <div>
                   <span className="block text-sm font-bold text-slate-800 group-hover/link:text-brand-cyan transition-colors">AACCC UG Cutoffs</span>
                   <span className="block text-[11px] font-medium text-slate-500">Category-wise AIQ Ranks</span>
                 </div>
               </Link>
               
               <Link href="/cutoffs/bams/karnataka-kea" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
                 <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 group-hover/link:text-brand-cyan group-hover/link:border-brand-cyan/40 flex items-center justify-center shrink-0 transition-colors"><Database size={16} strokeWidth={2.5}/></div>
                 <div>
                   <span className="block text-sm font-bold text-slate-800 group-hover/link:text-brand-cyan transition-colors">KEA Karnataka Cutoffs</span>
                   <span className="block text-[11px] font-medium text-slate-500">State Quota & MGT Cutoffs</span>
                 </div>
               </Link>
             </div>

             <Link href="/cutoffs/bams" className="mx-2 mt-2 pt-3 border-t border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-cyan transition-colors flex items-center justify-between group/viewall">
               <span>Access All State Cutoffs</span>
               <ArrowRight size={14} className="group-hover/viewall:translate-x-1 transition-transform"/>
             </Link>
          </div>
        </div>

        {/* PILLAR 4: Articles */}
        <Link href="/articles" className="flex items-center gap-1.5 hover:text-brand-cyan px-2 py-6 transition-colors group">
          <BookOpen size={16} className="text-slate-400 group-hover:text-brand-cyan transition-colors" /> Articles
        </Link>

        {/* PILLAR 5: Premium AI Tools */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-slate-800 hover:text-brand-cyan px-2 py-6 transition-colors relative">
            <Zap size={16} className="text-brand-cyan transition-colors" />
            AI Tools 
            <ChevronDown size={14} className="group-hover:rotate-180 text-slate-400 group-hover:text-brand-cyan transition-transform duration-300"/>
          </button>
          
          <div className="absolute top-[80%] right-0 lg:left-1/2 lg:-translate-x-1/2 w-[340px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-2.5 pt-3">
             <div className="absolute -top-4 left-0 w-full h-8 bg-transparent"></div>

             {/* Elite Premium Internal Card */}
             <div className="bg-slate-950 rounded-xl p-1 mb-1">
               <Link href="/pricing" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-900 transition-colors group/premium relative overflow-hidden">
                 <div className="absolute right-0 top-0 w-24 h-24 bg-brand-cyan/20 blur-2xl rounded-full pointer-events-none group-hover/premium:scale-150 transition-transform"></div>
                 <div className="bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan w-10 h-10 flex items-center justify-center rounded-lg shrink-0 relative z-10"><Bot size={20} strokeWidth={2.5}/></div>
                 <div className="relative z-10">
                   <span className="block text-sm font-bold text-white group-hover/premium:text-brand-cyan transition-colors">AI Counselor</span>
                   <span className="block text-[11px] font-medium text-slate-400 mt-0.5">24/7 Personalized Admission Strategy</span>
                 </div>
               </Link>
             </div>

             <Link href="/cutoffs/bams" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
               <div className="bg-white border border-slate-200 shadow-sm p-2.5 rounded-lg group-hover/link:border-brand-cyan/40 group-hover/link:text-brand-cyan text-slate-500 transition-colors"><FileText size={18} strokeWidth={2.5}/></div>
               <div className="w-full">
                 <span className="block text-sm font-bold text-slate-800 group-hover/link:text-brand-cyan transition-colors">Cutoff Reports</span>
                 <span className="block text-[11px] font-medium text-slate-500 mt-0.5">Downloadable PDF Rank Matrices</span>
               </div>
             </Link>
          </div>
        </div>

      </div>

      {/* 3. RIGHT CTAS, LOGIN & MOBILE TOGGLE */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        
        <Link href="/cutoffs/bams" className="hidden md:flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm p-1.5 pr-4 rounded-full transition-all group">
          <div className="bg-slate-100 text-slate-600 w-7 h-7 flex items-center justify-center rounded-full group-hover:bg-slate-800 group-hover:text-white transition-colors">
            <Database size={12} strokeWidth={2.5} />
          </div>
          <span className="text-[12px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Cutoff Data</span>
        </Link>

        <Link href="/pricing" className="hidden xl:flex items-center gap-2 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700 hover:border-brand-cyan/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_15px_-3px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(8,145,178,0.4)] p-1.5 pr-4 rounded-full transition-all group">
          <div className="bg-brand-cyan/20 text-brand-cyan w-7 h-7 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
            <Bot size={14} strokeWidth={2.5} className="animate-pulse" />
          </div>
          <span className="text-[12px] font-bold text-white tracking-wide">AI Counselor</span>
        </Link>
        
        <div className="pl-1 sm:pl-1 border-l border-slate-200 sm:border-none ml-1 sm:ml-0">
          <LoginButton />
        </div>

        {/* Minimal Mobile Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm ml-1"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </button>
      </div>

      {/* =====================================================================
          4. MOBILE BENTO-BOX DRAWER (Color-Coded & Engaging)
          ===================================================================== */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-slate-200 shadow-2xl lg:hidden flex flex-col max-h-[calc(100vh-72px)] overflow-y-auto animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="p-4 sm:p-6 flex flex-col gap-4">
            
            {/* Pillar 1: Colleges (Cyan) */}
            <Link href="/bams-colleges" onClick={closeMenu} className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 shadow-sm rounded-2xl font-bold text-slate-700 text-sm hover:border-brand-cyan/30 transition-colors">
              <div className="bg-cyan-50 border border-cyan-100 text-cyan-600 p-2 rounded-lg"><Landmark size={18} strokeWidth={2.5}/></div>
              BAMS Colleges Directory
            </Link>

            {/* Pillar 2 & 3 Grid */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* Pillar 2: Counselling (Orange) */}
              <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 pt-2 pb-1">Counselling 2026</div>
                
                <Link href="/counselling/bams/aaccc" onClick={closeMenu} className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-xl font-bold text-slate-700 transition-colors">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded-lg shrink-0"><Globe size={16} strokeWidth={2.5}/></div>
                  <div className="flex flex-col">
                    <span>AACCC AYUSH UG 2026</span>
                    <span className="text-xs text-slate-500 font-medium">15% All India Quota</span>
                  </div>
                </Link>
                
                <Link href="/counselling/bams/state-level" onClick={closeMenu} className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-xl font-bold text-slate-700 transition-colors mt-1">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded-lg shrink-0"><Navigation size={16} strokeWidth={2.5}/></div>
                  <div className="flex flex-col">
                    <span>State Level Counselling</span>
                    <span className="text-xs text-slate-500 font-medium">KEA, MH CET, UP & More</span>
                  </div>
                </Link>
                
                <Link href="/counselling/bams" onClick={closeMenu} className="flex items-center justify-between p-3 mt-2 bg-orange-50 rounded-xl font-bold text-orange-600 transition-colors">
                  <span className="text-[10px] uppercase tracking-widest">Explore State-wise Process</span>
                  <ArrowRight size={14}/>
                </Link>
              </div>

              {/* Pillar 3: Cutoffs (Rose) */}
              <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 pt-2 pb-1">NEET Cutoffs</div>
                
                <Link href="/cutoffs/bams/aaccc" onClick={closeMenu} className="flex items-center gap-3 p-3 hover:bg-rose-50 rounded-xl font-bold text-slate-700 transition-colors">
                  <div className="bg-rose-50 text-rose-600 p-2 rounded-lg shrink-0"><Database size={16} strokeWidth={2.5}/></div>
                  <div className="flex flex-col">
                    <span>AACCC UG Cutoffs</span>
                    <span className="text-xs text-slate-500 font-medium">Category-wise AIQ Ranks</span>
                  </div>
                </Link>
                
                <Link href="/cutoffs/bams/karnataka-kea" onClick={closeMenu} className="flex items-center gap-3 p-3 hover:bg-rose-50 rounded-xl font-bold text-slate-700 transition-colors mt-1">
                  <div className="bg-rose-50 text-rose-600 p-2 rounded-lg shrink-0"><LineChart size={16} strokeWidth={2.5}/></div>
                  <div className="flex flex-col">
                    <span>KEA Karnataka Cutoffs</span>
                    <span className="text-xs text-slate-500 font-medium">State Quota & MGT</span>
                  </div>
                </Link>
                
                <Link href="/cutoffs/bams" onClick={closeMenu} className="flex items-center justify-between p-3 mt-2 bg-rose-50 rounded-xl font-bold text-rose-600 transition-colors">
                  <span className="text-[10px] uppercase tracking-widest">Access All State Cutoffs</span>
                  <ArrowRight size={14}/>
                </Link>
              </div>

            </div>

            {/* Bottom Row: Articles (Emerald) & Premium CTAs (Violet) */}
            <div className="pt-2 flex flex-col gap-3 pb-8">
              <Link href="/articles" onClick={closeMenu} className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 shadow-sm rounded-2xl font-bold text-slate-700 text-sm hover:border-emerald-300 transition-colors">
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-2 rounded-lg"><BookOpen size={16} strokeWidth={2.5}/></div>
                Articles & Guides
              </Link>

              <Link href="/cutoffs/bams" onClick={closeMenu} className="flex items-center justify-between p-3.5 pr-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 transition-all group">
                 <div className="flex items-center gap-3">
                   <div className="bg-violet-50 border border-violet-100 text-violet-600 w-10 h-10 flex items-center justify-center rounded-xl"><FileText size={18} strokeWidth={2.5}/></div>
                   <div className="flex flex-col text-left">
                     <span className="text-sm font-bold text-slate-800">BAMS Cutoff Reports</span>
                     <span className="text-[11px] font-medium text-slate-500">Download complete PDFs</span>
                   </div>
                 </div>
              </Link>

              <Link href="/pricing" onClick={closeMenu} className="flex items-center justify-between p-3.5 pr-4 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700 shadow-lg hover:border-brand-cyan/50 transition-all group overflow-hidden relative">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/20 via-transparent to-transparent opacity-50"></div>
                 <div className="flex items-center gap-3 relative z-10">
                   <div className="bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan w-10 h-10 flex items-center justify-center rounded-xl"><Bot size={18} strokeWidth={2.5} className="animate-pulse"/></div>
                   <div className="flex flex-col text-left">
                     <span className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">AI Counselor</span>
                     <span className="text-[11px] font-medium text-slate-400">Premium Admission Guide</span>
                   </div>
                 </div>
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}