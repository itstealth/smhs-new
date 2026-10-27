

"use client";

import React, { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  text: string;
}

// ─── ANIMATION HOOK ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMessage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" />
    <path d="M7 4H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3" /><path d="M17 4h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3" />
    <rect x="7" y="2" width="10" height="11" rx="1" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

// ─── SEEDLING IMAGE URLS ───────────────────────────────────────────────────────
const IMGS = {
  hero: "/smhs_images/seedling_images/student_looking_telescope_two.webp",
  intro: "/assets/img/techintegrate.webp",
  achievers: "/smhs_images/seedling_images/student_looking_telescope_three.webp",
  digital: "/assets/img/feature-2.webp",
  wellbeing: "/assets/img/feature-6.webp",
  school: "/smhs_images/seedling_images/primary.webp",
};

// ─── FEATURE CARDS DATA ───────────────────────────────────────────────────────
const CARDS: FeatureCard[] = [
  {
    icon: <IconBook />,
    title: "Remedial Classes",
    text: "Dedicated remedial classes help bridge learning gaps and strengthen core concepts for students who require additional academic help.",
  },
  {
    icon: <IconUser />,
    title: "Personalized Attention",
    text: "Teachers closely adapt their teaching strategies to suit individual learning styles, ensuring that no child is left behind.",
  },
  {
    icon: <IconMessage />,
    title: "Feedback Sessions",
    text: "Regular feedback sessions provide students and families with timely insights to continuously improve learning outcomes.",
  },
  {
    icon: <IconChart />,
    title: "Progress Monitoring",
    text: "Teachers closely monitor student progress and adjust strategies, ensuring each child receives the support they need.",
  },
];

// ─── SECTION FADE WRAPPER ─────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return null;
}

