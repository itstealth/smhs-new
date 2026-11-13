"use client"

import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import HeroWrapper from "@/components/layout/HeroWrapper";

// ─── CMS Types (see page.tsx -- page_content /contact-us) ──────────────────────

export type CmsCampusMap = {
  id: number
  label: string
  address: string
  src: string
  link: string
}

export type CmsStat = { value: string; label: string }
export type CmsHour = { day: string; time: string; open: boolean }

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.15 6.15l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoCard({
  icon, iconBg, accent, label, children,
}: {
  icon: React.ReactNode
  iconBg: string
  accent: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-sand/40 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
      <div className="flex items-start gap-3 mb-5">
        <div className={`${iconBg} rounded-xl p-2.5 shrink-0`}>{icon}</div>
        <div className="pt-0.5">
          <span className="text-[10px] font-black text-text-light tracking-[0.2em] uppercase block mb-0.5 font-dm">
            {label}
          </span>
          <span className={`w-6 h-0.5 ${accent} rounded-full block`} />
        </div>
      </div>
      <div className="space-y-3 font-dm">{children}</div>
    </div>
  )
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-text-light font-black uppercase tracking-[0.2em] mb-0.5 font-dm">{label}</p>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ContactUsClientProps = {
  campusMaps: CmsCampusMap[]
  stats: CmsStat[]
  hours: CmsHour[]
}

