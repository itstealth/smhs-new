"use client";
import { useEnquiry } from "@/components/EnquiryContext";

export default function CTABanner() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="bg-[#013975] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-white/60 text-[10px] font-bold tracking-[0.6em] uppercase mb-4">Admissions 2026–27</p>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Begin Your Child's Journey?
        </h2>
        <p className="text-white/55 mb-8 max-w-xl mx-auto">
          Limited seats available. Apply now to secure your child's place in one of India's premier school boards.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={openEnquiry} className="px-8 py-3.5 bg-white text-[#013975] font-bold rounded-sm text-sm hover:bg-[#eef4fc] transition-colors duration-300">
            Enquire Now
          </button>
          <a href="/contact-us" className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-sm text-sm hover:bg-white/10 transition-colors duration-300">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}