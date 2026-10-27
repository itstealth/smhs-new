import Link from "next/link";
import { Download, MoveRight } from "lucide-react";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "@/components/icons/BrandIcons";

export default function Footer() {
  const brochureHref = "/SMHS_Prospectus.pdf";

  return (
    <footer className="bg-[#060e1c] border-t border-white/10 relative overflow-hidden">
      {/* Subtle mesh decoration */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] mesh-gradient opacity-[0.05] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-14 md:pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-8">

          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center">
              <img
                src="/SPS_Logo.webp"
                alt="Seedling Schools Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-xl leading-relaxed text-white/60 font-medium max-w-lg font-dm hidden md:block">
              Dedicated to academic excellence and holistic growth since 1993. We empower the next generation of global leaders with curiosity, character, and competence.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/smhsjaipur/?hl=en" },
                { icon: Facebook, href: "https://www.facebook.com/SMHSJaipur/" },
                { icon: Youtube, href: "https://www.youtube.com/channel/UCJndN6j3ObAl8G1jbiY0TtA" },
                { icon: Linkedin, href: "https://www.linkedin.com/school/seedling-schools/posts/?feedView=all" },
                { icon: Twitter, href: "https://x.com/SeedlingSchools?t=X94ppyw3vv8U40SzkrU9Cg&s=09" },
              ].map((social, idx) => (
                <a key={idx} href={social.href} className="w-14 h-14 rounded-2xl border border-white/15 flex items-center justify-center text-white/50 hover:bg-white hover:text-navy-deeper hover:shadow-lg transition-all duration-500">
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Overview */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-crimson font-black text-xs tracking-[0.3em] uppercase block border-b border-white/10 pb-4">Quick Overview</h3>
            <ul className="space-y-6">
              {['Blog','Policies', 'Mandatory Disclosures', 'ERP Login', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="group flex items-center text-sm font-black text-white/60 hover:text-white transition-colors font-dm">
                    <MoveRight className="w-5 h-5 mr-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-sand" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={brochureHref}
                  download
                  className="group flex items-center text-sm font-black text-white/60 hover:text-white transition-colors font-dm"
                >
                  <Download className="w-5 h-5 mr-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-sand" />
                  <span>Download Brochure</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Institutions */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-crimson font-black text-xs tracking-[0.3em] uppercase block border-b border-white/10 pb-4">Our Institutions</h3>
            <div className="space-y-6">
              {[
                { name: 'Seedling Modern High School', loc: 'Durgapura, Jaipur', link: '/' },
              ].map((school) => (
                <div key={school.name} className="group cursor-default">
                  {school.link ? (
                    <a href={school.link} target={school.link.startsWith('http') ? '_blank' : '_self'} rel={school.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="block text-sm font-black text-white/80 hover:text-sand transition-colors">{school.name}</a>
                  ) : (
                    <span className="block text-sm font-black text-white/80 group-hover:text-sand transition-colors">{school.name}</span>
                  )}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mt-1">{school.loc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Location Maps */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-crimson font-black text-xs tracking-[0.3em] uppercase block border-b border-white/10 pb-4">Locations</h3>
            <div className="space-y-4">
              <div className="h-44 sm:h-48 md:h-[200px] rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps?q=Seedling+Modern+High+School,+Ashok+Marg,+Mahaveer+Nagar-II,+Durgapura,+Jaipur+302018&output=embed"
                  width="100%"
                  height="200"
                  className="h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Durgapura Campus"
                />
              </div>
            </div>
          </div>

          {/* Column 5: Contact */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-crimson font-black text-xs tracking-[0.3em] uppercase block border-b border-white/10 pb-4">Contact</h3>
            <div className="space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">General Inquiry</span>
                <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="text-sm font-black text-white/80 hover:text-sand transition-colors">smhsjaipur@jnujaipur.ac.in</a>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Admission Helpline</span>
                <a href="tel:+919587772837" className="text-sm font-black text-white/80 hover:text-sand transition-colors">+91 9587772837</a>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mt-2">Office Landline</span>
                <a href="tel:01413624000" className="text-sm font-black text-white/80 hover:text-sand transition-colors">0141-3624000</a>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Visit Us</span>
                <p className="text-sm font-black text-white/80 leading-snug">Durgapura, Jaipur 302018</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="md:pt-6 pt-4 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-black text-sand">©</div>
            <p className="text-sm font-black text-white/40">
              {new Date().getFullYear()} Seedling Modern High School. <br />
              <span className="text-[10px] uppercase tracking-widest">Architected for Future Leaders.</span>
            </p>
          </div>
          <p className="text-[11px] text-white/30">
            Design & Developed by{" "}
            <a
              href="https://stealthdigital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand/60 hover:text-sand transition-colors font-black"
            >
              Stealth Digital
            </a>
          </p>
          {/* <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            <Link href="/privacy-policy" className="text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sand transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sand transition-colors">
              Policies
            </Link>
            <Link href="/mandatory-disclosure" className="text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sand transition-colors">
              Disclosure
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
