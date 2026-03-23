// // "use client";

// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import InviteWorkerModal from "./invite-modal";
// // import { apiFetch } from "@/lib/api";

// // export default function JobDetailPage() {
// //   const { jobId } = useParams();
// //   const [job, setJob] = useState<any>(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadJob();
// //   }, []);

// //   async function loadJob() {
// //     try {
// //       const data = await apiFetch(`/jobs/${jobId}`);
// //       setJob(data);
// //     } catch (err: any) {
// //       setError(err.message);
// //       console.log("Error fetching job details:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   if (loading) return <p>Loading job...</p>;
// //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// //   if (!job) return <p>Job not found</p>;

// //   return (
// //     <div>
// //       <h1>{job.title}</h1>
// //       <p>{job.description}</p>

// //       {job.company && (
// //         <p>
// //           <b>Company:</b> {job.company}
// //         </p>
// //       )}

// //       <p>
// //         <b>Posted by:</b> {job.postedBy?.name}
// //       </p>

// //       {/* Workers assigned to this job */}
// //       {job.workers && job.workers.length > 0 && (
// //         <div>
// //           <h3>Workers</h3>
// //           {job.workers.map((jw: any) => (
// //             <div key={jw.id} style={{ marginBottom: 8 }}>
// //               <p>
// //                 {jw.worker.user.name} — Status: <b>{jw.status}</b>
// //               </p>
// //               <p>Skills: {jw.worker.skills.join(", ")}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <button onClick={() => setShowModal(true)}>Invite Worker</button>

// //       {showModal && (
// //         <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import InviteWorkerModal from "./invite-modal";
// import { apiFetch } from "@/lib/api";

// // Optional: better typing (recommended)
// interface Job {
//   id: string;
//   title: string;
//   description: string;
//   company?: {
//     id: string;
//     name: string;
//     logo?: string;
//     address?: string;
//   };
//   postedBy?: {
//     name: string;
//   };
//   workers?: any[];
// }

// export default function JobDetailPage() {
//   const { jobId } = useParams();

//   const [job, setJob] = useState<Job | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (jobId) loadJob();
//   }, [jobId]);

//   async function loadJob() {
//     try {
//       const data = await apiFetch(`/jobs/${jobId}`);
//       setJob(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to load job");
//       console.log("Error fetching job details:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ── STATES ─────────────────────────────
//   if (loading) return <p>Loading job...</p>;

//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   if (!job) return <p>Job not found</p>;

//   // ── UI ────────────────────────────────
//   return (
//     <div style={{ maxWidth: 700, margin: "0 auto" }}>
//       <h1>{job.title}</h1>
//       <p>{job.description}</p>

//       {/* ✅ FIXED COMPANY */}
//       {job.company && (
//         <p>
//           <b>Company:</b> {job.company.name}
//         </p>
//       )}

//       {/* Optional extras */}
//       {job.company?.address && (
//         <p>
//           <b>Location:</b> {job.company.address}
//         </p>
//       )}

//       <p>
//         <b>Posted by:</b> {job.postedBy?.name || "Unknown"}
//       </p>

//       {/* ── Workers ───────────────────── */}
//       {job.workers && job.workers.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Workers</h3>

//           {job.workers.map((jw: any) => (
//             <div
//               key={jw.id}
//               style={{
//                 marginBottom: 10,
//                 padding: 10,
//                 border: "1px solid #eee",
//                 borderRadius: 6,
//               }}
//             >
//               <p>
//                 {jw.worker?.user?.name || "No name"} — Status:{" "}
//                 <b>{jw.status}</b>
//               </p>

//               <p>
//                 Skills:{" "}
//                 {jw.worker?.skills?.length
//                   ? jw.worker.skills.join(", ")
//                   : "No skills"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── ACTION ─────────────────────── */}
//       <button
//         onClick={() => setShowModal(true)}
//         style={{
//           marginTop: 20,
//           padding: "10px 16px",
//           background: "#ff6600",
//           color: "#fff",
//           border: "none",
//           borderRadius: 6,
//           cursor: "pointer",
//         }}
//       >
//         Invite Worker
//       </button>

