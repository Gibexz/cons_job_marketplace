// // "use client";

// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import InviteWorkerModal from "./invite-modal";
// // import { apiFetch } from "@/lib/api";

// // // ── TYPES ─────────────────────────────────────────────────────
// // interface JobWorker {
// //   id: string;
// //   status: string;
// //   worker: {
// //     skills: string[];
// //     user: {
// //       name: string;
// //       email: string;
// //     };
// //   };
// // }

// // interface Job {
// //   id: string;
// //   title: string;
// //   description: string;
// //   skills: string[];
// //   active: boolean;
// //   createdAt: string;
// //   company?: {
// //     id: string;
// //     name: string;
// //     logo?: string;
// //     address?: string;
// //     rating?: number;
// //   };
// //   postedBy?: {
// //     name: string;
// //     email: string;
// //   };
// //   workers?: JobWorker[];
// // }

// // function formatDate(iso: string): string {
// //   return new Date(iso).toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // }

// // const workerStatusStyle: Record<string, string> = {
// //   INVITED: "bg-yellow-100 text-yellow-700",
// //   ACCEPTED: "bg-green-100 text-green-700",
// //   REJECTED: "bg-red-100 text-red-600",
// //   COMPLETED: "bg-blue-100 text-blue-700",
// // };

// // // ─────────────────────────────────────────────────────────────
// // export default function JobDetailPage() {
// //   const { jobId } = useParams();

// //   const [job, setJob] = useState<Job | null>(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (jobId) loadJob();
// //   }, [jobId]);

// //   async function loadJob() {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const data = await apiFetch(`/jobs/${jobId}`);
// //       setJob(data);
// //     } catch (err: any) {
// //       setError(err.message || "Failed to load job.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // ── LOADING ──────────────────────────────────────────────────
// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-24 shadow-sm">
// //         <div className="flex flex-col items-center gap-3 text-gray-400">
// //           <svg
// //             className="h-6 w-6 animate-spin text-[#ff6600]"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //           >
// //             <circle
// //               className="opacity-25"
// //               cx="12"
// //               cy="12"
// //               r="10"
// //               stroke="currentColor"
// //               strokeWidth="4"
// //             />
// //             <path
// //               className="opacity-75"
// //               fill="currentColor"
// //               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
// //             />
// //           </svg>
// //           <p className="text-sm font-medium">Loading job details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ── ERROR ────────────────────────────────────────────────────
// //   if (error) {
// //     return (
// //       <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
// //         <p className="font-bold">Failed to load job</p>
// //         <p className="mt-0.5">{error}</p>
// //         <button
// //           onClick={loadJob}
// //           className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline"
// //         >
// //           Try again
// //         </button>
// //       </div>
// //     );
// //   }

// //   // ── NOT FOUND ────────────────────────────────────────────────
// //   if (!job) {
// //     return (
// //       <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white py-24 text-center shadow-sm">
// //         <svg
// //           className="h-12 w-12 text-gray-200"
// //           fill="none"
// //           viewBox="0 0 24 24"
// //           stroke="currentColor"
// //           strokeWidth={1.5}
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //           />
// //         </svg>
// //         <p className="text-sm font-semibold text-gray-500">Job not found</p>
// //       </div>
// //     );
// //   }

// //   // ── PAGE ─────────────────────────────────────────────────────
// //   return (
// //     <>
// //       <div className="flex flex-col gap-5">
// //         {/* ── PAGE HEADER ───────────────────────────────────── */}
// //         <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
// //           <div className="flex flex-col gap-1.5">
// //             <div className="flex flex-wrap items-center gap-2">
// //               <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
// //                 {job.title}
// //               </h1>
// //               <span
// //                 className={`rounded-full px-2.5 py-1 text-xs font-bold ${
// //                   job.active
// //                     ? "bg-green-100 text-green-700"
// //                     : "bg-gray-100 text-gray-500"
// //                 }`}
// //               >
// //                 {job.active ? "Active" : "Inactive"}
// //               </span>
// //             </div>
// //             {job.createdAt && (
// //               <p className="text-xs text-gray-400">
// //                 📅 Posted {formatDate(job.createdAt)}
// //               </p>
// //             )}
// //           </div>

