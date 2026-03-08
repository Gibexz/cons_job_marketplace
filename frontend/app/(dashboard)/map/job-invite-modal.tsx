'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { inviteWorker } from '@/lib/invites';

export default function JobInviteModal({ job, onClose }: { job: any; onClose: () => void }) {
  const [workers, setWorkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadMatchingWorkers();
  }, []);

  async function loadMatchingWorkers() {
    try {
      const skills = job.skills.join(',');
      const data = await apiFetch(`/workers/match?skills=${skills}`);
      setWorkers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggle(workerId: string) {
    setSelected((prev) =>
      prev.includes(workerId) ? prev.filter((id) => id !== workerId) : [...prev, workerId]
    );
  }

  async function sendInvites() {
    setSending(true);
    try {
      for (const workerId of selected) {
        await inviteWorker(job.id, workerId);
      }
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to send invites.');
    } finally {
      setSending(false);
    }
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">{job.title}</h2>
            <p className="mt-0.5 text-xs text-gray-500">{job.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            Matching Workers
          </h3>

          {/* States */}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="h-4 w-4 animate-spin text-[#ff6600]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading workers...
            </div>
          )}

          {error && (
            <div className="rounded-md border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md border-l-4 border-green-500 bg-green-50 p-3 text-sm text-green-700">
              ✓ Invites sent successfully!
            </div>
          )}

          {/* Worker List */}
          {!loading && workers.length === 0 && !error && (
            <p className="text-sm text-gray-500">No matching workers found for this job.</p>
          )}

          <ul className="space-y-2">
            {workers.map((worker) => {
              const isSelected = selected.includes(worker.id);
              return (
                <li key={worker.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                      isSelected
                        ? 'border-[#ff6600] bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(worker.id)}
                      className="h-4 w-4 accent-[#ff6600]"
                    />
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                      {worker.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{worker.user.name}</p>
                      <p className="text-xs text-gray-500">{worker.skills.join(', ')}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <span className="text-xs text-gray-500">
            {selected.length} worker{selected.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={sendInvites}
              disabled={selected.length === 0 || sending}
              className="rounded-lg bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? 'Sending...' : `Send Invites (${selected.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}