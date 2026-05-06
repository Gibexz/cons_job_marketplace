// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiFetch } from "@/lib/api";

// // ── TYPES ──────────────────────────────────────────────────────
// type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL" | "EXPERT";

// interface Worker {
//   id:         string;
//   skills:     string[];
//   experience: ExperienceLevel;
//   available:  boolean;
//   bio:        string | null;
//   lat:        number | null;
//   lng:        number | null;
//   createdAt:  string;
//   user: {
//     id:           string;
//     name:         string;
//     email:        string;
//     profilePhoto: string | null;
//   };
// }

// interface CurrentUser {
//   id: string;
// }

// // ── CONSTANTS ──────────────────────────────────────────────────
// const EXPERIENCE_ORDER: Record<ExperienceLevel, number> = {
//   BEGINNER:     1,
//   INTERMEDIATE: 2,
//   PROFESSIONAL: 3,
//   EXPERT:       4,
// };

// const EXPERIENCE_STYLES: Record<ExperienceLevel, string> = {
//   BEGINNER:     "bg-gray-100 text-gray-600",
//   INTERMEDIATE: "bg-blue-50 text-blue-700",
//   PROFESSIONAL: "bg-orange-50 text-[#ff6600]",
//   EXPERT:       "bg-purple-50 text-purple-700",
// };

// // ── HELPERS ────────────────────────────────────────────────────
// function Avatar({
//   worker,
//   size = "md",
// }: {
//   worker: Worker;
//   size?: "sm" | "md" | "lg";
// }) {
//   const cls = {
//     sm:  "h-8 w-8 text-sm",
//     md:  "h-11 w-11 text-lg",
//     lg:  "h-14 w-14 text-xl",
//   }[size];

//   return worker.user.profilePhoto ? (
//     <img
//       src={worker.user.profilePhoto}
//       alt={worker.user.name}
//       className={`${cls} shrink-0 rounded-full object-cover`}
//     />
//   ) : (
//     <div
//       className={`${cls} flex shrink-0 items-center justify-center rounded-full bg-[#ff6600] font-black text-white`}
//     >
//       {worker.user.name.charAt(0).toUpperCase()}
//     </div>
//   );
// }

// function AvailabilityBadge({ available }: { available: boolean }) {
//   return (
//     <span
//       className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
//         available
//           ? "bg-green-100 text-green-700"
//           : "bg-gray-100 text-gray-500"
//       }`}
//     >
//       {available ? "Available" : "Unavailable"}
//     </span>
//   );
// }

// function ExperienceBadge({ level }: { level: ExperienceLevel }) {
//   return (
//     <span
//       className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${EXPERIENCE_STYLES[level]}`}
//     >
//       {level.charAt(0) + level.slice(1).toLowerCase()}
//     </span>
//   );
// }

// function SkillChip({ label }: { label: string }) {
//   return (
//     <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]">
//       {label}
//     </span>
//   );
// }

// function MoreChip({ count }: { count: number }) {
//   return (
//     <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
//       +{count}
//     </span>
//   );
// }

// // ── ICONS ──────────────────────────────────────────────────────
// function GridIcon({ active }: { active: boolean }) {
//   return (
//     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
//       <rect x="3"  y="3"  width="7" height="7" rx="1" />
//       <rect x="14" y="3"  width="7" height="7" rx="1" />
//       <rect x="3"  y="14" width="7" height="7" rx="1" />
//       <rect x="14" y="14" width="7" height="7" rx="1" />
//     </svg>
//   );
// }

// function ListIcon({ active }: { active: boolean }) {
//   return (
//     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   );
// }