// //           {/* Invite Worker button */}
// //           <button
// //             onClick={() => setShowModal(true)}
// //             className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
// //           >
// //             <svg
// //               className="h-4 w-4"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //               strokeWidth={2.5}
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 d="M12 4v16m8-8H4"
// //               />
// //             </svg>
// //             Invite Worker
// //           </button>
// //         </div>

// //         {/* ── MAIN CONTENT GRID ─────────────────────────────── */}
// //         <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
// //           {/* ── Left column ─────────────────────────────────── */}
// //           <div className="flex flex-col gap-5 lg:col-span-2">
// //             {/* Description */}
// //             <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
// //               <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
// //                 Job Description
// //               </h2>
// //               <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
// //                 {job.description}
// //               </p>
// //             </div>

// //             {/* Skills */}
// //             {job.skills?.length > 0 && (
// //               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
// //                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
// //                   Required Skills
// //                 </h2>
// //                 <div className="flex flex-wrap gap-2">
// //                   {job.skills.map((skill) => (
// //                     <span
// //                       key={skill}
// //                       className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#ff6600]"
// //                     >
// //                       {skill}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Workers */}
// //             <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
// //               <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
// //                 <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
// //                   Assigned Workers
// //                 </h2>
// //                 <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
// //                   {job.workers?.length ?? 0}
// //                 </span>
// //               </div>

// //               {!job.workers || job.workers.length === 0 ? (
// //                 <div className="flex flex-col items-center gap-2 py-10 text-center">
// //                   <svg
// //                     className="h-8 w-8 text-gray-200"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     strokeWidth={1.5}
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
// //                     />
// //                   </svg>
// //                   <p className="text-xs text-gray-400">
// //                     No workers assigned yet
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <ul className="divide-y divide-gray-100">
// //                   {job.workers.map((jw) => (
// //                     <li
// //                       key={jw.id}
// //                       className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         {/* Avatar initials */}
// //                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-black text-white">
// //                           {jw.worker?.user?.name?.charAt(0).toUpperCase() ??
// //                             "?"}
// //                         </div>
// //                         <div>
// //                           <p className="text-sm font-semibold text-gray-900">
// //                             {jw.worker?.user?.name ?? "Unknown"}
// //                           </p>
// //                           {jw.worker?.skills?.length > 0 && (
// //                             <p className="mt-0.5 text-xs text-gray-400">
// //                               {jw.worker.skills.slice(0, 3).join(" · ")}
// //                               {jw.worker.skills.length > 3 &&
// //                                 ` +${jw.worker.skills.length - 3}`}
// //                             </p>
// //                           )}
// //                         </div>
// //                       </div>
// //                       <span
// //                         className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
// //                           workerStatusStyle[jw.status] ??
// //                           "bg-gray-100 text-gray-500"
// //                         }`}
// //                       >
// //                         {jw.status}
// //                       </span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </div>
// //           </div>

// //           {/* ── Right sidebar ──────────────────────────────── */}
// //           <div className="flex flex-col gap-4">
// //             {/* Company card */}
// //             {job.company && (
// //               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
// //                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
// //                   Company
// //                 </h2>
// //                 <div className="flex items-center gap-3">
// //                   <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-900 text-sm font-black text-white">
// //                     {job.company.logo ? (
// //                       <img
// //                         src={job.company.logo}
// //                         alt={job.company.name}
// //                         className="h-full w-full object-cover"
// //                         onError={(e) => {
// //                           (e.target as HTMLImageElement).style.display = "none";
// //                         }}
// //                       />
// //                     ) : (
// //                       job.company.name.charAt(0).toUpperCase()
// //                     )}
// //                   </div>
// //                   <div>
// //                     <p className="font-bold text-gray-900">
// //                       {job.company.name}
// //                     </p>
// //                     {job.company.rating != null && (
// //                       <p className="text-xs text-gray-400">
// //                         ⭐ {job.company.rating.toFixed(1)} rating
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //                 {job.company.address && (
// //                   <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
// //                     <svg
// //                       className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       strokeWidth={2}
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
// //                       />
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
// //                       />
// //                     </svg>
// //                     {job.company.address}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* Posted by */}
// //             {job.postedBy && (
// //               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
// //                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
// //                   Posted By
// //                 </h2>
// //                 <div className="flex items-center gap-3">
// //                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-black text-gray-600">
// //                     {job.postedBy.name?.charAt(0).toUpperCase() ?? "?"}
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-semibold text-gray-900">
// //                       {job.postedBy.name}
// //                     </p>
// //                     {job.postedBy.email && (
// //                       <p className="text-xs text-gray-400">
// //                         {job.postedBy.email}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Quick stats */}
// //             <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
// //               <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
// //                 Overview
// //               </h2>
// //               <dl className="flex flex-col gap-2.5 text-sm">
// //                 <div className="flex items-center justify-between">
// //                   <dt className="text-gray-500">Status</dt>
// //                   <dd>
// //                     <span
// //                       className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${job.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
// //                     >
// //                       {job.active ? "Active" : "Inactive"}
// //                     </span>
// //                   </dd>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <dt className="text-gray-500">Workers</dt>
// //                   <dd className="font-semibold text-gray-900">
// //                     {job.workers?.length ?? 0}
// //                   </dd>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <dt className="text-gray-500">Skills</dt>
// //                   <dd className="font-semibold text-gray-900">
// //                     {job.skills?.length ?? 0}
// //                   </dd>
// //                 </div>
// //                 {job.createdAt && (
// //                   <div className="flex items-center justify-between">
// //                     <dt className="text-gray-500">Posted</dt>
// //                     <dd className="font-semibold text-gray-900">
// //                       {formatDate(job.createdAt)}
// //                     </dd>
// //                   </div>
// //                 )}
// //               </dl>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── MODAL ───────────────────────────────────────────── */}
// //       {showModal && (
// //         <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
// //       )}
// //     </>
// //   );
// // }

// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { apiFetch } from '@/lib/api';
// import InviteWorkerModal    from './invite-modal';
// import ApplyModal           from './apply-modal';

// // ── TYPES ─────────────────────────────────────────────────────
// interface JobWorker {
//   id:     string;
//   status: string;
//   worker: {
//     skills: string[];
//     user: {
//       name:  string;
//       email: string;
//     };
//   };
// }

// interface Job {
//   id:          string;
//   title:       string;
//   description: string;
//   skills:      string[];
//   active:      boolean;
//   createdAt:   string;
//   // postedById is the owner field from your Prisma schema
//   postedById:  string;
//   company?: {
//     id:       string;
//     name:     string;
//     logo?:    string;
//     address?: string;
//     rating?:  number;
//   };
//   postedBy?: {
//     name:  string;
//     email: string;
//   };
//   workers?: JobWorker[];
// }

// interface CurrentUser {
//   id:    string;
//   name:  string;
//   email: string;
// }

// function formatDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-GB', {
//     day: '2-digit', month: 'short', year: 'numeric',
//   });
// }

// const workerStatusStyle: Record<string, string> = {
//   INVITED:   'bg-yellow-100 text-yellow-700',
//   ACCEPTED:  'bg-green-100 text-green-700',
//   REJECTED:  'bg-red-100 text-red-600',
//   COMPLETED: 'bg-blue-100 text-blue-700',
// };

// // ─────────────────────────────────────────────────────────────
// export default function JobDetailPage() {
//   const { jobId } = useParams();

//   const [job, setJob]               = useState<Job | null>(null);
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const [hasApplied, setHasApplied] = useState(false);
//   const [loading, setLoading]       = useState(true);
//   const [error, setError]           = useState('');

//   // Modal visibility
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [showApplyModal, setShowApplyModal]   = useState(false);

//   useEffect(() => {
//     if (jobId) loadAll();
//   }, [jobId]);

//   async function loadAll() {
//     setLoading(true);
//     setError('');
//     try {
//       // Run both requests in parallel
//       const [jobData, userData] = await Promise.all([
//         // API: GET /jobs/:id — job details including workers array
//         apiFetch(`/jobs/${jobId}`),
//         // API: GET /users/me — returns the logged-in user's profile
//         apiFetch('/users/me'),
//       ]);

//       setJob(jobData);
//       setCurrentUser(userData);

//       // Check if this user has already applied
//       // API: GET /applications/check/:jobId — returns { applied: boolean }
//       // Returns true if the current user has an existing application for this job
//       const applicationCheck = await apiFetch(`/applications/check/${jobId}`);
//       setHasApplied(applicationCheck.applied);

//     } catch (err: any) {
//       setError(err.message || 'Failed to load job.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ── Derived ownership check ────────────────────────────────
//   const isOwner = !!(currentUser && job && currentUser.id === job.postedById);

