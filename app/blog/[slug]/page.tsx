import Link from "next/link";
import { notFound } from "next/navigation";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { getMediaUrl, getPostCategories, stripHtml, formatDate, type WPPost } from "@/lib/wordpress";

export const revalidate = 300;

const ArrowLeft = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const MID_CTA = `<div style="margin:2.5rem 0;border-radius:1rem;background:linear-gradient(to right,#1a2f5e,#1e3566);padding:2rem;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
  <p style="color:#c9a96e;font-size:10px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:0.5rem;">Admissions Open</p>
  <h3 style="font-size:1.5rem;font-weight:700;color:#ffffff !important;margin-bottom:0.75rem;border:none;padding:0;">Give Your Child the Best Start</h3>
  <p style="color:rgba(255,255,255,0.75);font-size:0.875rem;margin-bottom:1.5rem;max-width:28rem;margin-left:auto;margin-right:auto;">Join Seedling Modern High School and unlock a world-class learning environment built for tomorrow's leaders.</p>
  <a href="https://smhs.seedlingschools.com/admissions" style="display:inline-flex;align-items:center;gap:0.5rem;background:#c0392b;color:#ffffff !important;font-weight:900;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:0.75rem 1.5rem;border-radius:9999px;text-decoration:none !important;transition:all 0.3s;">Apply for Admission →</a>
</div>`;

const END_CTA = `<div style="margin-top:3rem;border-radius:1rem;border:2px solid rgba(192,57,43,0.2);background:rgba(192,57,43,0.04);padding:2rem;text-align:center;">
  <p style="color:#c0392b;font-size:10px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:0.5rem;">Ready to Enrol?</p>
  <h3 style="font-size:1.5rem;font-weight:700;color:#1a2f5e !important;margin-bottom:0.75rem;border:none;padding:0;">Begin Your Admission Journey</h3>
  <p style="color:#6b7280;font-size:0.875rem;margin-bottom:1.5rem;max-width:28rem;margin-left:auto;margin-right:auto;">Seats are limited. Secure your child's place at Seedling Modern High School today.</p>
  <a href="https://smhs.seedlingschools.com/admissions" style="display:inline-flex;align-items:center;gap:0.5rem;background:#1a2f5e;color:#ffffff !important;font-weight:900;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:0.75rem 1.5rem;border-radius:9999px;text-decoration:none !important;transition:all 0.3s;">Enquire Now →</a>
</div>`;

