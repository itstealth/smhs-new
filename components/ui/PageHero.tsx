"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem]">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper/80 via-navy-deeper/20 to-off-white/10" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-sand mb-8 block drop-shadow-md font-dm">
            Seedling Group of Schools
          </span>
          <h1 className="text-6xl md:text-[7rem] font-black tracking-tight text-white leading-[1.1] mb-8 drop-shadow-2xl font-playfair">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg font-dm">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
