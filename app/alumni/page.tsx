"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroWrapper from "@/components/layout/HeroWrapper";

// ==========================================
// DATA CONSTANTS
// ==========================================

const alumniList = [
  {
    name: "Shashank Jain",
    role: "Head of Architecture & Design",
    image: "/smhs_images/seedling_images/alumni_shashank.webp",
    tags: ["Architecture", "Design", "Innovation"],
    quote: "Seedling didn't just teach me subjects — it taught me how to see the world as a designer. The discipline, creativity, and problem-solving skills I developed here became the foundation of everything I've built professionally.",
  },
  {
    name: "Harshil Mathur",
    role: "CEO, Razorpay",
    image: "/smhs_images/seedling_images/alumni_harshil.webp",
    tags: ["Entrepreneurship", "Fintech", "Leadership"],
    quote: "The values instilled at Seedling — curiosity, resilience, and thinking beyond boundaries — shaped the entrepreneur in me. Razorpay's journey began with the same fearless spirit Seedling encouraged in every student.",
  },
  {
    name: "Abhishek Tripathi",
    role: "Wing Commander, Indian Air Force",
    image: "/smhs_images/seedling_images/alumni_abhishek.webp",
    tags: ["Defence", "Leadership", "Service"],
    quote: "Seedling taught me that excellence is not an act but a habit. The rigour, teamwork, and sense of purpose I developed here prepared me for the highest levels of service to the nation.",
  },
];

const stats = [
  {
    value: 20000,
    suffix: "+",
    label: "Students Empowered",
    description: "Across five world-class campuses in Jaipur",
    color: "from-navy to-navy-deeper",
    icon: "🎓",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Alumni Network",
    description: "A global community of Seedling graduates",
    color: "from-crimson to-crimson-dark",
    icon: "🌐",
  },
  {
    value: 100,
    suffix: "%",
    label: "Results",
    description: "Consistent academic excellence since 1993",
    color: "from-navy-deeper to-navy",
    icon: "🏆",
  },
];

const achievements = [
  {
    title: "Alumni Accomplishment",
    body: "We take great pride in celebrating the remarkable achievements of our esteemed alumni — showcasing their talents, dedication, and success stories.",
    icon: "🏅",
    color: "border-sand/40 bg-sand/10",
  },
  {
    title: "Modern Education",
    body: "Our curriculum is thoughtfully designed to meet the latest educational standards — equipping students with knowledge, skills, and confidence for the world ahead.",
    icon: "📜",
    color: "border-navy/20 bg-navy-light",
  },
  {
    title: "Holistic Well-being",
    body: "At Seedling, we prioritize the holistic well-being of our students, parents, and staff — nurturing academic, emotional, social, and physical growth.",
    icon: "💚",
    color: "border-crimson/20 bg-crimson/5",
  },
  {
    title: "Technology-Integrated Learning",
    body: "Interactive whiteboards, educational apps, and online resources create an engaging and dynamic learning experience for every student.",
    icon: "💡",
    color: "border-sand/40 bg-sand/10",
  },
];

const networkCards = [
  {
    icon: "/smhs_images/seedling_images/alumni_news.webp",
    title: "Share News",
    body: "Share your latest achievements, milestones, and updates with your alma mater and fellow alumni to inspire and stay connected.",
    cta: "Spread the word",
  },
  {
    icon: "/smhs_images/seedling_images/alumni_classmate.webp",
    title: "Find Your Classmate",
    body: "Find and reconnect with classmates through alumni associations, social media, or class reunion events to strengthen old bonds.",
    cta: "Reconnect now",
  },
  {
    icon: "/smhs_images/seedling_images/alumni_involved.webp",
    title: "Get Involved",
    body: "Stay engaged with your alma mater by attending alumni events, reunions, networking opportunities, and cultural activities.",
    cta: "Connect & learn",
  },
];

const studentsList = [
  { image: "/alumni/alumni_four.webp" },
  { image: "/alumni/alumni_five.webp" },
  { image: "/alumni/alumni_six.webp" },
  { image: "/alumni/alumni_seven.webp" },
  { image: "/alumni/alumni_eight.webp" },
  { image: "/alumni/alumni_nine.webp" },
];