// // ── PAGE ───────────────────────────────────────────────────────
// export default function WorkersPage() {
//   const [workers, setWorkers]         = useState<Worker[]>([]);
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const [loading, setLoading]         = useState(true);
//   const [error, setError]             = useState<string | null>(null);
//   const [search, setSearch]           = useState("");
//   const [view, setView]               = useState<"grid" | "list">("grid");
//   const [filterAvail, setFilterAvail] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE">("ALL");
//   const [filterExp, setFilterExp]     = useState<ExperienceLevel | "ALL">("ALL");
//   const [sortBy, setSortBy]           = useState<"name" | "experience" | "skills">("name");

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [workersData, userData] = await Promise.allSettled([
//           // API: GET /worker-profile/all
//           apiFetch("/worker-profile/all"),
//           // API: GET /users/me — to exclude current user from list
//           apiFetch("/users/me"),
//         ]);

//         if (workersData.status === "fulfilled") {
//           setWorkers(Array.isArray(workersData.value) ? workersData.value : []);
//         } else {
//           setError(workersData.reason?.message ?? "Failed to load workers.");
//         }

//         if (userData.status === "fulfilled") {
//           setCurrentUser({ id: userData.value.id });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   // ── Filter + search + sort ──────────────────────────────────
//   const processed = workers
//     // Exclude current logged-in user
//     .filter((w) => !currentUser || w.user.id !== currentUser.id)
//     // Availability filter
//     .filter((w) => {
//       if (filterAvail === "AVAILABLE")   return w.available;
//       if (filterAvail === "UNAVAILABLE") return !w.available;
//       return true;
//     })
//     // Experience filter
//     .filter((w) => filterExp === "ALL" || w.experience === filterExp)
//     // Search
//     .filter((w) => {
//       const q = search.toLowerCase();
//       return (
//         w.user.name.toLowerCase().includes(q) ||
//         w.skills.some((s) => s.toLowerCase().includes(q)) ||
//         w.experience.toLowerCase().includes(q) ||
//         (w.bio ?? "").toLowerCase().includes(q)
//       );
//     })
//     // Sort
//     .sort((a, b) => {
//       if (sortBy === "experience") {
//         return EXPERIENCE_ORDER[b.experience] - EXPERIENCE_ORDER[a.experience];
//       }
//       if (sortBy === "skills") {
//         return b.skills.length - a.skills.length;
//       }
//       return a.user.name.localeCompare(b.user.name);
//     });

//   // ── Loading skeleton ────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex flex-col gap-5">
//         <div>
//           <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Workers</h1>
//           <p className="text-sm text-gray-500">Browse available tradespeople.</p>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
//                 <div className="flex flex-col gap-1.5">
//                   <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
//                   <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
//                 </div>
//               </div>
//               <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
//               <div className="flex gap-2">
//                 <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-100" />
//                 <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-100" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // ── Error state ─────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="flex flex-col gap-5">
//         <div>
//           <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Workers</h1>
//           <p className="text-sm text-gray-500">Browse available tradespeople.</p>
//         </div>
//         <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 py-16 text-center">
//           <p className="text-sm font-semibold text-red-600">Failed to load workers</p>
//           <p className="mt-1 text-xs text-red-400">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 rounded-lg bg-[#ff6600] px-4 py-2 text-xs font-bold text-white hover:bg-[#e65c00]"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Page ────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col gap-5">

//       {/* ── PAGE HEADER ─────────────────────────────────────── */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Workers</h1>
//         <p className="text-sm text-gray-500">
//           Browse and connect with available tradespeople.{" "}
//           {!loading && (
//             <span className="font-semibold text-gray-700">
//               {processed.length} of {workers.filter((w) => !currentUser || w.user.id !== currentUser.id).length} shown
//             </span>
//           )}
//         </p>
//       </div>

//       {/* ── TOOLBAR ─────────────────────────────────────────── */}
//       <div className="flex flex-wrap items-center gap-3">

//         {/* Search */}
//         <div className="relative min-w-[180px] flex-1">
//           <svg
//             className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
//             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
//           >
//             <circle cx="11" cy="11" r="8" />
//             <path d="M21 21l-4.35-4.35" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search by name, skill or experience…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-orange-100"
//           />
//         </div>

//         {/* Availability filter */}
//         <select
//           value={filterAvail}
//           onChange={(e) => setFilterAvail(e.target.value as typeof filterAvail)}
//           className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
//         >
//           <option value="ALL">All Availability</option>
//           <option value="AVAILABLE">Available</option>
//           <option value="UNAVAILABLE">Unavailable</option>
//         </select>

//         {/* Experience filter */}
//         <select
//           value={filterExp}
//           onChange={(e) => setFilterExp(e.target.value as typeof filterExp)}
//           className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
//         >
//           <option value="ALL">All Experience</option>
//           <option value="BEGINNER">Beginner</option>
//           <option value="INTERMEDIATE">Intermediate</option>
//           <option value="PROFESSIONAL">Professional</option>
//           <option value="EXPERT">Expert</option>
//         </select>

//         {/* Sort */}
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
//           className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
//         >
//           <option value="name">Sort: Name</option>
//           <option value="experience">Sort: Experience</option>
//           <option value="skills">Sort: Most Skills</option>
//         </select>

//         {/* View toggle */}
//         <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
//           <button
//             onClick={() => setView("grid")}
//             title="Grid view"
//             className={`flex items-center px-3 py-2 transition-colors ${
//               view === "grid"
//                 ? "bg-[#ff6600] text-white"
//                 : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
//             }`}
//           >
//             <GridIcon active={view === "grid"} />
//           </button>
//           <button
//             onClick={() => setView("list")}
//             title="List view"
//             className={`flex items-center border-l border-gray-200 px-3 py-2 transition-colors ${
//               view === "list"
//                 ? "bg-[#ff6600] text-white"
//                 : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
//             }`}
//           >
//             <ListIcon active={view === "list"} />
//           </button>
//         </div>
//       </div>

//       {/* ── EMPTY — no workers at all ────────────────────────── */}
//       {workers.filter((w) => !currentUser || w.user.id !== currentUser.id).length === 0 && (
//         <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
//           <svg className="mb-3 h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//           </svg>
//           <p className="text-sm font-semibold text-gray-500">No workers found</p>
//           <p className="mt-1 text-xs text-gray-400">Workers who sign up will appear here.</p>
//         </div>
//       )}

//       {/* ── NO SEARCH RESULTS ───────────────────────────────── */}
//       {processed.length === 0 &&
//         workers.filter((w) => !currentUser || w.user.id !== currentUser.id).length > 0 && (
//         <div className="py-12 text-center text-sm text-gray-400">
//           No workers matched &ldquo;
//           <strong className="text-gray-600">{search}</strong>
//           &rdquo;. Try adjusting your filters.
//         </div>
//       )}

//       {/* ════════════════════════════════════════════════════════
//           GRID VIEW
//       ════════════════════════════════════════════════════════ */}
//       {processed.length > 0 && view === "grid" && (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {processed.map((worker) => (
//             <div
//               key={worker.id}
//               className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
//             >
//               {/* Top accent bar */}
//               <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#ff6600] to-orange-300 transition-transform duration-200 group-hover:scale-x-100" />

//               {/* Avatar + Name + Availability */}
//               <div className="flex items-center gap-3">
//                 <Avatar worker={worker} size="md" />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate font-bold text-gray-900">
//                     {worker.user.name}
//                   </p>
//                   <p className="truncate text-xs text-gray-500">
//                     {worker.skills[0] ?? worker.experience}
//                   </p>
//                 </div>
//                 <AvailabilityBadge available={worker.available} />
//               </div>

//               {/* Bio */}
//               {worker.bio && (
//                 <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
//                   {worker.bio}
//                 </p>
//               )}

//               {/* Skills */}
//               {worker.skills.length > 0 && (
//                 <div className="flex flex-wrap gap-1.5">
//                   {worker.skills.slice(0, 4).map((skill) => (
//                     <SkillChip key={skill} label={skill} />
//                   ))}
//                   {worker.skills.length > 4 && (
//                     <MoreChip count={worker.skills.length - 4} />
//                   )}
//                 </div>
//               )}

//               {/* Experience + location */}
//               <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//                 <ExperienceBadge level={worker.experience} />
//                 {worker.lat && worker.lng && (
//                   <span className="text-xs text-gray-400">📍 Located</span>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2">
//                 <Link
//                   href={`/workers/${worker.id}`}
//                   className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
//                 >
//                   View Profile
//                 </Link>
//                 <button className="flex-1 rounded-lg bg-[#ff6600] py-2 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
//                   Send Invite
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ════════════════════════════════════════════════════════
//           LIST VIEW
//       ════════════════════════════════════════════════════════ */}
//       {processed.length > 0 && view === "list" && (
//         <>
//           {/* ── Desktop table (md+) ── */}
//           <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-100 text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {["Worker", "Skills", "Experience", "Availability", "Location", ""].map((h) => (
//                       <th
//                         key={h}
//                         className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100 bg-white">
//                   {processed.map((worker) => (
//                     <tr
//                       key={worker.id}
//                       className="transition-colors hover:bg-orange-50/30"
//                     >
//                       {/* Worker */}
//                       <td className="whitespace-nowrap px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <Avatar worker={worker} size="sm" />
//                           <div>
//                             <p className="font-bold text-gray-900">{worker.user.name}</p>
//                             {worker.bio && (
//                               <p className="max-w-[200px] truncate text-xs text-gray-400">
//                                 {worker.bio}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </td>

//                       {/* Skills */}
//                       <td className="px-5 py-4">
//                         <div className="flex flex-wrap gap-1">
//                           {worker.skills.length === 0 && (
//                             <span className="italic text-gray-300">—</span>
//                           )}
//                           {worker.skills.slice(0, 3).map((s) => (
//                             <SkillChip key={s} label={s} />
//                           ))}
//                           {worker.skills.length > 3 && (
//                             <MoreChip count={worker.skills.length - 3} />
//                           )}
//                         </div>
//                       </td>

//                       {/* Experience */}
//                       <td className="whitespace-nowrap px-5 py-4">
//                         <ExperienceBadge level={worker.experience} />
//                       </td>

//                       {/* Availability */}
//                       <td className="whitespace-nowrap px-5 py-4">
//                         <AvailabilityBadge available={worker.available} />
//                       </td>

//                       {/* Location */}
//                       <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">
//                         {worker.lat && worker.lng ? "📍 Located" : <span className="italic text-gray-300">—</span>}
//                       </td>

//                       {/* Actions */}
//                       <td className="whitespace-nowrap px-5 py-4">
//                         <div className="flex items-center gap-2">
//                           <Link
//                             href={`/workers/${worker.id}`}
//                             className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
//                           >
//                             View
//                           </Link>
//                           <button className="rounded-lg bg-[#ff6600] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
//                             Invite
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Table footer */}
//             <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-xs text-gray-400">
//               Showing {processed.length} worker{processed.length !== 1 ? "s" : ""}
//             </div>
//           </div>

//           {/* ── Mobile cards (below md) ── */}
//           <div className="flex flex-col gap-3 md:hidden">
//             {processed.map((worker) => (
//               <div
//                 key={worker.id}
//                 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
//               >
//                 {/* Top row */}
//                 <div className="flex items-center gap-3">
//                   <Avatar worker={worker} size="sm" />
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate font-bold text-gray-900">{worker.user.name}</p>
//                     <p className="truncate text-xs text-gray-500">
//                       {worker.skills[0] ?? worker.experience}
//                     </p>
//                   </div>
//                   <AvailabilityBadge available={worker.available} />
//                 </div>

//                 {/* Experience */}
//                 <div className="mt-3 flex items-center gap-2">
//                   <ExperienceBadge level={worker.experience} />
//                   {worker.lat && worker.lng && (
//                     <span className="text-xs text-gray-400">📍 Located</span>
//                   )}
//                 </div>

//                 {/* Skills */}
//                 {worker.skills.length > 0 && (
//                   <div className="mt-2.5 flex flex-wrap gap-1.5">
//                     {worker.skills.slice(0, 4).map((s) => (
//                       <SkillChip key={s} label={s} />
//                     ))}
//                     {worker.skills.length > 4 && (
//                       <MoreChip count={worker.skills.length - 4} />
//                     )}
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
//                   <Link
//                     href={`/workers/${worker.id}`}
//                     className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
//                   >
//                     View Profile
//                   </Link>
//                   <button className="flex-1 rounded-lg bg-[#ff6600] py-2 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
//                     Send Invite
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <p className="text-center text-xs text-gray-400">
//               {processed.length} worker{processed.length !== 1 ? "s" : ""} listed
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// ── TYPES ──────────────────────────────────────────────────────
type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL" | "EXPERT";

interface Worker {
  id: string;
  skills: string[];
  experience: ExperienceLevel;
  available: boolean;
  bio: string | null;
  lat: number | null;
  lng: number | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
  };
}

