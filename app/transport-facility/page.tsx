import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroWrapper from "@/components/layout/HeroWrapper";
import {
  Bus,
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  PhoneCall,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Transport Facility | Safe School Bus Service in Jaipur | Seedling Schools",
  description:
    "Explore Seedling Schools' transport facility in Jaipur with safe school buses, trained attendants, CCTV monitoring, route planning, and convenient pickup support for families.",
  keywords: [
    "Seedling Schools transport facility",
    "school bus service Jaipur",
    "safe school transport Jaipur",
    "Seedling school bus routes",
    "school transportation facility",
  ],
};

const heroStats = [
  { value: "GPS", label: "Enabled Routes" },
  { value: "CCTV", label: "Monitored Safety" },
  { value: "Jaipur", label: "City Coverage" },
];

const safetyFeatures = [
  {
    title: "Well-Maintained School Buses",
    description:
      "Our transport fleet is maintained through regular inspections so every commute remains dependable, clean, and comfortable for students.",
    icon: Bus,
    image: "/smhs_images/seedling_images/smhs_bus.webp",
  },
  {
    title: "CCTV Supported Monitoring",
    description:
      "Campus and transport movement are supported by surveillance systems that help the school team maintain a secure daily routine.",
    icon: Camera,
    image: "/smhs_images/seedling_images/camera.webp",
  },
  {
    title: "Supervised Campus Entry",
    description:
      "Arrival and dispersal are managed carefully at school gates to keep movement orderly and reassuring for children and parents.",
    icon: ShieldCheck,
    image: "/assets/transport-facility/entry-gate.webp",
  },
  {
    title: "Trained Security Support",
    description:
      "Security staff and attendants coordinate with the school office to guide students safely from bus stops to campus spaces.",
    icon: UsersRound,
    image: "/assets/transport-facility/security-guard.webp",
  },
];

const coverageAreas = [
  "Jawahar Nagar",
  "Durgapura",
  "Malviya Nagar",
  "Mansarovar",
  "Jagatpura",
  "Raja Park",
  "C-Scheme",
  "Vaishali Nagar",
  "Tonk Road",
  "Pratap Nagar",
  "Adarsh Nagar",
  "Mahaveer Nagar",
];

const routeSteps = [
  {
    title: "Nearest Pickup Point",
    description:
      "The transport desk helps parents identify the most convenient pickup and drop point based on home location and current routes.",
  },
  {
    title: "Clear Timing Communication",
    description:
      "Bus timings, route updates, and temporary changes are communicated through the school office and official parent channels.",
  },
  {
    title: "Daily Supervision",
    description:
      "Drivers, attendants, guards, and campus staff work together during arrival and dispersal to keep the process smooth.",
  },
];

const assurances = [
  "Trained drivers and route attendants",
  "Planned pickup and drop points across Jaipur",
  "First-aid and safety essentials on transport routes",
  "Coordinated arrival and dispersal supervision",
  "Regular vehicle checks and cleanliness routines",
  "Support from the school transport helpdesk",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-crimson font-dm">
      <span className="h-px w-8 bg-crimson" />
      {children}
    </span>
  );
}

