'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building, MapPin, ArrowRight, Search, 
  Shield, Database, Bot, BellRing, 
  ArrowUpRight, CheckCircle2, Calendar, Users, BadgeIndianRupee,
  Building2, Cpu, Landmark, Briefcase, Leaf, Sprout, Mountain, Map
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
export interface College {
  id: string;
  ayush_college_id: string | null;
  name: string;
  slug: string;
  state_slug: string | null;
  district: string | null;
  ownership_type: string | null;
  courses_offered: string | null;
  ug_seats: number;
  pg_seats: number;
  pg_total_branches: number;
  established_year: number | null;
  tuition_fees: string | null;
  is_page_live: boolean;
}

export interface StateHub {
  slug: string;
  state_name: string;
  counseling_authority: string | null;
  total_colleges: number;
  govt_colleges: number;
  semi_govt_colleges: number;
  private_colleges: number;
}

interface Props {
  colleges: College[];
  stateData: StateHub;
  allStates: StateHub[];
}

// ── Helpers & Theme Engine ────────────────────────────────────────────────
const OWNERSHIP_FILTERS = ['All', 'Government', 'Private', 'Semi-Govt'] as const;
const COURSE_FILTERS = ['All', 'BAMS', 'BHMS', 'BUMS'] as const;
const TOP_STATES = ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat', 'Madhya Pradesh', 'Punjab', 'Uttarakhand'];

