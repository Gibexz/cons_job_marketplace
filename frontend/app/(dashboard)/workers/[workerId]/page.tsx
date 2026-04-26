'use client';

import { useEffect, useState }  from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link                      from 'next/link';
import { apiFetch }              from '@/lib/api';

// ── TYPES ──────────────────────────────────────────────────────
type ExperienceLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'PROFESSIONAL'
  | 'EXPERT';

type ApplicationStatus =
  | 'INVITED'
  | 'APPLIED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED';

interface Company {
  id:     string;
  name:   string;
  logo?:  string;
  rating: number;
}

interface JobApplication {
  id:        string;
  status:    ApplicationStatus;
  createdAt: string;
  job: {
    id:          string;
    title:       string;
    description: string;
    skills:      string[];
    createdAt:   string;
    company:     Company;
  };
}

interface WorkerProfile {
  id:           string;
  skills:       string[];
  experience:   ExperienceLevel;
  available:    boolean;
  bio:          string | null;
  lat:          number | null;
  lng:          number | null;
  createdAt:    string;
  updatedAt:    string;
  user: {
    id:           string;
    name:         string;
    email:        string;
    country?:     string;
    createdAt:    string;
    profilePhoto?: string | null;
  };
  applications: JobApplication[];
}

interface CurrentUser {
  id: string;
}

// ── CONSTANTS ──────────────────────────────────────────────────
const EXPERIENCE_META: Record<
  ExperienceLevel,
  { label: string; color: string; bar: string; percent: number }
> = {
  BEGINNER:     { label: 'Beginner',     color: 'text-gray-600',   bar: 'bg-gray-400',   percent: 25  },
  INTERMEDIATE: { label: 'Intermediate', color: 'text-blue-700',   bar: 'bg-blue-500',   percent: 50  },
  PROFESSIONAL: { label: 'Professional', color: 'text-[#ff6600]',  bar: 'bg-[#ff6600]',  percent: 75  },
  EXPERT:       { label: 'Expert',       color: 'text-purple-700', bar: 'bg-purple-600', percent: 100 },
};

const APPLICATION_STATUS_STYLE: Record<ApplicationStatus, string> = {
  INVITED:   'bg-yellow-100 text-yellow-700',
  APPLIED:   'bg-orange-100 text-orange-700',
  ACCEPTED:  'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-600',
  COMPLETED: 'bg-blue-100 text-blue-700',
};

// ── HELPERS ────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0)  return 'Today';
  if (days === 1)  return 'Yesterday';
  if (days < 7)   return `${days}d ago`;
  if (days < 30)  return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function memberSince(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric',
  });
}

