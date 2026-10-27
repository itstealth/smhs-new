"use client";

import { motion } from "framer-motion";
import { ExternalLink, Share2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export type CmsNotice = {
  id: string;
  title: string;
  body: string;
  noticeDate: string;
  category: string | null;
  pinned: boolean;
  status: string;
  custom: { source?: string; featured?: boolean; image?: string; [key: string]: unknown };
};

type ViewNews = {
  title: string;
  date: string;
  source: string;
  desc: string;
  image: string;
  featured: boolean;
};

function toViewNews(notice: CmsNotice): ViewNews {
  // noticeDate is a date-only value ("2025-06-15"), which Date parses as UTC
  // midnight. Formatting it in the viewer's zone would show 14 June to anyone
  // west of Greenwich, and would disagree with the server-rendered HTML.
  // Pinning to UTC keeps one date for everyone.
  //
  // day: "2-digit" reproduces the zero-padding the page has always had
  // ("March 05, 2025", not "March 5, 2025").
  const date = new Date(notice.noticeDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  return {
    title: notice.title,
    date,
    source: (notice.custom?.source as string | undefined) ?? "",
    desc: notice.body,
    image: (notice.custom?.image as string | undefined) ?? "/assets/img/sps-banner.webp",
    featured: Boolean(notice.custom?.featured),
  };
}

export default function NewsClient({ notices }: { notices: CmsNotice[] }) {
  const newsItems = notices.map(toViewNews);

  if (newsItems.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="text-2xl font-black text-neutral-400">No news coverage yet.</p>
        <p className="text-neutral-400 mt-4">Check back soon for media highlights.</p>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
