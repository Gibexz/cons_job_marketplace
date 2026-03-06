'use client';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface DashboardTopBarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

// ── Profile dropdown menu items ────────────────────────────────
const profileMenuItems = [
  {
    label: 'My Profile',
    href: '/worker-profile',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'My Jobs',
    href: '/jobs',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Invites',
    href: '/invites',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function DashboardTopBar({ onToggleSidebar, sidebarOpen }: DashboardTopBarProps) {
  const { token }       = useAuth();
  const router          = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef     = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    setDropdownOpen(false);
    // Add your auth context logout method here e.g. logout()
    router.push('/login');
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3 shadow-sm sm:px-5">

      {/* ── LEFT: Toggle button + Brand (when sidebar closed) ── */}
      <div className="flex items-center gap-3">

        {/* >> / << Toggle Button */}
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:border-[#ff6600] hover:bg-orange-50 hover:text-[#ff6600]"
        >
          {sidebarOpen ? (
            // << arrows (sidebar open — click to close)
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
            </svg>
          ) : (
            // >> arrows (sidebar closed — click to open)
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>

        {/* Brand name — only visible when sidebar is closed */}
        {!sidebarOpen && (
          <div className="hidden sm:block leading-tight">
            <span className="text-sm font-black text-[#ff6600]">ConsJob</span>
            <span className="ml-1 text-sm font-black text-gray-800">MarketPlace</span>
          </div>
        )}
      </div>

      {/* ── CENTRE: Search Bar ── */}
      <div className="mx-4 flex w-full max-w-md items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
        <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search jobs, workers, invites..."
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* ── RIGHT: Notifications + Profile ── */}
      <div className="flex shrink-0 items-center gap-2">

        {/* Notification Bell */}
        <button className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Messages */}
        <button className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* ── Profile Avatar + Dropdown ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-100"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar circle */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6600] text-sm font-black text-white ring-2 ring-orange-200">
              U
            </div>
            {/* Chevron */}
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Panel */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

              {/* User info header */}
              <div className="border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-sm font-black text-white">
                    U
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">User Name</p>
                    <p className="truncate text-xs text-gray-500">user@consjob.com</p>
                  </div>
                </div>
              </div>

              {/* Nav items */}
              <ul className="py-1">
                {profileMenuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#ff6600]"
                    >
                      <span className="text-gray-400">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Divider + Logout */}
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  {/* Logout icon */}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}