interface CurrentUser {
  id: string;
}

interface Job {
  id: string;
  title: string;
}

// ── CONSTANTS ──────────────────────────────────────────────────
const EXPERIENCE_ORDER: Record<ExperienceLevel, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  PROFESSIONAL: 3,
  EXPERT: 4,
};

const EXPERIENCE_STYLES: Record<ExperienceLevel, string> = {
  BEGINNER: "bg-gray-100 text-gray-600",
  INTERMEDIATE: "bg-blue-50 text-blue-700",
  PROFESSIONAL: "bg-orange-50 text-[#ff6600]",
  EXPERT: "bg-purple-50 text-purple-700",
};

// ── HELPERS ────────────────────────────────────────────────────
function Avatar({
  worker,
  size = "md",
}: {
  worker: Worker;
  size?: "sm" | "md" | "lg";
}) {
  const cls = {
    sm: "h-8 w-8 text-sm",
    md: "h-11 w-11 text-lg",
    lg: "h-14 w-14 text-xl",
  }[size];
  return worker.user.profilePhoto ? (
    <img
      src={worker.user.profilePhoto}
      alt={worker.user.name}
      className={`${cls} shrink-0 rounded-full object-cover`}
    />
  ) : (
    <div
      className={`${cls} flex shrink-0 items-center justify-center rounded-full bg-[#ff6600] font-black text-white`}
    >
      {worker.user.name.charAt(0).toUpperCase()}
    </div>
  );
}

