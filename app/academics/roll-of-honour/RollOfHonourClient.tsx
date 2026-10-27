"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import {
  Award,
  Star,
  Trophy,
  Sparkles,
  Users,
  Globe,
  PartyPopper,
  Medal,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// achievements' icon is stored as a string in page_content -- see
// EventsClient.tsx for the reference pattern. Trophy is the fallback for an
// unknown/missing name.
const ICONS: Record<string, LucideIcon> = {
  Award,
  Star,
  Trophy,
  Sparkles,
  Users,
  Globe,
  PartyPopper,
  Medal,
};

export type CmsAchievement = {
  title: string;
  desc: string;
  icon: string;
  stat: string;
  color: string;
};

// Hall of Fame rows are public.honour_roll rows (see
// scripts/import-smhs-academics.ts) -- name -> studentName,
// count -> stat, sub -> achievement.
export type CmsHonourRollEntry = {
  id: string;
  studentName: string;
  achievement: string | null;
  stat: string | null;
};

type ViewRow = { name: string; count: string; sub: string };

function toViewRow(entry: CmsHonourRollEntry): ViewRow {
  return {
    name: entry.studentName,
    count: entry.stat ?? "",
    sub: entry.achievement ?? "",
  };
}

type RollOfHonourClientProps = {
  achievements: CmsAchievement[];
  hallOfFame: CmsHonourRollEntry[];
};

export default function RollOfHonourClient({ achievements, hallOfFame: cmsHallOfFame }: RollOfHonourClientProps) {
  const hallOfFame = cmsHallOfFame.map(toViewRow);

  return (
    <div className="bg-neutral-bg min-h-screen pt-32 overflow-x-hidden">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Roll of Honour"
        badge="Achievements"
        breadcrumbs={[{ label: "Honour" }]}
      />

      {/* Excellence Statistics: Glass Gallery */}
      {achievements.length > 0 && (
      <section className="py-48 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {achievements.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Trophy;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-white p-16 rounded-[4rem] border-white/60 group hover:shadow-premium-hover transition-all duration-700 text-center"
            >
               <div className={`w-24 h-24 rounded-3xl bg-${item.color}/5 flex items-center justify-center text-${item.color} mx-auto mb-12 shadow-inner group-hover:scale-110 group-hover:bg-${item.color} group-hover:text-white transition-all duration-700`}>
                  <Icon className="w-12 h-12" />
               </div>
               <div className="text-6xl font-black text-neutral-950 mb-6 tracking-tighter">{item.stat}</div>
               <h3 className="text-2xl font-black text-neutral-950 mb-6 tracking-tight">{item.title}</h3>
               <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                 {item.desc}
               </p>
            </motion.div>
            );
          })}
        </div>
      </section>
      )}

      {/* Achievement Photo Gallery */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-80 rounded-[3rem] overflow-hidden shadow-editorial group"
          >
            <Image
              src="/smhs_images/seedling_images/merit_image.webp"
              alt="Merit Award Ceremony"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-2">Merit Awards</span>
              <p className="text-white font-black text-2xl tracking-tight">Recognising Excellence</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative h-80 rounded-[3rem] overflow-hidden shadow-editorial group"
          >
            <Image
              src="/smhs_images/seedling_images/winner_at_cbse.webp"
              alt="CBSE Winners"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-2">CBSE Results</span>
              <p className="text-white font-black text-2xl tracking-tight">Our Board Toppers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hall of Fame: Masonry inspired List */}
      {hallOfFame.length > 0 && (
      <section className="py-48 bg-white border-y border-black/5 rounded-[6rem] mx-4 md:mx-8">
        <div className="max-w-[1200px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
              <div className="max-w-xl">
                 <span className="text-label mb-8 block uppercase">Student Success</span>
                 <h2 className="text-heading text-6xl md:text-9xl tracking-tight">The Board <br /> Hall of Fame.</h2>
              </div>
              <p className="text-xl text-neutral-500 max-w-sm font-medium leading-relaxed block border-l-4 border-secondary pl-8 py-4">
                 Celebrating our students who have consistently pushed the boundaries of academic excellence.
              </p>
           </div>

           <div className="space-y-8">
              {hallOfFame.map((row, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 20, backgroundColor: 'rgba(23,81,144,0.03)' }}
                  className="group flex flex-col md:flex-row items-center justify-between p-12 rounded-[3.5rem] border border-black/5 hover:border-primary/20 transition-all duration-700 group cursor-default"
                >
                   <div className="flex items-center gap-12 mb-8 md:mb-0">
                      <div className="text-8xl font-black text-black/[0.03] group-hover:text-primary/10 select-none font-serif italic">
                         0{i+1}
                      </div>
                      <div className="text-left">
                         <h4 className="text-3xl font-black text-neutral-950 mb-2 tracking-tight">{row.name}</h4>
                         <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{row.sub}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-4xl font-black text-secondary mb-2">{row.count}</div>
                      <Link href="/about" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all opacity-0 group-hover:opacity-100">
                         View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
      )}

      {/* Inspirational Footer */}
      <section className="py-64 bg-neutral-950 relative overflow-hidden rounded-t-[6rem]">
         <div className="absolute inset-0 mesh-gradient opacity-10" />
         <div className="relative z-10 max-w-4xl mx-auto text-center px-10">
            <Medal className="w-20 h-20 text-secondary mx-auto mb-12 opacity-50" />
            <h2 className="text-heading text-white text-6xl md:text-[8rem] mb-16">
               Excellence <br /> <span className="text-primary tracking-tighter">Endures.</span>
            </h2>
            <p className="text-2xl text-white/50 font-medium mb-20 leading-relaxed max-w-2xl mx-auto">
               We celebrate not just the result, but the grit, determination, and consistency that leads to it.
            </p>
            <Link
               href="/contact-us"
               className="inline-flex h-24 px-16 bg-white text-neutral-950 rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary hover:text-white transition-all group"
            >
               Connect with Us
               <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </section>

    </div>
  );
}
