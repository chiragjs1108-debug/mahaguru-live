'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Crown, Landmark, Building2, MapPin, 
  ArrowRight, Activity, ShieldAlert, 
  BadgeIndianRupee, Calendar, Users, CheckCircle2,
  Trophy, Stethoscope, Target, GraduationCap
} from 'lucide-react';

const APEX_DATA = [
  // CENTRAL & NATIONAL
  { name: 'North Eastern Institute of Ayurveda and Folk Medicine Research', category: 'Central & National', location: 'Pasighat, Arunachal Pradesh', est: '2015', clinical: '60 Bed / Tribal OPD', seats: '50', cutoff: '510+ (AIQ)', fees: '₹35,000', badge: 'National Institute' },
  { name: 'All India Institute Of Ayurveda (AIIA Goa)', category: 'Central & National', location: 'North Goa, Goa', est: '2022', clinical: '250 Bed / Satellite Center', seats: '100', cutoff: '560+ (AIQ)', fees: '₹42,000', badge: 'Satellite Campus' },
  { name: 'National Institute of Ayurveda (NIA Panchkula)', category: 'Central & National', location: 'Panchkula, Haryana', est: '2022', clinical: '250 Bed / Satellite Center', seats: '100', cutoff: '570+ (AIQ)', fees: '₹42,000', badge: 'Satellite Campus' },
  { name: 'North Eastern Institute of Ayurveda & Homeopathy (NEIAH)', category: 'Central & National', location: 'Shillong, Meghalaya', est: '2016', clinical: '100 Bed Ayurveda Wing', seats: '63', cutoff: '520+ (AIQ)', fees: '₹31,000', badge: 'National Institute' },
  { name: 'All India Institute of Ayurveda (AIIA)', category: 'Central & National', location: 'New Delhi, DL', est: '2015', clinical: '200 Bed Super Specialty', seats: '100', cutoff: '610+ (AIQ)', fees: '₹42,000', badge: 'NABH Accredited' },
  { name: 'National Institute of Ayurveda (NIA)', category: 'Central & National', location: 'Jaipur, Rajasthan', est: '1976', clinical: '300+ Bed / 2000+ OPD', seats: '125', cutoff: '600+ (AIQ)', fees: '₹42,000', badge: 'Deemed University' },
  { name: 'Faculty of Ayurveda, BHU', category: 'Central & National', location: 'Varanasi, UP', est: '1922', clinical: '3300+ Bed Super Specialty', seats: '75', cutoff: '620+ (AIQ)', fees: '₹30,000', badge: 'Central University' },

  // TOP GOVT COLLEGES
  { name: 'Institute of Teaching and Research in Ayurveda', category: 'Top Govt Colleges', location: 'Jamnagar, Gujarat', est: '1956', clinical: 'Extensive PG Clinical Wings', seats: '125', cutoff: '590+ (AIQ)', fees: '₹40,000', badge: 'INI Status' },
  { name: 'Ayurved & Unani Tibbia College', category: 'Top Govt Colleges', location: 'Karol Bagh, Delhi', est: '1916', clinical: 'Historic OPD in Delhi', seats: '75', cutoff: '595+ (AIQ)', fees: '₹15,000', badge: 'Historic Legacy' },
  { name: 'Govt. Ayurveda College', category: 'Top Govt Colleges', location: 'Thiruvananthapuram, Kerala', est: '1889', clinical: 'Massive Panchakarma OPD', seats: '100', cutoff: '580+ (AIQ)', fees: '₹25,000', badge: 'Oldest in Kerala' },
  { name: 'RA Podar Ayurved Medical College', category: 'Top Govt Colleges', location: 'Mumbai, Maharashtra', est: '1941', clinical: 'Largest AYUSH Hospital in MH', seats: '125', cutoff: '580+ (State)', fees: '₹50,000', badge: 'NAAC A++' },
  { name: 'State Ayurvedic College & Hospital', category: 'Top Govt Colleges', location: 'Lucknow, UP', est: '1948', clinical: 'Premier UP Govt Hospital', seats: '75', cutoff: '575+ (State)', fees: '₹20,000', badge: 'Regional Pioneer' },
  { name: 'Rishikul Govt. PG Ayurvedic College', category: 'Top Govt Colleges', location: 'Haridwar, Uttarakhand', est: '1919', clinical: 'Renowned Shalya/Surgery OPD', seats: '75', cutoff: '575+ (State)', fees: '₹30,000', badge: 'Heritage Campus' },
  { name: 'Govt. Ayurveda College', category: 'Top Govt Colleges', location: 'Bangalore, Karnataka', est: '1967', clinical: 'High Patient Turnover', seats: '100', cutoff: '560+ (State)', fees: '₹40,000', badge: 'Central Hub KA' },
  { name: 'Rajiv Gandhi Govt. PG Ayurvedic College', category: 'Top Govt Colleges', location: 'Paprola, HP', est: '1978', clinical: '300+ Bed Regional Hospital', seats: '75', cutoff: '565+ (State)', fees: '₹35,000', badge: 'High Altitude Flora' },
  { name: 'J.B. Roy State Ayurvedic Medical College', category: 'Top Govt Colleges', location: 'Kolkata, WB', est: '1916', clinical: '150+ Bed Oldest Teaching Hosp.', seats: '75', cutoff: '550+ (State)', fees: '₹15,000', badge: 'Oldest in India' },

  // TOP PRIVATE & DEEMED
  { name: 'SDM College of Ayurveda', category: 'Top Private & Deemed', location: 'Udupi, Karnataka', est: '1958', clinical: '400+ Bed Teaching Hospital', seats: '100', cutoff: '450+ (AIQ)', fees: '₹4.5L', badge: 'NABH Accredited' },
  { name: 'KLE Shri B.M. Kankanawadi Ayurveda Mahavidyalaya', category: 'Top Private & Deemed', location: 'Belagavi, Karnataka', est: '1933', clinical: '500+ Bed Multispecialty', seats: '100', cutoff: '460+ (AIQ)', fees: '₹5.0L', badge: 'NAAC A+' },
  { name: 'Dr. D.Y. Patil College of Ayurved & Research', category: 'Top Private & Deemed', location: 'Navi Mumbai, Maharashtra', est: '2004', clinical: 'High Urban Clinical Exposure', seats: '100', cutoff: '420+ (AIQ)', fees: '₹6.5L', badge: 'Deemed University' },
  { name: 'Sri Dharmastala Manjunatheshwara (SDM) College', category: 'Top Private & Deemed', location: 'Hassan, Karnataka', est: '1992', clinical: '350+ Bed Specialized Hospital', seats: '100', cutoff: '440+ (State)', fees: '₹4.5L', badge: 'Surgical Excellence' },
  { name: 'Mahatma Gandhi Ayurved College (Datta Meghe)', category: 'Top Private & Deemed', location: 'Wardha, Maharashtra', est: '2007', clinical: 'AIIMS-Style Modern Hospital', seats: '100', cutoff: '410+ (AIQ)', fees: '₹5.5L', badge: 'NAAC A++' },
  { name: 'Sri Sri College of Ayurvedic Sciences', category: 'Top Private & Deemed', location: 'Bangalore, Karnataka', est: '2004', clinical: 'Global Patient Influx', seats: '100', cutoff: '450+ (State)', fees: '₹4.0L', badge: 'Spiritual & Clinical' },
  { name: 'SDM Institute of Ayurveda', category: 'Top Private & Deemed', location: 'Bangalore, Karnataka', est: '2010', clinical: 'High-Tech Urban Campus', seats: '100', cutoff: '430+ (State)', fees: '₹4.5L', badge: 'Modern Infrastructure' }
];

