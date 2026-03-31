'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Cpu, Landmark, Briefcase, Leaf, 
  ArrowRight, ShieldAlert, BadgeIndianRupee, Activity, 
  Globe, ExternalLink, Library, GraduationCap, CheckCircle2
} from 'lucide-react';

// ── 1. TYPES FOR THE DB DATA ────────────────────────────────────────────────
export interface DBState {
  slug: string;
  state_name: string;
  counseling_authority?: string | null;
  counselling_official_websi?: string | null;
  counselling_official_website?: string | null;
  total_colleges?: number | null; 
  govt_colleges?: number | null;
  semi_govt_college?: number | null; 
  semi_govt_colleges?: number | null; 
  private_colleges?: number | null;
}

interface Props {
  dbStates?: DBState[];
}

// ── 2. EDITORIAL DATA & LSI KEYWORD INJECTION ───────────────────────────────
const EDITORIAL_STATES = [
  { 
    slug: 'maharashtra', icon: Building2, color: 'orange', 
    description: 'The undisputed capital of Ayurveda. Maharashtra offers the highest concentration of legacy BAMS institutes with exceptional clinical exposure.', 
    highlights: ['India’s Largest Ayurvedic Hub', 'Highest Concentration of Govt Seats', 'Strict State Domicile Quota Rules'],
    university: 'MUHS, Nashik', avgFees: '₹2.5L - ₹5L', safeScore: '580+ (Govt) | 350+ (Pvt)', competition: 95, competitionLabel: 'Extreme' 
  },
  { 
    slug: 'karnataka', icon: Cpu, color: 'blue', 
    description: 'The top choice for non-domicile students. As an "Open State", Karnataka offers massive private seat matrices and world-class infrastructure.', 
    highlights: ['Premier "Open State" for Non-Domicile', 'Massive NCISM Approved Private Seats', 'World-Class Medical Infrastructure'],
    university: 'RGUHS, Bangalore', avgFees: '₹3L - ₹6L', safeScore: '550+ (Govt) | 300+ (Pvt)', competition: 80, competitionLabel: 'High' 
  },
  { 
    slug: 'uttar-pradesh', icon: Landmark, color: 'indigo', 
    description: 'Rapidly expanding AYUSH infrastructure. UP is highly preferred for its affordable private college fee structures and growing number of govt seats.', 
    highlights: ['Rapidly Expanding AYUSH Network', 'Highly Affordable Private Fees', '9 Prestigious Govt Institutes'],
    university: 'MGGAU, Gorakhpur', avgFees: '₹2L - ₹3.5L', safeScore: '590+ (Govt) | 250+ (Pvt)', competition: 85, competitionLabel: 'High' 
  },
  { 
    slug: 'gujarat', icon: Briefcase, color: 'amber', 
    description: 'A "Closed State" meaning immense benefit for native students. Gujarat houses some of the most prestigious, globally recognized Ayurved universities.', 
    highlights: ['Prestigious Central Universities', 'Exclusive "Closed State" Quota', 'High-Tier Clinical Exposure'],
    university: 'GAU, Jamnagar', avgFees: '₹2.5L - ₹4.5L', safeScore: '560+ (Govt) | 400+ (Pvt)', competition: 90, competitionLabel: 'Very High' 
  },
  { 
    slug: 'madhya-pradesh', icon: Leaf, color: 'emerald', 
    description: 'Emerging as a premier hub with excellent patient footfall in state-run hospitals. Offers a balanced mix of government and affordable private options.', 
    highlights: ['Excellent Govt Hospital Footfall', 'Balanced Govt/Pvt Seat Distribution', 'Emerging Medical Infrastructure'],
    university: 'MPMSU, Jabalpur', avgFees: '₹2L - ₹4L', safeScore: '540+ (Govt) | 280+ (Pvt)', competition: 70, competitionLabel: 'Moderate' 
  }
];

