"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import {
  History,
  Target,
  Eye,
  Award,
  Users,
  Globe2,
  Sparkles,
  Quote,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Leader = {
  name: string;
  role: string;
  quote: string;
  image: string;
  initials: string;
};

export default function About1Client({ leaders }: { leaders: Leader[] }) {
  return (
    <div className="bg-neutral-bg min-h-screen pt-32 overflow-x-hidden">
      <HeroWrapper
        backgroundImage="/assets/about/about-banner.webp"
        title="About"
        subtitle="Us"
        badge="CBSE Affiliated · Jaipur"
        breadcrumbs={[{ label: "About" }]}
      />
      <section className="py-48 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-label mb-8 block">The Seedling Legacy</span>
            <h1 className="text-heading text-7xl md:text-[12rem] leading-[0.8] mb-16">
              Shaping <br />
              <span className="text-primary italic">Generations.</span>
            </h1>
            <div className="w-px h-32 bg-linear-to-b from-primary/30 to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-950 mb-8 font-serif italic">The Seedling Story.</h2>
              <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-8">
                Founded over three decades ago, Seedling Group of Schools began with a vision to revolutionize the educational landscape of Jaipur.
              </p>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                What started as a single innovative pre-school has evolved into a global powerhouse of learning, housing multiple prestigious schools that cater to CBSE and Cambridge international standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[5rem] overflow-hidden shadow-editorial"
            >
              <Image src="/smhs_images/seedling_images/img436.webp" alt="Students in Classroom" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership: Portrait Focused Section */}
      <section className="py-48 bg-white border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <span className="text-label mb-8 block uppercase">Directorial Vision</span>
            <h2 className="text-heading text-6xl md:text-9xl">Our Pathfinders.</h2>
          </div>

          <div className="space-y-48">
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20 group`}
              >
                {/* Portrait Container */}
                <div className="flex-1 w-full max-w-xl aspect-[3/4] relative rounded-[4rem] overflow-hidden shadow-editorial transition-transform duration-1000 group-hover:scale-[1.02]">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-700" />
                </div>

                {/* Content Container */}
                <div className="flex-1 space-y-10 relative">
                  <div className="absolute top-0 left-0 p-8 text-[15rem] font-black text-black/[0.03] select-none pointer-events-none italic font-serif -translate-y-1/2 -translate-x-12 group-hover:text-primary/[0.05] transition-colors">
                    {leader.initials}
                  </div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-neutral-950 flex items-center justify-center text-white mb-10 shadow-2xl group-hover:bg-primary transition-colors">
                      <Quote className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-neutral-950 mb-4 tracking-tighter">{leader.name}</h3>
                    <span className="text-sm font-black text-primary uppercase tracking-[0.3em] block mb-10">{leader.role}</span>

                    <p className="text-2xl md:text-3xl text-neutral-600 font-serif italic leading-snug mb-12">
                      &quot;{leader.quote}&quot;
                    </p>

                    <div className="flex items-center gap-6 pt-12 border-t border-black/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Connect Presence</span>
                        <Link href="#" className="text-sm font-black text-neutral-950 hover:text-primary transition-colors">LinkedIn Profile</Link>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision: Split-Screen Mastery */}
      <section className="py-48 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Mission */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative h-[800px] rounded-[5rem] overflow-hidden bg-primary p-20 flex flex-col justify-end transition-all duration-700 shadow-editorial"
          >
            <div className="absolute inset-0 mesh-gradient opacity-20" />
            <div className="absolute top-20 right-20 w-32 h-32 rounded-full glass flex items-center justify-center border-white/20 bg-white/10 group-hover:scale-110 transition-transform">
              <Target className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
              <span className="text-white/60 font-black uppercase tracking-[0.4em] text-xs mb-8 block">Projecting Future</span>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter mb-10 italic font-serif">The Mission.</h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed max-w-md">
                To provide an environment that facilitates intellectual curiosity, character development, and academic excellence, empowering students to lead with purpose.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative h-[800px] rounded-[5rem] overflow-hidden bg-white border border-black/3 p-20 flex flex-col justify-end transition-all duration-700 shadow-editorial"
          >
            <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-neutral-50 flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform shadow-inner">
              <Eye className="w-16 h-16 text-primary" />
            </div>

            <div className="relative z-10">
              <span className="text-label mb-8 block">Global Perspective</span>
              <h2 className="text-heading text-4xl md:text-5xl mb-10">The Vision.</h2>
              <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-md">
                To be a global benchmark in education, creating enlightened citizens who are equipped with the skills and ethics to shape a better world.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Values: Large-Format Cards */}
      <section className="py-48 bg-neutral-950 relative overflow-hidden rounded-t-[6rem]">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-10">
          <div className="text-center mb-32">
            <span className="text-label text-secondary mb-8 block uppercase tracking-[0.5em]">Defining excellence</span>
            <h2 className="text-heading text-white text-7xl md:text-9xl">Our Core Ideals.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Empowerment", desc: "Instilling the confidence to lead and innovate.", icon: Sparkles },
              { title: "Authenticity", desc: "Honoring traditional values in a modern context.", icon: History },
              { title: "Globalism", desc: "Connecting local talent with world-wide horizons.", icon: Globe2 }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-2xl p-16 rounded-[4rem] border border-white/5 group hover:bg-primary transition-all duration-700"
              >
                <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-white mb-12 shadow-2xl group-hover:scale-110 transition-transform">
                  {(() => {
                    const Icon = value.icon;
                    return <Icon className="w-10 h-10" />;
                  })()}
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">{value.title}</h3>
                <p className="text-lg text-white/50 leading-relaxed font-medium group-hover:text-white/90 transition-colors">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Journey */}
      <section className="py-64 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-label mb-10 block">Ready to explore?</span>
          <h2 className="text-heading text-6xl md:text-[8rem] mb-16">
            Experience <br /> <span className="text-primary tracking-tighter">Growth.</span>
          </h2>
          <Link
            href="/curriculum"
            className="inline-flex h-24 px-16 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary transition-all group"
          >
            Browse Academics
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
