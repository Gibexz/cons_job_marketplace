const footerLinks = [
  { label: 'Find Jobs',      href: '#' },
  { label: 'Post a Job',     href: '#' },
  { label: 'About Us',       href: '#' },
  { label: 'Contact',        href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-4 py-10 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-700 pb-8 md:flex-row md:gap-0">
          <div className="text-2xl font-black text-[#ff6600]">BuildMatch</div>
          <ul className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-400 sm:gap-6 sm:text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-[#ff6600]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BuildMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}