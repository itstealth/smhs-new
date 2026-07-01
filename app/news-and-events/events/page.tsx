"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { Calendar, MapPin, Clock, ArrowRight, Music, Trophy, Users, Star } from "lucide-react";
import Image from "next/image";

const events = [
  {
    title: "Honouring the Achievers — Career Growth Programme",
    date: "April 20, 2026",
    time: "10:00 AM onwards",
    location: "SMHS Campus",
    category: "Academic",
    icon: Trophy,
    image: "/events/honoring-achievers/IMG20260420100328.webp",
    desc: "A special ceremony recognising students who have demonstrated outstanding academic performance, leadership, and contribution to the school community. Inspiring the next generation of leaders."
  },
  {
    title: "Grow & Glow — Importance of Vegetables",
    date: "April 21, 2026",
    time: "9:00 AM onwards",
    location: "SMHS Campus",
    category: "Awareness",
    icon: Star,
    image: "/events/grow-glow/IMG-20260421-WA0040.webp",
    desc: "Students learned about the nutritional value of vegetables through hands-on activities, demonstrations, and vibrant displays. An initiative to build healthy habits from an early age."
  },
  {
    title: "Founder's Day — Annual Celebration",
    date: "September 15, 2026",
    time: "9:00 AM - 11:00 AM",
    location: "SMHS Campus",
    category: "Events",
    icon: Star,
    image: "/smhs_images/seedling_images/excexutice_director_mam_cutting_cake.webp",
    desc: "Commemorating the founding vision of Seedling Group of Institutions with speeches, cake cutting, and a celebration of 30+ years of educational excellence."
  },
  {
    title: "Dandiya Night — Cultural Extravaganza",
    date: "October 03, 2026",
    time: "6:00 PM onwards",
    location: "SMHS Open Grounds",
    category: "Cultural",
    icon: Music,
    image: "/smhs_images/seedling_images/dandiya_fest.webp",
    desc: "A vibrant celebration of Navratri with traditional dandiya raas, folk music, and colourful attire bringing the whole school community together."
  },
  {
    title: "Dandiya Celebration — Night Two",
    date: "October 10, 2026",
    time: "6:30 PM onwards",
    location: "SMHS Community Hall",
    category: "Cultural",
    icon: Music,
    image: "/smhs_images/seedling_images/dandiya_fest_two.webp",
    desc: "The second evening of our Navratri festivities, with more energy, more colour, and the whole school family joining the celebration."
  },
  {
    title: "Christmas Dance & Choir Performance",
    date: "December 22, 2026",
    time: "5:00 PM onwards",
    location: "SMHS Auditorium",
    category: "Cultural",
    icon: Music,
    image: "/smhs_images/seedling_images/christmas_dance.webp",
    desc: "Students light up the stage with Christmas carols, dance performances, and a festive choir in our annual Christmas celebration."
  },
  {
    title: "Dragon Dance & Cultural Show",
    date: "January 28, 2027",
    time: "4:00 PM - 7:00 PM",
    location: "SMHS Amphitheatre",
    category: "Cultural",
    icon: Star,
    image: "/smhs_images/seedling_images/dragon_dance.webp",
    desc: "A spectacular display of cultural diversity featuring a traditional dragon dance alongside performances from students across all grades."
  },
  {
    title: "Annual Farewell Ceremony",
    date: "March 20, 2027",
    time: "10:00 AM - 1:00 PM",
    location: "SMHS Main Auditorium",
    category: "Events",
    icon: Users,
    image: "/smhs_images/seedling_images/farewell_cermony.webp",
    desc: "A heartfelt send-off for our graduating Class XII students, filled with memories, messages, and celebrations of their journey at Seedling."
  },
  {
    title: "CBSE Certification & Merit Ceremony",
    date: "April 10, 2027",
    time: "10:00 AM - 12:00 PM",
    location: "SMHS Main Hall",
    category: "Academic",
    icon: Trophy,
    image: "/smhs_images/seedling_images/certifcaiton_ceremoney.webp",
    desc: "Recognising the hard work and dedication of our board achievers in a formal CBSE certification and merit award ceremony."
  },
  {
    title: "Annual Day — Grand Cultural Celebration",
    date: "February 15, 2027",
    time: "9:00 AM - 2:00 PM",
    location: "SMHS Auditorium",
    category: "Cultural",
    icon: Star,
    image: "/events/ANNUAL DAY/P1230711.webp",
    desc: "A grand showcase of student talent featuring music, dance, drama, and spoken word performances. The Annual Day is a highlight of our school calendar, celebrating creativity and the arts."
  },
  {
    title: "ATL Lab Innovation Day — STEM Excellence",
    date: "March 05, 2027",
    time: "10:00 AM - 4:00 PM",
    location: "SMHS ATL Lab",
    category: "Innovation",
    icon: Trophy,
    image: "/events/ATL LAB/1P3A4255.webp",
    desc: "Students present their innovations, prototypes, and tech solutions built in our Atal Tinkering Lab. A day dedicated to future-ready skills, robotics, coding, and STEM exploration."
  },
  {
    title: "Investiture Ceremony — Leadership Induction",
    date: "April 05, 2027",
    time: "9:00 AM - 11:30 AM",
    location: "SMHS Main Ground",
    category: "Events",
    icon: Users,
    image: "/events/INVESTITURE CEREMONY/P1510050.webp",
    desc: "A formal ceremony inducting the new student council, house captains, and school prefects. The Investiture Ceremony instils responsibility, discipline, and pride in our student leaders."
  }
];

export default function EventsPage() {
  const FeaturedIcon = events[0].icon;
  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/img107.webp"
        title="Events"
        badge="School Events"
        breadcrumbs={[{ label: "Events" }]}
      />

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

      {/* Suggestion Section */}
      <section className="py-48 bg-white border-y border-black/5 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-label mb-8 block uppercase tracking-[0.3em]">Be Part of the Scene</span>
          <h2 className="text-heading text-6xl md:text-[8rem] mb-12">Host an <br /> <span className="text-primary tracking-tighter italic">Event.</span></h2>
          <p className="text-xl text-neutral-500 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            Our campus spaces are available for collaborative educational events, seminars, and workshops that align with our mission.
          </p>
          <button className="inline-flex h-24 px-16 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary transition-all group">
            Inquire for Venue
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
}
