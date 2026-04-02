'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Globe, ArrowRight, GraduationCap, Search, Library, ExternalLink, MapPin,
  GlassWater, Sunrise, PawPrint, BookOpen, Flame, Palmtree, Cat, Wheat,
  Mountain, Pickaxe, Castle, Waves, Landmark, Shield, Flower2, Cloud,
  Trees, Feather, Sun, Drum, Tent, MountainSnow, Heart, Droplets
} from 'lucide-react';

export interface StateData {
  slug: string;
  state_name: string;
  counseling_authority: string | null;
  counselling_official_websi?: string | null;
  counselling_official_website?: string | null;
  official_website?: string | null; // Match Supabase column
  total_colleges: number | null;
  govt_colleges: number | null;
  semi_govt_colleges?: number | null;
  private_colleges: number | null;
}

interface Props {
  dbStates?: StateData[];
}

// ── 1. STATIC THEME DICTIONARY ──
const THEMES = {
  blue: {
    iconClass: 'bg-blue-100 text-blue-600 border-blue-200',
    hoverGradient: 'from-blue-100/80 via-blue-50/30 to-transparent'
  },
  amber: {
    iconClass: 'bg-amber-100 text-amber-600 border-amber-200',
    hoverGradient: 'from-amber-100/80 via-amber-50/30 to-transparent'
  },
  emerald: {
    iconClass: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    hoverGradient: 'from-emerald-100/80 via-emerald-50/30 to-transparent'
  },
  indigo: {
    iconClass: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    hoverGradient: 'from-indigo-100/80 via-indigo-50/30 to-transparent'
  },
  orange: {
    iconClass: 'bg-orange-100 text-orange-600 border-orange-200',
    hoverGradient: 'from-orange-100/80 via-orange-50/30 to-transparent'
  },
  rose: {
    iconClass: 'bg-rose-100 text-rose-600 border-rose-200',
    hoverGradient: 'from-rose-100/80 via-rose-50/30 to-transparent'
  }
};

// ── 2. CULTURAL & SYMBOLIC ICON ENGINE ──
const getStateTheme = (stateName: string) => {
  const name = stateName.toLowerCase();
  
  const mapping = [
    { match: 'andhra', icon: GlassWater, theme: 'blue' },
    { match: 'arunachal', icon: Sunrise, theme: 'amber' },
    { match: 'assam', icon: PawPrint, theme: 'emerald' },
    { match: 'bihar', icon: BookOpen, theme: 'indigo' },
    { match: 'chhattisgarh', icon: Flame, theme: 'orange' },
    { match: 'goa', icon: Palmtree, theme: 'emerald' },
    { match: 'gujarat', icon: Cat, theme: 'amber' },
    { match: 'haryana', icon: Wheat, theme: 'emerald' },
    { match: 'himachal', icon: Mountain, theme: 'blue' },
    { match: 'jharkhand', icon: Pickaxe, theme: 'orange' },
    { match: 'karnataka', icon: Castle, theme: 'indigo' },
    { match: 'kerala', icon: Waves, theme: 'blue' },
    { match: 'madhya', icon: Landmark, theme: 'orange' },
    { match: 'maharashtra', icon: Shield, theme: 'orange' },
    { match: 'manipur', icon: Flower2, theme: 'indigo' },
    { match: 'meghalaya', icon: Cloud, theme: 'blue' },
    { match: 'mizoram', icon: Trees, theme: 'emerald' },
    { match: 'nagaland', icon: Feather, theme: 'amber' },
    { match: 'odisha', icon: Sun, theme: 'orange' },
    { match: 'punjab', icon: Drum, theme: 'amber' },
    { match: 'rajasthan', icon: Tent, theme: 'orange' },
    { match: 'sikkim', icon: MountainSnow, theme: 'blue' },
    { match: 'tamil', icon: Landmark, theme: 'indigo' },
    { match: 'telangana', icon: Landmark, theme: 'orange' },
    { match: 'tripura', icon: Castle, theme: 'indigo' },
    { match: 'uttar pradesh', icon: Heart, theme: 'rose' },
    { match: 'uttarakhand', icon: Droplets, theme: 'blue' },
    { match: 'bengal', icon: PawPrint, theme: 'orange' },
    { match: 'delhi', icon: Landmark, theme: 'orange' },
    { match: 'jammu', icon: MountainSnow, theme: 'blue' },
    { match: 'ladakh', icon: MountainSnow, theme: 'blue' }
  ];

  const match = mapping.find(m => name.includes(m.match));
  const themeKey = match ? match.theme : 'indigo';
  
  return { 
    styles: THEMES[themeKey as keyof typeof THEMES], 
    Icon: match ? match.icon : MapPin 
  };
};

