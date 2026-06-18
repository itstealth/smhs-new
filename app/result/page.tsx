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

const achievements = [
  { value: "100%", label: "Board Results", sub: "Consistently every year", icon: "🏆" },
  { value: "20,000+", label: "Students Enrolled", sub: "Across 5 schools", icon: "👩‍🎓" },
  { value: "20:1", label: "Student–Teacher Ratio", sub: "Personalised attention", icon: "📐" },
  { value: "5,000+", label: "Alumni Network", sub: "Across 50+ nations", icon: "🌍" },
  { value: "30+", label: "Years of Excellence", sub: "Since 1993", icon: "⭐" },
  { value: "2", label: "Boards Offered", sub: "CBSE & Cambridge", icon: "📜" },
];

export default function ResultPage() {
  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.jpg"
        title="Results"
        badge="Academic Excellence"
        // breadcrumbs={[{ label: "Academics" }, { label: "Results" }]}
        height="large"
        overlayOpacity={0.6}
      />

      {/* Numbers That Tell Our Story */}
      <section className="py-12 md:py-16 bg-off-white text-text-base relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-sand/30" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-sand/30" />
        <div className="absolute inset-0 mesh-gradient opacity-80" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[0.8fr_1.7fr] gap-8 lg:gap-14 items-start">
            <Reveal>
              <div className="max-w-md">
                <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.28em] uppercase text-crimson font-dm">
                  <span className="h-px w-8 bg-crimson/70" />
                  Roll of Honour
                </span>
                <h2 className="mt-4 font-playfair text-3xl md:text-4xl font-light leading-tight text-navy-deeper">
                  Numbers That<br />
                  <em className="font-semibold text-navy">Tell Our Story</em>
                </h2>
                <p className="mt-5 text-sm md:text-base leading-7 text-text-light font-dm font-light">
                  A quick view of the academic consistency, campus scale, and learning support behind Seedling results.
                </p>
              </div>
            </Reveal>

            <div className="overflow-hidden rounded-2xl border border-sand/30 bg-white shadow-editorial">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand/20">
                {achievements.map((a, i) => (
                  <Reveal key={a.label} delay={i * 60}>
                    <div className="group min-h-[142px] bg-white p-5 md:p-6 transition-colors duration-300 hover:bg-navy-light">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-text-light/60 font-dm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-crimson/70 transition-transform duration-300 group-hover:scale-150" />
                      </div>
                      <p className="font-playfair text-3xl md:text-4xl font-semibold leading-none text-navy">
                        {a.value}
                      </p>
                      <p className="mt-3 text-sm font-black tracking-tight text-navy-deeper font-dm">
                        {a.label}
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-text-light font-dm">
                        {a.sub}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Topers in Seedling */}
          <Reveal delay={150}>
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-block bg-crimson/5 text-crimson text-xs font-bold tracking-[0.3em] uppercase px-5 py-2 rounded-full border border-crimson/10 mb-4 font-dm backdrop-blur-sm">
                  Board Toppers
                </span>
                <h3 className="font-playfair text-3xl md:text-5xl font-light text-navy-deeper">
                  Felicitating <em className="font-semibold text-navy">Excellence</em>
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { src: "/assets/FELICITATING TOPPERS IN BOARDS/1.webp", name: "Top Performer" },
                  { src: "/assets/FELICITATING TOPPERS IN BOARDS/2.webp", name: "Top Performer" },
                  { src: "/assets/FELICITATING TOPPERS IN BOARDS/3.webp", name: "Top Performer" },
                  { src: "/assets/FELICITATING TOPPERS IN BOARDS/4.webp", name: "Top Performer" },
                  { src: "/assets/FELICITATING TOPPERS IN BOARDS/5.webp", name: "Top Performer" },
                  { src: "/assets/result/ayush.jpg", name: "Ayush" },
                  { src: "/assets/result/geetika.jpg", name: "Geetika" },
                  { src: "/assets/result/neelvi.jpg", name: "Neelvi" },
                  { src: "/assets/result/pranjal.jpg", name: "Pranjal" },
                  { src: "/assets/result/saatvik.jpg", name: "Saatvik" },
                  { src: "/assets/result/vidhi.jpg", name: "Vidhi" },
                  { src: "/assets/result/yug.jpg", name: "Yug" },
                ].map((student, idx) => (
                  <div key={student.src} className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-19.2px)] aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-editorial transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(10,31,58,0.18)] hover:border-navy-light">
                    <img
                      src={student.src}
                      alt={`Seedling Topper ${student.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 via-navy-deeper/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-8 h-1 bg-sand mb-4 rounded-full" />
                      <p className="text-white font-playfair font-semibold text-xl">{student.name}</p>
                      <p className="text-white/70 text-[10px] tracking-widest uppercase font-dm mt-1">Board Examinations</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Full-width 100% results banner */}
          <Reveal delay={200}>
            <div className="mt-20 bg-white border border-sand/30 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-xl shadow-editorial group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-navy-light rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <p className="text-crimson text-xs tracking-[0.4em] uppercase mb-4 font-black">Our Pride</p>
                <h3 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 text-navy-deeper">100% Board Results</h3>
                <p className="text-text-light mt-3 max-w-xl text-lg font-dm font-light leading-relaxed">Seedling Group of Schools has consistently achieved 100% results in both CBSE examinations — every year, across all campuses. Many students secure high scores and distinctions, with a strong track record of placements in top universities worldwide.</p>
              </div>
              <div className="flex-shrink-0 relative z-10">
                <div className="w-40 h-40  rounded-full flex flex-col items-center justify-center border-2 border-navy/10 bg-navy text-white transition-colors duration-500">
                  <span className="font-playfair text-5xl font-bold">100%</span>
                  <span className="text-[10px] tracking-widest uppercase mt-2 font-black">Every Year</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
