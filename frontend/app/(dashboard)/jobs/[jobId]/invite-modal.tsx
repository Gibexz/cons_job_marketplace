'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import WorkerProfileModal from './worker-profile-modal';

// ── TYPES ─────────────────────────────────────────────────────
interface Worker {
  id:     string;
  skills: string[];
  user: {
    name:   string;
    email:  string;
    phone?: string;
  };
  // Additional profile fields for the profile popup
  bio?:        string;
  experience?: string;
  location?:   string;
  rating?:     number;
}

interface Job {
  id:     string;
  title:  string;
  skills: string[];
}

interface Props {
  job:     Job;
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────
export default function InviteWorkerModal({ job, onClose }: Props) {
  const [workers, setWorkers]         = useState<Worker[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  // Tracks which workers have been invited this session
  const [invitedIds, setInvitedIds]   = useState<Set<string>>(new Set());
  const [invitingId, setInvitingId]   = useState<string | null>(null);
  // Second popup — selected worker for profile view
  const [profileWorker, setProfileWorker] = useState<Worker | null>(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const skills = job.skills.join(',');
      // API: GET /workers/match?skills=... — returns workers matching job skills
      const data = await apiFetch(`/workers/match?skills=${skills}`);
      setWorkers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load workers.');
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite(workerId: string) {
    setInvitingId(workerId);
    try {
      // API: POST /invites — sends a job invite to a worker
      await apiFetch('/invites', {
        method: 'POST',
        body: JSON.stringify({ jobId: job.id, workerId }),
      });
      // Mark as invited so button becomes disabled
      setInvitedIds((prev) => new Set(prev).add(workerId));
    } catch (err: any) {
      alert(err.message || 'Failed to send invite.');
    } finally {
      setInvitingId(null);
    }
  }

  return (
    <>
      {/* ── BACKDROP ──────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── MODAL PANEL ───────────────────────────────────── */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="text-base font-black text-gray-900">
                Invite Workers
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Matching workers for <span className="font-semibold text-[#ff6600]">{job.title}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="max-h-[60vh] overflow-y-auto">

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center gap-3 py-12 text-gray-400">
                <svg className="h-6 w-6 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm">Finding matching workers...</p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="m-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && workers.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-12 text-center text-gray-400">
                <svg className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">No matching workers found</p>
                <p className="text-xs">Try adding more skills to this job.</p>
              </div>
            )}

            {/* Worker list */}
            {!loading && !error && workers.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {workers.map((worker) => {
                  const isInvited  = invitedIds.has(worker.id);
                  const isInviting = invitingId === worker.id;

                  return (
                    <li
                      key={worker.id}
                      className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Worker info */}
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-black text-white">
                          {worker.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {worker.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {worker.user.email}
                          </p>
                          {worker.skills.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {worker.skills.slice(0, 3).map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#ff6600]"
                                >
                                  {s}
                                </span>
                              ))}
                              {worker.skills.length > 3 && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                  +{worker.skills.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex shrink-0 items-center gap-2 pl-13 sm:pl-0">

                        {/* View Profile — opens second popup */}
                        <button
                          onClick={() => setProfileWorker(worker)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                        >
                          View Profile
                        </button>

                        {/* Invite / Invited */}
                        {isInvited ? (
                          <button
                            disabled
                            className="cursor-not-allowed rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-400"
                          >
                            ✓ Invited
                          </button>
                        ) : (
                          <button
                            onClick={() => handleInvite(worker.id)}
                            disabled={isInviting}
                            className="flex items-center gap-1.5 rounded-lg bg-[#ff6600] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isInviting ? (
                              <>
                                <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              'Invite'
                            )}
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3">
            <p className="text-xs text-gray-400">
              {invitedIds.size} invite{invitedIds.size !== 1 ? 's' : ''} sent this session
            </p>
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ── SECOND POPUP — Worker Profile ─────────────────── */}
      {profileWorker && (
        <WorkerProfileModal
          worker={profileWorker}
          onClose={() => setProfileWorker(null)}
        />
      )}
    </>
  );
}