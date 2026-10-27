"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEnquiry } from "@/components/EnquiryContext";

const announcements = [
  "Admissions open for 2026–27 Academic Session",
  "Scholarship available for meritorious students in Academics & Sports",
  "Parent counselling available online & offline",
  "New science labs inaugurated at Durgapura campus",
  "Seedling wins State-level inter-school debate championship",
];

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "About Seedling", href: "/about" },
      { name: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    name: "Academics",
    href: "/curriculum",
    children: [
      { name: "Curriculum", href: "/curriculum" },
      // { name: "Result", href: "/result" },
      { name: "Learning Support", href: "/learning-support" },
    ],
  },
  {
    name: "School Life",
    href: "/school-life",
    children: [
      { name: "Campus Life", href: "/school-life" },
      { name: "Sports", href: "/sports" },
    ],
  },
  { name: "News & Events", href: "/news-and-events" },
  {
    name: "Admissions",
    href: "/admissions",
    children: [
      { name: "Procedure", href: "/admissions" },
      { name: "Apply & Pay Online", href: "/admissions/apply" },
      { name: "Transport Facility", href: "/transport-facility" },
    ],
  },
  { name: "Alumni", href: "/alumni" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();



  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[200] bg-[#013975]">
        {/* ── MAIN HEADER ── */}
        <header className="bg-[#013975]">
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px] gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <Image
                src="/logo.webp"
                alt="Seedling Modern High School"
                width={52}
                height={52}
                priority
                className="rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="font-serif text-[13.5px] font-bold text-white tracking-widest uppercase">
                  Seedling
                </p>
                <p className="text-[9px] text-white/40 tracking-[0.25em] uppercase">
                  Modern High School
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const hasChildren = !!item.children;
                const isOpen = openDropdown === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.name)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-[11.5px] font-semibold tracking-[0.1em] uppercase transition-colors duration-150 ${
                        isActive ? "text-white" : "text-white/45 hover:text-white"
                      }`}
                    >
                      {item.name}
                      {hasChildren && (
                        <svg
                          width="9" height="9"
                          viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="3"
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown */}
                    {hasChildren && isOpen && (
                      <div className="absolute top-full left-0 mt-0 w-52 bg-[#013975] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
                        <div className="h-[2px] bg-gradient-to-r from-[#a3123f] to-[#a3123f]" />
                        {item.children!.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-5 py-3 text-[12px] text-white/50 hover:text-white hover:bg-white/[0.04] tracking-wide transition-colors border-b border-white/[0.04] last:border-0"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Apply & pay the registration fee online */}
            <div className="hidden lg:block flex-shrink-0">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#013975] hover:bg-[#034ea2] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Apply &amp; Pay
              </Link>
            </div>

            {/* Enquire CTA */}
            <div className="hidden lg:block flex-shrink-0">
              <button
                onClick={openEnquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a3123f] hover:bg-[#8a0f34] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Enquire Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
        </header>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-[210] transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => { setIsMobileOpen(false); setMobileExpanded(null); }}
      />

      {/* Drawer panel */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-[85vw] max-w-[340px] bg-white z-[220] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={() => { setIsMobileOpen(false); setMobileExpanded(null); }} className="flex items-center gap-2.5">
            <Image src="/logo.webp" alt="Seedling" width={44} height={44} priority className="rounded-full object-cover" />
            <div className="leading-tight">
              <p className="font-serif text-[12px] font-bold text-[#013975] tracking-widest uppercase">Seedling</p>
              <p className="text-[8px] text-gray-400 tracking-[0.2em] uppercase">Modern High School</p>
            </div>
          </Link>
          <button
            onClick={() => { setIsMobileOpen(false); setMobileExpanded(null); }}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const hasChildren = !!item.children;
            const isExpanded = mobileExpanded === item.name;

            return (
              <div key={item.name} className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => { if (!hasChildren) { setIsMobileOpen(false); setMobileExpanded(null); } }}
                    className={`flex-1 px-5 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors ${
                      isActive ? "text-[#034ea2]" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                      className="px-5 py-4 text-gray-400"
                      aria-label="Toggle submenu"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-items */}
                {hasChildren && isExpanded && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {item.children!.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => { setIsMobileOpen(false); setMobileExpanded(null); }}
                        className="flex items-center gap-3 px-7 py-3.5 text-[11.5px] text-gray-500 hover:text-[#034ea2] border-b border-gray-100/80 last:border-0 transition-colors"
                      >
                        <div className="w-1 h-1 rounded-full bg-[#a3123f] flex-shrink-0" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom CTA + icons */}
        <div className="border-t border-gray-100 px-5 py-4">
          <button
            onClick={() => { setIsMobileOpen(false); setMobileExpanded(null); openEnquiry(); }}
            className="block w-full text-center py-3.5 bg-[#a3123f] hover:bg-[#8a0f34] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-lg transition-colors"
          >
            Enquire Now
          </button>

          <div className="flex items-center justify-around pt-4">
            <a href="tel:+919587772837" className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Call</span>
            </a>
            <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Email</span>
            </a>
            <a href="/contact-us" onClick={() => setIsMobileOpen(false)} className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Visit</span>
            </a>
          </div>
        </div>


      </div>

    </>
  );
}
