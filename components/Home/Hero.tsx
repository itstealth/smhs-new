import HeroVideo from "@/components/ui/HeroVideo";
import { Award, BookOpen, MapPin, School } from "lucide-react";

const STATS = [
  { n: "Durgapura", label: "Jaipur", Icon: School },
  { n: "CBSE", label: "Curriculum", Icon: BookOpen },
  { n: "33+", label: "Years of Trust", Icon: Award },
  { n: "Jaipur", label: "Durgapura", Icon: MapPin },
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

      {/* ── Glass information cards ── */}
      <div className="relative z-10 mx-auto mb-7 grid w-[calc(100%-3rem)] max-w-[1248px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {STATS.map(({ n, label, Icon }) => (
          <div
            key={label}
            className="group flex min-h-[150px] flex-col items-center justify-center rounded-[1.6rem] border border-white/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.27),rgba(255,255,255,0.12))] px-4 py-5 text-center text-white shadow-[0_14px_35px_rgba(0,14,58,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/55 hover:bg-white/25 sm:min-h-[165px] sm:px-6 sm:py-6"
          >
            <Icon aria-hidden="true" className="mb-4 h-8 w-8 stroke-[1.8] text-white sm:h-9 sm:w-9" />
            <strong className="block font-serif text-xl font-bold leading-none text-white sm:text-2xl">{n}</strong>
            <span className="mt-3 text-[11px] font-semibold leading-snug text-white/75 sm:text-xs">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
