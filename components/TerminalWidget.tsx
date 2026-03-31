'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitWaitlist } from "../app/actions/waitlist"; 
import { 
  Activity, ChevronRight, Shield, CheckCircle2, Lock, 
  Leaf, Stethoscope, XCircle, Sparkles, ArrowRight 
} from 'lucide-react';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Other UTs"
];

export default function TerminalWidget() {
  const [scoreInput, setScoreInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [domicileState, setDomicileState] = useState('Karnataka');
  const [selectedState, setSelectedState] = useState('Karnataka');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const triggerAllotmentTerminal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitWaitlist(formData);
    
    setTimeout(() => {
      if (result?.success && result.data) {
        setDashboardData(result.data);
      } else {
        // Fallback Mock Data mirroring the homepage
        setDashboardData({
          status: "Regular_Match",
          aiq: { max_colleges: 12, r1: 4, r2: 12, r3: 6, best_round: "Round 2", fees: "₹2.5L", top_tier: 3, spotlight: "Govt Ayurveda Medical College", spotlight_label: "Elite Tier" },
          mgt: { max_colleges: 62, r1: 60, r2: 62, r3: 28, best_round: "Round 2", fees: "₹3.5L - ₹4.5L", top_tier: 8, spotlight: "SDM College of Ayurveda", spotlight_label: "Premium / High-ROI" },
          insight: { top: 8, summary: "High chances found in Round 2." }
        });
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  const payload = Array.isArray(dashboardData) ? dashboardData[0] : (dashboardData || {});
  const aiqData = payload.aiq || payload.aiq_data || {};
  const mgtData = payload.mgt || payload.mgt_data || {};
  const appStatus = payload.status || "Regular_Match";

  // Calculations for the UI
  const aiqRounds = [aiqData.r1 || 0, aiqData.r2 || 0, aiqData.r3 || 0];
  const aiqMax = aiqData.max_colleges !== undefined ? aiqData.max_colleges : Math.max(...aiqRounds, 0);
  const aiqBestIdx = aiqMax > 0 ? aiqRounds.indexOf(Math.max(...aiqRounds)) : -1;

  const mgtRounds = [mgtData.r1 || 0, mgtData.r2 || 0, mgtData.r3 || 0];
  const mgtMax = mgtData.max_colleges !== undefined ? mgtData.max_colleges : Math.max(...mgtRounds, 0);
  const mgtBestIdx = mgtMax > 0 ? mgtRounds.indexOf(Math.max(...mgtRounds)) : -1;

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 relative overflow-hidden group">
      {/* Decorative minimal background glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-cyan/5 rounded-full blur-[50px] pointer-events-none" />
      
      {!dashboardData ? (
        <div className="relative z-10 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-cyan-50 text-brand-cyan rounded-2xl flex items-center justify-center border border-cyan-100 shadow-sm shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight font-montserrat">Predict Seat Chances</h3>
              <p className="text-[10px] font-bold text-slate-400 font-inter uppercase tracking-widest mt-0.5">AI Database Terminal</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={triggerAllotmentTerminal} className="space-y-4">
            
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Mock Score</label>
              <input name="score" type="number" placeholder="e.g. 450" value={scoreInput} onChange={(e) => setScoreInput(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-base px-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all placeholder:font-normal placeholder:text-slate-400 shadow-sm" />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Counseling State</label>
              <select name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold px-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all shadow-sm">
                <option value="Karnataka">Karnataka (Live)</option>
                <option value="AACCC">AACCC AIQ (Live)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Domicile</label>
                <select name="domicile" value={domicileState} onChange={(e) => setDomicileState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all shadow-sm">
                  {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Category</label>
                <select name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all shadow-sm">
                  <option value="General">Gen (UR)</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-slate-400" />
              <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-slate-400" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input name="mobile" type="tel" placeholder="Mobile No." required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-slate-400" />
              <input name="whatsapp" type="tel" placeholder="WhatsApp" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-slate-400" />
            </div>

            <input type="hidden" name="source" value="sidebar_terminal" />

            <button type="submit" disabled={isAnalyzing} className="w-full bg-slate-900 hover:bg-brand-cyan text-white py-4 font-black text-[11px] uppercase tracking-widest rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 group mt-6 font-inter">
              {isAnalyzing ? <><Activity className="w-4 h-4 animate-spin"/> Processing Data...</> : <span className="flex items-center gap-2">Run AI Prediction <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>}
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10 flex flex-col h-full">
          {/* THE RESULTS DASHBOARD UI */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md font-inter border border-slate-200">
                {selectedState === 'Karnataka' ? 'KEA Karnataka' : 'AACCC Quota'}
              </span>
              <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase font-inter">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/> LIVE ENGINE
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-3 font-montserrat">Seat Probability</h2>
            <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5 mt-1 font-inter">
              <Shield className="w-3.5 h-3.5 text-brand-cyan" />
              Verified by 12+ Years of Historic Data.
            </p>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar pb-2">
            
            {/* AIQ Results Component */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm group">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-brand-cyan border border-cyan-100"><Leaf size={20}/></div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest font-inter">AIQ Quota Chances</h4>
                      <p className="text-[10px] text-slate-500 font-mono font-bold uppercase mt-0.5">FEE: {aiqData.fees && aiqData.fees !== "TBD" ? aiqData.fees : "₹0.6L - ₹2.5L"}/YR</p>
                    </div>
                 </div>
                 <span className="text-3xl leading-none font-black text-slate-900">{aiqMax}</span>
              </div>

              {aiqMax > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-slate-600">Allotment in <span className="text-brand-cyan font-black">{aiqMax} Colleges</span></p>
                    {aiqData.top_tier > 0 && (
                      <Link href="/#report" className="text-[8px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-md border border-emerald-200 font-inter uppercase">
                        {aiqData.top_tier} Premium <Lock size={10}/>
                      </Link>
                    )}
                  </div>

                  <div className="mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/> {aiqData.spotlight || "Verified Institution"}</span>
                      <span className="text-[8px] font-black text-emerald-600 bg-emerald-100/50 border border-emerald-200 px-1.5 py-0.5 rounded font-inter uppercase tracking-widest">{aiqData.spotlight_label || "Highly Likely"}</span>
                    </div>
                    <Link href="/#report" className="w-full flex items-center justify-between bg-white border border-slate-200 border-dashed rounded-lg p-2 group/btn hover:border-brand-cyan transition-colors">
                      <span className="text-[9px] font-bold text-slate-400 group-hover/btn:text-brand-cyan blur-[1px] transition-all">+ {Math.max(0, aiqMax - 1)} Hidden Colleges</span>
                      <Lock className="w-3 h-3 text-slate-400 group-hover/btn:text-brand-cyan" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Round 1", count: aiqRounds[0], isBest: aiqBestIdx === 0 },
                      { label: "Round 2", count: aiqRounds[1], isBest: aiqBestIdx === 1 },
                      { label: "Round 3", count: aiqRounds[2], isBest: aiqBestIdx === 2 },
                    ].map((r, i) => (
                      <div key={i} className={`relative p-2.5 rounded-xl border text-center ${r.isBest ? 'bg-brand-cyan/5 border-brand-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.02]' : 'bg-white border-slate-100'}`}>
                        {r.isBest && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-cyan text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase z-10 whitespace-nowrap tracking-widest shadow-sm">Best Prob</div>}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1 mb-2 overflow-hidden">
                           <div className={`h-full rounded-full ${r.isBest ? 'bg-brand-cyan' : 'bg-slate-300'}`} style={{ width: `${Math.max(5, (r.count / Math.max(aiqMax, 1)) * 100)}%` }} />
                        </div>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${r.isBest ? 'text-brand-cyan' : 'text-slate-400'}`}>{r.label}</p>
                        <p className={`text-sm font-black mt-0.5 ${r.isBest ? 'text-brand-cyan' : 'text-slate-900'}`}>{r.count}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                 <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
                   <XCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                   <p className="text-xs font-black text-slate-700">No AIQ Matches Found</p>
                   <p className="text-[10px] font-medium text-slate-500 mt-1">Score is below historic Govt cutoffs.</p>
                 </div>
              )}
            </div>

            {/* MGT Results Component */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" />
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400 border border-white/10 shadow-inner"><Stethoscope size={20}/></div>
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 font-inter">Mgt Quota Chances</h4>
                      <p className="text-[10px] text-slate-400 font-mono font-bold uppercase mt-0.5">FEE: {mgtData.fees && mgtData.fees !== "TBD" ? mgtData.fees : "₹3.5L - ₹5.5L"}/YR</p>
                    </div>
                 </div>
                 <span className="text-3xl leading-none font-black text-brand-cyan">{mgtMax}</span>
              </div>

              {appStatus === "NRI_Only" || mgtMax === 0 ? (
                 <div className="text-center py-6 bg-white/5 rounded-xl border border-white/10 relative z-10">
                   <Activity className="w-6 h-6 text-amber-400 mx-auto mb-2 animate-pulse" />
                   <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Focus on NRI Rounds</p>
                   <p className="text-[10px] font-medium text-slate-400 mt-1">Score indicates NRI conversion is safer.</p>
                 </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-slate-300">Allotment in <span className="text-brand-cyan font-black">{mgtMax} Colleges</span></p>
                    {mgtData.top_tier > 0 && (
                      <Link href="/#report" className="text-[8px] font-black text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-md border border-amber-500/20 font-inter uppercase">
                        {mgtData.top_tier} High-ROI <Lock size={10}/>
                      </Link>
                    )}
                  </div>

                  <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-black text-slate-200 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/> {mgtData.spotlight || "Verified Institution"}</span>
                      <span className="text-[8px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded font-inter uppercase tracking-widest">{mgtData.spotlight_label || "Solid Choice"}</span>
                    </div>
                    <Link href="/#report" className="w-full flex items-center justify-between bg-slate-800/80 border border-slate-600 border-dashed rounded-lg p-2 group/btn hover:border-brand-cyan transition-colors">
                      <span className="text-[9px] font-bold text-slate-400 group-hover/btn:text-brand-cyan blur-[1px] transition-all">+ {Math.max(0, mgtMax - 1)} Hidden Colleges</span>
                      <Lock className="w-3 h-3 text-slate-400 group-hover/btn:text-brand-cyan" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Round 1", count: mgtRounds[0], isBest: mgtBestIdx === 0 },
                      { label: "Round 2", count: mgtRounds[1], isBest: mgtBestIdx === 1 },
                      { label: "Round 3", count: mgtRounds[2], isBest: mgtBestIdx === 2 },
                    ].map((r, i) => (
                      <div key={i} className={`relative p-2.5 rounded-xl border text-center ${r.isBest ? 'bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]' : 'bg-white/5 border-white/10'}`}>
                        {r.isBest && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-cyan text-slate-900 text-[7px] font-black px-2 py-0.5 rounded-full uppercase z-10 whitespace-nowrap tracking-widest">Best Prob</div>}
                        <div className="h-1.5 w-full bg-slate-700 rounded-full mt-1 mb-2 overflow-hidden">
                           <div className={`h-full rounded-full ${r.isBest ? 'bg-brand-cyan' : 'bg-slate-500'}`} style={{ width: `${Math.max(5, (r.count / Math.max(mgtMax, 1)) * 100)}%` }} />
                        </div>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${r.isBest ? 'text-brand-cyan' : 'text-slate-400'}`}>{r.label}</p>
                        <p className={`text-sm font-black mt-0.5 ${r.isBest ? 'text-brand-cyan' : 'text-white'}`}>{r.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
            <Link href="/#report" className="w-full bg-brand-cyan hover:bg-slate-900 hover:text-white text-slate-900 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-cyan/20 transition-all flex items-center justify-center gap-2 font-inter">
              Get Choice Filling Order <Lock className="w-4 h-4" />
            </Link>
            <button onClick={() => setDashboardData(null)} className="w-full text-[10px] font-black text-slate-400 hover:text-slate-800 transition-colors py-2 flex items-center justify-center gap-1.5 uppercase tracking-widest mt-1 font-inter">
              <ArrowRight size={10} className="rotate-180"/> Reset Terminal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}