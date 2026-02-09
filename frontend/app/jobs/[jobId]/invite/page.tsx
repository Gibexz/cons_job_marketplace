'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { inviteWorker } from '@/lib/invites';
import { apiFetch } from '@/lib/api';

export default function InviteWorkerPage() {
  const { jobId } = useParams();
  const [workers, setWorkers] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const data = await apiFetch('/workers'); // backend list
      setWorkers(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function invite(workerId: string) {
    try {
      await inviteWorker(jobId as string, workerId);
      alert('Invite sent');
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1>Invite Workers</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {workers.map(worker => (
        <div key={worker.id} style={{ border: '1px solid #ccc', margin: 10 }}>
          <p><b>Name:</b> {worker.user.name}</p>
          <p><b>Skills:</b> {worker.skills.join(', ')}</p>

          <button onClick={() => invite(worker.id)}>
            Invite
          </button>
        </div>
      ))}
    </div>
  );
}
