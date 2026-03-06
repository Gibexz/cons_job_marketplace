'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

import DashboardSidebar        from './components/DashboardSidebar';
import DashboardTopBar         from './components/DashboardTopBar';
import DashboardStatsCards     from './components/DashboardStatsCards';
import DashboardMapPreview     from './components/DashboardMapPreview';
import DashboardRecentActivity from './components/DashboardRecentActivity';

export default function DashboardPage() {
  const { token } = useAuth();
  const router    = useRouter();

  // Mobile: hidden by default
  // Desktop: open by default — resolved after mount to avoid hydration mismatch
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  useEffect(() => {
    // Open automatically on desktop, stay closed on mobile
    const mq = window.matchMedia('(min-width: 768px)');
    setSidebarOpen(mq.matches);

    const handler = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/*
        Mobile backdrop.
        Only shown on mobile when sidebar is open.
        Tapping it closes the sidebar.
      */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content — expands naturally when sidebar collapses on desktop */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <DashboardTopBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl space-y-6">

            <div>
              <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back — here's what's happening today.
              </p>
            </div>

            <DashboardStatsCards />
            <DashboardMapPreview />
            <DashboardRecentActivity />

          </div>
        </main>
      </div>
    </div>
  );
}