//   // ── LOADING ───────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-24 shadow-sm">
//         <div className="flex flex-col items-center gap-3 text-gray-400">
//           <svg className="h-6 w-6 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//           </svg>
//           <p className="text-sm font-medium">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   // ── ERROR ─────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
//         <p className="font-bold">Failed to load job</p>
//         <p className="mt-0.5">{error}</p>
//         <button onClick={loadAll} className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline">
//           Try again
//         </button>
//       </div>
//     );
//   }

//   // ── NOT FOUND ─────────────────────────────────────────────
//   if (!job) {
//     return (
//       <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white py-24 text-center shadow-sm">
//         <p className="text-sm font-semibold text-gray-500">Job not found</p>
//       </div>
//     );
//   }

//   // ── ACTION BUTTON — conditionally rendered ─────────────────
//   function ActionButton() {
//     // Owner sees Invite Worker
//     if (isOwner) {
//       return (
//         <button
//           onClick={() => setShowInviteModal(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Invite Worker
//         </button>
//       );
//     }

//     // Non-owner who has already applied — disabled state
//     if (hasApplied) {
//       return (
//         <button
//           disabled
//           className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-bold text-gray-400 sm:w-auto"
//           title="You have already applied for this job"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Already Applied
//         </button>
//       );
//     }

//     // Non-owner who hasn't applied — can apply
//     return (
//       <button
//         onClick={() => setShowApplyModal(true)}
//         className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a1a1a] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black sm:w-auto"
//       >
//         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//         Apply for Job
//       </button>
//     );
//   }

//   // ── PAGE ──────────────────────────────────────────────────
//   return (
//     <>
//       <div className="flex flex-col gap-5">

//         {/* ── PAGE HEADER ─────────────────────────────────── */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//           <div className="flex flex-col gap-1.5">
//             <div className="flex flex-wrap items-center gap-2">
//               <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
//                 {job.title}
//               </h1>
//               <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${job.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
//                 {job.active ? 'Active' : 'Inactive'}
//               </span>
//             </div>
//             {job.createdAt && (
//               <p className="text-xs text-gray-400">
//                 📅 Posted {formatDate(job.createdAt)}
//               </p>
//             )}
//           </div>

//           {/* Conditional action button */}
//           <ActionButton />
//         </div>

//         {/* ── MAIN CONTENT GRID ───────────────────────────── */}
//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

//           {/* ── Left column ─────────────────────────────── */}
//           <div className="flex flex-col gap-5 lg:col-span-2">

//             {/* Description */}
//             <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//               <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
//                 Job Description
//               </h2>
//               <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
//                 {job.description}
//               </p>
//             </div>

//             {/* Skills */}
//             {job.skills?.length > 0 && (
//               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
//                   Required Skills
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {job.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#ff6600]"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Workers — only visible to job owner */}
//             {isOwner && (
//               <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
//                 <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
//                   <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                     Assigned Workers
//                   </h2>
//                   <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
//                     {job.workers?.length ?? 0}
//                   </span>
//                 </div>

//                 {!job.workers || job.workers.length === 0 ? (
//                   <div className="flex flex-col items-center gap-2 py-10 text-center">
//                     <svg className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <p className="text-xs text-gray-400">No workers assigned yet</p>
//                   </div>
//                 ) : (
//                   <ul className="divide-y divide-gray-100">
//                     {job.workers.map((jw) => (
//                       <li key={jw.id} className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-black text-white">
//                             {jw.worker?.user?.name?.charAt(0).toUpperCase() ?? '?'}
//                           </div>
//                           <div>
//                             <p className="text-sm font-semibold text-gray-900">
//                               {jw.worker?.user?.name ?? 'Unknown'}
//                             </p>
//                             {jw.worker?.skills?.length > 0 && (
//                               <p className="mt-0.5 text-xs text-gray-400">
//                                 {jw.worker.skills.slice(0, 3).join(' · ')}
//                                 {jw.worker.skills.length > 3 && ` +${jw.worker.skills.length - 3}`}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${workerStatusStyle[jw.status] ?? 'bg-gray-100 text-gray-500'}`}>
//                           {jw.status}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ── Right sidebar ────────────────────────────── */}
//           <div className="flex flex-col gap-4">

//             {/* Company card */}
//             {job.company && (
//               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
//                   Company
//                 </h2>
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1a1a1a] text-sm font-black text-white">
//                     {job.company.logo ? (
//                       <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
//                     ) : (
//                       job.company.name.charAt(0).toUpperCase()
//                     )}
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900">{job.company.name}</p>
//                     {job.company.rating != null && (
//                       <p className="text-xs text-gray-400">⭐ {job.company.rating.toFixed(1)} rating</p>
//                     )}
//                   </div>
//                 </div>
//                 {job.company.address && (
//                   <p className="mt-3 text-xs text-gray-500">📍 {job.company.address}</p>
//                 )}
//               </div>
//             )}

