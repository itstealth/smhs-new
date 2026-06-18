import React from 'react';
import type { Metadata } from 'next';
import HeroWrapper from '@/components/layout/HeroWrapper';

export const metadata: Metadata = {
  title: 'Mandatory Public Disclosure | Seedling Modern High School, Jaipur',
  description: 'Mandatory public disclosure information for Seedling Modern High School (SMHS), Jaipur, as per CBSE Affiliation Bye-Laws. Includes school info, affiliation status, and certificates.',
  keywords: 'Seedling Modern High School, Jaipur, Mandatory Disclosure, CBSE Compliance, School Information, Affiliation Status',
};

const MandatoryDisclosure = () => {
  return (
    <div className="min-h-screen bg-off-white font-dm selection:bg-navy/10">

      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Mandatory Public Disclosure"
        badge="CBSE Compliance"
        breadcrumbs={[{ label: "Mandatory Disclosure" }]}
      />

      <main className="max-w-6xl mx-auto px-6 py-20">

        {/* Section 1: School Info */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-sand/30 mb-10 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

          <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-navy-deeper flex items-center justify-center text-white font-playfair text-2xl font-bold shadow-xl shadow-navy/20">
              01
            </div>
            <h3 className="font-playfair text-3xl font-bold text-navy-deeper">School Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-crimson uppercase tracking-[0.2em] mb-2">School Name & Address</label>
                <div className="text-navy-deeper leading-relaxed">
                  <strong className="text-xl block mb-1">Seedling Modern High School</strong>
                  <p className="text-text-light font-light">Ashok Marg, Mahaveer Nagar-II,<br />Durgapura, Jaipur — 302018, Rajasthan</p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-crimson uppercase tracking-[0.2em] mb-2">Contact Details</label>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-text-light">
                    <span className="text-navy">Email:</span>
                    <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="font-bold hover:text-navy transition-colors">smhsjaipur@jnujaipur.ac.in</a>
                  </p>
                  <p className="flex items-center gap-3 text-text-light">
                    <span className="text-navy">Phone:</span>
                    <span className="font-bold">0141-3624000</span>
                  </p>
                  <p className="flex items-center gap-3 text-text-light">
                    <span className="text-navy">Fax:</span>
                    <span className="font-bold">0141-2561684</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Year Established", val: "1993" },
                { label: "School Code", val: "10441" },
                { label: "Affiliation No.", val: "1730084" },
                { label: "Campus Area", val: "3330 m²" },
              ].map((item) => (
                <div key={item.label} className="bg-sand/10 border border-sand/30 rounded-2xl p-6 text-center">
                  <div className="font-playfair text-3xl font-bold text-navy-deeper mb-1">{item.val}</div>
                  <div className="text-[10px] font-black text-text-light uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Affiliation & Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Affiliation */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-sand/30">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 rounded-xl bg-sand/20 flex items-center justify-center text-navy-deeper font-playfair text-xl font-bold">
                02
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-deeper">Affiliation Status</h3>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-sand/20">
                <span className="text-text-light text-sm uppercase tracking-widest font-black text-[10px]">Status</span>
                <span className="bg-navy-light text-navy text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Provisional</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-sand/20">
                <span className="text-text-light text-sm uppercase tracking-widest font-black text-[10px]">Affiliated Since</span>
                <span className="font-bold text-navy-deeper">1993</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-light text-sm uppercase tracking-widest font-black text-[10px]">Valid Upto</span>
                <span className="font-bold text-navy-deeper">31 March 2025</span>
              </div>
            </div>
          </div>

          {/* Trust */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-sand/30">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 rounded-xl bg-sand/20 flex items-center justify-center text-navy-deeper font-playfair text-xl font-bold">
                03
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-deeper">Trust Details</h3>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-4 border-b border-sand/20">
                <span className="text-text-light text-sm uppercase tracking-widest font-black text-[10px]">Trust Name</span>
                <span className="font-bold text-navy-deeper text-right max-w-[180px]">Mahima Shiksha Samiti</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-light text-sm uppercase tracking-widest font-black text-[10px]">Reg. Valid Upto</span>
                <span className="font-bold text-navy-deeper">10 May 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Documents */}
        <div className="bg-navy-deeper rounded-[3rem] p-8 md:p-16 mb-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-crimson flex items-center justify-center text-white font-playfair text-2xl font-bold shadow-xl shadow-crimson/20 mb-6">
                04
              </div>
              <h3 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">Documents &<br /><span className="text-sand">Certificates</span></h3>
            </div>
            <p className="text-white/60 max-w-sm text-lg font-light leading-relaxed">
              Official records and certifications as per regulatory requirements. Click to view full documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {[
              { id: '(i)', name: 'Affiliation / Upgradation Letter', url: 'https://seedlingschools.com/mandatory-discloser/Affiliation-Upgradation-Letter.pdf' },
              { id: '(ii)', name: 'Trust Registration Certificate', url: 'https://seedlingschools.com/mandatory-discloser/Trust-Registration-Certificate.pdf' },
              { id: '(iii)', name: 'No Objection Certificate', url: 'https://seedlingschools.com/mandatory-discloser/NOC-By-State-Govt.pdf' },
              { id: '(iv)', name: 'RTE Recognition Certificate', url: 'https://seedlingschools.com/mandatory-discloser/RTE.pdf' },
              { id: '(v)', name: 'Building Safety Certificate', url: 'https://seedlingschools.com/mandatory-discloser/Building-Safety-Certificate.pdf' },
              { id: '(vi)', name: 'Fire Safety Certificate', url: 'https://seedlingschools.com/mandatory-discloser/Fire-Safety.pdf' },
              { id: '(vii)', name: 'Health & Sanitation', url: 'https://seedlingschools.com/mandatory-discloser/Watar-Health.pdf' },
              { id: '(viii)', name: 'Fee Structure', url: 'https://seedlingschools.com/mandatory-discloser/Fee%20structure%20PDF.pdf' },
              { id: '(ix)', name: 'DEO Certificate', url: 'https://seedlingschools.com/deo-certificate.php' },
              { id: '(x)', name: 'Annual Academic Calendar', url: 'https://seedlingschools.com/mandatory-discloser/Year-Planner-2024-25.pdf' },
              { id: '(xi)', name: 'List of SMC Members', url: 'https://seedlingschools.com/smc.php' },
              { id: '(xii)', name: 'List of PTA Members', url: 'https://seedlingschools.com/pta-members.php' },
            ].map((doc) => (
              <a
                key={doc.name}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sand group-hover:bg-sand group-hover:text-navy-deeper transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">{doc.id}</p>
                  <p className="text-white text-sm font-bold truncate group-hover:text-sand transition-colors">{doc.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Section 5: Infrastructure */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-sand/30">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-sand flex items-center justify-center text-navy-deeper font-playfair text-2xl font-bold shadow-xl shadow-sand/20">
              05
            </div>
            <h3 className="font-playfair text-3xl font-bold text-navy-deeper">Infrastructure & Facilities</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Campus Area", val: "3330.28 sq. mtrs.", icon: "🏫" },
              { label: "Internet Facility", val: "✓ Available", icon: "🌐" },
              { label: "Gymnasium", val: "✓ Available", icon: "💪" },
              { label: "Library Resources", val: "✓ Extensive", icon: "📚" },
              { label: "Science Labs", val: "✓ Equipped", icon: "🔬" },
              { label: "Safe Drinking Water", val: "✓ Purified", icon: "🚰" },
            ].map((item) => (
              <div key={item.label} className="bg-off-white border border-sand/40 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-navy-deeper font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-crimson font-black uppercase tracking-widest text-[10px]">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 text-center border-t border-sand/30">
        <p className="text-text-light text-[10px] font-black uppercase tracking-[0.2em]">
          © Seedling Group of Schools | Compliance Division | CBSE Mandatory Disclosure
        </p>
      </footer>
    </div>
  );
};

export default MandatoryDisclosure;