// ─── INTRO ────────────────────────────────────────────────────────────────────
function IntroSection() {
  const { ref, visible } = useInView();
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ background: "#f8f7f6" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-40px)", transition: "all 0.85s ease" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 rounded-full" style={{ background: "#A41546" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#A41546", fontFamily: "'DM Sans', sans-serif" }}>Our Philosophy</span>
            </div>
            <h2 className="font-bold mb-6 leading-tight" style={{ color: "#175190", fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', serif" }}>
              A Student-Centric Approach to Every Child's Journey
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#5a5a5a", fontFamily: "'DM Sans', sans-serif" }}>
              The learning support system at Seedling Modern High School, Durgapura, is designed to ensure that every student receives the guidance and encouragement needed to reach their full potential.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "#5a5a5a", fontFamily: "'DM Sans', sans-serif" }}>
              The school believes that each child learns differently, and therefore adopts a student-centric approach that caters to diverse learning needs and abilities.
            </p>
            <div className="mt-10 flex gap-10">
              {[["Student-Centric", "Approach"], ["Inclusive", "Environment"], ["Holistic", "Development"]].map(([a, b]) => (
                <div key={a}>
                  <div className="font-bold text-lg" style={{ color: "#175190", fontFamily: "'Playfair Display', serif" }}>{a}</div>
                  <div className="text-sm" style={{ color: "#896B85", fontFamily: "'DM Sans', sans-serif" }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* image */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(40px)", transition: "all 0.85s ease 0.2s" }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl" style={{ background: "linear-gradient(135deg, #17519020, #A4154615)", border: "1px solid #17519020" }} />
              <img src={IMGS.intro} alt="Classroom technology" className="relative w-full h-[480px] object-cover rounded-3xl shadow-2xl" />
              {/* floating badge */}
              <div className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-2xl" style={{ background: "#175190" }}>
                <div className="font-black text-4xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>33+</div>
                <div className="text-white/70 text-xs mt-1 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE CARDS ────────────────────────────────────────────────────────────
function FeatureCards() {
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ background: "#175190" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "#A41546" }} />
            <span className="text-sm font-semibold tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>How We Help</span>
            <div className="h-px w-12" style={{ background: "#A41546" }} />
          </div>
          <h2 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', serif" }}>
            The Support System
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <FadeIn key={card.title} delay={i * 120}>
              <div
                className="group relative rounded-2xl p-8 h-full cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: "linear-gradient(to right, #A41546, transparent)" }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white" style={{ background: "#A41546" }}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-white text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HIGH ACHIEVERS ───────────────────────────────────────────────────────────
function HighAchievers() {
  const { ref, visible } = useInView();
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ background: "#f8f7f6" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* image */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-40px)", transition: "all 0.85s ease" }}>
            <div className="relative">
              <img src={IMGS.achievers} alt="High achieving students" className="w-full h-[500px] object-cover rounded-3xl shadow-2xl" />
              <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, #17519066, transparent)" }} />
              {/* overlapping chips */}
              <div className="absolute bottom-8 left-8 flex flex-wrap gap-3">
                {["Olympiads", "Competitions", "Advanced Learning"].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: "rgba(164,21,70,0.85)", fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(40px)", transition: "all 0.85s ease 0.2s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 rounded-full" style={{ background: "#A41546" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#A41546", fontFamily: "'DM Sans', sans-serif" }}>Beyond the Classroom</span>
            </div>
            <h2 className="font-bold mb-6 leading-tight" style={{ color: "#175190", fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', serif" }}>
              Nurturing High Achievers
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#5a5a5a", fontFamily: "'DM Sans', sans-serif" }}>
              The school nurtures high achievers by providing enrichment opportunities, advanced learning resources, and participation in Olympiads and academic competitions. This balanced approach ensures that both support and challenge are provided where needed.
            </p>
            <div className="space-y-5">
              {[
                { icon: <IconTrophy />, label: "Olympiad Participation", desc: "National and international competitions" },
                { icon: <IconStar />, label: "Academic Competitions", desc: "Platforms to shine and excel" },
                { icon: <IconBrain />, label: "Advanced Resources", desc: "Enrichment beyond the curriculum" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "white", boxShadow: "0 2px 20px rgba(23,81,144,0.07)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#17519012", color: "#175190" }}>{item.icon}</div>
                  <div>
                    <div className="font-semibold" style={{ color: "#2c2c2c", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                    <div className="text-sm" style={{ color: "#896B85", fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MODERN LEARNING ──────────────────────────────────────────────────────────
function ModernLearning() {
  const { ref, visible } = useInView();
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ background: "#2c2c2c" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <FadeIn className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "#A41546" }} />
            <span className="text-sm font-semibold tracking-widest uppercase text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>Innovation in Education</span>
            <div className="h-px w-12" style={{ background: "#A41546" }} />
          </div>
          <h2 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', serif" }}>
            Modern Learning Approach
          </h2>
        </FadeIn>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-40px)", transition: "all 0.85s ease" }}>
            <p className="text-lg leading-relaxed mb-10 text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The integration of modern teaching tools, digital resources, and interactive methodologies further enhances the learning experience. The school also focuses on developing essential skills such as communication, critical thinking, and problem-solving.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "💻", label: "Digital Tools" },
                { icon: "🎯", label: "Interactive Methods" },
                { icon: "💬", label: "Communication" },
                { icon: "🔍", label: "Critical Thinking" },
                { icon: "⚙️", label: "Problem-Solving" },
                { icon: "📱", label: "Digital Resources" },
              ].map((item, i) => (
                <div key={item.label} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${i * 80 + 300}ms` }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white/70 text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* image */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(40px)", transition: "all 0.85s ease 0.2s" }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{ background: "linear-gradient(135deg, #A4154630, #17519030)" }} />
              <img src={IMGS.digital} alt="Modern learning facilities" className="relative w-full h-[500px] object-cover rounded-3xl" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WELLBEING ────────────────────────────────────────────────────────────────
function WellbeingSection() {
  const { ref, visible } = useInView();
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12" style={{ background: "#f0ebef" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.85s ease" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 rounded-full" style={{ background: "#896B85" }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#896B85", fontFamily: "'DM Sans', sans-serif" }}>More Than Academics</span>
            </div>
            <h2 className="font-bold mb-6 leading-tight" style={{ color: "#175190", fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', serif" }}>
              Emotional & Psychological Well-Being
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#5a5a5a", fontFamily: "'DM Sans', sans-serif" }}>
              Emotional and psychological well-being is another key aspect of the learning support system. A caring and approachable faculty, along with counselling support, helps students build confidence and manage academic pressures effectively.
            </p>
            <div className="space-y-4">
              {[
                { icon: <IconHeart />, label: "Emotional Support", color: "#A41546" },
                { icon: <IconUser />, label: "Counselling Support", color: "#175190" },
                { icon: <IconStar />, label: "Confidence Building", color: "#896B85" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                  <span className="font-semibold text-lg" style={{ color: "#2c2c2c", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* image */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.85s ease 0.25s" }}>
            <div className="relative">
              <img src={IMGS.wellbeing} alt="Student well-being" className="w-full h-[520px] object-cover rounded-3xl shadow-2xl" />
              {/* mauve overlay badge */}
              <div className="absolute top-8 -right-6 rounded-2xl p-6 shadow-2xl" style={{ background: "#896B85", maxWidth: "200px" }}>
                <div className="text-white/90 text-sm font-medium leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  "A caring faculty that truly understands every child"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SUMMARY / CTA ────────────────────────────────────────────────────────────
function Summary() {
  return (
    <section className="relative pt-16 pb-10 overflow-hidden" style={{ background: "#175190" }}>
      {/* decorative rings */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10 border border-white" />
      <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full opacity-10 border border-white" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-5 border border-white" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 50%, #A4154615 100%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: "#A41546" }} />
            <span className="text-sm font-semibold tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Promise</span>
            <div className="h-px w-16" style={{ background: "#A41546" }} />
          </div>
          <h2 className="font-black text-white leading-none mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'Playfair Display', serif" }}>
            Every Student Feels<br />
            <span style={{ color: "#A41546" }}>Valued, Supported</span><br />
            & Motivated
          </h2>
          <p className="text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-14" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Overall, the learning support at Seedling Modern High School, Durgapura, creates an inclusive and encouraging environment where every student feels valued, supported, and motivated to succeed academically and personally.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/admissions#enquire"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-white text-base sm:text-lg shadow-xl"
              style={{ background: "#A41546", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s ease", boxShadow: "0 8px 30px rgba(164,21,70,0.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 40px rgba(164,21,70,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(164,21,70,0.4)"; }}
            >
              Apply for Admission 2026–27
            </a>
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg"
              style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.4)", color: "white", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              Learn More About SMHS
            </a>
          </div>
        </FadeIn>

        {/* stat row */}
        <FadeIn delay={300}>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-16 border-t border-white/15">
            {[["Inclusive", "Environment"], ["Holistic", "Growth"], ["Student-First", "Always"]].map(([a, b]) => (
              <div key={a} className="text-center">
                <div className="font-black text-5xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{a}</div>
                <div className="text-white/50 text-sm tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{b}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── GOOGLE FONTS LOADER ──────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LearningSupport() {
  return (
    <>
      <FontLoader />
      <main style={{ background: "#f8f7f6" }}>
        <HeroWrapper
          backgroundImage="/assets/img/sps-banner.webp"
          title="Learning Support"
          badge="Student Care"
          breadcrumbs={[{ label: "Learning Support" }]}
        />
        <IntroSection />
        <FeatureCards />
        <HighAchievers />
        <ModernLearning />
        <WellbeingSection />
        <Summary />
      </main>
    </>
  );
}