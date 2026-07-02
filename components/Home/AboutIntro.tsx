"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutIntro() {
  return (
    <section className="py-16 lg:py-32 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#a3123f] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Who We Are</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#034ea2] leading-tight mb-6">
              A Legacy of Learning,<br />
              <span className="text-[#a3123f] italic">A Future of Promise</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Seedling Group of Schools upholds a legacy of excellence in education, well-rounded achievement. We foster a safe, inclusive, and student-centered environment where every learner is encouraged to explore, innovate, and excel.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our approach integrates academic excellence, 21st-century skills, critical thinking, creativity, and experiential learning. With modern infrastructure, smart classrooms, and experienced faculty, we balance scholastic and co-scholastic development — nurturing leadership, communication, problem-solving, and emotional intelligence to prepare students as future-ready global citizens.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[#a3123f] font-semibold text-sm hover:gap-3 transition-all duration-200">
              Our Full Story
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          {/* Right side - Image Grid with tilted images */}
          <div className="relative">
            {/* sm+: Asymmetric Image Grid with tilted images */}
            <div className="relative h-[300px] lg:h-[400px]">
              <div className="grid grid-cols-12 gap-3 h-full">
                {/* Large left image - slightly tilted */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="col-span-5 relative group overflow-hidden rounded-lg h-full"
                >
                  <Image
                    src="/smhs_images/seedling_images/img423.webp"
                    alt="School campus"
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                    <p className="text-white font-semibold text-lg">Our Campus</p>
                    <p className="text-white/70 text-sm">10 acres of learning space</p>
                  </div>
                </motion.div>

                {/* Right column - stacked images with tilt */}
                <div className="col-span-7 flex flex-col gap-3 h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30, rotate: 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex-1 min-h-[100px] group overflow-hidden rounded-lg"
                  >
                    <Image
                      src="/smhs_images/seedling_images/img425.webp"
                      alt="Students learning"
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                      <p className="text-white font-semibold text-lg">Student Life</p>
                      <p className="text-white/70 text-sm">Learning beyond classrooms</p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 flex-1 min-h-[100px]">
                    <motion.div
                      initial={{ opacity: 0, y: 30, rotate: -2 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src="/smhs_images/seedling_images/swimming_home.webp"
                        alt="Sports activities"
                        fill
                        sizes="25vw"
                        className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                        <p className="text-white font-semibold text-sm">Sports</p>
                        <p className="text-white/60 text-xs">Olympic facilities</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30, rotate: 3 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src="/smhs_images/seedling_images/img427.webp"
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
