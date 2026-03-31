'use client';

import { useState, useEffect } from 'react';
import { submitWaitlist, getTeaserData } from "./actions/waitlist";
import { 
  Shield, Activity, Database, Lock, Eye, Fingerprint, 
  Zap, Verified, X, CheckCircle2, Star, Target,
  Sparkles, LineChart, Sliders, Filter, XCircle, 
  PieChart, ChevronRight, Compass, MapPin, ChevronDown,
  Users, Building, TrendingUp, Workflow, LayoutDashboard, 
  Bot, MessageCircle, BookOpen, HelpCircle, ExternalLink, 
  ArrowRight, Leaf, Stethoscope, Quote, MessagesSquare,
  FileText, Landmark, Search,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';

// --- DATA ARRAYS ---
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Other UTs"
];

const defaultTableData = [
  { name: "Govt Ayurveda Medical College", dist: "Bangalore", quota: "AIQ", type: "Govt", lock: false, cutoff: "42,500", fees: "₹35,000" },
  { name: "SDM College of Ayurveda", dist: "Udupi", quota: "Mgt", type: "Pvt", lock: false, cutoff: "68,200", fees: "₹3,50,000" },
  { name: "JSS Ayurveda Medical College", dist: "Mysore", quota: "Govt", type: "Govt", lock: true, cutoff: "Hidden", fees: "Hidden" },
  { name: "Alvas Ayurvedic Medical College", dist: "Moodbidri", quota: "Mgt", type: "Pvt", lock: true, cutoff: "Hidden", fees: "Hidden" },
  { name: "KLE University Ayurveda", dist: "Belgaum", quota: "AIQ", type: "Pvt", lock: true, cutoff: "Hidden", fees: "Hidden" },
  { name: "Sri Kalabyraveshwara College", dist: "Bangalore", quota: "Govt", type: "Govt", lock: true, cutoff: "Hidden", fees: "Hidden" }
];

const articles = [
  {
    title: "NEET 2026 Expected BAMS Cutoffs for Government Colleges",
    excerpt: "Based on historic seat depletion rates, analyze the exact NEET score required for BAMS govt colleges.",
    date: "April 15, 2026",
    category: "Cutoff Analysis",
    slug: "neet-2026-expected-bams-cutoffs"
  },
  {
    title: "Top BAMS Colleges in Karnataka: Fees, Bonds & Rankings",
    excerpt: "A comprehensive guide to BAMS course fees, hidden penalties, and rankings for top colleges in Bangalore.",
    date: "April 10, 2026",
    category: "College Guide",
    slug: "top-bams-colleges-karnataka-fees-rankings"
  },
  {
    title: "KEA AYUSH Counselling 2026: The Ultimate Option Entry Roadmap",
    excerpt: "Learn how to structure your preference list to avoid upgrade traps in the Karnataka AYUSH counselling.",
    date: "April 5, 2026",
    category: "Counselling",
    slug: "kea-ayush-counselling-option-entry-roadmap"
  }
];

const faqs = [
  {
    question: "What is the expected BAMS cutoff for NEET 2026 for Govt Colleges?",
    answer: "The BAMS cutoff varies yearly based on paper difficulty and number of applicants. For government colleges, a safe score is typically above 450-480 for General category. Our AI Terminal provides precise predictions based on historical trends."
  },
  {
    question: "When will the KEA AYUSH Counselling 2026 begin?",
    answer: "The KEA AYUSH Counselling 2026 dates are usually announced after the NEET results. It typically commences around July-August. Keep an eye on the official KEA website for the exact schedule."
  },
  {
    question: "What is the fee structure for BAMS colleges in Karnataka?",
    answer: "BAMS course fees in Karnataka range significantly. Government college fees are around ₹50,000 - ₹80,000 per year, while private colleges under management quota can range from ₹3 Lakhs to ₹6 Lakhs annually."
  },
  {
    question: "How can I find the top BAMS colleges in Bangalore with low fees?",
    answer: "Our 'Deep Dive Database' allows you to filter colleges by location, quota (Govt/Mgt), and fee range to find the best options that fit your budget."
  }
];

