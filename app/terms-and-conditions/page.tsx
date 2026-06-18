"use client";

import React, { useState, useEffect } from "react";
import HeroWrapper from "@/components/layout/HeroWrapper";

const sections = [
  { id: "s1", title: "1. Website Information Disclaimer", content: "Seedling Group of Schools makes every effort to ensure that the information provided on this website is accurate and up to date. However, the School gives no warranty or guarantee regarding the accuracy, completeness, or suitability of the information for any specific purpose. The content available on this website does not constitute legal, professional, or educational advice.", callout: "All implied warranties and conditions are excluded to the fullest extent permitted by law. The School shall not be liable for any direct or indirect loss, damage, or inconvenience arising from the use of, or reliance upon, the information contained on this website, except in cases of death or personal injury caused by negligence." },
  { id: "s2", title: "2. Third-Party Links", content: "This website may contain links to third-party websites for convenience and informational purposes only. Seedling Group of Schools has no control over the content of such websites and accepts no responsibility or liability for their content, availability, or practices." },
  { id: "s3", title: "3. Changes to Terms", content: "The School reserves the right to modify, amend, update, or remove any part of these Terms and Conditions at any time without prior notice. By continuing to use the website, you agree to be bound by the current version of these terms. Users are advised to review this page periodically." },
  { id: "s4", title: "4. Acceptable Use", content: "You must not use this website or any of its interactive features to:", list: ["Commit or encourage unlawful activities", "Misrepresent your identity or provide false information", "Hack, attempt to hack, or interfere with the website or its systems", "Store or misuse personal data obtained from the website", "Upload, post, or transmit obscene, offensive, defamatory, or unlawful material", "Introduce viruses, malware, or any harmful data that may damage the website or its systems"] },
  { id: "s5", title: "5. Website Availability", content: "While Seedling Group of Schools endeavors to keep the website accessible at all times, it reserves the right to suspend, restrict, or withdraw access to the website (in whole or in part) at any time without notice for operational, security, or administrative reasons." },
  { id: "s6", title: "6. Disclaimer", subtitle: "Changes to Academic Information", content: "The School strives to ensure that all academic, course, admission, facility, and fee-related information published on the website is accurate at the time of publication. However, changes may become necessary due to academic, regulatory, staffing, or operational requirements. The School will make reasonable efforts to inform stakeholders of any significant changes. Users are advised to regularly check the website or contact the School directly for the latest information." },
  { id: "s7", title: "7. No Liability to Third Parties", content: "Any dealings or communications between Seedling Group of Schools and students or prospective students do not create a legal or contractual relationship with parents, guardians, sponsors, or other third parties. Use of the online prospectus and website content is subject to these Terms and Conditions." },
  { id: "s8", title: "8. Copyright", content: "All content on this website, including text, images, logos, and design, is protected by copyright and other intellectual property laws. Content may be viewed, printed, or downloaded solely for personal and non-commercial use. No material may be copied, modified, reproduced, published, or distributed without prior written permission from Seedling Group of Schools.", callout: "The name, logo, and trademarks of Seedling Group of Schools may not be used without express written authorization from the School." },
  { id: "s9", title: "9. Complaints", content: "Any complaints regarding material published on the School's website or references to the School on external websites will be reviewed and addressed as promptly as reasonably possible." },
  { id: "s10", title: "10. Governing Law", content: "These Terms and Conditions constitute the entire agreement regarding the use of this website. They shall be governed by and interpreted in accordance with the laws of India. Users submit to the non-exclusive jurisdiction of the courts of India." },
];

export default function TermsAndConditions() {
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
  }, []);

  return (
    <div className="min-h-screen bg-off-white font-dm selection:bg-navy/10 scroll-smooth">

      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.jpg"
        title="Terms & Conditions"
        badge="Legal"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

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

      <footer className="py-12 text-center border-t border-sand/30">
        <p className="text-text-light text-[10px] font-black uppercase tracking-[0.2em]">
          Seedling Schools | Jaipur • Rajasthan • India
        </p>
      </footer>
    </div>
  );
}
