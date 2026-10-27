"use client";
import { motion } from "framer-motion";

interface QuoteStripProps {
  quote: string;
  highlight?: string;
}

export default function QuoteStrip({ quote, highlight }: QuoteStripProps) {
  const parts = highlight ? quote.split(highlight) : null;

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Faint large " behind text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-serif text-[22rem] leading-none text-[#013975]/[0.03]"
          style={{ marginTop: "-2rem" }}
        >
          &#8220;
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-8 bg-[#a3123f]" />
          <span className="text-[#a3123f] text-[9px] font-bold tracking-[0.45em] uppercase">
            Seedling Modern High School
          </span>
          <span className="h-px w-8 bg-[#a3123f]" />
        </motion.div>

        {/* Quote text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif italic text-[#013975] leading-[1.35]"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)" }}
        >
          {parts ? (
            <>
              {parts[0]}
              <em className="not-italic text-[#a3123f]">{highlight}</em>
              {parts[1]}
            </>
          ) : (
            quote
          )}
        </motion.p>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformOrigin: "center" }}
          className="mt-8 h-[3px] w-12 bg-[#a3123f] rounded-full mx-auto"
        />
      </div>
    </section>
  );
}
