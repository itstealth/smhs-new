"use client";

import { useEffect, useRef, useState } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Gallery Snapshots ────────────────────────────────────────────────────────
const snapshots = [
  { src: "/assets/JAISELMER TRIP/1.webp", label: "Jaisalmer Trip", aspect: "aspect-[4/5]" },
  { src: "/assets/HALLOWEEN/1.webp", label: "Halloween Fest", aspect: "aspect-[4/3]" },
  { src: "/assets/BAISAKHI/1.webp", label: "Baisakhi Celebration", aspect: "aspect-[4/5]" },
  { src: "/assets/XMAS CARNIVAL/1.webp", label: "Christmas Carnival", aspect: "aspect-[4/3]" },
  { src: "/assets/MOTHER CHILD COOK OFF/1.webp", label: "Cook Off Event", aspect: "aspect-[4/5]" },
  { src: "/assets/STELLAR SATURDAYS/1.webp", label: "Stellar Saturday", aspect: "aspect-[4/3]" },
  { src: "/assets/ANNUAL FUNCTION/5.webp", label: "Annual Day Performance", aspect: "aspect-[4/5]" },
  { src: "/assets/INTERNATIONAL GUIDANCE (CAMBRIDGE)/3.webp", label: "International Guidance", aspect: "aspect-[4/3]" },
];

// ─── Christmas Gallery ────────────────────────────────────────────────────────
const christmasGallery = [
  "/assets/XMAS CARNIVAL/christmas 3.webp",
  "/assets/XMAS CARNIVAL/christmas 1.webp",
  "/assets/XMAS CARNIVAL/christmas 2.webp",
  "/assets/XMAS CARNIVAL/christmas 5.webp",
];

// ─── Sports Day Gallery ────────────────────────────────────────────────────────
const sportsDayGallery = [
  "/assets/Home/pgt.webp",
  "/assets/Home/prt.webp",
];

