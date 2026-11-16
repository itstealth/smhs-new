export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-crimson">Seedling Modern High School</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-navy">Page not found</h1>
      <p className="mt-4 max-w-xl text-text-light">The address may have changed. Visit the SMHS homepage or choose another Seedling school.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4"><a className="rounded-full bg-navy px-6 py-3 font-semibold text-white" href="/">SMHS homepage</a><a className="rounded-full border border-navy/20 px-6 py-3 font-semibold text-navy" href="https://seedlingschools.com">Seedling Group</a></div>
    </section>
  );
}
