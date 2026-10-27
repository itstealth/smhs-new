"use client";

import { useEffect, useRef, useState } from "react";

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

// ─── Types ────────────────────────────────────────────────────────────────────
export type Snapshot = { src: string; label: string; aspect: string };

export type NewsItem = {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  color: string;
};

export type FoundationItem = NewsItem;

export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  year: string;
  description: string;
  image: string;
  tag: string;
  tagColor: string;
  gallery?: string[];
};

function NewsCard({ item, large = false, delay = 0, onClick }: { item: NewsItem; large?: boolean; delay?: number; onClick?: () => void }) {
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

export default function NewsAndEventsClient({
  newsItems,
  foundationItems,
  events,
  snapshots,
}: {
  newsItems: NewsItem[];
  foundationItems: FoundationItem[];
  events: CampusEvent[];
  snapshots: Snapshot[];
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <>
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
    </>
  );
}
