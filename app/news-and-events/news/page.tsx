"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { Newspaper, ExternalLink, Calendar, ArrowRight, Share2 } from "lucide-react";
import Image from "next/image";

const newsItems = [
  {
    title: "Seedling Group Wins 'Best School in Rajasthan' Award",
    date: "June 15, 2025",
    source: "Education World",
    desc: "Recognized for academic excellence, state-of-the-art infrastructure, and innovative teaching methods at the National Education Awards.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80",
    featured: true
  },
  {
    title: "Seedling Students Shine in CBSE Class XII Results",
    date: "May 22, 2025",
    source: "Jaipur Times",
    desc: "Over 40% students score above 90%, with school toppers reaching 98.4% in Science and Commerce streams.",
    image: "https://images.unsplash.com/photo-1523580494863-6f30312248f5?auto=format&fit=crop&q=80"
  },
  {
    title: "SMHS Students Win National Science Olympiad",
    date: "April 10, 2025",
    source: "Dainik Bhaskar",
    desc: "Seedling Modern High School students bring home gold at the National Science Olympiad, outperforming 500+ schools across India.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
  },
  {
    title: "New STEAM Lab Inaugurated at SMHS Campus",
    date: "March 05, 2025",
    source: "The Hindu",
    desc: "Advanced robotics and AI lab to foster innovation among middle and senior school students.",
    image: "https://images.unsplash.com/photo-1564910443496-5fd2d068ddca?auto=format&fit=crop&q=80"
  }
];

export default function NewsCoveragePage() {
  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.jpg"
        title="News & Updates"
        badge="Latest News"
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <Newspaper className="text-secondary w-10 h-10" />
          <h2 className="text-heading text-4xl md:text-5xl">Media Highlights.</h2>
        </div>

        {/* Featured News */}
        {newsItems.filter(item => item.featured).map((news, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-editorial mb-20"
          >
            <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end text-white max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-6 py-2 rounded-full bg-secondary text-white text-xs font-black uppercase tracking-widest">Featured News</span>
                <span className="text-white/60 font-black text-xs uppercase tracking-widest">{news.date}</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                {news.title}
              </h3>
              <p className="text-xl text-white/70 font-medium mb-10 leading-relaxed max-w-2xl">
                {news.desc}
              </p>
              <div className="flex items-center gap-8">
                <button className="flex items-center gap-3 font-black uppercase tracking-widest text-sm hover:text-secondary transition-colors">
                  Read Full Story <ExternalLink className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-white/40 font-black text-sm">
                  Source: <span className="text-white">{news.source}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {newsItems.filter(item => !item.featured).map((news, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-8 shadow-editorial">
                <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all" />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-label text-neutral-400">{news.date}</span>
                  <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-2xl font-black text-neutral-950 mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
                <p className="text-neutral-500 font-medium leading-relaxed mb-8 flex-1">
                  {news.desc}
                </p>
                <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                  <span className="text-sm font-black text-neutral-400">Via {news.source}</span>
                  <button className="flex items-center gap-2 font-black text-primary hover:text-secondary transition-colors text-sm">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archives Section */}
      <section className="pt-16 pb-10 bg-neutral-950 text-white rounded-t-[5rem] mx-4 md:mx-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Calendar className="w-16 h-16 text-secondary mx-auto mb-10" />
          <h2 className="text-heading text-white text-4xl md:text-5xl mb-12 italic font-serif">News Archives.</h2>
          <p className="text-white/50 text-xl font-medium mb-16 max-w-xl mx-auto leading-relaxed">
            Looking for older milestones? Explore our complete library of press releases and media clippings since 1993.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["2024", "2023", "2022", "2021"].map((year) => (
              <button key={year} className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black hover:bg-white hover:text-neutral-950 transition-all">
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
