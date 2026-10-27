"use client";
import { useState, useEffect, useRef } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

/* ─── THEME ────────────────────────────────────────────────────────────── */
const T = {
  navy:          "#175190",
  navyDark:      "#0e3d6e",
  navyDeeper:    "#0a1f3a",
  navyLight:     "#eef4fc",
  crimson:       "#A41546",
  crimsonDark:   "#8a1239",
  crimsonDeeper: "#7a0f35",
  mauve:         "#896B85",
  sand:          "#D6D1CF",
  offWhite:      "#f8f7f6",
  dark:          "#0e0e0e",
  textBase:      "#2c2c2c",
  textLight:     "#5a5a5a",
};

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const SPORTS = [
  { id:"multisport", name:"Multi-Sport Ground", tagline:"Play. Compete. Excel.",        accent:T.navy,        icon:"🏟",
    img:"/smhs_images/seedling_images/multisport_ground.webp",
    desc:"Our multi-sport ground is where champions are forged. From morning practice to competitive matches, our expansive facility hosts a variety of sports for students of all skill levels.",
    highlights:["FIFA-standard turf field","200m athletic track","Cricket practice nets","Floodlit courts"] },
  { id:"basketball", name:"Basketball", tagline:"Rise. Dribble. Dominate.",      accent:T.crimson,     icon:"🏀",
    img:"/sports_and_other_images/P1500703.webp",
    desc:"Fast-paced and built on teamwork — our basketball program develops court vision, agility, and winning mindsets.",
    highlights:["State-of-art indoor courts","3v3 & 5v5 formats","Inter-school leagues","Elite point guard training"] },
  { id:"indoor",     name:"Volleyball", tagline:"Set. Spike. Soar.", accent:T.mauve,       icon:"🏐",
    img:"/sports_and_other_images/P1500645.webp",
    desc:"Volleyball teaches explosive power, spatial awareness, and relentless communication — every rally builds a better athlete.",
    highlights:["Beach & indoor courts","Spike & serve workshops","Regional tournaments","Certified FIVB coaches"] },
  { id:"badminton",  name:"Badminton",  tagline:"Smash. Rally. Triumph.",        accent:T.crimson,     icon:"🏸",
    img:"/sports_and_other_images/P1500819.webp",
    desc:"Fast reflexes, sharp footwork, and split-second decisions — our badminton program builds agility, endurance, and competitive finesse.",
    highlights:["Professional synthetic courts","Singles & doubles formats","Inter-school tournaments","BWF-aligned training curriculum"] },
  { id:"tabletennis",name:"Table Tennis",tagline:"Spin. Smash. Score.",          accent:T.navy,        icon:"🏓",
    img:"/sports_and_other_images/P1500982.webp",
    desc:"Precision, reflexes, and split-second thinking — table tennis sharpens hand-eye coordination and builds mental agility through fast-paced rallies.",
    highlights:["Professional TT tables","Singles & doubles training","Inter-house tournaments","Spin & smash technique drills"] },
  { id:"carrom",     name:"Carrom",     tagline:"Aim. Flick. Win.",              accent:T.navyDark,    icon:"🎯",
    img:"/sports_and_other_images/0N9A0278.webp",
    desc:"A classic game of precision and strategy, carrom sharpens focus, fine motor skills, and tactical thinking through every strike of the striker.",
    highlights:["Full-size carrom boards","Singles & doubles formats","Inter-house championships","Flicking technique workshops"] },
  { id:"chess",      name:"Chess",      tagline:"Think. Plan. Checkmate.",       accent:T.crimsonDark, icon:"♟️",
    img:"/sports_and_other_images/0N9A0280.webp",
    desc:"The ultimate game of intellect — chess at Seedling develops critical thinking, patience, and problem-solving skills that transcend the board.",
    highlights:["FIDE-standard sets & boards","Beginner to advanced levels","Inter-school chess tournaments","Grandmaster-inspired training"] },
  { id:"karate",     name:"Karate",     tagline:"Focus. Strike. Conquer.",       accent:T.crimsonDark, icon:"🥋",
    img:"/smhs_images/seedling_images/karate.webp",
    desc:"Karate at Seedling builds mental discipline, physical strength, and self-confidence. Our certified instructors guide students from basic kata to competitive sparring.",
    highlights:["Certified black-belt instructors","Kata & kumite training","State-level competitions","Belt grading ceremonies"] },
  { id:"swimming",   name:"Swimming",   tagline:"Dive Deep. Rise Faster.",       accent:T.navy,        icon:"🏊",
    img:"/smhs_images/seedling_images/img348.webp",
    desc:"Our Olympic-inspired aquatics program shapes swimmers with technique, breath control, and the drive to beat their personal best.",
    highlights:["25m heated indoor pool","Stroke technique labs","State championships","Lifeguard certification"] },
];

