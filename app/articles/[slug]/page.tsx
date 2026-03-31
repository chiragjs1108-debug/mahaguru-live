import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Calendar, Clock, User, Home, 
  ChevronRight, Bot, Lock, MessagesSquare, CheckCircle2, Database, Tag, Zap, FolderOpen, LayoutGrid,
  ShieldCheck, ArrowRight, TrendingUp, Sparkles, Activity, Layers, Target, Shield, ArrowUpRight, Star,
  Landmark, Globe, Crown, Compass, FileText, Building, MapPin, BadgeIndianRupee,
  BookOpen
} from 'lucide-react';

import TerminalWidget from '@/components/TerminalWidget';
import MagneticWrapper from '@/components/MagneticWrapper';
import ScrollProgressBar from '@/components/ScrollProgressBar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{ slug: string }>
};

// --- DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image_url, target_keyword')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Article Not Found | Ayushpedia.in' };

  return {
    title: `${article.title} | Ayushpedia.in`,
    description: article.excerpt || 'Expert analysis and official cutoff data for 2026 AYUSH admissions.',
    keywords: article.target_keyword ? [article.target_keyword, 'BAMS counseling', 'NEET 2026'] : ['BAMS counseling', 'NEET 2026'],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: article.cover_image_url ? [{ url: article.cover_image_url }] : [],
    },
  };
}

// --- DATA & HELPERS ---
const getCategoryStyles = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'scams & alerts': return { color: 'text-rose-600', bg: 'bg-rose-50', icon: Target, border: 'border-rose-200' };
    case 'fee & bonds': return { color: 'text-amber-600', bg: 'bg-amber-50', icon: BadgeIndianRupee, border: 'border-amber-200' };
    case 'cutoff scenarios': return { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Target, border: 'border-indigo-200' };
    case 'counselling guides': return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: BookOpen, border: 'border-emerald-200' };
    case 'nri quota': return { color: 'text-purple-600', bg: 'bg-purple-50', icon: Globe, border: 'border-purple-200' };
    case 'state quota': return { color: 'text-blue-600', bg: 'bg-blue-50', icon: MapPin, border: 'border-blue-200' };
    case 'college reviews': return { color: 'text-teal-600', bg: 'bg-teal-50', icon: Star, border: 'border-teal-200' };
    default: return { color: 'text-slate-600', bg: 'bg-slate-100', icon: Tag, border: 'border-slate-200' };
  }
};

