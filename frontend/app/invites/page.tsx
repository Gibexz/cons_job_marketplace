'use client';
import { useEffect, useState } from 'react';
import {
  getMyInvites,
  acceptInvite,
  rejectInvite,
} from '@/lib/invites';

export default function InvitesPage() {
  const [invites, setInvites] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvites();
  }, []);

  async function loadInvites() {
    try {
      const data = await getMyInvites();
      setInvites(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function respond(inviteId: string, action: 'accept' | 'reject') {
    try {
      if (action === 'accept') {
        await acceptInvite(inviteId);
      } else {
        await rejectInvite(inviteId);
      }

      // remove handled invite from UI
      setInvites(invites.filter(i => i.id !== inviteId));
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading invites...</p>;

  return (
    <div>
      <h1>Job Invites</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {invites.length === 0 && <p>No invites yet.</p>}

      {invites.map(invite => (
        <div key={invite.id} style={{ border: '1px solid #ccc', margin: 10 }}>
          <p><b>Job:</b> {invite.job.title}</p>
          <p><b>Client:</b> {invite.job.postedBy.name}</p>

          <button onClick={() => respond(invite.id, 'accept')}>
            Accept
          </button>

          <button onClick={() => respond(invite.id, 'reject')}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
