"use client";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${className}`}
    >
      {children}
    </div>
  );
}

// leaders is CMS-driven now: public.people rows with kind = 'board' (see
// page.tsx). name -> name, role -> designation, quote -> message,
// img -> photo, sub/tag -> custom.{sub,tag} (no dedicated columns for
// either on the people table).
export type CmsBoardMember = {
  id: string;
  name: string;
  designation: string | null;
  message: string | null;
  photo: string | null;
  custom: { sub?: string; tag?: string; [key: string]: unknown };
};

type ViewLeader = {
  name: string;
  role: string;
  sub: string;
  quote: string;
  img: string;
  tag: string;
};

function toViewLeader(person: CmsBoardMember): ViewLeader {
  return {
    name: person.name,
    role: person.designation ?? "",
    sub: (person.custom?.sub as string | undefined) ?? "Seedling Group of Institutions",
    quote: person.message ?? "",
    img: person.photo ?? "/smhs_images/seedling_images/leaders.webp",
    tag: (person.custom?.tag as string | undefined) ?? "",
  };
}

export default function LeadershipClient({ leaders: cmsLeaders }: { leaders: CmsBoardMember[] }) {
  const leaders = cmsLeaders.map(toViewLeader);
  return (
    <main className="bg-off-white text-text-base overflow-x-clip font-dm">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/leaders.webp"
        objectPosition="center 20%"
        title="Leadership"
        badge="Anchored In Purpose. Driven By A Vision"
        breadcrumbs={[{ label: "Leadership" }]}
      />

          <section className="py-10  bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-16">
            <p className="font-playfair text-navy text-xl italic mb-3">Our Torchbearers</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-light">
              The <em className="font-semibold">Leadership</em><br />Behind the Legacy
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 100}>
                <div className="group bg-off-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-sand">
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 right-4 bg-navy/90 text-white text-xs px-3 py-1 rounded-full font-dm">
                      {l.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-playfair text-2xl font-semibold text-text-base mb-1">{l.name}</h3>
                    <p className="text-navy text-sm font-medium mb-1 font-dm">{l.role}</p>
                    <p className="text-text-light text-xs mb-5 font-dm">{l.sub}</p>
                    <blockquote className="font-playfair italic text-text-light text-base leading-relaxed border-l-2 border-crimson-dark pl-4">
                      "{l.quote}"
                    </blockquote>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════════════
          DIRECTOR'S MESSAGE
      ══════════════════════════════════════════════════════════════ */}
      <section className=" bg-crimson">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-10 md:py-16  px-5 sm:px-6">
          <Reveal>
            <div className="relative">
              <img
                src="/smhs_images/seedling_images/director.webp"
                alt="Director, Seedling Group"
                className="w-full h-auto aspect-[4/3] object-cover rounded-2xl shadow-2xl object-top"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs border border-sand">
                <p className="font-playfair text-lg font-semibold text-text-base">Dr. Sandeep Bakshi</p>
                <p className="text-navy text-sm font-dm">CEO & Director, Seedling Group</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-playfair text-white text-xl italic mb-4">Director's Communiqué</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-light leading-tight mb-8 text-white">
                "Life Ready<br />
                &amp; <em className="font-semibold text-white">Life Worthy"</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-white/80 leading-[1.9] text-base mb-6 font-dm">
                At Seedling, we constantly reflect and recalibrate what school means in an age of deep uncertainty — rewriting the narrative to make learning relevant, contextual, and real.
              </p>
              <p className="text-white/80 leading-[1.9] text-base font-dm">
                From Play Group to University — your child, in our care, is promised a world of opportunities, memories, and milestones.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-white" />
                <span className="font-playfair italic text-xl text-white">Dr. Sandeep Bakshi</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRINCIPAL'S MESSAGE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-16 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="self-start md:sticky md:top-28">
            <Reveal>
              <div className="relative">
                <img
                  src="/leadership/SMHS_Principal_Nidhi.webp"
                  alt="Ms. Nidhi Adha, Principal Seedling Modern High School"
                  className="w-full h-auto aspect-[4/3] object-cover rounded-2xl shadow-2xl object-[center_15%]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs border border-sand">
                  <p className="font-playfair text-lg font-semibold text-text-base">Ms. Nidhi Adha</p>
                  <p className="text-navy text-sm font-dm">Principal, Seedling Modern High School</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="font-playfair text-navy text-xl italic mb-4">Principal's Message</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-text-light leading-[1.9] text-base mb-4 font-dm">
                At SEEDLING MODERN HIGH SCHOOL, we are dedicated to creating a nurturing and inspiring environment where every child is encouraged to learn, grow, and excel. As one of the best schools in Jaipur, we believe that education goes beyond textbooks and classrooms—it is about shaping character, building confidence, and preparing students for a successful future.
              </p>
              <p className="text-text-light leading-[1.9] text-base mb-4 font-dm">
                Our focus is on providing a balanced education that combines academic excellence with values, discipline, creativity, and life skills. With the support of our highly committed teachers, modern learning practices, and world-class facilities, we ensure that each student receives opportunities to discover and develop their unique potential.
              </p>
              <p className="text-text-light leading-[1.9] text-base mb-4 font-dm">
                We also encourage participation in sports, arts, leadership programs, and co-curricular activities to promote holistic growth. Our aim is to nurture responsible, compassionate, and confident individuals who are ready to contribute positively to society. At SEEDLING MODERN HIGH SCHOOL, we welcome every learner to be a part of our journey towards knowledge, excellence, and success.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-navy" />
                <span className="font-playfair italic text-xl text-text-light">Ms. Nidhi Adha</span>
              </div>
              <p className="text-navy text-sm font-dm mt-1">Principal, Seedling Modern High School</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
