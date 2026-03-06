'use client';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Map',
    href: '/map',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Jobs',
    href: '/jobs',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Workers',
    href: '/worker-profile',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Invites',
    href: '/invites',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Applications',
    href: '/applications',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ isOpen, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  // ── Shared inner content ──────────────────────────────────────
  // Extracted so it renders identically in both mobile and desktop slots
  const SidebarContent = (
    <div className="flex h-full w-56 flex-col bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-5">
        <div className="leading-tight">
          <span className="text-base font-black text-[#ff6600]">ConsJob</span>
          <span className="ml-1 text-base font-black text-gray-800">MarketPlace</span>
        </div>

        {/* << Collapse button */}
      <button
        onClick={onToggle}
        title="Collapse sidebar"
        className="flex md:hidden h-9 w-7 items-center justify-center rounded-md text-gray-400 border border-gray-200 transition-colors hover:bg-orange-50 hover:text-[#ff6600]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
        </svg>
      </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors
                ${isActive
                  ? 'bg-orange-50 text-[#ff6600]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#ff6600]' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#ff6600]" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Help panel */}
      <div className="m-3 rounded-lg bg-orange-50 p-3 text-xs text-orange-700">
        <p className="font-bold">Need help?</p>
        <p className="mt-0.5 text-orange-600">Visit our support centre</p>
      </div>
    </div>
  );

  return (
    <>
      {/*
        ── DESKTOP SIDEBAR (md and above) ──────────────────────────
        Sits naturally in the flex row.
        We animate the WIDTH so the main content expands/contracts.
        overflow-hidden ensures content doesn't spill during animation.
      */}
      <aside
        className={`
          hidden md:block
          shrink-0 overflow-hidden border-r border-gray-200 shadow-sm
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-56' : 'w-0 border-r-0'}
        `}
      >
        {SidebarContent}
      </aside>

      {/*
        ── MOBILE SIDEBAR (below md) ────────────────────────────────
        Fixed overlay. Always w-56 wide so the slide animation works.
        We only move it with translateX — the width never changes.
      */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 block md:hidden
          w-56 shadow-xl border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {SidebarContent}
      </aside>
    </>
  );
}