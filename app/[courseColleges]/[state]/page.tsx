// app/[courseColleges]/[state]/page.tsx
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  WHY THIS FOLDER NAME?                                          │
// │  Next.js App Router only supports ONE dynamic token per         │
// │  segment. "[course]-colleges" mixes a token + literal, so      │
// │  `course` is NEVER injected into params — causing the error.   │
// │                                                                 │
// │  Solution: name the folder [courseColleges] (one clean token). │
// │  The URL still renders as /bams-colleges/karnataka because     │
// │  generateStaticParams supplies the full string "bams-colleges" │
// │  as the value of courseColleges. We then split on "-colleges"  │
// │  to recover the course code ("bams").                          │
// │                                                                 │
// │  Physical folder:  app/[courseColleges]/[state]/page.tsx       │
// │  Live URL:         /bams-colleges/karnataka          ✅        │
// └─────────────────────────────────────────────────────────────────┘
//
// cutoffs.info — Programmatic SEO State Hub
// Architecture: Static Server Component | generateStaticParams + generateMetadata

import Link from "next/link";
import { Metadata } from "next";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type CollegeType = "Govt" | "Private" | "Deemed";

interface College {
  name: string;
  slug: string;
  district: string;
  ownership: CollegeType;
  ug_seats: number;
  annual_fee: number; // in INR
}

// params now receives `courseColleges` (e.g. "bams-colleges") + `state`
interface PageProps {
  params: Promise<{ courseColleges: string; state: string }>;
}

// ─────────────────────────────────────────────
// HELPER — extract course code from segment
// "bams-colleges" → "bams"
// ─────────────────────────────────────────────
function parseCourse(courseColleges: string): string {
  return courseColleges.replace(/-colleges$/, "");
}

// ─────────────────────────────────────────────
// MOCK DATA  (replace with Supabase fetch later)
// ─────────────────────────────────────────────

const MOCK_COLLEGES: Record<string, College[]> = {
  karnataka: [
    {
      name: "SDM College of Ayurveda & Hospital",
      slug: "sdm-college-of-ayurveda-hassan",
      district: "Hassan",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 85000,
    },
    {
      name: "Government Ayurvedic Medical College",
      slug: "government-ayurvedic-medical-college-bangalore",
      district: "Bangalore Urban",
      ownership: "Govt",
      ug_seats: 50,
      annual_fee: 12000,
    },
    {
      name: "KLEU Shri BMK Ayurveda Mahavidyalaya",
      slug: "kleu-shri-bmk-ayurveda-mahavidyalaya-belagavi",
      district: "Belagavi",
      ownership: "Deemed",
      ug_seats: 60,
      annual_fee: 120000,
    },
    {
      name: "Rajiv Gandhi Education Society's Ayurvedic Medical College",
      slug: "rges-ayurvedic-medical-college-ron",
      district: "Gadag",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 78000,
    },
    {
      name: "DGM Ayurvedic Medical College & Hospital",
      slug: "dgm-ayurvedic-medical-college-gadag",
      district: "Gadag",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 72000,
    },
  ],
  maharashtra: [
    {
      name: "Government Ayurved College Nagpur",
      slug: "government-ayurved-college-nagpur",
      district: "Nagpur",
      ownership: "Govt",
      ug_seats: 60,
      annual_fee: 10000,
    },
    {
      name: "Ayurved Mahavidyalaya Sion",
      slug: "ayurved-mahavidyalaya-sion-mumbai",
      district: "Mumbai",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 95000,
    },
    {
      name: "Tilak Ayurved Mahavidyalaya",
      slug: "tilak-ayurved-mahavidyalaya-pune",
      district: "Pune",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 88000,
    },
    {
      name: "Shri Ayurved Mahavidyalaya Nagpur",
      slug: "shri-ayurved-mahavidyalaya-nagpur",
      district: "Nagpur",
      ownership: "Private",
      ug_seats: 60,
      annual_fee: 80000,
    },
  ],
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatFee(fee: number): string {
  if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L / yr`;
  return `₹${(fee / 1000).toFixed(0)}K / yr`;
}

function getColleges(state: string): College[] {
  // In production: replace with Supabase query
  // const { data } = await supabase.from("colleges").select("*").eq("state_slug", state);
  return MOCK_COLLEGES[state] ?? [];
}

// ─────────────────────────────────────────────
// STATIC PARAMS  (build-time pre-rendering)
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  // In production: query Supabase for all distinct (course, state) combos and
  // return them as: { courseColleges: `${row.course_slug}-colleges`, state: row.state_slug }
  return [
    { courseColleges: "bams-colleges", state: "karnataka" },
    { courseColleges: "bams-colleges", state: "maharashtra" },
  ];
}

// ─────────────────────────────────────────────
// DYNAMIC METADATA
// ─────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseColleges, state } = await params;
  const course = parseCourse(courseColleges);
  const stateName = toTitleCase(state);
  const courseUpper = course.toUpperCase();

  return {
    title: `${stateName} ${courseUpper} Colleges Directory 2026 | Seat Matrix & Fees | cutoffs.info`,
    description: `Explore all ${courseUpper} colleges in ${stateName} for 2026 admissions. Compare NEET cutoff ranks, fee structures, seat matrix, and government vs private institutes. Updated for the 2026 counselling cycle.`,
    alternates: {
      canonical: `https://cutoffs.info/${courseColleges}/${state}`,
    },
    openGraph: {
      title: `${stateName} ${courseUpper} Colleges 2026 — Seat Matrix & Fees`,
      description: `Full directory of ${courseUpper} colleges in ${stateName} with seat counts, annual fees, and NEET cutoff data.`,
      url: `https://cutoffs.info/${courseColleges}/${state}`,
      siteName: "cutoffs.info",
      type: "website",
    },
  };
}

