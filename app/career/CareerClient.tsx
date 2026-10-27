"use client";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

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
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAG / LABEL
───────────────────────────────────────────── */
function Tag({ children, color = "navy" }: { children: React.ReactNode, color?: "navy" | "crimson" | "mauve" }) {
  const styles = {
    navy: "bg-navy-light text-navy border-navy/20",
    crimson: "bg-crimson/10 text-crimson border-crimson/20",
    mauve: "bg-mauve/10 text-mauve border-mauve/20",
  };
  return (
    <span className={`inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4 font-dm ${styles[color]}`}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   CMS TYPES (see page.tsx -- page_content /career)
───────────────────────────────────────────── */
export type CmsJobRole = {
  id: number;
  title: string;
  board: string;
  type: string;
  location: string;
  desc: string;
  tags: string[];
  urgent: boolean;
};

export type CmsWhyWork = {
  icon: string;
  title: string;
  desc: string;
};

export type CmsPerk = {
  title: string;
  desc: string;
  image: string;
};

export type CmsTestimonial = {
  name: string;
  img: string;
  quote: string;
};

export type CmsQualification = { label: string; sub: string };
export type CmsExperience = { label: string; sub: string };

// The original page authored each "why work" icon as inline SVG JSX.
// lucide components aren't involved here, but the same
// string-key-plus-lookup pattern from EventsClient's ICONS applies: the CMS
// stores a string key (custom.icon in the source array), and this lookup
// reconstructs the exact original SVG markup client-side.
const ICON_SVGS: Record<string, React.ReactNode> = {
  book: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  people: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "trending-up": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  "shield-check": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   JOB CARD COMPONENT
───────────────────────────────────────────── */
function JobCard({
  role,
  onApply,
}: {
  role: CmsJobRole;
  onApply: (role: CmsJobRole) => void;
}) {
  return (
    <div className="group bg-white border border-sand/40 rounded-2xl p-7 hover:shadow-xl hover:border-navy-deeper/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {role.urgent && (
            <span className="bg-sand/10 text-crimson border border-crimson/20 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
              Urgent
            </span>
          )}
          <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${role.type === "Teaching"
            ? "bg-navy-light text-navy border-navy/20"
            : "bg-mauve/10 text-mauve border-mauve/20"
            }`}>
            {role.type}
          </span>
        </div>
        <span className="text-text-light text-xs flex items-center gap-1.5 font-dm">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {role.location}
        </span>
      </div>

      <h3 className="font-playfair text-2xl font-semibold text-navy-deeper mb-1 group-hover:text-navy transition-colors duration-200">
        {role.title}
      </h3>
      <p className="text-crimson text-sm font-black tracking-widest uppercase mb-4 font-dm">{role.board}</p>

      <p className="text-text-light text-sm leading-[1.9] mb-6 font-dm font-light">{role.desc}</p>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {role.tags.map((t) => (
            <span key={t} className="bg-sand/10 text-text-light text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full font-dm">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onApply(role)}
          className="inline-flex items-center gap-2 bg-navy-deeper hover:bg-navy-dark text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-navy-deeper/30 hover:gap-3 font-dm"
        >
          Apply Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APPLICATION MODAL
───────────────────────────────────────────── */
function ApplyModal({
  role,
  onClose,
  qualifications,
  experiences,
}: {
  role: CmsJobRole | null;
  onClose: () => void;
  qualifications: CmsQualification[];
  experiences: CmsExperience[];
}) {
  const [form, setForm] = useState({
    name: "", jobType: "", qualification: "", email: "", mobile: "",
    experience: "", subject: "", board: "", classes: "", cvName: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [role]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!role) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!cvFile) {
        setError("Please attach your CV or resume.");
        setSubmitting(false);
        return;
      }
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("qualification", form.qualification);
      fd.append("email", form.email);
      fd.append("mobile", form.mobile);
      fd.append("experience", form.experience);
      fd.append("subject", form.subject);
      fd.append("board", form.board);      fd.append("jobType", form.jobType);
      fd.append("classes", form.classes);
      fd.append("role", role.title);
      if (cvFile) fd.append("cv", cvFile);

      const res = await fetch("/api/career", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#F0EDE8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 bg-white border-b border-sand/30 px-8 py-5 rounded-t-3xl flex items-start justify-between gap-4">
          <div>
            <p className="text-crimson text-xs font-black tracking-widest uppercase mb-1 font-dm">
              Interest Form
            </p>
            <h3 className="font-playfair text-xl font-semibold text-navy-deeper leading-snug">
              {role.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-sand/10 hover:bg-red-50 hover:text-red-500 flex items-center justify-center flex-shrink-0 transition-colors duration-200 text-text-light text-lg mt-0.5"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-10">
              <span className="text-6xl block mb-4">🌱</span>
              <p className="font-playfair text-2xl font-semibold text-navy-deeper mb-2">
                Thank You!
              </p>
              <p className="text-text-light text-sm leading-relaxed font-dm">
                We've received your interest. Our HR team will reach out as soon as we open our recruitments.
              </p>
              <button
                onClick={onClose}
                className="mt-8 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[#777] text-sm leading-relaxed mb-2">
                Fill in your details and we will reach out as soon as we open our recruitments.
              </p>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Full Name *
                </label>
                <input
                  required type="text" placeholder="Your full name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] placeholder-[#CCC] focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Educational Qualification *
                </label>
                <select
                  required value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                >
                  <option value="">Select qualification</option>
                  {qualifications.map((q) => (
                    <option key={q.label} value={q.label}>{q.label}</option>
                  ))}
                </select>
              </div>

              {/* Email + Mobile */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                    Email *
                  </label>
                  <input
                    required type="email" placeholder="your@email.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] placeholder-[#CCC] focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                    Mobile *
                  </label>
                  <input
                    required type="tel" placeholder="+91 XXXXX XXXXX"
                    value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] placeholder-[#CCC] focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Experience *
                </label>
                <select
                  required value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                >
                  <option value="">Select experience</option>
                  {experiences.map((ex) => (
                    <option key={ex.label} value={ex.label}>{ex.label}</option>
                  ))}
                  <option value="Any other">Any other</option>
                </select>
              </div>

              {/* Teaching Subject */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Teaching Subject
                </label>
                <input
                  type="text" placeholder="e.g. Mathematics, Science, English…"
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] placeholder-[#CCC] focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                />
              </div>
              {/* Role type -- the legacy seedlingschools.com form required
                  this and both rebuilt forms had dropped it, so applications
                  arrived with no indication of teaching vs administrative. */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Role Type *
                </label>
                <select
                  required value={form.jobType}
                  onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                >
                  <option value="">Select</option>
                  <option>Teaching</option>
                  <option>Administrative</option>
                  <option>Any other</option>
                </select>
              </div>



              {/* Board + Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                    Board *
                  </label>
                  <select
                    required value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                  >
                    <option value="">Select</option>
                    <option>CBSE</option>
                    <option>Any other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                    Classes Taught
                  </label>
                  <select
                    value={form.classes}
                    onChange={(e) => setForm({ ...form, classes: e.target.value })}
                    className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1C1C1E] bg-white focus:outline-none focus:border-navy-light focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                  >
                    <option value="">Select</option>
                    <option>Primary (I–V)</option>
                    <option>Middle (VI–VIII)</option>
                    <option>Senior (IX–XII)</option>
                    <option>Any other</option>
                  </select>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#555] tracking-wide uppercase mb-1.5">
                  Upload CV / Resume *
                </label>
                <label className="flex items-center gap-4 border-2 border-dashed border-[#E8E3DA] hover:border-navy-light rounded-xl px-5 py-4 cursor-pointer transition-colors duration-200 group">
                  <div className="w-10 h-10 bg-navy/5 group-hover:bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#555] font-medium">
                      {form.cvName || "Click to upload PDF, DOC, DOCX"}
                    </p>
                    <p className="text-xs text-[#AAA] mt-0.5">Max 5MB</p>
                  </div>
                  <input
                    type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      // The 5MB and file-type rules were shown in the UI but
                      // never applied. The API enforces them too -- this is
                      // only so the user finds out before uploading.
                      if (f && f.size > 5 * 1024 * 1024) {
                        setError("Your CV must be under 5MB.");
                        e.target.value = "";
                        return;
                      }
                      if (f && !/\.(pdf|doc|docx)$/i.test(f.name)) {
                        setError("Your CV must be a PDF, DOC or DOCX file.");
                        e.target.value = "";
                        return;
                      }
                      setError("");
                      setCvFile(f);
                      setForm({ ...form, cvName: f?.name || "" });
                    }}
                  />
                </label>
              </div>

              {error && <p className="text-red-500 text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-navy-deeper hover:bg-navy-dark text-white py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-navy-deeper/30 font-dm disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Interest Form →"}
              </button>
              <p className="text-[#AAA] text-xs text-center">
                We'll reach out as soon as we open our recruitments · No spam
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
type CareerClientProps = {
  openRoles: CmsJobRole[];
  whyWork: CmsWhyWork[];
  perks: CmsPerk[];
  testimonials: CmsTestimonial[];
  qualifications: CmsQualification[];
  experiences: CmsExperience[];
};

export default function CareerClient({
  openRoles,
  whyWork,
  perks,
  testimonials,
  qualifications,
  experiences,
}: CareerClientProps) {
  const [selectedRole, setSelectedRole] = useState<CmsJobRole | null>(null);
  const [openGeneral, setOpenGeneral] = useState(false);

  const generalRole: CmsJobRole = {
    id: 0,
    title: "General Application — All Roles",
    board: "CBSE / Administrative",
    type: "Teaching",
    location: "Durgapura, Jaipur",
    desc: "Send us your details and resume. We'll reach out when a suitable opportunity opens.",
    tags: ["Open Application"],
    urgent: false,
  };

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/NCC.webp"
        objectPosition="center 75%"
        title="Careers"
        badge="Join Our Team"
        breadcrumbs={[{ label: "Careers" }]}
      />
      <ApplyModal
        role={selectedRole ?? (openGeneral ? generalRole : null)}
        onClose={() => { setSelectedRole(null); setOpenGeneral(false); }}
        qualifications={qualifications}
        experiences={experiences}
      />

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      {false && <section className="bg-navy-deeper text-white py-8 border-y border-sand/20">

         <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-center mb-8">
        <div className="max-w-2xl text-center">
          <h1 className="font-playfair text-sand font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Career Opportunities at Seedling
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
            Not Just a Job. A Journey of Impact, Growth & Excellence.
          </p>
        </div>
      </div>
        <div className="max-w-5xl mx-auto md:px-6">
          <div className="grid grid-cols-3 md:grid-cols-5 divide-x divide-sand/20">
            {[
              { value: "2", label: "Schools" },
              { value: "20,000+", label: "Students" },
              { value: "20:1", label: "Teacher Ratio" },
              { value: "100%", label: "Board Results" },
              { value: "1993", label: "Est." },
            ].map((s) => (
              <div key={s.label} className="px-4 py-4 text-center">
                <p className="font-playfair text-3xl md:text-4xl font-semibold text-sand">{s.value}</p>
                <p className="text-white/60 text-[10px] font-black mt-1 tracking-[0.2em] uppercase font-dm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ══════════════════════════════════════════════════
          2. WHY WORK WITH US
      ══════════════════════════════════════════════════ */}
      <section className="py-14 max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <Tag>Why Seedling</Tag>
          <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper">
            Why Work<br />
            <em className="font-semibold text-crimson">With Us</em>
          </h2>
          <p className="text-text-light mt-5 max-w-lg mx-auto leading-relaxed font-dm font-light">
            More than a job — a calling. Teaching at Seedling means becoming part of a 33+ year legacy of educational excellence and community.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyWork.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="group bg-white border border-sand/40 rounded-2xl p-7 hover:shadow-lg hover:border-navy-deeper/20 hover:-translate-y-0.5 transition-all duration-300 h-full">
                <div className="w-11 h-11 bg-sand/10 group-hover:bg-crimson border border-sand/40 group-hover:border-crimson rounded-xl flex items-center justify-center text-crimson group-hover:text-white transition-all duration-300 mb-5 flex-shrink-0">
                  {ICON_SVGS[w.icon] ?? ICON_SVGS.book}
                </div>
                <h4 className="font-playfair text-xl font-semibold text-navy-deeper mb-3">{w.title}</h4>
                <p className="text-text-light text-sm leading-[1.9] font-dm font-light">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#E8E3DA]" />
      </div>

      {/* ══════════════════════════════════════════════════
          PERKS & BENEFITS
      ══════════════════════════════════════════════════ */}
      <section className="py-14 bg-crimson relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 600 800" className="w-full h-full">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="300" fill="#D6D1CF" fontFamily="serif" fontWeight="900">"</text>
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <span className="text-sand text-sm uppercase tracking-[0.3em] font-medium">Benefits</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-black text-white mt-3 leading-[1.1] tracking-tight">
              Perks of Working<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand to-white/60">At Seedling</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 80}>
                <div className="group bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={perk.image}
                      alt={perk.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h4 className="font-playfair text-xl font-semibold text-white mb-3">{perk.title}</h4>
                    <p className="text-white/70 text-sm leading-[1.9] font-dm font-light">{perk.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#E8E3DA]" />
      </div>

      {/* ══════════════════════════════════════════════════
          3. JOB LISTINGS
      ══════════════════════════════════════════════════ */}
      <section id="openings" className="pt-16 pb-10 max-w-5xl mx-auto px-6">
        <Reveal className="mb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Tag>Current Openings</Tag>
              <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper">
                Open<br />
                <em className="font-semibold text-navy">Positions</em>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-text-light text-sm max-w-xs leading-relaxed font-dm font-light">
                All Subjects · All Classes<br />Teaching and Administrative Roles<br />CBSE
              </p>
            </div>
          </div>
        </Reveal>

        {/* filter pills */}
        <Reveal className="mb-10">
          <div className="flex gap-3 flex-wrap">
            {["All Roles", "Teaching", "Administrative", "Sports", "Creative"].map((f, i) => (
              <button
                key={f}
                className={`text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 font-dm ${i === 0
                  ? "bg-navy-deeper text-white border-navy-deeper"
                  : "bg-white text-text-light border-sand/40 hover:border-navy/20 hover:text-navy"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* job cards */}
        <div className="space-y-5">
          {openRoles.map((role, i) => (
            <Reveal key={role.id} delay={i * 80}>
              <JobCard role={role} onApply={setSelectedRole} />
            </Reveal>
          ))}
        </div>

        {/* inline note */}
        <Reveal className="mt-10">
          <div className="bg-sand/10 border border-sand/30 rounded-2xl px-7 py-5 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">📌</span>
            <div>
              <p className="font-black text-navy-deeper text-xs tracking-widest uppercase mb-1 font-dm">How Applications Work</p>
              <p className="text-text-light text-sm leading-relaxed font-dm font-light">
                Fill in the Interest Form with your details and CV. We will reach out as soon as we open our recruitments. All roles are based at our Durgapura campus.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════
          TEACHER VOICES
      ══════════════════════════════════════════════════ */}
      <section className="pt-16 pb-10 bg-[#034ea2]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[#d6d1cf] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Voices from Inside</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-white">
              What Our Educators<br />
              <em className="font-semibold text-[#d6d1cf]">Have to Say</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="group bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-3 right-6 font-playfair text-[7rem] leading-none text-[#d6d1cf]/20 font-bold select-none pointer-events-none">
                    "
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover object-top border-2 border-[#d6d1cf]/40 flex-shrink-0"
                    />
                    <div>
                      <p className="font-playfair font-semibold text-lg text-white">{t.name}</p>
                      <p className="text-[#d6d1cf] text-[10px] font-black tracking-widest uppercase font-dm">Seedling Educator</p>
                    </div>
                  </div>
                  <blockquote className="font-playfair italic text-xl font-light text-white/80 leading-[1.7] relative z-10">
                    "{t.quote}"
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. GENERAL APPLICATION
      ══════════════════════════════════════════════════ */}
      <section className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <Reveal>
              <Tag>Open Application</Tag>
              <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper mb-5 leading-tight">
                Don't See a<br />
                <em className="font-semibold text-navy">Role That Fits?</em>
              </h2>
              <p className="text-text-light leading-[1.9] mb-8 text-base font-dm font-light">
                We're always looking for passionate educators and professionals. Drop your details and CV with us — we'll keep your profile active and reach out when the right opportunity opens.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: "🎓", label: "All Subjects Welcome", sub: "Maths, Science, English, Arts, Commerce, Humanities and more" },
                  { icon: "📋", label: "Teaching & Admin", sub: "Both teaching and non-teaching roles considered" },
                  { icon: "🌏", label: "CBSE Board", sub: "Experience with CBSE board welcomed" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 p-4 bg-white border border-sand/40 rounded-xl hover:border-navy-deeper/20 transition-colors duration-200">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-black text-navy-deeper text-[11px] tracking-widest uppercase mb-1 font-dm">{item.label}</p>
                      <p className="text-text-light text-[10px] font-dm font-light">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setOpenGeneral(true)}
                className="inline-flex items-center gap-2 bg-navy-deeper hover:bg-navy-dark text-white px-8 py-4 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-300 hover:shadow-xl hover:shadow-navy-deeper/30 hover:gap-3 font-dm"
              >
                Send Your CV
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Reveal>

            {/* Right — contact info cards */}
            <Reveal delay={150}>
              <div className="space-y-5">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-6">
                  Or reach HR directly
                </p>

                {[
                  {
                    campus: "Durgapura Campus",
                    schools: "SMHS",
                    address: "Ashok Marg, Mahaveer Nagar-II, Durgapura, Jaipur – 302018",
                    phone: "+91 95877 72837",
                    landline: "0141-3624000",
                    email: "smhsjaipur@jnujaipur.ac.in",
                    color: "border-l-crimson",
                  },
                ].map((campus) => (
                  <div
                    key={campus.campus}
                    className={`bg-white border border-[#E8E3DA] border-l-4 ${campus.color} rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}
                  >
                    <p className="display font-semibold text-lg text-[#1C1C1E] mb-0.5">{campus.campus}</p>
                    <p className="text-navy text-xs font-semibold mb-4">{campus.schools}</p>
                    <div className="space-y-2 text-sm text-[#666]">
                      <p className="flex gap-2 items-start">
                        <span className="mt-0.5 flex-shrink-0">📍</span>
                        <span>{campus.address}</span>
                      </p>
                      <p className="flex gap-2 items-center">
                        <span>📞</span>
                        <a href={`tel:${campus.phone}`} className="text-navy hover:underline font-medium">{campus.phone}</a>
                      </p>
                      <p className="flex gap-2 items-center">
                        <span>☎️</span>
                        <span>{campus.landline}</span>
                      </p>
                      <p className="flex gap-2 items-center">
                        <span>✉️</span>
                        <a href={`mailto:${campus.email}`} className="text-navy hover:underline">{campus.email}</a>
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-[#F5F0E8] rounded-2xl p-5 text-center">
                  <p className="text-[#777] text-xs">
                    <strong className="text-[#555]">Office Hours</strong><br />
                    8:30 AM to 6:30 PM · Monday to Saturday
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#1C1C1E] relative overflow-hidden">
        <img
          src="/smhs_images/seedling_images/career.webp"
          alt="Join the Seedling team"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/95 to-crimson-dark/70" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-navy/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <Reveal>
            <p className="font-playfair text-sand text-xl italic mb-4 tracking-wide">
              Join the League
            </p>
            <h2 className="font-playfair text-white text-4xl md:text-5xl font-light leading-[1.05] mb-6">
              Reimagine<br />
              <em className="font-semibold text-sand">Education</em><br />
              With Us.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-12 max-w-md mx-auto">
              Fill in the Interest Form, drop your details, and you will hear from us as soon as we open our recruitments.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setOpenGeneral(true)}
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-10 py-5 rounded-full text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-crimson/30 hover:gap-4"
              >
                Submit Interest Form
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a
                href="tel:+919587772837"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white hover:text-[#1C1C1E] px-10 py-5 rounded-full text-sm tracking-widest uppercase font-semibold transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                "🏫 2 Campuses",
                "🎓 CBSE Board",
                "🌿 Est. 1993",
              ].map((b) => (
                <span
                  key={b}
                  className="bg-white/8 border border-white/15 text-white/50 text-xs px-5 py-2 rounded-full"
                >
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
