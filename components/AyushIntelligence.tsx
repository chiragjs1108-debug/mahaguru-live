'use client';

import React from 'react';
import { 
  ShieldCheck, TrendingUp, IndianRupee, Activity, 
  CheckCircle2, AlertCircle, HelpCircle, Briefcase,
  Stethoscope, Landmark
} from 'lucide-react';

export default function AyushIntelligence() {
  return (
    <section className="relative w-full py-10 lg:py-14 bg-transparent">
      
      {/* ── REFINED HEADER ── */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-10 lg:mb-14">
        <div className="flex flex-col items-center">
          {/* Fixed Pill Position */}
          <div className="inline-flex items-center gap-2 mb-6 bg-slate-900 px-5 py-2 rounded-full shadow-2xl border border-slate-700">
            <HelpCircle size={14} className="text-brand-cyan" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Admissions Decoded for Parents</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            The 4 Hard Truths of BAMS Admissions
          </h2>
          <p className="text-slate-500 font-medium text-sm lg:text-lg max-w-2xl mx-auto leading-relaxed italic">
            "Eliminate the guesswork. Before choosing a college, understand the verified seat matrix, competition levels, and the clinical reality of 2026."
          </p>
        </div>
      </div>

      {/* ── THE COMMAND CENTER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
          
          {/* Architectural Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
             <svg width="100%" height="100%"><pattern id="inner-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#inner-grid)" /></svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            
            {/* Pillar 1: TRUST (Matrix) */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left border-b border-slate-100 pb-10 lg:border-b-0 lg:pb-0 lg:border-r lg:pr-8">
              <div className="flex items-center gap-2 text-emerald-600 mb-4">
                <ShieldCheck size={20} strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-widest">The Safe Source</span>
              </div>
              <h4 className="text-slate-900 font-black text-sm lg:text-[15px] leading-tight mb-2">
                Verified National Seat Matrix
              </h4>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">54,800</span>
                <span className="text-emerald-500 text-lg font-black">+</span>
              </div>
              <p className="text-slate-500 text-xs font-bold leading-relaxed mb-5">
                We verify the <strong>National Seat Matrix</strong> of every NCISM-approved college so you never apply based on outdated or fake data.
              </p>
              <div className="mt-auto flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span className="text-[9px] font-black text-emerald-700 uppercase">Validated Intake</span>
              </div>
            </div>

            {/* Pillar 2: URGENCY (Reality) */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left border-b border-slate-100 pb-10 lg:border-b-0 lg:pb-0 lg:border-r lg:pr-8 lg:pl-4">
              <div className="flex items-center gap-2 text-rose-600 mb-4">
                <Activity size={20} strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-widest">Admission Reality</span>
              </div>
              <h4 className="text-slate-900 font-black text-sm lg:text-[15px] leading-tight mb-2">
                Why BAMS is the new MBBS.
              </h4>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">1 : 382</span>
              </div>
              <p className="text-slate-500 text-xs font-bold leading-relaxed mb-5">
                Competition is at an all-time high. Without a <strong>state-specific category strategy</strong>, securing a Govt seat is a gamble.
              </p>
              <div className="mt-auto flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">
                <AlertCircle size={12} className="text-rose-600" />
                <span className="text-[9px] font-black text-rose-700 uppercase">High Scarcity</span>
              </div>
            </div>

            {/* Pillar 3: FINANCIALS (Budget) */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left border-b border-slate-100 pb-10 lg:border-b-0 lg:pb-0 lg:border-r lg:pr-8 lg:pl-4">
              <div className="flex items-center gap-2 text-amber-600 mb-4">
                <IndianRupee size={20} strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-widest">Investment Planning</span>
              </div>
              <h4 className="text-slate-900 font-black text-sm lg:text-[15px] leading-tight mb-2">
                Budgeting for the 5.5 Year Course.
              </h4>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">₹15K - 4.5L</span>
              </div>
              <p className="text-slate-500 text-xs font-bold leading-relaxed mb-5">
                We track the <strong>massive fee variance</strong> across Indian states to ensure you find quality education within your family's budget.
              </p>
              <div className="mt-auto flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                <TrendingUp size={12} className="text-amber-600" />
                <span className="text-[9px] font-black text-amber-700 uppercase">Smart Budgeting</span>
              </div>
            </div>

            {/* Pillar 4: FUTURE (Impact) */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-4">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Briefcase size={20} strokeWidth={2.5} />
                <span className="text-[11px] font-black uppercase tracking-widest">Career Stability</span>
              </div>
              <h4 className="text-slate-900 font-black text-sm lg:text-[15px] leading-tight mb-2">
                Is there a clinical future?
              </h4>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">11,000+</span>
              </div>
              <p className="text-slate-500 text-xs font-bold leading-relaxed mb-5">
                Ayurveda is a massive medical infrastructure with <strong>7.5L+ registered doctors</strong> and growing global clinical acceptance.
              </p>
              <div className="mt-auto flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                <Stethoscope size={12} className="text-blue-600" />
                <span className="text-[9px] font-black text-blue-700 uppercase">Clinical Scale</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}