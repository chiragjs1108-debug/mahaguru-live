'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, ArrowRight, Search, 
  Database, Building2, Cpu, Landmark, Briefcase, 
  Leaf, Sprout, Mountain, Map, Shield
} from 'lucide-react';

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
  allStates?: StateHub[];
}

// ── Massive Theme Engine (Supports all major Indian States) ────────────────
const getStateTheme = (stateName: string) => {
  const themes: Record<string, any> = {
    'Maharashtra': { icon: Building2, text: 'text-orange-600', hoverBorder: 'hover:border-orange-400', glow: 'hover:shadow-orange-500/20', gradient: 'from-orange-500 to-rose-500', shadow: 'shadow-orange-500/20', dot: 'bg-orange-500' },
    'Karnataka': { icon: Cpu, text: 'text-blue-600', hoverBorder: 'hover:border-blue-400', glow: 'hover:shadow-blue-500/20', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20', dot: 'bg-blue-500' },
    'Uttar Pradesh': { icon: Landmark, text: 'text-indigo-600', hoverBorder: 'hover:border-indigo-400', glow: 'hover:shadow-indigo-500/20', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/20', dot: 'bg-indigo-500' },
    'Gujarat': { icon: Briefcase, text: 'text-amber-600', hoverBorder: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-500/20', dot: 'bg-amber-500' },
    'Madhya Pradesh': { icon: Leaf, text: 'text-emerald-600', hoverBorder: 'hover:border-emerald-400', glow: 'hover:shadow-emerald-500/20', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/20', dot: 'bg-emerald-500' },
    'Punjab': { icon: Sprout, text: 'text-rose-600', hoverBorder: 'hover:border-rose-400', glow: 'hover:shadow-rose-500/20', gradient: 'from-rose-400 to-pink-500', shadow: 'shadow-rose-500/20', dot: 'bg-rose-500' },
    'Uttarakhand': { icon: Mountain, text: 'text-sky-600', hoverBorder: 'hover:border-sky-400', glow: 'hover:shadow-sky-500/20', gradient: 'from-sky-400 to-blue-500', shadow: 'shadow-sky-500/20', dot: 'bg-sky-500' },
    'Kerala': { icon: Leaf, text: 'text-emerald-600', hoverBorder: 'hover:border-emerald-400', glow: 'hover:shadow-emerald-500/20', gradient: 'from-teal-400 to-emerald-600', shadow: 'shadow-emerald-500/20', dot: 'bg-emerald-500' },
    'Rajasthan': { icon: MapPin, text: 'text-red-600', hoverBorder: 'hover:border-red-400', glow: 'hover:shadow-red-500/20', gradient: 'from-red-500 to-orange-500', shadow: 'shadow-red-500/20', dot: 'bg-red-500' },
    'Haryana': { icon: Shield, text: 'text-teal-600', hoverBorder: 'hover:border-teal-400', glow: 'hover:shadow-teal-500/20', gradient: 'from-teal-500 to-cyan-600', shadow: 'shadow-teal-500/20', dot: 'bg-teal-500' },
    'Bihar': { icon: Shield, text: 'text-cyan-600', hoverBorder: 'hover:border-cyan-400', glow: 'hover:shadow-cyan-500/20', gradient: 'from-cyan-500 to-blue-500', shadow: 'shadow-cyan-500/20', dot: 'bg-cyan-500' },
  };
  
  return themes[stateName] || { icon: Map, text: 'text-slate-600', hoverBorder: 'hover:border-slate-400', glow: 'hover:shadow-slate-500/20', gradient: 'from-slate-500 to-slate-700', shadow: 'shadow-slate-500/20', dot: 'bg-slate-500' };
};

export default function StatesGridClient({ allStates = [] }: Props) {
  const [search, setSearch] = useState('');

  const filteredStates = useMemo(() => {
    return allStates.filter(s => {
      const query = search.toLowerCase();
      return (
        s.state_name.toLowerCase().includes(query) ||
        (s.counseling_authority && s.counseling_authority.toLowerCase().includes(query))
      );
    });
  }, [allStates, search]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">

      {/* ── PREMIUM DARK HERO SECTION ─────────────────────────────────────────── */}
      <div className="bg-slate-950 pt-16 pb-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0891b2 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6 bg-brand-cyan/10 border border-brand-cyan/30 px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
            <Database size={14} className="text-brand-cyan animate-pulse"/>
            <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">Master Directory</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            State-Wise AYUSH <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">Colleges & Seat Matrix</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
            Select a state below to view the complete directory of BAMS, BHMS, and BUMS colleges, including precise tuition fees and detailed seat distribution.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-cyan transition-colors"><Search size={20}/></div>
            <input
              type="text"
              placeholder="Search for a state or counseling authority..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-base sm:text-lg px-14 py-4 sm:py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan shadow-2xl font-bold text-white placeholder:font-normal placeholder:text-slate-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── THE MASTER GRID ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full relative z-20 flex-1">
        
        {filteredStates.length === 0 ? (
           <div className="bg-white rounded-[2rem] border border-slate-200 p-16 text-center shadow-sm">
             <MapPin size={48} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">No states found</h3>
             <p className="text-sm text-slate-500 font-medium">Please check your database connection or search query.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredStates.map((s) => {
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
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white/80 transition-colors mt-1">
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
        )}
      </main>

    </div>
  );
}