// ─── Foundation Items ──────────────────────────────────────────────────────────
const foundationItems = [
  {
    id: 1,
    category: "Foundation",
    title: "Foundation Day Celebrations at Seedling Modern High School",
    date: "2024",
    image: "/assets/Media/foundation/media-coverage-1.webp",
    color: "bg-navy",
  },
  {
    id: 2,
    category: "Foundation",
    title: "Annual Foundation Day Ceremony — Honoring Legacy and Excellence",
    date: "2024",
    image: "/assets/Media/foundation/media-coverage-2.webp",
    color: "bg-crimson",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CampusHighlightsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">

      {/* ══════════════════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/newsAndEvents.webp"
        title="News & Events"
        badge="Campus Highlights"
        breadcrumbs={[{ label: "News & Events" }]}
        height="large"
        overlayOpacity={0.6}
      />

      {/* ══════════════════════════════════════════════════════
          2. FEATURED ARTICLE
      ══════════════════════════════════════════════════════ */}
      {false && (
      <section className="pt-16 pb-8 md:pt-24 md:pb-8 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-navy uppercase font-dm">
                <span className="w-8 h-px bg-navy inline-block" />
                Campus Highlights
              </span>
              <span className="text-[10px] text-text-light font-black tracking-[0.2em] uppercase font-dm">
                — Featured Story
              </span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <Reveal delay={100}>
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedGallery(sportsDayGallery); setGalleryIndex(0); }} className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <img src="/assets/Home/pgt.webp" alt="SMHS Sports Day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                      <span className="inline-block bg-navy text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mb-4 font-dm">Sports Day</span>
                      <h2 className="font-playfair text-2xl font-bold text-white leading-tight mb-3">SMHS Sports Day</h2>
                      <div className="mt-5 flex items-center gap-4 font-dm">
                        <span className="w-1 h-1 rounded-full bg-sand/50" />
                        <span className="text-sand text-[10px] font-black uppercase tracking-widest group-hover:underline">View Gallery →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            </div>
            <div>
              <Reveal delay={300}>
                <a href="#" className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 h-full">
                    <img src="/assets/ANNUAL FUNCTION/7.webp" alt="SMHS Annual Day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block bg-navy text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mb-3 font-dm">Celebration</span>
                      <h2 className="font-playfair text-xl md:text-2xl font-bold text-white leading-tight">SMHS Annual Day</h2>
                      <p className="text-white/70 text-xs mt-1 line-clamp-1 font-dm font-light">An evening of performances, awards, and shared pride across the Seedling family.</p>
                    </div>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ══════════════════════════════════════════════════════
          3. NEWS GRID
      ══════════════════════════════════════════════════════ */}
      <section className="pt-8 md:pt-20 md:pb-8 bg-sand/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-navy uppercase mb-3 font-dm">
                  <span className="w-8 h-px bg-navy" />
                  Media Coverage
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper leading-none">
                  In the {" "}
                  <span className="text-crimson">News</span>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Asymmetric grid for first 5 items */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-5">
              <NewsCard large delay={100} item={newsItems[0]} onClick={() => setSelectedImage(newsItems[0].image)} />
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newsItems.slice(1, 5).map((item, i) => (
                <NewsCard key={item.id} item={item} delay={(i + 2) * 100} onClick={() => setSelectedImage(item.image)} />
              ))}
            </div>
          </div> */}
          
          {/* Standard grid for remaining items */}
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <NewsCard key={item.id} item={item} delay={100} onClick={() => setSelectedImage(item.image)} />
              ))}
            </div>
        
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3b. FOUNDATION
      ══════════════════════════════════════════════════════ */}
      <section className="pt-8 md:pt-10 md:pb-8 bg-sand/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
               
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper leading-none">
                  Founder's <span className="text-crimson">Day</span>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundationItems.map((item, i) => (
              <NewsCard key={item.id} item={item} delay={i * 100} onClick={() => setSelectedImage(item.image)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. EVENT CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="pt-8 pb-12 md:pt-20 md:pb-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-navy uppercase mb-3 font-dm">
                <span className="w-8 h-px bg-navy" />
                Campus Events
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper leading-none">
                Moments That<br />
                <span className="text-crimson">Define Us</span>
              </h2>
            </div>
          </Reveal>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <Reveal key={event.id} delay={i * 80}>
                <a
                  href="#"
                  onClick={(e) => {
                    if (event.gallery) {
                      e.preventDefault();
                      setSelectedGallery(event.gallery);
                      setGalleryIndex(0);
                    }
                  }}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-editorial transition-all duration-500 hover:-translate-y-2 border border-sand/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className={`absolute top-4 left-4 ${event.tagColor} text-white text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase font-dm`}>
                      {event.tag}
                    </span>
                    {event.gallery && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs font-black tracking-widest uppercase font-dm">+{event.gallery.length} images</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-playfair text-3xl font-bold text-crimson">{event.date}</span>
                      <span className="text-[10px] font-black text-text-light uppercase tracking-widest font-dm">{event.year}</span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-navy-deeper mb-2 leading-tight">{event.title}</h3>
                    <p className="text-text-light text-sm leading-relaxed font-dm font-light line-clamp-2">{event.description}</p>
                    <div className="mt-5 w-8 h-1 bg-sand/40 group-hover:w-16 group-hover:bg-sand transition-all duration-500 rounded-full" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. LIFE AT SEEDLING (GALLERY)
      ══════════════════════════════════════════════════════ */}
      <section className="pt-16 pb-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-navy uppercase mb-3 font-dm">
                <span className="w-8 h-px bg-navy" />
                Snippets of Seedling
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deeper leading-none">
                Life at<br />
                <span className="text-crimson">Seedling</span>
              </h2>
            </div>
          </Reveal>

          {/* Masonry strip */}
          <Reveal delay={100}>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {snapshots.map((snap, i) => (
                <div
                  key={i}
                  className="group relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`relative ${snap.aspect} overflow-hidden bg-stone-100`}>
                    <img
                      src={snap.src}
                      alt={snap.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-dm">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">{snap.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

       
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IMAGE MODAL
      ══════════════════════════════════════════════════════ */}
      {(selectedImage || selectedGallery) && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => { setSelectedImage(null); setSelectedGallery(null); }}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-crimson transition-colors z-50 p-2"
            onClick={() => { setSelectedImage(null); setSelectedGallery(null); }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {selectedGallery ? (
            <>
              <button
                className="absolute left-4 md:left-8 text-white hover:text-sand transition-colors z-50 p-2"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev - 1 + selectedGallery.length) % selectedGallery.length); }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img
                src={selectedGallery[galleryIndex]}
                alt="Gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute right-4 md:right-8 text-white hover:text-sand transition-colors z-50 p-2"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev + 1) % selectedGallery.length); }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedGallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-colors ${i === galleryIndex ? "bg-sand" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <img
              src={selectedImage!}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </main>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const newsItems = [
  {
    id: 1,
    category: "Media Coverage",
    title: "Investiture Ceremony 2026-27 — 200+ Student Leaders Inducted at SMHS",
    date: "04 May 2026",
    image: "/assets/Media/media-coverage-1.webp",
    color: "bg-navy",
  },
  {
    id: 2,
    category: "In the News",
    title: "Challengers Trophy 2026 Winners Honoured by Seedling Group of Schools",
    date: "26 Apr 2026",
    image: "/assets/Media/media-coverage-2.webp",
    color: "bg-crimson",
  },
  {
    id: 3,
    category: "Press Release",
    title: "Dr. Sandeep Bakshi Appointed UN Goodwill Ambassador — First from an Indian University",
    date: "18 Apr 2026",
    image: "/assets/Media/media-coverage-3.webp",
    color: "bg-navy-dark",
  },
  {
    id: 4,
    category: "Media Spotlight",
    title: "Mother Successfully Donates Kidney to Daughter at JNU Hospital Under Ayushman Bharat",
    date: "05 Mar 2026",
    image: "/assets/Media/media-coverage-4.webp",
    color: "bg-crimson-dark",
  },
  {
    id: 5,
    category: "In the News",
    title: "Indian Army Honours Dr. Sandeep Bakshi; JNU Announces Scholarships for Soldiers' Children",
    date: "20 Jan 2026",
    image: "/assets/Media/media-coverage-5.webp",
    color: "bg-sand",
  },
  {
    id: 6,
    category: "Media Spotlight",
    title: "Sacred Guruji Satsang Held at Seedling Modern High School",
    date: "13 Jan 2026",
    image: "/assets/Media/media-coverage-6.webp",
    color: "bg-navy",
  },
  {
    id: 7,
    category: "Media Spotlight",
    title: "Class of 2000 Alumni Reunite at Seedling to Celebrate 25th Anniversary",
    date: "11 Jan 2026",
    image: "/assets/Media/media-coverage-7.webp",
    color: "bg-crimson",
  },
  {
    id: 8,
    category: "Media Spotlight",
    title: "Dr. Sandeep Bakshi Donates ₹10 Lakh to Army Wives Welfare Association (AWWA)",
    date: "07 Jan 2026",
    image: "/assets/Media/media-coverage-8.webp",
    color: "bg-navy-dark",
  },
  {
    id: 9,
    category: "Media Spotlight",
    title: "Dr. Sandeep Bakshi Honoured in University Chancellors-2025 Category by CEO Insights",
    date: "22 Dec 2025",
    image: "/assets/Media/media-coverage-9.webp",
    color: "bg-crimson-dark",
  },
  {
    id: 10,
    category: "Media Spotlight",
    title: "Dr. Sandeep Bakshi Named Among India's Most Influential University Chancellors 2025",
    date: "22 Dec 2025",
    image: "/assets/Media/media-coverage-10.webp",
    color: "bg-sand",
  },
  {
    id: 11,
    category: "Media Spotlight",
    title: "SMHS 31st Annual Function Frozen Staged at Birla Auditorium — 1,500 Students Perform",
    date: "20 Dec 2025",
    image: "/assets/Media/media-coverage-11.webp",
    color: "bg-navy",
  },
  {
    id: 12,
    category: "Media Spotlight",
    title: "Historic First Patient Airlift from Mumbai to Jaipur for Treatment at JNU Hospital",
    date: "26 Nov 2025",
    image: "/assets/Media/media-coverage-12.webp",
    color: "bg-crimson",
  },
  {
    id: 13,
    category: "Media Spotlight",
    title: "Rajasthan Medical Milestone — Patient Airlifted to JNU Hospital in Record Time",
    date: "26 Nov 2025",
    image: "/assets/Media/media-coverage-13.webp",
    color: "bg-navy-dark",
  },
  // {
  //   id: 14,
  //   category: "Media Spotlight",
  //   title: "Seedling Excellence Featured in News",
  //   excerpt: "Catch the latest coverage of Seedling Group of Schools as we continue our journey of educational excellence.",
  //   date: "23 Nov 2025",
  //   image: "/assets/Media/media-coverage-14.webp",
  //   color: "bg-crimson-dark",
  // },
  {
    id: 15,
    category: "Media Spotlight",
    title: "SMHS Sports Day at JNU Ground — 1,200+ Students Compete in Track and Field Events",
    date: "05 Nov 2025",
    image: "/assets/Media/media-coverage-15.webp",
    color: "bg-sand",
  },
  {
    id: 16,
    category: "Media Spotlight",
    title: "Patrika Plus: Seedling Students Excel in Annual Sports Day Athletics",
    date: "05 Nov 2025",
    image: "/assets/Media/media-coverage-16.webp",
    color: "bg-navy",
  },
  {
    id: 17,
    category: "Media Spotlight",
    title: "JNU and Seedling Group Donate Furniture and Books to Government School in Ramnagariya",
    date: "11 Jul 2025",
    image: "/assets/Media/media-coverage-17.webp",
    color: "bg-crimson",
  },
  {
    id: 18,
    category: "Media Spotlight",
    title: "Dr. Bakshi: Committed to Empowering Every Section of Society Through Education",
    date: "11 Jul 2025",
    image: "/assets/Media/media-coverage-18.webp",
    color: "bg-navy-dark",
  },
  {
    id: 19,
    category: "Media Spotlight",
    title: "JNU Ranks 2nd in Rajasthan and Top 50 Nationally in India Today-MDRA Survey 2025",
    date: "06 Jul 2025",
    image: "/assets/Media/media-coverage-19.webp",
    color: "bg-crimson-dark",
  },
  {
    id: 20,
    category: "Media Spotlight",
    title: "JNU NAAC A+ Accreditation and Dubai Campus Highlighted in India Today Survey",
    date: "06 Jul 2025",
    image: "/assets/Media/media-coverage-20.webp",
    color: "bg-sand",
  },
  {
    id: 21,
    category: "Media Spotlight",
    title: "Seedling Students Shine in CBSE Boards — Sanyam Agrawal Scores 99.2% in Commerce",
    date: "15 May 2025",
    image: "/assets/Media/media-coverage-21.webp",
    color: "bg-navy",
  },
];

function NewsCard({ item = newsItems[0], large = false, delay = 0, onClick }: { item?: (typeof newsItems)[0]; large?: boolean; delay?: number; onClick?: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`group block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionProperty: "opacity, transform", transitionDuration: "700ms" }}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[4/3]"} bg-stone-100`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span
          className={`absolute top-4 left-4 ${item.color} text-white text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase font-dm`}
        >
          {item.category}
        </span>
      </div>
      <div className={`p-5 ${large ? "md:p-7" : ""}`}>
        <p className="text-text-light text-[10px] font-black tracking-widest uppercase mb-2 font-dm">{item.date}</p>
        <h3
          className={`font-playfair font-bold text-navy-deeper leading-tight group-hover:text-crimson transition-colors duration-200 ${
            large ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-navy text-[10px] font-black uppercase tracking-widest mt-4 group-hover:gap-2 transition-all duration-200 font-dm">
          View Image <span>→</span>
        </span>
      </div>
    </div>
  );
}

// ─── Event Data ───────────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    title: "Investiture Ceremony 2026–27",
    date: "May 2026",
    year: "2026",
    description:
      "Over 200 student leaders were inducted with badges and responsibilities at the annual Investiture Ceremony — a proud milestone for the Seedling family.",
    image: "/events/INVESTITURE%20CEREMONY/P1500918.webp",
    tag: "Leadership",
    tagColor: "bg-navy",
    gallery: [
      "/events/INVESTITURE%20CEREMONY/P1500918.webp",
      "/events/INVESTITURE%20CEREMONY/P1500995.webp",
      "/events/INVESTITURE%20CEREMONY/P1500997.webp",
      "/events/INVESTITURE%20CEREMONY/P1500998.webp",
      "/events/INVESTITURE%20CEREMONY/P1500999.webp",
      "/events/INVESTITURE%20CEREMONY/P1510001.webp",
      "/events/INVESTITURE%20CEREMONY/P1510003.webp",
      "/events/INVESTITURE%20CEREMONY/P1510004.webp",
      "/events/INVESTITURE%20CEREMONY/P1510008.webp",
      "/events/INVESTITURE%20CEREMONY/P1510050.webp",
      "/events/INVESTITURE%20CEREMONY/P1510051.webp",
      "/events/INVESTITURE%20CEREMONY/P1510052.webp",
      "/events/INVESTITURE%20CEREMONY/P1510054.webp",
      "/events/INVESTITURE%20CEREMONY/P1510064.webp",
      "/events/INVESTITURE%20CEREMONY/P1510071.webp",
      "/events/INVESTITURE%20CEREMONY/P1510072.webp",
    ],
  },
  {
    id: 2,
    title: "Honoring Achievers 2026",
    date: "April 2026",
    year: "2026",
    description:
      "A special felicitation ceremony celebrating students who brought laurels to Seedling through academics, sports, and co-curricular achievements.",
    image: "/events/honoring-achievers/IMG20260420100231.webp",
    tag: "Achievement",
    tagColor: "bg-crimson",
    gallery: [
      "/events/honoring-achievers/IMG20260420100231.webp",
      "/events/honoring-achievers/IMG20260420100238.webp",
      "/events/honoring-achievers/IMG20260420100259.webp",
      "/events/honoring-achievers/IMG20260420100328.webp",
      "/events/honoring-achievers/IMG20260420100329.webp",
      "/events/honoring-achievers/IMG20260420100335.webp",
      "/events/honoring-achievers/IMG20260420100347.webp",
      "/events/honoring-achievers/IMG20260420100356.webp",
      "/events/honoring-achievers/IMG20260420100406.webp",
      "/events/honoring-achievers/IMG20260420100414.webp",
      "/events/honoring-achievers/IMG20260420100423.webp",
      "/events/honoring-achievers/IMG20260420100427.webp",
      "/events/honoring-achievers/IMG20260420100618.webp",
      "/events/honoring-achievers/IMG20260420100723.webp",
      "/events/honoring-achievers/IMG20260420100736.webp",
      "/events/honoring-achievers/IMG20260420100756.webp",
    ],
  },
  {
    id: 3,
    title: "Grow & Glow Event",
    date: "April 2026",
    year: "2026",
    description:
      "A vibrant celebration of student growth, creativity, and personal milestones that lit up the campus with colour and energy.",
    image: "/events/grow-glow/IMG_20260421_153953.webp",
    tag: "Celebration",
    tagColor: "bg-navy-dark",
    gallery: [
      "/events/grow-glow/IMG_20260421_153953.webp",
      "/events/grow-glow/IMG-20260421-WA0040.webp",
      "/events/grow-glow/IMG-20260421-WA0043.webp",
      "/events/grow-glow/IMG-20260421-WA0054.webp",
      "/events/grow-glow/IMG-20260421-WA0055.webp",
      "/events/grow-glow/IMG-20260421-WA0056.webp",
      "/events/grow-glow/IMG-20260421-WA0057.webp",
      "/events/grow-glow/IMG-20260421-WA0058.webp",
      "/events/grow-glow/IMG-20260421-WA0060.webp",
      "/events/grow-glow/IMG-20260421-WA0061.webp",
      "/events/grow-glow/IMG-20260421-WA0062.webp",
    ],
  },
  {
    id: 4,
    title: "Annual Day",
    date: "2025",
    year: "2025",
    description:
      "A grand celebration of talent and tradition — students took the stage in a spectacular showcase of performances, dances, and drama.",
    image: "/events/ANNUAL%20DAY/P1230432.webp",
    tag: "Annual Event",
    tagColor: "bg-crimson-dark",
    gallery: [
      "/events/ANNUAL%20DAY/P1230432.webp",
      "/events/ANNUAL%20DAY/P1230462.webp",
      "/events/ANNUAL%20DAY/P1230473.webp",
      "/events/ANNUAL%20DAY/P1230477.webp",
      "/events/ANNUAL%20DAY/P1230711.webp",
      "/events/ANNUAL%20DAY/P1230774.webp",
      "/events/ANNUAL%20DAY/P1230778.webp",
      "/events/ANNUAL%20DAY/P1230788.webp",
      "/events/ANNUAL%20DAY/P1230800.webp",
      "/events/ANNUAL%20DAY/P1230832.webp",
      "/events/ANNUAL%20DAY/P1230841.webp",
      "/events/ANNUAL%20DAY/P1230902.webp",
      "/events/ANNUAL%20DAY/P1230910.webp",
      "/events/ANNUAL%20DAY/P1230914.webp",
      "/events/ANNUAL%20DAY/P1588182.webp",
      "/events/ANNUAL%20DAY/P1588252.webp",
      "/events/ANNUAL%20DAY/P1588280.webp",
      "/events/ANNUAL%20DAY/P1588291.webp",
      "/events/ANNUAL%20DAY/P1588346.webp",
      "/events/ANNUAL%20DAY/P1588399.webp",
    ],
  },
  {
    id: 5,
    title: "ATL Lab Inauguration",
    date: "2025",
    year: "2025",
    description:
      "The Atal Tinkering Lab was inaugurated with hands-on demonstrations by students, showcasing innovation, robotics, and STEM excellence.",
    image: "/events/ATL%20LAB/1P3A4229.webp",
    tag: "Innovation",
    tagColor: "bg-navy",
    gallery: [
      "/events/ATL%20LAB/1P3A4229.webp",
      "/events/ATL%20LAB/1P3A4237.webp",
      "/events/ATL%20LAB/1P3A4238.webp",
      "/events/ATL%20LAB/1P3A4239.webp",
      "/events/ATL%20LAB/1P3A4246.webp",
      "/events/ATL%20LAB/1P3A4255.webp",
      "/events/ATL%20LAB/1P3A4261.webp",
      "/events/ATL%20LAB/1P3A4263.webp",
      "/events/ATL%20LAB/1P3A4295.webp",
      "/events/ATL%20LAB/1P3A4329.webp",
      "/events/ATL%20LAB/P1517259.webp",
      "/events/ATL%20LAB/P1517260.webp",
      "/events/ATL%20LAB/P1517261.webp",
      "/events/ATL%20LAB/P1517263.webp",
      "/events/ATL%20LAB/P1517266.webp",
      "/events/ATL%20LAB/P1517267.webp",
      "/events/ATL%20LAB/P1517269.webp",
    ],
  },
];