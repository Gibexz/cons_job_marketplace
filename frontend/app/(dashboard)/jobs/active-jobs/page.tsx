"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// ── TYPES ──────────────────────────────────────────────────────
type JobStatus = "ACTIVE" | "CLOSED" | "COMPLETED" | "CANCELLED" | "DRAFT";

interface JobCompany {
  id:    string;
  name:  string;
  logo?: string;
}

interface Job {
  id:          string;
  title:       string;
  description: string;
  company?:    JobCompany;
  companyId?:  string;
  lat?:        number;
  lng?:        number;
  skills:      string[];
  active:      boolean;
  status:      JobStatus;
  createdAt:   string;
}

// ── TAB CONFIG ─────────────────────────────────────────────────
const TABS: {
  key:   JobStatus | "ALL";
  label: string;
  color: string;
}[] = [
  { key: "ALL",       label: "All",       color: "bg-gray-800 text-white"   },
  { key: "ACTIVE",    label: "Active",    color: "bg-green-600 text-white"  },
  { key: "CLOSED",    label: "Closed",    color: "bg-orange-500 text-white" },
  { key: "COMPLETED", label: "Completed", color: "bg-blue-600 text-white"   },
  { key: "CANCELLED", label: "Cancelled", color: "bg-red-500 text-white"    },
  { key: "DRAFT",     label: "Draft",     color: "bg-gray-500 text-white"   },
];

// ── STATUS PILL ────────────────────────────────────────────────
const STATUS_STYLES: Record<JobStatus, string> = {
  ACTIVE:    "bg-green-100 text-green-700",
  CLOSED:    "bg-orange-100 text-orange-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  DRAFT:     "bg-gray-100 text-gray-500",
};

function StatusPill({ status }: { status: JobStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

// ── Helpers ────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return formatDate(iso);
}

function isNew(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 3 * 86_400_000;
}

// ── Company Avatar ─────────────────────────────────────────────
function CompanyAvatar({
  company,
  size = "sm",
}: {
  company: JobCompany;
  size?: "sm" | "md";
}) {
  const cls =
    size === "md"
      ? "h-7 w-7 rounded-lg text-[11px]"
      : "h-6 w-6 rounded-md text-[10px]";

  return (
    <div className={`${cls} flex shrink-0 items-center justify-center overflow-hidden bg-gray-900 font-black text-white`}>
      {company.logo ? (
        <img
          src={company.logo}
          alt={company.name}
          className="h-full w-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        company.name.charAt(0).toUpperCase()
      )}
    </div>
  );
}

// ── Skill Chip ─────────────────────────────────────────────────
function SkillChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#cc4e00]">
      {label}
    </span>
  );
}

function MoreChip({ count }: { count: number }) {
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
      +{count}
    </span>
  );
}

// ── Icons ──────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <rect x="3"  y="3"  width="7" height="7" rx="1" />
      <rect x="14" y="3"  width="7" height="7" rx="1" />
      <rect x="3"  y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
