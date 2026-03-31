"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Clock, Calendar, User, Search, Tag, 
  TrendingUp, AlertTriangle, Target, BookOpen, Sparkles, ArrowRight, 
  Home, Database, Lock, Bot, BellRing, 
  Shield, Zap, MapPin, Landmark, Globe, Loader2, Activity, Rocket, ArrowUpRight,
  Compass, Crown, Star, ChevronRight, Layers, LayoutGrid, FileText, BadgeIndianRupee, Building, CheckCircle2
} from 'lucide-react';

import MagneticWrapper from '@/components/MagneticWrapper';

// ============================================================================
// SUPABASE DIRECT CONNECTION
// ============================================================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// DATA & HELPERS
// ============================================================================
const getCategoryStyles = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'scams & alerts': return { color: 'text-rose-600', bg: 'bg-rose-50', icon: AlertTriangle, border: 'border-rose-200' };
    case 'fee & bonds': return { color: 'text-amber-600', bg: 'bg-amber-50', icon: BadgeIndianRupee, border: 'border-amber-200' };
    case 'cutoff scenarios': return { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Target, border: 'border-indigo-200' };
    case 'counselling guides': return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: BookOpen, border: 'border-emerald-200' };
    case 'nri quota': return { color: 'text-purple-600', bg: 'bg-purple-50', icon: Globe, border: 'border-purple-200' };
    case 'state quota': return { color: 'text-blue-600', bg: 'bg-blue-50', icon: MapPin, border: 'border-blue-200' };
    case 'college reviews': return { color: 'text-teal-600', bg: 'bg-teal-50', icon: Star, border: 'border-teal-200' };
    default: return { color: 'text-slate-600', bg: 'bg-slate-100', icon: Tag, border: 'border-slate-200' };
  }
};

