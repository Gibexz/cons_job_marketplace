'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Job {
  id:          string;
  title:       string;
  description: string;
  skills:      string[];
}

interface Props {
  job:       Job;
  onClose:   () => void;
  onApplied: () => void; // called on success — parent sets hasApplied = true
}

export default function ApplyModal({ job, onClose, onApplied }: Props) {
  const [coverNote, setCoverNote] = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleApply() {
    setLoading(true);
    setError('');
    try {
      // API: POST /applications — submits a job application
      // Body: { jobId, coverNote }
      await apiFetch('/applications', {
        method: 'POST',
        body: JSON.stringify({
          jobId:     job.id,
          coverNote: coverNote.trim() || undefined,
        }),
      });
      onApplied(); // notify parent — disables the Apply button
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  Apply for Job
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  You are applying for{' '}
                  <span className="font-semibold text-[#ff6600]">{job.title}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={loading}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-5">

            {/* Job summary */}
            <div className="mb-4 rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Job Summary
              </p>
              <p className="text-sm font-semibold text-gray-900">{job.title}</p>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                {job.description}
              </p>
              {job.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#ff6600]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cover note — optional */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Cover Note{' '}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                rows={4}
                placeholder="Briefly introduce yourself and explain why you're a great fit for this role..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                disabled={loading}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] disabled:opacity-60"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-white disabled:opacity-50 sm:w-auto sm:px-5"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] py-2.5 text-sm font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Confirm Application'
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}