export default function ActiveJobsPage() {
  const [allJobs, setAllJobs]     = useState<Job[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [view, setView]           = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<JobStatus | "ALL">("ALL");

  // ── Fetch ALL jobs once — tabs filter client-side ───────────
  useEffect(() => {
    async function fetchJobs() {
      try {
        // API: GET /jobs/all — public, returns all jobs all statuses
        const data = await apiFetch("/jobs/all");
        setAllJobs(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // ── Tab counts — computed from fetched data ─────────────────
  const tabCounts = TABS.reduce<Record<string, number>>((acc, tab) => {
    acc[tab.key] =
      tab.key === "ALL"
        ? allJobs.length
        : allJobs.filter((j) => j.status === tab.key).length;
    return acc;
  }, {});

  // ── Tab filtered jobs ───────────────────────────────────────
  const tabJobs =
    activeTab === "ALL"
      ? allJobs
      : allJobs.filter((j) => j.status === activeTab);

  // ── Search filtered ─────────────────────────────────────────
  const filtered = tabJobs.filter((j) => {
    const q = search.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.company?.name.toLowerCase().includes(q) ||
      j.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5">

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
          Job Listings
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Browse all positions on the platform.
        </p>
      </div>

      {/* ── STATUS TABS ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count    = tabCounts[tab.key] ?? 0;

          // Hide tabs that have no jobs — except ALL
          if (count === 0 && tab.key !== "ALL") return null;

          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSearch(""); // reset search on tab change
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? tab.color
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── TOOLBAR ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[180px] flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, company or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-orange-100"
          />
        </div>

        {/* Result count */}
        {!loading && !error && (
          <span className="whitespace-nowrap text-xs font-medium text-gray-400">
            {filtered.length} of {tabJobs.length} job{tabJobs.length !== 1 ? "s" : ""}
          </span>
        )}

        {/* View toggle */}
        <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => setView("grid")}
            title="Grid view"
            className={`flex items-center px-3 py-2 transition-colors ${
              view === "grid"
                ? "bg-[#ff6600] text-white"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            }`}
          >
            <GridIcon active={view === "grid"} />
          </button>
          <button
            onClick={() => setView("list")}
            title="List view"
            className={`flex items-center border-l border-gray-200 px-3 py-2 transition-colors ${
              view === "list"
                ? "bg-[#ff6600] text-white"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            }`}
          >
            <ListIcon active={view === "list"} />
          </button>
        </div>
      </div>

      {/* ── LOADING ─────────────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-16 shadow-sm">
          <svg className="h-6 w-6 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-medium text-gray-400">Loading jobs…</p>
        </div>
      )}

      {/* ── ERROR ───────────────────────────────────────────── */}
      {!loading && error && (
        <div className="rounded-xl border-l-4 border-red-400 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-bold">Failed to load jobs</p>
          <p className="mt-0.5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── EMPTY ───────────────────────────────────────────── */}
      {!loading && !error && tabJobs.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <svg className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-sm font-semibold text-gray-500">
            No {activeTab === "ALL" ? "" : activeTab.toLowerCase()} jobs at the moment
          </p>
          <p className="text-xs text-gray-400">Check back soon for new openings.</p>
        </div>
      )}

      {/* ── NO SEARCH RESULTS ───────────────────────────────── */}
      {!loading && !error && tabJobs.length > 0 && filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400">
          No jobs matched &ldquo;
          <strong className="text-gray-600">{search}</strong>
          &rdquo;. Try a different search.
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          GRID VIEW
      ══════════════════════════════════════════════════════ */}
      {!loading && !error && filtered.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#ff6600] to-orange-300 transition-transform duration-200 group-hover:scale-x-100" />

              {/* Title + new dot + status pill */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-bold leading-snug text-gray-900">
                  {job.title}
                </h2>
                <div className="flex shrink-0 items-center gap-1.5">
                  {isNew(job.createdAt) && (
                    <span title="Posted recently" className="h-2 w-2 rounded-full bg-green-400" />
                  )}
                  <StatusPill status={job.status} />
                </div>
              </div>

              {/* Company */}
              {job.company?.name && (
                <div className="flex items-center gap-2">
                  <CompanyAvatar company={job.company} />
                  <span className="text-xs text-gray-500">{job.company.name}</span>
                </div>
              )}

              {/* Skills */}
              {job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 4).map((s) => (
                    <SkillChip key={s} label={s} />
                  ))}
                  {job.skills.length > 4 && (
                    <MoreChip count={job.skills.length - 4} />
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400">{timeAgo(job.createdAt)}</span>
                <Link
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-1 text-xs font-bold text-[#ff6600] transition-all hover:gap-1.5"
                >
                  View Job
                  <ChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          LIST VIEW
      ══════════════════════════════════════════════════════ */}
      {!loading && !error && filtered.length > 0 && view === "list" && (
        <>
          {/* ── Desktop table (md+) ── */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Job Title", "Company", "Skills", "Status", "Posted", ""].map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {filtered.map((job) => (
                    <tr key={job.id} className="transition-colors hover:bg-orange-50/40">

                      {/* Title */}
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{job.title}</span>
                          {isNew(job.createdAt) && (
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          )}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="whitespace-nowrap px-5 py-3.5">
                        {job.company?.name ? (
                          <div className="flex items-center gap-2">
                            <CompanyAvatar company={job.company} />
                            <span className="text-gray-600">{job.company.name}</span>
                          </div>
                        ) : (
                          <span className="italic text-gray-300">—</span>
                        )}
                      </td>

                      {/* Skills */}
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {job.skills.length === 0 && (
                            <span className="italic text-gray-300">—</span>
                          )}
                          {job.skills.slice(0, 3).map((s) => (
                            <SkillChip key={s} label={s} />
                          ))}
                          {job.skills.length > 3 && (
                            <MoreChip count={job.skills.length - 3} />
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <StatusPill status={job.status} />
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-400">
                        {timeAgo(job.createdAt)}
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="flex items-center gap-1 text-xs font-bold text-[#ff6600] transition-all hover:gap-1.5"
                        >
                          View
                          <ChevronRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-xs text-gray-400">
              Showing {filtered.length} job{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* ── Mobile cards (below md) ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Title + status */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-bold leading-snug text-gray-900">
                    {job.title}
                  </h2>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {isNew(job.createdAt) && (
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                    )}
                    <StatusPill status={job.status} />
                  </div>
                </div>

                {/* Company */}
                {job.company?.name && (
                  <div className="mt-2 flex items-center gap-2">
                    <CompanyAvatar company={job.company} size="md" />
                    <span className="text-xs text-gray-500">{job.company.name}</span>
                  </div>
                )}

                {/* Date */}
                <p className="mt-1 text-xs text-gray-400">{timeAgo(job.createdAt)}</p>

                {/* Skills */}
                {job.skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 4).map((s) => (
                      <SkillChip key={s} label={s} />
                    ))}
                    {job.skills.length > 4 && (
                      <MoreChip count={job.skills.length - 4} />
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-3 flex items-center justify-end border-t border-gray-100 pt-3">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                  >
                    View Details
                    <ChevronRight />
                  </Link>
                </div>
              </div>
            ))}

            <p className="text-center text-xs text-gray-400">
              {filtered.length} job{filtered.length !== 1 ? "s" : ""} listed
            </p>
          </div>
        </>
      )}
    </div>
  );
}