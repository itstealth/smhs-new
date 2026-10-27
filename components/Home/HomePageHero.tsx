"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HomePageHeroProps {
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function HomePageHero({
  backgroundImage = "/smhs_images/seedling_images/img393.webp",
  breadcrumbs,
}: HomePageHeroProps) {
  return (
    <section className="relative w-full flex flex-col overflow-hidden" style={{ minHeight: "65vh" }}>
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={backgroundImage}
          alt="Seedling Modern High School"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Title area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-28">
        <div className="bg-[#034ea2]/90 rounded-3xl px-10 py-8 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[#a3123f] text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mb-5"
        >
          Welcome to Seedling
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          className="text-white font-bold text-center uppercase leading-none"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.01em" }}
        >
          Nurturing Excellence
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.85 }}
          style={{ transformOrigin: "center" }}
          className="mt-5 h-[3px] w-24 bg-gradient-to-r from-[#a3123f] to-[#a3123f] rounded-full"
        />
        </div>
      </div>

      {/* Bottom bar with breadcrumbs */}
      <div className="relative z-10 bg-[#034ea2]/90 backdrop-blur-md border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-center py-4">
          {breadcrumbs ? (
            <nav className="flex items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white/50 text-[10px] font-semibold uppercase tracking-widest hover:text-[#a3123f] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-white/20 text-[10px]">›</span>
                  )}
                </span>
              ))}
            </nav>
          ) : (
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
              Empowering Future Leaders Since 1993
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