const GALLERY = [
  { img:"/sports_and_other_images/P1500644.webp", tall:true  },
  { img:"/sports_and_other_images/P1500642.webp", tall:false },
  { img:"/sports_and_other_images/P1500648.webp", tall:false },
  { img:"/sports_and_other_images/P1500670.webp", tall:true  },
  { img:"/sports_and_other_images/P1500685.webp", tall:false },
  { img:"/sports_and_other_images/P1500695.webp", tall:false },
  { img:"/sports_and_other_images/P1500700.webp", tall:true  },
  { img:"/sports_and_other_images/P1500703.webp", tall:false },
  { img:"/sports_and_other_images/P1500675.webp", tall:false },
  { img:"/sports_and_other_images/P1500680.webp", tall:true  },
  { img:"/sports_and_other_images/P1500820.webp", tall:false },
  { img:"/sports_and_other_images/P1500643.webp", tall:false },
  { img:"/sports_and_other_images/0N9A0271.webp", tall:true  },
  { img:"/sports_and_other_images/0N9A0278.webp", tall:false },
  { img:"/sports_and_other_images/0N9A0280.webp", tall:false },
];

const STATS = [
  { value:"24+",    label:"Sports Programs"    },
  { value:"1,200+", label:"Active Athletes"    },
  { value:"85+",    label:"Championships Won"  },
  { value:"40+",    label:"Certified Coaches"  },
];

/* ─── HOOKS ────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ─── FADE-UP ──────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity .75s ease ${delay}ms, transform .75s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── LABEL CHIP ───────────────────────────────────────────────────────── */
function Label({ children, onDark = false }) {
  return (
    <div style={{
      display:"inline-block", marginBottom:18,
      padding:"5px 18px", borderRadius:100,
      background: onDark ? "rgba(214,209,207,0.12)" : `${T.navy}18`,
      border: `1px solid ${onDark ? "rgba(214,209,207,0.25)" : T.navy + "33"}`,
      color: onDark ? T.sand : T.navy,
      fontFamily:"'DM Sans',sans-serif", fontSize:11,
      fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase",
    }}>
      {children}
    </div>
  );
}

