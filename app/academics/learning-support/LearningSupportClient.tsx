"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import {
  Heart,
  Lightbulb,
  Users,
  ShieldCheck,
  Sparkles,
  Zap,
  MessageCircle,
  Brain,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// supportSystems' icon is stored as a string in page_content -- see
// EventsClient.tsx for the reference pattern. Heart is the fallback for an
// unknown/missing name.
const ICONS: Record<string, LucideIcon> = {
  Heart,
  Lightbulb,
  Users,
  ShieldCheck,
  Sparkles,
  Zap,
  MessageCircle,
  Brain,
};

export type CmsSupportSystem = {
  title: string;
  desc: string;
  icon: string;
  points: string[];
  image: string;
  color: string;
};

export default function LearningSupportClient({ supportSystems }: { supportSystems: CmsSupportSystem[] }) {
  return (
    <div className="bg-neutral-bg min-h-screen pt-32 overflow-x-hidden">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Learning Support"
        badge="Student Care"
        breadcrumbs={[{ label: "Learning Support" }]}
      />

      {/* Philosophy Intro */}
      <section className="py-48 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-label mb-8 block uppercase tracking-[0.5em]">The Seedling Ecosystem</span>
          <h2 className="text-heading text-5xl md:text-8xl mb-12">
            Empowering every student <br /> to reach their <span className="text-primary tracking-tighter">potential.</span>
          </h2>
          <p className="text-2xl text-neutral-600 font-medium leading-relaxed max-w-3xl mx-auto">
            At Seedling, learning support is not just about academic remediation; it&apos;s about building a holistic world where students feel safe, understood, and inspired to grow.
          </p>
        </motion.div>
      </section>

      {/* Feature Pillar Grid: Alternating Layouts */}
      {supportSystems.length > 0 && (
      <section className="pb-64 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="space-y-48">
          {supportSystems.map((system, i) => {
            const Icon = ICONS[system.icon] ?? Heart;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-24 group`}
            >
              {/* Image Container with Floating Label */}
              <div className="flex-1 w-full relative h-[600px] rounded-[4rem] overflow-hidden shadow-editorial transition-transform duration-1000 group-hover:scale-[1.02]">
                <Image src={system.image} alt={system.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute top-12 left-12 w-20 h-20 rounded-3xl glass-white flex items-center justify-center text-primary shadow-2xl">
                  <Icon className="w-10 h-10" />
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-1 space-y-12">
                <div className="relative">
                  <div className="absolute top-0 left-0 p-8 text-[15rem] font-black text-black/[0.03] select-none pointer-events-none italic font-serif -translate-y-1/2 -translate-x-12">
                    0{i + 1}
                  </div>
                  <span className="text-label text-secondary mb-6 block font-black uppercase">Support Pillar</span>
                  <h3 className="text-heading text-4xl md:text-5xl mb-8">{system.title}</h3>
                  <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-12">
                    {system.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {system.points.map((point, index) => (
                      <div key={index} className="flex items-center gap-4 group/point">
                        <div className="w-2 h-2 rounded-full bg-primary/20 group-hover/point:bg-primary transition-colors" />
                        <span className="text-sm font-black text-neutral-500 uppercase tracking-widest group-hover/point:text-neutral-950 transition-colors">{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact-us" className="inline-flex items-center gap-6 p-8 bg-neutral-950 text-white rounded-[2.5rem] hover:bg-primary transition-all shadow-editorial group/btn">
                    <div className="w-12 h-12 rounded-full glass-white flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-primary transition-all">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black tracking-tight">Inquire about {system.title}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </section>
      )}

      {/* Philosophy Quote: Immersive Redesign */}
      <section className="py-64 bg-primary text-white text-center relative overflow-hidden rounded-[6rem] mx-4 md:mx-8">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-10">
          <Sparkles className="w-20 h-20 text-secondary mx-auto mb-16 opacity-50" />
          <h2 className="text-heading text-white text-4xl md:text-7xl mb-20 leading-tight">
            &quot;We don&apos;t just teach subjects; we inspire students to live with purpose, integrity, and a lifelong thirst for knowledge.&quot;
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-1 bg-secondary mb-10" />
            <span className="text-label text-white opacity-60 uppercase tracking-[0.5em] block">The Seedling Philosophy</span>
          </div>
        </div>
      </section>

      {/* Final Discovery Section */}
      <section className="py-64 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-heading text-6xl md:text-[8rem] mb-16">
            Discover <br /> <span className="text-primary tracking-tighter">Wellness.</span>
          </h2>
          <Link
            href="/about/leadership"
            className="inline-flex h-24 px-16 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary transition-all group"
          >
            Connect with Counselors
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
