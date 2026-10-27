"use client";

import Image from "next/image";
import {
  Bus,
  Camera,
  CheckCircle2,
  Clock,
  ShieldCheck,
  UsersRound,
  PhoneCall,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// The CMS stores each safety feature's icon as a string (page_content
// data.safetyFeatures[].icon) -- lucide components can't be serialised over
// JSON. Bus is the fallback for an unknown/missing name (see
// EventsClient.tsx for the same pattern).
const ICONS: Record<string, LucideIcon> = { Bus, Camera, ShieldCheck, UsersRound };

export type HeroStat = { value: string; label: string };
export type SafetyFeature = { title: string; description: string; icon: string; image: string };
export type RouteStep = { title: string; description: string };

// coverageAreas is CMS-driven now: public.transport_routes rows filtered to
// only the ones carrying custom.transportFacilityOrder (see page.tsx) -- the
// same collection also backs admissions/transport/page.tsx's route cards
// (which read area/zones/pickupTime instead, via
// custom.admissionsTransportOrder) so no duplicate rows are created for the
// same real-world routes/areas.
export type CmsTransportRoute = {
  id: string;
  area: string;
  custom: { transportFacilityOrder?: number | null; [key: string]: unknown };
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-crimson font-dm">
      <span className="h-px w-8 bg-crimson" />
      {children}
    </span>
  );
}

export default function TransportFacilityClient({
  safetyFeatures,
  routeSteps,
  assurances,
  routes,
}: {
  safetyFeatures: SafetyFeature[];
  routeSteps: RouteStep[];
  assurances: string[];
  routes: CmsTransportRoute[];
}) {
  const coverageAreas = routes
    .filter((r) => r.custom?.transportFacilityOrder != null)
    .sort((a, b) => (a.custom.transportFacilityOrder as number) - (b.custom.transportFacilityOrder as number))
    .map((r) => r.area);

  return (
    <>
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
              const Icon = ICONS[feature.icon] ?? Bus;

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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
