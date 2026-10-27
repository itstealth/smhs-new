"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const infrastructure = [
  { icon: "🏛️", title: "State-of-the-Art Campus", desc: "Thoughtfully designed spaces — bright classrooms, smart boards, and collaborative areas — built to spark curiosity and a love for learning.", image: "/smhs_images/seedling_images/SMHS.webp", href: "/school-life" },
  { icon: "🏀", title: "Sports Facilities", desc: "Olympic-standard ground, basketball courts, and a dedicated fitness centre.", image: "/smhs_images/seedling_images/sports_home.webp", href: "/school-life" },
  { icon: "💻", title: "Modern Computing Lab", desc: "Advanced computer labs equipped with the latest hardware for digital literacy and coding.", image: "/smhs_images/seedling_images/computer_lab.webp", href: "/curriculum" },
  { icon: "📚", title: "Library & Resource Centre", desc: "Over 20,000 titles, digital subscriptions, and dedicated research reading rooms.", image: "/smhs_images/seedling_images/library_image.webp", href: "/curriculum" },
  { icon: "🔬", title: "STEM Laboratories", desc: "Cutting-edge physics, chemistry, biology, and robotics labs for hands-on learning.", image: "/smhs_images/seedling_images/lab-stem.webp", href: "/curriculum" },
];

export default function InfrastructureSection() {
  const [infraActiveIndex, setInfraActiveIndex] = useState(0);

  return (
    <section className="relative py-14 overflow-hidden">
      {/* Parallax BG */}
      <div
        className="absolute inset-0 -z-10 will-change-transform pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #f0f4ff 0%, #eef4fc 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <p className="text-[#a3123f] text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">Campus Highlights</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#034ea2]">World-Class Infrastructure</h2>
          <p className="text-[#013975]/55 mt-4 max-w-2xl mx-auto">
            Our campus is designed to inspire curiosity, foster collaboration, and provide every resource children need to thrive.
          </p>
        </div>

        {/* Desktop accordion */}
        <div className="hidden lg:block">
          <div className="flex gap-3">
            {infrastructure.map((item, index) => {
              const active = index === infraActiveIndex;

              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setInfraActiveIndex(index)}
                  onMouseLeave={() => setInfraActiveIndex(-1)}
                  className={`group relative h-[420px] overflow-hidden rounded-2xl bg-[#034ea2] shadow-xl shadow-black/5 transition-[flex] duration-700 ease-[cubic-bezier(.5,.85,.25,1.15)] ${active ? "flex-[3]" : "flex-[1]"}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/40" />
                  <div
                    className={[
                      "absolute inset-0 z-10 flex flex-col justify-end p-6 text-white",
                      active
                        ? "opacity-100 translate-y-0 transition-all duration-500 delay-300"
                        : "opacity-0 translate-y-3 transition-all duration-150 delay-0 pointer-events-none",
                    ].join(" ")}
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#a3123f] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-3">
                      {item.title}
                    </div>
                    <p className="text-sm leading-relaxed text-white/90">{item.desc}</p>
                    <Link href={item.href} className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#034ea2] transition-colors group-hover:bg-[#a3123f] group-hover:text-white">
                      Discover <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="grid gap-6 lg:hidden">
          {infrastructure.map((item) => (
            <div key={item.title} className="group bg-white rounded-lg overflow-hidden hover:bg-[#034ea2] transition-all duration-500 cursor-default border border-[#013975]/6">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 32px), 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#a3123f] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {item.title}
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[#013975]/60 group-hover:text-white/70 leading-relaxed transition-colors duration-500">{item.desc}</p>
                <Link href={item.href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#034ea2] group-hover:text-[#a3123f] transition-colors duration-500">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}