const getArticleSnippet = (article: any) => {
  if (article.excerpt && article.excerpt.trim() !== "") return article.excerpt;
  if (article.content) {
    const cleanText = article.content.replace(/[#*`]/g, '').slice(0, 160);
    return cleanText + "...";
  }
  return "Expert data analysis and official cutoff trends for the 2026 AYUSH admission cycle.";
};

const extractHeadings = (markdown: string) => {
  if (!markdown) return [];
  const regex = /^#{2,3}\s+(.+)$/gm;
  const matches = Array.from(markdown.matchAll(regex));
  return matches.map((match) => {
    const cleanTitle = match[1].replace(/[*_\\]/g, '').trim();
    return {
      title: cleanTitle,
      slug: cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    };
  });
};

// --- IMPORTED FEED WIDGETS FOR SPACE FILLING ---

const SidebarPillarHubs = () => (
  <div className="flex flex-col gap-3">
    <Link href="/counselling/karnataka-kea" className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 hover:border-brand-cyan transition-all shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Compass size={56}/></div>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <span className="bg-blue-50 text-blue-600 p-2 rounded-lg"><MapPin size={16}/></span>
        <h3 className="font-black text-slate-900 text-sm group-hover:text-brand-cyan transition-colors">KEA Karnataka</h3>
      </div>
      <p className="text-[11px] text-slate-500 font-medium relative z-10">State quota process and document verification.</p>
    </Link>
    <Link href="/counselling/aaccc" className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-500 transition-all shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Globe size={56}/></div>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <span className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Landmark size={16}/></span>
        <h3 className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">AACCC AIQ</h3>
      </div>
      <p className="text-[11px] text-slate-500 font-medium relative z-10">15% All India Quota and National Institutes.</p>
    </Link>
  </div>
);

const EssentialGuidesWidget = () => {
  const vaultItems = [
    { title: "Govt Colleges: AACCC Category Cutoffs", desc: "Track exact closing ranks for General, OBC, EWS, SC & ST across the 15% All India Quota.", badge: "AACCC AIQ", icon: Landmark, theme: "blue", link: "/articles/bams-cutoff-for-government-colleges" },
    { title: "Karnataka Govt & Private Cutoffs", desc: "Category-wise cutoff scores and historic trends for all BAMS colleges in Karnataka.", badge: "State Quota", icon: MapPin, theme: "indigo", link: "#" },
    { title: "Management Quota Cutoffs in Karnataka", desc: "Uncover the precise NEET ranks and hidden fee structures required for direct admission.", badge: "Mgt Quota", icon: Crown, theme: "amber", link: "#" },
  ];

  const getThemeStyles = (theme: string) => {
    switch(theme) {
      case 'blue': return { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hoverBorder: 'hover:border-blue-400', glow: 'hover:shadow-blue-500/20', stroke: 'stroke-blue-400', btnHover: 'group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600' };
      case 'indigo': return { bg: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', hoverBorder: 'hover:border-indigo-400', glow: 'hover:shadow-indigo-500/20', stroke: 'stroke-indigo-400', btnHover: 'group-hover/item:bg-indigo-600 group-hover/item:text-white group-hover/item:border-indigo-600' };
      case 'amber': return { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hoverBorder: 'hover:border-amber-400', glow: 'hover:shadow-amber-500/20', stroke: 'stroke-amber-400', btnHover: 'group-hover/item:bg-amber-500 group-hover/item:text-white group-hover/item:border-amber-500' };
      default: return { bg: 'bg-slate-500', light: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', hoverBorder: 'hover:border-slate-400', glow: 'hover:shadow-slate-500/20', stroke: 'stroke-slate-400', btnHover: 'group-hover/item:bg-slate-600 group-hover/item:text-white group-hover/item:border-slate-600' };
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-7 shadow-sm border border-slate-200 mt-12 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      <div className="absolute -right-40 -top-40 w-80 h-80 bg-brand-cyan/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-slate-100 pb-4 relative z-10 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="bg-slate-950 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-md relative shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-50"></div>
            <Database size={22} className="relative z-10 text-brand-cyan"/>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_6px_rgba(8,145,178,0.6)] animate-pulse"></span>
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Master Database</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">The Cutoff Vault</h3>
          </div>
        </div>
        <Link href="/articles?pillar=Cutoff Scenarios" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-brand-cyan bg-slate-50 hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 hover:border-brand-cyan/30 w-fit shrink-0 shadow-sm">
          Access Data <ArrowRight size={12}/>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 relative z-10">
        {vaultItems.map((item, i) => {
          const theme = getThemeStyles(item.theme);
          return (
            <Link key={i} href="#" className={`group/item flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-slate-100 ${theme.hoverBorder} ${theme.glow} transition-all duration-300 relative overflow-hidden gap-4`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bg} scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-center`}></div>
              <div className="flex items-start sm:items-center gap-4 flex-1 overflow-hidden w-full">
                <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.light} ${theme.text} flex items-center justify-center border ${theme.border} group-hover/item:scale-110 transition-transform duration-300 shadow-sm`}>
                  <item.icon size={20} strokeWidth={2.5}/>
                </div>
                <div className="flex flex-col flex-1 w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded flex items-center text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${theme.light} ${theme.text}`}>{item.badge}</span>
                  </div>
                  <h4 className="text-sm sm:text-[15px] font-black text-slate-900 group-hover/item:text-slate-950 leading-tight whitespace-normal pr-2">{item.title}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1 line-clamp-2 sm:line-clamp-1 font-medium">{item.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5 shrink-0 pl-14 sm:pl-0 mt-2 sm:mt-0">
                <div className={`flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-4 py-2 sm:py-2.5 rounded-lg border border-slate-200 text-slate-500 bg-slate-50 transition-all duration-300 ${theme.btnHover}`}>
                  View Trends <ArrowRight size={12} className="-translate-x-1 group-hover/item:translate-x-0 transition-transform duration-300"/>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

const KEA_Counselling_Cluster = () => {
  const coreLinks = [
    { title: "Counselling Overview", desc: "Complete Guide", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Important Dates", desc: "Schedule & Deadlines", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
    { title: "Detailed Fees", desc: "Govt & Private Seats", icon: BadgeIndianRupee, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { title: "Management Quota", desc: "Direct Admission", icon: Crown, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 border border-slate-200 shadow-sm mt-8 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3.5 mb-6 border-b border-slate-100 pb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-brand-cyan flex items-center justify-center shadow-lg shadow-blue-500/20">
          <MapPin size={20} className="text-white"/>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">KEA Karnataka Hub 2026</h3>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">Your complete roadmap to state counseling</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {coreLinks.map((item, i) => (
          <Link key={i} href="#" className={`p-3.5 sm:p-4 rounded-2xl border ${item.border} bg-white hover:${item.bg} hover:border-transparent hover:shadow-md transition-all group flex flex-col h-full`}>
             <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shrink-0 ${item.color} shadow-sm`}>
               <item.icon size={20} strokeWidth={2.5}/>
             </div>
             <div className="mt-auto">
               <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight group-hover:text-brand-cyan transition-colors mb-0.5">{item.title}</h4>
               <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-snug">{item.desc}</p>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- SIDEBAR WIDGETS ---
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
      <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Have a specific scenario? Ask our AI engine to simulate your chances across all counseling rounds before you lock your choices.
      </p>
      <MagneticWrapper>
        <Link href="/#counselor" className="w-full bg-brand-cyan hover:bg-white text-slate-950 font-black text-[11px] uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:scale-[1.02]">
          Start Session <ArrowUpRight size={14}/>
        </Link>
      </MagneticWrapper>
    </div>
  </div>
);

const PremiumServicesSidebar = () => (
  <div className="space-y-6">
    <div className="bg-slate-950 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20 border border-slate-800 hover:border-indigo-500/50 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start mb-5">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full">
            <Database size={12} className="text-indigo-400 animate-pulse"/>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Data & Analytics</span>
          </div>
        </div>
        <h3 className="text-2xl sm:text-[26px] font-black text-white mb-3 tracking-tight leading-tight">
          State Level <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-indigo-400">Cutoff Data</span>
        </h3>
        <p className="text-slate-400 text-[13px] leading-relaxed mb-6 font-medium">
          Comprehensive cutoff data for all rounds and quotas, combined with an interactive dashboard.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3 group/list">
            <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><Layers size={12} className="text-indigo-400"/></div>
            <div><span className="block text-[13px] text-white font-bold mb-0.5">All Quotas & Rounds</span><span className="block text-[11px] text-slate-400 font-medium">State, AIQ, Management & NRI.</span></div>
          </li>
          <li className="flex items-start gap-3 group/list">
            <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-indigo-500/20 transition-colors"><TrendingUp size={12} className="text-indigo-400"/></div>
            <div><span className="block text-[13px] text-white font-bold mb-0.5">Rank to Score Mapping</span><span className="block text-[11px] text-slate-400 font-medium">Closing ranks mapped to exact scores.</span></div>
          </li>
        </ul>
      </div>
      <MagneticWrapper>
        <Link href="/pricing" className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 border border-slate-700 hover:border-indigo-400 shadow-lg">
          Get Data Access <ArrowRight size={14}/>
        </Link>
      </MagneticWrapper>
    </div>

    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FEF1E6] rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20 border border-[#FADCC7] hover:border-orange-400 flex flex-col h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-12"></div>
      <div className="absolute top-0 right-6 bg-gradient-to-b from-orange-500 to-rose-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1.5 rounded-b-lg shadow-sm flex items-center gap-1 z-20">
        <Star size={8} className="fill-white"/> Ultimate
      </div>
      <div className="relative z-10 flex-1 mt-2">
        <div className="inline-flex items-center gap-2 mb-4 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full">
          <Bot size={12} className="text-orange-600 animate-bounce"/>
          <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">AI Engine</span>
        </div>
        <h3 className="text-2xl sm:text-[26px] font-black text-slate-900 mb-3 tracking-tight leading-tight">
          24/7 Expert <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-500">AI Counsellor</span>
        </h3>
        <p className="text-slate-600 text-[13px] leading-relaxed mb-6 font-medium">
          Your personal admission strategist. Get instant answers and flawless preference lists.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3 group/list">
            <div className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/list:bg-orange-500/20 transition-colors"><Clock size={12} className="text-orange-600"/></div>
            <div><span className="block text-[13px] text-slate-900 font-bold mb-0.5">24/7 Availability</span><span className="block text-[11px] text-slate-600 font-medium">Instant answers to complex queries.</span></div>
          </li>
          <li className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-orange-200 shadow-sm relative overflow-hidden group/highlight mt-2">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 translate-x-[-100%] group-hover/highlight:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="w-6 h-6 rounded-md bg-rose-500/10 flex items-center justify-center shrink-0"><Zap size={12} className="text-rose-600 fill-rose-500/20"/></div>
            <div><span className="block text-[12px] text-slate-900 font-black mb-0.5">Dashboard Included</span><span className="block text-[10px] text-slate-600 font-medium">Full access to Cutoff Data.</span></div>
          </li>
        </ul>
      </div>
      <MagneticWrapper>
        <Link href="/pricing" className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2">
          Hire AI Expert <ArrowRight size={14}/>
        </Link>
      </MagneticWrapper>
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function SingleArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !article) {
    notFound();
  }

  // --- NEW: FETCH SIDEBAR ARTICLES (SAME CATEGORY + FALLBACK) ---
  let { data: sameCategoryArticles } = await supabase
    .from('articles')
    .select('title, slug, cover_image_url, published_at, category')
    .eq('category', article.category || 'Intelligence')
    .eq('is_published', true)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(6);

  if (!sameCategoryArticles || sameCategoryArticles.length === 0) {
    const { data: fbSidebar } = await supabase
      .from('articles')
      .select('title, slug, cover_image_url, published_at, category')
      .eq('is_published', true)
      .neq('slug', slug)
      .order('published_at', { ascending: false })
      .limit(6);
    sameCategoryArticles = fbSidebar || [];
  }

  // --- NEW: FETCH BOTTOM ARTICLES (OTHER CATEGORIES + FALLBACK) ---
  let { data: otherCategoryArticles } = await supabase
    .from('articles')
    .select('title, slug, cover_image_url, published_at, category, read_time, excerpt, content')
    .neq('category', article.category || 'Intelligence')
    .eq('is_published', true)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(5);

  if (!otherCategoryArticles || otherCategoryArticles.length === 0) {
    const sidebarSlugs = sameCategoryArticles.map(a => a.slug);
    const { data: fbBottom } = await supabase
      .from('articles')
      .select('title, slug, cover_image_url, published_at, category, read_time, excerpt, content')
      .eq('is_published', true)
      .neq('slug', slug)
      .not('slug', 'in', `(${sidebarSlugs.length > 0 ? sidebarSlugs.join(',') : 'none'})`)
      .order('published_at', { ascending: false })
      .limit(5);
    otherCategoryArticles = fbBottom || [];
  }

  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image_url || 'https://ayushpedia.in/default-og.jpg',
    datePublished: article.published_at,
    author: { '@type': 'Person', name: article.author || 'Data Desk Analyst' },
    publisher: { '@type': 'Organization', name: 'Ayushpedia.in', logo: { '@type': 'ImageObject', url: 'https://ayushpedia.in/logo.png' } }
  };

  const toc = extractHeadings(article.content);

  let cleanContent = article.content || '';
  cleanContent = cleanContent.replace(/\\!\\\[/g, '![').replace(/\\\]\\\(/g, '](').replace(/\\\)/g, ')');
  cleanContent = cleanContent.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
  cleanContent = cleanContent.replace(/!*\[([^\]]*)\][\s\r\n\(]*(https?:\/\/[^\s\)]+(?:\.png|\.jpg|\.jpeg|\.webp|supabase\.co)[^\s\)]*)[\s\r\n\)]*/gi, '![$1]($2)\n\n');
  cleanContent = cleanContent.replace(/\\\*/g, '*').replace(/\\_/g, '_');
  const contentParts = cleanContent.split(/\[INJECT_CTA\]/i);

  const tocWidget = toc.length > 0 && (
    <div className="bg-white rounded-[2rem] border border-slate-200/60 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
          <LayoutGrid size={14} className="text-brand-cyan" />
        </div>
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 font-montserrat uppercase tracking-widest">
          In This Briefing
        </h3>
      </div>
      <ul className="space-y-4 relative before:absolute before:inset-y-0 before:left-[7px] before:w-[2px] before:bg-slate-100">
        {toc.map((heading, i) => (
          <li key={i} className="relative pl-6 group">
            <span className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-200 ring-4 ring-white group-hover:bg-brand-cyan transition-colors z-10"></span>
            <a href={`#${heading.slug}`} className="text-[13px] sm:text-[14px] font-semibold text-slate-600 group-hover:text-brand-cyan transition-colors leading-relaxed block">
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen w-full flex flex-col relative pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <ScrollProgressBar />

      {/* MOBILE STICKY COMMAND BAR */}
      <div className="lg:hidden fixed bottom-5 left-4 w-[calc(100%-85px)] max-w-sm z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <MagneticWrapper>
            <Link href="/pricing" className="w-full flex items-center justify-center gap-2 bg-[#0B1221] border border-brand-cyan/30 text-white font-extrabold font-inter text-[11px] uppercase tracking-widest py-3.5 px-4 rounded-full shadow-[0_10px_40px_rgba(11,18,33,0.3)] active:scale-95 transition-transform">
              <Database size={14} className="text-brand-cyan" /> Unlock Cutoff Data
            </Link>
          </MagneticWrapper>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-6 lg:py-16">
        
        <nav className="flex items-center text-[10px] sm:text-xs font-bold text-slate-500 mb-6 sm:mb-8 font-inter uppercase tracking-widest gap-2">
          <Link href="/" className="hover:text-brand-cyan flex items-center gap-1 transition-colors"><Home size={12}/> Home</Link>
          <ChevronRight size={10} className="text-slate-400"/>
          <Link href="/articles" className="hover:text-brand-cyan transition-colors">Intelligence Hub</Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <article className="lg:col-span-8 w-full min-w-0">
            
            <header className="mb-8 sm:mb-10 border-b border-slate-200 pb-6 sm:pb-8">
              <span className="inline-block bg-slate-900 text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full font-inter uppercase tracking-widest mb-4">
                {article.category || 'Report'}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 font-montserrat leading-[1.3] sm:leading-[1.25] tracking-tight mb-4">
                {article.title}
              </h1>
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-poppins mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-bold text-slate-500 font-inter uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600"><User size={12}/></div>
                  <span className="text-slate-800">{article.author || 'Data Desk'}</span>
                </div>
                <div className="flex items-center gap-1.5"><Calendar size={12}/> {publishDate}</div>
                <div className="flex items-center gap-1.5"><Clock size={12}/> {article.read_time || '5 Min Read'}</div>
              </div>
            </header>

            {article.cover_image_url && (
              <figure className="mb-8 sm:mb-12 relative group overflow-hidden rounded-[1.5rem] sm:rounded-2xl shadow-sm border border-slate-200">
                <img src={article.cover_image_url} alt={article.title} className="w-full h-auto max-h-[300px] sm:max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm flex items-center gap-1.5">
                   <Zap size={12} className="text-amber-500 animate-pulse"/> Verified Intelligence
                </div>
              </figure>
            )}

            <div className="block lg:hidden mb-10">
              {tocWidget}
            </div>

            {contentParts.map((part: string, index: number) => (
              <React.Fragment key={index}>
                <div className="prose prose-slate max-w-none prose-h1:hidden prose-headings:font-montserrat prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 prose-headings:scroll-mt-24 prose-h2:text-xl sm:prose-h2:text-[22px] prose-h2:mt-10 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:font-poppins prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-[15px] sm:prose-p:text-[16px] prose-p:mb-5 sm:prose-p:mb-6 prose-a:text-brand-cyan prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6 prose-ul:space-y-1 sm:prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-6 prose-ol:space-y-1 sm:prose-ol:space-y-2 prose-li:font-poppins prose-li:text-slate-700 prose-li:text-[15px] sm:prose-li:text-[16px] prose-li:marker:text-brand-cyan prose-blockquote:border-l-4 prose-blockquote:border-brand-cyan prose-blockquote:bg-slate-50 prose-blockquote:p-4 sm:prose-blockquote:p-6 prose-blockquote:my-6 sm:prose-blockquote:my-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-800 prose-blockquote:font-medium prose-img:rounded-[1.5rem] sm:prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:border prose-img:border-slate-100 prose-img:mx-auto prose-img:my-8 sm:prose-img:my-12 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:whitespace-nowrap [&_table]:shadow-[0_8px_30px_rgb(0,0,0,0.06)] [&_table]:rounded-2xl [&_table]:border [&_table]:border-slate-800 [&_table]:mb-10 [&_table]:bg-white prose-table:text-[13px] sm:prose-table:text-[14px] prose-table:font-poppins [&_thead]:bg-[#0B1221] [&_th]:text-brand-cyan [&_th]:p-4 sm:[&_th]:p-5 [&_th]:text-left [&_th]:font-extrabold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-[10px] [&_th_strong]:text-white [&_th]:border-b-0 [&_td]:p-4 sm:[&_td]:p-5 [&_td]:border-b [&_td]:border-slate-100 [&_td]:text-slate-700 [&_td]:font-medium [&_tr:last-child_td]:border-b-0 [&_tr:nth-child(even)_td]:bg-slate-50/50">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeSlug, rehypeRaw]} 
                  >
                    {part}
                  </ReactMarkdown>
                </div>

                {index < contentParts.length - 1 && (
                  <div className="my-10 sm:my-12 bg-[#FFF5ED] border border-orange-200 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 group">
                    <div className="relative z-10 flex-1 text-center sm:text-left">
                      <div className="inline-flex items-center gap-2 mb-3 text-orange-600 bg-white border border-orange-200 px-3 py-1 rounded-full shadow-sm">
                        <Bot size={12} className="text-orange-500"/>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest font-inter">Premium AI Engine</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-montserrat tracking-tight mb-2">
                        Need a custom preference list?
                      </h3>
                      <p className="text-slate-600 font-poppins text-[13px] sm:text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
                        Hire our AI Counselor to review your exact rank and build a trap-free counseling strategy based on your budget.
                      </p>
                    </div>
                    <div className="relative z-10 shrink-0 w-full sm:w-auto">
                      <MagneticWrapper>
                        <Link href="/#counselor" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white font-extrabold font-inter text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2">
                          <MessagesSquare size={16}/> Hire Expert (₹1,111)
                        </Link>
                      </MagneticWrapper>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* --- CORE BOTTOM WIDGETS --- */}
            <EssentialGuidesWidget />
            <KEA_Counselling_Cluster />

            <div className="mt-12 sm:mt-16 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-cyan"></div>
              <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                <ShieldCheck size={28} className="text-slate-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-montserrat tracking-tight mb-1.5">
                  Verified by the Intelligence Desk
                </h3>
                <p className="text-slate-600 font-poppins text-[13px] sm:text-sm leading-relaxed">
                  This report is backed by over 12 years of verified AYUSH counseling data. We bypass agent bias and strictly aggregate official state and All India Quota seat allotment records to give you mathematically safe preference strategies.
                </p>
              </div>
            </div>

            {article.target_keyword && (
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 sm:gap-3">
                <Tag size={16} className="text-slate-400" />
                <span className="text-[10px] sm:text-xs font-bold font-inter text-slate-500 uppercase tracking-widest mr-2">Tags:</span>
                {article.target_keyword.split(',').map((tag: string, idx: number) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-600 shadow-sm text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full font-inter uppercase tracking-widest hover:border-brand-cyan hover:text-brand-cyan transition-colors cursor-default">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* --- BOTTOM DISCOVERY GRID (FROM FETCH) --- */}
            {otherCategoryArticles && otherCategoryArticles.length > 0 && (
              <div className="pt-8 sm:pt-10 border-t-4 border-slate-900 mb-10 sm:mb-12 mt-12 sm:mt-16">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-montserrat uppercase tracking-tight flex items-center gap-2">
                    <Zap size={18} className="text-brand-cyan"/> Discover Other Categories
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherCategoryArticles.map((post: any, idx: number) => {
                    const styles = getCategoryStyles(post.category);
                    const Icon = styles.icon;
                    return (
                      <Link href={`/articles/${post.slug}`} key={idx} className="flex flex-row bg-white rounded-2xl border border-slate-200 p-3 shadow-sm hover:shadow-md transition-all group items-stretch h-[140px] sm:h-[150px] relative">
                         <div className="w-24 sm:w-32 shrink-0 rounded-xl overflow-hidden relative bg-slate-100 mr-4">
                           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.cover_image_url || 'https://ayushpedia.in/default-og.jpg'})` }} />
                         </div>
                         <div className="flex flex-col flex-1 py-1 overflow-hidden">
                            <div className="flex items-center justify-between mb-2"><span className={`${styles.color} text-[8px] sm:text-[9px] font-black uppercase tracking-widest flex items-center gap-1`}><Icon size={10}/> <span className="truncate">{post.category}</span></span></div>
                            <h3 className="font-black text-slate-900 text-[13px] sm:text-sm mb-1.5 group-hover:text-brand-cyan transition-colors leading-tight line-clamp-2">{post.title}</h3>
                            <p className="hidden sm:block text-[11px] text-slate-500 leading-snug flex-1 line-clamp-2">{getArticleSnippet(post)}</p>
                            <div className="mt-auto flex items-center justify-between pt-2"><span className="text-[9px] font-bold text-slate-400">{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span><span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight size={10}/></span></div>
                         </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

          </article>

          {/* --- RIGHT SIDEBAR --- */}
          <aside className="lg:col-span-4 w-full mt-8 lg:mt-0 border-t-2 lg:border-t-0 border-slate-200 pt-8 lg:pt-0">
            <div className="space-y-6 sm:space-y-8 pb-10">
              
              {/* DESKTOP TOC */}
              <div className="hidden lg:block">
                {tocWidget}
              </div>

              {/* SIDEBAR: SAME CATEGORY FEED (FROM FETCH) */}
              {sameCategoryArticles && sameCategoryArticles.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-200/60 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h3 className="text-xs font-extrabold text-slate-900 font-montserrat uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2 border-b-2 border-slate-900 pb-3">
                    Latest in {article.category}
                  </h3>
                  <div className="space-y-5 sm:space-y-6">
                    {sameCategoryArticles.map((latest: any) => (
                      <Link href={`/articles/${latest.slug}`} key={latest.slug} className="group flex gap-3 sm:gap-4 items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                           <img src={latest.cover_image_url || 'https://ayushpedia.in/default-og.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="text-[13px] sm:text-[15px] font-semibold text-slate-800 font-poppins leading-snug group-hover:text-brand-cyan transition-colors line-clamp-2 mb-1.5">
                            {latest.title}
                          </h4>
                          <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 font-inter uppercase tracking-widest block">
                            {new Date(latest.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <SidebarPillarHubs />
              <SidebarCTA_AICounselor />
              <TerminalWidget />

              <div className="sticky top-28 pt-4">
                <PremiumServicesSidebar />
              </div>

            </div>
          </aside>

        </div>
      </main>

    </div>
  );
}