/* ─── GLOBAL CSS ───────────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    @keyframes fadeUp   {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeDown {from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse    {0%,100%{opacity:.5}50%{opacity:1}}
    @keyframes bob      {0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(9px)}}

    /* ── Responsive helpers ── */
    .two-col   { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,80px); align-items:center; }
    .feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .ach-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
    .stats-row { display:flex; }

    /* sports grid sizes defined inline per breakpoint via JS */
    .sp-grid { display:grid; }

    /* gallery */
    .gal { columns:4; column-gap:14px; }

    @media(max-width:1023px){
      .ach-grid { grid-template-columns:repeat(2,1fr); }
      .gal      { columns:3; }
    }
    @media(max-width:767px){
      .two-col   { grid-template-columns:1fr; }
      .feat-grid { grid-template-columns:1fr 1fr; }
      .ach-grid  { grid-template-columns:1fr 1fr; }
      .gal       { columns:2; }
      .stats-row { flex-wrap:wrap; }
      .flip      { direction:ltr !important; }
    }
    @media(max-width:479px){
      .feat-grid { grid-template-columns:1fr; }
      .ach-grid  { grid-template-columns:1fr; }
      .gal       { columns:1; }
      .stats-row { flex-direction:column; }
    }
  `}</style>
);

/* ══════════════════════════════════════════ HERO ══════════════════════════ */
function Hero() {
  const [sy, setSy] = useState(0);
  const w = useWidth();
  useEffect(() => {
    const fn = () => setSy(window.scrollY);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section style={{ position:"relative", height:"100svh", minHeight:600, overflow:"hidden" }}>
      {/* BG */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"url(/sports_and_other_images/P1500656.webp)",
        backgroundSize:"cover", backgroundPosition:"center 30%",
        transform: w > 768 ? `translateY(${sy * 0.28}px)` : "none",
      }} />
      {/* Overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(150deg,${T.navyDeeper}f2 0%,${T.navyDark}cc 50%,${T.crimsonDeeper}66 100%)`,
      }} />
      {/* Decorative vertical lines */}
      {w > 600 && <>
        <div style={{ position:"absolute", top:0, left:"7%", width:1, height:"100%", background:"rgba(255,255,255,0.06)" }} />
        <div style={{ position:"absolute", top:0, right:"7%", width:1, height:"100%", background:"rgba(255,255,255,0.06)" }} />
      </>}

      {/* Content */}
      <div style={{
        position:"relative", zIndex:10, height:"100%",
        display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
        textAlign:"center", padding:`0 clamp(20px,6vw,80px)`,
        paddingBottom:90,
      }}>
        {/* eyebrow */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8, marginBottom:28,
          padding:"6px 22px", borderRadius:100,
          background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.2)",
          color:"rgba(255,255,255,0.88)", fontFamily:"'DM Sans',sans-serif",
          fontSize:11, fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase",
          animation:"fadeDown .9s ease both",
        }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:T.sand, animation:"pulse 2s infinite" }} />
          Athletics &amp; Sports Excellence
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(20px,6vw,60px)",
          fontWeight:900, color:"#fff", lineHeight:0.9,
          marginBottom:"clamp(20px,3vw,32px)",
          animation:"fadeUp 1s ease .2s both",
        }}>
          <span style={{ display:"block" }}>Sports &amp;</span>
          <span style={{ display:"block", color:"transparent", WebkitTextStroke:`2px rgba(214,209,207,0.4)` }}>Athletic</span>
          <span style={{ display:"block", color:T.sand }}>Excellence</span>
        </h1>

        {/* sub */}
        <p style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:"clamp(14px,1.7vw,18px)",
          color:"rgba(255,255,255,0.68)", maxWidth:540, lineHeight:1.75,
          marginBottom:"clamp(36px,5vw,52px)",
          animation:"fadeUp 1s ease .4s both",
        }}>
          Where discipline meets passion. Where effort becomes legacy.<br />
          Forging champions through teamwork, grit, and athletic mastery.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", animation:"fadeUp 1s ease .6s both" }}>
          <HBtn href="#sports" primary>Explore Sports</HBtn>
          <HBtn href="#join">Join Activities</HBtn>
        </div>

        {/* scroll bob */}
        <div style={{ position:"absolute", bottom:80, left:"50%", display:"flex", flexDirection:"column", alignItems:"center", gap:6, animation:"bob 2.2s ease infinite" }}>
          <div style={{ width:1, height:48, background:`linear-gradient(to bottom,transparent,${T.sand}99)` }} />
          <div style={{ width:5, height:5, borderRadius:"50%", background:T.sand }} />
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        background:"rgba(10,31,58,.9)", backdropFilter:"blur(18px)",
        borderTop:"1px solid rgba(255,255,255,.07)",
      }}>
        <div className="stats-row" style={{ maxWidth:1100, margin:"0 auto" }}>
          {STATS.map((s,i) => (
            <div key={i} style={{
              padding:"clamp(14px,2vw,20px) clamp(12px,2.5vw,28px)",
              textAlign:"center", flex:1, minWidth:120,
              borderRight: i < 3 ? "1px solid rgba(255,255,255,.07)" : "none",
            }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,3vw,30px)", fontWeight:700, color:T.sand, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(9px,1vw,11px)", color:"rgba(255,255,255,.42)", marginTop:4, letterSpacing:"1.5px", textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HBtn({ href, children, primary = false }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display:"inline-block", textDecoration:"none",
        padding:`clamp(13px,1.5vw,16px) clamp(22px,3vw,44px)`,
        borderRadius:6, fontFamily:"'DM Sans',sans-serif",
        fontSize:"clamp(11px,1vw,13px)", fontWeight:600,
        letterSpacing:"1.5px", textTransform:"uppercase",
        transition:"all .3s ease",
        background: primary ? (h ? T.crimsonDark : T.crimson) : (h ? "rgba(255,255,255,.15)" : "transparent"),
        color:"#fff",
        border: primary ? "none" : "1px solid rgba(255,255,255,.4)",
        transform: h ? "translateY(-2px)" : "none",
      }}
    >{children}</a>
  );
}

