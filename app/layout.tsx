import GlobalOnboarding from "@/components/GlobalOnboarding";
import GlobalChatWidget from "@/components/GlobalChatWidget";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import type { Metadata } from 'next';
import { Inter, Montserrat, Poppins } from 'next/font/google';
import Link from 'next/link';
import { Shield, CheckCircle2, MapPin, Heart, Sparkles } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// --- HUB-SPOT GRADE TYPOGRAPHY CONFIGURATION ---
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' });

// --- TOP 1% GLOBAL pSEO METADATA ---
export const metadata: Metadata = {
  title: 'cutoffs.info // AI-Backed NEET Cutoff & Medical Seat Data of 800+ colleges For 2026',
  description: 'Stop relying on random agents and online sites. Access the ultimate AI-backed verified medical admission data of 800+ colleges. Calculate exact NEET seat probabilities, hidden fees, and cutoff trends for Govt, AIQ, and Management quotas.',
  keywords: [
    'NEET Cutoff 2026', 
    'BAMS Cutoff Karnataka', 
    'AYUSH Counselling Data', 
    'Medical Seat Predictor', 
    'AIQ Seat Cutoffs', 
    'Management Quota Fees', 
    'NEET AIR to Score Calculator', 
    'Medical Admission Strategy'
  ],
  authors: [{ name: 'cutoffs.info' }],
  creator: 'cutoffs.info',
  publisher: 'cutoffs.info',
  openGraph: {
    title: 'cutoffs.info // The Bloomberg Terminal for Medical Admissions',
    description: 'Verify your exact NEET medical seat chances across Govt, AIQ, and Management quotas with our AI backed data engine.',
    url: 'https://cutoffs.info',
    siteName: 'cutoffs.info',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} ${poppins.variable} font-sans min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col`}>
        
        {/* --- THE FIREBASE GATEKEEPER --- */}
        <AuthProvider>
          
          {/* --- GLOBAL COMPONENTS (Modals & Floating Widgets) --- */}
          <GlobalOnboarding />
          <GlobalChatWidget />

          {/* --- GLOBAL FLUID TYPOGRAPHY CSS INJECTION --- */}
          <style dangerouslySetInnerHTML={{__html: `
            :root {
              --fluid-h1: clamp(1.75rem, 4vw, 3rem);
              --fluid-h2: clamp(1.35rem, 2.5vw, 1.75rem);
              --fluid-body: clamp(0.95rem, 1vw, 1.05rem);
              --spacing-section: clamp(3rem, 6vh, 5rem);
            }
            .text-fluid-h1 { font-size: var(--fluid-h1); line-height: 1.15; letter-spacing: -0.02em; }
            .text-fluid-h2 { font-size: var(--fluid-h2); line-height: 1.25; letter-spacing: -0.01em; }
            .text-fluid-body { font-size: var(--fluid-body); line-height: 1.7; }
            .section-spacing { margin-top: var(--spacing-section); }
          `}} />

          {/* --- THE NEW CLIENT-SIDE NAVBAR COMPONENT --- */}
          <Navbar />

          {/* --- PAGE CONTENT WRAPPER --- */}
          <div className="flex-1 flex flex-col pt-[72px]">
            {children}
          </div>

          {/* --- VERCEL SPEED INSIGHTS --- */}
          <SpeedInsights />

          {/* --- GLOBAL SAAS FOOTER --- */}
          <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 mt-auto shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl">
                  <h4 className="text-white font-black font-montserrat text-xl sm:text-2xl mb-4 flex items-center gap-3">
                    <Sparkles className="text-brand-cyan" size={24}/> The Intelligence Engine
                  </h4>
                  <p className="text-slate-400 font-poppins text-sm leading-relaxed">
                    We process chaotic, raw official admission data and synthesize it through advanced AI models, layered seamlessly with over 12 years of on-the-ground human counselling expertise. The result? Clean, actionable intelligence that eliminates guesswork and empowers you to secure your medical seat with absolute precision.
                  </p>
                </div>
                
                <div className="relative z-10 shrink-0 lg:text-right bg-slate-950/50 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
                   <span className="flex items-center lg:justify-end gap-2 text-xs font-black text-slate-300 font-inter uppercase tracking-widest mb-2">
                     <MapPin size={14} className="text-rose-500"/> Built in Bangalore
                   </span>
                   <span className="text-[11px] text-slate-500 font-poppins flex items-center lg:justify-end gap-1.5">
                     With <Heart size={12} className="text-rose-500 fill-rose-500"/> for transparent admissions.
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                <div className="lg:col-span-1">
                  <Link href="/" className="flex items-center space-x-3 mb-6">
                    <Shield className="h-8 w-8 text-brand-cyan" />
                    <span className="text-2xl font-black tracking-tight text-white font-montserrat">
                      cutoffs<span className="text-brand-cyan">.info</span>
                    </span>
                  </Link>
                  <p className="text-slate-500 text-xs font-poppins leading-relaxed mb-6 max-w-xs">
                    The ultimate data intelligence platform for AYUSH medical admissions across India.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 font-inter uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-emerald-500"/> Verified Official Data
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-black font-inter uppercase tracking-widest text-[11px] mb-6">Premium Products</h4>
                  <ul className="space-y-4 text-sm font-poppins text-slate-400">
                    <li><Link href="/#report" className="hover:text-brand-cyan transition-colors">The Full Cutoff Report (₹111)</Link></li>
                    <li><Link href="/#counselor" className="hover:text-brand-cyan transition-colors flex items-center gap-2">The AI Counselor (₹1,111) <span className="bg-brand-cyan/20 text-brand-cyan text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Popular</span></Link></li>
                    <li><Link href="/colleges" className="hover:text-brand-cyan transition-colors">Micro-Data Unlocks (₹11)</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-black font-inter uppercase tracking-widest text-[11px] mb-6">Counselling & Tools</h4>
                  <ul className="space-y-4 text-sm font-poppins text-slate-400">
                    <li><Link href="/counselling/aaccc" className="hover:text-brand-cyan transition-colors">AACCC AIQ Cutoffs</Link></li>
                    <li><Link href="/counselling/karnataka-kea" className="hover:text-brand-cyan transition-colors">KEA Karnataka Cutoffs</Link></li>
                    <li><Link href="/predictor" className="hover:text-brand-cyan transition-colors">NEET College Predictor</Link></li>
                    <li><Link href="/articles" className="hover:text-brand-cyan transition-colors">Articles & Guides</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-black font-inter uppercase tracking-widest text-[11px] mb-6">Legal</h4>
                  <ul className="space-y-4 text-sm font-poppins text-slate-400">
                    <li><Link href="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-brand-cyan transition-colors">Terms of Service</Link></li>
                    <li><Link href="/refunds" className="hover:text-brand-cyan transition-colors">Refund Policy</Link></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-poppins text-slate-600">
                <p>© {new Date().getFullYear()} cutoffs.info. A product of Ayushpedia.</p>
                <p>Engineered for the 2026 Admission Cycle.</p>
              </div>
            </div>
          </footer>

        </AuthProvider>
      </body>
    </html>
  );
}