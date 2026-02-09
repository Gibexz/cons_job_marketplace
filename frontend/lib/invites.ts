import { apiFetch } from './api';

/**
 * Fetch invites for the logged-in worker
 */
export function getMyInvites() {
  return apiFetch('/job-worker/invites');
}

/**
 * Client invites a worker to a job
 */
export function inviteWorker(jobId: string, workerId: string) {
  return apiFetch('/job-worker/invite', {
    method: 'POST',
    body: JSON.stringify({ jobId, workerId }),
  });
}

/**
 * Worker accepts an invite
 */
export function acceptInvite(inviteId: string) {
  return apiFetch(`/job-worker/${inviteId}/accept`, {
    method: 'PATCH',
  });
}

/**
 * Worker rejects an invite
 */
export function rejectInvite(inviteId: string) {
  return apiFetch(`/job-worker/${inviteId}/reject`, {
    method: 'PATCH',
  });
}
