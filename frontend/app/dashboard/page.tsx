'use client';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the marketplace</p>

      <ul>
        <li><a href="/jobs/create">Create Job</a></li>
        <li><a href="/worker-profile">Worker Profile</a></li>
        <li><a href="/invites">Invites</a></li>
      </ul>
    </div>
  );
}