const officialLinks = [
  { name: "NTA NEET", url: "https://neet.nta.nic.in/" },
  { name: "AACCC Counselling", url: "https://aaccc.gov.in/" },
  { name: "KEA Karnataka", url: "https://cetonline.karnataka.gov.in/kea/" },
  { name: "NCISM India", url: "https://ncismindia.org/" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Terminal Logic States
  const [scoreInput, setScoreInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [domicileState, setDomicileState] = useState('Karnataka');
  const [selectedState, setSelectedState] = useState('Karnataka');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [liveTableData, setLiveTableData] = useState<any[]>(defaultTableData);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchDatabase = async () => {
      const response = await getTeaserData();
      if (response?.success && response.data) {
        setLiveTableData(response.data);
      }
    };
    fetchDatabase();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const triggerAllotmentTerminal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const formData = new FormData(e.currentTarget);
    const result = await submitWaitlist(formData);
    
    setTimeout(() => {
      if (result?.success && result.data) {
        setDashboardData(result.data);
      } else {
        setDashboardData({
          status: "Regular_Match",
          aiq: { max_colleges: 12, r1: 4, r2: 12, r3: 6, best_round: "Round 2", fees: "₹2.5L", top_tier: 3, spotlight: "Govt Ayurveda Medical College", spotlight_label: "Elite Tier" },
          mgt: { max_colleges: 62, r1: 60, r2: 62, r3: 28, best_round: "Round 2", fees: "₹3.5L - ₹4.5L", top_tier: 8, spotlight: "SDM College of Ayurveda", spotlight_label: "Premium / High-ROI" },
          nri: { max_colleges: 8 },
          insight: { top: 8, summary: "High chances found in Round 2." }
        });
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submitWaitlist(formData); 
    setIsModalOpen(false);
    alert("Waitlist secured! You will receive early access.");
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const payload = Array.isArray(dashboardData) ? dashboardData[0] : (dashboardData || {});
  const aiqData = payload.aiq || payload.aiq_data || {};
  const mgtData = payload.mgt || payload.mgt_data || {};
  const appStatus = payload.status || "Regular_Match";

  const aiqRounds = [aiqData.r1 || 0, aiqData.r2 || 0, aiqData.r3 || 0];
  const aiqMax = aiqData.max_colleges !== undefined ? aiqData.max_colleges : Math.max(...aiqRounds, 0);
  const aiqBestIdx = aiqMax > 0 ? aiqRounds.indexOf(Math.max(...aiqRounds)) : -1;

  const mgtRounds = [mgtData.r1 || 0, mgtData.r2 || 0, mgtData.r3 || 0];
  const mgtMax = mgtData.max_colleges !== undefined ? mgtData.max_colleges : Math.max(...mgtRounds, 0);
  const mgtBestIdx = mgtMax > 0 ? mgtRounds.indexOf(Math.max(...mgtRounds)) : -1;

  return (
    <div className="bg-[#F8FAFC] relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .scroll-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 100ms; } .delay-200 { transition-delay: 200ms; }
        @keyframes hue-shift { 0% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(180deg); } 100% { filter: hue-rotate(360deg); } }
        .animate-hue { animation: hue-shift 15s linear infinite; }
        .bg-grid-dark { background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 32px 32px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- LEAD CAPTURE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 sm:p-10 relative shadow-2xl animate-in slide-in-from-bottom-full sm:animate-none sm:fade-in duration-300 border border-slate-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full z-10 border border-slate-200">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-8 text-center sm:text-left">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight font-montserrat">Secure Early Access</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-poppins">Join the waitlist today to unlock full database access to our AI allotment terminal.</p>
            </div>
            <form onSubmit={handleModalSubmit} className="space-y-4 font-poppins">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" required placeholder="Full Name" className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan transition-all" />
                <input type="email" name="email" required placeholder="Email Address" className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan transition-all" />
              </div>
              <div className="relative">
                <input type="tel" name="whatsapp" required placeholder="WhatsApp Number" className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-11 pr-4 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
                <MessageCircle className="w-5 h-5 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="domicile" defaultValue="" className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold px-4 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan transition-all appearance-none">
                  <option value="" disabled>Domicile State</option>
                  {indianStates.map(state => <option key={state} value={state} className="text-slate-900">{state}</option>)}
                </select>
                <select name="category" defaultValue="" className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold px-4 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan transition-all appearance-none">
                  <option value="" disabled>Category</option>
                  <option value="General" className="text-slate-900">General (UR)</option>
                  <option value="OBC" className="text-slate-900">OBC</option>
                  <option value="SC" className="text-slate-900">SC</option>
                  <option value="ST" className="text-slate-900">ST</option>
                  <option value="EWS" className="text-slate-900">EWS</option>
                </select>
              </div>
              <input type="hidden" name="source" value="waitlist_modal" />
              <button type="submit" className="w-full h-14 bg-slate-900 hover:bg-brand-cyan text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg mt-6 font-inter">
                Join Free Waitlist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- 1. DARK INTELLIGENCE HERO SECTION --- */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 max-w-full flex flex-col justify-center min-h-[90vh] bg-slate-950 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-40" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/3 animate-hue" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
          
          <div className="lg:col-span-6 space-y-6 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-brand-cyan shadow-sm font-inter backdrop-blur-sm">
              <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" /> Live For 2026 Admissions
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-montserrat leading-[1.1]">
              Unlock Official <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">BAMS Cutoff Data.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-poppins">
              Your NEET score alone isn't enough. Secure your medical seat by mapping your exact rank to historic cutoff trends, hidden fee structures, and real-time state quotas.
            </p>

            <div className="flex items-center gap-4 pt-4">
               <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-900 shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shadow-sm">+</div>
               </div>
               <p className="text-sm font-medium text-slate-400 font-poppins">Trusted by <strong className="text-white font-extrabold">1,000+</strong> aspirants</p>
            </div>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end scroll-reveal delay-200">
            {/* HERO TERMINAL WIDGET */}
            <div id="cutoff-terminal" className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_0_50px_rgba(8,145,178,0.15)] border border-slate-200 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-cyan/10 rounded-full blur-[50px] pointer-events-none" />
              
              {!dashboardData ? (
                <div className="relative z-10 animate-in fade-in duration-300">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 bg-cyan-50 text-brand-cyan rounded-2xl flex items-center justify-center border border-cyan-100 shadow-sm shrink-0">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight font-montserrat">Predict Seat Chances</h3>
                      <p className="text-[10px] font-bold text-slate-400 font-inter uppercase tracking-widest mt-0.5">AI Database Terminal</p>
                    </div>
                  </div>

                  <form onSubmit={triggerAllotmentTerminal} className="space-y-4 font-poppins">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Expected NEET Score</label>
                      <input name="score" type="number" placeholder="e.g. 450" value={scoreInput} onChange={(e) => setScoreInput(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-base px-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all placeholder:font-normal placeholder:text-slate-400 shadow-sm" />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Target Counseling</label>
                      <select name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold px-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all shadow-sm appearance-none">
                        <option value="Karnataka">Karnataka State Quota</option>
                        <option value="AACCC">AACCC All India Quota</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Your Domicile</label>
                        <select name="domicile" value={domicileState} onChange={(e) => setDomicileState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all shadow-sm appearance-none">
                          {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5 font-inter">Category</label>
                        <select name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all shadow-sm appearance-none">
                          <option value="General">Gen (UR)</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all" />
                      <input name="mobile" type="tel" placeholder="WhatsApp No." required className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs px-3 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all" />
                    </div>

                    <input type="hidden" name="source" value="homepage_terminal" />

                    <button type="submit" disabled={isAnalyzing} className="w-full bg-slate-950 hover:bg-brand-cyan text-white py-4 font-extrabold text-[11px] uppercase tracking-widest rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 group mt-6 font-inter">
                      {isAnalyzing ? <><Activity className="w-4 h-4 animate-spin"/> Processing...</> : <span className="flex items-center gap-2">Run AI Prediction <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10 flex flex-col h-full">
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md font-inter border border-slate-200">
                        {selectedState === 'Karnataka' ? 'KEA Karnataka' : 'AACCC Quota'}
                      </span>
                      <span className="text-[9px] font-extrabold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 uppercase font-inter">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/> LIVE ENGINE
                      </span>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase mt-3 font-montserrat">Seat Probability</h2>
                  </div>

                  <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar pb-2">
                    {/* AIQ Results */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm group hover:border-brand-cyan/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-brand-cyan border border-cyan-100"><Landmark size={20}/></div>
                            <div>
                              <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest font-inter">Govt / AIQ Chances</h4>
                              <p className="text-[10px] text-slate-500 font-mono font-bold uppercase mt-0.5">FEE: {aiqData.fees && aiqData.fees !== "TBD" ? aiqData.fees : "₹35k - ₹60k"}/YR</p>
                            </div>
                         </div>
                         <span className="text-3xl leading-none font-extrabold text-slate-900">{aiqMax}</span>
                      </div>

                      {aiqMax > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "Round 1", count: aiqRounds[0], isBest: aiqBestIdx === 0 },
                            { label: "Round 2", count: aiqRounds[1], isBest: aiqBestIdx === 1 },
                            { label: "Round 3", count: aiqRounds[2], isBest: aiqBestIdx === 2 },
                          ].map((r, i) => (
                            <div key={i} className={`relative p-2.5 rounded-xl border text-center ${r.isBest ? 'bg-brand-cyan/5 border-brand-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.02]' : 'bg-slate-50 border-slate-100'}`}>
                              {r.isBest && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-cyan text-white text-[7px] font-extrabold px-2 py-0.5 rounded-full uppercase z-10 whitespace-nowrap tracking-widest shadow-sm">Best Prob</div>}
                              <p className={`text-[9px] font-extrabold uppercase tracking-widest mt-2 ${r.isBest ? 'text-brand-cyan' : 'text-slate-400'}`}>{r.label}</p>
                              <p className={`text-sm font-extrabold mt-0.5 ${r.isBest ? 'text-brand-cyan' : 'text-slate-900'}`}>{r.count}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                         <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
                           <XCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                           <p className="text-xs font-extrabold text-slate-700">No Govt Matches</p>
                           <p className="text-[10px] text-slate-500 mt-1">Score is below historic Govt cutoffs.</p>
                         </div>
                      )}
                    </div>

                    {/* MGT Results */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" />
                       <div className="flex justify-between items-start mb-4 relative z-10">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-400 border border-slate-700 shadow-inner"><Building size={20}/></div>
                            <div>
                              <h4 className="text-[10px] font-extrabold text-white uppercase tracking-widest flex items-center gap-1.5 font-inter">Pvt / Mgt Chances</h4>
                              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase mt-0.5">FEE: {mgtData.fees && mgtData.fees !== "TBD" ? mgtData.fees : "₹3.5L - ₹5.5L"}/YR</p>
                            </div>
                         </div>
                         <span className="text-3xl leading-none font-extrabold text-brand-cyan">{mgtMax}</span>
                      </div>

                      {appStatus === "NRI_Only" || mgtMax === 0 ? (
                         <div className="text-center py-6 bg-slate-900 rounded-xl border border-slate-800 relative z-10">
                           <Activity className="w-6 h-6 text-amber-400 mx-auto mb-2 animate-pulse" />
                           <p className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Focus on NRI Rounds</p>
                         </div>
                      ) : (
                        <div className="relative z-10">
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Round 1", count: mgtRounds[0], isBest: mgtBestIdx === 0 },
                              { label: "Round 2", count: mgtRounds[1], isBest: mgtBestIdx === 1 },
                              { label: "Round 3", count: mgtRounds[2], isBest: mgtBestIdx === 2 },
                            ].map((r, i) => (
                              <div key={i} className={`relative p-2.5 rounded-xl border text-center ${r.isBest ? 'bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]' : 'bg-slate-900 border-slate-800'}`}>
                                {r.isBest && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-cyan text-slate-900 text-[7px] font-extrabold px-2 py-0.5 rounded-full uppercase z-10 whitespace-nowrap tracking-widest">Best Prob</div>}
                                <p className={`text-[9px] font-extrabold uppercase tracking-widest mt-2 ${r.isBest ? 'text-brand-cyan' : 'text-slate-400'}`}>{r.label}</p>
                                <p className={`text-sm font-extrabold mt-0.5 ${r.isBest ? 'text-brand-cyan' : 'text-white'}`}>{r.count}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-brand-cyan hover:bg-slate-900 hover:text-white text-slate-950 py-3.5 rounded-xl font-extrabold text-[11px] uppercase tracking-widest shadow-lg shadow-brand-cyan/20 transition-all flex items-center justify-center gap-2 font-inter">
                      Get Choice Order Report <Lock className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDashboardData(null)} className="w-full text-[10px] font-extrabold text-slate-400 hover:text-slate-800 transition-colors py-2 flex items-center justify-center gap-1.5 uppercase tracking-widest mt-1 font-inter">
                      <ArrowRight size={10} className="rotate-180"/> Reset Terminal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. FLOATING METRICS BAR --- */}
      <section className="relative z-20 -mt-10 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="text-center px-4">
              <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">800+</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-inter mt-1">Colleges Mapped</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">50k+</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-inter mt-1">Data Points</span>
            </div>
            <div className="text-center px-4 hidden md:block">
              <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">5 Yrs</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-inter mt-1">Historic RTI Data</span>
            </div>
            <div className="text-center px-4 hidden md:block">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-500 font-montserrat">100%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-inter mt-1">NCISM Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE PROBLEM: OLD WAY VS SMART WAY --- */}
      <section className="py-20 bg-white border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-montserrat leading-tight">Admissions Are Confusing.<br/><span className="text-slate-400">We Make Them Clear.</span></h2>
            <p className="text-base sm:text-lg text-slate-600 font-poppins leading-relaxed font-medium">
              Finding a college is hard enough, but figuring out the true cost is even harder. We break down the complicated fee structures for Govt, AIQ, Management, and NRI seats so your family isn't hit with unexpected costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-[2.5rem] opacity-90 hover:border-rose-200 transition-colors">
              <span className="text-xs font-extrabold font-inter text-rose-500 uppercase tracking-widest mb-3 block flex items-center gap-2"><XCircle size={14}/> The Old Way</span>
              <h3 className="text-2xl font-extrabold font-montserrat text-slate-900 mb-6 tracking-tight">Relying on Agents</h3>
              <ul className="space-y-4 text-sm font-poppins font-medium text-slate-700">
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"/> They push you toward colleges that pay them the highest commission.</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"/> Hidden hostel and miscellaneous fees are never disclosed upfront.</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"/> They charge upwards of ₹50,000 just for basic form filling.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-brand-cyan/30 scale-105 hover:border-brand-cyan/60 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[70px] rounded-full pointer-events-none" />
              <span className="text-xs font-extrabold font-inter text-brand-cyan uppercase tracking-widest mb-3 flex items-center gap-2"><CheckCircle2 size={14}/> The Smart Way</span>
              <h3 className="text-2xl font-extrabold font-montserrat text-white mb-6 tracking-tight">Data-Driven Strategy</h3>
              <ul className="space-y-4 text-sm font-poppins font-medium text-slate-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5"/> Objective, algorithm-driven college lists based on actual cutoffs.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5"/> 100% transparency on tuition, bonds, and hidden penalties.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5"/> Professional tools accessible starting at just ₹111.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. CORE PRODUCT 1: THE ₹111 DASHBOARD --- */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute top-20 left-10 text-brand-cyan/5 float-slow -z-10"><Database size={400} /></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-white mb-4 tracking-tight">Stop Reading 500-Page PDFs.</h2>
            <p className="text-slate-400 font-poppins text-lg max-w-2xl mx-auto leading-relaxed">
              We converted confusing NTA and KEA spreadsheets into a beautifully simple dashboard. Filter by Round, Quota, Domicile, and exact Fee Range in one click.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-4 sm:p-8 relative shadow-2xl">
            
            {/* Filter UI Mock */}
            <div className="w-full mb-8 pt-4 sm:pt-0">
              <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar px-2 sm:px-0 items-center">
                {[
                  { label: "Round 1", icon: Filter },
                  { label: "Category: General", icon: Users },
                  { label: "AIQ Quota", icon: Database },
                  { label: "All India Domicile", icon: MapPin },
                  { label: "Under ₹3 Lakhs", icon: Sliders }
                ].map((filter, i) => (
                  <button key={i} className="flex-shrink-0 px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold font-poppins border border-slate-700 flex items-center gap-2 active:scale-95 transition-transform whitespace-nowrap hover:border-brand-cyan">
                    <filter.icon size={14} className="text-brand-cyan"/> {filter.label} <ChevronDown size={14} className="text-slate-500"/>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative px-2 sm:px-0">
              <div className="hidden md:block overflow-x-auto pb-4">
                <table className="w-full text-left text-sm font-poppins text-slate-300 min-w-[800px]">
                  <thead className="bg-slate-800/80 text-xs uppercase font-bold text-slate-400 font-inter tracking-widest">
                    <tr>
                      <th className="px-6 py-5 rounded-tl-2xl">College Name</th>
                      <th className="px-6 py-5">District</th>
                      <th className="px-6 py-5">Quota</th>
                      <th className="px-6 py-5">Est. Cutoff</th>
                      <th className="px-6 py-5">Annual Fee</th>
                      <th className="px-6 py-5 rounded-tr-2xl">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveTableData.map((row, i) => (
                      <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-5 font-bold text-slate-100 flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${row.type === 'Govt' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {row.name}
                        </td>
                        <td className="px-6 py-5">{row.dist}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest font-inter ${row.type === 'Govt' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {row.quota}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-mono text-sm">{row.lock ? <Lock size={14} className="text-slate-600"/> : row.cutoff}</td>
                        <td className="px-6 py-5 font-mono text-sm">{row.lock ? <Lock size={14} className="text-slate-600"/> : row.fees}</td>
                        <td className="px-6 py-5">{row.lock ? <Lock size={16} className="text-slate-600"/> : <CheckCircle2 size={18} className="text-brand-cyan"/>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4 pb-4">
                {liveTableData.map((row, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-4 relative">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold font-poppins text-slate-100 leading-tight pr-4 flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${row.type === 'Govt' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {row.name}
                      </h3>
                      <span className={`flex-shrink-0 px-2 py-1 rounded text-[8px] font-extrabold font-inter uppercase tracking-widest ${row.type === 'Govt' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {row.quota}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs font-poppins">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] text-slate-500 font-inter uppercase tracking-widest font-bold">District</span>
                        <span className="text-slate-300">{row.dist}</span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[9px] text-slate-500 font-inter uppercase tracking-widest font-bold">Cutoff</span>
                        <span className="font-mono text-brand-cyan text-sm">{row.lock ? <Lock size={14} className="text-slate-600 inline"/> : row.cutoff}</span>
                      </div>
                      <div className="flex flex-col gap-1 col-span-2 pt-3 border-t border-slate-700/50 mt-1">
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] text-slate-500 font-inter uppercase tracking-widest font-bold">Annual Fee</span>
                           <span className="font-mono text-emerald-400 font-bold text-sm">{row.lock ? <Lock size={14} className="text-slate-600 inline"/> : row.fees}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Lock Overlay for Dashboard Product */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col items-center justify-end pb-10 text-center z-20 rounded-b-[2rem]">
                <Database className="w-12 h-12 text-brand-cyan mb-4"/>
                <h4 className="text-2xl font-extrabold font-montserrat text-white mb-3">The Complete Cutoff Dashboard</h4>
                <p className="text-sm text-slate-400 mb-6 font-poppins max-w-md mx-auto">Access 53 category filters, stray vacancy tracking, and verified fee structures instantly.</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-brand-cyan hover:bg-white transition-colors text-slate-900 font-extrabold font-inter text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(8,145,178,0.3)] flex items-center gap-2">
                  <Lock size={14}/> Unlock Dashboard for ₹111
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. EDUCATION / SEO: THE BAMS REALITY CHECK --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-montserrat mb-4">Decoding NEET Cutoffs & Fees.</h2>
            <p className="text-base sm:text-lg text-slate-600 font-poppins leading-relaxed font-medium">
              Understand the actual cutoffs and fee structures for Top BAMS Colleges in Karnataka before you start choice filling. 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Govt Block */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col hover:shadow-xl hover:border-emerald-300 transition-all">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6">
                <Landmark size={24}/>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-montserrat mb-2">Government Colleges</h3>
              <p className="text-sm text-slate-600 font-poppins mb-6 border-b border-slate-100 pb-6">Highly competitive. Offers the best ROI and clinical exposure. Top target for high scorers.</p>
              <div className="space-y-3 font-poppins text-sm font-medium">
                <div className="flex justify-between"><span className="text-slate-500">Avg. Cutoff</span><span className="font-bold text-slate-900">460+ Marks</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Avg. Fees</span><span className="font-bold text-emerald-600">₹35,000 /yr</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Top Target</span><span className="font-bold text-slate-900 text-right">GAMC Bengaluru</span></div>
              </div>
            </div>

            {/* Premium Pvt Block */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col hover:shadow-xl hover:border-brand-cyan/40 transition-all">
              <div className="w-14 h-14 bg-cyan-50 text-brand-cyan rounded-2xl flex items-center justify-center border border-cyan-100 mb-6">
                <Star size={24}/>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-montserrat mb-2">Premium Private</h3>
              <p className="text-sm text-slate-600 font-poppins mb-6 border-b border-slate-100 pb-6">Excellent infrastructure and brand value. High demand under State and Management quotas.</p>
              <div className="space-y-3 font-poppins text-sm font-medium">
                <div className="flex justify-between"><span className="text-slate-500">Avg. Cutoff</span><span className="font-bold text-slate-900">350+ Marks</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Avg. Fees</span><span className="font-bold text-brand-cyan">₹3.5L - ₹5L /yr</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Top Target</span><span className="font-bold text-slate-900 text-right">SDM Udupi</span></div>
              </div>
            </div>

            {/* Budget Pvt Block */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col hover:shadow-xl hover:border-amber-300 transition-all">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 mb-6">
                <Building size={24}/>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-montserrat mb-2">Budget Private</h3>
              <p className="text-sm text-slate-600 font-poppins mb-6 border-b border-slate-100 pb-6">Accessible for lower scores. Crucial to verify hospital patient flow and hidden hostel fees.</p>
              <div className="space-y-3 font-poppins text-sm font-medium">
                <div className="flex justify-between"><span className="text-slate-500">Avg. Cutoff</span><span className="font-bold text-slate-900">150+ Marks</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Avg. Fees</span><span className="font-bold text-amber-600">₹1.5L - ₹2.5L /yr</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Note</span><span className="font-bold text-rose-500 text-right">Check Exit Bonds</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. WE FIND SEATS OTHERS MISS --- */}
      <section className="py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-slate-100 float-slow -z-10"><Compass size={250} /></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-slate-900 mb-4 tracking-tight">We Find the Seats Others Miss.</h2>
            <p className="text-slate-600 font-poppins text-lg leading-relaxed font-medium">
              Most websites stop at the top 10 obvious choices. We go the extra mile. Our algorithms dig deep into the data to find the 11th Choice—the "Expert’s Special".
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            <div className="bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-[2.5rem] opacity-90 scale-95 scroll-reveal shadow-sm">
              <span className="text-xs font-extrabold font-inter text-slate-400 uppercase tracking-widest mb-3 block">The Obvious Choice</span>
              <h3 className="text-2xl font-extrabold font-montserrat text-slate-900 mb-3 tracking-tight">High-Demand College</h3>
              <p className="text-sm font-poppins text-slate-600 mb-8 leading-relaxed">Everyone applies here based on old generic data.</p>
              <ul className="space-y-4 text-sm font-poppins font-medium text-slate-700 border-t border-slate-200 pt-6">
                <li className="flex justify-between items-center"><span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400"/> Cutoff</span> <span className="font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200">480 Marks</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400"/> Fees</span> <span className="font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200">₹4.5 Lakhs</span></li>
                <li className="flex justify-between items-center text-rose-600"><span className="flex items-center gap-2"><XCircle className="w-5 h-5"/> Penalty</span> <span className="font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">1 Yr Bond</span></li>
              </ul>
            </div>

            <div className="bg-slate-950 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-brand-cyan/30 scale-105 scroll-reveal delay-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 blur-[70px] rounded-full pointer-events-none animate-hue" />
              <span className="text-[10px] font-extrabold font-inter text-brand-cyan uppercase tracking-widest mb-4 flex items-center gap-2"><Star className="w-4 h-4"/> The 11th Choice</span>
              <h3 className="text-3xl font-extrabold font-montserrat text-white mb-3 tracking-tight">The AI's Target</h3>
              <p className="text-sm font-poppins text-slate-400 mb-8 leading-relaxed">Flagged by our engine for premium clinical exposure.</p>
              <ul className="space-y-4 text-sm font-poppins font-medium text-slate-200 border-t border-slate-800 pt-6 mb-8">
                <li className="flex justify-between items-center"><span className="flex items-center gap-2"><Verified className="w-5 h-5 text-brand-cyan"/> Cutoff</span> <span className="font-bold text-brand-cyan bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">410 Marks</span></li>
                <li className="flex justify-between items-center"><span className="flex items-center gap-2"><Verified className="w-5 h-5 text-brand-cyan"/> Fees</span> <span className="font-bold text-brand-cyan bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">₹2.8 Lakhs</span></li>
                <li className="flex justify-between items-center text-emerald-400"><span className="flex items-center gap-2"><Verified className="w-5 h-5"/> Penalty</span> <span className="font-bold bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-800/50">No Bond</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. CORE PRODUCT 2: THE ₹1,111 AI COUNSELOR --- */}
      <section id="counselor" className="py-24 bg-gradient-to-br from-[#1E1B18] to-[#0A0908] border-y border-[#3A2A1A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* THE ACTUAL CHAT COMPONENT (Replaces the mock UI) */}
            <div className="order-2 lg:order-1 relative w-full flex justify-center">
               <ChatInterface />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                <Shield size={14} className="text-orange-500"/>
                <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest font-inter">Premium Service</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-montserrat leading-tight">
                Get Answers Instantly. <br/>
                <span className="text-orange-500">Hire The AI Expert.</span>
              </h2>
              
              <p className="text-slate-400 font-poppins text-base sm:text-lg leading-relaxed">
                Admissions rules are confusing and agents are expensive. Our 24/7 AI Counselor interacts with you, answers complex rule queries, and generates a flawless, personalized preference list tailored exactly to your rank.
              </p>

              <ul className="space-y-4 text-sm font-poppins font-medium text-slate-300 py-6 border-y border-[#3A2A1A]/50 my-6">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Chat 24/7 for instant answers on fees, bonds, and quotas.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Generate Custom Option Entry sequence lists.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0"/> Avoid "Upgrade Traps" that trigger heavy fines.</li>
              </ul>

              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold font-inter text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 group w-full sm:w-auto justify-center">
                <MessagesSquare size={16}/> Upgrade to Pro Tier (₹1,111) <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. TESTIMONIALS / SOCIAL PROOF --- */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-slate-900 mb-4 tracking-tight">Trusted by Smart Parents.</h2>
            <p className="text-slate-600 font-poppins text-lg font-medium">Join thousands who ditched agents and used data to secure their medical seats.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Agents asked for ₹50k just to build a preference list. This tool gave us the exact same KEA data for ₹111. We secured a seat in Round 2 flawlessly.", author: "Rajesh K.", role: "Parent (Score: 485)", color: "brand-cyan" },
              { quote: "I almost entered a college with a ₹3 Lakh exit bond. The AI Counselor caught it and helped me rearrange my options. Lifesaver.", author: "Priya S.", role: "Student (Score: 412)", color: "orange-500" },
              { quote: "The NRI quota conversion rules were a nightmare. Their guides and data dashboard made the fee structure crystal clear before we committed.", author: "Dr. Ahmed M.", role: "Parent (NRI)", color: "indigo-500" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 relative shadow-sm">
                <Quote size={40} className={`text-${t.color}/10 absolute top-6 right-6`} />
                <div className="flex gap-1 mb-4 text-amber-400">
                  <Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/>
                </div>
                <p className="text-sm font-poppins text-slate-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-slate-900 font-montserrat">{t.author}</p>
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-inter mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 9. TRUST: 12+ YEARS OF REALITY --- */}
      <section className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-20 left-20 text-slate-100 float-slow -z-10"><Fingerprint size={200} /></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 scroll-reveal">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 group">
            <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
            <div className="w-full h-[400px] bg-slate-900 flex items-center justify-center">
               <Database size={80} className="text-brand-cyan/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/30 backdrop-blur-md rounded-full text-[10px] font-extrabold text-brand-cyan uppercase tracking-widest shadow-sm mb-2 font-inter">
                  <Sparkles size={12}/> System Active
                </div>
               <p className="text-white font-medium text-sm font-poppins">Cutoffs.info Intelligence Engine</p>
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight font-montserrat">
              12+ Years of Reality <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-600">Meets AI Power.</span>
            </h2>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed font-poppins">
              We’ve digitized a decade of counseling experience into a logic engine that finds the seats others miss. Verified data, zero agent greed.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 border border-slate-200 shadow-sm p-6 rounded-[2rem]">
                <h4 className="font-extrabold font-montserrat text-slate-900 mb-2 flex items-center gap-2"><CheckCircle2 size={20} className="text-brand-cyan" /> Human Expertise</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins">A decade of college insights fed into AI logic.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 shadow-sm p-6 rounded-[2rem]">
                <h4 className="font-extrabold font-montserrat text-slate-900 mb-2 flex items-center gap-2"><Shield size={20} className="text-brand-cyan" /> Pure Data</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins">Operates on strict cutoffs, not college bias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 10. RECENT ARTICLES GRID --- */}
      <section id="articles" className="py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-slate-900 mb-4 tracking-tight">Latest Intelligence Reports</h2>
            <p className="text-slate-600 font-poppins text-lg font-medium max-w-2xl mx-auto">Stay ahead with data-driven analysis on NEET cutoffs and counselling updates.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
            {articles.map((article, i) => (
              <Link href={`/articles`} key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-cyan/30 transition-all group cursor-pointer flex flex-col">
                <span className="text-[10px] font-extrabold text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1.5 rounded-lg mb-5 inline-block w-max font-inter">{article.category}</span>
                <h3 className="text-xl font-extrabold font-montserrat text-slate-900 mb-3 leading-tight group-hover:text-brand-cyan transition-colors">{article.title}</h3>
                <p className="text-sm text-slate-600 font-poppins leading-relaxed mb-8 flex-grow">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-slate-900 group-hover:text-brand-cyan transition-colors font-inter mt-auto pt-4 border-t border-slate-100">
                  Read Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/articles" className="inline-flex items-center gap-2 font-extrabold font-inter text-xs uppercase tracking-widest text-brand-cyan hover:text-slate-900 transition-colors">
              View All Intelligence Hubs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQs --- */}
      <section className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 font-poppins">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-cyan/30 transition-colors shadow-sm">
                <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 pr-8">{faq.question}</h4>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 pb-6 text-sm text-slate-600 leading-relaxed ${openFaqIndex === i ? 'block' : 'hidden'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OFFICIAL COUNSELING AUTHORITIES --- */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal text-center">
            <h2 className="text-2xl font-extrabold font-montserrat text-slate-900 mb-8 tracking-tight">Official Counseling Authorities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {officialLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-cyan/50 hover:shadow-md transition-all group text-left">
                <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan transition-colors shadow-sm">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold font-poppins text-slate-700 group-hover:text-slate-900 transition-colors">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- 11. FINAL PUSH CTA --- */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center scroll-reveal">
          <h2 className="text-4xl sm:text-6xl font-extrabold font-montserrat text-white mb-6 tracking-tight leading-tight">
            Stop Guessing.<br/>
            <span className="text-brand-cyan">Start Analyzing.</span>
          </h2>
          <p className="text-lg text-slate-400 font-poppins mb-10 max-w-2xl mx-auto">
            Join the waitlist today to secure your medical seat with absolute precision using verified official data.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-cyan hover:bg-white text-slate-900 font-extrabold font-inter text-sm uppercase tracking-widest px-10 py-5 rounded-2xl transition-colors shadow-[0_0_40px_rgba(8,145,178,0.4)] flex items-center justify-center gap-3 mx-auto group">
            <Lock size={18}/> Unlock The Terminal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      </section>

    </div>
  );
}