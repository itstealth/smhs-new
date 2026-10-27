"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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
  const { ref, visible } = useReveal();
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

// ─── Tag / Label ──────────────────────────────────────────────────────────────
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

// ─── CMS Types (see page.tsx -- page_content /curriculum) ──────────────────────
// Note: the original page's `curricula`, `achievements`, `faculty` and
// `joyride` consts were dead code -- defined but only ever referenced inside
// commented-out JSX sections -- so they were dropped rather than migrated.

export type CmsHighlight = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  icon: string;
};

export type CmsLearningApproach = {
  title: string;
  body: string;
  img: string;
  tag: string;
};

export type CmsLearnerProfile = {
  trait: string;
  desc: string;
  emoji: string;
  img: string;
};

type CurriculumClientProps = {
  highlights: CmsHighlight[];
  learningApproaches: CmsLearningApproach[];
  learnerProfile: CmsLearnerProfile[];
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CurriculumClient({ highlights, learningApproaches, learnerProfile }: CurriculumClientProps) {
  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/community.webp"
        title="Academic Excellence"
        subtitle="& Future-Ready Learning."
        badge="CBSE Curriculum"
        breadcrumbs={[{ label: "Academics" }, { label: "Curriculum" }]}
        height="large"
        overlayOpacity={0.6}
        objectPosition="center 80%"
      />

      {/* ══════════════════════════════════════════════════════
          2. CURRICULUM OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section className="pt-16 pb-8 max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          {/* <Tag color="navy">Curriculum Overview</Tag> */}
          <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper">
            <em className="font-semibold text-crimson">Curriculum</em>
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-editorial">
              <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                src="/smhs_images/seedling_images/student_looking_telescope.webp"
                alt="CBSE Curriculum at Seedling Schools"
                className="w-full h-full aspect-square object-cover"
              />
            </div>
            <div>
              {/* <div className="inline-block text-navy text-[10px] font-black tracking-[0.2em] uppercase mb-4 border border-navy/10 px-4 py-1 rounded-full font-dm">
                CBSE
              </div> */}
              <h3 className="font-playfair text-3xl md:text-4xl font-semibold text-navy-deeper mb-6 leading-snug">Central Board of Secondary Education</h3>
              <p className="text-text-light leading-[1.9] text-lg font-dm font-light mb-8">
                Affiliated with the Central Board of Secondary Education, our CBSE schools deliver a comprehensive, student-centric curriculum that cultivates values, ethics, and leadership qualities — creating a stress-free environment that boosts self-esteem and confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                {["CBSE Affiliated", "100% Board Results", "Personalised Learning"].map((h) => (
                  <span key={h} className="text-[10px] text-navy border border-navy/10 px-4 py-2 rounded-full font-black tracking-widest uppercase font-dm bg-white/50">{h}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. BUILT FOR THE FUTURE, ROOTED IN VALUES
      ══════════════════════════════════════════════════════ */}
      <section className="pt-16 md:pt-20 pb-8 bg-navy-deeper overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-sand uppercase mb-4 font-dm">
                <span className="w-8 h-px bg-sand" />
                What Makes Us Special
                <span className="w-8 h-px bg-sand" />
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">
                Built for the Future,
                <br />
                <span className="text-sand">Rooted in Values</span>
              </h2>
              <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto font-dm font-light">
                Our goal is to equip students with knowledge and skills they need to succeed while promoting their
                personal growth and character development.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item, i) => (
              <Reveal key={item.id} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden bg-stone-800 hover:bg-stone-700 transition-colors duration-300 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 via-navy-deeper/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-playfair text-base font-bold text-white leading-tight group-hover:text-sand transition-colors duration-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-dm font-light">{item.excerpt}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="mt-8 md:mt-16 border-t border-white/10 pt-12 text-center">
              <blockquote className="font-playfair text-xl md:text-2xl text-white italic max-w-3xl mx-auto leading-relaxed">
                "Part of the art of teaching is the ability to rearrange the world for students to guide them to see
                things in a new way."
              </blockquote>
              <cite className="text-sand text-[10px] font-black uppercase tracking-widest mt-4 block not-italic font-dm">
                — Sunny Decker
              </cite>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. LEARNING APPROACH (ZIG-ZAG)
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <Tag color="crimson">How We Teach</Tag>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper">
              Our Learning <em className="font-semibold text-navy">Approach</em>
            </h2>
          </Reveal>

          <div className="space-y-20">
            {learningApproaches.map((item, i) => (
              <Reveal key={item.title} delay={60}>
                <div className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                    <div className="relative overflow-hidden rounded-3xl shadow-editorial group border border-sand/30">
                      <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                        src={item.img}
                        alt={item.title}
                        className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                    <Tag color={i % 2 === 1 ? "mauve" : "navy"}>{item.tag}</Tag>
                    <h3 className="font-playfair text-3xl md:text-4xl font-semibold text-navy-deeper mb-6 leading-snug">{item.title}</h3>
                    <p className="text-text-light leading-[1.9] text-lg font-dm font-light">{item.body}</p>
                    <div className="mt-10 w-16 h-1 bg-sand rounded-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAMBRIDGE LEARNER PROFILE
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-navy-deeper text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-10 md:mb-16">
            {/* <span className="inline-block bg-sand/10 text-sand text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full border border-sand/20 mb-6 font-dm">
              Cambridge Learner Profile
            </span> */}
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-white">
              We train <em className="font-semibold text-sand">Seedlites</em> <span className="ml-2">to be.....</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
            {learnerProfile.map((lp, i) => (
              <Reveal key={lp.trait} delay={i * 80} className="h-full">
                <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-sand/40 transition-all duration-500 hover:-translate-y-2 text-center flex flex-col h-full">
                  <div className="h-44 flex-shrink-0 overflow-hidden relative">
                    <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                      src={lp.img}
                      alt={lp.trait}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      style={lp.trait === "Reflective" ? { objectPosition: "center 30%" } : {}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 to-transparent" />
                  </div>
                  <div className="p-6 px-4 flex flex-col flex-1 justify-between pb-8">
                    <div>
                      <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform duration-500">{lp.emoji}</span>
                      <h4 className="font-playfair text-2xl font-semibold text-sand mb-3">{lp.trait}</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed font-dm font-light">{lp.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
