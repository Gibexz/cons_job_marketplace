// In a real app these would come from an API call
const activities = [
  {
    id: 1,
    text: (
      <span><strong>John Smith</strong> applied for Electrician job.</span>
    ),
    time: '2 mins ago',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    text: (
      <span>New job posted: <strong>"Plumbing Repair"</strong>.</span>
    ),
    time: '15 mins ago',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: 'bg-orange-100 text-[#ff6600]',
  },
  {
    id: 3,
    text: (
      <span>Invite sent to <strong>Sarah Johnson</strong>.</span>
    ),
    time: '1 hour ago',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    text: (
      <span><strong>Mike Davis</strong> completed <strong>"Warehouse Renovation"</strong>.</span>
    ),
    time: '3 hours ago',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    id: 5,
    text: (
      <span><strong>Emily Clark</strong> accepted the Carpenter position.</span>
    ),
    time: '5 hours ago',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    iconBg: 'bg-yellow-100 text-yellow-600',
  },
];

export default function DashboardRecentActivity() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-700">Recent Activity</h2>
        <button className="text-xs font-semibold text-[#ff6600] hover:underline">
          View All
        </button>
      </div>

      {/* Activity List */}
      <ul className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50">
            {/* Icon Badge */}
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}>
              {activity.icon}
            </div>

            {/* Text */}
            <div className="flex flex-1 items-center justify-between gap-4">
              <p className="text-sm text-gray-700">{activity.text}</p>
              <span className="shrink-0 text-xs text-gray-400">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}