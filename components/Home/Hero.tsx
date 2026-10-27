import HeroVideo from "@/components/ui/HeroVideo";

const STATS = [
  { n: "2", label: "Campuses in Jaipur" },
  { n: "20K+", label: "Students Enrolled" },
  { n: "33+", label: "Years of Trust" },
  { n: "100%", label: "Board Results" },
];

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[420px] md:h-[calc(100vh-68px)] overflow-hidden flex items-end md:items-center">
      {/* ── Hero Video ── */}
      <HeroVideo />

      {/* Mobile: gradient rises from bottom so text is readable */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      {/* Desktop: uniform overlay */}
      <div className="absolute inset-0 hidden md:block bg-black/40" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16 md:pb-0 md:pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.75rem] font-black tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-5 md:mb-8">
          <span className="w-2 h-2 bg-[#f7941e] rounded-full animate-pulse" />
          CBSE Affiliated · Jaipur
        </div>

        <h1
          className="font-serif italic text-white leading-[1.1] font-light max-w-3xl mb-5 md:mb-8"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          Inspiring Young minds<br />
          <span className="text-[#f7941e] not-italic font-bold">to think, create and achieve beyond limits</span>
        </h1>

        <p className="hidden md:block text-white/80 text-xl md:text-2xl max-w-xl leading-relaxed mb-12 font-light">
          Shaping confident learners prepared for life, leadership, and meaningful contribution.
        </p>

      </div>

      {/* ── Desktop stats bar ── */}
      <div className="absolute bottom-0 right-0 z-10 hidden lg:flex">
        {STATS.map(({ n, label }) => (
          <div key={label} className="bg-[#010e3a]/40 backdrop-blur-2xl border-l border-white/10 p-10 text-center text-white min-w-[180px]">
            <strong className="block text-4xl font-semibold text-[#f7941e] mb-2">{n}</strong>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