// College Card Theme Engine
const getThemeStyles = (type: string | null) => {
  const t = (type || '').toLowerCase();
  if (t.includes('govt') || t.includes('government')) {
    return { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', hoverBorder: 'hover:border-emerald-300', btnHover: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-500' };
  }
  if (t.includes('semi')) {
    return { bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', hoverBorder: 'hover:border-teal-300', btnHover: 'hover:bg-teal-500 hover:text-white hover:border-teal-500' };
  }
  return { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hoverBorder: 'hover:border-amber-300', btnHover: 'hover:bg-amber-500 hover:text-white hover:border-amber-500' };
};

// State Hub Footer Theme Engine (Vibrant SaaS Gradients & Vibe Icons)
const getStateTheme = (stateName: string) => {
  const themes: Record<string, any> = {
    'Maharashtra': { icon: Building2, text: 'text-orange-600', hoverBorder: 'hover:border-orange-400', glow: 'hover:shadow-orange-500/20', gradient: 'from-orange-500 to-rose-500', shadow: 'shadow-orange-500/20', dot: 'bg-orange-500' },
    'Karnataka': { icon: Cpu, text: 'text-blue-600', hoverBorder: 'hover:border-blue-400', glow: 'hover:shadow-blue-500/20', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20', dot: 'bg-blue-500' },
    'Uttar Pradesh': { icon: Landmark, text: 'text-indigo-600', hoverBorder: 'hover:border-indigo-400', glow: 'hover:shadow-indigo-500/20', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/20', dot: 'bg-indigo-500' },
    'Gujarat': { icon: Briefcase, text: 'text-amber-600', hoverBorder: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-500/20', dot: 'bg-amber-500' },
    'Madhya Pradesh': { icon: Leaf, text: 'text-emerald-600', hoverBorder: 'hover:border-emerald-400', glow: 'hover:shadow-emerald-500/20', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/20', dot: 'bg-emerald-500' },
    'Punjab': { icon: Sprout, text: 'text-rose-600', hoverBorder: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', gradient: 'from-rose-400 to-pink-500', shadow: 'shadow-rose-500/20', dot: 'bg-rose-500' },
    'Uttarakhand': { icon: Mountain, text: 'text-sky-600', hoverBorder: 'hover:border-sky-400', glow: 'hover:shadow-sky-500/20', gradient: 'from-sky-400 to-blue-500', shadow: 'shadow-sky-500/20', dot: 'bg-sky-500' },
  };
  return themes[stateName] || { icon: Map, text: 'text-slate-600', hoverBorder: 'hover:border-slate-400', glow: 'hover:shadow-slate-500/20', gradient: 'from-slate-400 to-slate-600', shadow: 'shadow-slate-500/20', dot: 'bg-slate-500' };
};

// ── Sidebar Widgets ────────────────────────────────────────────────────────
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
      <Link href="/pricing" className="w-full bg-brand-cyan hover:bg-white text-slate-950 font-black text-[11px] uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:scale-[1.02]">
        Start Session <ArrowUpRight size={14}/>
      </Link>
    </div>
  </div>
);

const Sidebar_WhatsApp = () => (
  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden group hover:border-rose-200 transition-colors duration-500">
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/5 rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 tracking-tight flex items-center gap-2 relative z-10">
      <BellRing size={18} className="text-rose-500 group-hover:animate-bounce"/> WhatsApp Alerts
    </h3>
    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed relative z-10 font-medium">
      Don't miss the Option Entry window. Get instantly notified when official seat matrices are released.
    </p>
    <div className="space-y-3 relative z-10">
      <input type="text" placeholder="Enter Mobile Number" className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm px-4 py-3 sm:py-3.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-bold text-slate-900 placeholder:font-normal placeholder:text-slate-400 transition-all" />
      <button className="w-full bg-slate-900 hover:bg-rose-500 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]">
        Subscribe Free
      </button>
    </div>
  </div>
);

// ── Main Client Component ──────────────────────────────────────────────────
export default function CollegeDirectoryClient({ colleges, stateData, allStates }: Props) {
  const [search, setSearch] = useState('');
  const [ownershipFilter, setOwnershipFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    return colleges.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || (c.district ?? '').toLowerCase().includes(q);
      const matchesOwnership = ownershipFilter === 'All' || (c.ownership_type ?? '').toLowerCase().includes(ownershipFilter.toLowerCase());
      const matchesCourse = courseFilter === 'All' || (c.courses_offered ?? '').includes(courseFilter);
      return matchesSearch && matchesOwnership && matchesCourse;
    });
  }, [colleges, search, ownershipFilter, courseFilter]);

  const stateSlug = stateData.slug;
  const filteredTopStates = useMemo(() => {
    return allStates
      .filter(s => TOP_STATES.includes(s.state_name))
      .filter((v, i, a) => a.findIndex(t => (t.state_name === v.state_name)) === i);
  }, [allStates]);

  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] min-h-screen font-sans">

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-950 pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0891b2 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center text-[10px] font-bold text-slate-500 mb-4 sm:mb-6 uppercase tracking-widest gap-2">
            <Link href="/colleges" className="hover:text-brand-cyan transition-colors">All States</Link>
            <span className="text-slate-700">/</span><span className="text-brand-cyan">{stateData.state_name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            <div className="flex-1 lg:max-w-2xl xl:max-w-3xl relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-2 shadow-sm backdrop-blur-sm"><Shield size={12}/> {stateData.counseling_authority ?? 'Official Authority'}</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-2 backdrop-blur-sm"><CheckCircle2 size={12}/> Verified Data</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                {stateData.state_name} <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">AYUSH Colleges Directory</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed font-medium mb-6">
                Master the 2026 counseling process. Deep-dive into verified seat matrices, hidden fee structures, and exact academic profiles.
              </p>
            </div>
            
            <div className="w-full lg:w-[420px] shrink-0 relative z-10 flex flex-col items-center lg:items-end">
               <div className="grid grid-cols-2 gap-3 w-full">
                 {[
                   { label: 'Total Colleges', value: stateData.total_colleges, border: 'border-slate-700' },
                   { label: 'Govt Seats', value: stateData.govt_colleges, border: 'border-emerald-500/30', text: 'text-emerald-400' },
                   { label: 'Semi-Govt', value: stateData.semi_govt_colleges, border: 'border-teal-500/30', text: 'text-teal-400' },
                   { label: 'Private', value: stateData.private_colleges, border: 'border-amber-500/30', text: 'text-amber-400' },
                 ].map((stat, i) => (
                   <div key={i} className={`bg-slate-900/60 backdrop-blur-md border ${stat.border} p-4 rounded-2xl flex flex-col justify-center items-center shadow-lg`}>
                     <div className={`text-2xl font-black ${stat.text || 'text-white'}`}>{stat.value ?? 0}</div>
                     <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8 mb-12 w-full relative z-20 flex flex-col xl:flex-row gap-6 sm:gap-10">
        
        {/* LEFT COLUMN: Data & Cards (66%) */}
        <div className="flex-1 xl:max-w-[66%]">
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={16}/></div>
              <input
                type="text"
                placeholder="Search colleges or districts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 text-sm px-10 py-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 font-bold text-slate-900 placeholder:font-normal placeholder:text-slate-400 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
               {OWNERSHIP_FILTERS.map(f => (
                 <button key={f} onClick={() => setOwnershipFilter(f)} className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ownershipFilter === f ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'}`}>
                   {f}
                 </button>
               ))}
            </div>
          </div>

          {/* Master Database Container */}
          <div className="bg-white rounded-2xl sm:rounded-[2rem] p-3 sm:p-7 shadow-sm border border-slate-200 mb-8 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 border-b border-slate-100 pb-3 sm:pb-4 relative z-10 gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl shadow-md relative shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-50"></div>
                  <Database size={20} className="relative z-10 text-brand-cyan"/>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_6px_rgba(8,145,178,0.6)] animate-pulse"></span>
                    <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Verified Data</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-none">Directory Results</h3>
                </div>
              </div>
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-fit shrink-0 shadow-sm">
                Showing {filtered.length}
              </div>
            </div>

            {/* ── ULTRA-SLICK TAB/ROW LAYOUT ── */}
            <div className="flex flex-col gap-3 relative z-10">
              {filtered.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium">No colleges match your current filters.</p>
                </div>
              ) : (
                filtered.map((college) => {
                  const theme = getThemeStyles(college.ownership_type);

                  return (
                    <div key={college.id} className={`group/item relative flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-xl border border-slate-100 p-2.5 sm:p-3 hover:shadow-md transition-all duration-300 ${theme.hoverBorder} overflow-hidden`}>
                      
                      {/* Left Hover Border animation */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bg} scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center rounded-l-xl`}></div>
                      
                      {/* Content Flex Container */}
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full min-w-0">
                        
                        {/* Compact Icon */}
                        <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border ${theme.light} ${theme.text} ${theme.border} ml-1`}>
                          <Building size={16} strokeWidth={2.5}/>
                        </div>
                        
                        {/* Meta Data Block */}
                        <div className="flex flex-col flex-1 min-w-0">
                          
                          {/* Name Line */}
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover/item:text-brand-cyan transition-colors line-clamp-2 sm:line-clamp-1 leading-tight">
                              {college.name}
                            </h4>
                          </div>
                          
                          {/* THE SINGLE LINE META ROW */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] sm:text-[11px] text-slate-500 font-medium">
                            {college.district && (
                              <><div className="flex items-center gap-0.5"><MapPin size={10} className="text-slate-400"/>{college.district}</div><span className="text-slate-300">•</span></>
                            )}
                            {college.established_year && (
                              <><div className="flex items-center gap-0.5"><Calendar size={10} className="text-slate-400"/>Est. {college.established_year}</div><span className="text-slate-300">•</span></>
                            )}
                            <div className="flex items-center gap-0.5"><Shield size={10} className="text-slate-400"/>{college.ownership_type || 'Unknown'}</div>
                            <span className="text-slate-300">•</span>
                            
                            <div className="flex items-center gap-0.5"><Users size={10} className="text-slate-400"/>UG: <strong className="text-slate-700">{college.ug_seats || 0}</strong> / PG: <strong className="text-slate-700">{college.pg_seats || 0}</strong></div>
                            <span className="text-slate-300">•</span>
                            
                            <div className={`flex items-center gap-0.5 font-bold ${college.tuition_fees && college.tuition_fees !== 'TBD' ? 'text-emerald-600' : 'text-slate-500'}`}>
                              <BadgeIndianRupee size={10}/> {college.tuition_fees && college.tuition_fees !== 'TBD' ? `Fee: ₹${college.tuition_fees}` : 'Fee: TBD'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Button */}
                      <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:pl-4 shrink-0 border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
                        {college.is_page_live ? (
                          <Link href={`/colleges/${stateSlug}/${college.slug}`} className={`w-full sm:w-auto flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-4 py-2.5 sm:py-2.5 rounded-lg border border-slate-200 text-slate-700 bg-white transition-all duration-300 ${theme.btnHover}`}>
                            Know Cutoffs <ArrowRight size={12}/>
                          </Link>
                        ) : (
                          <button disabled className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-4 py-2.5 sm:py-2.5 rounded-lg border border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed">
                            Data Pending
                          </button>
                        )}
                      </div>
                      
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar CTA (34%) */}
        <div className="w-full xl:w-[34%] shrink-0">
          <div className="sticky top-28 space-y-6 mb-20">
            <SidebarCTA_AICounselor />
            <Sidebar_WhatsApp />
          </div>
        </div>
      </main>

      {/* ── FOOTER: Explore Top States ────────────────────────────────────────── */}
      {filteredTopStates.length > 0 && (
        <div className="border-t border-slate-200 bg-white mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Top AYUSH States</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Explore directories with the highest concentration of colleges.</p>
              </div>
              <Link href="/colleges" className="text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-200 hover:text-brand-cyan hover:border-brand-cyan/30 bg-slate-50 hover:bg-slate-100 px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2">
                View All States <ArrowRight size={14}/>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredTopStates.map((s) => {
                const sTheme = getStateTheme(s.state_name);
                const StateIcon = sTheme.icon;
                
                return (
                  <Link
                    key={s.slug}
                    href={`/colleges/${s.slug}`}
                    className={`group relative bg-white border border-slate-200 rounded-[1.25rem] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-transparent flex flex-col`}
                  >
                    {/* Dynamic Full-Fill Background on Hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${sTheme.gradient} transition-opacity duration-500`}></div>

                    {/* Background SVG Watermark */}
                    <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 ${sTheme.text} group-hover:text-white group-hover:opacity-10 pointer-events-none`}>
                      <StateIcon size={140} strokeWidth={1}/>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col h-full">
                      
                      {/* State Header & Icon */}
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors leading-tight pr-2">
                            {s.state_name}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-white/80 transition-colors mt-0.5">
                            BAMS Colleges
                          </p>
                        </div>
                        <div className={`w-10 h-10 shrink-0 rounded-[10px] flex items-center justify-center bg-gradient-to-br ${sTheme.gradient} group-hover:bg-none group-hover:bg-white/20 text-white shadow-md group-hover:shadow-none transition-all duration-500`}>
                           <StateIcon size={18} strokeWidth={2.5}/>
                        </div>
                      </div>

                      {/* Separate Outline Pills for Stats */}
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 group-hover:bg-white/10 group-hover:border-white/20 px-3 py-1.5 rounded-full shadow-sm group-hover:shadow-none transition-all duration-500">
                          <span className={`w-1.5 h-1.5 rounded-full ${sTheme.dot} group-hover:bg-white transition-colors`}></span>
                          <span className="text-[9px] font-black text-slate-500 group-hover:text-white/80 uppercase tracking-widest transition-colors">Govt</span>
                          <span className="text-xs font-black text-slate-900 group-hover:text-white transition-colors">{s.govt_colleges ?? 0}</span>
                        </div>
                        
                        {(s.semi_govt_colleges && s.semi_govt_colleges > 0) ? (
                          <div className="flex items-center gap-1.5 bg-white border border-slate-200 group-hover:bg-white/10 group-hover:border-white/20 px-3 py-1.5 rounded-full shadow-sm group-hover:shadow-none transition-all duration-500">
                            <span className={`w-1.5 h-1.5 rounded-full ${sTheme.dot} group-hover:bg-white transition-colors`}></span>
                            <span className="text-[9px] font-black text-slate-500 group-hover:text-white/80 uppercase tracking-widest transition-colors">Semi</span>
                            <span className="text-xs font-black text-slate-900 group-hover:text-white transition-colors">{s.semi_govt_colleges}</span>
                          </div>
                        ) : null}

                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 group-hover:bg-white/10 group-hover:border-white/20 px-3 py-1.5 rounded-full shadow-sm group-hover:shadow-none transition-all duration-500">
                          <span className={`w-1.5 h-1.5 rounded-full ${sTheme.dot} group-hover:bg-white transition-colors`}></span>
                          <span className="text-[9px] font-black text-slate-500 group-hover:text-white/80 uppercase tracking-widest transition-colors">Pvt</span>
                          <span className="text-xs font-black text-slate-900 group-hover:text-white transition-colors">{s.private_colleges ?? 0}</span>
                        </div>
                      </div>

                      {/* Gradient Inverting CTA Button */}
                      <div className={`mt-auto w-full rounded-xl flex items-center justify-between px-4 py-3.5 transition-all duration-500 bg-gradient-to-r ${sTheme.gradient} group-hover:bg-none group-hover:bg-white shadow-md group-hover:shadow-xl`}>
                         <div className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-white group-hover:text-slate-900 transition-colors flex items-center gap-1.5`}>
                            Explore <span className="font-black text-[13px] sm:text-[14px]">{s.total_colleges ?? 0}</span> Colleges
                         </div>
                         <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/20 group-hover:bg-slate-100 transition-all duration-500`}>
                            <ArrowRight size={14} className={`text-white group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all duration-500`}/>
                         </div>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}