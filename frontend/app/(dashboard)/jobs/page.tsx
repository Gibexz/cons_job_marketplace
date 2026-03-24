// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiFetch } from "@/lib/api";

// // ── TYPES ─────────────────────────────────────────────────────
// interface JobCompany {
//   id: string;
//   name: string;
//   logo?: string;
// }

// interface Job {
//   id: string;
//   title: string;
//   description: string;
//   company?: JobCompany; // ✅ object, not string
//   companyId?: string;
//   lat?: number;
//   lng?: number;
//   skills: string[];
//   active: boolean;
//   createdAt: string;
// }

// function getStatus(job: Job): "Active" | "Inactive" {
//   return job.active ? "Active" : "Inactive";
// }

// const statusStyle: Record<string, string> = {
//   Active: "bg-green-100 text-green-700",
//   Inactive: "bg-gray-100 text-gray-500",
// };

// function formatDate(iso: string): string {
//   return new Date(iso).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// // ─────────────────────────────────────────────────────────────
// export default function JobsPage() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchMyJobs() {
//       try {
//         // API: GET /jobs/my — returns jobs for the logged-in user
//         const data = await apiFetch("/jobs/my");
//         setJobs(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load jobs.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchMyJobs();
//   }, []);

//   async function handleDelete(id: string) {
//     try {
//       // API: DELETE /jobs/:id
//       await apiFetch(`/jobs/${id}`, { method: "DELETE" });
//       setJobs((prev) => prev.filter((j) => j.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Failed to delete job.");
//     } finally {
//       setDeleteId(null);
//     }
//   }

//   // ── Shared delete control ────────────────────────────────────
//   function DeleteControl({ id }: { id: string }) {
//     if (deleteId === id) {
//       return (
//         <span className="flex items-center gap-2 text-xs">
//           <span className="text-gray-500">Sure?</span>
//           <button
//             onClick={() => handleDelete(id)}
//             className="font-bold text-red-600 hover:underline"
//           >
//             Yes
//           </button>
//           <button
//             onClick={() => setDeleteId(null)}
//             className="font-bold text-gray-500 hover:underline"
//           >
//             No
//           </button>
//         </span>
//       );
//     }
//     return (
//       <button
//         onClick={() => setDeleteId(id)}
//         className="text-xs font-semibold text-red-500 hover:underline"
//       >
//         Delete
//       </button>
//     );
//   }

//   // ─────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ── PAGE HEADER ───────────────────────────────────── */}
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Jobs</h1>
//           <p className="text-sm text-gray-500">
//             Manage and monitor all your posted jobs.
//           </p>
//         </div>

//         <Link
//           href="/jobs/create"
//           className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
//         >
//           <svg
//             className="h-4 w-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2.5}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//           Post New Job
//         </Link>
//       </div>

//       {/* ── LOADING STATE ─────────────────────────────────── */}
//       {loading && (
//         <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-16 shadow-sm">
//           <div className="flex flex-col items-center gap-3 text-gray-400">
//             <svg
//               className="h-6 w-6 animate-spin text-[#ff6600]"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//               />
//             </svg>
//             <p className="text-sm font-medium">Loading your jobs...</p>
//           </div>
//         </div>
//       )}

//       {/* ── ERROR STATE ───────────────────────────────────── */}
//       {!loading && error && (
//         <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
//           <p className="font-bold">Failed to load jobs</p>
//           <p className="mt-0.5">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline"
//           >
//             Try again
//           </button>
//         </div>
//       )}

//       {/* ── EMPTY STATE ───────────────────────────────────── */}
//       {!loading && !error && jobs.length === 0 && (
//         <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm">
//           <svg
//             className="h-12 w-12 text-gray-200"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={1.5}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//             />
//           </svg>
//           <div>
//             <p className="text-sm font-semibold text-gray-600">
//               No jobs posted yet
//             </p>
//             <p className="mt-1 text-xs text-gray-400">
//               Click <strong className="text-[#ff6600]">Post New Job</strong> to
//               create your first listing.
//             </p>
//           </div>
//           <Link
//             href="/jobs/create"
//             className="mt-2 rounded-lg bg-[#ff6600] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65c00]"
//           >
//             + Post New Job
//           </Link>
//         </div>
//       )}