const getArticleSnippet = (article: any) => {
  if (article.excerpt && article.excerpt.trim() !== "") return article.excerpt;
  if (article.content) {
    const cleanText = article.content.replace(/[#*`]/g, '').slice(0, 160);
    return cleanText + "...";
  }
  return "Expert data analysis and official cutoff trends for the 2026 AYUSH admission cycle.";
};

// ============================================================================
// STRUCTURAL & PRODUCT CTA COMPONENTS
// ============================================================================

const PillarHubsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
    <Link href="/counselling/karnataka-kea" className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 hover:border-brand-cyan transition-all shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Compass size={56}/></div>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg"><MapPin size={16}/></span>
        <h3 className="font-black text-slate-900 text-base group-hover:text-brand-cyan transition-colors">KEA Karnataka</h3>
      </div>
      <p className="text-xs text-slate-500 font-medium relative z-10">State quota process, document verification, and option entry.</p>
    </Link>
    <Link href="/counselling/aaccc" className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-500 transition-all shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Globe size={56}/></div>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <span className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Landmark size={16}/></span>
        <h3 className="font-black text-slate-900 text-base group-hover:text-indigo-600 transition-colors">AACCC AIQ</h3>
      </div>
      <p className="text-xs text-slate-500 font-medium relative z-10">15% All India Quota, Central Universities, and National Institutes.</p>
    </Link>
    <Link href="/colleges/bams-karnataka" className="group relative overflow-hidden bg-slate-950 border border-slate-800 rounded-2xl p-4 hover:border-amber-500 transition-all shadow-sm hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <span className="bg-amber-500/20 text-amber-400 p-2 rounded-lg"><Crown size={16}/></span>
        <h3 className="font-black text-white text-base group-hover:text-amber-400 transition-colors">Top BAMS Colleges</h3>
      </div>
      <p className="text-xs text-slate-400 font-medium relative z-10">Rankings, honest reviews, and hidden fee structures for 2026.</p>
    </Link>
  </div>
);

// --- THE CUTOFF VAULT (Mobile-Optimized Compact UI) ---
const EssentialGuidesWidget = () => {
  const vaultItems = [
    // IMPORTANT: Replace the link below with your actual published article slug!
    { title: "Govt Colleges: AACCC Category Cutoffs", desc: "Track exact closing ranks for General, OBC, EWS, SC & ST across the 15% All India Quota.", badge: "AACCC AIQ", icon: Landmark, theme: "blue", link: "/articles/bams-cutoff-for-government-colleges" },
    { title: "Karnataka Govt & Private Cutoffs", desc: "Category-wise cutoff scores and historic trends for all BAMS colleges in Karnataka.", badge: "State Quota", icon: MapPin, theme: "indigo", link: "#" },
    { title: "Management Quota Cutoffs in Karnataka", desc: "Uncover the precise NEET ranks and hidden fee structures required for direct admission.", badge: "Mgt Quota", icon: Crown, theme: "amber", link: "#" },
    { title: "AIQ Cutoffs in Private BAMS Colleges", desc: "Analyze the 15% AIQ closing ranks and budget requirements for top private institutes.", badge: "Private AIQ", icon: Target, theme: "emerald", link: "#" },
    { title: "Top BAMS Colleges: AIQ, Mgt & NRI Cutoffs", desc: "The elite tier. See the historic NEET scores required to secure seats globally.", badge: "Elite Tier", icon: Star, theme: "rose", link: "#" },
    { title: "BAMS Safe Scores 2026 (State-Wise)", desc: "A mathematical breakdown of guaranteed safe scores across all major state counseling boards.", badge: "Predictive", icon: TrendingUp, theme: "cyan", link: "#" }
  ];

  const getThemeStyles = (theme: string) => {
    switch(theme) {
      case 'blue': return { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hoverBorder: 'hover:border-blue-400', glow: 'hover:shadow-blue-500/20', stroke: 'stroke-blue-400', btnHover: 'group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600' };
      case 'indigo': return { bg: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', hoverBorder: 'hover:border-indigo-400', glow: 'hover:shadow-indigo-500/20', stroke: 'stroke-indigo-400', btnHover: 'group-hover/item:bg-indigo-600 group-hover/item:text-white group-hover/item:border-indigo-600' };
      case 'amber': return { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hoverBorder: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', stroke: 'stroke-amber-400', btnHover: 'group-hover/item:bg-amber-500 group-hover/item:text-white group-hover/item:border-amber-500' };
      case 'emerald': return { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', hoverBorder: 'hover:border-emerald-400', glow: 'hover:shadow-emerald-500/20', stroke: 'stroke-emerald-400', btnHover: 'group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:border-emerald-500' };
      case 'rose': return { bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', hoverBorder: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', stroke: 'stroke-rose-400', btnHover: 'group-hover/item:bg-rose-500 group-hover/item:text-white group-hover/item:border-rose-500' };
      case 'cyan': return { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', hoverBorder: 'hover:border-cyan-400', glow: 'hover:shadow-cyan-500/20', stroke: 'stroke-cyan-400', btnHover: 'group-hover/item:bg-cyan-500 group-hover/item:text-white group-hover/item:border-cyan-500' };
      default: return { bg: 'bg-slate-500', light: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', hoverBorder: 'hover:border-slate-400', glow: 'hover:shadow-slate-500/20', stroke: 'stroke-slate-400', btnHover: 'group-hover/item:bg-slate-600 group-hover/item:text-white group-hover/item:border-slate-600' };
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-5 sm:p-7 shadow-sm border border-slate-200 mb-8 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      <div className="absolute -right-40 -top-40 w-80 h-80 bg-brand-cyan/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-slate-100 pb-4 relative z-10 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="bg-slate-950 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-md relative shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-50"></div>
            <Database size={22} className="relative z-10 text-brand-cyan"/>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_6px_rgba(8,145,178,0.6)] animate-pulse"></span>
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Master Database</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">The Cutoff Vault</h3>
          </div>
        </div>
        <Link href="/articles?pillar=Cutoff Scenarios" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-brand-cyan bg-slate-50 hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 hover:border-brand-cyan/30 w-fit shrink-0 shadow-sm">
          Access Data <ArrowRight size={12}/>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 relative z-10">
        {vaultItems.map((item, i) => {
          const theme = getThemeStyles(item.theme);
          return (
            <Link key={i} href={item.link} className={`group/item flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-slate-100 ${theme.hoverBorder} ${theme.glow} transition-all duration-300 relative overflow-hidden gap-4`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bg} scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center`}></div>
              
              <div className="flex items-start sm:items-center gap-4 flex-1 overflow-hidden w-full">
                <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.light} ${theme.text} flex items-center justify-center border ${theme.border} group-hover/item:scale-110 transition-transform duration-300 shadow-sm`}>
                  <item.icon size={20} strokeWidth={2.5}/>
                </div>
                <div className="flex flex-col flex-1 w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded flex items-center text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${theme.light} ${theme.text}`}>{item.badge}</span>
                  </div>
                  <h4 className="text-sm sm:text-[15px] font-black text-slate-900 group-hover/item:text-slate-950 leading-tight whitespace-normal pr-2">{item.title}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1 line-clamp-2 sm:line-clamp-1 font-medium">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5 shrink-0 pl-14 sm:pl-0 mt-2 sm:mt-0">
                <svg width="28" height="12" viewBox="0 0 40 20" className={`${theme.stroke} opacity-20 group-hover/item:opacity-100 transition-opacity hidden sm:block`}>
                  <polyline fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="0,15 10,8 20,12 30,2 40,5" />
                </svg>
                <div className={`flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-4 py-2 sm:py-2.5 rounded-lg border border-slate-200 text-slate-500 bg-slate-50 transition-all duration-300 ${theme.btnHover}`}>
                  View Trends <ArrowRight size={12} className="-translate-x-1 group-hover/item:translate-x-0 transition-transform duration-300"/>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

const KEA_Counselling_Cluster = () => {
  const coreLinks = [
    { title: "Counselling Overview", desc: "Complete 2026 Guide", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", link: "#" },
    { title: "Important Dates", desc: "Schedule & Deadlines", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", link: "#" },
    { title: "Registration Process", desc: "Step-by-step Setup", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", link: "#" },
    { title: "Detailed Fees", desc: "Govt & Private Seats", icon: BadgeIndianRupee, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", link: "#" },
    { title: "Affordable Colleges", desc: "Budget-friendly Options", icon: Landmark, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100", link: "#" },
    { title: "Management Quota", desc: "Direct Admission Rules", icon: Crown, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", link: "#" },
    { title: "Admission Steps", desc: "Post-Allotment Process", icon: Layers, color: "text-fuchsia-600", bg: "bg-fuchsia-50", border: "border-fuchsia-100", link: "#" },
    { title: "Complete College List", desc: "All BAMS Institutes", icon: Building, color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", link: "#" }
  ];

  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-5 sm:p-6 border border-slate-200 shadow-sm my-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3.5 mb-6 border-b border-slate-100 pb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-brand-cyan flex items-center justify-center shadow-lg shadow-blue-500/20">
          <MapPin size={20} className="text-white"/>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">KEA Karnataka Hub 2026</h3>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">Your complete roadmap to state counseling</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
        <Link href="#" className="col-span-2 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-rose-500 to-orange-500 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform"><Zap size={80} className="text-white"/></div>
          <div className="relative z-10 flex items-start justify-between w-full mb-2">
             <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
               <span className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-ping"></span> Live Updates
             </span>
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-rose-500 text-white transition-colors">
               <ArrowRight size={14}/>
             </div>
          </div>
          <h4 className="relative z-10 text-white font-black text-base sm:text-lg leading-snug">KEA Announcements & News</h4>
        </Link>

        <Link href="#" className="col-span-2 md:col-span-1 lg:col-span-2 bg-slate-950 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between min-h-[110px]">
           <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform"><Target size={80} className="text-brand-cyan"/></div>
           <div className="relative z-10 flex items-start justify-between w-full mb-2">
             <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center border border-brand-cyan/30">
               <Target size={20} className="text-brand-cyan"/>
             </div>
           </div>
           <div className="relative z-10">
             <h4 className="text-white font-black text-base sm:text-lg leading-snug group-hover:text-brand-cyan transition-colors">State & AIQ Cutoffs</h4>
             <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 font-medium">Category-wise closing ranks</p>
           </div>
        </Link>

        {coreLinks.map((item, i) => (
          <Link key={i} href={item.link} className={`col-span-1 p-3.5 sm:p-4 rounded-2xl border ${item.border} bg-white hover:${item.bg} hover:border-transparent hover:shadow-md transition-all group flex flex-col h-full`}>
             <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shrink-0 ${item.color} shadow-sm`}>
               <item.icon size={20} strokeWidth={2.5}/>
             </div>
             <div className="mt-auto">
               <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight group-hover:text-brand-cyan transition-colors mb-0.5">{item.title}</h4>
               <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-snug">{item.desc}</p>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductCTA_Dashboard = () => (
  <div className="col-span-1 md:col-span-2 bg-slate-950 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 group my-4">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/15 via-slate-950 to-slate-950 pointer-events-none" />
    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-brand-cyan/20 blur-[100px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
    <div className="relative z-10 flex-1 text-center md:text-left">
      <div className="inline-flex items-center gap-2 mb-4 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full">
        <Database size={12} className="text-indigo-400 animate-pulse"/>
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">Platform Feature</span>
      </div>
      <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-indigo-400">State Dashboard</span></h3>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">Stop guessing your chances. Access interactive filters, view exact closing ranks across all rounds, and uncover private college hidden fees instantly.</p>
    </div>
    <div className="relative z-10 shrink-0 w-full md:w-auto">
      <MagneticWrapper>
        <Link href="/pricing" className="w-full md:w-auto bg-brand-cyan hover:bg-white text-slate-950 font-black text-[11px] sm:text-[12px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-[0_0_40px_rgba(8,145,178,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]">
          <Target size={16}/> Access Dashboard
        </Link>
      </MagneticWrapper>
    </div>
  </div>
);

const ProductCTA_Counselor = () => (
  <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#FFF8F3] to-[#FEF1E6] border border-[#FADCC7] rounded-[2rem] p-6 sm:p-10 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group my-4">
    <div className="absolute -right-10 -bottom-10 opacity-[0.04] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 pointer-events-none">
      <Shield size={220} className="text-orange-900"/>
    </div>
    <div className="relative z-10 flex-1 text-center md:text-left">
      <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
        <Bot size={12} className="text-orange-600"/>
        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest font-mono">AI Platform Tool</span>
      </div>
      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
        Need a Flawless <br className="hidden sm:block"/><span className="text-orange-600">Preference List?</span>
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg font-medium mx-auto md:mx-0">
        Don't risk a bad KEA allotment. Let our AI Counselor analyze your NEET rank and build a personalized, trap-free Option Entry list automatically.
      </p>
    </div>
    <div className="relative z-10 shrink-0 w-full md:w-auto">
      <MagneticWrapper>
        <Link href="/pricing" className="w-full md:w-auto bg-orange-500 hover:bg-slate-900 text-white font-black text-[11px] sm:text-[12px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 hover:scale-[1.02]">
          <Layers size={16}/> Generate My List
        </Link>
      </MagneticWrapper>
    </div>
  </div>
);

const SidebarCTA_AICounselor = () => (
  <div className="bg-slate-950 rounded-[2.5rem] p-8 relative overflow-hidden shadow-lg group border border-slate-800">
    <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
      <Bot size={120} className="text-brand-cyan"/>
    </div>
    <div className="relative z-10">
      <span className="bg-brand-cyan/10 text-brand-cyan text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-4 inline-block shadow-md border border-brand-cyan/20">
        24/7 Strategy
      </span>
      <h3 className="text-2xl font-black text-white mb-3 leading-tight">
        Chat With Our <br/>AI Counselor
      </h3>
      <p className="text-sm text-slate-400 mb-6 font-medium">
        Have a specific scenario? Ask our AI engine to simulate your chances across all counseling rounds before you lock your choices.
      </p>
      <MagneticWrapper>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-brand-cyan hover:bg-white text-slate-950 font-black text-[11px] uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:scale-[1.02]">
          Start Session <ArrowUpRight size={14}/>
        </button>
      </MagneticWrapper>
    </div>
  </div>
);

// --- ELITE PREMIUM SERVICES SECTION ---
const PremiumServicesSection = () => (
  <div className="mt-24 mb-12">
    <div className="text-center mb-16 px-4 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>
      <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 relative z-10">
        Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-indigo-500">Admission Advantage</span>
      </h2>
      <p className="text-slate-600 font-medium max-w-2xl mx-auto text-sm sm:text-base leading-relaxed relative z-10">
        Stop guessing. Get the exact cutoff data, rank trends, and AI-driven preference lists you need to secure your BAMS seat.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
      
      {/* Service 1: State Level Data (Dark Terminal UI) */}
      <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20 border border-slate-800 hover:border-indigo-500/50 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
        
        <div className="relative z-10 flex-1">
          <div className="flex justify-between items-start mb-6">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-full">
              <Database size={14} className="text-indigo-400 animate-pulse"/>
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Data & Analytics</span>
            </div>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            State Level <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-indigo-400">Full Cutoff Data</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
            Comprehensive cutoff data for all rounds and quotas, combined with a powerful interactive dashboard.
          </p>
          
          <ul className="space-y-5 mb-10">
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><Layers size={14} className="text-indigo-400"/></div>
              <div><span className="block text-sm text-white font-bold mb-0.5">All Quotas & Rounds</span><span className="block text-xs text-slate-400 font-medium">State Quota, AIQ, Management, and NRI cutoffs.</span></div>
            </li>
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><TrendingUp size={14} className="text-indigo-400"/></div>
              <div><span className="block text-sm text-white font-bold mb-0.5">Rank to Score Mapping</span><span className="block text-xs text-slate-400 font-medium">Closing ranks mapped to exact NEET 2025/26 scores.</span></div>
            </li>
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><LayoutGrid size={14} className="text-indigo-400"/></div>
              <div><span className="block text-sm text-white font-bold mb-0.5">Analytics Dashboard</span><span className="block text-xs text-slate-400 font-medium">Filter by city, college type, seat type, fees, and category.</span></div>
            </li>
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><FileText size={14} className="text-indigo-400"/></div>
              <div><span className="block text-sm text-white font-bold mb-0.5">PDF Reports</span><span className="block text-xs text-slate-400 font-medium">Downloadable reference materials for offline use.</span></div>
            </li>
          </ul>
        </div>
        <MagneticWrapper>
          <Link href="/pricing" className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-widest py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 border border-slate-700 hover:border-indigo-400 shadow-lg">
            Get Data Access <ArrowRight size={16}/>
          </Link>
        </MagneticWrapper>
      </div>

      {/* Service 2: AI Counsellor (Vibrant Premium UI) */}
      <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FEF1E6] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20 border border-[#FADCC7] hover:border-orange-400 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-12"></div>
        
        {/* Elite Floating Badge */}
        <div className="absolute top-0 right-8 bg-gradient-to-b from-orange-500 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-b-xl shadow-lg flex items-center gap-1 z-20">
          <Star size={10} className="fill-white"/> Ultimate Value
        </div>

        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 mb-6 bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full mt-4 sm:mt-0">
            <Bot size={14} className="text-orange-600 animate-bounce"/>
            <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Premium AI Engine</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            24/7 Expert <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-500">AI Counsellor</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
            Your personal admission strategist. Get instant answers, tailored college suggestions, and flawless preference lists.
          </p>
          
          <ul className="space-y-5 mb-10">
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-orange-500/20 transition-colors"><Clock size={14} className="text-orange-600"/></div>
              <div><span className="block text-sm text-slate-900 font-bold mb-0.5">24/7 Availability</span><span className="block text-xs text-slate-600 font-medium">Instant answers to complex counseling queries anytime.</span></div>
            </li>
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-orange-500/20 transition-colors"><Activity size={14} className="text-orange-600"/></div>
              <div><span className="block text-sm text-slate-900 font-bold mb-0.5">Trend Analysis</span><span className="block text-xs text-slate-600 font-medium">Understand cutoff shifts based on your exact academics.</span></div>
            </li>
            <li className="flex items-start gap-4 group/list">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-orange-500/20 transition-colors"><Sparkles size={14} className="text-orange-600"/></div>
              <div><span className="block text-sm text-slate-900 font-bold mb-0.5">Smart Suggestions</span><span className="block text-xs text-slate-600 font-medium">Best college options matching your fee budget and quota.</span></div>
            </li>
            
            {/* Highlighted "Included" Feature with Shine Effect */}
            <li className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-orange-200 shadow-sm relative overflow-hidden group/highlight mt-2">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 translate-x-[-100%] group-hover/highlight:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0"><Zap size={14} className="text-rose-600 fill-rose-500/20"/></div>
              <div><span className="block text-sm text-slate-900 font-black mb-0.5">Includes Dashboard Access</span><span className="block text-xs text-slate-600 font-medium">Get full access to the State Level Cutoff Data Dashboard.</span></div>
            </li>
          </ul>
        </div>
        <MagneticWrapper>
          <Link href="/pricing" className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-widest py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_50px_rgba(249,115,22,0.4)]">
            Hire AI Counsellor <ArrowRight size={16}/>
          </Link>
        </MagneticWrapper>
      </div>

    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ArticlesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [dynamicArticles, setDynamicArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentPillar = searchParams?.get('pillar') || 'all';

  const updatePillar = (pillar: string) => {
    router.push(`?pillar=${encodeURIComponent(pillar)}`, { scroll: false });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setDynamicArticles(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setDynamicArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
        <div className="bg-slate-950 pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden border-b border-slate-800 animate-pulse">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 justify-between">
              <div className="flex-1 lg:max-w-2xl">
                 <div className="h-12 bg-slate-800/50 rounded-xl w-3/4 mb-4"></div>
                 <div className="h-4 bg-slate-800/50 rounded-lg w-1/2"></div>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 mb-24 w-full animate-pulse flex flex-col xl:flex-row gap-10">
          <div className="flex-1 xl:max-w-[66%]"><div className="h-[400px] bg-slate-200 rounded-[2rem]"></div></div>
        </div>
      </div>
    );
  }

  const uniqueCategories = Array.from(new Set(dynamicArticles.map(a => a.category))).filter(Boolean);

  const filteredArticles = dynamicArticles.filter(article => {
    const matchesPillar = currentPillar === 'all' || article.category?.toLowerCase() === currentPillar.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
                          article.title?.toLowerCase().includes(searchLower) || 
                          (article.excerpt && article.excerpt.toLowerCase().includes(searchLower)) ||
                          (article.content && article.content.toLowerCase().includes(searchLower));
    
    return matchesPillar && matchesSearch;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* HERO SECTION WITH FIXED ALIGNMENT */}
      <div className="bg-slate-950 pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0891b2 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center text-[10px] font-bold text-slate-500 mb-4 sm:mb-6 uppercase tracking-widest gap-2">
            <Link href="/" className="hover:text-brand-cyan flex items-center gap-1 transition-colors"><Home size={12}/> Home</Link>
            <span className="text-slate-700">/</span><span className="text-brand-cyan">Intelligence Hub</span>
          </nav>
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            {/* Widened container to max-w-2xl to fix line breaking */}
            <div className="flex-1 lg:max-w-2xl xl:max-w-3xl relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-2 shadow-sm backdrop-blur-sm"><Sparkles size={12}/> Data Desk</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-2 backdrop-blur-sm"><Rocket size={12}/> Auto-Sync Active</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">Admission Intelligence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">Expert Roadmaps</span></h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed font-medium mb-6">Master the 2026 KEA and AACCC counselling processes. Deep-dive into historic cutoff trends and build a foolproof strategy.</p>
            </div>
            <div className="w-full lg:w-[420px] shrink-0 relative z-10 flex flex-col items-center lg:items-end">
               <div className="w-full max-w-xs sm:max-w-sm mb-6 flex justify-end">
                 <img src="/analytics-isomatrix.jpg" alt="Digital Analytics Hub" className="w-full h-auto object-contain opacity-90 drop-shadow-2xl" />
               </div>
               <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-2 rounded-2xl flex items-center shadow-xl w-full">
                  <div className="pl-4 pr-2 text-slate-500"><Search size={18}/></div>
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search guides & rules..." className="w-full bg-transparent text-white placeholder-slate-500 text-sm py-2.5 focus:outline-none font-medium" />
                  <button className="bg-brand-cyan hover:bg-white text-slate-950 font-black text-[10px] sm:text-[11px] uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md hover:scale-[1.02]">Search</button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 w-full relative z-20">
        
        {/* Hub Grid Restored */}
        {currentPillar === 'all' && !searchQuery && <PillarHubsGrid />}

        <div className="flex flex-col xl:flex-row gap-10">
          <div className="flex-1 xl:max-w-[66%]">
            <div className="flex overflow-x-auto gap-2.5 pb-4 mb-6 no-scrollbar">
              <button onClick={() => updatePillar('all')} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${currentPillar === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-brand-cyan hover:text-brand-cyan'}`}><LayoutGrid size={14}/> All Insights</button>
              {uniqueCategories.map((category: any) => {
                const iconComponent = getCategoryStyles(category).icon;
                return (<button key={category} onClick={() => updatePillar(category)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${currentPillar === category ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-brand-cyan hover:text-brand-cyan'}`}>{React.createElement(iconComponent, { size: 14 })} {category}</button>)
              })}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-[2rem] p-16 text-center mb-16 shadow-sm">
                <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">No intelligence found</h3>
                <p className="text-sm text-slate-500 font-medium">Try adjusting your search or check back later.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {featuredArticle && !searchQuery && (
                  <Link href={`/articles/${featuredArticle.slug}`} className="block bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-6 group">
                    <div className="flex flex-col sm:flex-row h-full">
                       <div className="w-full sm:w-[45%] h-56 sm:h-auto relative overflow-hidden bg-slate-100">
                          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${featuredArticle.cover_image_url || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop'})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm flex items-center gap-1.5"><Zap size={12} className="text-amber-500"/> Featured</div>
                       </div>
                       <div className="w-full sm:w-[55%] p-6 sm:p-8 flex flex-col justify-center">
                          {(() => {
                            const styles = getCategoryStyles(featuredArticle.category);
                            const Icon = styles.icon;
                            return (<div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3"><span className={`flex items-center gap-1.5 ${styles.bg} ${styles.color} ${styles.border} border px-2 py-1 rounded-md`}><Icon size={10}/> {featuredArticle.category}</span><span className="flex items-center gap-1.5"><Clock size={10}/> {featuredArticle.read_time || '5 min'}</span></div>);
                          })()}
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug group-hover:text-brand-cyan transition-colors line-clamp-3">{featuredArticle.title}</h2>
                          <p className="text-xs sm:text-sm text-slate-600 mb-5 line-clamp-2 font-medium">{getArticleSnippet(featuredArticle)}</p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center"><User size={12}/></div>
                              <div><span className="block text-[10px] sm:text-xs font-black text-slate-900">{featuredArticle.author || 'Data Desk'}</span><span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">{featuredArticle.published_at ? new Date(featuredArticle.published_at).toLocaleDateString() : 'Recent'}</span></div>
                            </div>
                          </div>
                       </div>
                    </div>
                  </Link>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {gridArticles.map((article: any, idx: number) => {
                    const styles = getCategoryStyles(article.category);
                    const Icon = styles.icon;
                    return (
                      <React.Fragment key={article.id || idx}>
                        
                        {/* INJECTED PROMOS */}
                        {!searchQuery && idx === 1 && currentPillar === 'all' && <EssentialGuidesWidget />}
                        {!searchQuery && idx === 3 && currentPillar === 'all' && <ProductCTA_Dashboard />}
                        {!searchQuery && idx === 4 && currentPillar === 'all' && <KEA_Counselling_Cluster />}
                        {!searchQuery && idx === 5 && currentPillar === 'all' && <ProductCTA_Counselor />}

                        <Link href={`/articles/${article.slug}`} className="flex flex-row bg-white rounded-2xl border border-slate-200 p-3 shadow-sm hover:shadow-md transition-all group items-stretch h-[150px] sm:h-[180px] relative">
                           <div className="w-28 sm:w-36 shrink-0 rounded-xl overflow-hidden relative bg-slate-100 mr-4">
                             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${article.cover_image_url || article.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop'})` }} />
                           </div>
                           <div className="flex flex-col flex-1 py-1 overflow-hidden">
                              <div className="flex items-center justify-between mb-2"><span className={`${styles.color} text-[8px] sm:text-[9px] font-black uppercase tracking-widest flex items-center gap-1`}><Icon size={10}/> <span className="truncate">{article.category}</span></span></div>
                              <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1.5 group-hover:text-brand-cyan transition-colors leading-tight line-clamp-3">{article.title}</h3>
                              <p className="hidden sm:block text-xs text-slate-500 leading-snug flex-1 line-clamp-2 font-medium">{getArticleSnippet(article)}</p>
                              <div className="mt-auto flex items-center justify-between pt-2"><span className="text-[9px] sm:text-[10px] font-bold text-slate-400">{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span><span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight size={10}/></span></div>
                           </div>
                        </Link>
                      </React.Fragment>
                    )
                  })}
                </div>

                {/* RENDERING FALLBACK WIDGETS IF DB HAS TOO FEW ARTICLES */}
                {!searchQuery && currentPillar === 'all' && (
                  <div className="space-y-8 mt-8">
                    {gridArticles.length <= 1 && <EssentialGuidesWidget />}
                    {gridArticles.length <= 3 && <ProductCTA_Dashboard />}
                    {gridArticles.length <= 4 && <KEA_Counselling_Cluster />}
                    {gridArticles.length <= 5 && <ProductCTA_Counselor />}
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-[34%] shrink-0">
            <div className="sticky top-28 space-y-6 mb-20">
              <SidebarCTA_AICounselor />
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden group hover:border-rose-200 transition-colors duration-500">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/5 rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 tracking-tight flex items-center gap-2 relative z-10"><BellRing size={18} className="text-rose-500 group-hover:animate-bounce"/> WhatsApp Alerts</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed relative z-10 font-medium">Don't miss the Option Entry window. Get instantly notified when KEA releases the official seat matrix.</p>
                <div className="space-y-3 relative z-10">
                  <input type="text" placeholder="Enter Mobile Number" className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm px-4 py-3 sm:py-3.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-bold text-slate-900 placeholder:font-normal placeholder:text-slate-400 transition-all" />
                  <button className="w-full bg-slate-900 hover:bg-rose-500 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]">Subscribe Free</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* ELITE PAID SERVICES SECTION */}
        <PremiumServicesSection />

      </main>
    </div>
  );
}

export default function Articles() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-12 h-12 text-brand-cyan animate-spin" /></div>}>
      <ArticlesContent />
    </Suspense>
  );
}