'use client';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-12">

        {/* Logo */}
        <div className="text-2xl font-black text-[#ff6600]">BuildMatch</div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-bold lg:gap-8">
            <li><a href="#" className="text-white transition-colors hover:text-[#ff6600]">Find Jobs</a></li>
            <li><a href="#" className="text-white transition-colors hover:text-[#ff6600]">Post a Job</a></li>
            <li><a href="#" className="text-white transition-colors hover:text-[#ff6600]">About Us</a></li>
            <li><a href="#" className="text-white transition-colors hover:text-[#ff6600]">Contact</a></li>
            <li>
              <a
                href="/login"
                className="rounded border-2 border-[#ff6600] px-4 py-2 text-[#ff6600] transition-colors hover:bg-[#ff6600] hover:text-white"
              >
                Log In / Sign Up
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${menuOpen ? 'max-h-96 border-t border-gray-700' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-1 bg-[#1a1a1a] px-4 py-3 text-sm font-bold">
          <li><a href="#" className="block border-b border-gray-700 py-3 text-white hover:text-[#ff6600]">Find Jobs</a></li>
          <li><a href="#" className="block border-b border-gray-700 py-3 text-white hover:text-[#ff6600]">Post a Job</a></li>
          <li><a href="#" className="block border-b border-gray-700 py-3 text-white hover:text-[#ff6600]">About Us</a></li>
          <li><a href="#" className="block border-b border-gray-700 py-3 text-white hover:text-[#ff6600]">Contact</a></li>
          <li className="py-3">
            <a
              href="/login"
              className="block w-full rounded border-2 border-[#ff6600] px-4 py-2 text-center text-[#ff6600] transition-colors hover:bg-[#ff6600] hover:text-white"
            >
              Log In / Sign Up
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}