"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  role: string;
  relation: "Parent";
  content: string;
  rating: number;
  avatar: string;
}

// ─── Data ──────────────────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Deepak Gupta & Renu Gupta",
    role: "Parents · Jaipur",
    relation: "Parent",
    content: "We are truly grateful for the support and leadership shown during our children's sports day. Your dedication made the event special and created memories that will last a lifetime.",
    rating: 5,
    avatar: "/smhs_images/testimonials/deepak-gupta.webp",
  },
  {
    id: 2,
    name: "Narendra Kumar Sharma & Soniya Yadav",
    role: "Parents · Vaishali Nagar",
    relation: "Parent",
    content: "The school provides holistic education, nurturing academic growth, creativity, and confidence. Teachers go beyond teaching and create a motivating environment for children.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Soniya-Yadav.webp",
  },
  {
    id: 3,
    name: "Bhanupriya Singh",
    role: "Parent · MI Road",
    relation: "Parent",
    content: "The academic programme is well planned and balanced with co-curricular activities. Teachers and management are doing a great job in grooming children for a bright future.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Bhanupriya-Singh.webp",
  },
  {
    id: 4,
    name: "Mrs. Anita Gupta",
    role: "Parent · Raja Park",
    relation: "Parent",
    content: "The curriculum and teaching methods are impressive. Worksheets and activities help children think beyond textbooks and develop a genuine love for learning.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Anita-Gupta.webp",
  },
  {
    id: 5,
    name: "Ibha Chhabra",
    role: "Parent · Jhotwara",
    relation: "Parent",
    content: "We are grateful for the care, dedication, and guidance provided by the teachers and school management. The environment here truly brings out the best in every child.",
    rating: 5,
    avatar: "/smhs_images/testimonials/ibha-chadra.webp",
  },
  {
    id: 6,
    name: "Aditi Sharma",
    role: "Parent · Vaishali Nagar",
    relation: "Parent",
    content: "The school provides modern, relevant education — giving us real confidence in our child's future. The focus on both academics and life skills is commendable.",
    rating: 5,
    avatar: "/smhs_images/testimonials/aditi-sharma.webp",
  },
  {
    id: 7,
    name: "Sweta Shrivastava",
    role: "Parent · MI Road",
    relation: "Parent",
    content: "Technology integration makes learning interactive and helps children build essential digital skills for the future. The teachers are always available and supportive.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Sweta-Shrivastava.webp",
  },
  {
    id: 8,
    name: "Muskan Rupani",
    role: "Parent · Jaipur",
    relation: "Parent",
    content: "The school sets high standards in education with skilled teachers ensuring overall personality development. We are proud to be part of the Seedling family.",
    rating: 5,
    avatar: "/smhs_images/testimonials/Muskan-Rupani.webp",
  },
];

// ─── Components ────────────────────────────────────────────────────

const RelationBadge = ({ relation }: { relation: Testimonial["relation"] }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border bg-[#d6d1cf]/20 text-[#d6d1cf] border-[#d6d1cf]/30">
    {relation}
  </span>
);

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = testimonials.length - 1;
        if (next >= testimonials.length) next = 0;
        return next;
      });
    },
    []
  );

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#034ea2] py-14 md:py-20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ─── Background Elements ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(249,148,30,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(3,78,162,0.06)_0%,transparent_50%)]" />

        {/* Decorative quote marks */}
        <div className="absolute top-20 left-10 md:left-32 text-white/5">
          <Quote className="w-32 h-32 md:w-48 md:h-48 rotate-180" strokeWidth={1} />
        </div>
        <div className="absolute bottom-20 right-10 md:right-32 text-white/5">
          <Quote className="w-32 h-32 md:w-48 md:h-48" strokeWidth={1} />
        </div>
      </div>

      {/* ─── Content Container ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 fill-[#d6d1cf] text-[#d6d1cf]" />
            Community Voices
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Stories That
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-[#d6d1cf]">Define Us</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
                className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-[#d6d1cf]/20 -z-0 origin-left"
              />
            </span>
          </h2>

          <p className="mt-4 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Real experiences from the Seedling community—students discovering their potential,
            parents witnessing transformation, and alumni changing the world.
          </p>
        </motion.div>

        {/* ─── Main Testimonial Card ───────────────────────────────── */}
        <div className="relative max-w-5xl mx-auto w-full perspective-1000">

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.5 },
              }}
              className="relative bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)] border border-white/10 overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">

                {/* Left: Visual/Identity */}
                <div className="relative bg-gradient-to-br from-[#034ea2] via-[#034ea2] to-[#0a3264] p-4 md:p-6 flex flex-col justify-between min-h-[200px] md:min-h-[280px]">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d6d1cf]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d6d1cf]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                  </div>

                  <div className="relative z-10">
                    <RelationBadge relation={current.relation} />
                  </div>

                  <div className="relative z-10 mt-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-[#d6d1cf]/40 mb-4 flex-shrink-0">
                        <Image
                          src={current.avatar}
                          alt={current.name}
                          width={72}
                          height={72}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">
                        {current.name}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm font-medium">
                        {current.role}
                      </p>
                    </motion.div>
                  </div>

                  {/* Large decorative quote */}
                  <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white/5 rotate-180" />
                </div>

                {/* Right: Content */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(current.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <Star className="w-4 h-4 fill-[#d6d1cf] text-[#d6d1cf]" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-base md:text-lg text-[#034ea2] font-medium leading-relaxed mb-4">
                      &ldquo;{current.content}&rdquo;
                    </blockquote>

                    {/* Decorative line */}
                    <div className="w-12 h-0.5 bg-[#d6d1cf] rounded-full mb-6" />

                    {/* School branding */}
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#d6d1cf]" />
                      <span className="text-sm font-semibold text-[#034ea2]/50 uppercase tracking-wider">
                        Seedling Modern High School
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Navigation ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-10 md:mt-14">

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="group relative h-2 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: idx === currentIndex ? 48 : 16 }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeTestimonial"
                      className="absolute inset-0 bg-[#d6d1cf] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {idx < currentIndex && (
                    <div className="absolute inset-0 bg-[#d6d1cf]/40 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 shadow-sm flex items-center justify-center text-white hover:border-[#a3123f] hover:text-[#a3123f] transition-colors group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#a3123f] shadow-lg shadow-[#a3123f]/25 flex items-center justify-center text-white hover:bg-[#8e1037] transition-colors group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute -bottom-8 right-0 text-white/30 font-mono text-sm">
            <span className="text-white font-bold">0{currentIndex + 1}</span>
            <span className="mx-2">/</span>
            <span>0{testimonials.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
