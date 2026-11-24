"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function HighlightStrip({ photos }: { photos: {src:string;label:string}[] }) {
  const strip=useRef<HTMLDivElement>(null);
  const scroll=(direction:number)=>strip.current?.scrollBy({left:direction*(strip.current.clientWidth*.8),behavior:"smooth"});
  return <section className="overflow-hidden bg-off-white">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><h2 className="font-playfair text-3xl font-semibold text-navy-deeper md:text-4xl">Highlight Moments</h2><div className="flex gap-3"><button type="button" onClick={()=>scroll(-1)} aria-label="Previous highlights" className="rounded-full border border-navy/30 bg-white p-3 text-navy"><ChevronLeft size={22}/></button><button type="button" onClick={()=>scroll(1)} aria-label="Next highlights" className="rounded-full border border-navy/30 bg-white p-3 text-navy"><ChevronRight size={22}/></button></div></div>
      <div ref={strip} tabIndex={0} role="region" aria-label="School photo highlights" className="flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-xl pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-navy [&::-webkit-scrollbar]:hidden">{photos.map(photo=><figure key={photo.src} className="w-[240px] flex-none snap-start overflow-hidden rounded-xl border border-sand/40 bg-white md:w-[320px]"><img src={photo.src} alt={photo.label} loading="lazy" className="aspect-[4/3] w-full object-cover"/><figcaption className="p-4 text-sm font-semibold text-navy-deeper">{photo.label}</figcaption></figure>)}</div>
    </div>
  </section>;
}
