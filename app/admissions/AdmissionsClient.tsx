"use client";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

/* ─────────────────────────────────────────────
   CMS PROP TYPES
   whyUs / steps / documents / galleryImages / transport / campusLocations /
   requisites / stats all come from public.page_content (page_path
   /admissions, see page.tsx) -- these were plain hardcoded arrays before,
   with no shared shape with any other collection. Icons here are emoji
   strings already (not lucide components), so no ICONS lookup is needed --
   they render as-is.
───────────────────────────────────────────── */
export type StatItem = { target: number | null; suffix?: string; display?: string; label: string };
export type WhyUsItem = { icon: string; title: string; desc: string };
export type StepItem = { num: string; title: string; desc: string; icon: string };
export type DocumentItem = { doc: string; note: string };
export type GalleryImage = { src: string; alt: string; caption: string; tag: string };
export type TransportItem = { icon: string; title: string; desc: string };
export type CampusLocation = {
  name: string;
  address: string;
  phone: string;
  schools: string[];
  mapSrc: string;
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAG LABEL — same as Academics page
───────────────────────────────────────────── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-sand/10 text-crimson text-xs font-black tracking-[0.3em] uppercase px-5 py-2 rounded-full border border-sand/20 mb-6 font-dm">
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function AdmissionsClient({
  stats,
  requisites,
  whyUs,
  steps,
  documents,
  galleryImages,
  transport,
  campusLocations,
}: {
  stats: StatItem[];
  requisites: string[];
  whyUs: WhyUsItem[];
  steps: StepItem[];
  documents: DocumentItem[];
  galleryImages: GalleryImage[];
  transport: TransportItem[];
  campusLocations: CampusLocation[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [formData, setFormData] = useState({
    candidateName: "",
    className: "",
    parentName: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (steps.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveProcessStep((current) => (current + 1) % steps.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [steps.length]);

  const activeAdmissionStep = steps[activeProcessStep];

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      window.location.assign("/thank-you");
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <style>{`
        .duration-400 { transition-duration: 400ms; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease forwards; }
      `}</style>

      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/teaching_kids.webp"
        title="Admissions"
        subtitle="Begin your child's journey with Seedling — where excellence meets warmth."
        badge="Admissions Open · 2026-27"
        breadcrumbs={[{ label: "Admissions" }]}
        height="large"
        overlayOpacity={0.4}
      />

      {/* STATS BAND — matches Contact Us page exactly */}
      <section className="bg-navy-deeper py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-playfair text-2xl font-bold">
                  {s.target !== null
                    ? <AnimatedCounter target={s.target!} suffix={s.suffix} />
                    : s.display}
                </p>
                <p className="text-sand text-[10px] font-black mt-0.5 uppercase tracking-[0.2em] font-dm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. ONLINE ADMISSION INQUIRY FORM
      ══════════════════════════════════════════════════ */}
      <section id="enquire" className="pt-14 pb-8 max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.1] tracking-tight">
           Admission
            <span className="text-crimson ml-4">Inquiry</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Requisites */}
          <Reveal>
            <div className="bg-white border border-sand/20 rounded-3xl p-10 shadow-sm">
              <h3 className="font-playfair text-2xl font-black text-navy-deeper mb-8 tracking-tight">
                Requisites for Online Application
              </h3>
              <ul className="space-y-5">
                {requisites.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 bg-sand/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-crimson text-sm font-black">{i + 1}</span>
                    </span>
                    <span className="text-navy-deeper font-dm text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-sand/5 rounded-2xl border border-sand/20">
                <p className="text-navy-deeper font-dm text-sm leading-relaxed">
                  <span className="font-black text-crimson">Note:</span> There are no direct admissions in Class 10th and 12th except as per CBSE bye-laws. Admissions in Classes 9th & 11th will only be done after the student clears the entrance examination.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-sand/10">
                <p className="text-[10px] font-black text-black tracking-[0.3em] uppercase mb-5">Call Us For Admission</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-crimson/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🏫</span>
                    </span>
                    <div>
                      <p className="text-navy-deeper text-sm font-black font-dm">Durgapura Campus</p>
                      <a href="tel:+919587772837" className="text-crimson font-playfair font-black text-lg hover:text-crimson-dark transition-colors">+91-9587772837</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal delay={100}>
            <div className="bg-white border border-sand/20 rounded-3xl p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-6">🎉</span>
                  <h3 className="font-playfair text-2xl font-black text-navy-deeper mb-3">Thank You!</h3>
                  <p className="text-text-light font-dm mb-6">Your admission inquiry has been submitted. Our team will contact you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setFormData({ candidateName: "", className: "", parentName: "", email: "", phone: "", school: "", message: "" }); }} className="text-crimson font-black text-sm hover:underline uppercase tracking-widest">Submit Another Inquiry</button>
                </div>
              ) : (
                <>
              <h3 className="font-playfair text-2xl font-black text-navy-deeper mb-2 tracking-tight">Online Admission Inquiry</h3>
              <p className="text-text-light text-sm font-dm mb-8">Fill in the form below and our team will get back to you.</p>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Candidate Name <span className="text-crimson">*</span>
                  </label>
                  <input type="text" required placeholder="Enter candidate name" value={formData.candidateName} onChange={handleFormChange("candidateName")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Select Class <span className="text-crimson">*</span>
                  </label>
                  <select required value={formData.className} onChange={handleFormChange("className")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm">
                    <option value="">Select Class</option>
                    <option value="Play Group">Play Group</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Prep">Prep</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 11">Class 11</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Parent's Name <span className="text-crimson">*</span>
                  </label>
                  <input type="text" required placeholder="Enter parent's name" value={formData.parentName} onChange={handleFormChange("parentName")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Email <span className="text-crimson">*</span>
                  </label>
                  <input type="email" required placeholder="Enter email address" value={formData.email} onChange={handleFormChange("email")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Mobile <span className="text-crimson">*</span>
                  </label>
                  <input type="tel" required placeholder="10-digit mobile number" maxLength={10} pattern="[6-9][0-9]{9}" title="Should start with 6, 7, 8 or 9 and be exactly 10 digits"
                    value={formData.phone} onChange={handleFormChange("phone")}
                    onInput={(e) => { (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10); }}
                    className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Select School <span className="text-crimson">*</span>
                  </label>
                  <select required value={formData.school} onChange={handleFormChange("school")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm">
                    <option value="">Select School</option>
                    <option value="Seedling Modern High School, Durgapura, Jaipur">Seedling Modern High School, Durgapura, Jaipur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-navy-deeper mb-1.5 tracking-[0.2em] uppercase font-dm">
                    Message <span className="text-crimson">*</span>
                  </label>
                  <textarea required rows={3} placeholder="Any specific queries or requirements..." value={formData.message} onChange={handleFormChange("message")} className="w-full rounded-xl px-4 py-3 text-text-base text-sm border border-sand/40 bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 font-dm resize-none" />
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-crimson hover:bg-crimson-dark disabled:opacity-60 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg">
                  {submitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section className="pt-14 pb-14 bg-crimson relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 600 800" className="w-full h-full">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="300" fill="#D6D1CF" fontFamily="serif" fontWeight="900">"</text>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <span className="text-sand text-sm uppercase tracking-[0.3em] font-medium">Why Seedling</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-white mt-3 leading-[1.1] tracking-tight">
              Six Reasons Parents<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand to-white/60">Choose Us</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="group bg-white/10 border border-white/20 rounded-3xl p-10 hover:bg-white/15 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sand/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-5xl mb-8 block transition-all duration-300">{w.icon}</span>
                  <h4 className="font-playfair text-2xl font-black text-white mb-4 tracking-tight">{w.title}</h4>
                  <p className="text-white/70 text-sm leading-[1.8] font-dm">{w.desc}</p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-0.5 bg-sand transform origin-left transition-all duration-500 group-hover:w-16" />
                    <span className="text-sand text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500">Excellence</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ADMISSION PROCESS TIMELINE
      ══════════════════════════════════════════════════ */}
      <section id="process" className="pt-14 pb-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <Tag>Admission Process</Tag>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.1] tracking-tight">
              Six Simple Steps<br />
              <span className="text-crimson">to Join Us</span>
            </h2>
            <p className="text-text-light mt-6 max-w-xl mx-auto leading-relaxed font-dm">
              We&apos;ve made the admission process as clear and frictionless as possible. Our team is with you at every step.
            </p>
          </Reveal>

          {/* Auto progress stepper */}
          {activeAdmissionStep && (
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <div className="relative mb-12">
                <div className="absolute left-5 right-5 top-5 h-1 rounded-full bg-sand/20 sm:top-7" />
                <div
                  className="absolute left-5 top-5 h-1 rounded-full bg-crimson transition-all duration-700 sm:top-7"
                  style={{ width: `calc((100% - 2.5rem) * ${activeProcessStep / (steps.length - 1)})` }}
                />
                <div className="relative z-10 grid grid-cols-6 gap-1 sm:gap-2">
                  {steps.map((step, i) => {
                    const active = i === activeProcessStep;
                    const complete = i < activeProcessStep;

                    return (
                      <button
                        key={step.num}
                        type="button"
                        onClick={() => setActiveProcessStep(i)}
                        className="group flex flex-col items-center gap-3 text-center"
                        aria-current={active ? "step" : undefined}
                      >
                        <span className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center font-playfair text-base sm:text-xl font-black shadow-sm transition-all duration-500 ${active ? "bg-crimson border-crimson text-white ring-4 sm:ring-8 ring-crimson/10 scale-110" : complete ? "bg-navy-deeper border-navy-deeper text-white" : "bg-white border-sand/30 text-navy-deeper"}`}>
                          {step.num}
                        </span>
                        <span className={`hidden sm:block text-[10px] font-black uppercase tracking-[0.18em] font-dm transition-colors duration-300 ${active ? "text-crimson" : "text-text-light"}`}>
                          Step
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div key={activeAdmissionStep.num} className="bg-off-white border border-sand/20 rounded-2xl p-7 md:p-10 shadow-[0_28px_70px_-40px_rgba(10,31,58,0.35)] transition-all duration-500">
                <div className="grid gap-8 md:grid-cols-[160px_1fr] md:items-center">
                  <div className="flex items-center gap-5 md:flex-col md:items-start">
                    <div className="w-20 h-20 bg-white border border-sand/20 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
                      {activeAdmissionStep.icon}
                    </div>
                    <div>
                      <p className="text-crimson text-xs font-black uppercase tracking-[0.24em] font-dm mb-2">
                        Step {activeAdmissionStep.num}
                      </p>
                      <p className="font-playfair text-5xl font-black text-navy-deeper/10 leading-none">
                        {activeAdmissionStep.num}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-playfair text-3xl md:text-4xl font-black text-navy-deeper leading-tight mb-5">
                      {activeAdmissionStep.title}
                    </h3>
                    <p className="text-text-light text-base leading-[1.85] font-dm max-w-3xl">
                      {activeAdmissionStep.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          )}

          {/* inline CTA after process */}
          <Reveal className="mt-16 text-center">
            <div className="bg-navy-deeper rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sand opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="font-dm text-sand text-lg font-black tracking-[0.2em] uppercase mb-4">Ready to take the first step?</p>
              <h3 className="font-playfair text-4xl md:text-5xl font-black mb-10 tracking-tight text-white">Start Your Application Today</h3>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/admissions#enquire"
                  className="bg-crimson text-white hover:bg-crimson-dark px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:shadow-2xl hover:shadow-crimson/40">
                  Fill Online Form
                </a>
                <a href="tel:+919587772837" className="border-2 border-white/20 text-white hover:bg-white hover:text-navy-deeper px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300">
                  Call +91 95877 72837
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. DOCUMENTS REQUIRED
      ══════════════════════════════════════════════════ */}
      <section className="pt-14 pb-8 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <Reveal>
            <Tag>Eligibility & Requirements</Tag>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.1] mb-8 tracking-tight">
              Documents<br />
              <span className="text-crimson">Required</span>
            </h2>
            <p className="text-text-light leading-[1.9] mb-10 font-dm">
              Please keep the following documents ready at the time of admission. For Class I and above, bring the marksheet or report card from the previous school. Original documents must be presented for verification.
            </p>
            <div className="bg-sand/10 border border-sand/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-crimson" />
              <p className="font-playfair text-2xl font-black text-navy-deeper mb-6 tracking-tight">📌 Important Notes</p>
              <ul className="space-y-4 text-sm text-text-light leading-relaxed font-dm">
                <li className="flex gap-3"><span className="text-crimson font-black">01</span>All applications must be submitted on the prescribed form with a non-refundable amount.</li>
                <li className="flex gap-3"><span className="text-crimson font-black">02</span>Re-admission is done in Class XI. All Class X students must re-apply.</li>
                <li className="flex gap-3"><span className="text-crimson font-black">03</span>Minimum age for Nursery/Playgroup: 3 years as of 31st March of the admission year.</li>
                <li className="flex gap-3"><span className="text-crimson font-black">04</span>Parent counselling is available both online and offline — we're here to help.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 gap-4">
              {documents.map((d, i) => (
                <div key={d.doc}
                  className="flex items-center gap-5 bg-white border border-sand/10 rounded-2xl px-6 py-5 hover:border-crimson hover:bg-off-white transition-all duration-300 group shadow-sm hover:shadow-lg">
                  <div className="w-10 h-10 bg-sand/10 group-hover:bg-crimson rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500">
                    <svg className="w-5 h-5 text-crimson group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-navy-deeper text-base font-black font-playfair tracking-tight">{d.doc}</p>
                    <p className="text-text-light text-xs mt-0.5 font-dm">{d.note}</p>
                  </div>
                  <span className="text-[10px] text-crimson bg-crimson/5 border border-crimson/10 px-3 py-1 rounded-full font-black uppercase tracking-widest flex-shrink-0">Required</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LIFE AT SEEDLING — GALLERY
      ══════════════════════════════════════════════════ */}
      <section className="pt-14 pb-8 bg-navy-deeper relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D6D1CF 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Reveal className="mb-10">
            <span className="text-sand text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">A Glimpse Inside</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-white leading-tight">
              Life at <em className="text-sand italic">Seedling</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <Reveal key={img.src} delay={i * 60}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block text-[9px] font-black tracking-[0.25em] uppercase text-sand mb-1 drop-shadow">{img.tag}</span>
                    <p className="font-playfair text-base text-white font-black drop-shadow">{img.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. TRANSPORT
      ══════════════════════════════════════════════════ */}
      <section className="pt-16 pb-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-20">
            <Tag>Transport Facility</Tag>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.1] tracking-tight">
              Safe & Reliable<br />
              <span className="text-crimson">School Transport</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {transport.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="bg-off-white border border-sand/20 rounded-3xl p-10 flex gap-8 hover:shadow-xl hover:border-sand/40 transition-all duration-500 group">
                  <span className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">{t.icon}</span>
                  <div>
                    <h4 className="font-playfair text-2xl font-black text-navy-deeper mb-3 tracking-tight">{t.title}</h4>
                    <p className="text-text-light text-sm leading-[1.9] font-dm">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Campus Maps — tabbed */}
          {campusLocations.length > 0 && (
          <Reveal>
            <div className="bg-white border border-sand/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* tab switcher */}
              <div className="flex border-b border-sand/10">
                {campusLocations.map((campus, i) => (
                  <button key={campus.name} onClick={() => setActiveTab(i)}
                    className={`flex-1 px-8 py-6 text-sm font-black transition-all duration-300 text-left uppercase tracking-widest ${activeTab === i ? "bg-navy-deeper text-white" : "bg-white text-text-light hover:bg-off-white"}`}>
                    <span className="block text-[10px] opacity-60 mb-1">Campus</span>
                    {campus.name}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2">
                {/* map iframe placeholder */}
                <div className="h-80 md:h-[500px] bg-navy-deeper relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/events/INVESTITURE%20CEREMONY/P1500918.webp')] bg-cover bg-center opacity-20 transition-transform duration-[10s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper via-navy-deeper/80 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8 z-10">
                    <div className="w-20 h-20 bg-sand/10 rounded-full flex items-center justify-center mb-2">
                      <span className="text-4xl">📍</span>
                    </div>
                    <p className="font-playfair text-3xl font-black text-white tracking-tight">{campusLocations[activeTab].name}</p>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs font-dm">{campusLocations[activeTab].address}</p>
                    <a href={`https://www.google.com/maps/search/${encodeURIComponent(campusLocations[activeTab].address)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-4 bg-sand text-navy-deeper hover:bg-white text-[10px] px-8 py-3.5 rounded-full font-black tracking-widest uppercase transition-all duration-300 hover:shadow-xl">
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>

                {/* campus info */}
                <div className="p-12 flex flex-col justify-between bg-white">
                  <div>
                    <p className="font-playfair text-4xl font-black text-navy-deeper mb-8 tracking-tight">{campusLocations[activeTab].name}</p>
                    <div className="space-y-6 mb-10">
                      <div className="flex gap-4 items-start">
                        <span className="w-10 h-10 bg-off-white rounded-xl flex items-center justify-center flex-shrink-0 text-xl border border-sand/10">📍</span>
                        <p className="text-text-light text-base leading-relaxed font-dm">{campusLocations[activeTab].address}</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="w-10 h-10 bg-off-white rounded-xl flex items-center justify-center flex-shrink-0 text-xl border border-sand/10">📞</span>
                        <a href={`tel:${campusLocations[activeTab].phone}`} className="text-crimson font-black text-lg font-playfair tracking-tight hover:text-crimson-dark transition-colors">
                          {campusLocations[activeTab].phone}
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-sand mb-5">Schools at this campus</p>
                      <div className="space-y-3">
                        {campusLocations[activeTab].schools.map(s => (
                          <div key={s} className="flex items-center gap-3 text-sm text-text-base font-dm font-medium">
                            <span className="w-2 h-2 bg-crimson rounded-full flex-shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-sand/10 flex gap-4">
                    <a href={`tel:${campusLocations[activeTab].phone}`}
                      className="flex-1 bg-navy-deeper hover:bg-navy-dark text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all duration-300">
                      Call Campus
                    </a>
                    <a href="#enquire"
                      className="flex-1 border-2 border-crimson text-crimson hover:bg-crimson/5 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all duration-300">
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CAMPUS VISIT CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden">
        <img
          src="/smhs_images/seedling_images/lab-stem.webp"
          alt="Book a campus visit"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/95 via-navy-deeper/80 to-crimson/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <Reveal>
            <p className="font-dm text-sand text-lg font-black tracking-[0.4em] mb-6 uppercase">Experience Seedling Firsthand</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-black leading-[1.05] mb-8 tracking-tighter text-white">
              Book a<br />
              <span className="text-sand">Campus Visit</span>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed mb-12 max-w-xl mx-auto font-dm font-light">
              Walk through our campuses, meet our teachers, and feel the Seedling difference. Parent counselling is available both online and offline. Come feel the buzz.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex gap-6 justify-center flex-wrap">
              <a href="tel:+919587772837"
                className="inline-flex items-center gap-3 bg-white text-navy-deeper hover:bg-sand px-12 py-5 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-300 hover:shadow-2xl">
                📞 Book a Visit
              </a>
              <a href="#enquire"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white hover:text-navy-deeper px-12 py-5 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-300">
                Enquire Online
              </a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                ["🏫", "In-Person", "Campus Tour"],
                ["💻", "Online", "Counselling"],
                ["📅", "Flexible", "Scheduling"],
                ["🆓", "Completely", "Free"],
              ].map(([icon, line1, line2]) => (
                <div key={line2} className="text-center group">
                  <div className="text-4xl block mb-3 group-hover:scale-125 transition-transform duration-500">{icon}</div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">{line1}<br />{line2}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-navy-deeper relative overflow-hidden">
        <img
          src="/smhs_images/seedling_images/learning_support.webp"
          alt="Join Seedling"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/90 to-navy/60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sand/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <Reveal>
            <p className="display text-sand text-xl italic mb-4">The Seedling Family Awaits</p>
            <h2 className="display text-4xl md:text-5xl font-light leading-[1.0] mb-6 text-white">
              Where Every{" "}
              <em className="font-semibold text-sand">Student</em>{" "}
              Matters.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Admissions are open for 2026–27. Seats are limited. Enrol your child today and give them the Seedling advantage — from Play Group to University.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/admissions#enquire"
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-10 py-5 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-crimson/30 hover:gap-4">
                Apply Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="tel:+919587772837"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white hover:text-navy-deeper px-10 py-5 rounded-full text-sm tracking-widest uppercase transition-all duration-300">
                Call Us Now
              </a>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {["🎓 CBSE Board", "🌿 Est. 1993", "📍 2 Campuses in Jaipur", "❤️ 20,000+ Students"].map((b) => (
                <span key={b} className="bg-white/8 border border-white/15 text-white/60 text-xs px-5 py-2 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
