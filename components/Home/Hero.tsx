import HeroVideo from "@/components/ui/HeroVideo";

const STATS = [
  { n: "Durgapura", label: "Jaipur campus" },
  { n: "CBSE", label: "Curriculum" },
  { n: "SMHS", label: "Seedling Modern High School" },
  { n: "Learning", label: "In the classroom and beyond" },
];

export default function Hero() {
  return (
    <section data-review-hero className="relative min-h-[560px] md:min-h-[min(760px,calc(100svh-88px))] overflow-hidden flex flex-col justify-between">
      {/* ── Hero Video ── */}
      <HeroVideo />

      {/* Mobile: gradient rises from bottom so text is readable */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      {/* Desktop: uniform overlay */}
      <div className="absolute inset-0 hidden md:block bg-black/40" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-14 md:py-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.75rem] font-black tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-5 md:mb-8">
          <span className="w-2 h-2 bg-[#f7941e] rounded-full animate-pulse" />
          CBSE Affiliated · Jaipur
        </div>

        <h1
          className="font-serif italic text-white leading-[1.1] font-light max-w-3xl mb-5 md:mb-8"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          Inspiring young minds<br />
          <span className="text-[#f7941e] not-italic font-bold">to think, create and achieve beyond limits</span>
        </h1>

        <p className="hidden md:block text-white/80 text-xl md:text-2xl max-w-xl leading-relaxed mb-12 font-light">
          Shaping confident learners prepared for life, leadership, and meaningful contribution.
        </p>

      </div>

      {/* ── Desktop stats bar ── */}
      <div className="relative z-10 mx-auto grid w-[calc(100%-3rem)] max-w-[1232px] grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/20 mb-8">
        {STATS.map(({ n, label }) => (
          <div key={label} className="flex min-h-24 flex-col justify-center bg-[#010e3a]/80 px-4 py-5 text-white">
            <strong className="block text-2xl font-semibold text-[#f7941e] mb-2">{n}</strong>
            <span className="mt-2 text-xs font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
