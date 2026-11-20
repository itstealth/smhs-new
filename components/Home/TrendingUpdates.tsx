import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Event = {
  tag: string;
  title: string;
  date: string;
  description: string;
  href: string;
  image: string;
  accent: string;
};

const events: Event[] = [
  {
    tag: "Annual Day",
    title: "Annual Day Celebration",
    date: "2025–26",
    description:
      "A grand evening of performances, awards, and pride as students showcased their talents across music, dance, and drama before a packed audience of families and guests.",
    href: "/news-and-events",
    image: "/events/ANNUAL DAY/P1230432.webp",
    accent: "#034ea2",
  },
  {
    tag: "Innovation",
    title: "ATL Lab — Atal Innovation Mission",
    date: "2025–26",
    description:
      "Students explored robotics, coding, and design thinking in our state-of-the-art Atal Tinkering Lab, fostering creativity and problem-solving skills for tomorrow's innovators.",
    href: "/news-and-events",
    image: "/events/ATL LAB/1P3A4229.webp",
    accent: "#013975",
  },
  {
    tag: "Fest",
    title: "Grow & Glow — Cultural Fest",
    date: "April 2026",
    description:
      "A vibrant celebration of student creativity featuring art exhibitions, literary events, and cultural performances that brought the school community together in a spirit of joy.",
    href: "/news-and-events",
    image: "/events/grow-glow/IMG_20260421_153953.webp",
    accent: "#a3123f",
  },
  {
    tag: "Achievement",
    title: "Honoring Achievers",
    date: "April 2026",
    description:
      "Academic and co-curricular toppers were felicitated in a ceremony recognising excellence, hard work, and the relentless pursuit of success across all streams.",
    href: "/news-and-events",
    image: "/events/honoring-achievers/IMG20260420102847.webp",
    accent: "#034ea2",
  },
  {
    tag: "Leadership",
    title: "Investiture Ceremony",
    date: "2025–26",
    description:
      "Student council leaders were formally invested with their badges and responsibilities in a solemn and inspiring ceremony, marking the beginning of a year of student-led initiatives.",
    href: "/news-and-events",
    image: "/events/INVESTITURE CEREMONY/P1500918.webp",
    accent: "#013975",
  },
];

export default function TrendingUpdates() {
  return <section className="home-deferred-content home-deferred-events bg-[#f0f4ff]" aria-labelledby="smhs-events-heading">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#a3123f]">School events</p><h2 id="smhs-events-heading" className="font-serif text-4xl font-bold text-[#034ea2]">Events at Seedling</h2></div><Link href="/news-and-events" className="font-semibold text-[#a3123f]">View all events</Link></div>
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(event => <article key={event.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="relative aspect-[4/3]"><Image src={event.image} alt={event.title} fill sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover object-top" /></div>
        <div className="flex flex-1 flex-col p-6"><p className="mb-3 text-sm font-semibold text-[#a3123f]">{event.date} · {event.tag}</p><h3 className="mb-3 font-serif text-2xl font-bold text-[#013975]">{event.title}</h3><p className="mb-6 text-sm leading-relaxed text-[#013975]">{event.description}</p><Link href={event.href} className="mt-auto inline-flex items-center gap-2 font-semibold text-[#a3123f]">View event <ArrowUpRight size={18} /></Link></div>
      </article>)}</div>
    </div>
  </section>;
}
