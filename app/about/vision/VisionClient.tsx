"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { Target, Eye, Sparkles, Globe2, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

// icon is stored as a string in the CMS (page_content.data[].icon) --
// lucide components can't be serialised over JSON. Sparkles is the
// fallback for an unknown/missing name, same pattern as EventsClient.tsx.
const ICONS: Record<string, LucideIcon> = { Target, Eye, Sparkles, Globe2, ShieldCheck, Heart };

export type Pillar = { icon: string; title: string; desc: string };

export default function VisionClient({ pillars }: { pillars: Pillar[] }) {
  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/about/about-banner.webp"
        title="Vision & Mission"
        badge="Our Purpose"
        breadcrumbs={[{ label: "Vision & Mission" }]}
      />

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-32">
          <span className="text-label mb-8 block uppercase">Defining Excellence</span>
          <h2 className="text-heading text-6xl md:text-[9rem] leading-[0.85] tracking-tighter">
            Our Core <br /> <span className="text-primary italic font-serif">Philosophy.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-16 rounded-[4rem] border border-black/5 shadow-editorial hover:bg-primary group transition-all duration-700"
            >
              <div className="w-20 h-20 rounded-3xl bg-neutral-50 flex items-center justify-center text-secondary mb-12 shadow-inner group-hover:bg-white group-hover:scale-110 transition-all">
                {(() => {
                  const Icon = ICONS[pillar.icon] ?? Sparkles;
                  return <Icon className="w-10 h-10" />;
                })()}
              </div>
              <h3 className="text-3xl font-black text-neutral-950 mb-6 tracking-tighter group-hover:text-white transition-colors">{pillar.title}</h3>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed group-hover:text-white/70 transition-colors">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="pt-16 pb-10 bg-neutral-950 text-white rounded-[5rem] mx-4 md:mx-8 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-10 text-center">
          <p className="serif italic text-4xl md:text-6xl text-white/90 font-light leading-tight mb-16">
            "Education is not the filling of a pail, but the lighting of a fire."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary mb-6">
              <img src="/smhs_images/seedling_images/Mohini_bakshi.webp" alt="Founder" className="w-full h-full object-cover" />
            </div>
            <p className="text-xl font-black tracking-tight">Late Ms. Mohini Bakshi</p>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mt-2">Founder Director</p>
          </div>
        </div>
      </section>

      {/* Final Journey CTA */}
      <section className="pt-16 pb-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-heading text-4xl md:text-5xl mb-16 italic font-serif">Experience <br /> <span className="text-primary tracking-tighter">Growth.</span></h2>
          <Link
            href="/admissions"
            className="inline-flex h-24 px-16 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary transition-all group"
          >
            Start Your Journey
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