function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
    >
      {available ? "Available" : "Unavailable"}
    </span>
  );
}

function ExperienceBadge({ level }: { level: ExperienceLevel }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${EXPERIENCE_STYLES[level]}`}
    >
      {level.charAt(0) + level.slice(1).toLowerCase()}
    </span>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]">
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

// ── ICONS ──────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={active ? 2.5 : 2}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={active ? 2.5 : 2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

// ── INVITE BUTTON ──────────────────────────────────────────────
// Self-contained: manages its own popover + loading state.
// `sentJobMap` is a Map<workerId, Set<jobId>> — passed down from the page
// so the "Sent" state persists even when the popover closes.
function InviteButton({
  worker,
  jobs,
  sentJobMap,
  onInviteSent,
  compact = false,
}: {
  worker: Worker;
  jobs: Job[];
  sentJobMap: Map<string, Set<string>>;
  onInviteSent: (workerId: string, jobId: string) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setError(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const sentJobs = sentJobMap.get(worker.id) ?? new Set<string>();
  const allJobsSent = jobs.length > 0 && jobs.every((j) => sentJobs.has(j.id));

  // ── Already sent to all jobs → static "Sent ✓" ─────────────
  if (allJobsSent) {
    return (
      <div
        className={`${compact ? "px-3 py-1.5" : "flex-1 py-2"} flex items-center justify-center gap-1.5 rounded-lg bg-green-50 text-xs font-bold text-green-700`}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        Sent
      </div>
    );
  }

  // ── No jobs available ────────────────────────────────────────
  if (jobs.length === 0) {
    return (
      <button
        disabled
        title="You have no posted jobs to invite from"
        className={`${compact ? "px-3 py-1.5" : "flex-1 py-2"} rounded-lg bg-gray-100 text-xs font-bold text-gray-400 cursor-not-allowed`}
      >
        {compact ? "Invite" : "Send Invite"}
      </button>
    );
  }

  const handleSend = async () => {
    if (!selectedJob) return;
    setSending(true);
    setError(null);
    try {
      // POST /invites — body: { jobId, workerId }
      await apiFetch("/invites", {
        method: "POST",
        body: JSON.stringify({ jobId: selectedJob, workerId: worker.id }),
      });
      onInviteSent(worker.id, selectedJob);
      setOpen(false);
      setSelectedJob("");
    } catch (err: any) {
      setError(err.message ?? "Failed to send invite.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setError(null);
        }}
        className={`${compact ? "px-3 py-1.5" : "w-full py-2"} rounded-lg bg-[#ff6600] text-xs font-bold text-white transition-colors hover:bg-[#e65c00] active:scale-95`}
      >
        {compact ? "Invite" : "Send Invite"}
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 border-b border-r border-gray-200 bg-white" />

          <p className="mb-2.5 text-xs font-bold text-gray-700">
            Invite <span className="text-[#ff6600]">{worker.user.name}</span>{" "}
            to:
          </p>

          {/* Job selector */}
          <select
            value={selectedJob}
            onChange={(e) => {
              setSelectedJob(e.target.value);
              setError(null);
            }}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-orange-100"
          >
            <option value="">— Select a job —</option>
            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
                disabled={sentJobs.has(job.id)}
              >
                {job.title}
                {sentJobs.has(job.id) ? " (invited)" : ""}
              </option>
            ))}
          </select>

          {error && (
            <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setOpen(false);
                setError(null);
              }}
              className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!selectedJob || sending}
              className="flex-1 rounded-lg bg-[#ff6600] py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending…" : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PAGE ───────────────────────────────────────────────────────
