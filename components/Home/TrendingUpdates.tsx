"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

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

type EventCardProps = {
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  event: Event;
};

function EventCard({ index, progress, range, targetScale, event }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={cardRef} className="sticky top-[12vh] flex h-[70vh] items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(-2.5vh + ${index * 20}px)` }}
        className="relative -top-[12%] flex w-[90%] max-w-5xl origin-top flex-col overflow-hidden rounded-lg border border-[#013975]/8 bg-white shadow-[0_24px_80px_rgba(1,57,117,0.10)] lg:h-[430px] lg:w-[74%] lg:flex-row"
      >
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: event.accent }} />

        <div className="flex w-full flex-col justify-between p-5 sm:p-6 lg:w-[44%] lg:p-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white"
                style={{ backgroundColor: event.accent }}
              >
                {event.tag}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#034ea2]/55">
                {event.date}
              </span>
            </div>

            <h3 className="max-w-md text-[1.7rem] font-bold leading-tight text-[#034ea2] sm:text-[2rem]">
              {event.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#034ea2]/75 sm:text-[15px]">
              {event.description}
            </p>
          </div>

          <Link
            href={event.href}
            className="mt-6 inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#a3123f]"
          >
            View Event
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a3123f]/20 bg-white text-[#a3123f]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden bg-[#034ea2]/5 lg:min-h-0 lg:h-auto lg:flex-1">
          <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
            <Image
              fill
              src={event.image}
              alt={event.title}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 56vw"
              priority={index === 0}
            />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export default function TrendingUpdates() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#f0f4ff] py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5em] text-[#a3123f]">
              School Events
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#034ea2] lg:text-4xl">
              Events
            </h2>
          </div>

          <Link
            href="/news-and-events"
            className="hidden text-sm font-semibold text-[#a3123f] hover:underline md:block"
          >
            View All Events
          </Link>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        {events.map((event, index) => {
          const targetScale = 1 - (events.length - index) * 0.05;
          return (
            <EventCard
              key={event.title}
              index={index}
              event={event}
              progress={scrollYProgress}
              range={[index * 0.2, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