// ─────────────────────────────────────────────
// JSON-LD  (FAQPage + BreadcrumbList)
// ─────────────────────────────────────────────

function StateHubJsonLd({
  courseColleges,
  course,
  state,
  stateName,
  colleges,
}: {
  courseColleges: string;
  course: string;
  state: string;
  stateName: string;
  colleges: College[];
}) {
  const courseUpper = course.toUpperCase();
  const govtCount = colleges.filter((c) => c.ownership === "Govt").length;
  const totalSeats = colleges.reduce((acc, c) => acc + c.ug_seats, 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many ${courseUpper} colleges are there in ${stateName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${colleges.length} ${courseUpper} colleges listed for ${stateName} in the 2026 admission cycle, offering a combined ${totalSeats} UG seats.`,
        },
      },
      {
        "@type": "Question",
        name: `How many government ${courseUpper} colleges are in ${stateName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${stateName} has ${govtCount} government ${courseUpper} college(s) that offer significantly lower fees compared to private institutes.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the NEET cutoff for ${courseUpper} admission in ${stateName} 2026?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `NEET cutoff ranks for ${courseUpper} colleges in ${stateName} vary by institute type and category. Visit individual college pages on cutoffs.info for the latest closing ranks.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cutoffs.info" },
      {
        "@type": "ListItem",
        position: 2,
        name: `${courseUpper} Colleges`,
        item: `https://cutoffs.info/${courseColleges}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${stateName}`,
        item: `https://cutoffs.info/${courseColleges}/${state}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function OwnershipPill({ type }: { type: CollegeType }) {
  if (type === "Govt") {
    return (
      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
        Govt
      </span>
    );
  }
  if (type === "Deemed") {
    return (
      <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
        Deemed
      </span>
    );
  }
  return (
    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
      Private
    </span>
  );
}

function CollegeCard({
  college,
  course,
  state,
}: {
  college: College;
  course: string;
  state: string;
}) {
  return (
    <Link
      href={`/${course}-colleges/${state}/${college.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Card Header */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors duration-200 line-clamp-2">
            {college.name}
          </h2>
          <OwnershipPill type={college.ownership} />
        </div>
        <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
          {/* Location pin icon (inline SVG — no external dep) */}
          <svg
            className="w-3 h-3 text-slate-400 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {college.district}
        </p>
      </div>

      {/* Card Stats */}
      <div className="p-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
            UG Seats
          </p>
          <p className="tabular-nums font-bold text-gray-900 text-lg leading-none">
            {college.ug_seats}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
            Annual Fee
          </p>
          <p className="tabular-nums font-bold text-gray-900 text-lg leading-none">
            {formatFee(college.annual_fee)}
          </p>
        </div>
      </div>

      {/* Card CTA */}
      <div className="px-5 pb-5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 group-hover:gap-2 transition-all duration-200">
          View Cutoffs & Profile
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function Breadcrumbs({
  courseColleges,
  course,
  state,
  stateName,
}: {
  courseColleges: string;
  course: string;
  state: string;
  stateName: string;
}) {
  const courseUpper = course.toUpperCase();
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
      <Link href="/" className="hover:text-cyan-500 transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link
        href={`/${courseColleges}`}
        className="hover:text-cyan-500 transition-colors"
      >
        {courseUpper} Colleges
      </Link>
      <span>/</span>
      <span className="text-slate-300 font-medium">{stateName}</span>
    </nav>
  );
}

// ─────────────────────────────────────────────
// PAGE (Server Component)
// ─────────────────────────────────────────────

export default async function StateCollegesHub({ params }: PageProps) {
  const { courseColleges, state } = await params;
  const course = parseCourse(courseColleges);
  const stateName = toTitleCase(state);
  const courseUpper = course.toUpperCase();
  const colleges = getColleges(state);

  const govtCount = colleges.filter((c) => c.ownership === "Govt").length;
  const privateCount = colleges.filter((c) => c.ownership !== "Govt").length;
  const totalSeats = colleges.reduce((acc, c) => acc + c.ug_seats, 0);

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <StateHubJsonLd
        courseColleges={courseColleges}
        course={course}
        state={state}
        stateName={stateName}
        colleges={colleges}
      />

      <main className="min-h-screen bg-slate-50">
        {/* ── HERO SECTION ── */}
        <section className="bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
            <Breadcrumbs courseColleges={courseColleges} course={course} state={state} stateName={stateName} />

            <div className="mt-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {courseUpper} Colleges in{" "}
                <span className="text-cyan-400">{stateName}</span>
              </h1>
              <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
                Complete directory of {courseUpper} institutes in {stateName} for the 2026
                admission cycle. Compare NEET cutoffs, seat matrix, and fee structures — updated
                from official AYUSH counselling data.
              </p>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-3 max-w-lg">
              <div className="bg-slate-800 rounded-xl px-4 py-3">
                <p className="text-xs text-slate-400 font-medium">Total Colleges</p>
                <p className="tabular-nums font-bold text-white text-xl mt-0.5">
                  {colleges.length}
                </p>
              </div>
              <div className="bg-slate-800 rounded-xl px-4 py-3">
                <p className="text-xs text-slate-400 font-medium">Govt Institutes</p>
                <p className="tabular-nums font-bold text-emerald-400 text-xl mt-0.5">
                  {govtCount}
                </p>
              </div>
              <div className="bg-slate-800 rounded-xl px-4 py-3">
                <p className="text-xs text-slate-400 font-medium">Total UG Seats</p>
                <p className="tabular-nums font-bold text-cyan-400 text-xl mt-0.5">
                  {totalSeats}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filter / Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">{colleges.length}</span>{" "}
              colleges —{" "}
              <span className="text-emerald-600 font-medium">{govtCount} Govt</span>,{" "}
              <span className="text-blue-600 font-medium">{privateCount} Private/Deemed</span>
            </p>

            {/* Cutoffs CTA Strip */}
            <Link
              href={`/cutoffs/${course}/${state}`}
              className="inline-flex items-center gap-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View {stateName} Cutoffs Dashboard
            </Link>
          </div>

          {/* College Cards Grid */}
          {colleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {colleges.map((college) => (
                <CollegeCard
                  key={college.slug}
                  college={college}
                  course={course}
                  state={state}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-semibold">No colleges found for this state.</p>
              <p className="text-sm mt-1">Data will be available closer to the 2026 cycle.</p>
            </div>
          )}

          {/* ── FAQ SECTION (feeds FAQPage JSON-LD) ── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: `How many ${courseUpper} colleges are there in ${stateName}?`,
                  a: `There are ${colleges.length} ${courseUpper} colleges listed for ${stateName} in the 2026 admission cycle, offering a combined ${totalSeats} UG seats.`,
                },
                {
                  q: `How many government ${courseUpper} colleges are in ${stateName}?`,
                  a: `${stateName} has ${govtCount} government ${courseUpper} college(s) that offer significantly lower fees compared to private institutes.`,
                },
                {
                  q: `What is the NEET cutoff for ${courseUpper} admission in ${stateName} 2026?`,
                  a: `NEET cutoff ranks vary by institute and category. Visit individual college pages on cutoffs.info for the latest closing ranks from AACCC and state counselling authorities.`,
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 cursor-pointer"
                >
                  <summary className="font-semibold text-sm text-slate-700 list-none flex items-center justify-between gap-3">
                    {q}
                    <svg
                      className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Internal Upward Link (Hierarchy) */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <Link
              href={`/${courseColleges}`}
              className="inline-flex items-center gap-1.5 text-sm text-cyan-600 hover:text-cyan-500 font-medium transition-colors"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Back to All {courseUpper} Colleges by State
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}