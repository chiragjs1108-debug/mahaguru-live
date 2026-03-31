import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import CollegeDirectoryClient from './CollegeDirectoryClient';
import type { College, StateHub } from './CollegeDirectoryClient';

// ── Supabase client factory (per-request, safe for Server Components) ──────
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ── Helper: slug → readable title case ────────────────────────────────────
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const supabase = getSupabase();

  const { data } = await supabase
    .from('states_hub')
    .select('state_name, seo_title, seo_description')
    .eq('slug', stateSlug)
    .single();

  const stateName = data?.state_name ?? slugToTitle(stateSlug);

  return {
    title:
      data?.seo_title ??
      `${stateName} AYUSH Colleges & Fee Structure 2026 | Cutoffs.info`,
    description:
      data?.seo_description ??
      `Complete directory of BAMS, BHMS, and BUMS colleges in ${stateName}. ` +
      `View seat matrices, counseling authority, and exact tuition fees for the 2026 admissions cycle.`,
    alternates: {
      canonical: `/colleges/${stateSlug}`,
    },
  };
}

// ── Page (Server Component) ───────────────────────────────────────────────
export default async function StateCollegesDirectory({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const supabase = getSupabase();

  // ── Fetch 1: Validate state exists ──────────────────────────────────────
  const { data: stateData, error: stateError } = await supabase
    .from('states_hub')
    .select(
      'slug, state_name, counseling_authority, counselling_page_slug, ' +
      'total_colleges, govt_colleges, semi_govt_colleges, private_colleges'
    )
    .eq('slug', stateSlug)
    .single<StateHub>();

  if (stateError || !stateData) {
    notFound();
  }

  // ── Fetch 2: All colleges for this state ────────────────────────────────
  const { data: colleges, error: collegesError } = await supabase
    .from('colleges_directory')
    .select(
      'id, ayush_college_id, name, slug, state_slug, district, ' +
      'ownership_type, courses_offered, ug_seats, pg_seats, ' +
      'pg_total_branches, established_year, tuition_fees, is_page_live'
    )
    .eq('state_slug', stateSlug)
    .order('name', { ascending: true });

  if (collegesError) {
    // Propagate so Next.js error boundary catches it — never silently fail
    throw new Error(
      `Failed to fetch colleges for "${stateSlug}": ${collegesError.message}`
    );
  }

  // ── Fetch 3: All other states for the footer grid ───────────────────────
  const { data: allStates } = await supabase
    .from('states_hub')
    .select(
      'slug, state_name, total_colleges, govt_colleges, semi_govt_colleges, private_colleges'
    )
    .neq('slug', stateSlug)
    .eq('is_published', true)
    .order('state_name', { ascending: true });

  return (
    <CollegeDirectoryClient
      colleges={(colleges as unknown as College[]) ?? []}
      stateData={stateData}
      allStates={(allStates as StateHub[]) ?? []}
    />
  );
}