/* ══════════════════════════════════════════ OVERVIEW ══════════════════════ */
function SportsOverview() {
  const pillars = [
    { label:"Physical Fitness",   desc:"Daily conditioning tailored for every age group." },
    { label:"Teamwork",           desc:"Play builds lifelong bonds and confident leaders." },
    { label:"Discipline",         desc:"Routines that translate to academic success." },
    { label:"Competitive Spirit", desc:"Regional & national tournaments that push limits." },
  ];
  return (
    <section style={{ background:T.offWhite, padding:"clamp(40px,6vw,70px) 0", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <div className="two-col">
          {/* text */}
          <FadeUp>
            <Label>Our Sports Culture</Label>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(36px,5.5vw,60px)",
              fontWeight:900, color:T.navyDeeper, lineHeight:.93, marginBottom:22,
            }}>
              More Than<br />
              <em style={{ fontStyle:"italic", color:T.crimson }}>A Game.</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,1.4vw,17px)", color:T.textLight, lineHeight:1.8, marginBottom:40, maxWidth:480 }}>
              At Seedling Schools, sports is woven into the identity of every student. Our world-class facilities, certified coaches, and competitive programs give students the edge to excel — on and off the field.
            </p>
            <div className="feat-grid">
              {pillars.map((p,i) => <PillarCard key={i} {...p} />)}
            </div>
          </FadeUp>
          {/* image */}
          <FadeUp delay={180} style={{ position:"relative" }}>
            <div style={{
              borderRadius:24, overflow:"hidden", aspectRatio:"4/5",
              backgroundImage:"url(/sports_and_other_images/P1500653.webp)",
              backgroundSize:"cover", backgroundPosition:"center",
            }} />
            <div style={{
              position:"absolute", bottom:-24, left:-24,
              background:`linear-gradient(135deg,${T.navy},${T.navyDark})`,
              padding:"clamp(16px,2vw,22px) clamp(20px,2.5vw,28px)", borderRadius:18,
              boxShadow:`0 20px 60px ${T.navy}55`,
            }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,5vw,46px)", fontWeight:700, color:"#fff", lineHeight:1 }}>6+</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(11px,1.2vw,13px)", color:"rgba(255,255,255,.75)", marginTop:4 }}>Featured Sports Programs</div>
            </div>
            <div style={{ position:"absolute", top:-18, right:-18, width:80, height:80, borderRadius:"50%", border:`2px solid ${T.crimson}44`, background:`${T.crimson}08` }} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ label, desc }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"clamp(14px,2vw,20px) clamp(14px,1.8vw,20px)",
        borderRadius:16, cursor:"default",
        background: h ? T.navyLight : "#fff",
        border:`1px solid ${h ? T.navy+"44" : T.sand}`,
        transition:"all .3s",
      }}>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(12px,1.2vw,13px)", fontWeight:600, color:T.navyDeeper, marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(11px,1vw,12px)", color:T.textLight, lineHeight:1.55 }}>{desc}</div>
    </div>
  );
}

