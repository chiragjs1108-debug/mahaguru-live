'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, ShieldCheck, Database, TrendingUp, Globe, Activity, 
  MapPin, Landmark, ArrowRight, ChevronDown, CheckCircle2, Building2,
  Trophy
} from 'lucide-react';
import TopStateProfiles from '@/components/TopStateProfiles';
import ApexInstitutes from '@/components/ApexInstitutes';
import AyushIntelligence from '../../components/AyushIntelligence'; // FIX: Changed from '@/components/...'
import StateMatrixTable from '../../components/StateMatrixTable';
interface StateHub {
  slug: string;
  state_name: string;
  counseling_authority: string | null;
  counselling_official_websi: string | null;
  total_colleges: number | null;
  govt_colleges: number | null;
  private_colleges: number | null;
}

interface Props {
  allStates: StateHub[];
  nationalStats: {
    totalColleges: number;
    totalGovt: number;
    totalPvt: number;
    estimatedTotalSeats: number;
  };
}

export default function BamsMasterClient({ allStates, nationalStats }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default

  // FAQ Data (For UI and JSON-LD)
  const faqs = [
    { q: "How many BAMS colleges are approved by NCISM in 2026?", a: `Currently, there are over ${nationalStats.totalColleges} approved BAMS institutes across India, offering approximately ${nationalStats.estimatedTotalSeats.toLocaleString()}+ seats in government, private, and deemed categories.` },
    { q: "What is the difference between AACCC and State Quota?", a: "AACCC conducts counseling for 15% of all Government and Aided seats across India (All India Quota) and 100% of Deemed University seats. The remaining 85% of Government seats and 100% of Private State seats are managed by respective State Counseling Authorities (e.g., KEA in Karnataka, CET Cell in Maharashtra)." },
    { q: "What is the minimum NEET score required for a Government BAMS college?", a: "Cutoffs vary drastically by state and category. However, a safe target score for a Government BAMS seat via the All India Quota (AACCC) for the General category is typically above 520+ marks. State quota cutoffs can be lower depending on domicile." },
    { q: "Can I get admission to BAMS without NEET?", a: "No. Qualifying the NEET-UG examination is strictly mandatory for admission into any approved BAMS program in India, including Management and NRI quotas in private universities." }
  ];

  // ── PROGRAMMATIC SCHEMA INJECTION ─────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-[72px]">
      {/* Inject SEO Schema into the DOM invisibly */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/*{/* ── SECTION 1: THE PREMIUM HERO (Restored & SEO Optimized) ─────────────────── */}
<section className="bg-slate-950 pt-20 pb-32 relative overflow-hidden border-b border-slate-800">
  
  {/* Architectural Background Pattern */}
  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0891b2 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
  
  {/* Radial Glows */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    {/* Top Badge */}
    <div className="inline-flex items-center justify-center gap-2 mb-8 bg-brand-cyan/10 border border-brand-cyan/30 px-5 py-2 rounded-full shadow-lg backdrop-blur-md">
      <ShieldCheck size={14} className="text-brand-cyan animate-pulse"/>
      <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">Official 2026 Admissions Hub</span>
    </div>
    
    {/* H1: SEO Optimized for 2026 Parent Searches */}
    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
      BAMS Colleges in India 2026: <br className="hidden sm:block"/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">Official State-wise List</span>
    </h1>
    
    <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
      Your definitive guide to Ayurvedic medical admissions. Explore cutoffs, fee structures, and exact seat matrices for all government, private, and deemed institutes.
    </p>

    {/* Dynamic Live Data Badges (Restored to Stable Design) */}
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
       <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl">
         <Landmark className="text-emerald-400" size={18}/>
         <span className="text-white font-bold">{nationalStats.totalColleges}+ <span className="text-slate-500 font-medium text-sm">Institutes</span></span>
       </div>
       <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl">
         <Database className="text-brand-cyan" size={18}/>
         <span className="text-white font-bold">{(nationalStats.estimatedTotalSeats).toLocaleString()}+ <span className="text-slate-500 font-medium text-sm">Total Seats</span></span>
       </div>
    </div>

    {/* Search Command Center (Restored UI/UX) */}
    <div className="max-w-2xl mx-auto relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10"><Search size={22}/></div>
      <input
        type="text"
        placeholder="Search for a state, city, or counseling authority..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-base sm:text-lg px-14 py-4 sm:py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan shadow-2xl font-bold text-white placeholder:font-normal placeholder:text-slate-500 transition-all"
      />
      
      {/* Functional Navigation Chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest self-center mr-2">Quick Access:</span>
        <button 
          onClick={() => document.getElementById('state-matrix')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 hover:bg-brand-cyan/20 hover:text-white hover:border-brand-cyan/50 transition-all shadow-sm"
        >
          <MapPin size={12}/> State-wise Directory
        </button>
        <button 
          onClick={() => document.getElementById('top-colleges')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 hover:bg-brand-cyan/20 hover:text-white hover:border-brand-cyan/50 transition-all shadow-sm"
        >
          <Trophy size={12}/> Top Ranked BAMS Colleges
        </button>
      </div>
    </div>
  </div>
</section>

      {/* ── SECTION 2: THE AYUSH INTELLIGENCE BRIEF (Macro Snapshot) ───────── */}
<div className="-mt-16 relative z-30">
  <AyushIntelligence />
</div>

      {/* ── SECTION 3: APEX INSTITUTES ─────────────────────────────────────── */}
      <ApexInstitutes />

      {/* ── SECTION 4: ELITE STATE HUBS ────────────────────────────────────── */}
<TopStateProfiles dbStates={allStates} />

      {/* ── SECTION 5: SEAT MATRIX BREAKDOWN ───────────────────────────────── */}
      <section className="bg-slate-900 py-16 text-white border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">How BAMS Seats Are Distributed</h2>
          <p className="text-slate-400 font-medium mb-10 max-w-2xl mx-auto">Understanding the quota system is the first step to securing your admission. Do not limit yourself to just one counseling authority.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <h4 className="text-brand-cyan font-black text-xl mb-2">15% AIQ</h4>
               <p className="text-sm text-slate-300 font-medium">All India Quota for Govt and Govt-Aided colleges. Managed centrally by AACCC. Open to all Indian students.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <h4 className="text-emerald-400 font-black text-xl mb-2">85% State Quota</h4>
               <p className="text-sm text-slate-300 font-medium">Reserved for students with local domicile. Managed by state boards (e.g., KEA, UP AYUSH) offering massive advantages.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <h4 className="text-violet-400 font-black text-xl mb-2">Deemed / NRI</h4>
               <p className="text-sm text-slate-300 font-medium">100% of seats in Deemed Universities are managed by AACCC. High fee structure but lower score requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: THE A-Z STATE MATRIX (Polished Atlas Version) ────── */}
<section id="state-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#F8FAFC]">


  {/* Pass the allStates data from your Supabase fetch to the table */}
  <StateMatrixTable dbStates={allStates} />
</section>

      {/* ── SECTION 7: THE ADMISSION ROADMAP ───────────────────────────────── */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">The 2026 Admission Roadmap</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>
             
             <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl w-full md:w-1/3 shadow-sm hover:border-rose-200 transition-colors">
               <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-black mx-auto mb-4">1</div>
               <h4 className="font-black text-slate-800 mb-2">Qualify NEET UG</h4>
               <p className="text-xs text-slate-500 font-medium">Clear the NTA cutoff percentile required for AYUSH admissions.</p>
             </div>
             
             <Link href="/counselling/bams/aaccc" className="bg-white border-2 border-slate-100 p-6 rounded-2xl w-full md:w-1/3 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer">
               <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">2</div>
               <h4 className="font-black text-slate-800 mb-2 group-hover:text-indigo-600">AACCC Counselling</h4>
               <p className="text-xs text-slate-500 font-medium">Apply for Central AIQ and Deemed University seats.</p>
             </Link>
             
             <Link href="/counselling/bams" className="bg-white border-2 border-slate-100 p-6 rounded-2xl w-full md:w-1/3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
               <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">3</div>
               <h4 className="font-black text-slate-800 mb-2 group-hover:text-blue-600">State Counselling</h4>
               <p className="text-xs text-slate-500 font-medium">Apply via your domicile state authority for 85% quota.</p>
             </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: PROGRAMMATIC FAQ ENGINE ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180 text-brand-cyan' : ''}`} />
              </button>
              <div className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm font-medium text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}