//       {/* ── CONTENT ───────────────────────────────────────── */}
//       {!loading && !error && jobs.length > 0 && (
//         <>
//           {/* ════════════════════════════════════════════════
//               MOBILE VIEW — Card list (hidden on md+)
//           ════════════════════════════════════════════════ */}
//           <div className="flex flex-col gap-3 md:hidden">
//             {jobs.map((job) => {
//               const status = getStatus(job);
//               return (
//                 <div
//                   key={job.id}
//                   className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
//                 >
//                   {/* Card top row: title + status badge */}
//                   <div className="flex items-start justify-between gap-2">
//                     <h2 className="text-sm font-bold text-gray-900 leading-snug">
//                       {job.title}
//                     </h2>
//                     <span
//                       className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[status]}`}
//                     >
//                       {status}
//                     </span>
//                   </div>

//                   {/* ✅ FIXED: company is now an object — render .name */}
//                   {job.company?.name && (
//                     <div className="mt-2 flex items-center gap-2">
//                       {/* Company logo / initials */}
//                       <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800 text-[9px] font-black text-white">
//                         {job.company.logo ? (
//                           <img
//                             src={job.company.logo}
//                             alt={job.company.name}
//                             className="h-full w-full object-cover"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).style.display =
//                                 "none";
//                             }}
//                           />
//                         ) : (
//                           job.company.name.charAt(0).toUpperCase()
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         {job.company.name}
//                       </p>
//                     </div>
//                   )}

//                   {/* Date */}
//                   <p className="mt-1 text-xs text-gray-400">
//                     📅 Posted {formatDate(job.createdAt)}
//                   </p>

//                   {/* Skills */}
//                   {job.skills.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-1.5">
//                       {job.skills.slice(0, 4).map((skill) => (
//                         <span
//                           key={skill}
//                           className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                       {job.skills.length > 4 && (
//                         <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
//                           +{job.skills.length - 4}
//                         </span>
//                       )}
//                     </div>
//                   )}

//                   {/* Card actions */}
//                   <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
//                     <Link
//                       href={`/jobs/${job.id}`}
//                       className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
//                     >
//                       View Details →
//                     </Link>
//                     <DeleteControl id={job.id} />
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Mobile footer count */}
//             <p className="text-center text-xs text-gray-400">
//               {jobs.length} job{jobs.length !== 1 ? "s" : ""} listed
//             </p>
//           </div>

//           {/* ════════════════════════════════════════════════
//               DESKTOP VIEW — Table (hidden below md)
//           ════════════════════════════════════════════════ */}
//           <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {[
//                       "Job Title",
//                       "Company",
//                       "Skills",
//                       "Status",
//                       "Date Posted",
//                       "Actions",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100 bg-white">
//                   {jobs.map((job) => {
//                     const status = getStatus(job);
//                     return (
//                       <tr
//                         key={job.id}
//                         className="transition-colors hover:bg-gray-50"
//                       >
//                         {/* Title */}
//                         <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
//                           {job.title}
//                         </td>