export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterAvail, setFilterAvail] = useState<
    "ALL" | "AVAILABLE" | "UNAVAILABLE"
  >("ALL");
  const [filterExp, setFilterExp] = useState<ExperienceLevel | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"name" | "experience" | "skills">(
    "name",
  );

  // workerId → Set<jobId> — tracks which (worker, job) pairs have been invited
  const [sentJobMap, setSentJobMap] = useState<Map<string, Set<string>>>(
    new Map(),
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [workersRes, userRes, jobsRes] = await Promise.allSettled([
          apiFetch("/worker-profile/all"),
          apiFetch("/users/me"),
          // Fetch jobs posted by the current user so we know which jobs to invite from.
          // Adjust this endpoint to whatever your API exposes (e.g. /jobs/mine or /jobs?postedByMe=true).
          apiFetch("/jobs/mine"),
        ]);

        if (workersRes.status === "fulfilled") {
          setWorkers(Array.isArray(workersRes.value) ? workersRes.value : []);
        } else {
          setError(workersRes.reason?.message ?? "Failed to load workers.");
        }

        if (userRes.status === "fulfilled") {
          setCurrentUser({ id: userRes.value.id });
        }

        if (jobsRes.status === "fulfilled") {
          const jobs = Array.isArray(jobsRes.value) ? jobsRes.value : [];
          // Normalise to { id, title }
          setMyJobs(jobs.map((j: any) => ({ id: j.id, title: j.title })));
        }
        // If /jobs/mine fails we just end up with an empty list — invite buttons
        // will render as disabled, which is fine.
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Called by InviteButton when a successful invite is sent
  const handleInviteSent = (workerId: string, jobId: string) => {
    setSentJobMap((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(workerId) ?? []);
      set.add(jobId);
      next.set(workerId, set);
      return next;
    });
  };

  // ── Filter + search + sort ──────────────────────────────────
  const processed = workers
    .filter((w) => !currentUser || w.user.id !== currentUser.id)
    .filter((w) => {
      if (filterAvail === "AVAILABLE") return w.available;
      if (filterAvail === "UNAVAILABLE") return !w.available;
      return true;
    })
    .filter((w) => filterExp === "ALL" || w.experience === filterExp)
    .filter((w) => {
      const q = search.toLowerCase();
      return (
        w.user.name.toLowerCase().includes(q) ||
        w.skills.some((s) => s.toLowerCase().includes(q)) ||
        w.experience.toLowerCase().includes(q) ||
        (w.bio ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "experience")
        return EXPERIENCE_ORDER[b.experience] - EXPERIENCE_ORDER[a.experience];
      if (sortBy === "skills") return b.skills.length - a.skills.length;
      return a.user.name.localeCompare(b.user.name);
    });

  // ── Loading skeleton ────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            Workers
          </h1>
          <p className="text-sm text-gray-500">
            Browse available tradespeople.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="flex gap-2">
                <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-100" />
                <div className="h-8 flex-1 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            Workers
          </h1>
          <p className="text-sm text-gray-500">
            Browse available tradespeople.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 py-16 text-center">
          <p className="text-sm font-semibold text-red-600">
            Failed to load workers
          </p>
          <p className="mt-1 text-xs text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-[#ff6600] px-4 py-2 text-xs font-bold text-white hover:bg-[#e65c00]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalWorkers = workers.filter(
    (w) => !currentUser || w.user.id !== currentUser.id,
  ).length;

  // ── Page ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5">
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
          Workers
        </h1>
        <p className="text-sm text-gray-500">
          Browse and connect with available tradespeople.{" "}
          <span className="font-semibold text-gray-700">
            {processed.length} of {totalWorkers} shown
          </span>
        </p>
      </div>

      {/* ── TOOLBAR ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[180px] flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, skill or experience…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-orange-100"
          />
        </div>

        <select
          value={filterAvail}
          onChange={(e) => setFilterAvail(e.target.value as typeof filterAvail)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
        >
          <option value="ALL">All Availability</option>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>

        <select
          value={filterExp}
          onChange={(e) => setFilterExp(e.target.value as typeof filterExp)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
        >
          <option value="ALL">All Experience</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="PROFESSIONAL">Professional</option>
          <option value="EXPERT">Expert</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none transition-colors focus:border-[#ff6600]"
        >
          <option value="name">Sort: Name</option>
          <option value="experience">Sort: Experience</option>
          <option value="skills">Sort: Most Skills</option>
        </select>

        <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => setView("grid")}
            title="Grid view"
            className={`flex items-center px-3 py-2 transition-colors ${view === "grid" ? "bg-[#ff6600] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`}
          >
            <GridIcon active={view === "grid"} />
          </button>
          <button
            onClick={() => setView("list")}
            title="List view"
            className={`flex items-center border-l border-gray-200 px-3 py-2 transition-colors ${view === "list" ? "bg-[#ff6600] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`}
          >
            <ListIcon active={view === "list"} />
          </button>
        </div>
      </div>

      {/* ── EMPTY ───────────────────────────────────────────── */}
      {totalWorkers === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
          <svg
            className="mb-3 h-12 w-12 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-sm font-semibold text-gray-500">
            No workers found
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Workers who sign up will appear here.
          </p>
        </div>
      )}

      {/* ── NO SEARCH RESULTS ───────────────────────────────── */}
      {processed.length === 0 && totalWorkers > 0 && (
        <div className="py-12 text-center text-sm text-gray-400">
          No workers matched &ldquo;
          <strong className="text-gray-600">{search}</strong>&rdquo;. Try
          adjusting your filters.
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          GRID VIEW
      ════════════════════════════════════════════════════════ */}
      {processed.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processed.map((worker) => (
            <div
              key={worker.id}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#ff6600] to-orange-300 transition-transform duration-200 group-hover:scale-x-100" />

              <div className="flex items-center gap-3">
                <Avatar worker={worker} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-gray-900">
                    {worker.user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {worker.skills[0] ?? worker.experience}
                  </p>
                </div>
                <AvailabilityBadge available={worker.available} />
              </div>

              {worker.bio && (
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {worker.bio}
                </p>
              )}

              {worker.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {worker.skills.slice(0, 4).map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                  {worker.skills.length > 4 && (
                    <MoreChip count={worker.skills.length - 4} />
                  )}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <ExperienceBadge level={worker.experience} />
                {worker.lat && worker.lng && (
                  <span className="text-xs text-gray-400">📍 Located</span>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/workers/${worker.id}`}
                  className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                >
                  View Profile
                </Link>
                <InviteButton
                  worker={worker}
                  jobs={myJobs}
                  sentJobMap={sentJobMap}
                  onInviteSent={handleInviteSent}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          LIST VIEW
      ════════════════════════════════════════════════════════ */}
      {processed.length > 0 && view === "list" && (
        <>
          {/* ── Desktop table (md+) ── */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Worker",
                      "Skills",
                      "Experience",
                      "Availability",
                      "Location",
                      "",
                    ].map((h) => (
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
                  {processed.map((worker) => (
                    <tr
                      key={worker.id}
                      className="transition-colors hover:bg-orange-50/30"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar worker={worker} size="sm" />
                          <div>
                            <p className="font-bold text-gray-900">
                              {worker.user.name}
                            </p>
                            {worker.bio && (
                              <p className="max-w-[200px] truncate text-xs text-gray-400">
                                {worker.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {worker.skills.length === 0 && (
                            <span className="italic text-gray-300">—</span>
                          )}
                          {worker.skills.slice(0, 3).map((s) => (
                            <SkillChip key={s} label={s} />
                          ))}
                          {worker.skills.length > 3 && (
                            <MoreChip count={worker.skills.length - 3} />
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <ExperienceBadge level={worker.experience} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <AvailabilityBadge available={worker.available} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">
                        {worker.lat && worker.lng ? (
                          "📍 Located"
                        ) : (
                          <span className="italic text-gray-300">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/workers/${worker.id}`}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                          >
                            View
                          </Link>
                          <InviteButton
                            worker={worker}
                            jobs={myJobs}
                            sentJobMap={sentJobMap}
                            onInviteSent={handleInviteSent}
                            compact
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-xs text-gray-400">
              Showing {processed.length} worker
              {processed.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* ── Mobile cards (below md) ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {processed.map((worker) => (
              <div
                key={worker.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar worker={worker} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-gray-900">
                      {worker.user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {worker.skills[0] ?? worker.experience}
                    </p>
                  </div>
                  <AvailabilityBadge available={worker.available} />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <ExperienceBadge level={worker.experience} />
                  {worker.lat && worker.lng && (
                    <span className="text-xs text-gray-400">📍 Located</span>
                  )}
                </div>

                {worker.skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {worker.skills.slice(0, 4).map((s) => (
                      <SkillChip key={s} label={s} />
                    ))}
                    {worker.skills.length > 4 && (
                      <MoreChip count={worker.skills.length - 4} />
                    )}
                  </div>
                )}

                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                  <Link
                    href={`/workers/${worker.id}`}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                  >
                    View Profile
                  </Link>
                  <InviteButton
                    worker={worker}
                    jobs={myJobs}
                    sentJobMap={sentJobMap}
                    onInviteSent={handleInviteSent}
                  />
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400">
              {processed.length} worker{processed.length !== 1 ? "s" : ""}{" "}
              listed
            </p>
          </div>
        </>
      )}
    </div>
  );
}
