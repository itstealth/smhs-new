import Image from "next/image";
import Link from "next/link";
import EnquiryTrigger from "@/components/ui/EnquiryTrigger";

const STATS = [
  { n: "CBSE", label: "Curriculum" },
  { n: "2", label: "Seedling group campuses in Jaipur" },
];

export default function ModernHero() {
  return (
    <section
      className="relative w-full  flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Static Background Gradients (Performance Optimized) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(163,18,63,0.08) 0%, rgba(163,18,63,0.05) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(1,57,117,0.1) 0%, rgba(163,18,63,0.06) 40%, transparent 70%)",
          }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center "
      >
        {/* Left Content Area */}
        <div className="flex flex-col items-start pt-1 sm:pt-6 lg:pt-0">
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-white/80 backdrop-blur-md mb-4 sm:mb-8 shadow-sm"
          >
            <div className="h-px w-6 bg-[#a3123f]" />
            <span className="text-[#013975] text-xs font-bold tracking-widest uppercase">
              Why Choose Us
            </span>
          </div>

          <h2
            className="text-[#013975] font-serif italic leading-[1.05] mb-3 sm:mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Where Little Seeds<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034ea2] to-[#a3123f] not-italic font-sans font-bold">
              Bloom Brightly.
            </span>
          </h2>

          <p
            className="text-[#013975]/70 text-base md:text-lg max-w-[480px] mb-4 sm:mb-8 leading-relaxed font-medium"
          >
            Where Learning Meets Innovation. Seedling Group of Schools is a premier institution dedicated to excellence in education, well-rounded achievement — where every learner is inspired to explore, innovate, and excel.
          </p>

          <div
            className="flex flex-wrap items-center gap-4"
          >
            <EnquiryTrigger
              className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-[#034ea2] text-white font-semibold text-sm tracking-wide rounded-full shadow-xl hover:shadow-[#013975]/30 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-2">
                Enquire Now
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </EnquiryTrigger>
            <Link
              href="/curriculum"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#013975]/20 text-[#013975] font-semibold text-sm tracking-wide rounded-full hover:border-[#013975] hover:bg-[#034ea2]/5 transition-all duration-300"
            >
              Academic Excellence
            </Link>
          </div>
        </div>

        <div className="w-full">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image src="/smhs_images/seedling_images/group_students.webp" alt="Seedling Modern High School student community" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4">{STATS.map(stat => <div key={stat.label} className="rounded-xl border border-blue-100 bg-white p-4"><dt className="text-sm text-[#013975]">{stat.label}</dt><dd className="mt-2 text-2xl font-bold text-[#034ea2]">{stat.n}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}
