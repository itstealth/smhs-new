"use client";
import Link from "next/link";
import Image from "next/image";

const curriculum = [
  { stage: "Pre-Primary", years: "Ages 3–5", desc: "Play-based early childhood programme", image: "/smhs_images/seedling_images/pre-primary.webp" },
  { stage: "Primary", years: "Grades 1–5", desc: "Foundation in literacy, numeracy & values", image: "/smhs_images/seedling_images/primary_home.webp" },
  { stage: "Middle School", years: "Grades 6–8", desc: "Enquiry-led interdisciplinary learning", image: "/smhs_images/seedling_images/middle_home.webp" },
  { stage: "Senior School", years: "Grades 9–12", desc: "CBSE curriculum with deep specialisation", image: "/smhs_images/seedling_images/senior_home.webp" },
];

export default function AcademicsSection() {
  return (
    <section className="relative py-12 lg:py-16 bg-[#034ea2] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #d6d1cf 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <p className="text-[#d6d1cf] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Our Curriculum</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">
            Education Built for <span className="italic text-[#d6d1cf]">Excellence</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl leading-relaxed">
            At Seedling Modern High School, we go beyond traditional education — creating a learning environment where every child is valued, inspired, and empowered to succeed.
          </p>
          <Link href="/curriculum" className="inline-flex items-center gap-2 px-6 py-3 bg-[#a3123f] text-white text-sm font-bold rounded-sm hover:bg-[#8e1037] transition-colors duration-300 mt-5">
            Explore Academics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>

        {/* Tags strip */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["Academic Excellence","CBSE Curriculum","Smart Classrooms","Experiential Learning","Critical Thinking","Personalized Attention","Sports & Performing Arts","Safe & Inclusive Campus","Future-Ready Education","Character Development"].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 text-[11px] font-semibold rounded-full border border-white/15">{tag}</span>
          ))}
        </div>

        {/* Cards — 4 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {curriculum.map((s) => (
            <div key={s.stage} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer border border-white/10 hover:border-[#d6d1cf]/50 transition-colors duration-300">
              <Image
                src={s.image}
                alt={s.stage}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013975]/90 via-[#013975]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p className="text-[#d6d1cf] text-[10px] uppercase tracking-wider font-semibold mb-1">
                  {s.years}
                </p>
                <p className="font-serif text-white font-bold text-base lg:text-lg leading-snug mb-1">
                  {s.stage}
                </p>
                <p className="text-white/70 text-xs leading-relaxed hidden sm:block">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