export default function StateMatrixTable({ dbStates = [] }: Props) {
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    dbStates.forEach(s => {
      if (!s?.state_name) return;
      const firstChar = s.state_name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) letters.add(firstChar);
    });
    return ['ALL', ...Array.from(letters).sort()];
  }, [dbStates]);

  const filteredStates = useMemo(() => {
    if (selectedLetter === 'ALL') return dbStates;
    return dbStates.filter(s => s.state_name && s.state_name.toUpperCase().startsWith(selectedLetter));
  }, [dbStates, selectedLetter]);

  return (
    <div className="w-full">
      
      {/* ── SEO HEADER ── */}
      <div className="mb-6 lg:mb-8 text-center sm:text-left max-w-4xl mx-auto sm:mx-0">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          State-wise BAMS Colleges in India 2026
        </h2>
        <p className="text-[13px] sm:text-base lg:text-lg text-slate-500 font-medium mt-3 leading-relaxed">
          Explore Ayurvedic medical colleges across all Indian states. Compare government vs. private college seat matrices, and safely access official 2026 counseling authorities for BAMS Colleges in Karnataka, Maharashtra, Uttar Pradesh, and beyond.
        </p>
      </div>

      {/* ── COMPACT STICKY ALPHABET SWITCHER ── */}
      <div className="sticky top-[70px] lg:top-20 z-30 bg-[#F8FAFC]/95 backdrop-blur-md py-3 lg:py-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-7xl mx-auto border-b border-slate-200/60 pb-3">
          {availableLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`flex-shrink-0 min-w-[36px] lg:min-w-[40px] h-9 lg:h-10 flex items-center justify-center rounded-lg font-black text-sm lg:text-base transition-all border shadow-sm ${
                selectedLetter === letter 
                ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-md' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-cyan hover:text-brand-cyan'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* ── THEMATIC CARD GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        
        {filteredStates.map((state) => {
          const { styles, Icon } = getStateTheme(state.state_name);
          
          // Checking official_website first
          const officialLink = state.official_website || state.counselling_official_websi || state.counselling_official_website;
          
          const total = state.total_colleges || 0;
          const semiGovtCount = state.semi_govt_colleges || 0;

          return (
            <div 
              key={state.slug} 
              className="bg-white border border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] p-4 sm:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-cyan/30 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* HOVER GRADIENT FILL */}
              <div className={`absolute inset-0 bg-gradient-to-br ${styles.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* 1. Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center border ${styles.iconClass} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[17px] lg:text-[18px] font-black text-slate-900 leading-tight mt-0.5">
                    BAMS Colleges In {state.state_name}
                  </h3>
                </div>

                {/* 2. Counseling Authority Box */}
                <div className="bg-blue-50/50 group-hover:bg-white/70 group-hover:backdrop-blur-sm border border-blue-100/80 rounded-xl p-3 mb-2.5 flex flex-col items-start transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    <Globe size={12} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Counseling Authority</span>
                  </div>
                  
                  {/* STATIC AUTHORITY NAME (Link Removed) */}
                  <span className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2">
                    {state.counseling_authority || 'TBA (Updating for 2026)'}
                  </span>

                  {officialLink && (
                    <a 
                      href={officialLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-blue-100 shadow-sm rounded-md text-[9px] font-black uppercase tracking-wider text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      <ExternalLink size={10} /> Official Website
                    </a>
                  )}
                </div>

                {/* 3. Seat Matrix Box */}
                <div className="bg-emerald-50/50 group-hover:bg-white/70 group-hover:backdrop-blur-sm border border-emerald-100/80 rounded-xl p-3 mb-5 transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-2.5">
                    <Library size={12} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Total BAMS Colleges</span>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <div className="flex items-baseline gap-1.5 shrink-0">
                      <span className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{total}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                    </div>
                    
                    <div className="w-px h-6 bg-emerald-200/60 hidden sm:block"></div>
                    
                    <div className="flex flex-wrap items-center gap-2 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider w-[40px] text-center">Govt</span>
                        <span className="text-xs font-bold text-slate-800">{state.govt_colleges || 0}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider w-[40px] text-center">Semi</span>
                        <span className="text-xs font-bold text-slate-800">{semiGovtCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider w-[40px] text-center">Pvt</span>
                        <span className="text-xs font-bold text-slate-800">{state.private_colleges || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link 
                    href={`/counselling/bams/${state.slug}-ayush-counselling`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-[10px] sm:text-[11px] uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow"
                  >
                    <GraduationCap size={14} className="text-slate-500" /> Know Counselling Process
                  </Link>
                  
                  <Link 
                    href={`/bams-colleges/${state.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider hover:bg-brand-cyan transition-all shadow-md group/btn"
                  >
                    Explore {state.state_name} Institutes <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredStates.length === 0 && (
          <div className="col-span-full bg-white border border-slate-200 rounded-[2rem] p-16 text-center shadow-sm">
            <Search size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-2xl font-black text-slate-900">No states found</h3>
            <p className="text-slate-500 text-base font-medium mt-2">Please select another letter from the directory index above.</p>
          </div>
        )}

      </div>
    </div>
  );
}