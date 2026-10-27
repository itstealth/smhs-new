"use client";
import Link from "next/link";
import Image from "next/image";

const quickLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Mandatory Disclosures", href: "/mandatory-disclosures" },
  { label: "Privacy Policy", href: "/policies" },
  { label: "Download Brochure", href: "/SMHS_Prospectus.pdf", external: true },
  { label: "Blog", href: "/blog" },
  { label: "ERP Login", href: "/erp-login" },
  { label: "Career", href: "/career" },
];

// The group's other campuses. This school is deliberately absent — a footer
// linking to its own site is noise. Entries carry an href; previously they
// were plain text a visitor could not act on.
const institutions = [
  { name: "Seedling Public School", sub: "Jawahar Nagar · CBSE", href: "https://sps.seedlingschools.com" },
  { name: "Seedling International Academy", sub: "Jawahar Nagar · Cambridge", href: "https://cambridge.seedlingschools.com" },
  { name: "Seedling Modern International Academy", sub: "Durgapura · Cambridge", href: "https://cambridge.seedlingschools.com/smia" },
];

const contact = [
  { label: "Address", value: "Ashok Marg, Mahaveer Nagar-II,\nDurgapura, Jaipur 302018" },
  { label: "Mobile", value: "+91 95877 72837" },
  { label: "Landline", value: "0141-3624000" },
  { label: "Email", value: "smhsjaipur@jnujaipur.ac.in" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/smhsjaipur/?hl=en",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCJndN6j3ObAl8G1jbiY0TtA",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/SMHSJaipur/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f1f] text-white">

      {/* ── MAIN BODY ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 pt-20 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1px_1fr_1fr_1.1fr] gap-0">

          {/* Brand */}
          <div className="pr-0 lg:pr-16 pb-12 lg:pb-0">
            <div className="flex items-center gap-3 mb-10">
              <Image
                src="/logo.webp"
                alt="Seedling Modern High School"
                width={44}
                height={44}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div className="font-serif text-[15px] font-bold text-white leading-tight tracking-wide uppercase">
                Seedling<br />
                <span className="text-white/70 text-[11px] font-medium tracking-[0.12em]">Modern High School</span>
              </div>
            </div>

            <p className="text-white/50 text-[17px] lg:text-[19px] leading-[1.72] font-light max-w-sm mb-10">
              Dedicated to academic excellence and holistic growth since 1993. We empower the next generation of leaders with curiosity, character, and competence.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block bg-white/[0.06] mx-14" />

          {/* Quick Overview */}
          <div className="pt-12 lg:pt-0 pb-12 lg:pb-0 lg:px-10 border-t border-white/[0.06] lg:border-0">
            <h4 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
              Quick Overview
            </h4>
            <div className="w-8 h-[1.5px] bg-white/30 mb-7" />
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/45 text-[13.5px] hover:text-white transition-colors duration-200 leading-snug"
                    >
                      {l.label}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-50">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-white/45 text-[13.5px] hover:text-white transition-colors duration-200 leading-snug"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Institutions */}
          <div className="pt-12 lg:pt-0 pb-12 lg:pb-0 lg:px-10 border-t border-white/[0.06] lg:border-0">
            <h4 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
              Our Institutions
            </h4>
            <div className="w-8 h-[1.5px] bg-white/30 mb-7" />
            <ul className="space-y-5">
              {institutions.map((inst) => (
                <li key={inst.name}>
                  <a
                    href={inst.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-[13.5px] font-semibold leading-tight hover:text-white/70 transition-colors"
                  >
                    {inst.name}
                  </a>
                  <p className="text-white/30 text-[10.5px] tracking-[0.15em] uppercase mt-1">{inst.sub}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pt-12 lg:pt-0 lg:px-10 border-t border-white/[0.06] lg:border-0">
            <h4 className="text-white text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
              Contact
            </h4>
            <div className="w-8 h-[1.5px] bg-white/30 mb-7" />
            <ul className="space-y-6">
              {contact.map((c) => (
                <li key={c.label}>
                  <p className="text-white/30 text-[9.5px] tracking-[0.35em] uppercase mb-1.5">{c.label}</p>
                  <p className="text-white text-[13.5px] font-semibold leading-snug whitespace-pre-line">{c.label === "Email" ? <a href={"mailto:" + c.value}>{c.value}</a> : c.label === "Mobile" ? <a href="tel:+919587772837">{c.value}</a> : c.label === "Landline" ? <a href="tel:01413624000">{c.value}</a> : c.value}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-5 flex items-center justify-center gap-4">
          <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/25 text-xs flex-shrink-0">
            ©
          </div>
          <div className="text-center">
            <p className="text-white/40 text-[11.5px] font-medium">
              {new Date().getFullYear()} Seedling Modern High School.
            </p>
            <p className="text-white/30 text-[10px] mt-2">
              Design and developed by{" "}
              <a href="https://stealthdigital.in" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 underline">
                Stealth Digital
              </a>
            </p>
            <p className="text-white/20 text-[9.5px] tracking-[0.2em] uppercase mt-0.5">
              Nurturing Minds · Shaping Futures
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
