'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const PlantIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#3A6B35] flex-shrink-0" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 15a6 6 0 0 1 5 -6" />
    <path d="M12 9a6 6 0 0 1 5 6" />
    <path d="M12 3v18" />
    <path d="M12 11a6 6 0 0 1 -5 -6" />
    <path d="M12 11a6 6 0 0 1 5 -6" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/practice', label: 'Scenarios' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/', label: 'About' },
  ];

  return (
    <nav className="w-full bg-[#F7F9F5] border-b border-[#D0DFC8] h-[60px] flex items-center justify-between px-6 md:px-[48px] sticky top-0 z-50 font-sans">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
        <PlantIcon />
        <span className="font-sans font-bold text-[20px] text-[#141F12] tracking-tight">Betterly</span>
      </Link>

      {/* Right: Nav Links & CTA */}
      <div className="hidden md:flex items-center gap-[32px]">
        <div className="flex items-center gap-[32px]">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-sans font-medium transition-colors hover:text-[#3A6B35]
                  ${active ? 'text-[#3A6B35] font-semibold' : 'text-[#3D4F38]'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="bg-[#3A6B35] !text-white px-[18px] py-[8px] rounded-[8px] text-[14px] font-sans font-bold hover:bg-[#3A6B35]/90 active:scale-[0.99] transition-all shadow-sm flex-shrink-0"
        >
          Start Free
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className={`md:hidden p-2.5 bg-[#EDF2E8] border border-[#D0DFC8] text-[#3D4F38] hover:text-[#3A6B35] hover:bg-[#EDF2E8]/80 active:scale-[0.98] transition-all flex items-center justify-center shadow-sm duration-200
          ${mobileOpen ? 'rounded-full' : 'rounded-[10px]'}`}
        onClick={() => setMobileOpen(v => !v)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[60px] left-0 right-0 border-b border-[#D0DFC8] px-6 py-4 space-y-3 bg-[#F7F9F5] md:hidden shadow-md flex flex-col z-50">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[14px] font-sans font-medium transition-colors hover:text-[#3A6B35] py-1
                  ${active ? 'text-[#3A6B35] font-semibold' : 'text-[#3D4F38]'}`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#D0DFC8]/50">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#3A6B35] !text-white px-[18px] py-[10px] rounded-[8px] text-[14px] font-sans font-bold hover:bg-[#3A6B35]/90 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