function buildProcessedContent(post: WPPost): string {
  let content = post.content.rendered;

  content = content.replace(/<div[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/div>/gi, (match) => {
    const text = match.toLowerCase();
    if (text.includes('toc') || text.includes('table-of-contents') || text.includes('jm-toc')) return '';
    return match;
  });
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, (match) => {
    return match.toLowerCase().includes('toc') ? '' : match;
  });
  content = content.replace(/\[toc[^\]]*\]/gi, '');
  content = content.replace(/<h1(\b[^>]*)>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
  content = content.replace(/\[block[^>]*class="[^"]*jm-toc[^"]*"[^>]*\]/gi, '');
  content = content.replace(/<!--[^-]*-->/gi, '');
  content = content.replace(/https:\/\/smhs\.seedlingschools\.com\/blog(?!\/wp-)/g, '');

  const headings: Array<{ level: number; text: string; id: string }> = [];
  const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = headingRegex.exec(content)) !== null) {
    const text = m[2].replace(/<[^>]*>/g, '');
    headings.push({
      level: parseInt(m[1]),
      text,
      id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  }

  content = content.replace(/<h([2-4])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, text) => {
    const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });

  if (headings.length > 0) {
    const tocHtml = `<div class="max-w-3xl mx-auto mb-12"><div class="bg-white/80 backdrop-blur-sm border border-sand/40 rounded-2xl p-6 shadow-sm">
      <h2 class="text-[10px] font-black uppercase tracking-[0.25em] text-text-light mb-4">In This Article</h2>
      <nav class="space-y-1">
        ${headings.map((h) => `
          <a href="#${h.id}" class="block w-full text-left text-sm font-bold text-navy-deeper/70 hover:text-crimson transition-colors py-1.5 ${h.level === 2 ? 'pl-0' : h.level === 3 ? 'pl-5 text-[13px]' : 'pl-10 text-[12px]'}">${h.text}</a>
        `).join('')}
      </nav>
    </div></div>`;

    const firstH2Index = content.indexOf('<h2');
    if (firstH2Index > 0) {
      content = content.slice(0, firstH2Index) + tocHtml + content.slice(firstH2Index);
    }
  }

  // Inject mid CTA after 4th </p>
  let pCount = 0;
  let midInsertIdx = -1;
  let searchFrom = 0;
  while (pCount < 4) {
    const idx = content.indexOf('</p>', searchFrom);
    if (idx === -1) break;
    pCount++;
    if (pCount === 4) { midInsertIdx = idx + 4; break; }
    searchFrom = idx + 4;
  }
  if (midInsertIdx !== -1) {
    content = content.slice(0, midInsertIdx) + MID_CTA + content.slice(midInsertIdx);
  }

  // Inject end CTA at bottom of content
  content = content + END_CTA;

  return content;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await fetch(
    "https://smhs.seedlingschools.com/blog/wp-json/wp/v2/posts?slug=" + encodeURIComponent(slug),
    { next: { revalidate: 300 } }
  );
  if (!response.ok) return {};
  const posts: WPPost[] = await response.json();
  const post = posts[0];
  if (!post) return {};
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  return {
    title: stripHtml(post.title.rendered),
    description,
    alternates: { canonical: "/blog/" + post.slug },
    openGraph: {
      title: stripHtml(post.title.rendered),
      description,
      type: "article" as const,
      url: "/blog/" + post.slug,
      images: [getMediaUrl(post)],
    },
  };
}
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const postRes = await fetch(
    `https://smhs.seedlingschools.com/blog/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 300 } }
  );

  if (!postRes.ok) notFound();

  const posts: WPPost[] = await postRes.json();
  const post = posts[0];

  if (!post) notFound();

  // Fetch related posts by same categories (not all 100)
  const categoryIds = post.categories.join(',');
  let relatedPosts: WPPost[] = [];
  try {
    const relatedRes = await fetch(
      `https://smhs.seedlingschools.com/blog/wp-json/wp/v2/posts?categories=${categoryIds}&per_page=4&_embed&exclude=${post.id}`,
      { next: { revalidate: 300 } }
    );
    if (relatedRes.ok) {
      relatedPosts = (await relatedRes.json()).slice(0, 3);
    }
  } catch {
    // no related posts
  }

  const processedContent = buildProcessedContent(post);
  const readTime = Math.max(1, Math.ceil(stripHtml(post.content.rendered).split(' ').length / 200));
  const postCategories = getPostCategories(post);

  return (
    <div className="min-h-screen bg-off-white font-dm">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Blog"
        badge="Stories & Updates"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-navy-deeper/60 font-black text-[11px] uppercase tracking-widest hover:text-navy-deeper transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>

      <article className="pt-10 pb-2 px-6 max-w-7xl mx-auto">
        <header className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {postCategories.map((cat) => (
              <span
                key={cat}
                className="bg-navy-deeper/10 text-navy-deeper text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-navy-deeper leading-tight mb-8">
            {stripHtml(post.title.rendered)}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <time className="text-text-light text-[11px] font-black uppercase tracking-widest">{formatDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-sand" />
            <span className="text-text-light text-[11px] font-black uppercase tracking-widest">{readTime} min read</span>
          </div>
        </header>

        <div className="relative max-w-5xl mx-auto mb-16 rounded-[2rem] overflow-hidden shadow-xl">
          <img
            src={getMediaUrl(post)}
            alt={stripHtml(post.title.rendered)}
            className="w-full aspect-[16/9] object-contain bg-white"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="font-dm text-navy-deeper leading-relaxed [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-deeper [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:pl-4 [&_h2]:border-l-4 [&_h2]:border-crimson [&_h3]:font-playfair [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy-deeper [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:font-bold [&_h4]:text-lg [&_h4]:text-navy-deeper [&_h4]:mt-6 [&_h4]:mb-3 [&_p]:text-base [&_p]:leading-8 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2.5 [&_li]:text-base [&_li]:leading-7 [&_a]:text-crimson [&_a]:underline [&_a]:hover:text-crimson-dark [&_blockquote]:border-l-4 [&_blockquote]:border-sand [&_blockquote]:pl-5 [&_blockquote]:py-3 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-text-light [&_img]:w-full [&_img]:rounded-2xl [&_img]:my-8 [&_img]:shadow-lg [&_figure]:my-8 [&_figcaption]:text-center [&_figcaption]:text-text-light [&_figcaption]:text-sm [&_figcaption]:mt-3 [&_hr]:border-sand/30 [&_hr]:my-10 [&_strong]:font-bold [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto mt-14 mb-4">
          <div className="flex gap-5 items-start bg-white border border-sand/40 rounded-2xl p-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-navy-deeper flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light mb-1">Written by</p>
              <h4 className="font-playfair text-lg font-bold text-navy-deeper mb-2">SMHS Editorial Team</h4>
              <p className="text-sm text-text-light leading-relaxed">
                Seedling Modern High School shares expert educational insights, parenting guidance, and student success resources developed by experienced educators and academic professionals. Every article is carefully researched, reviewed for accuracy, and designed to provide practical, reliable information that supports students, parents, and lifelong learning.
              </p>
            </div>
          </div>
        </div>

      </article>

      {relatedPosts.length > 0 && (
        <section className="pt-8 pb-10 px-6 bg-white border-t border-sand/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-black text-text-light uppercase tracking-[0.3em] whitespace-nowrap">Related Articles</span>
              <div className="h-px bg-sand/30 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col bg-off-white rounded-3xl overflow-hidden border border-sand/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={getMediaUrl(relatedPost)}
                      alt={stripHtml(relatedPost.title.rendered)}
                      className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <time className="text-text-light text-[10px] font-black uppercase tracking-widest mb-3">
                      {formatDate(relatedPost.date)}
                    </time>
                    <h3 className="font-playfair text-lg font-bold text-navy-deeper leading-tight mb-4 group-hover:text-crimson transition-colors duration-300">
                      {stripHtml(relatedPost.title.rendered)}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-navy text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all duration-300 mt-auto">
                      Read More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