export default function TopStateProfiles({ dbStates = [] }: Props) {
  
  // ── 3. HYBRID MERGE ───────────────────────────────────────────────────────
  const mergedStates = EDITORIAL_STATES.map(editorial => {
    const liveData = dbStates.find(db => 
      db.slug?.trim().toLowerCase() === editorial.slug.toLowerCase()
    );
    return { ...editorial, ...liveData };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
      
      {/* ── SEO OPTIMIZED HEADER ── */}
      <div className="mb-6 lg:mb-12 text-center sm:text-left max-w-4xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Top States for BAMS Admissions in India
        </h2>
        <h3 className="text-[13px] sm:text-base lg:text-lg text-slate-500 font-medium mt-2 lg:mt-3 leading-relaxed">
          Discover the leading hubs for Ayurvedic education. Compare seat matrices, official counseling authorities, average fees, and NEET cutoffs for the best BAMS colleges in Maharashtra, Karnataka, Uttar Pradesh, and beyond.
        </h3>
      </div>

      <div className="flex flex-col gap-5 lg:gap-8">
        {mergedStates.map((state) => {
          const Icon = state.icon;
          const officialLink = state.counselling_official_websi || state.counselling_official_website;
          const semiGovtCount = state.semi_govt_college || state.semi_govt_colleges || 0;
          
          return (
            <div 
              key={state.slug} 
              className="group bg-white border border-slate-200 rounded-2xl lg:rounded-[2.5rem] p-3 lg:p-8 flex flex-col lg:flex-row gap-3.5 lg:gap-8 lg:items-stretch relative overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300"
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-${state.color}-400/5 blur-[60px] lg:blur-[100px] rounded-full pointer-events-none group-hover:bg-${state.color}-400/10 transition-colors duration-700`}></div>

              {/* ── LEFT COLUMN: DENSE MOBILE CONTENT ── */}
              <div className="lg:w-[35%] shrink-0 relative z-10 flex flex-col">
                <div className="flex items-center gap-2.5 lg:gap-4 mb-2 lg:mb-5">
                  <div className={`w-9 h-9 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br from-${state.color}-50 to-${state.color}-100/50 text-${state.color}-600 flex items-center justify-center shrink-0 border border-${state.color}-100 shadow-sm group-hover:scale-105 transition-transform duration-500`}>
                    <Icon className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-black text-slate-900 leading-tight capitalize">
                    BAMS Colleges in {state.state_name || state.slug.replace('-', ' ')}
                  </h3>
                </div>
                
                <p className="text-[11px] lg:text-[14px] font-medium text-slate-500 leading-snug lg:leading-relaxed mb-3 lg:mb-6 line-clamp-2 lg:line-clamp-none">
                  {state.description}
                </p>

                <ul className="flex flex-col gap-1 lg:gap-3 mb-3 lg:mb-8 flex-grow">
                  {state.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 lg:gap-2 text-[10px] lg:text-[13px] font-bold text-slate-700">
                      <CheckCircle2 size={12} className={`text-${state.color}-500 shrink-0 mt-[1px] lg:mt-0.5 lg:w-4 lg:h-4`} />
                      {highlight}
                    </li>
                  ))}
                </ul>
                
                {/* ── TRUE CTA LINK ── */}
                <Link 
                  href={`/bams-colleges/${state.slug}`} 
                  className="mt-auto flex items-center justify-center lg:justify-start w-full lg:w-fit gap-1.5 lg:gap-2 bg-slate-900 hover:bg-brand-cyan text-white text-[9px] lg:text-[11px] font-black uppercase tracking-widest px-4 py-3 lg:px-6 lg:py-3.5 rounded-xl transition-all duration-300 shadow-md group/btn"
                >
                  Explore {state.state_name} Institutes <ArrowRight size={12} className="lg:w-3.5 lg:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="hidden lg:block w-px bg-slate-100 shrink-0 my-2"></div>
              <div className="block lg:hidden w-full h-px bg-slate-100 shrink-0 my-0 opacity-50"></div>

              {/* ── RIGHT COLUMN: ULTRA-DENSE MOBILE GRID WITH SEMANTIC COLORS ── */}
              <div className="flex-1 grid grid-cols-2 gap-1.5 lg:gap-4 relative z-10 pt-1 lg:pt-0">
                
                {/* Block 1: Counseling Authority (Blue) */}
                <div className="col-span-2 lg:col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-between hover:bg-white transition-colors relative">
                  <div>
                    <div className="flex items-center gap-1 lg:gap-2 mb-0.5 lg:mb-2 text-blue-500">
                      <Globe size={10} className="lg:w-3.5 lg:h-3.5" />
                      <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Counseling Authority</span>
                    </div>
                    <span className="text-[11px] lg:text-sm font-bold text-slate-800 leading-tight line-clamp-1 lg:line-clamp-2 pr-2">
                      {state.counseling_authority || 'Authority data sync pending...'}
                    </span>
                  </div>
                  {officialLink && (
                    <a 
                      href={officialLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-1.5 lg:mt-4 w-fit inline-flex items-center gap-1 lg:gap-1.5 px-2 py-1 lg:px-2.5 lg:py-1.5 bg-white border border-slate-200 shadow-sm rounded-md lg:rounded-lg text-[8px] lg:text-[10px] font-black uppercase tracking-wider text-slate-600 hover:border-brand-cyan hover:text-brand-cyan transition-all"
                    >
                      <ExternalLink size={8} className="lg:w-3 lg:h-3" /> Official Portal
                    </a>
                  )}
                </div>

                {/* Block 2: Affiliated University (Violet) */}
                <div className="col-span-2 lg:col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-between hover:bg-white transition-colors">
                  <div className="flex items-center gap-1 lg:gap-2 mb-0.5 lg:mb-2 text-violet-500">
                    <GraduationCap size={10} className="lg:w-3.5 lg:h-3.5" />
                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Affiliated University</span>
                  </div>
                  <span className="text-[11px] lg:text-sm font-bold text-slate-800 leading-tight line-clamp-1 lg:line-clamp-none">
                    {state.university}
                  </span>
                </div>

                {/* Block 3: Total BAMS Colleges (Emerald) */}
                <div className="col-span-2 lg:col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-center hover:bg-white transition-colors">
                  <div className="flex items-center gap-1 lg:gap-2 mb-1.5 lg:mb-3 text-emerald-500">
                    <Library size={10} className="lg:w-3.5 lg:h-3.5" />
                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Total BAMS Colleges</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <div className="flex items-baseline gap-1 lg:gap-1.5">
                      <span className="text-xl lg:text-4xl font-black text-slate-900 tracking-tighter">{state.total_colleges || 0}</span>
                      <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase">Total</span>
                    </div>
                    
                    <div className="w-px h-5 lg:h-12 bg-slate-200 mx-0 lg:mx-1"></div>
                    
                    <div className="flex flex-row lg:flex-col flex-wrap gap-1 lg:gap-1.5 flex-1">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <span className="bg-emerald-100 text-emerald-700 text-[7px] lg:text-[9px] font-black px-1 lg:px-1.5 py-0.5 rounded uppercase tracking-wider w-[28px] lg:w-[40px] text-center">Govt</span>
                        <span className="text-[9px] lg:text-[13px] font-bold text-slate-700">{state.govt_colleges || 0} <span className="hidden lg:inline">Institutes</span></span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <span className="bg-amber-100 text-amber-700 text-[7px] lg:text-[9px] font-black px-1 lg:px-1.5 py-0.5 rounded uppercase tracking-wider w-[28px] lg:w-[40px] text-center">Semi</span>
                        <span className="text-[9px] lg:text-[13px] font-bold text-slate-700">{semiGovtCount} <span className="hidden lg:inline">Institutes</span></span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <span className="bg-indigo-100 text-indigo-700 text-[7px] lg:text-[9px] font-black px-1 lg:px-1.5 py-0.5 rounded uppercase tracking-wider w-[28px] lg:w-[40px] text-center">Pvt</span>
                        <span className="text-[9px] lg:text-[13px] font-bold text-slate-700">{state.private_colleges || 0} <span className="hidden lg:inline">Institutes</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 4: Safe Score (Rose) */}
                <div className="col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-center hover:bg-white transition-colors">
                  <div className="flex items-center gap-1 lg:gap-2 mb-0.5 lg:mb-2 text-rose-500">
                    <ShieldAlert size={10} className="lg:w-3.5 lg:h-3.5" />
                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Safe Target Score</span>
                  </div>
                  <span className="text-[12px] lg:text-lg font-black text-slate-800 leading-tight">{state.safeScore}</span>
                  <span className="text-[7px] lg:text-[10px] font-bold text-slate-500 mt-0.5 lg:mt-1">Expected Cutoff 2026</span>
                </div>

                {/* Block 5: Average Fees (Amber) */}
                <div className="col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-center hover:bg-white transition-colors">
                  <div className="flex items-center gap-1 lg:gap-2 mb-0.5 lg:mb-1 text-amber-500">
                    <BadgeIndianRupee size={10} className="lg:w-3.5 lg:h-3.5" />
                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Avg. Pvt Fees</span>
                  </div>
                  <span className="text-[13px] lg:text-2xl font-black text-slate-900 tracking-tight leading-tight">{state.avgFees}</span>
                  <span className="text-[7px] lg:text-[10px] font-bold text-slate-500 mt-0 lg:mt-0.5">Estimated Per Annum</span>
                </div>

                {/* Block 6: Competition Meter (Dynamic State Color) */}
                <div className="col-span-2 lg:col-span-1 bg-slate-50/80 border border-slate-100 rounded-xl lg:rounded-2xl p-2.5 lg:p-5 flex flex-col justify-center hover:bg-white transition-colors">
                  <div className="flex items-center justify-between mb-1 lg:mb-2">
                    <div className={`flex items-center gap-1 lg:gap-2 text-${state.color}-500`}>
                      <Activity size={10} className="lg:w-3.5 lg:h-3.5" />
                      <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">NEET Intensity</span>
                    </div>
                    <span className={`text-[8px] lg:text-[10px] font-black text-${state.color}-600`}>
                      {state.competitionLabel}
                    </span>
                  </div>
                  <div className="w-full h-1 lg:h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1 lg:mb-2">
                    <div className={`h-full rounded-full bg-${state.color}-500`} style={{ width: `${state.competition}%` }}></div>
                  </div>
                  <span className="text-[7px] lg:text-[10px] font-bold text-slate-500">Index Score: {state.competition}%</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}