export default function TransportFacilityPage() {
  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/smhs_tran.webp"
        title="Transport Facility"
        badge="Safe Transportation"
        breadcrumbs={[{ label: "Transport" }]}
      />

      <section className="pt-14 pb-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>Student Safety First</SectionLabel>
              <h2 className="mt-5 font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.08] tracking-tight">
                A smoother journey from home to school.
              </h2>
              <p className="mt-7 text-text-light text-base md:text-lg leading-[1.9]">
                Seedling Schools offers a thoughtfully managed transport facility for students across major Jaipur localities. The service is planned to support safe travel, reliable timing, and coordinated communication between parents, transport staff, and the school office.
              </p>
              <p className="mt-5 text-text-light text-base md:text-lg leading-[1.9]">
                From supervised campus entry to attentive route management, every detail is shaped to make daily school travel feel calm, punctual, and secure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-editorial mt-12">
                <Image
                  src="/assets/transport-facility/camera.webp"
                  alt="Seedling Schools campus entry gate"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: "center 90%" }}
                />
              </div>
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-editorial">
                  <Image
                    src="/smhs_images/seedling_images/smhs_guard.webp"
                    alt="Security guard supervising school entry"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: "80% center" }}
                  />
                </div>
                <div className="bg-navy-deeper rounded-3xl p-7 text-white">
                  <Clock className="h-8 w-8 text-sand mb-5" />
                  <p className="font-playfair text-2xl font-black text-white leading-tight">
                    Timely, supervised, and parent-friendly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Facility Highlights</SectionLabel>
            <h2 className="mt-5 font-playfair text-4xl md:text-5xl font-black text-navy-deeper leading-[1.08]">
              Transport care built into the school day.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {safetyFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group bg-off-white border border-sand/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/70 to-transparent" />
                    <div className="absolute left-6 bottom-6 h-14 w-14 rounded-2xl bg-sand text-navy-deeper flex items-center justify-center shadow-xl">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="p-7 md:p-9">
                    <h3 className="font-playfair text-2xl font-black text-navy-deeper mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-light text-sm md:text-base leading-[1.85]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-14 pb-16 bg-navy-deeper text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-sand font-dm">
                <span className="h-px w-8 bg-sand" />
                Route Coverage
              </span>
              <h2 className="mt-5 font-playfair text-4xl md:text-5xl font-black text-white leading-[1.08]">
                Connecting major Jaipur neighbourhoods.
              </h2>
              <p className="mt-7 text-white/70 text-base md:text-lg leading-[1.9]">
                Routes are reviewed by the school transport team and adjusted according to campus requirements, student enrolment, and practical pickup points.
              </p>
              {/* <div className="mt-9 bg-white/5 border border-white/10 rounded-3xl p-7">
                <MapPin className="h-9 w-9 text-sand mb-4" />
                <p className="text-white font-playfair text-2xl font-black leading-tight">
                  For exact routes, fees, and pickup timing, please contact the school office.
                </p>
              </div> */}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {coverageAreas.map((area) => (
                <div
                  key={area}
                  className="bg-white/[0.07] border border-white/10 rounded-2xl px-5 py-5 flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-sand flex-shrink-0" />
                  <span className="text-white/85 text-sm font-bold">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-white border border-sand/30 rounded-[2rem] p-8 md:p-10 shadow-editorial">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="mt-5 font-playfair text-3xl md:text-4xl font-black text-navy-deeper leading-tight">
                Route support made simple for parents.
              </h2>

              <div className="mt-10 space-y-7">
                {routeSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-5">
                    <div className="h-11 w-11 rounded-full bg-navy-deeper text-sand flex items-center justify-center font-playfair font-black flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl font-black text-navy-deeper mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-light text-sm leading-[1.8]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-deeper rounded-[2rem] p-8 md:p-10 text-white shadow-editorial">
              <SectionLabel>Parent Assurance</SectionLabel>
              <h2 className="mt-5 font-playfair text-3xl md:text-4xl font-black text-white leading-tight">
                Safety checks that families can count on.
              </h2>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {assurances.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <CheckCircle2 className="h-5 w-5 text-sand flex-shrink-0 mt-0.5" />
                    <span className="text-white/75 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 md:pb-20 bg-off-white">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white border border-sand/30 shadow-editorial">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deeper via-navy-deeper/95 to-crimson-deeper/90" />
          <Image
            src="/assets/transport-facility/camera.webp"
            alt="Seedling transport safety support"
            fill
            sizes="100vw"
            className="object-cover opacity-15"
          />
          <div className="relative z-10 px-7 py-12 md:p-14 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <span className="text-sand text-[10px] font-black uppercase tracking-[0.35em]">
                Transport Assistance
              </span>
              <h2 className="mt-5 font-playfair text-3xl md:text-5xl font-black text-white leading-tight">
                Need help finding the right school bus route?
              </h2>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-[1.8] max-w-2xl">
                Share your locality with our team and we will guide you with available route options, pickup points, and transport fee details for your preferred Seedling campus.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="tel:+919587772837"
                className="inline-flex items-center justify-center gap-3 bg-sand text-navy-deeper hover:bg-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300"
              >
                <PhoneCall className="h-4 w-4" />
                +91 95877 72837
              </a>
              {/* <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-3 border border-white/25 text-white hover:bg-white hover:text-navy-deeper px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300"
              >
                Admissions Enquiry
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