//             {/* Posted by */}
//             {job.postedBy && (
//               <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//                 <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
//                   Posted By
//                 </h2>
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-black text-gray-600">
//                     {job.postedBy.name?.charAt(0).toUpperCase() ?? '?'}
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-900">{job.postedBy.name}</p>
//                     {job.postedBy.email && (
//                       <p className="text-xs text-gray-400">{job.postedBy.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Quick stats */}
//             <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//               <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
//                 Overview
//               </h2>
//               <dl className="flex flex-col gap-2.5 text-sm">
//                 <div className="flex items-center justify-between">
//                   <dt className="text-gray-500">Status</dt>
//                   <dd>
//                     <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${job.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
//                       {job.active ? 'Active' : 'Inactive'}
//                     </span>
//                   </dd>
//                 </div>
//                 {isOwner && (
//                   <div className="flex items-center justify-between">
//                     <dt className="text-gray-500">Workers</dt>
//                     <dd className="font-semibold text-gray-900">{job.workers?.length ?? 0}</dd>
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between">
//                   <dt className="text-gray-500">Skills Required</dt>
//                   <dd className="font-semibold text-gray-900">{job.skills?.length ?? 0}</dd>
//                 </div>
//                 {job.createdAt && (
//                   <div className="flex items-center justify-between">
//                     <dt className="text-gray-500">Posted</dt>
//                     <dd className="font-semibold text-gray-900">{formatDate(job.createdAt)}</dd>
//                   </div>
//                 )}
//               </dl>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── MODALS ─────────────────────────────────────────── */}
//       {showInviteModal && (
//         <InviteWorkerModal
//           job={job}
//           onClose={() => setShowInviteModal(false)}
//         />
//       )}
//       {showApplyModal && (
//         <ApplyModal
//           job={job}
//           onClose={() => setShowApplyModal(false)}
//           onApplied={() => {
//             setHasApplied(true);
//             setShowApplyModal(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

'use client';
import { useParams }         from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiFetch }          from '@/lib/api';
import InviteWorkerModal     from './invite-modal';
import ApplyModal            from './apply-modal';

// ── TYPES ─────────────────────────────────────────────────────
interface JobApplication {
  id:     string;
  status: string;
  worker: {
    skills: string[];
    user: {
      name:  string;
      email: string;
    };
  };
}

interface Job {
  id:          string;
  title:       string;
  description: string;
  skills:      string[];
  active:      boolean;
  createdAt:   string;
  postedById:  string;
  company?: {
    id:       string;
    name:     string;
    logo?:    string;
    address?: string;
    rating?:  number;
  };
  postedBy?: {
    name:  string;
    email: string;
  };
  // renamed from workers → applications
  applications?: JobApplication[];
}

interface CurrentUser {
  id:    string;
  name:  string;
  email: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

// Renamed from workerStatusStyle → applicationStatusStyle
const applicationStatusStyle: Record<string, string> = {
  INVITED:   'bg-yellow-100 text-yellow-700',
  APPLIED:   'bg-orange-100 text-orange-700',
  ACCEPTED:  'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-600',
  COMPLETED: 'bg-blue-100 text-blue-700',
};

// ─────────────────────────────────────────────────────────────
export default function JobDetailPage() {
  const { jobId } = useParams();

  const [job, setJob]                   = useState<Job | null>(null);
  const [currentUser, setCurrentUser]   = useState<CurrentUser | null>(null);
  const [hasApplied, setHasApplied]     = useState(false);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showApplyModal, setShowApplyModal]   = useState(false);

  useEffect(() => {
    if (jobId) loadAll();
  }, [jobId]);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [jobData, userData] = await Promise.all([
        // API: GET /jobs/:id
        apiFetch(`/jobs/${jobId}`),
        // API: GET /users/me
        apiFetch('/users/me'),
      ]);

