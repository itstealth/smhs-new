"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import HeroWrapper from "@/components/layout/HeroWrapper";

export type Milestone = {
  year: string;
  title: string;
  description: string;
  align: string;
};

export default function LegacyClient({ milestones }: { milestones: Milestone[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-neutral-950 overflow-hidden pb-40">
      <HeroWrapper
        backgroundImage="/assets/about/about-banner.webp"
        title="Our Legacy"
        badge="Since 1993"
        breadcrumbs={[{ label: "Legacy" }]}
      />
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/smhs_images/seedling_images/leaders.webp"
            alt="Heritage Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/20 via-white/80 to-white" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Our Heritage</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-linear-to-b from-neutral-950 to-neutral-950/40">
              The Seedling <br /> Journey
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium italic leading-relaxed">
              &quot;The life of one we love is never lost. Its influence goes on through all the lives it ever touched.&quot;
            </p>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-px h-20 bg-linear-to-b from-secondary to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parallax Timeline Body */}
      <div className="relative max-w-[1200px] mx-auto px-4 mt-20">

        {/* Central Scrolling Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/[0.03] -translate-x-1/2 hidden md:block">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-linear-to-b from-primary via-secondary to-primary origin-top"
          />
        </div>

        <div className="space-y-40">
          {milestones.map((item, idx) => (
            <TimelineItem key={item.year} item={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: Milestone, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`${item.align === 'right' ? 'md:order-1 md:text-right md:pr-20' : 'md:order-2 md:text-left md:pl-20'}`}>
        <div className="flex flex-col">
          <span className="text-8xl font-black text-black/3 -mb-8 leading-none select-none tracking-tighter transition-all group-hover:text-primary/10">
            {item.year}
          </span>
          <span className="text-secondary font-bold tracking-[0.2em] text-sm uppercase mb-4 pl-1">
            Established {item.year}
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-neutral-950 mb-6 leading-tight">
            {item.title}
          </h3>
          <p className="text-lg text-neutral-600 font-medium leading-relaxed max-w-lg mx-0 md:ml-auto md:mr-0">
            {item.description}
          </p>
        </div>
      </div>

      {/* Decorative Connector Dot for Mobile/Desktop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white border-2 border-black/3 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(164,21,70,0.2)]" />
        </div>
      </div>

      <div className={`${item.align === 'right' ? 'md:order-2' : 'md:order-1'}`}>
        {/* Abstract Decorative Element or Placeholder for milestone image */}
        <div className="aspect-video md:aspect-square bg-neutral-50 rounded-premium relative overflow-hidden border border-black/3 group shadow-2xl shadow-black/2">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary/10 font-bold text-9xl">{item.year[2]}{item.year[3]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
