"use client";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

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

// faculty "wing" cards are public.people rows with kind === 'faculty' and
// custom.group === 'faculty-page' (see scripts/import-smhs-academics.ts) --
// name -> name, subject -> designation, img -> photo.
export type CmsFacultyWing = {
  id: string;
  name: string;
  designation: string | null;
  photo: string | null;
  custom: { group?: string; [key: string]: unknown };
};

type ViewFaculty = { name: string; subject: string; img: string };

function toViewFaculty(person: CmsFacultyWing): ViewFaculty {
  return {
    name: person.name,
    subject: person.designation ?? "",
    img: person.photo ?? "/assets/img/feature-3.webp",
  };
}

export default function FacultyClient({ faculty: cmsFaculty }: { faculty: CmsFacultyWing[] }) {
  const faculty = cmsFaculty.map(toViewFaculty);

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Faculty"
        badge="Our Educators"
        breadcrumbs={[{ label: "Faculty" }]}
      />

      {/* Faculty Section */}
      <section className="pt-16 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <Tag color="mauve">Our Educators</Tag>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-navy-deeper">
              Faculty Who<br />
              <em className="font-semibold text-crimson">Inspire, Not Just Instruct</em>
            </h2>
            <p className="text-text-light mt-6 max-w-3xl mx-auto leading-relaxed text-lg font-dm font-light">
              Our dedicated teachers create a nurturing environment for student success. They foster rapport, understand individual needs, and set high standards for both character and academic achievement — preparing students not just for exams, but for life.
            </p>
          </Reveal>

          {faculty.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {faculty.map((f, i) => (
              <Reveal key={f.name} delay={i * 80}>
                <div className="group bg-off-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-editorial transition-all duration-700 hover:-translate-y-2 border border-sand/40">
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8">
                    <h4 className="font-playfair text-2xl font-semibold text-navy-deeper mb-2">{f.name}</h4>
                    <p className="text-crimson text-sm font-black tracking-widest uppercase font-dm">{f.subject}</p>
                    <div className="mt-6 w-10 h-1 bg-sand group-hover:w-20 group-hover:bg-navy transition-all duration-500 rounded-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          )}

          <Reveal delay={100}>
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                { icon: "📚", title: "Experienced & Qualified", desc: "Faculty members are continuously trained, experienced, and deeply passionate about teaching. Regular tests, remedial classes, and doubt-clearing sessions help students strengthen their understanding." },
                { icon: "🎯", title: "Student-Centric Approach", desc: "A personalised, inclusive approach ensures every child receives individual attention and guidance. Our teachers promote inquiry, fellowship, and joy — setting high standards for character and discipline." },
                { icon: "🔄", title: "Mentors, Not Just Teachers", desc: "Our teachers go beyond knowledge delivery — they build confidence, nurture personality, and create a positive atmosphere where every student feels valued, motivated, and ready for life's challenges." },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#EEECEA] rounded-2xl p-7 flex gap-5 items-start">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-[#666] text-sm leading-[1.8]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-48 overflow-hidden">
        <img
          src="/assets/img/life-at-sps.webp"
          alt="Join Seedling Schools"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/95 via-navy-deeper/80 to-navy-dark/70" />
        <div className="absolute inset-0 mesh-gradient opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <Reveal>
            <span className="inline-block bg-sand/10 text-sand text-xs tracking-[0.3em] uppercase px-6 py-2.5 rounded-full border border-sand/20 mb-8 font-dm font-black">
              Admissions Open 2026–27
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-light mb-8 text-white">
              Join the{" "}
              <em className="font-semibold text-sand">Seedling Family</em>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-dm font-light">
              Come feel the Buzz! Parent counselling is available both online and offline. Early bird incentives and scholarships for meritorious students in academics and sports are available. Where every student matters — prioritising well-being since 1993.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex gap-6 justify-center flex-wrap">
              <a
                href="/admissions#enquire"
                className="inline-flex items-center gap-3 bg-crimson hover:bg-crimson-dark text-white px-6 sm:px-12 py-4 sm:py-6 rounded-full text-sm font-black tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-2xl hover:shadow-crimson/50 hover:gap-6 font-dm"
              >
                Apply Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/contact-us#contact-form"
                className="inline-flex items-center gap-3 bg-white/10 border border-white/30 text-white hover:bg-white hover:text-navy-deeper px-6 sm:px-12 py-4 sm:py-6 rounded-full text-sm font-black tracking-[0.2em] uppercase transition-all duration-500 backdrop-blur-md font-dm"
              >
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
