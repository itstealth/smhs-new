"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { ShieldCheck, MapPin, PhoneCall, Clock, Navigation, CheckCircle2 } from "lucide-react";

// routes is CMS-driven now: public.transport_routes rows filtered to only
// the ones carrying custom.admissionsTransportOrder (see page.tsx) -- the
// same collection also backs transport-facility/page.tsx's coverage grid
// (which reads every row's `area` instead, via custom.transportFacilityOrder)
// so no duplicate rows are created for the same real-world routes.
export type CmsTransportRoute = {
  id: string;
  area: string;
  zones: string[];
  pickupTime: string | null;
  custom: { admissionsTransportOrder?: number | null; [key: string]: unknown };
};

type ViewRoute = {
  area: string;
  zones: string[];
  pickup: string;
};

function toViewRoute(route: CmsTransportRoute): ViewRoute {
  return {
    area: route.area,
    zones: route.zones,
    pickup: route.pickupTime ?? "",
  };
}

export default function AdmissionTransportClient({
  routes: cmsRoutes,
  features,
}: {
  routes: CmsTransportRoute[];
  features: string[];
}) {
  const routes = cmsRoutes
    .filter((r) => r.custom?.admissionsTransportOrder != null)
    .sort((a, b) => (a.custom.admissionsTransportOrder as number) - (b.custom.admissionsTransportOrder as number))
    .map(toViewRoute);

  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Transport Facility"
        badge="Safe & Reliable"
        breadcrumbs={[{ label: "Transport" }]}
      />

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-label mb-8 block uppercase">Safe & Secure Transit</span>
            <h2 className="text-heading text-4xl md:text-5xl mb-12">The Seedling <br /> Fleet.</h2>
            <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-10">
              Our transportation system is managed with the highest standards of safety. Every bus is equipped with GPS tracking and is manned by trained staff.
            </p>
            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-neutral-900 font-black tracking-tight">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[4rem] overflow-hidden shadow-editorial"
          >
            <img
              src="/assets/PRIMARY OUTING/2.webp"
              alt="School Bus"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </motion.div>
        </div>

        {/* Coverage Grid */}
        <div className="text-center mb-24">
          <span className="text-label mb-6 block uppercase">Extensive Network</span>
          <h2 className="text-heading text-4xl md:text-5xl">City Coverage.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-editorial border border-black/5 hover:border-primary/20 transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-primary shadow-inner">
                  <MapPin className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">{route.pickup}</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-neutral-950 mb-6 tracking-tight">{route.area}</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {route.zones.map((zone, zi) => (
                  <span key={zi} className="px-4 py-2 rounded-xl bg-neutral-50 text-neutral-500 text-xs font-black uppercase tracking-tight border border-black/5">
                    {zone}
                  </span>
                ))}
              </div>
              <div className="pt-8 border-t border-black/5 flex items-center gap-3 text-primary font-black text-sm group cursor-pointer hover:text-secondary transition-colors">
                <Navigation className="w-4 h-4" />
                View Full Route Map
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transport Support */}
      <section className="pt-16 pb-10 bg-neutral-950 text-white rounded-[5rem] mx-4 md:mx-8 mb-20 overflow-hidden relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-10 text-center">
          <ShieldCheck className="w-20 h-20 text-secondary mx-auto mb-12 drop-shadow-2xl" />
          <h2 className="text-heading text-white text-4xl md:text-5xl mb-12 italic font-serif leading-tight">
            Transport <br /> <span className="text-secondary tracking-tighter">Assistance.</span>
          </h2>
          <p className="text-white/60 text-xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Need details for a specific lane or timing? Our transport helpdesk is available from 8 AM to 6 PM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="tel:+919587772837"
              className="h-24 px-12 bg-white text-neutral-950 rounded-full font-black text-xl flex items-center gap-4 hover:scale-105 transition-all shadow-editorial group"
            >
              <PhoneCall className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
              Call Helpdesk
            </a>
            <span className="text-white/40 text-sm font-black uppercase tracking-widest">Available for all branches</span>
          </div>
        </div>
      </section>
    </main>
  );
}
