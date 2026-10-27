"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutModernSection() {
  return (
    <section className="py-14 lg:py-20 bg-[#034ea2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6d1cf] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Who We Are</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              A Legacy of Learning,<br />
              <span className="text-[#d6d1cf] italic">A Future of Promise</span>
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Seedling Group of Schools upholds a legacy of excellence in education, well-rounded achievement. We foster a safe, inclusive, and student-centered environment where every learner is encouraged to explore, innovate, and excel.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Our approach integrates academic excellence, 21st-century skills, critical thinking, creativity, and experiential learning. With modern infrastructure, smart classrooms, and experienced faculty, we balance scholastic and co-scholastic development — nurturing leadership, communication, problem-solving, and emotional intelligence to prepare students as future-ready global citizens.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[#d6d1cf] font-semibold text-sm hover:gap-3 transition-all duration-200">
              Our Full Story
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          {/* Right side - Image Grid with tilted images */}
          <div className="relative">
            {/* sm+: Asymmetric Image Grid with tilted images */}
            <div className="relative h-[300px] lg:h-[400px]">
              <div className="grid grid-cols-12 gap-3 h-full">
                {/* Large left image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="col-span-5 relative group overflow-hidden rounded-lg h-full"
                >
                  <Image
                    src="/smhs_images/seedling_images/library_home.webp"
                    alt="Library"
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                    <p className="text-white font-semibold text-lg">Library</p>
                    <p className="text-white/70 text-sm">20,000+ titles & digital resources</p>
                  </div>
                </motion.div>

                {/* Right column - stacked images */}
                <div className="col-span-7 flex flex-col gap-3 h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex-1 min-h-[100px] group overflow-hidden rounded-lg"
                  >
                    <Image
                      src="/smhs_images/seedling_images/swimming_home.webp"
                      alt="Swimming Pool"
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                      <p className="text-white font-semibold text-lg">Sports</p>
                      <p className="text-white/70 text-sm">Olympic facilities</p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 flex-1 min-h-[100px]">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src="/smhs_images/seedling_images/student_life.webp"
                        alt="Student Life"
                        fill
                        sizes="25vw"
                        className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                        <p className="text-white font-semibold text-sm">Student Life</p>
                        <p className="text-white/60 text-xs">Learning beyond classrooms</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src="/smhs_images/seedling_images/arts.webp"
                        alt="Creative arts"
                        fill
                        sizes="25vw"
                        className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                        <p className="text-white font-semibold text-sm">Arts</p>
                        <p className="text-white/60 text-xs">Creativity unleashed</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 bg-[#a3123f] text-white px-4 py-2 rounded-lg shadow-xl z-10">
                <p className="font-serif text-xl font-black">33+</p>
                <p className="text-white/60 text-[9px] uppercase tracking-wider">Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
