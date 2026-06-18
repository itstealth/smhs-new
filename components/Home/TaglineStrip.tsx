"use client";
import { motion } from "framer-motion";

export default function TaglineStrip() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background gradient */}

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a3123f] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a3123f] to-transparent" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(-45deg, #a3123f 0px, #a3123f 1px, transparent 1px, transparent 52px)`,
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 lg:gap-6">
          {/* Left gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-[1px] w-12 lg:w-24 bg-gradient-to-r from-transparent to-[#a3123f] origin-right"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ffffff] leading-tight"
          >
            "Educating minds, shaping character,{" "}
            <span className="text-[#a3123f] italic">and inspiring lifelong success.</span>"
          </motion.p>

          {/* Right gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="h-[1px] w-12 lg:w-24 bg-gradient-to-l from-transparent to-[#a3123f] origin-left"
          />
        </div>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 text-white/40 text-xs lg:text-sm uppercase tracking-[0.3em]"
        >
          — Seedling Modern High School
        </motion.p>
      </div>

      {/* Fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#ffffff]" />
    </section>
  );
}