      setJob(jobData);
      setCurrentUser(userData);

      // API: GET /applications/check/:jobId — { applied: boolean }
      const check = await apiFetch(`/applications/check/${jobId}`);
      setHasApplied(check.applied);

    } catch (err: any) {
      setError(err.message || 'Failed to load job.');
    } finally {
      setLoading(false);
    }
  }

  const isOwner = !!(currentUser && job && currentUser.id === job.postedById);

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-24 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="h-6 w-6 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-bold">Failed to load job</p>
        <p className="mt-0.5">{error}</p>
        <button onClick={loadAll} className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline">
          Try again
        </button>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────
  if (!job) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white py-24 text-center shadow-sm">
        <p className="text-sm font-semibold text-gray-500">Job not found</p>
      </div>
    );
  }

  // ── Action button — conditionally rendered ─────────────────
  function ActionButton() {
    if (isOwner) {
      return (
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Invite Worker
        </button>
      );
    }

    if (hasApplied) {
      return (
        <button
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-bold text-gray-400 sm:w-auto"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Already Applied
        </button>
      );
    }

    return (
      <button
        onClick={() => setShowApplyModal(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a1a1a] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black sm:w-auto"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Apply for Job
      </button>
    );
  }

  // ── Page ──────────────────────────────────────────────────
  return (
    <>
      <div className="flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                {job.title}
              </h1>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${job.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {job.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            {job.createdAt && (
              <p className="text-xs text-gray-400">
                📅 Posted {formatDate(job.createdAt)}
              </p>
            )}
          </div>
          <ActionButton />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Left column */}
          <div className="flex flex-col gap-5 lg:col-span-2">

            {/* Description */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Job Description
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#ff6600]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applications list — visible to job owner only */}
            {isOwner && (
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Applications & Invites
                  </h2>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
                    {job.applications?.length ?? 0}
                  </span>
                </div>

                {!job.applications || job.applications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <svg className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-xs text-gray-400">No applications yet</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {/* Renamed: jw → ja */}
                    {job.applications.map((ja) => (
                      <li
                        key={ja.id}
                        className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-black text-white">
                            {ja.worker?.user?.name?.charAt(0).toUpperCase() ?? '?'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {ja.worker?.user?.name ?? 'Unknown'}
                            </p>
                            {ja.worker?.skills?.length > 0 && (
                              <p className="mt-0.5 text-xs text-gray-400">
                                {ja.worker.skills.slice(0, 3).join(' · ')}
                                {ja.worker.skills.length > 3 && ` +${ja.worker.skills.length - 3}`}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Renamed: workerStatusStyle → applicationStatusStyle */}
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${applicationStatusStyle[ja.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {ja.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">

            {/* Company */}
            {job.company && (
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Company
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1a1a1a] text-sm font-black text-white">
                    {job.company.logo ? (
                      <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
                    ) : (
                      job.company.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{job.company.name}</p>
                    {job.company.rating != null && (
                      <p className="text-xs text-gray-400">⭐ {job.company.rating.toFixed(1)} rating</p>
                    )}
                  </div>
                </div>
                {job.company.address && (
                  <p className="mt-3 text-xs text-gray-500">📍 {job.company.address}</p>
                )}
              </div>
            )}

            {/* Posted by */}
            {job.postedBy && (
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Posted By
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-black text-gray-600">
                    {job.postedBy.name?.charAt(0).toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{job.postedBy.name}</p>
                    {job.postedBy.email && (
                      <p className="text-xs text-gray-400">{job.postedBy.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Overview
              </h2>
              <dl className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${job.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </dd>
                </div>
                {isOwner && (
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Applications</dt>
                    <dd className="font-semibold text-gray-900">
                      {job.applications?.length ?? 0}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Skills Required</dt>
                  <dd className="font-semibold text-gray-900">
                    {job.skills?.length ?? 0}
                  </dd>
                </div>
                {job.createdAt && (
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Posted</dt>
                    <dd className="font-semibold text-gray-900">
                      {formatDate(job.createdAt)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      {showInviteModal && (
        <InviteWorkerModal
          job={job}
          onClose={() => setShowInviteModal(false)}
        />
      )}
      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onApplied={() => {
            setHasApplied(true);
            setShowApplyModal(false);
          }}
        />
      )}
    </>
  );
}