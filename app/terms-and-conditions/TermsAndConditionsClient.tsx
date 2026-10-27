"use client";

import React, { useState, useEffect } from "react";

export type TermsAndConditionsSection = {
  id: string;
  title: string;
  content: string;
  subtitle?: string;
  callout?: string;
  list?: string[];
};

export default function TermsAndConditionsClient({ sections }: { sections: TermsAndConditionsSection[] }) {
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);

      let current = "";
      sections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = sec.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16">

        {/* Sidebar Navigation */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-32 space-y-6">

            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full lg:hidden flex items-center justify-between bg-white border border-sand/40 rounded-2xl px-6 py-4 font-bold text-navy-deeper shadow-sm"
            >
              <span className="uppercase tracking-widest text-[10px] font-black">Table of Contents</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isTocOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div className={`${isTocOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
              <div className="bg-white border border-sand/30 rounded-[2rem] p-8 shadow-sm">
                <div className="text-[10px] font-black text-navy uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <span className="w-6 h-px bg-navy" />
                  Navigation
                </div>

                <nav className="space-y-1">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                        activeSection === sec.id
                          ? 'text-white bg-navy-deeper border-navy-deeper shadow-lg shadow-navy/20'
                          : 'text-text-light hover:text-navy hover:bg-navy/5 border-transparent'
                      }`}
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                {/* Progress */}
                <div className="mt-10 pt-8 border-t border-sand/20">
                  <div className="flex items-center justify-between text-[9px] font-black text-navy-deeper uppercase tracking-widest mb-3">
                    <span>Read Progress</span>
                    <span className="text-crimson">{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-off-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-crimson rounded-[2rem] p-8 text-white shadow-xl shadow-crimson/20">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-4">Legal Framework</p>
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                  Governed by the<br /><span className="text-2xl font-playfair lowercase italic font-light tracking-normal">laws of India</span>
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-16">
          {sections.map((sec, idx) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-32 group">
              <div className="bg-white border border-sand/30 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">
                <div className="bg-navy-deeper px-8 py-6 flex items-center gap-6">
                  <span className="font-playfair text-xl font-bold text-sand/60">{(idx + 1).toString().padStart(2, '0')}</span>
                  <h2 className="font-playfair text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                    {sec.title.split('. ')[1] || sec.title}
                  </h2>
                </div>

                <div className="p-8 md:p-12 space-y-8">
                  {sec.subtitle && (
                    <h3 className="text-[10px] font-black text-crimson uppercase tracking-[0.3em]">
                      {sec.subtitle}
                    </h3>
                  )}

                  <p className="text-text-light leading-relaxed text-lg font-light opacity-90">
                    {sec.content}
                  </p>

                  {sec.callout && (
                    <div className="p-6 bg-off-white border-l-4 border-crimson rounded-r-2xl font-bold text-navy-deeper text-sm md:text-base leading-relaxed tracking-wide">
                      {sec.callout}
                    </div>
                  )}

                  {sec.list && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sec.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-sand/10 border border-sand/20 text-navy-deeper font-bold text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-crimson shrink-0" />
                          <span className="opacity-80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* Agreement Box */}
          <div className="bg-navy-deeper rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden mt-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sand/10 blur-[80px] rounded-full -mr-20 -mt-20" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-playfair text-4xl font-bold text-white mb-6 uppercase tracking-tighter">Agreement Acknowledged</h3>
              <p className="text-white/60 text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
                By continuing to use this website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
              <div className="pt-8 border-t border-white/10 text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
                © Seedling Group of Schools | Compliance Division
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
