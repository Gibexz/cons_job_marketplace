'use client';

interface Worker {
  id:          string;
  skills:      string[];
  bio?:        string;
  experience?: string;
  location?:   string;
  rating?:     number;
  user: {
    name:   string;
    email:  string;
    phone?: string;
  };
}

interface Props {
  worker:  Worker;
  onClose: () => void;
}

export default function WorkerProfileModal({ worker, onClose }: Props) {
  return (
    <>
      {/*
        z-60 — sits above the invite modal (z-50) so it layers correctly
        when both are open at the same time
      */}
      <div
        className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* ── Profile Header ────────────────────────────── */}
          <div className="relative bg-[#1a1a1a] px-6 pt-8 pb-16">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Avatar — overlaps header and body */}
          <div className="-mt-10 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#ff6600] text-2xl font-black text-white shadow-lg">
              {worker.user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* ── Profile Body ──────────────────────────────── */}
          <div className="px-6 pb-6 pt-3 text-center">
            <h3 className="text-lg font-black text-gray-900">
              {worker.user.name}
            </h3>
            <p className="text-sm text-gray-500">{worker.user.email}</p>

            {/* Rating */}
            {worker.rating != null && (
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-bold text-gray-700">
                  {worker.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">rating</span>
              </div>
            )}

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
              {worker.user.phone && (
                <span className="flex items-center gap-1">
                  📞 {worker.user.phone}
                </span>
              )}
              {worker.location && (
                <span className="flex items-center gap-1">
                  📍 {worker.location}
                </span>
              )}
              {worker.experience && (
                <span className="flex items-center gap-1">
                  🏗️ {worker.experience}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          <div className="flex flex-col gap-5 px-6 py-5">

            {/* Bio */}
            {worker.bio && (
              <div>
                <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                  About
                </h4>
                <p className="text-sm leading-relaxed text-gray-700">
                  {worker.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {worker.skills.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill) => (
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
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full rounded-xl border-2 border-gray-200 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:border-gray-300 hover:bg-white"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}