/* ══════════════════════════════════════════ SPORTS GRID ══════════════════ */
function SportsGrid() {
  const [hov, setHov] = useState(null);
  const w = useWidth();

  /* column / row spans change by breakpoint */
  const cfgs = w >= 1024
    ? [
        { col:"1/7",  row:"1/2" }, { col:"7/13", row:"1/2" },
        { col:"1/5",  row:"2/3" }, { col:"5/9",  row:"2/3" }, { col:"9/13", row:"2/3" },
        { col:"1/5",  row:"3/4" }, { col:"5/9",  row:"3/4" }, { col:"9/13", row:"3/4" },
        { col:"1/7",  row:"4/5" }, { col:"7/13", row:"4/5" },
      ]
    : null; // CSS handles mobile

  const gridStyle = w >= 1024
    ? { gridTemplateColumns:"repeat(12,1fr)", gridTemplateRows:"300px 260px 260px 260px" }
    : w >= 600
    ? { gridTemplateColumns:"repeat(2,1fr)", gridAutoRows:"220px" }
    : { gridTemplateColumns:"1fr", gridAutoRows:"200px" };

  return (
    <section id="sports" style={{ background:T.navyDeeper, padding:"clamp(40px,6vw,70px) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(24px,4vw,48px)" }}>
            <Label onDark>Our Programs</Label>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(34px,5.5vw,72px)",
              fontWeight:900, color:"#fff", lineHeight:1,
            }}>
              Featured <em style={{ fontStyle:"italic", color:T.sand }}>Sports</em>
            </h2>
          </div>
        </FadeUp>

        <div className="sp-grid" style={{ gap:12, ...gridStyle }}>
          {SPORTS.map((sport, i) => {
            const isH = hov === i;
            const cfg = cfgs ? cfgs[i] : null;
            return (
              <div key={sport.id}
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                style={{
                  position:"relative", borderRadius:20, overflow:"hidden", cursor:"pointer",
                  gridColumn: cfg?.col, gridRow: cfg?.row,
                  transform: isH ? "scale(1.025)" : "scale(1)",
                  transition:"transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s",
                  boxShadow: isH ? "0 28px 70px rgba(0,0,0,.55)" : "0 4px 18px rgba(0,0,0,.3)",
                }}
              >
                {/* BG */}
                <div style={{
                  position:"absolute", inset:0,
                  backgroundImage:`url(${sport.img})`,
                  backgroundSize:"cover", backgroundPosition:"center",
                  transform: isH ? "scale(1.09)" : "scale(1)",
                  transition:"transform .6s cubic-bezier(.4,0,.2,1)",
                }} />
                {/* overlay */}
                <div style={{
                  position:"absolute", inset:0,
                  background: isH
                    ? `linear-gradient(to top,${sport.accent}f0,${sport.accent}55 55%,transparent)`
                    : "linear-gradient(to top,rgba(0,0,0,.85),rgba(0,0,0,.08))",
                  transition:"all .4s",
                }} />
                {/* top accent bar */}
                <div style={{
                  position:"absolute", top:0, left:0, right:0, height:3,
                  background: sport.accent,
                  transform: isH ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin:"left", transition:"transform .35s",
                }} />
                {/* content */}
                <div style={{
                  position:"relative", zIndex:2, height:"100%",
                  display:"flex", flexDirection:"column", justifyContent:"flex-end",
                  padding:"clamp(14px,2.2vw,26px)",
                }}>
                  <div style={{ fontSize:"clamp(20px,2.5vw,30px)", marginBottom:6 }}>{sport.icon}</div>
                  <h3 style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize: i === 5 ? "clamp(26px,4vw,52px)" : "clamp(20px,2.5vw,34px)",
                    fontWeight:700, color:"#fff", lineHeight:1, marginBottom:6,
                  }}>{sport.name}</h3>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontStyle:"italic", fontSize:12, color:T.sand, marginBottom: isH ? 10 : 0, transition:"margin .3s" }}>{sport.tagline}</div>
                  <p style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.8)",
                    lineHeight:1.5, maxWidth:380,
                    maxHeight: isH ? 80 : 0, overflow:"hidden",
                    opacity: isH ? 1 : 0, transition:"all .4s",
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

