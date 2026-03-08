// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiFetch } from "@/lib/api";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   async function loadJobs() {
//     try {
//       const data = await apiFetch("/jobs/my");
//       setJobs(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <p>Loading jobs...</p>;

//   return (
//     <div>
//       <h1>Jobs</h1>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {jobs.map((job) => (
//         <div
//           key={job.id}
//           style={{ border: "1px solid #ccc", marginBottom: 12, padding: 10 }}
//         >
//           <h3>{job.title}</h3>
//           <p>
//             Status: <b>{job.active ? "Active" : "Inactive"}</b>
//           </p>

//           <Link href={`/jobs/${job.id}`}>View Details</Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// API: GET /jobs — returns list of all jobs
// Replace the placeholder data below with: const jobs = await apiFetch('/jobs');

const placeholderJobs = [
  { id: '1', title: 'Electrician Needed', location: 'Manchester', type: 'Full-time',  status: 'Active',  date: '12 Jul 2025' },
  { id: '2', title: 'Plumber – Emergency', location: 'Leeds',       type: 'Contract',  status: 'Active',  date: '11 Jul 2025' },
  { id: '3', title: 'Site Manager',         location: 'London',      type: 'Full-time',  status: 'Closed',  date: '10 Jul 2025' },
  { id: '4', title: 'Scaffolder',           location: 'Birmingham',  type: 'Part-time', status: 'Active',  date: '09 Jul 2025' },
  { id: '5', title: 'Carpenter',            location: 'Bristol',     type: 'Contract',  status: 'Pending', date: '08 Jul 2025' },
];

const statusColor: Record<string, string> = {
  Active:  'bg-green-100 text-green-700',
  Closed:  'bg-gray-100 text-gray-500',
  Pending: 'bg-yellow-100 text-yellow-700',
};

export default function JobsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Jobs</h1>
          <p className="text-sm text-gray-500">Manage and monitor all posted jobs.</p>
        </div>
        <a
          href="/jobs/create"
          className="rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65c00]"
        >
          + Post New Job
        </a>
      </div>

      {/* Jobs Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Job Title', 'Location', 'Type', 'Status', 'Date Posted', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {placeholderJobs.map((job) => (
              <tr key={job.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">{job.title}</td>
                <td className="px-4 py-3 text-gray-600">{job.location}</td>
                <td className="px-4 py-3 text-gray-600">{job.type}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColor[job.status]}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{job.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* API: GET /jobs/:id */}
                    <a href={`/jobs/${job.id}`} className="text-xs font-semibold text-blue-600 hover:underline">
                      View
                    </a>
                    {/* API: DELETE /jobs/:id */}
                    <button className="text-xs font-semibold text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}