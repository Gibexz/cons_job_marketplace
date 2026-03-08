'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

import DashboardSidebar from './dashboard/components/DashboardSidebar';
import DashboardTopBar  from './dashboard/components/DashboardTopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const router    = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard — applies to ALL dashboard pages
  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  // Auto-open sidebar on desktop, closed on mobile
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setSidebarOpen(mq.matches);

    const handler = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">

      {/* ── SIDEBAR — never unmounts ── */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MAIN COLUMN ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ── TOPBAR — never unmounts ── */}
        <DashboardTopBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/*
          ── PAGE CONTENT SLOT ──
          Each child page renders here. Only this area changes on navigation.
        */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}