//       {showModal && (
//         <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InviteWorkerModal from "./invite-modal";
import { apiFetch } from "@/lib/api";

// ── TYPES ─────────────────────────────────────────────────────
interface JobWorker {
  id: string;
  status: string;
  worker: {
    skills: string[];
    user: {
      name: string;
      email: string;
    };
  };
}

interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  active: boolean;
  createdAt: string;
  company?: {
    id: string;
    name: string;
    logo?: string;
    address?: string;
    rating?: number;
  };
  postedBy?: {
    name: string;
    email: string;
  };
  workers?: JobWorker[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const workerStatusStyle: Record<string, string> = {
  INVITED: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-600",
  COMPLETED: "bg-blue-100 text-blue-700",
};

// ─────────────────────────────────────────────────────────────
export default function JobDetailPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) loadJob();
  }, [jobId]);

  async function loadJob() {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/jobs/${jobId}`);
      setJob(data);
    } catch (err: any) {
      setError(err.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  }

  // ── LOADING ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-24 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg
            className="h-6 w-6 animate-spin text-[#ff6600]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  // ── ERROR ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-bold">Failed to load job</p>
        <p className="mt-0.5">{error}</p>
        <button
          onClick={loadJob}
          className="mt-2 text-xs font-bold text-red-600 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── NOT FOUND ────────────────────────────────────────────────
  if (!job) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white py-24 text-center shadow-sm">
        <svg
          className="h-12 w-12 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm font-semibold text-gray-500">Job not found</p>
      </div>
    );
  }

  // ── PAGE ─────────────────────────────────────────────────────
  return (
    <>
      <div className="flex flex-col gap-5">
        {/* ── PAGE HEADER ───────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                {job.title}
              </h1>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  job.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {job.active ? "Active" : "Inactive"}
              </span>
            </div>
            {job.createdAt && (
              <p className="text-xs text-gray-400">
                📅 Posted {formatDate(job.createdAt)}
              </p>
            )}
          </div>

          {/* Invite Worker button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6600] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] sm:w-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Invite Worker
          </button>
        </div>

        {/* ── MAIN CONTENT GRID ─────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* ── Left column ─────────────────────────────────── */}
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

            {/* Workers */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Assigned Workers
                </h2>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
                  {job.workers?.length ?? 0}
                </span>
              </div>

              {!job.workers || job.workers.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <svg
                    className="h-8 w-8 text-gray-200"
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
                  <p className="text-xs text-gray-400">
                    No workers assigned yet
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {job.workers.map((jw) => (
                    <li
                      key={jw.id}
                      className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar initials */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-black text-white">
                          {jw.worker?.user?.name?.charAt(0).toUpperCase() ??
                            "?"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {jw.worker?.user?.name ?? "Unknown"}
                          </p>
                          {jw.worker?.skills?.length > 0 && (
                            <p className="mt-0.5 text-xs text-gray-400">
                              {jw.worker.skills.slice(0, 3).join(" · ")}
                              {jw.worker.skills.length > 3 &&
                                ` +${jw.worker.skills.length - 3}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                          workerStatusStyle[jw.status] ??
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {jw.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Right sidebar ──────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Company card */}
            {job.company && (
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Company
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-900 text-sm font-black text-white">
                    {job.company.logo ? (
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      job.company.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {job.company.name}
                    </p>
                    {job.company.rating != null && (
                      <p className="text-xs text-gray-400">
                        ⭐ {job.company.rating.toFixed(1)} rating
                      </p>
                    )}
                  </div>
                </div>
                {job.company.address && (
                  <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.company.address}
                  </div>
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
                    {job.postedBy.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {job.postedBy.name}
                    </p>
                    {job.postedBy.email && (
                      <p className="text-xs text-gray-400">
                        {job.postedBy.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Overview
              </h2>
              <dl className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${job.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {job.active ? "Active" : "Inactive"}
                    </span>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Workers</dt>
                  <dd className="font-semibold text-gray-900">
                    {job.workers?.length ?? 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Skills</dt>
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

      {/* ── MODAL ───────────────────────────────────────────── */}
      {showModal && (
        <InviteWorkerModal job={job} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
