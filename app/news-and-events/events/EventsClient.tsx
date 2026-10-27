"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Music, Trophy, Users, Star } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

// The CMS stores the icon as a string (lib/content/events.ts custom.icon) --
// lucide components can't be serialised over JSON, so this is the lookup the
// task brief calls for. Star is the fallback for an unknown/missing name.
const ICONS: Record<string, LucideIcon> = { Trophy, Music, Users, Star, Calendar };

export type CmsEvent = {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string | null;
  venue: string | null;
  category: string | null;
  coverImage: string | null;
  status: string;
  custom: { icon?: string; time?: string; order?: number; [key: string]: unknown };
};

type ViewEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  icon: LucideIcon;
  image: string;
  desc: string;
};

// The school is in Jaipur, so an event's date is its date in India. startAt is
// an instant (2026-10-02T18:30:00Z is midnight IST on the 3rd); formatting it
// in the viewer's own zone would show the 2nd to anyone west of India and
// disagree with the server-rendered HTML. Pinning the zone gives one answer.
const SCHOOL_TZ = "Asia/Kolkata";

function dateParts(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "long",
    // 2-digit reproduces the zero-padding this page has always had:
    // "October 03, 2026", not "October 3, 2026".
    day: "2-digit",
    year: "numeric",
    timeZone: SCHOOL_TZ,
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { month: get("month"), day: get("day"), year: get("year") };
}

/** "October 03, 2026", or "December 05-07, 2026" for an event spanning days. */
function formatEventDate(startAt: string, endAt: string | null): string {
  const start = dateParts(startAt);
  const single = `${start.month} ${start.day}, ${start.year}`;
  if (!endAt) return single;

  const end = dateParts(endAt);
  if (end.day === start.day && end.month === start.month && end.year === start.year) {
    return single;
  }
  if (end.month === start.month && end.year === start.year) {
    return `${start.month} ${start.day}-${end.day}, ${start.year}`;
  }
  return `${single} - ${end.month} ${end.day}, ${end.year}`;
}

function toViewEvent(event: CmsEvent): ViewEvent {
  const date = formatEventDate(event.startAt, event.endAt);
  return {
    title: event.title,
    date,
    time: (event.custom?.time as string | undefined) ?? "",
    location: event.venue ?? "",
    category: event.category ?? "Event",
    icon: ICONS[(event.custom?.icon as string) ?? ""] ?? Star,
    image: event.coverImage ?? "/smhs_images/seedling_images/img107.webp",
    desc: event.description,
  };
}

/**
 * The CMS returns events newest-first, but this page has always shown a
 * hand-picked order -- the first one is rendered as the large featured block,
 * and that is an editorial choice, not "whichever is furthest in the future".
 * `custom.order` carries that choice; events without it keep the CMS order and
 * sort after the ones that have it.
 */
function byDisplayOrder(a: CmsEvent, b: CmsEvent): number {
  const rank = (e: CmsEvent) =>
    typeof e.custom?.order === "number" ? e.custom.order : Number.POSITIVE_INFINITY;
  return rank(a) - rank(b);
}

export default function EventsClient({ events: cmsEvents }: { events: CmsEvent[] }) {
  const events = [...cmsEvents].sort(byDisplayOrder).map(toViewEvent);

  if (events.length === 0) {
    return (
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="py-32 text-center">
          <p className="text-2xl font-black text-neutral-400">No upcoming events right now.</p>
          <p className="text-neutral-400 mt-4">Check back soon for what's coming up.</p>
        </div>
      </section>
    );
  }

  const FeaturedIcon = events[0].icon;
  return (
    <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-24">
        {["All Events", "Cultural", "Sports", "Academic", "Innovation"].map((cat, i) => (
          <button
            key={cat}
            className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
              i === 0 ? "bg-neutral-950 text-white shadow-editorial" : "bg-white text-neutral-400 hover:bg-neutral-50 border border-black/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Event Card (Horizontal) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative flex flex-col lg:flex-row bg-white rounded-[4rem] overflow-hidden shadow-editorial mb-20 border border-black/5"
      >
        <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <Image src={events[0].image} alt={events[0].title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute top-10 left-10">
            <span className="px-6 py-2 rounded-full bg-secondary text-white text-xs font-black uppercase tracking-widest shadow-lg">Featured Event</span>
          </div>
        </div>
        <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <FeaturedIcon className="text-secondary w-6 h-6" />
            <span className="text-label text-neutral-400">{events[0].category}</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight group-hover:text-primary transition-colors">
            {events[0].title}
          </h3>
          <div className="grid grid-cols-2 gap-8 mb-10 pb-10 border-b border-black/5">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> Date</span>
              <p className="text-sm font-black text-neutral-950 tracking-tight">{events[0].date}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> Venue</span>
              <p className="text-sm font-black text-neutral-950 tracking-tight">{events[0].location}</p>
            </div>
          </div>
          <p className="text-lg text-neutral-500 font-medium leading-relaxed mb-10">
            {events[0].desc}
          </p>
          <button className="inline-flex h-20 px-12 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-lg hover:bg-primary transition-all group w-fit">
            Register for Event
            <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {events.slice(1).map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[3.5rem] overflow-hidden shadow-editorial border border-black/5 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 rounded-2xl glass-white flex items-center justify-center text-primary shadow-lg">
                  {(() => {
                    const EventIcon = event.icon;
                    return <EventIcon className="w-6 h-6" />;
                  })()}
                </div>
              </div>
            </div>

            <div className="p-10 flex flex-col flex-1">
              <span className="text-label text-neutral-400 mb-4 block">{event.category}</span>
              <h4 className="text-2xl font-black text-neutral-950 mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
                {event.title}
              </h4>
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm font-black text-neutral-600">
                  <Calendar className="w-4 h-4 text-secondary" />
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-sm font-black text-neutral-600">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {event.location}
                </div>
                <div className="flex items-center gap-3 text-sm font-black text-neutral-600">
                  <Clock className="w-4 h-4 text-secondary" />
                  {event.time}
                </div>
              </div>
              <button className="w-full h-16 rounded-2xl bg-neutral-50 text-neutral-950 font-black flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all">
                Details & Invite
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
