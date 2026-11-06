import Image from "next/image";
import Link from "next/link";
import EnquiryTrigger from "@/components/ui/EnquiryTrigger";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about", children: [{ name: "About Seedling", href: "/about" }, { name: "Leadership", href: "/about/leadership" }] },
  { name: "Academics", href: "/curriculum", children: [{ name: "Curriculum", href: "/curriculum" }, { name: "Learning Support", href: "/learning-support" }] },
  { name: "School Life", href: "/school-life", children: [{ name: "Campus Life", href: "/school-life" }, { name: "Sports", href: "/sports" }] },
  { name: "News & Events", href: "/news-and-events" },
  { name: "Admissions", href: "/admissions", children: [{ name: "Procedure", href: "/admissions" }, { name: "Apply & Pay Online", href: "/admissions/apply" }, { name: "Transport Facility", href: "/transport-facility" }] },
  { name: "Alumni", href: "/alumni" },
  { name: "Contact", href: "/contact-us" },
];

function Chevron() {
  return <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>;
}

function MenuLinks({ pathname }: { pathname: string }) {
  return (
    <nav>
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
        <div key={item.name} className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link
              href={item.href}
              data-home-menu-close
              className={`flex-1 px-5 py-4 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors ${isActive ? "text-[#034ea2]" : "text-gray-700"}`}
            >
              {item.name}
            </Link>
            {item.children && (
              <details className="home-mobile-submenu">
                <summary aria-label={`Toggle ${item.name} submenu`} className="px-5 py-4 text-gray-400 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="home-mobile-chevron inline-flex transition-transform duration-200"><Chevron /></span>
                </summary>
                <div className="bg-gray-50 border-t border-gray-100">
                  {item.children.map((child) => (
                    <Link key={child.name} href={child.href} data-home-menu-close className="flex items-center gap-3 px-7 py-3.5 text-[11.5px] text-gray-500 hover:text-[#034ea2] border-b border-gray-100/80 last:border-0 transition-colors">
                      <span className="w-1 h-1 rounded-full bg-[#a3123f] flex-shrink-0" />
                      {child.name}
                    </Link>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>
      );})}
    </nav>
  );
}

export default function SiteHeader({ pathname = "/" }: { pathname?: string }) {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[200] bg-[#013975]">
        <header className="bg-[#013975]">
          <nav className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-[68px] gap-6">
              <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                <Image src="/logo.webp" alt="Seedling Modern High School" width={52} height={52} className="rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="font-serif text-[13.5px] font-bold text-white tracking-widest uppercase">Seedling</p>
                  <p className="text-[9px] text-white/70 tracking-[0.25em] uppercase">Modern High School</p>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-0">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                  <div key={item.name} className="home-desktop-nav-item relative">
                    <Link href={item.href} className={`flex items-center gap-1 px-3.5 py-2 text-[11.5px] font-semibold tracking-[0.1em] uppercase transition-colors duration-150 ${isActive ? "text-white" : "text-white/45 hover:text-white"}`}>
                      {item.name}
                      {item.children && <span className="home-desktop-chevron transition-transform duration-200"><Chevron /></span>}
                    </Link>
                    {item.children && (
                      <div className="home-desktop-dropdown absolute top-full left-0 mt-0 w-52 bg-[#013975] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
                        <div className="h-[2px] bg-gradient-to-r from-[#a3123f] to-[#a3123f]" />
                        {item.children.map((child) => (
                          <Link key={child.name} href={child.href} className="block px-5 py-3 text-[12px] text-white/50 hover:text-white hover:bg-white/[0.04] tracking-wide transition-colors border-b border-white/[0.04] last:border-0">
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );})}
              </div>

              <div className="hidden lg:block flex-shrink-0">
                <Link href="/admissions/apply" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#013975] hover:bg-[#034ea2] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors duration-200 whitespace-nowrap">Apply &amp; Pay</Link>
              </div>
              <div className="hidden lg:block flex-shrink-0">
                <EnquiryTrigger className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a3123f] hover:bg-[#8a0f34] text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors duration-200 whitespace-nowrap">Enquire Now</EnquiryTrigger>
              </div>

              <details className="home-mobile-menu lg:hidden">
                <summary aria-label="Open menu" className="p-2 text-white/60 hover:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </summary>
                <button type="button" data-home-menu-close aria-label="Close menu" className="home-mobile-backdrop fixed inset-0 bg-black/50 z-[210] transition-opacity duration-300" />
                <div className="home-mobile-drawer fixed top-0 left-0 h-full w-[85vw] max-w-[340px] bg-white z-[220] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <Link href="/" data-home-menu-close className="flex items-center gap-2.5">
                      <Image src="/logo.webp" alt="Seedling" width={44} height={44} className="rounded-full object-cover" />
                      <div className="leading-tight">
                        <p className="font-serif text-[12px] font-bold text-[#013975] tracking-widest uppercase">Seedling</p>
                        <p className="text-[8px] text-gray-400 tracking-[0.2em] uppercase">Modern High School</p>
                      </div>
                    </Link>
                    <button type="button" data-home-menu-close className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors" aria-label="Close menu">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <MenuLinks pathname={pathname} />
                  <div className="border-t border-gray-100 px-5 py-4">
                    <div data-home-menu-close>
                      <EnquiryTrigger className="block w-full text-center py-3.5 bg-[#a3123f] hover:bg-[#8a0f34] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-lg transition-colors">Enquire Now</EnquiryTrigger>
                    </div>
                    <div className="flex items-center justify-around pt-4">
                      <a href="tel:+919587772837" className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Call</span>
                      </a>
                      <a href="mailto:smhsjaipur@jnujaipur.ac.in" className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Email</span>
                      </a>
                      <a href="/contact-us" data-home-menu-close className="flex flex-col items-center gap-1.5 text-[#a3123f] hover:text-[#034ea2] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">Visit</span>
                      </a>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </nav>
        </header>
      </div>
      <script type="module">
        {`(function(){
          var menu=document.querySelector('.home-mobile-menu');
          if(!menu)return;
          var menuTrigger=menu.querySelector('summary');
          menu.addEventListener('toggle',function(){
            if(menuTrigger)menuTrigger.setAttribute('aria-label',menu.open?'Close menu':'Open menu');
            if(!menu.open)menu.querySelectorAll('details[open]').forEach(function(item){item.removeAttribute('open');});
          });
          document.addEventListener('click',function(event){
            if(event.target instanceof Element&&event.target.closest('[data-home-menu-close]')){
              menu.removeAttribute('open');
              menu.querySelectorAll('details[open]').forEach(function(item){item.removeAttribute('open');});
            }
          });
          document.addEventListener('keydown',function(event){
            if(event.key==='Escape'){
              menu.removeAttribute('open');
              menu.querySelectorAll('details[open]').forEach(function(item){item.removeAttribute('open');});
            }
          });
        })();`}
      </script>
    </>
  );
}