//                         {/* ✅ FIXED: render company.name + optional logo */}
//                         <td className="whitespace-nowrap px-4 py-3">
//                           {job.company?.name ? (
//                             <div className="flex items-center gap-2">
//                               {/* Logo / Initials */}
//                               <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800 text-[10px] font-black text-white">
//                                 {job.company.logo ? (
//                                   <img
//                                     src={job.company.logo}
//                                     alt={job.company.name}
//                                     className="h-full w-full object-cover"
//                                     onError={(e) => {
//                                       (
//                                         e.target as HTMLImageElement
//                                       ).style.display = "none";
//                                     }}
//                                   />
//                                 ) : (
//                                   job.company.name.charAt(0).toUpperCase()
//                                 )}
//                               </div>
//                               <span className="text-gray-700">
//                                 {job.company.name}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="italic text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Skills */}
//                         <td className="px-4 py-3">
//                           <div className="flex flex-wrap gap-1">
//                             {job.skills.length === 0 && (
//                               <span className="italic text-gray-300">—</span>
//                             )}
//                             {job.skills.slice(0, 3).map((skill) => (
//                               <span
//                                 key={skill}
//                                 className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#ff6600]"
//                               >
//                                 {skill}
//                               </span>
//                             ))}
//                             {job.skills.length > 3 && (
//                               <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
//                                 +{job.skills.length - 3}
//                               </span>
//                             )}
//                           </div>
//                         </td>

//                         {/* Status */}
//                         <td className="whitespace-nowrap px-4 py-3">
//                           <span
//                             className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[status]}`}
//                           >
//                             {status}
//                           </span>
//                         </td>

//                         {/* Date */}
//                         <td className="whitespace-nowrap px-4 py-3 text-gray-500">
//                           {formatDate(job.createdAt)}
//                         </td>

//                         {/* Actions */}
//                         <td className="whitespace-nowrap px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <Link
//                               href={`/jobs/${job.id}`}
//                               className="text-xs font-semibold text-blue-600 hover:underline"
//                             >
//                               View
//                             </Link>
//                             <DeleteControl id={job.id} />
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Table footer */}
//             <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-400">
//               Showing {jobs.length} job{jobs.length !== 1 ? "s" : ""}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }


'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

// ── TYPES ──────────────────────────────────────────────────────
type JobStatus = 'ACTIVE' | 'CLOSED' | 'COMPLETED' | 'CANCELLED' | 'DRAFT';

interface JobCompany {
  id:    string;
  name:  string;
  logo?: string;
}

interface JobApplication {
  id:     string;
  status: string;
}

interface Job {
  id:           string;
  title:        string;
  description:  string;
  company?:     JobCompany;
  companyId?:   string;
  lat?:         number;
  lng?:         number;
  skills:       string[];
  active:       boolean;
  status:       JobStatus;
  createdAt:    string;
  applications: JobApplication[];
}

interface StatusCounts {
  all:       number;
  active:    number;
  closed:    number;
  completed: number;
  cancelled: number;
  draft:     number;
}

// ── TAB CONFIG ─────────────────────────────────────────────────
const TABS: {
  key:    JobStatus | 'ALL';
  label:  string;
  color:  string;
  badge:  string;
}[] = [
  {
    key:   'ALL',
    label: 'All Jobs',
    color: 'bg-gray-800 text-white',
    badge: 'bg-white/20',
  },
  {
    key:   'ACTIVE',
    label: 'Active',
    color: 'bg-green-600 text-white',
    badge: 'bg-white/20',
  },
  {
    key:   'DRAFT',
    label: 'Draft',
    color: 'bg-gray-500 text-white',
    badge: 'bg-white/20',
  },
  {
    key:   'CLOSED',
    label: 'Closed',
    color: 'bg-orange-500 text-white',
    badge: 'bg-white/20',
  },
  {
    key:   'COMPLETED',
    label: 'Completed',
    color: 'bg-blue-600 text-white',
    badge: 'bg-white/20',
  },
  {
    key:   'CANCELLED',
    label: 'Cancelled',
    color: 'bg-red-500 text-white',
    badge: 'bg-white/20',
  },
];

// ── STATUS PILL ────────────────────────────────────────────────
const STATUS_STYLES: Record<JobStatus, string> = {
  ACTIVE:    'bg-green-100 text-green-700',
  CLOSED:    'bg-orange-100 text-orange-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
  DRAFT:     'bg-gray-100 text-gray-500',
};

