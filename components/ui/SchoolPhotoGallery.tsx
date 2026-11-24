"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type SchoolPhoto = { id: string; src: string; title: string; category: string; date?: string; description?: string };
export default function SchoolPhotoGallery({ photos }: { photos: SchoolPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = selected !== null;
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!open) { if (element.open) element.close(); return; }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const move = (step: number) => setSelected(index => index === null ? null : (index + step + photos.length) % photos.length);
  const photo = selected !== null ? photos[selected] : undefined;
  return <section id="gallery" className="bg-navy-deeper text-white">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10"><p className="mb-4 text-xs uppercase tracking-widest text-sand">Visual journal</p><h2 className="font-playfair text-4xl font-semibold text-white">Snippets of Seedling</h2></div>
      {photos.length ? <div className="grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{photos.map((item,index) => <button type="button" key={item.id} onClick={() => setSelected(index)} className="overflow-hidden rounded-xl border border-white/20 bg-white/5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand" aria-label={`View ${item.title}`}>
        <img src={item.src} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="block p-4"><span className="mb-2 block text-xs text-sand">{item.category}</span><span className="block text-sm font-semibold leading-relaxed">{item.title}</span></span>
      </button>)}</div> : <p>School gallery photographs will appear here when published.</p>}
    </div>
    <dialog ref={dialog} aria-labelledby={titleId} onClose={() => setSelected(null)} onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }} className="m-auto w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border border-white/20 bg-white p-0 text-navy-deeper shadow-2xl backdrop:bg-black/80">
      {photo && <>
        <header className="flex items-start justify-between gap-5 border-b border-sand/40 px-5 py-4"><div><p className="text-xs text-crimson">{photo.category} · {(selected ?? 0)+1} of {photos.length}</p><h3 id={titleId} className="mt-1 font-playfair text-xl font-semibold">{photo.title}</h3></div><button type="button" onClick={() => setSelected(null)} aria-label="Close event viewer" className="rounded-full bg-navy p-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2"><X size={20} /></button></header>
        <figure className="p-4 sm:p-6"><img src={photo.src} alt={photo.title} className="max-h-[60svh] w-full rounded-lg bg-off-white object-contain" /><figcaption className="mt-4 text-sm leading-relaxed text-text-light">{photo.date && Number.isFinite(Date.parse(photo.date)) && <time dateTime={photo.date} className="mb-2 block font-semibold">{new Intl.DateTimeFormat("en-GB",{dateStyle:"long",timeZone:"Asia/Kolkata"}).format(new Date(photo.date))}</time>}{photo.description || `${photo.title} — ${photo.category} gallery.`}</figcaption></figure>
        <nav aria-label="Event photographs" className="flex justify-between gap-4 border-t border-sand/40 p-4"><button type="button" disabled={photos.length<2} onClick={() => move(-1)} className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white disabled:opacity-40"><ChevronLeft size={18} />Previous</button><button type="button" disabled={photos.length<2} onClick={() => move(1)} className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Next<ChevronRight size={18} /></button></nav>
      </>}
    </dialog>
  </section>;
}