export default function ApexInstitutes() {
  const [activeTab, setActiveTab] = useState<'Central & National' | 'Top Govt Colleges' | 'Top Private & Deemed'>('Central & National');

  const filteredData = APEX_DATA.filter(inst => inst.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-24 border-t border-slate-200 relative overflow-visible">
      
      {/* ── ARCHITECTURAL MARGIN GRAPHICS (Void Fillers) ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <svg width="100%" height="100%" className="sticky top-0 h-screen">
          <pattern id="blueprint" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="1"/>
            <circle cx="0" cy="0" r="1.5" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint)"/>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-6 lg:mb-10">
          <div className="flex items-center gap-1.5 lg:gap-2 mb-2 lg:mb-3 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
            <span className="text-amber-500"><Crown size={14} className="lg:w-4 lg:h-4" strokeWidth={2.5}/></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">The Gold Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Top Ranked BAMS Colleges in India (2026)</h2>
          <h3 className="text-[13px] sm:text-base text-slate-500 font-medium mt-3 lg:mt-4 leading-relaxed max-w-2xl">
            Discover the best government, central, and private Ayurvedic medical colleges in India. Compare NCISM approved institutes by clinical exposure, fee structure, and expected cutoffs.
          </h3>
        </div>

        {/* Sticky Tab Bar */}
        <div className="sticky top-[60px] lg:top-20 z-40 w-full flex justify-start md:justify-center mb-8 lg:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar pb-2 pt-1">
          <div className="flex p-1.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl lg:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-max shrink-0 mx-auto md:mx-0">
            {['Central & National', 'Top Govt Colleges', 'Top Private & Deemed'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 lg:px-6 lg:py-3.5 rounded-lg lg:rounded-xl text-[11px] lg:text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'}`}
              >
                {tab === 'Central & National' && <Crown size={14} className={activeTab === tab ? 'text-amber-400' : 'opacity-50'} />}
                {tab === 'Top Govt Colleges' && <Landmark size={14} className={activeTab === tab ? 'text-emerald-400' : 'opacity-50'} />}
                {tab === 'Top Private & Deemed' && <Building2 size={14} className={activeTab === tab ? 'text-violet-400' : 'opacity-50'} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex flex-col gap-3 lg:gap-4 relative z-10">
          
          {/* ELITE ELEVATED HEADERS - Bold and icon-led */}
          <div className="hidden lg:flex items-center px-6 py-4 mb-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-black uppercase tracking-[0.15em] text-[10px] w-full shadow-sm">
            <div className="flex-1 flex items-center gap-2">
               <Trophy size={14} className="text-amber-500" />
               Institute & Legacy
            </div>
            <div className="flex items-center gap-6 justify-end w-[650px] shrink-0">
              <div className="w-[160px] flex items-center gap-2">
                <Stethoscope size={14} className="text-emerald-600" /> 
                Clinical Scale
              </div>
              <div className="w-[110px] flex items-center gap-2">
                <Target size={14} className="text-rose-600" /> 
                Target Score
              </div>
              <div className="w-[90px] flex items-center gap-2">
                <Users size={14} className="text-blue-600" /> 
                Intake
              </div>
              <div className="w-[120px] flex items-center gap-2">
                <BadgeIndianRupee size={14} className="text-amber-600" /> 
                Annual Fees
              </div>
              <div className="w-[120px] text-right opacity-40 italic tracking-widest">Action</div>
            </div>
          </div>

          {filteredData.map((inst, idx) => (
            <div 
              key={idx}
              className="group bg-white border border-slate-200 rounded-xl lg:rounded-2xl p-4 lg:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-cyan/40 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between"
            >
              {/* Massive semi-transparent watermark */}
              <div className="absolute -bottom-4 -right-2 lg:-bottom-8 lg:-right-4 text-[72px] lg:text-[140px] font-black text-slate-200/60 group-hover:text-slate-200 transition-colors pointer-events-none select-none z-0 leading-none">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              
              {/* Identity Block */}
              <div className="flex flex-col z-10 w-full lg:flex-1 pr-8 lg:pr-6">
                <div className="flex flex-wrap items-center gap-1.5 lg:gap-2 mb-1">
                  <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-black text-slate-900 group-hover:text-brand-cyan transition-colors leading-snug">
                    {inst.name}
                  </h3>
                  {inst.badge && (
                    <span className="bg-amber-50 border border-amber-100 text-amber-700 text-[8px] lg:text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <CheckCircle2 size={10} className="hidden lg:block"/> {inst.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 text-[11px] lg:text-xs font-bold">
                    <MapPin size={10} className="lg:w-3 lg:h-3"/> {inst.location}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  <span className="flex items-center gap-1 text-[11px] lg:text-xs font-bold">
                    <Calendar size={10} className="lg:w-3 lg:h-3"/> Est. {inst.est}
                  </span>
                </div>
              </div>

              {/* Mobile CTA */}
              <Link 
                href="#"
                target="_blank" 
                rel="noopener noreferrer"
                className="lg:hidden absolute top-4 right-4 w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all shadow-sm z-20"
              >
                <ArrowRight size={14} className="-rotate-45" />
              </Link>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full lg:w-[650px] shrink-0 mt-5 lg:mt-0 lg:flex lg:flex-row lg:items-center lg:justify-end z-10 lg:gap-6">
                
                <div className="flex flex-col lg:w-[160px] shrink-0 lg:items-start">
                  <div className="flex items-start gap-1.5 text-emerald-700">
                    <Activity size={12} className="text-emerald-500 lg:w-4 lg:h-4 mt-0.5 lg:mt-0 shrink-0" />
                    <span className="text-[12px] lg:text-[14px] font-black leading-tight">{inst.clinical}</span>
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 lg:mt-1.5 pl-4 lg:pl-5">Clinical Scale</span>
                </div>

                <div className="flex flex-col lg:w-[110px] shrink-0 lg:items-start">
                  <div className="flex items-center gap-1.5 text-rose-600">
                    <ShieldAlert size={12} className="text-rose-400 lg:w-4 lg:h-4" />
                    <span className="text-[12px] lg:text-[15px] font-black leading-none">{inst.cutoff}</span>
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 lg:mt-1.5 pl-4 lg:pl-5">Target Score</span>
                </div>

                <div className="flex flex-col lg:w-[90px] shrink-0 lg:items-start">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Users size={12} className="text-slate-400 lg:w-4 lg:h-4" />
                    <span className="text-[12px] lg:text-[14px] font-black leading-none">{inst.seats} <span className="hidden sm:inline lg:hidden">Seats</span></span>
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 lg:mt-1.5 pl-4 lg:pl-5">Intake</span>
                </div>

                <div className="flex flex-col lg:w-[120px] shrink-0 lg:items-start">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <BadgeIndianRupee size={12} className="text-amber-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] lg:text-[15px] font-black leading-none">{inst.fees}</span>
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 lg:mt-1.5 pl-4 lg:pl-5">Fees</span>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex lg:w-[120px] shrink-0 justify-end">
                  <Link 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-brand-cyan transition-all shadow-md w-full justify-center"
                  >
                    Analyze <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}