export default function ContactUsClient({ campusMaps, stats, hours }: ContactUsClientProps) {
  const [activeMap, setActiveMap] = useState(0)
  const currentMap = campusMaps[activeMap]

  return (
    <main className="min-h-screen bg-off-white font-dm">

      {/* ── Accent bar ─────────────────────────────────────────────────────── */}
      <div className="h-1 bg-gradient-to-r from-navy via-crimson to-sand" />

      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/contact_us.webp"
        objectPosition="center 80%"
        title="Contact Us"
        subtitle="We'd love to hear from you."
        badge="Get In Touch"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-navy-deeper py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-white">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-playfair text-2xl font-bold">{value}</p>
                <p className="text-sand text-[10px] font-black mt-0.5 uppercase tracking-[0.2em] font-dm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT INFO CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      {/* <section className="pt-16 pb-10 md:pt-20 md:pb-12 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10px] font-black text-text-light tracking-[0.3em] uppercase mb-2 font-dm">
              Contact Information
            </p>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold text-navy-deeper"
            >
              Find us at every campus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <InfoCard icon={<PhoneIcon className="w-4 h-4" />} iconBg="bg-navy-light text-navy" accent="bg-navy" label="SMHS Campus">
              <ContactItem label="Mobile">
                <a href="tel:+919587772837" className="text-text-base text-sm font-semibold hover:text-crimson transition-colors">+91 95877 72837</a>
              </ContactItem>
              <ContactItem label="Landline">
                <a href="tel:01413624000" className="text-text-base text-sm font-semibold hover:text-crimson transition-colors">0141-3624000</a>
              </ContactItem>
            </InfoCard>

            <InfoCard icon={<PhoneIcon className="w-4 h-4" />} iconBg="bg-crimson/5 text-crimson" accent="bg-crimson" label="SMHS — Admissions">
              <ContactItem label="Mobile">
                <a href="tel:+919587772837" className="text-text-base text-sm font-semibold hover:text-navy transition-colors">+91 95877 72837</a>
              </ContactItem>
              <ContactItem label="Landline">
                <a href="tel:01413624000" className="text-text-base text-sm font-semibold hover:text-navy transition-colors">0141-3624000</a>
              </ContactItem>
            </InfoCard>

            <InfoCard icon={<EmailIcon className="w-4 h-4" />} iconBg="bg-sand/10 text-navy-deeper" accent="bg-sand" label="Email Us">
              <ContactItem label="SMHS">
                <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="text-text-base text-sm font-semibold hover:text-crimson transition-colors break-all">smhsjaipur@jnujaipur.ac.in</a>
              </ContactItem>
              <ContactItem label="Admissions">
                <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="text-text-base text-sm font-semibold hover:text-crimson transition-colors break-all">smhsjaipur@jnujaipur.ac.in</a>
              </ContactItem>
            </InfoCard>

            <InfoCard icon={<MapPinIcon className="w-4 h-4" />} iconBg="bg-navy-light text-navy" accent="bg-navy" label="SMHS Address">
              <ContactItem label="Location">
                <p className="text-text-base text-sm font-medium leading-snug">
                  Durgapura, Jaipur 302018
                </p>
              </ContactItem>
            </InfoCard>

            <InfoCard icon={<MapPinIcon className="w-4 h-4" />} iconBg="bg-crimson/5 text-crimson" accent="bg-crimson" label="SMHS Address">
              <ContactItem label="Location">
                <p className="text-text-base text-sm font-medium leading-snug">
                  Ashok Marg, Mahaveer Nagar II,<br />Durgapura, Jaipur 302018
                </p>
              </ContactItem>
            </InfoCard>

            <InfoCard icon={<ClockIcon className="w-4 h-4" />} iconBg="bg-sand/10 text-navy-deeper" accent="bg-sand" label="Office Hours">
              <ContactItem label="Mon – Fri">
                <p className="text-text-base text-sm font-semibold">8:30 AM – 6:30 PM</p>
              </ContactItem>
              <ContactItem label="Saturday">
                <p className="text-text-base text-sm font-semibold">8:30 AM – 2:00 PM</p>
              </ContactItem>
              <ContactItem label="Sunday">
                <p className="text-text-light text-sm font-medium">Closed</p>
              </ContactItem>
            </InfoCard>

          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="contact-form" className="py-12 md:py-16 bg-white border-y border-sand/40 scroll-mt-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left copy */}
            <div>
              <p className="text-[10px] font-black text-text-light tracking-[0.3em] uppercase mb-3 font-dm">Send a Message</p>
              <h2
                className="font-playfair text-3xl md:text-4xl font-bold text-navy-deeper mb-5 leading-tight"
              >
                We&apos;ll get back to you<br />within one working day.
              </h2>
              <p className="text-text-light text-base leading-relaxed mb-8 font-dm font-light">
                Fill in the form and our admissions team will be in touch shortly.
                You can also call us directly or walk in during office hours.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Admissions open for 2026–27 session',
                  'CBSE Board programmes available',
                  'Modern, innovative curriculum',
                  'Three decades of excellence in education',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-navy" />
                    </span>
                    <span className="text-text-base text-sm font-dm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Classroom photo */}
              <div className="relative rounded-2xl overflow-hidden h-52 border border-sand/40 shadow-sm">
                <Image
                  src="/assets/STELLAR SATURDAYS/4.webp"
                  alt="Students in a Seedling School classroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-sm font-bold font-dm drop-shadow">State-of-the-art learning environment</p>
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-widest font-dm">Seedling Schools, Jaipur</p>
                </div>
              </div>
            </div>

            {/* Right admissions form */}
            <div className="rounded-2xl border border-sand/40 bg-white p-5 shadow-sm md:p-7">
              <h3 className="font-playfair text-2xl font-bold text-navy-deeper mb-2">Online Admission Enquiry</h3>
              <p className="text-text-light text-sm mb-5 font-dm">Share your details and our admissions team will be in touch.</p>
              <div className="npf_wgts w-full" data-height="400px" data-w="1044b64843af99283fc04912e7ad8bec" style={{ minHeight: 400 }} />
              <Script src="https://ke9zpvp4xn.in4.widgets.nopaperforms.com/vemwgts.js" strategy="afterInteractive" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-[10px] font-black text-text-light tracking-[0.3em] uppercase mb-2 font-dm">Our Locations</p>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold text-navy-deeper"
            >
              Visit us on campus
            </h2>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            {campusMaps.map((campus, idx) => (
              <button
                key={campus.id}
                onClick={() => setActiveMap(idx)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-200 font-dm
                  ${activeMap === idx
                    ? 'bg-navy text-white border-navy shadow-lg'
                    : 'bg-white text-navy border-sand/40 hover:border-navy hover:bg-navy/5'
                  }`}
              >
                <MapPinIcon className="w-3.5 h-3.5" />
                {campus.label}
              </button>
            ))}
          </div>

          {currentMap && (
            <>
              <p className="text-text-light text-sm mb-6 flex items-start gap-2 font-dm font-light">
                <MapPinIcon className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                {currentMap.address}
              </p>

              <div className="rounded-3xl overflow-hidden border border-sand/40 shadow-xl aspect-square md:aspect-auto md:h-96 bg-sand/10">
                <iframe
                  key={currentMap.id}
                  src={currentMap.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${currentMap.label} Map`}
                />
              </div>

              <a
                href={currentMap.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black uppercase tracking-widest text-navy hover:text-crimson transition-colors underline underline-offset-4 font-dm"
              >
                <MapPinIcon className="w-3.5 h-3.5" />
                Get Directions on Google Maps
              </a>
            </>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOURS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white border-t border-sand/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

            <div>
              <p className="text-[10px] font-black text-text-light tracking-[0.3em] uppercase mb-2 font-dm">Availability</p>
              <h2
                className="font-playfair text-3xl font-bold text-navy-deeper mb-4 leading-tight"
              >
                When to reach us
              </h2>
              <p className="text-text-light text-sm leading-relaxed font-dm font-light">
                Our admissions and support teams are available during office hours
                across all campuses.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="bg-off-white rounded-2xl border border-sand/40 overflow-hidden mb-5">
                {hours.map(({ day, time, open }, i) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-6 py-4 ${i < hours.length - 1 ? 'border-b border-sand/40' : ''}`}
                  >
                    <span className="text-navy-deeper text-sm font-bold font-dm">{day}</span>
                    <span className={`text-sm font-black font-dm uppercase tracking-widest ${open ? 'text-crimson' : 'text-text-light'}`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+919587772837"
                  className="flex items-center gap-3 bg-navy-light hover:bg-navy/10 rounded-xl px-5 py-4 transition-colors duration-200"
                >
                  <PhoneIcon className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-navy uppercase tracking-widest font-dm">SMHS</p>
                    <p className="text-navy-deeper text-sm font-bold font-dm">+91 95877 72837</p>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-off-white border-t border-sand/40">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="relative bg-navy-deeper rounded-[2rem] overflow-hidden px-8 md:px-14 py-12 md:py-14 text-white"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white opacity-5" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 font-dm">
                  <svg className="w-4 h-4 text-sand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <span className="text-[10px] font-black tracking-widest uppercase">Admissions Open 2026–27</span>
                </div>

                <h2
                  className="font-playfair text-3xl md:text-4xl font-bold leading-tight mb-3 text-white"
                >
                  Ready to join the<br />Seedling family?
                </h2>
                <p className="text-white/75 text-base leading-relaxed font-dm font-light">
                  Visit any of our campuses or start your online application today.
                  Three decades of excellence — and a future built for your child.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0 font-dm">
                <a
                  href="/admissions#enquire"
                  className="inline-flex items-center justify-center gap-2 bg-sand text-navy-deeper font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Enquire Now
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                {/* <a
                  href="/admissions#enquire"
                  className="inline-flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 text-white border-2 border-white/30 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Apply Online
                </a> */}
              </div>
            </div>
          </div>


        </div>
      </section>

    </main>
  )
}
