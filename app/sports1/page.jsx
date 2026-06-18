"use client";
import { useState, useEffect, useRef } from "react";

const SPORTS = [
  {
    id: "skating",
    name: "Skating",
    tagline: "Glide Beyond Limits",
    desc: "Our skating program builds balance, coordination, and grace under pressure — training champions on ice and rink.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    color: "#00C6FF",
    icon: "⛸",
    highlights: ["Certified rink coaches", "Freestyle & speed skating", "National competitions", "200+ active skaters"],
  },
  {
    id: "basketball",
    name: "Basketball",
    tagline: "Rise. Dribble. Dominate.",
    desc: "Fast-paced, high-energy, and built on teamwork — our basketball program develops court vision, agility, and winning mindsets.",
    img: "https://images.unsplash.com/photo-1546519638405-a2b973e87bb3?w=800&q=80",
    color: "#FF6B35",
    icon: "🏀",
    highlights: ["State-of-art indoor courts", "3v3 & 5v5 formats", "Inter-school leagues", "Elite point guard training"],
  },
  {
    id: "volleyball",
    name: "Volleyball",
    tagline: "Set. Spike. Soar.",
    desc: "Volleyball teaches explosive power, spatial awareness, and relentless communication — every rally builds a better athlete.",
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
    color: "#FFD700",
    icon: "🏐",
    highlights: ["Beach & indoor courts", "Spike & serve workshops", "Regional tournaments", "Certified FIVB coaches"],
  },
  {
    id: "cricket",
    name: "Cricket",
    tagline: "Pitch Perfect. Match Ready.",
    desc: "A sport of strategy and skill — our cricket program instills patience, precision batting, and the art of the perfect delivery.",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    color: "#00E676",
    icon: "🏏",
    highlights: ["Full-size turf pitch", "Batting & bowling labs", "BCCI-aligned curriculum", "District level matches"],
  },
  {
    id: "football",
    name: "Football",
    tagline: "The Beautiful Game. Elevated.",
    desc: "Football forges leaders. Our program goes beyond technique — we build field intelligence, endurance, and team spirit.",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    color: "#E040FB",
    icon: "⚽",
    highlights: ["FIFA-standard turf field", "Tactical play sessions", "Inter-city tournaments", "500+ registered players"],
  },
  {
    id: "swimming",
    name: "Swimming",
    tagline: "Dive Deep. Rise Faster.",
    desc: "Our Olympic-inspired aquatics program shapes swimmers with technique, breath control, and the drive to beat their personal best.",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    color: "#00BCD4",
    icon: "🏊",
    highlights: ["25m heated indoor pool", "Stroke technique labs", "State championships", "Lifeguard certification"],
  },
];

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", h: "tall" },
  { img: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80", h: "short" },
  { img: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&q=80", h: "short" },
  { img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80", h: "tall" },
  { img: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80", h: "medium" },
  { img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80", h: "short" },
  { img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", h: "tall" },
  { img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80", h: "medium" },
];

const STATS = [
  { value: "24+", label: "Sports Programs", icon: "🏆" },
  { value: "1,200+", label: "Active Athletes", icon: "🏃" },
  { value: "85+", label: "Championships Won", icon: "🥇" },
  { value: "40+", label: "Certified Coaches", icon: "🎽" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden" }}>
      {/* BG Image with parallax */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=90)",
        backgroundSize: "cover", backgroundPosition: "center",
        transform: `translateY(${scrollY * 0.35}px)`,
        transition: "transform 0.05s linear",
      }} />
      {/* Multi-layer overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(5,10,30,0.92) 0%, rgba(10,20,60,0.75) 50%, rgba(0,150,255,0.15) 100%)",
      }} />
      {/* Animated grain texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: "8%", width: 1, height: "100%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", top: 0, right: "8%", width: 1, height: "100%", background: "rgba(255,255,255,0.06)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
        <div style={{
          display: "inline-block", background: "rgba(0,198,255,0.15)", border: "1px solid rgba(0,198,255,0.4)",
          color: "#00C6FF", padding: "6px 20px", borderRadius: 100, fontSize: 13,
          fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "3px", textTransform: "uppercase",
          marginBottom: 28, animation: "fadeDown 0.8s ease forwards",
        }}>
          Athletics & Sports Excellence
        </div>

        <h1 style={{
          fontFamily: "'Oswald', sans-serif", fontSize: "clamp(52px, 9vw, 110px)",
          fontWeight: 700, color: "#fff", lineHeight: 0.95, letterSpacing: "-2px",
          textTransform: "uppercase", marginBottom: 24,
          animation: "fadeUp 1s ease 0.2s both",
        }}>
          <span style={{ display: "block" }}>Sports &</span>
          <span style={{ display: "block", WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>Athletic</span>
          <span style={{ display: "block", color: "#00C6FF" }}>Excellence</span>
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif", fontSize: "clamp(16px, 2vw, 20px)",
          color: "rgba(255,255,255,0.7)", maxWidth: 600, lineHeight: 1.6, marginBottom: 48,
          animation: "fadeUp 1s ease 0.4s both",
        }}>
          Where discipline meets passion. Where effort becomes legacy.<br />
          Forging champions through teamwork, grit, and athletic mastery.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 1s ease 0.6s both" }}>
          <a href="#sports" style={{
            background: "#00C6FF", color: "#020B1A",
            padding: "16px 40px", borderRadius: 4,
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#00C6FF"; e.target.style.transform = "translateY(0)"; }}
          >
            Explore Sports
          </a>
          <a href="#join" style={{
            background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)",
            padding: "16px 40px", borderRadius: 4,
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#00C6FF"; e.target.style.color = "#00C6FF"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.color = "#fff"; e.target.style.transform = "translateY(0)"; }}
          >
            Join Activities
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(0,198,255,0.6))" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C6FF" }} />
        </div>
      </div>

      {/* Bottom stats bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(2,11,26,0.9)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", justifyContent: "center",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: "20px 40px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
            flex: 1, maxWidth: 200,
          }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#00C6FF", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)} }
      `}</style>
    </section>
  );
}

function SportsOverview() {
  return (
    <section style={{ background: "#020B1A", padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <FadeUp>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "3px", textTransform: "uppercase", fontSize: 13, marginBottom: 20 }}>Our Sports Culture</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-1px", marginBottom: 30 }}>
            More Than A<br />
            <span style={{ color: "#00C6FF" }}>Game.</span>
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 48, maxWidth: 480 }}>
            At Seedling Schools, sports is woven into the identity of every student. Our world-class facilities, certified coaches, and competitive programs give students the edge to excel — both on the field and beyond it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Physical Fitness", desc: "Daily conditioning programs tailored for every age" },
              { label: "Teamwork", desc: "Collaborative play builds lifelong bonds and leaders" },
              { label: "Discipline", desc: "Structure and routine that translate to academic success" },
              { label: "Competitive Spirit", desc: "Regional and national tournaments push limits" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,198,255,0.08)"; e.currentTarget.style.borderColor = "rgba(0,198,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div style={{ position: "relative" }}>
            {/* Main image */}
            <div style={{
              borderRadius: 20, overflow: "hidden", aspectRatio: "4/5",
              backgroundImage: "url(https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80)",
              backgroundSize: "cover", backgroundPosition: "center",
            }} />
            {/* Floating accent card */}
            <div style={{
              position: "absolute", bottom: -30, left: -30,
              background: "linear-gradient(135deg, #00C6FF, #0072FF)",
              padding: "24px 28px", borderRadius: 16, maxWidth: 220,
              boxShadow: "0 20px 60px rgba(0,198,255,0.4)",
            }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: 1 }}>6+</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>Featured Sports Programs</div>
            </div>
            {/* Top accent */}
            <div style={{
              position: "absolute", top: -20, right: -20,
              width: 100, height: 100, borderRadius: "50%",
              background: "rgba(0,198,255,0.1)", border: "1px solid rgba(0,198,255,0.3)",
            }} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function SportsGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="sports" style={{ background: "#010915", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "3px", textTransform: "uppercase", fontSize: 13, marginBottom: 16 }}>Our Programs</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 5vw, 70px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "-1px", lineHeight: 1 }}>
              Featured <span style={{ color: "#00C6FF" }}>Sports</span>
            </h2>
          </div>
        </FadeUp>

        {/* Dynamic asymmetric grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "320px 260px 300px", gap: 16 }}>
          {SPORTS.map((sport, i) => {
            const configs = [
              { col: "1 / 6", row: "1 / 2" },
              { col: "6 / 10", row: "1 / 2" },
              { col: "10 / 13", row: "1 / 3" },
              { col: "1 / 5", row: "2 / 3" },
              { col: "5 / 10", row: "2 / 3" },
              { col: "1 / 13", row: "3 / 4" },
            ];
            const cfg = configs[i];
            const isHovered = hovered === i;

            return (
              <div key={sport.id}
                style={{
                  gridColumn: cfg.col, gridRow: cfg.row,
                  position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer",
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease",
                  boxShadow: isHovered ? `0 30px 80px rgba(0,0,0,0.6)` : "0 4px 20px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* BG Image */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${sport.img})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isHovered
                    ? `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)`
                    : `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%)`,
                  transition: "all 0.4s ease",
                }} />

                {/* Color accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: sport.color,
                  transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{sport.icon}</div>
                  <h3 style={{
                    fontFamily: "'Oswald', sans-serif", fontSize: i === 5 ? 52 : 32,
                    fontWeight: 700, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: 8,
                  }}>{sport.name}</h3>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif", fontSize: 14, color: sport.color,
                    fontStyle: "italic", marginBottom: isHovered ? 12 : 0,
                    opacity: 1, transition: "margin 0.3s",
                  }}>{sport.tagline}</div>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5, maxWidth: 400,
                    maxHeight: isHovered ? 100 : 0, overflow: "hidden",
                    opacity: isHovered ? 1 : 0,
                    transition: "all 0.4s ease",
                  }}>{sport.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SportShowcase({ sport, reverse, index }) {
  const [imgRef, imgInView] = useInView();
  const [textRef, textInView] = useInView();

  return (
    <section style={{ background: index % 2 === 0 ? "#020B1A" : "#010915", padding: "100px 0", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 40px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
        direction: reverse ? "rtl" : "ltr",
      }}>
        {/* Image side */}
        <div ref={imgRef} style={{
          direction: "ltr", position: "relative",
          opacity: imgInView ? 1 : 0,
          transform: imgInView ? "translateX(0)" : reverse ? "translateX(60px)" : "translateX(-60px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <div style={{
            borderRadius: 20, overflow: "hidden", aspectRatio: "4/3",
            backgroundImage: `url(${sport.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          {/* Accent corner */}
          <div style={{
            position: "absolute", bottom: -12, right: reverse ? "auto" : -12, left: reverse ? -12 : "auto",
            width: 160, height: 160,
            border: `2px solid ${sport.color}`,
            borderRadius: 16, opacity: 0.3,
          }} />
        </div>

        {/* Text side */}
        <div ref={textRef} style={{
          direction: "ltr",
          opacity: textInView ? 1 : 0,
          transform: textInView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
        }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: sport.color, letterSpacing: "3px", textTransform: "uppercase", fontSize: 12, marginBottom: 16 }}>{sport.tagline}</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(38px, 4vw, 64px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-1px", marginBottom: 20 }}>
            {sport.icon} {sport.name}
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 40 }}>{sport.desc}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sport.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${sport.color}22`, border: `1px solid ${sport.color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: sport.color }} />
                </div>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MasonryGallery() {
  const [hovered, setHovered] = useState(null);

  const heights = { tall: 380, medium: 280, short: 200 };

  return (
    <section style={{ background: "#020B1A", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "3px", textTransform: "uppercase", fontSize: 13, marginBottom: 16 }}>In Action</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 5vw, 70px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "-1px" }}>
              Sports <span style={{ color: "#00C6FF" }}>Gallery</span>
            </h2>
          </div>
        </FadeUp>

        <div style={{ columns: 4, columnGap: 16 }}>
          {GALLERY.map((item, i) => (
            <div key={i} style={{
              breakInside: "avoid", marginBottom: 16, position: "relative",
              borderRadius: 16, overflow: "hidden",
              height: heights[item.h], cursor: "pointer",
              transform: hovered === i ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover", backgroundPosition: "center",
                transform: hovered === i ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.5s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: hovered === i ? "rgba(0,198,255,0.25)" : "rgba(0,0,0,0.1)",
                transition: "background 0.3s",
              }} />
              {hovered === i && (
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,198,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const achievements = [
    { icon: "🏆", title: "National Cricket Champions", year: "2024", detail: "U-17 District Level Winners" },
    { icon: "🥇", title: "State Swimming Gold", year: "2024", detail: "4 gold medals, State Aquatics Meet" },
    { icon: "🏅", title: "Basketball Regionals", year: "2023", detail: "Runners-up, North Zone Schools" },
    { icon: "⭐", title: "Football League Title", year: "2023", detail: "Inter-school City Championship" },
    { icon: "🎽", title: "Athletics Track Meet", year: "2024", detail: "15 medals across disciplines" },
    { icon: "🏐", title: "Volleyball State Finalists", year: "2024", detail: "Girls team, State Schools Games" },
  ];

  return (
    <section style={{ background: "#010915", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "3px", textTransform: "uppercase", fontSize: 13, marginBottom: 16 }}>Track Record</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 5vw, 70px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "-1px" }}>
              Achievements &<br /><span style={{ color: "#00C6FF" }}>Championships</span>
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {achievements.map((a, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div style={{
                background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20,
                padding: "36px 32px", position: "relative", overflow: "hidden",
                transition: "all 0.4s ease", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,198,255,0.06)"; e.currentTarget.style.borderColor = "rgba(0,198,255,0.25)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* BG number */}
                <div style={{
                  position: "absolute", top: -10, right: 16,
                  fontFamily: "'Oswald', sans-serif", fontSize: 120, fontWeight: 700,
                  color: "rgba(0,198,255,0.04)", lineHeight: 1, userSelect: "none",
                }}>{String(i + 1).padStart(2, "0")}</div>

                <div style={{ fontSize: 40, marginBottom: 16 }}>{a.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: "#00C6FF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>{a.year}</div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: 10, lineHeight: 1.1 }}>{a.title}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{a.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FitnessSection() {
  const features = [
    { icon: "💪", title: "Physical Development", desc: "Age-appropriate strength, endurance, and flexibility programs designed by sports scientists." },
    { icon: "🎯", title: "Professional Coaching", desc: "Each sport is guided by certified coaches with national and international experience." },
    { icon: "🤝", title: "Team Spirit", desc: "Collaborative drills and team challenges that build trust, communication, and unity." },
    { icon: "📋", title: "Structured Discipline", desc: "Routines that mirror elite academy standards — teaching commitment and mental fortitude." },
  ];

  return (
    <section style={{ background: "#020B1A", padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <FadeUp delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: "28px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,198,255,0.07)"; e.currentTarget.style.borderColor = "rgba(0,198,255,0.25)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: 10 }}>{f.title}</h4>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "3px", textTransform: "uppercase", fontSize: 13, marginBottom: 20 }}>Training & Fitness</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 4vw, 64px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-1px", marginBottom: 28 }}>
            Built For<br /><span style={{ color: "#00C6FF" }}>Peak</span><br />Performance
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 40, maxWidth: 440 }}>
            Our fitness philosophy combines scientific training principles with character development — shaping well-rounded athletes who thrive under pressure.
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            borderRadius: 16, overflow: "hidden",
            backgroundImage: "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80)",
            backgroundSize: "cover", backgroundPosition: "center",
            height: 200, position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,198,255,0.5), transparent)" }} />
            <div style={{ position: "relative", padding: "0 28px" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>World-Class</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)" }}>Facilities & Equipment</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="join" style={{ position: "relative", padding: "160px 0", overflow: "hidden" }}>
      {/* BG */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=80)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(0,30,80,0.95), rgba(0,10,30,0.9))",
      }} />

      {/* Accent shapes */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(0,198,255,0.05)", border: "1px solid rgba(0,198,255,0.1)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(0,198,255,0.04)", border: "1px solid rgba(0,198,255,0.08)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
        <FadeUp>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#00C6FF", letterSpacing: "4px", textTransform: "uppercase", fontSize: 13, marginBottom: 24 }}>Join the Legacy</div>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: "clamp(40px, 7vw, 90px)",
            fontWeight: 700, color: "#fff", textTransform: "uppercase", lineHeight: 0.95,
            letterSpacing: "-2px", marginBottom: 30,
          }}>
            Building Champions<br />
            <span style={{ color: "#00C6FF" }}>On & Off</span><br />
            The Field
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 52px" }}>
            Join a legacy of excellence. From first steps to championship podiums — Seedling Schools Athletics is where champions are made.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#sports" style={{
              background: "linear-gradient(135deg, #00C6FF, #0072FF)", color: "#fff",
              padding: "18px 48px", borderRadius: 4, textDecoration: "none",
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              transition: "all 0.3s", display: "inline-block",
              boxShadow: "0 8px 30px rgba(0,198,255,0.4)",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 16px 50px rgba(0,198,255,0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(0,198,255,0.4)"; }}
            >
              Explore Activities
            </a>
            <a href="#" style={{
              background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)",
              padding: "18px 48px", borderRadius: 4, textDecoration: "none",
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              transition: "all 0.3s", display: "inline-block",
              backdropFilter: "blur(10px)",
            }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.transform = "translateY(0)"; }}
            >
              Enquire Now
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function SportsPage() {
  return (
    <div style={{ background: "#020B1A", minHeight: "100vh", overflowX: "hidden" }}>
      <Hero />
      <SportsOverview />
      <SportsGrid />
      {SPORTS.map((sport, i) => (
        <SportShowcase key={sport.id} sport={sport} reverse={i % 2 !== 0} index={i} />
      ))}
      <MasonryGallery />
      <Achievements />
      <FitnessSection />
      <CTASection />
    </div>
  );
}