// ==========================================
// SUB-COMPONENTS
// ==========================================

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function AlumniCard({
  alumniItem,
  index,
}: {
  alumniItem: typeof alumniList[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("opacity-100", "translate-y-0"), index * 150);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out group"
    >
      <div
        className={`rounded-2xl overflow-hidden bg-white border border-sand/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
      >
        <div className="relative h-72 overflow-hidden">
          <Image
            src={alumniItem.image}
            alt={alumniItem.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-navy to-navy-deeper" />
        </div>
        <div className="p-6">
          <h3 className="font-playfair text-xl font-bold text-navy-deeper mb-1">{alumniItem.name}</h3>
          <p className="text-[10px] font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy-deeper mb-4 font-dm">
            {alumniItem.role}
          </p>
          <div className="flex flex-wrap gap-2">
            {alumniItem.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black tracking-widest uppercase text-text-light bg-sand/10 border border-sand/30 px-3 py-1 rounded-full font-dm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// SECTIONS
// ==========================================

function MedalPortrait({
  src,
  alt,
  size = "md",
  active = false,
  onClick,
}: {
  src: string;
  alt: string;
  size?: "md" | "lg";
  active?: boolean;
  onClick?: () => void;
}) {
  const dim = size === "lg" ? 190 : 148;
  const pad = size === "lg" ? 6 : 5;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center focus:outline-none group"
      style={{ cursor: "pointer" }}
      aria-label={`View ${alt} profile`}
    >
      <div
        className="rounded-full transition-all duration-300"
        style={{
          padding: pad,
          background: "conic-gradient(from 0deg, #f7df6b, #c8860a, #f7df6b, #a06a08, #f7e27a, #c8860a, #f7df6b)",
          boxShadow: active
            ? "0 0 0 4px #f7df6b, 0 0 32px rgba(247,223,107,0.6), 0 8px 32px rgba(180,120,0,0.6)"
            : "0 0 0 3px #a06a08, 0 6px 24px rgba(180,120,0,0.4)",
          transform: active ? "scale(1.08)" : "scale(1)",
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            padding: 3,
            background: "conic-gradient(from 90deg, #fdf0a0, #b8750a, #fdf0a0, #8a5a08, #fdf0a0)",
          }}
        >
          <div className="rounded-full overflow-hidden" style={{ width: dim, height: dim }}>
            <Image
              src={src}
              alt={alt}
              width={dim}
              height={dim}
              className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function FeaturedAlumniSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const active = alumniList[activeIndex];

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(i);
      setVisible(true);
    }, 200);
  };

  return (
    <section className="pt-8 pb-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-navy-deeper">

          {/* Header badge */}
          <div className="flex justify-center pt-10 pb-2">
            <span className="bg-sand text-navy-deeper text-[10px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full font-dm">
              The Pride of Seedling
            </span>
          </div>

          {/* Main grid */}
          <div className="grid md:grid-cols-2 gap-0">

            {/* Left — medals */}
            <div className="flex flex-col items-center justify-center gap-8 px-8 py-10">
              {/* Active alumni — large */}
              <MedalPortrait
                src={active.image}
                alt={active.name}
                size="lg"
                active
                onClick={() => {}}
              />
              {/* Other two — smaller, clickable */}
              <div className="flex gap-10 items-center">
                {alumniList.map((a, i) =>
                  i === activeIndex ? null : (
                    <MedalPortrait
                      key={a.name}
                      src={a.image}
                      alt={a.name}
                      size="md"
                      active={false}
                      onClick={() => handleSelect(i)}
                    />
                  )
                )}
              </div>
            </div>

            {/* Right — bio (fades on switch) */}
            <div
              className="flex flex-col justify-center p-10 md:p-14 text-white transition-opacity duration-200"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <p className="text-sand text-[10px] font-black uppercase tracking-[0.2em] mb-4 font-dm">
                Seedling Modern High School Alumni
              </p>

              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-2 leading-tight">
                {active.name}
              </h2>
              <p className="font-playfair text-xl text-sand font-medium mb-8 italic">
                {active.role}
              </p>

              <blockquote className="relative">
                <div className="text-7xl text-sand/20 font-playfair absolute -top-4 -left-2 leading-none select-none">
                  "
                </div>
                <p className="text-white/80 text-lg leading-relaxed pl-4 border-l-2 border-sand/50 font-dm font-light">
                  {active.quote}
                </p>
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-sand/30" />
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] font-dm">
                  Joyous Tidings — Alumni Accomplishment
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black tracking-widest uppercase bg-white/10 border border-white/10 text-sand px-3 py-1 rounded-full font-dm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const alumniGallery = [
  "/alumni/alumni_two.webp",
  "/alumni/alumni_three.webp",
  "/alumni/alumni_ten.webp",
  "/alumni/alumni_eleven.webp",
  "/alumni/alumni_tweleve.webp",
  "/alumni/alumni_thirteen.webp",
];

function AlumniGrid() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section className="pt-16 pb-10 bg-off-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-sand" />
            <span className="text-[10px] font-black text-sand uppercase tracking-[0.3em] font-dm">
              Alumni Gallery
            </span>
            <div className="w-8 h-px bg-sand" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper leading-tight">
            Moments & Memories
          </h2>
          <p className="mt-4 text-text-light max-w-xl mx-auto text-lg font-dm font-light">
            Glimpses from our alumni gatherings — celebrating bonds, milestones, and the Seedling spirit.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {alumniGallery.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelected(src)}
            >
              <Image
                src={src}
                alt="Alumni moment"
                width={600}
                height={i % 2 === 0 ? 800 : 500}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-deeper/0 group-hover:bg-navy-deeper/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-sand transition-colors" onClick={() => setSelected(null)}>
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={selected} alt="Alumni" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

function AchievementsSection() {
  return (
    <section className="pt-16 pb-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-crimson" />
            <span className="text-[10px] font-black text-crimson uppercase tracking-[0.3em] font-dm">
              By the Numbers
            </span>
            <div className="w-8 h-px bg-crimson" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper">
            Empowering Educational Excellence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-crimson to-navy">
              Globally
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl bg-white border border-sand/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center overflow-hidden"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-2xl`} />
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className={`font-playfair text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] font-black tracking-widest uppercase text-navy-deeper mt-1 font-dm">{stat.label}</p>
              <p className="text-xs text-text-light mt-2 leading-relaxed font-dm font-light">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="relative rounded-2xl overflow-hidden h-56 shadow-md">
            <Image
              src="/alumni/alumni_group.webp"
              alt="Alumni Accomplishments"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/70 to-transparent flex items-end p-6">
              <p className="font-playfair text-white text-lg font-semibold">Alumni Accomplishments</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-56 shadow-md">
            <Image
              src="/alumni/alumni_performance.webp"
              alt="Alumni Community"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/70 to-transparent flex items-end p-6">
              <p className="font-playfair text-white text-lg font-semibold">A Thriving Community</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`rounded-2xl border ${a.color} p-7 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{a.icon}</div>
                <div>
                  <h3 className="font-playfair font-bold text-navy-deeper text-lg mb-2">{a.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed font-dm font-light">{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlumniNetwork() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("opacity-100", "translate-y-0");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-8 pb-16 bg-navy-deeper relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sand/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-crimson/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-sand" />
            <span className="text-[10px] font-black text-sand uppercase tracking-[0.3em] font-dm">
              Stay Connected
            </span>
            <div className="w-8 h-px bg-sand" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Nurture the Network!
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-dm font-light">
            The Seedling Tribe with its Happy Vibe — a community that extends far
            beyond graduation day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {networkCards.map((card, i) => (
            <div
              key={card.title}
              className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sand/30 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sand/5"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative w-14 h-14 mb-6">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-dm font-light">{card.body}</p>
              <button className="text-sand text-[10px] font-black tracking-widest uppercase group-hover:underline flex items-center gap-2 font-dm">
                {card.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section className="pt-16 pb-10 bg-sand/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-crimson" />
              <span className="text-[10px] font-black text-crimson uppercase tracking-[0.3em] font-dm">
                Happy Kids Make a Happy School
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper">
              Students Speak
            </h2>
          </div>
          <p className="text-text-light max-w-xs text-sm leading-relaxed font-dm font-light">
            Voices from our vibrant student community — each one a growing Seedling story.
          </p>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 pb-4 snap-x snap-mandatory">
        {studentsList.map((s, i) => (
          <div
            key={i}
            className="group flex-shrink-0 snap-start w-56 md:w-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
          >
            <div className="relative h-72 overflow-hidden">
              <Image
                src={s.image}
                alt="Seedling alumni"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("opacity-100", "scale-100");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-10 pb-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="opacity-0 scale-95 transition-all duration-700 ease-out rounded-[3rem] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-navy-deeper" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-white/10 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10 text-center py-20 px-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-sand rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] font-dm">
                Admissions Open 2026–27
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join the Seedling{" "}
              <span className="relative">
                Alumni Network
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-sand/40 rounded" />
              </span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-dm font-light">
              Be part of a global community that celebrates growth, resilience,
              and collaboration. Connect with your alma mater — Seedling Group of Schools.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/alumni"
                rel="noopener noreferrer"
                className="bg-sand text-navy-deeper font-black px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-[11px] uppercase tracking-widest font-dm"
              >
                Join Our Alumni Network
              </a>
              <a
                href="/admissions#enquire"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white border-2 border-white/30 font-black px-8 py-4 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 text-[11px] uppercase tracking-widest font-dm"
              >
                Enquire Now
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-[10px] font-black tracking-widest uppercase font-dm">
              <span>SMHS: <a href="tel:+919587772837" className="text-sand hover:underline">+91 95877 72837</a></span>
              {/* <span>SMHS & SMIA: <a href="tel:+919587772837" className="text-sand hover:underline">+91 95877 72837</a></span> */}
              <span className="opacity-50">Office Hours: 8:30 AM – 6:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ==========================================
// MAIN PAGE EXPORT
// ==========================================

/*
  Note: In Next.js App Router, you cannot export `metadata` from a "use client" file.
  Since this entire consolidated file requires client-side features (hooks, refs),
  it's marked with "use client". If you need SEO metadata, you should either move
  it to `layout.tsx` or wrap this page in a Server Component that exports metadata.
*/

/*
export const metadata = {
  title: "Alumni | Seedling Group of Schools",
  description:
    "Celebrating the remarkable achievements of our esteemed alumni. Discover their journeys of growth, resilience, and perseverance.",
};
*/

export default function AlumniPage() {
  return (
    <main className="min-h-screen">
      <HeroWrapper
        backgroundImage="/alumni/alumni_group.webp"
        title="Our Alumni"
        badge="Global Network"
        breadcrumbs={[{ label: "Alumni" }]}
      />
      <FeaturedAlumniSection />
      <AlumniGrid />
      <AchievementsSection />
      <AlumniNetwork />
      {/* <GalleryStrip /> */}
      <CTASection />
    </main>
  );
}