// ── SUB-COMPONENTS ─────────────────────────────────────────────
function Avatar({ worker, size = 'lg' }: { worker: WorkerProfile; size?: 'md' | 'lg' | 'xl' }) {
  const cls = {
    md:  'h-12 w-12 text-xl',
    lg:  'h-16 w-16 text-2xl',
    xl:  'h-24 w-24 text-4xl',
  }[size];

  return worker.user.profilePhoto ? (
    <img
      src={worker.user.profilePhoto}
      alt={worker.user.name}
      className={`${cls} shrink-0 rounded-full object-cover ring-4 ring-orange-100`}
    />
  ) : (
    <div
      className={`${cls} flex shrink-0 items-center justify-center rounded-full bg-[#ff6600] font-black text-white ring-4 ring-orange-100`}
    >
      {worker.user.name.charAt(0).toUpperCase()}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label:   string;
  value:   string | number;
  sub?:    string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center ${
        accent
          ? 'border-orange-200 bg-orange-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <p className={`text-2xl font-black ${accent ? 'text-[#ff6600]' : 'text-gray-900'}`}>
        {value}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-gray-500">{label}</p>
      {sub && <p className="mt-0.5 text-[10px] text-gray-400">{sub}</p>}
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title:    string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── PAGE ───────────────────────────────────────────────────────
export default function WorkerDetailPage() {
  const { workerId }                      = useParams<{ workerId: string }>();
  const router                            = useRouter();
  const [worker, setWorker]               = useState<WorkerProfile | null>(null);
  const [currentUser, setCurrentUser]     = useState<CurrentUser | null>(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [activeTab, setActiveTab]         = useState<'overview' | 'history' | 'about'>('overview');

  useEffect(() => {
    if (!workerId) return;

    const fetchAll = async () => {
      try {
        const [workerData, userData] = await Promise.allSettled([
          // API: GET /worker-profile/:id
          apiFetch(`/worker-profile/${workerId}`),
          // API: GET /users/me — to check if viewing own profile
          apiFetch('/users/me'),
        ]);

        if (workerData.status === 'fulfilled') {
          setWorker(workerData.value);
        } else {
          setError(workerData.reason?.message ?? 'Failed to load worker.');
        }

        if (userData.status === 'fulfilled') {
          setCurrentUser({ id: userData.value.id });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [workerId]);

  // ── Derived stats ─────────────────────────────────────────
  const isOwnProfile = !!(currentUser && worker && currentUser.id === worker.user.id);

  const completedJobs = worker?.applications.filter(
    (a) => a.status === 'COMPLETED',
  ).length ?? 0;

  const acceptedJobs = worker?.applications.filter(
    (a) => a.status === 'ACCEPTED' || a.status === 'COMPLETED',
  ).length ?? 0;

  const totalApplications = worker?.applications.length ?? 0;

  const successRate =
    totalApplications > 0
      ? Math.round((acceptedJobs / totalApplications) * 100)
      : 0;

  // Average company rating from completed jobs
  const completedWithRating = worker?.applications.filter(
    (a) => a.status === 'COMPLETED' && a.job.company.rating > 0,
  ) ?? [];

  const avgCompanyRating =
    completedWithRating.length > 0
      ? (
          completedWithRating.reduce((sum, a) => sum + a.job.company.rating, 0) /
          completedWithRating.length
        ).toFixed(1)
      : null;

  // Unique companies worked with
  const uniqueCompanies = new Set(
    worker?.applications
      .filter((a) => a.status === 'COMPLETED' || a.status === 'ACCEPTED')
      .map((a) => a.job.company.id),
  ).size;

  // Most used skills (from completed jobs)
  const skillFrequency = worker?.applications
    .filter((a) => a.status === 'COMPLETED')
    .flatMap((a) => a.job.skills)
    .reduce<Record<string, number>>((acc, skill) => {
      acc[skill] = (acc[skill] ?? 0) + 1;
      return acc;
    }, {}) ?? {};

  const topSkills = Object.entries(skillFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ff6600]" />
          <p className="text-sm text-gray-500">Loading worker profile...</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (error || !worker) {
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="flex w-fit items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#ff6600]"
        >
          ← Back
        </button>
        <div className="rounded-xl border-l-4 border-red-400 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-bold">Failed to load worker profile</p>
          <p className="mt-1">{error || 'Worker not found.'}</p>
          <button
            onClick={() => router.back()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const expMeta = EXPERIENCE_META[worker.experience];

  // ── Page ──────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">

      {/* ── BACK + BREADCRUMB ───────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/workers" className="hover:text-[#ff6600] transition-colors">
          Workers
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-700">{worker.user.name}</span>
      </div>

      {/* ── HERO CARD ───────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Orange top banner */}
        <div className="h-24 bg-gradient-to-r from-[#ff6600] via-orange-500 to-orange-400" />

        <div className="px-6 pb-6">
          {/* Avatar — overlaps banner */}
          <div className="relative -mt-12 mb-4 flex items-end justify-between">
            <Avatar worker={worker} size="xl" />

            {/* Action buttons */}
            <div className="flex items-center gap-2 pb-1">
              {isOwnProfile ? (
                <Link
                  href="/settings/worker-profile"
                  className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                >
                  Edit Profile
                </Link>
              ) : (
                <>
                  <button className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]">
                    Message
                  </button>
                  <button className="rounded-lg bg-[#ff6600] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
                    Send Invite
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name + meta */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                  {worker.user.name}
                </h1>
                {/* Own profile badge */}
                {isOwnProfile && (
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-[#ff6600]">
                    You
                  </span>
                )}
                {/* Availability */}
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    worker.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {worker.available ? '✓ Available' : 'Unavailable'}
                </span>
              </div>

              {/* Sub-line */}
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className={`font-bold ${expMeta.color}`}>
                  {expMeta.label}
                </span>
                {worker.skills[0] && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>{worker.skills[0]}</span>
                  </>
                )}
                {worker.user.country && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>📍 {worker.user.country}</span>
                  </>
                )}
                <span className="text-gray-300">·</span>
                <span>Member since {memberSince(worker.user.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {worker.bio && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              {worker.bio}
            </p>
          )}
        </div>
      </div>

      {/* ── STATS ROW ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Jobs Completed"
          value={completedJobs}
          sub="all time"
          accent
        />
        <StatCard
          label="Success Rate"
          value={`${successRate}%`}
          sub="accepted / applied"
        />
        <StatCard
          label="Companies Worked"
          value={uniqueCompanies}
          sub="unique employers"
        />
        <StatCard
          label="Avg. Employer Rating"
          value={avgCompanyRating ?? '—'}
          sub="from completed jobs"
        />
      </div>

      {/* ── TABS ────────────────────────────────────────────── */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
        {(
          [
            { key: 'overview', label: 'Overview'     },
            { key: 'history',  label: `Job History (${totalApplications})` },
            { key: 'about',    label: 'About'         },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-white text-[#ff6600] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════
          TAB: OVERVIEW
      ════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Left col */}
          <div className="flex flex-col gap-5 lg:col-span-2">

            {/* Skills */}
            <SectionCard title="Skills & Expertise">
              {worker.skills.length === 0 ? (
                <p className="text-xs text-gray-400">No skills listed.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#ff6600]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Top skills from completed jobs */}
              {topSkills.length > 0 && (
                <div className="mt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Most Used in Completed Jobs
                  </p>
                  <div className="flex flex-col gap-2">
                    {topSkills.map(([skill, count]) => (
                      <div key={skill} className="flex items-center gap-3">
                        <span className="w-28 truncate text-xs font-semibold text-gray-700">
                          {skill}
                        </span>
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-2">
                          <div
                            className="h-full rounded-full bg-[#ff6600] transition-all"
                            style={{
                              width: `${Math.min(
                                (count / (topSkills[0]?.[1] ?? 1)) * 100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="w-6 text-right text-xs text-gray-400">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Recent job history (top 3) */}
            <SectionCard title="Recent Jobs">
              {worker.applications.length === 0 ? (
                <p className="text-xs text-gray-400">No job history yet.</p>
              ) : (
                <div className="flex flex-col divide-y divide-gray-100">
                  {worker.applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      {/* Company logo */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-800 text-xs font-black text-white">
                        {app.job.company.logo ? (
                          <img
                            src={app.job.company.logo}
                            alt={app.job.company.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          app.job.company.name.charAt(0).toUpperCase()
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {app.job.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.job.company.name} · {timeAgo(app.createdAt)}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                          APPLICATION_STATUS_STYLE[app.status]
                        }`}
                      >
                        {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {worker.applications.length > 3 && (
                <button
                  onClick={() => setActiveTab('history')}
                  className="mt-3 text-xs font-bold text-[#ff6600] hover:underline"
                >
                  View all {worker.applications.length} jobs →
                </button>
              )}
            </SectionCard>

          </div>

          {/* Right col */}
          <div className="flex flex-col gap-5">

            {/* Experience level */}
            <SectionCard title="Experience Level">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-black ${expMeta.color}`}>
                    {expMeta.label}
                  </span>
                  <span className="text-xs text-gray-400">{expMeta.percent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${expMeta.bar}`}
                    style={{ width: `${expMeta.percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </SectionCard>

            {/* Application breakdown */}
            <SectionCard title="Application Breakdown">
              {totalApplications === 0 ? (
                <p className="text-xs text-gray-400">No applications yet.</p>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {(
                    [
                      { status: 'COMPLETED',  label: 'Completed'  },
                      { status: 'ACCEPTED',   label: 'Accepted'   },
                      { status: 'APPLIED',    label: 'Applied'    },
                      { status: 'INVITED',    label: 'Invited'    },
                      { status: 'REJECTED',   label: 'Rejected'   },
                    ] as { status: ApplicationStatus; label: string }[]
                  ).map(({ status, label }) => {
                    const count = worker.applications.filter(
                      (a) => a.status === status,
                    ).length;
                    if (count === 0) return null;
                    return (
                      <li key={status} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              APPLICATION_STATUS_STYLE[status].split(' ')[0]
                            }`}
                          />
                          <span className="text-xs text-gray-600">{label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{count}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </SectionCard>

            {/* Location */}
            {(worker.lat && worker.lng) && (
              <SectionCard title="Location">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">Location available</p>
                    <p className="text-xs text-gray-400">
                      {worker.lat.toFixed(4)}, {worker.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </SectionCard>
            )}

          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          TAB: JOB HISTORY
      ════════════════════════════════════════════════════════ */}
      {activeTab === 'history' && (
        <div className="flex flex-col gap-4">
          {worker.applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
              <svg className="mb-3 h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm font-semibold text-gray-500">No job history yet</p>
              <p className="mt-1 text-xs text-gray-400">Jobs will appear here once applied or invited.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Job', 'Company', 'Skills', 'Status', 'Date'].map((h) => (
                          <th
                            key={h}
                            className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {worker.applications.map((app) => (
                        <tr key={app.id} className="transition-colors hover:bg-orange-50/30">
                          {/* Job */}
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-900">{app.job.title}</p>
                            <p className="mt-0.5 max-w-[220px] truncate text-xs text-gray-400">
                              {app.job.description}
                            </p>
                          </td>

                          {/* Company */}
                          <td className="whitespace-nowrap px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-800 text-[10px] font-black text-white">
                                {app.job.company.logo ? (
                                  <img
                                    src={app.job.company.logo}
                                    alt={app.job.company.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  app.job.company.name.charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-700">
                                  {app.job.company.name}
                                </p>
                                {app.job.company.rating > 0 && (
                                  <p className="text-[10px] text-gray-400">
                                    ⭐ {app.job.company.rating.toFixed(1)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Skills */}
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {app.job.skills.length === 0 && (
                                <span className="italic text-gray-300">—</span>
                              )}
                              {app.job.skills.slice(0, 2).map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#ff6600]"
                                >
                                  {s}
                                </span>
                              ))}
                              {app.job.skills.length > 2 && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                                  +{app.job.skills.length - 2}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                APPLICATION_STATUS_STYLE[app.status]
                              }`}
                            >
                              {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">
                            {formatDate(app.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-xs text-gray-400">
                  {worker.applications.length} record{worker.applications.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Mobile cards */}
              <div className="flex flex-col gap-3 md:hidden">
                {worker.applications.map((app) => (
                  <div key={app.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-gray-900">{app.job.title}</p>
                        <p className="text-xs text-gray-500">{app.job.company.name}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                          APPLICATION_STATUS_STYLE[app.status]
                        }`}
                      >
                        {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                      </span>
                    </div>

                    {app.job.skills.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {app.job.skills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                      📅 {formatDate(app.createdAt)}
                      {app.job.company.rating > 0 && ` · ⭐ ${app.job.company.rating.toFixed(1)}`}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          TAB: ABOUT
      ════════════════════════════════════════════════════════ */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Personal info */}
          <SectionCard title="Personal Information">
            <dl className="flex flex-col gap-3 text-sm">
              {[
                { label: 'Full Name',   value: worker.user.name },
                { label: 'Country',     value: worker.user.country ?? '—' },
                { label: 'Member Since', value: memberSince(worker.user.createdAt) },
                { label: 'Profile Updated', value: formatDate(worker.updatedAt) },
                {
                  label: 'Location',
                  value:
                    worker.lat && worker.lng
                      ? `${worker.lat.toFixed(4)}, ${worker.lng.toFixed(4)}`
                      : '—',
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                  <dt className="shrink-0 text-gray-500">{label}</dt>
                  <dd className="text-right font-semibold text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          {/* Bio */}
          <SectionCard title="Bio">
            {worker.bio ? (
              <p className="text-sm leading-relaxed text-gray-600">{worker.bio}</p>
            ) : (
              <p className="text-xs text-gray-400">No bio provided.</p>
            )}
          </SectionCard>

          {/* All skills */}
          <SectionCard title="All Skills">
            {worker.skills.length === 0 ? (
              <p className="text-xs text-gray-400">No skills listed.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#ff6600]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Experience */}
          <SectionCard title="Experience Level">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-black ${
                    expMeta.bar
                  } text-white`}
                >
                  {worker.experience.charAt(0)}
                </div>
                <div>
                  <p className={`text-lg font-black ${expMeta.color}`}>
                    {expMeta.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {completedJobs} job{completedJobs !== 1 ? 's' : ''} completed
                  </p>
                </div>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${expMeta.bar}`}
                  style={{ width: `${expMeta.percent}%` }}
                />
              </div>
            </div>
          </SectionCard>

        </div>
      )}

    </div>
  );
}