"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { getMediaUrl, getPostCategories, stripHtml, formatDate, type WPPost, type WPCategory } from "@/lib/wordpress";

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

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ChevronLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CategoryBadge = ({ category, active, onClick }: { category: string; active: boolean; onClick: () => void }) => (
  <button
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 font-dm
      ${active
        ? "bg-crimson text-white shadow-lg"
        : "bg-white text-navy-deeper border border-sand/40 hover:border-navy hover:bg-navy/5"
      }`}
  >
    {category}
  </button>
);

const POSTS_PER_PAGE = 9;

interface Props {
  posts: WPPost[];
  categories: WPCategory[];
}

export default function BlogClient({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    const catObj = categories.find(c => c.name === activeCategory);
    if (!catObj) return posts;
    return posts.filter((p) => p.categories.includes(catObj.id));
  }, [posts, activeCategory, categories]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filtered, currentPage]
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const postUrl = (slug: string) => `/blog/${slug}`;
  const categoryOptions = ["All", ...categories.filter(c => c.name !== "Uncategorized").map(c => c.name)];

  return (
    <div className="min-h-screen bg-off-white font-dm">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/blog_image.webp"
        title="Blog"
        badge="Stories & Updates"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="pt-16 pb-8 md:pt-24 md:pb-8 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-navy uppercase font-dm">
                <span className="w-8 h-px bg-navy inline-block" />
                All Articles
              </span>
              <span className="text-[10px] text-text-light font-black tracking-[0.2em] uppercase font-dm">
                — {posts.length} Posts
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-12 justify-start">
              {categoryOptions.map((cat) => (
                <CategoryBadge
                  key={cat}
                  category={cat}
                  active={activeCategory === cat}
                  onClick={() => handleCategoryChange(cat)}
                />
              ))}
            </div>
          </Reveal>

          {paginated.length === 0 ? (
            <div className="py-20 text-center text-text-light font-light italic">
              No articles found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginated.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 50}>
                  <Link
                    href={postUrl(post.slug)}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-sand/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                      <img
                        src={getMediaUrl(post)}
                        alt={stripHtml(post.title.rendered)}
                        className="w-full h-full object-contain bg-white transition-transform duration-700 ease-in-out"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/Home/classroom.webp'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {getPostCategories(post)[0] && (
                        <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-navy-deeper text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                          {getPostCategories(post)[0]}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <time className="text-text-light text-[10px] font-black uppercase tracking-widest">{formatDate(post.date)}</time>
                        <span className="w-1 h-1 rounded-full bg-sand/40" />
                        <span className="text-text-light text-[10px] font-black uppercase tracking-widest">
                          {Math.max(1, Math.ceil(stripHtml(post.excerpt.rendered).split(' ').length / 200))} min read
                        </span>
                      </div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold text-navy-deeper leading-tight mb-3 group-hover:text-crimson transition-colors duration-300">
                        {stripHtml(post.title.rendered)}
                      </h3>
                      <p className="text-text-light text-sm leading-relaxed mb-6 font-light line-clamp-2 flex-1">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="inline-flex items-center gap-2 text-navy text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all duration-300 mt-auto">
                        Read More <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border border-sand/40 text-navy-deeper hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 disabled:opacity-30"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-[11px] font-black transition-all duration-200
                    ${currentPage === page
                      ? "bg-navy-deeper text-white shadow-lg"
                      : "text-navy-deeper hover:bg-navy-light border border-transparent"
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border border-sand/40 text-navy-deeper hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 disabled:opacity-30"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
