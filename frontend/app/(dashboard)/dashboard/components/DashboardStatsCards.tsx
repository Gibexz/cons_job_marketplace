// // ✅ No props — this component is self-contained
// const stats = [
//   {
//     label: "Active Jobs",
//     value: 15,
//     color: "bg-blue-600",
//     href: "/jobs/active-jobs",
//     icon: (
//       <svg
//         className="h-7 w-7"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//         />
//       </svg>
//     ),
//   },
//   {
//     label: "Available Workers",
//     value: 28,
//     color: "bg-green-600",
//     href: "/worker-profile",
//     icon: (
//       <svg
//         className="h-7 w-7"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//       </svg>
//     ),
//   },
//   {
//     label: "Pending Invites",
//     value: 7,
//     color: "bg-[#ff6600]",
//     href: "/invites",
//     icon: (
//       <svg
//         className="h-7 w-7"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//         />
//       </svg>
//     ),
//   },
// ];

// export default function DashboardStatsCards() {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//       {stats.map((stat) => (
//         <a
//           key={stat.label}
//           href={stat.href}
//           className={`${stat.color} flex items-center gap-4 rounded-lg p-5 text-white shadow-md transition-opacity hover:opacity-90`}
//         >
//           <div className="shrink-0 opacity-90">{stat.icon}</div>
//           <div>
//             <p className="text-3xl font-black leading-none">{stat.value}</p>
//             <p className="mt-1 text-sm font-semibold opacity-90">
//               {stat.label}
//             </p>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function DashboardStatsCards() {
  const [activeJobsCount, setActiveJobsCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchActiveJobsCount() {
      try {
        const data = await apiFetch("/jobs");
        setActiveJobsCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setActiveJobsCount(0);
      }
    }
    fetchActiveJobsCount();
  }, []);

  const stats = [
    {
      label: "Active Jobs",
      value: activeJobsCount,
      color: "bg-blue-600",
      href: "/jobs/active-jobs",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Available Workers",
      value: 28,
      color: "bg-green-600",
      href: "/worker-profile",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      label: "Pending Invites",
      value: 7,
      color: "bg-[#ff6600]",
      href: "/invites",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <a
          key={stat.label}
          href={stat.href}
          className={`${stat.color} flex items-center gap-4 rounded-lg p-5 text-white shadow-md transition-opacity hover:opacity-90`}
        >
          <div className="shrink-0 opacity-90">{stat.icon}</div>
          <div>
            {/* Show a small pulse placeholder while the count loads */}
            {stat.value === null ? (
              <div className="h-9 w-10 animate-pulse rounded-md bg-white/30" />
            ) : (
              <p className="text-3xl font-black leading-none">{stat.value}</p>
            )}
            <p className="mt-1 text-sm font-semibold opacity-90">
              {stat.label}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