function StatusPill({ status }: { status: JobStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// ── STATUS CHANGE DROPDOWN ─────────────────────────────────────
const STATUS_OPTIONS: JobStatus[] = ['ACTIVE', 'DRAFT', 'CLOSED', 'COMPLETED', 'CANCELLED'];

function StatusDropdown({
  jobId,
  current,
  onChange,
}: {
  jobId:    string;
  current:  JobStatus;
  onChange: (id: string, status: JobStatus) => void;
}) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(jobId, e.target.value as JobStatus)}
      className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0) + s.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────────────────────
export default function JobsPage() {
  const [jobs, setJobs]           = useState<Job[]>([]);
  const [counts, setCounts]       = useState<StatusCounts | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [activeTab, setActiveTab] = useState<JobStatus | 'ALL'>('ALL');
  const [deleteId, setDeleteId]   = useState<string | null>(null);
  const [updating, setUpdating]   = useState<string | null>(null);

  // ── Fetch counts (for tab badges) ────────────────────────
  const fetchCounts = useCallback(async () => {
    try {
      // API: GET /jobs/my/counts
      const data = await apiFetch('/jobs/my/counts');
      setCounts(data);
    } catch {
      // non-critical — tabs still work without counts
    }
  }, []);

  // ── Fetch jobs filtered by tab ────────────────────────────
  const fetchJobs = useCallback(async (tab: JobStatus | 'ALL') => {
    setLoading(true);
    setError('');
    try {
      // API: GET /jobs/my?status=ACTIVE etc.
      const url = tab === 'ALL' ? '/jobs/my' : `/jobs/my?status=${tab}`;
      const data = await apiFetch(url);
      setJobs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    fetchJobs('ALL');
  }, [fetchCounts, fetchJobs]);

  // ── Tab switch ────────────────────────────────────────────
  const handleTabChange = (tab: JobStatus | 'ALL') => {
    setActiveTab(tab);
    fetchJobs(tab);
  };

  // ── Inline status update ──────────────────────────────────
  const handleStatusChange = async (jobId: string, status: JobStatus) => {
    setUpdating(jobId);
    try {
      // API: PATCH /jobs/:id
      const updated: Job = await apiFetch(`/jobs/${jobId}`, {
        method: 'PATCH',
        body:   JSON.stringify({ status }),
      });

      setJobs((prev) =>
        prev.map((j) => (j.id === updated.id ? { ...j, status: updated.status } : j)),
      );
      // Refresh counts after status change
      fetchCounts();

      // If filtered tab — remove job if it no longer matches
      if (activeTab !== 'ALL' && updated.status !== activeTab) {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setUpdating(null);
    }
  };

  // ── Delete ────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      // API: DELETE /jobs/:id
      await apiFetch(`/jobs/${id}`, { method: 'DELETE' });
      setJobs((prev) => prev.filter((j) => j.id !== id));
      fetchCounts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete job.');
    } finally {
      setDeleteId(null);
    }
  };

  // ── Delete control ────────────────────────────────────────
  function DeleteControl({ id }: { id: string }) {
    if (deleteId === id) {
      return (
        <span className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Sure?</span>
          <button onClick={() => handleDelete(id)} className="font-bold text-red-600 hover:underline">Yes</button>
          <button onClick={() => setDeleteId(null)} className="font-bold text-gray-500 hover:underline">No</button>
        </span>
      );
    }
    return (
      <button
        onClick={() => setDeleteId(id)}
        className="text-xs font-semibold text-red-500 hover:underline"
      >
        Delete
      </button>
    );
  }

  // ── Count helper ──────────────────────────────────────────
  const getCount = (key: JobStatus | 'ALL'): number | null => {
    if (!counts) return null;
    if (key === 'ALL') return counts.all;
    return counts[key.toLowerCase() as keyof StatusCounts] as number;
  };

  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Jobs</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all your posted jobs.
          </p>
        </div>
        <Link
          href="/jobs/create"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Post New Job
        </Link>
      </div>

      {/* ── STATUS TABS ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const count    = getCount(tab.key);
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? tab.color
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {count !== null && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    isActive ? tab.badge : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── LOADING ─────────────────────────────────────── */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-16 shadow-sm">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg className="h-6 w-6 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm font-medium">Loading jobs...</p>
          </div>
        </div>
      )}

      {/* ── ERROR ───────────────────────────────────────── */}
      {!loading && error && (
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-bold">Failed to load jobs</p>
          <p className="mt-0.5">{error}</p>
          <button
            onClick={() => fetchJobs(activeTab)}
            className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── EMPTY ───────────────────────────────────────── */}
      {!loading && !error && jobs.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm">
          <svg className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-600">
              No {activeTab === 'ALL' ? '' : activeTab.toLowerCase()} jobs found
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {activeTab === 'ALL'
                ? 'Click Post New Job to create your first listing.'
                : `You have no ${activeTab.toLowerCase()} jobs at the moment.`}
            </p>
          </div>
          {activeTab === 'ALL' && (
            <Link
              href="/jobs/create"
              className="mt-2 rounded-lg bg-[#ff6600] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65c00]"
            >
              + Post New Job
            </Link>
          )}
        </div>
      )}

      {/* ── CONTENT ─────────────────────────────────────── */}
      {!loading && !error && jobs.length > 0 && (
        <>
          {/* ════════════════════════════════════
              MOBILE — Card list
          ════════════════════════════════════ */}
          <div className="flex flex-col gap-3 md:hidden">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`rounded-xl border bg-white p-4 shadow-sm transition-opacity ${
                  updating === job.id ? 'opacity-50' : 'border-gray-200'
                }`}
              >
                {/* Title + status */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-bold leading-snug text-gray-900">{job.title}</h2>
                  <StatusPill status={job.status} />
                </div>

                {/* Company */}
                {job.company?.name && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800 text-[9px] font-black text-white">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
                      ) : (
                        job.company.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{job.company.name}</p>
                  </div>
                )}

                {/* Applications count */}
                <p className="mt-1 text-xs text-gray-400">
                  {job.applications?.length ?? 0} application{job.applications?.length !== 1 ? 's' : ''}
                </p>

                {/* Date */}
                <p className="mt-0.5 text-xs text-gray-400">📅 {formatDate(job.createdAt)}</p>

                {/* Skills */}
                {job.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                        +{job.skills.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                  <StatusDropdown
                    jobId={job.id}
                    current={job.status}
                    onChange={handleStatusChange}
                  />
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                    >
                      View →
                    </Link>
                    <DeleteControl id={job.id} />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} listed
            </p>
          </div>

          {/* ════════════════════════════════════
              DESKTOP — Table
          ════════════════════════════════════ */}
          <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Job Title', 'Company', 'Applications', 'Skills', 'Status', 'Date Posted', 'Actions'].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className={`transition-colors hover:bg-gray-50 ${
                        updating === job.id ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Title */}
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                        {job.title}
                      </td>

                      {/* Company */}
                      <td className="whitespace-nowrap px-4 py-3">
                        {job.company?.name ? (
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800 text-[10px] font-black text-white">
                              {job.company.logo ? (
                                <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
                              ) : (
                                job.company.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <span className="text-gray-700">{job.company.name}</span>
                          </div>
                        ) : (
                          <span className="italic text-gray-300">—</span>
                        )}
                      </td>

                      {/* Applications */}
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        <span className="font-semibold">{job.applications?.length ?? 0}</span>
                      </td>

                      {/* Skills */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {job.skills.length === 0 && (
                            <span className="italic text-gray-300">—</span>
                          )}
                          {job.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#ff6600]">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status — inline dropdown */}
                      <td className="whitespace-nowrap px-4 py-3">
                        <StatusDropdown
                          jobId={job.id}
                          current={job.status}
                          onChange={handleStatusChange}
                        />
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                        {formatDate(job.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            View
                          </Link>
                          <DeleteControl id={job.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-400">
              Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            </div>
          </div>
        </>
      )}
    </>
  );
}