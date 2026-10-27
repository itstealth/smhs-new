"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { ClipboardCheck, UserCheck, CalendarClock, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

// The CMS stores each step's icon as a string (page_content data.steps[].icon)
// -- lucide components can't be serialised over JSON. ClipboardCheck is the
// fallback for an unknown/missing name (see EventsClient.tsx for the same
// pattern).
const ICONS: Record<string, LucideIcon> = { ClipboardCheck, UserCheck, CalendarClock, CreditCard };

export type ProcessStep = {
  icon: string;
  title: string;
  desc: string;
  details: string[];
};

export default function AdmissionProcessClient({
  steps,
  documents,
}: {
  steps: ProcessStep[];
  documents: string[];
}) {
  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Admission Process"
        badge="How to Apply"
        breadcrumbs={[{ label: "Admission Process" }]}
      />

      {/* Steps Section */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <span className="text-label mb-6 block uppercase">Step-by-Step Guide</span>
          <h2 className="text-heading text-4xl md:text-5xl">Joining Seedling.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ClipboardCheck;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white p-12 rounded-[3.5rem] shadow-editorial border border-black/5 hover:border-primary/20 transition-all duration-700"
              >
                <div className="absolute top-0 right-0 p-10 text-7xl font-black text-black/[0.03] select-none font-serif italic group-hover:text-primary/[0.05] transition-colors">
                  0{i + 1}
                </div>

                <div className="w-20 h-20 rounded-3xl bg-neutral-50 flex items-center justify-center text-primary mb-10 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Icon className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-black text-neutral-950 mb-6 tracking-tight">{step.title}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed mb-8">
                  {step.desc}
                </p>

                <ul className="space-y-4">
                  {step.details.map((detail, di) => (
                    <li key={di} className="flex items-center gap-3 text-sm font-black text-neutral-900">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="pt-16 pb-10 bg-white rounded-[5rem] mx-4 md:mx-8 shadow-editorial">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-label mb-8 block uppercase">Essential Paperwork</span>
              <h2 className="text-heading text-4xl md:text-5xl mb-12">Required <br /> Documents.</h2>
              <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-10">
                Please ensure you have the following documents ready for the admission process to ensure a smooth transition.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex h-20 px-10 bg-neutral-950 text-white rounded-full items-center font-black hover:bg-primary transition-all group"
              >
                Inquire for Assistance
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {documents.map((doc, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-8 rounded-3xl bg-neutral-50 border border-black/5 flex items-center gap-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <ClipboardCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="font-black text-neutral-900 text-sm tracking-tight">{doc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-16 pb-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-heading text-4xl md:text-5xl mb-16">
            Ready to <br /> <span className="text-primary tracking-tighter">Begin?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="h-24 px-16 bg-primary text-white rounded-full font-black text-2xl shadow-editorial hover:bg-neutral-950 transition-all group">
              Register Online
              <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/contact-us"
              className="text-xl font-black text-neutral-950 hover:text-primary transition-colors border-b-2 border-primary/20 hover:border-primary pb-2"
            >
              Visit Campus First
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
