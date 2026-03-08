// 'use client';
// import { useEffect, useState } from 'react';
// import {
//   getMyInvites,
//   acceptInvite,
//   rejectInvite,
// } from '@/lib/invites';

// export default function InvitesPage() {
//   const [invites, setInvites] = useState<any[]>([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadInvites();
//   }, []);

//   async function loadInvites() {
//     try {
//       const data = await getMyInvites();
//       setInvites(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function respond(inviteId: string, action: 'accept' | 'reject') {
//     try {
//       if (action === 'accept') {
//         await acceptInvite(inviteId);
//       } else {
//         await rejectInvite(inviteId);
//       }

//       // remove handled invite from UI
//       setInvites(invites.filter(i => i.id !== inviteId));
//     } catch (err: any) {
//       alert(err.message);
//     }
//   }

//   if (loading) return <p>Loading invites...</p>;

//   return (
//     <div>
//       <h1>Job Invites</h1>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {invites.length === 0 && <p>No invites yet.</p>}

//       {invites.map(invite => (
//         <div key={invite.id} style={{ border: '1px solid #ccc', margin: 10 }}>
//           <p><b>Job:</b> {invite.job.title}</p>
//           <p><b>Client:</b> {invite.job.postedBy.name}</p>

//           <button onClick={() => respond(invite.id, 'accept')}>
//             Accept
//           </button>

//           <button onClick={() => respond(invite.id, 'reject')}>
//             Reject
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// API: GET /invites — returns sent and received invites
// Replace placeholder below with: const invites = await apiFetch('/invites');

const placeholderInvites = [
  { id: '1', worker: 'Sarah Johnson', job: 'Plumbing Repair',       status: 'Pending',  sent: '10 Jul 2025' },
  { id: '2', worker: 'John Smith',    job: 'Electrician Role',      status: 'Accepted', sent: '09 Jul 2025' },
  { id: '3', worker: 'Emily Clark',   job: 'Scaffolding Contract',  status: 'Declined', sent: '08 Jul 2025' },
  { id: '4', worker: 'Tom Wright',    job: 'Warehouse Renovation',  status: 'Pending',  sent: '07 Jul 2025' },
];

const statusColor: Record<string, string> = {
  Pending:  'bg-yellow-100 text-yellow-700',
  Accepted: 'bg-green-100 text-green-700',
  Declined: 'bg-red-100 text-red-600',
};

export default function InvitesPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Invites</h1>
        <p className="text-sm text-gray-500">Track all worker invitations you have sent.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Worker', 'Job', 'Status', 'Sent On', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {placeholderInvites.map((invite) => (
              <tr key={invite.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">{invite.worker}</td>
                <td className="px-4 py-3 text-gray-600">{invite.job}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColor[invite.status]}`}>
                    {invite.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{invite.sent}</td>
                <td className="px-4 py-3">
                  {/* API: DELETE /invites/:id */}
                  <button className="text-xs font-semibold text-red-500 hover:underline">
                    Withdraw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}