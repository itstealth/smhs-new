"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEnquiry } from "@/components/EnquiryContext";

const STATS = [
  { n: "20K+", label: "Happy Students" },
  { n: "2", label: "Campuses in Jaipur" },
];

export default function ModernHero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section
      className="relative w-full min-h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Static Background Gradients (Performance Optimized) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(163,18,63,0.08) 0%, rgba(163,18,63,0.05) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(1,57,117,0.1) 0%, rgba(163,18,63,0.06) 40%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-8 items-center py-4 sm:py-10 md:py-16 lg:py-0"
      >
        {/* Left Content Area */}
        <div className="flex flex-col items-start pt-1 sm:pt-6 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-white/80 backdrop-blur-md mb-4 sm:mb-8 shadow-sm"
          >
            <div className="h-px w-6 bg-[#a3123f]" />
            <span className="text-[#013975] text-xs font-bold tracking-widest uppercase">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-[#013975] font-serif italic leading-[1.05] mb-3 sm:mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Where Little Seeds<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034ea2] to-[#a3123f] not-italic font-sans font-bold">
              Bloom Brightly.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[#013975]/70 text-base md:text-lg max-w-[480px] mb-4 sm:mb-8 leading-relaxed font-medium"
          >
            Where Learning Meets Innovation. Seedling Group of Schools is a premier institution dedicated to excellence in education, well-rounded achievement — where every learner is inspired to explore, innovate, and excel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={openEnquiry}
              className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-[#034ea2] text-white font-semibold text-sm tracking-wide rounded-full shadow-xl hover:shadow-[#013975]/30 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-2">
                Enquire Now
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
            <Link
              href="/curriculum"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#013975]/20 text-[#013975] font-semibold text-sm tracking-wide rounded-full hover:border-[#013975] hover:bg-[#034ea2]/5 transition-all duration-300"
            >
              Academic Excellence
            </Link>
          </motion.div>
        </div>

        {/* Right Image — single static image */}
        <div className="relative h-[240px] sm:h-[420px] lg:h-[650px] w-full flex items-center justify-center mt-1 sm:mt-2 lg:mt-0 pb-2 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[105%] lg:w-[115%] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl z-10 border-[4px] sm:border-[6px] border-white/50"
          >
            <Image
              src="/smhs_images/seedling_images/group_students.webp"
              alt="School Campus"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 98vw, 50vw"
            />
          </motion.div>

          {/* Floating Stats Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -right-[2%] top-[25%] z-30 hidden sm:flex bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-4 items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#a3123f]/10 flex items-center justify-center text-[#a3123f]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#013975]">{STATS[0].n}</p>
              <p className="text-xs font-semibold text-[#013975]/60 uppercase tracking-wider">{STATS[0].label}</p>
            </div>
          </motion.div>

          {/* Floating Stats Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -left-[5%] bottom-[15%] z-30 hidden sm:flex bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-4 items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#a3123f]/10 flex items-center justify-center text-[#a3123f]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#013975]">{STATS[1].n}</p>
              <p className="text-xs font-semibold text-[#013975]/60 uppercase tracking-wider">{STATS[1].label}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
