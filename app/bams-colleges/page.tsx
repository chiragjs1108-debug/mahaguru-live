import { createClient } from '@supabase/supabase-js';
import BamsMasterClient from './BamsMasterClient';
import { Metadata } from 'next';

// Initialize Supabase (Ensure your env vars are set)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ── 1. DYNAMIC SEO METADATA ─────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Complete Database of BAMS Colleges in India & Seat Matrix (2026)',
  description: 'Your definitive guide to Ayurvedic medical admissions. Explore cutoffs, fee structures, and seat matrices for all government, private, and deemed BAMS institutes.',
  openGraph: {
    title: 'BAMS Colleges in India (2026) | cutoffs.info',
    description: 'Explore the complete state-wise directory, fees, and counseling cutoffs for BAMS admissions.',
    type: 'website',
  }
};

export default async function BamsPillarPage() {
  // ── 2. FETCH ALL STATE DATA ───────────────────────────────────────────────
  const { data: allStates, error } = await supabase
    .from('states_hub') 
    .select('*')
    .order('state_name', { ascending: true });

  if (error) {
    console.error('Supabase Error:', error);
  }

  // Deduplicate just in case of dirty DB data
  const cleanStates = allStates?.filter((v, i, a) => a.findIndex(t => (t.state_name === v.state_name)) === i) || [];

  // ── 3. AGGREGATE NATIONAL DATA FOR THE HERO SECTION ───────────────────────
  const nationalStats = {
    totalColleges: cleanStates.reduce((acc, curr) => acc + (curr.total_colleges || 0), 0),
    totalGovt: cleanStates.reduce((acc, curr) => acc + (curr.govt_colleges || 0), 0),
    totalPvt: cleanStates.reduce((acc, curr) => acc + (curr.private_colleges || 0), 0),
    // Using a rough multiplier for seats if you don't have exact seat columns yet. 
    // Replace with actual seat columns if they exist in your DB!
    estimatedTotalSeats: cleanStates.reduce((acc, curr) => acc + (curr.total_colleges || 0), 0) * 60, 
  };

  return <BamsMasterClient allStates={cleanStates} nationalStats={nationalStats} />;
}