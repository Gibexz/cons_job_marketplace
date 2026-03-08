// API: GET /applications — returns all job applications
// Replace placeholder below with: const applications = await apiFetch('/applications');

const placeholderApplications = [
  { id: '1', applicant: 'John Smith',  job: 'Electrician Needed', trade: 'Electrician', applied: '12 Jul 2025', status: 'New'      },
  { id: '2', applicant: 'Tom Wright',  job: 'Welder on Site',     trade: 'Welder',      applied: '11 Jul 2025', status: 'Reviewed' },
  { id: '3', applicant: 'Amy Taylor',  job: 'Site Manager',       trade: 'Management',  applied: '10 Jul 2025', status: 'Shortlisted' },
  { id: '4', applicant: 'Dan Moore',   job: 'Scaffolding Role',   trade: 'Scaffolder',  applied: '09 Jul 2025', status: 'Rejected' },
];

const statusColor: Record<string, string> = {
  New:         'bg-blue-100 text-blue-700',
  Reviewed:    'bg-yellow-100 text-yellow-700',
  Shortlisted: 'bg-green-100 text-green-700',
  Rejected:    'bg-red-100 text-red-600',
};

export default function ApplicationsPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Applications</h1>
        <p className="text-sm text-gray-500">Review all incoming job applications.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Applicant', 'Job Applied For', 'Trade', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {placeholderApplications.map((app) => (
              <tr key={app.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">{app.applicant}</td>
                <td className="px-4 py-3 text-gray-600">{app.job}</td>
                <td className="px-4 py-3 text-gray-600">{app.trade}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColor[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{app.applied}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* API: GET /applications/:id */}
                    <button className="text-xs font-semibold text-blue-600 hover:underline">
                      Review
                    </button>
                    {/* API: PATCH /applications/:id — body: { status: 'Shortlisted' } */}
                    <button className="text-xs font-semibold text-green-600 hover:underline">
                      Shortlist
                    </button>
                    {/* API: PATCH /applications/:id — body: { status: 'Rejected' } */}
                    <button className="text-xs font-semibold text-red-500 hover:underline">
                      Reject
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