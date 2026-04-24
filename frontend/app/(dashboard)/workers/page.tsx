// // API: GET /workers — returns list of available workers
// // Replace placeholder below with: const workers = await apiFetch('/workers');

// const placeholderWorkers = [
//   { id: '1', name: 'John Smith',   trade: 'Electrician', location: 'Manchester', rating: 4.8, available: true  },
//   { id: '2', name: 'Sarah Jones',  trade: 'Plumber',     location: 'Leeds',      rating: 4.5, available: true  },
//   { id: '3', name: 'Mike Davis',   trade: 'Carpenter',   location: 'London',     rating: 4.9, available: false },
//   { id: '4', name: 'Emily Clark',  trade: 'Scaffolder',  location: 'Bristol',    rating: 4.2, available: true  },
//   { id: '5', name: 'Tom Wright',   trade: 'Welder',      location: 'Birmingham', rating: 4.7, available: false },
// ];

// export default function WorkersPage() {
//   return (
//     <>
//       {/* Header */}
//       <div>
//         <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Workers</h1>
//         <p className="text-sm text-gray-500">Browse and manage available tradespeople.</p>
//       </div>

//       {/* Worker Cards Grid */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {placeholderWorkers.map((worker) => (
//           <div
//             key={worker.id}
//             className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
//           >
//             {/* Avatar + Name */}
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-lg font-black text-white">
//                 {worker.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-bold text-gray-900">{worker.name}</p>
//                 <p className="text-xs text-gray-500">{worker.trade}</p>
//               </div>

//               {/* Availability badge — pushed to right */}
//               <span
//                 className={`ml-auto rounded-full px-2.5 py-1 text-xs font-bold ${
//                   worker.available
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-gray-100 text-gray-500'
//                 }`}
//               >
//                 {worker.available ? 'Available' : 'Unavailable'}
//               </span>
//             </div>

//             {/* Details */}
//             <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
//               <span>📍 {worker.location}</span>
//               <span className="font-semibold text-yellow-600">★ {worker.rating}</span>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2">
//               {/* API: GET /workers/:id */}
//               <a
//                 href={`/workers/${worker.id}`}
//                 className="flex-1 rounded-md border border-gray-200 py-1.5 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
//               >
//                 View Profile
//               </a>
//               {/* API: POST /invites — body: { workerId } */}
//               <button className="flex-1 rounded-md bg-[#ff6600] py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
//                 Send Invite
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

// Shape returned by GET /worker-profile/all
interface Worker {
  id: string;
  skills: string[];
  experience: "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL" | "EXPERT";
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

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await apiFetch("/worker-profile/all");
        setWorkers(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to load workers");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  // ── Loading skeleton ──────────────────────────────────────
  if (loading) {
    return (
      <>
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            Workers
          </h1>
          <p className="text-sm text-gray-500">
            Browse and manage available tradespeople.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
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
                <div className="h-8 flex-1 animate-pulse rounded-md bg-gray-100" />
                <div className="h-8 flex-1 animate-pulse rounded-md bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (error) {
    return (
      <>
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            Workers
          </h1>
          <p className="text-sm text-gray-500">
            Browse and manage available tradespeople.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-red-100 bg-red-50 py-16 text-center">
          <p className="text-sm font-semibold text-red-600">
            Failed to load workers
          </p>
          <p className="mt-1 text-xs text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-[#ff6600] px-4 py-2 text-xs font-bold text-white hover:bg-[#e65c00]"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  // ── Empty state ───────────────────────────────────────────
  if (workers.length === 0) {
    return (
      <>
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            Workers
          </h1>
          <p className="text-sm text-gray-500">
            Browse and manage available tradespeople.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
          <p className="text-sm font-semibold text-gray-500">
            No workers found
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Workers who sign up will appear here.
          </p>
        </div>
      </>
    );
  }

  // ── Worker cards ──────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
          Workers
        </h1>
        <p className="text-sm text-gray-500">
          Browse and manage available tradespeople.{" "}
          <span className="font-semibold text-gray-700">
            {workers.length} total
          </span>
        </p>
      </div>

      {/* Worker Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              {worker.user.profilePhoto ? (
                <img
                  src={worker.user.profilePhoto}
                  alt={worker.user.name}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-lg font-black text-white">
                  {worker.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-bold text-gray-900">
                  {worker.user.name}
                </p>
                {/* Use first skill as the "trade" label, fallback to experience level */}
                <p className="truncate text-xs text-gray-500">
                  {worker.skills[0] ?? worker.experience}
                </p>
              </div>

              {/* Availability badge */}
              <span
                className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                  worker.available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {worker.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Skills chips */}
            {worker.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]"
                  >
                    {skill}
                  </span>
                ))}
                {worker.skills.length > 4 && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                    +{worker.skills.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Details */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {worker.experience}
              </span>
              {worker.lat && worker.lng && (
                <span className="text-xs text-gray-400">📍 Has location</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={`/workers/${worker.id}`}
                className="flex-1 rounded-md border border-gray-200 py-1.5 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
              >
                View Profile
              </a>
              <button className="flex-1 rounded-md bg-[#ff6600] py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
                Send Invite
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
