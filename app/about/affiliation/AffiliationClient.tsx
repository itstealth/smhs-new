"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { CheckCircle2, ShieldCheck, Globe, Award, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// icon is stored as a string in the CMS (page_content.data[].icon) --
// lucide components can't be serialised over JSON. ShieldCheck is the
// fallback for an unknown/missing name, same pattern as EventsClient.tsx.
const ICONS: Record<string, LucideIcon> = { ShieldCheck, Globe };

export type Affiliation = {
  name: string;
  schools: string;
  description: string;
  acronym: string;
  icon: string;
  color: string;
};

export default function AffiliationClient({ affiliations }: { affiliations: Affiliation[] }) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-40 relative overflow-hidden">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Affiliations & Certifications"
        badge="Globally Recognized"
        breadcrumbs={[{ label: "Affiliations" }]}
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Certified Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-950 leading-[0.9] mb-8">
              Globally <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-secondary italic font-serif">Recognized.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed">
              At Seedling, we uphold the highest academic standards through strategic partnerships with the world&apos;s leading educational boards.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {affiliations.map((item, i) => (
            <motion.div
              key={item.acronym}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative h-full bg-neutral-50/50 backdrop-blur-xl rounded-[4rem] p-16 border border-black/5 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/2 hover:-translate-y-2 overflow-hidden flex flex-col group">

                {/* Decorative Icon Background */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-linear-to-br ${item.color} opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity`} />

                <div className="flex justify-between items-start mb-12">
                  <div className={`w-24 h-24 rounded-3xl bg-linear-to-br ${item.color} text-white flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform`}>
                    {(() => {
                      const Icon = ICONS[item.icon] ?? ShieldCheck;
                      return <Icon className="w-12 h-12" />;
                    })()}
                  </div>
                  <span className="text-5xl font-black text-black/2 tracking-tighter">
                    {item.acronym}
                  </span>
                </div>

                <h2 className="text-4xl font-black text-neutral-950 mb-6 tracking-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h2>

                <div className="flex items-center gap-2 mb-8 text-secondary">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.schools}</span>
                </div>

                <p className="text-xl text-neutral-600 leading-relaxed font-light flex-1">
                  {item.description}
                </p>

                <div className="mt-12 pt-10 border-t border-black/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Accreditation Status</span>
                    <span className="text-lg font-black text-neutral-950 tracking-tight">Active & Sustained</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 cursor-pointer">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
