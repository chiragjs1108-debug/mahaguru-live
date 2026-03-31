import { createClient } from '@supabase/supabase-js';
import StatesGridClient from './StatesGridClient';

// Ensure your environment variables are correctly named in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const metadata = {
  title: 'State-Wise AYUSH Colleges & Seat Matrix (2026)',
  description: 'Complete directory of BAMS, BHMS, and BUMS colleges across India.',
};

export default async function AllCollegesPage() {
  // Fetch all states from your database
  const { data: allStates, error } = await supabase
    .from('states_hub') // Change this if your table is named 'states' or 'ayush_states'
    .select('*')
    .order('state_name', { ascending: true });

  if (error) {
    console.error('Supabase Error:', error);
  }

  // Deduplicate to ensure clean data
  const uniqueStates = allStates?.filter((v, i, a) => a.findIndex(t => (t.state_name === v.state_name)) === i) || [];

  return <StatesGridClient allStates={uniqueStates} />;
}