/* ══════════════════════════════════════════ SHOWCASES ════════════════════ */
function SportShowcase({ sport, reverse, idx }) {
  const [imgRef, imgIn] = useInView();
  const [txtRef, txtIn] = useInView();
  const bg = idx % 2 === 0 ? T.offWhite : "#fff";

  return (
    <section style={{ background:bg, padding:"clamp(40px,6vw,55px) 0", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <div className={`two-col${reverse ? " flip" : ""}`} style={{ direction: reverse ? "rtl" : "ltr" }}>
          {/* image */}
          <div ref={imgRef} style={{
            direction:"ltr", position:"relative",
            opacity: imgIn ? 1 : 0,
            transform: imgIn ? "translateX(0)" : reverse ? "translateX(50px)" : "translateX(-50px)",
            transition:"all .85s cubic-bezier(.4,0,.2,1)",
          }}>
            <div style={{
              borderRadius:22, overflow:"hidden", aspectRatio:"4/3",
              backgroundImage:`url(${sport.img})`,
              backgroundSize:"cover", backgroundPosition:"center",
            }} />
            <div style={{
              position:"absolute", bottom:-14, [reverse ? "left" : "right"]:-14,
              width:110, height:110, borderRadius:16,
              border:`2px solid ${sport.accent}44`,
            }} />
          </div>
          {/* text */}
          <div ref={txtRef} style={{
            direction:"ltr",
            opacity: txtIn ? 1 : 0,
            transform: txtIn ? "translateY(0)" : "translateY(36px)",
            transition:"all .85s cubic-bezier(.4,0,.2,1) .15s",
          }}>
            <div style={{
              display:"inline-block", marginBottom:18,
              padding:"4px 16px", borderRadius:100,
              background:`${sport.accent}18`, border:`1px solid ${sport.accent}44`,
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
              letterSpacing:"2px", textTransform:"uppercase", color:sport.accent,
            }}>{sport.tagline}</div>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(32px,4.5vw,64px)",
              fontWeight:900, color:T.navyDeeper, lineHeight:.93, marginBottom:18,
            }}>
              {sport.icon} {sport.name}
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,1.3vw,17px)", color:T.textLight, lineHeight:1.8, marginBottom:32 }}>
              {sport.desc}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {sport.highlights.map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{
                    width:30, height:30, borderRadius:"50%", flexShrink:0,
                    background:`${sport.accent}18`, border:`1px solid ${sport.accent}44`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:sport.accent }} />
                  </div>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(13px,1.2vw,15px)", color:T.textBase }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════ GALLERY ══════════════════════ */
function Gallery() {
  const [hov, setHov] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <section style={{ background:T.navyDeeper, padding:"clamp(40px,6vw,70px) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(24px,4vw,48px)" }}>
            <Label onDark>In Action</Label>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(34px,5.5vw,70px)",
              fontWeight:900, color:"#fff",
            }}>
              Sports <em style={{ fontStyle:"italic", color:T.sand }}>Gallery</em>
            </h2>
          </div>
        </FadeUp>
        <div className="gal">
          {GALLERY.map((item, i) => (
            <div key={i} style={{
              breakInside:"avoid", marginBottom:14,
              position:"relative", borderRadius:16, overflow:"hidden", cursor:"pointer",
              height: item.tall ? "clamp(180px,24vw,340px)" : "clamp(130px,15vw,210px)",
              transform: hov === i ? "scale(1.025)" : "scale(1)",
              transition:"transform .3s",
            }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              onClick={() => setSelectedImg(item.img)}>
              <div style={{
                position:"absolute", inset:0,
                backgroundImage:`url(${item.img})`,
                backgroundSize:"cover", backgroundPosition:"center",
                transform: hov === i ? "scale(1.1)" : "scale(1)",
                transition:"transform .55s",
              }} />
              <div style={{
                position:"absolute", inset:0,
                background: hov === i ? `${T.crimson}55` : "rgba(0,0,0,.1)",
                transition:"background .3s",
              }} />
              {hov === i && (
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:T.crimson, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImg && (
        <div style={{
          position:"fixed", inset:0, zIndex:300,
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:16, background:"rgba(0,0,0,.9)", backdropFilter:"blur(8px)",
        }}
          onClick={() => setSelectedImg(null)}>
          <button style={{
            position:"absolute", top:24, right:24, color:"#fff",
            background:"none", border:"none", cursor:"pointer", padding:8,
            zIndex:51,
          }}
            onClick={() => setSelectedImg(null)}>
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={selectedImg} alt="Expanded view"
            style={{ maxWidth:"90vw", maxHeight:"90vh", objectFit:"contain", borderRadius:8, boxShadow:"0 25px 70px rgba(0,0,0,.5)" }}
            onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════ ACHIEVEMENTS ═════════════════ */
function Achievements() {
 const list = [
  {
    icon: "🏟️",
    title: "Seedling Sports Academy",
    year: "2024",
    detail: "Evening Sports Programme • Free for all Seedlites",
  },
  {
    icon: "🥋",
    title: "Karate Excellence Programme",
    year: "2024",
    detail: "Specialized Karate & Judo Training",
  },
  {
    icon: "🏀",
    title: "Basketball Team Selections",
    year: "2024",
    detail: "Training & Challengers’ Meet Preparation",
  },
  {
    icon: "🏸",
    title: "Badminton Championship",
    year: "2024",
    detail: "Inter-House Boys & Girls Tournament",
  },
  {
    icon: "🏊",
    title: "State Swimming Gold",
    year: "2024",
    detail: "4 gold medals, State Aquatics Meet",
  },
];
  return (
    <section style={{ background:T.offWhite, padding:"clamp(40px,6vw,50px) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(24px,4vw,48px)" }}>
            <Label>Track Record</Label>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(34px,5.5vw,70px)",
              fontWeight:900, color:T.navyDeeper, lineHeight:1.05,
            }}>
              Achievements &amp;<br />
              <em style={{ fontStyle:"italic", color:T.crimson }}>Championships</em>
            </h2>
          </div>
        </FadeUp>
        <div className="ach-grid">
          {list.map((a,i) => (
            <FadeUp key={i} delay={i*70}>
              <AchCard {...a} idx={i} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchCard({ icon, title, year, detail, idx }) {
  const [h, setH] = useState(false);
  const accent = idx % 2 === 0 ? T.navy : T.crimson;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background:"#fff", borderRadius:20, cursor:"default",
        padding:"clamp(22px,3vw,36px) clamp(18px,2.5vw,30px)",
        border:`1px solid ${h ? accent+"44" : T.sand}`,
        transform: h ? "translateY(-6px)" : "none",
        transition:"all .35s", position:"relative", overflow:"hidden",
        boxShadow: h ? `0 20px 55px ${accent}18` : "0 2px 12px rgba(0,0,0,.05)",
      }}>
      {/* bg number */}
      <div style={{
        position:"absolute", top:-6, right:14,
        fontFamily:"'Playfair Display',serif",
        fontSize:"clamp(70px,10vw,110px)", fontWeight:700,
        color:`${accent}07`, lineHeight:1, userSelect:"none", pointerEvents:"none",
      }}>{String(idx+1).padStart(2,"0")}</div>
      {/* top bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3,
        background:`linear-gradient(to right,${accent},transparent)`,
        transform: h ? "scaleX(1)" : "scaleX(.3)",
        transformOrigin:"left", transition:"transform .35s",
      }} />
      <div style={{ fontSize:"clamp(26px,3.5vw,38px)", marginBottom:12 }}>{icon}</div>
      {/* <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:accent, letterSpacing:"2px", textTransform:"uppercase", fontWeight:600, marginBottom:8 }}>{year}</div> */}
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(16px,1.8vw,22px)", fontWeight:700, color:T.navyDeeper, lineHeight:1.2, marginBottom:8 }}>{title}</h3>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(12px,1vw,14px)", color:T.textLight }}>{detail}</p>
    </div>
  );
}

/* ══════════════════════════════════════════ FITNESS ══════════════════════ */
function Fitness() {
  const feats = [
    { icon:"💪", title:"Physical Development", desc:"Age-appropriate strength, endurance & flexibility programs designed by sports scientists." },
    { icon:"🎯", title:"Professional Coaching", desc:"Each sport is guided by certified coaches with national and international experience." },
    { icon:"🤝", title:"Team Spirit",           desc:"Collaborative drills that build trust, communication, and lasting unity." },
    { icon:"📋", title:"Structured Discipline", desc:"Routines mirroring elite academy standards — teaching commitment and mental fortitude." },
  ];
  return (
    <section style={{ background:"#fff", padding:"clamp(40px,6vw,50px) 0", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)` }}>
        <div className="two-col">
          {/* cards grid */}
          <FadeUp delay={80}>
            <div className="feat-grid">
              {feats.map((f,i) => <FitnessCard key={i} {...f} idx={i} />)}
            </div>
          </FadeUp>
          {/* text */}
          <FadeUp delay={200}>
            <Label>Training &amp; Fitness</Label>
            <h2 style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(34px,4.5vw,64px)",
              fontWeight:900, color:T.navyDeeper, lineHeight:.93, marginBottom:22,
            }}>
              Built For<br />
              <em style={{ fontStyle:"italic", color:T.crimson }}>Peak</em><br />
              Performance
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,1.3vw,17px)", color:T.textLight, lineHeight:1.8, marginBottom:32, maxWidth:420 }}>
              Our fitness philosophy combines scientific training principles with character development — shaping athletes who thrive under pressure.
            </p>
            <div style={{
              borderRadius:18, overflow:"hidden",
              backgroundImage:"url(/sports_and_other_images/P1500667.webp)",
              backgroundSize:"cover", backgroundPosition:"center",
              height:"clamp(150px,18vw,210px)", position:"relative",
            }}>
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right,${T.navy}cc,transparent)` }} />
              <div style={{ position:"relative", padding:"0 28px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,2.8vw,36px)", fontWeight:700, color:"#fff" }}>World-Class</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(12px,1.2vw,15px)", color:"rgba(255,255,255,.8)", marginTop:4 }}>Facilities &amp; Equipment</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function FitnessCard({ icon, title, desc, idx }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"clamp(18px,2.2vw,26px) clamp(16px,2vw,22px)",
        borderRadius:16, cursor:"default",
        background: h ? T.navyLight : T.offWhite,
        border:`1px solid ${h ? T.navy+"33" : T.sand}`,
        transform: h ? "translateY(-4px)" : "none",
        transition:"all .3s",
      }}>
      <div style={{ fontSize:"clamp(22px,2.8vw,30px)", marginBottom:12 }}>{icon}</div>
      <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,1.4vw,17px)", fontWeight:700, color:T.navyDeeper, marginBottom:8 }}>{title}</h4>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(11px,1vw,13px)", color:T.textLight, lineHeight:1.6 }}>{desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════ CTA ══════════════════════════ */
function CTA() {
  return (
    <section id="join" style={{ position:"relative", padding:"clamp(80px,12vw,160px) 0", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"url(/sports_and_other_images/P1500656.webp)",
        backgroundSize:"cover", backgroundPosition:"center",
      }} />
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(150deg,${T.navyDeeper}f4,${T.navyDark}df 55%,${T.crimsonDeeper}88 100%)`,
      }} />
      {/* rings */}
      <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"clamp(260px,38vw,520px)", height:"clamp(260px,38vw,520px)", borderRadius:"50%", border:`1px solid ${T.sand}18` }} />
      <div style={{ position:"absolute", bottom:"-12%", left:"-6%", width:"clamp(200px,28vw,400px)", height:"clamp(200px,28vw,400px)", borderRadius:"50%", border:`1px solid ${T.crimson}22` }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:840, margin:"0 auto", padding:`0 clamp(20px,5vw,60px)`, textAlign:"center" }}>
        <FadeUp>
          <div style={{
            display:"inline-block", marginBottom:24,
            padding:"5px 20px", borderRadius:100,
            background:"rgba(255,255,255,.09)", border:"1px solid rgba(255,255,255,.2)",
            fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
            letterSpacing:"2.5px", textTransform:"uppercase", color:"rgba(255,255,255,.85)",
          }}>Join the Legacy</div>

          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(36px,7.5vw,48px)",
            fontWeight:900, color:"#fff", lineHeight:.91, marginBottom:26,
          }}>
            Building Champions<br />
            <em style={{ fontStyle:"italic", color:T.sand }}>On &amp; Off{"  "}</em>
            the Field
          </h2>

          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,1.5vw,18px)", color:"rgba(255,255,255,.62)", lineHeight:1.75, maxWidth:540, margin:"0 auto 48px" }}>
            Join a legacy of excellence. From first steps to championship podiums — Seedling Schools Athletics is where champions are made.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <CTABtn href="#sports" primary>Explore Activities</CTABtn>
            <CTABtn href="/admissions#enquire">Enquire Now</CTABtn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function CTABtn({ href, children, primary = false }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display:"inline-block", textDecoration:"none",
        padding:`clamp(14px,1.8vw,18px) clamp(26px,3.5vw,52px)`,
        borderRadius:6, fontFamily:"'DM Sans',sans-serif",
        fontSize:"clamp(11px,1vw,13px)", fontWeight:600,
        letterSpacing:"1.5px", textTransform:"uppercase",
        transition:"all .3s",
        background: primary ? (h ? T.crimsonDark : T.crimson) : (h ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.08)"),
        color:"#fff",
        border: primary ? "none" : "1px solid rgba(255,255,255,.35)",
        transform: h ? "translateY(-3px)" : "none",
        backdropFilter: primary ? "none" : "blur(8px)",
        boxShadow: primary && h ? `0 12px 36px ${T.crimson}66` : "none",
      }}
    >{children}</a>
  );
}

/* ══════════════════════════════════════════ ROOT ═════════════════════════ */
export default function SportsPage() {
  return (
    <>
      <Styles />
      <main style={{ background:T.offWhite, overflowX:"hidden" }}>
        <HeroWrapper backgroundImage="/sports_and_other_images/P1500656.webp" title="Sports" badge="Athletics & Fitness" breadcrumbs={[{label:"Sports"}]} />
        <SportsOverview />
        <SportsGrid />
        {SPORTS.map((sport, i) => (
          <SportShowcase key={sport.id} sport={sport} reverse={i % 2 !== 0} idx={i} />
        ))}
        <Gallery />
        <Achievements />
        <Fitness />
        <CTA />
      </main>
    </>
  );
}
