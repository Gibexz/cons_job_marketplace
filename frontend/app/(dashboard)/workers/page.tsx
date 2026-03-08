// API: GET /workers — returns list of available workers
// Replace placeholder below with: const workers = await apiFetch('/workers');

const placeholderWorkers = [
  { id: '1', name: 'John Smith',   trade: 'Electrician', location: 'Manchester', rating: 4.8, available: true  },
  { id: '2', name: 'Sarah Jones',  trade: 'Plumber',     location: 'Leeds',      rating: 4.5, available: true  },
  { id: '3', name: 'Mike Davis',   trade: 'Carpenter',   location: 'London',     rating: 4.9, available: false },
  { id: '4', name: 'Emily Clark',  trade: 'Scaffolder',  location: 'Bristol',    rating: 4.2, available: true  },
  { id: '5', name: 'Tom Wright',   trade: 'Welder',      location: 'Birmingham', rating: 4.7, available: false },
];

export default function WorkersPage() {
  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Workers</h1>
        <p className="text-sm text-gray-500">Browse and manage available tradespeople.</p>
      </div>

      {/* Worker Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderWorkers.map((worker) => (
          <div
            key={worker.id}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-lg font-black text-white">
                {worker.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{worker.name}</p>
                <p className="text-xs text-gray-500">{worker.trade}</p>
              </div>

              {/* Availability badge — pushed to right */}
              <span
                className={`ml-auto rounded-full px-2.5 py-1 text-xs font-bold ${
                  worker.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {worker.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
              <span>📍 {worker.location}</span>
              <span className="font-semibold text-yellow-600">★ {worker.rating}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {/* API: GET /workers/:id */}
              <a
                href={`/workers/${worker.id}`}
                className="flex-1 rounded-md border border-gray-200 py-1.5 text-center text-xs font-bold text-gray-700 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
              >
                View Profile
              </a>
              {/* API: POST /invites — body: { workerId } */}
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