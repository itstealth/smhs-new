"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { Info, Download, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

const feeData = [
  { grade: "Play Group / Nursery", admission: "₹15,000", composite: "₹18,500", frequency: "Quarterly" },
  { grade: "Prep / KG", admission: "₹15,000", composite: "₹20,000", frequency: "Quarterly" },
  { grade: "Grade I - V", admission: "₹20,000", composite: "₹24,500", frequency: "Quarterly" },
  { grade: "Grade VI - VIII", admission: "₹20,000", composite: "₹26,800", frequency: "Quarterly" },
  { grade: "Grade IX - X", admission: "₹25,000", composite: "₹29,500", frequency: "Quarterly" },
  { grade: "Grade XI - XII (Sci/Com/Hum)", admission: "₹25,000", composite: "₹32,000", frequency: "Quarterly" },
];

export default function FeeStructurePage() {
  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.jpg"
        title="Fee Structure"
        badge="Transparent Fees"
        breadcrumbs={[{ label: "Fee Structure" }]}
      />

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 mb-32 items-end">
          <div className="flex-1">
            <span className="text-label mb-8 block uppercase">Academic Session 2026-27</span>
            <h2 className="text-heading text-4xl md:text-5xl mb-12">Clarity in <br /> Investment.</h2>
            <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-xl">
              Our fee structure is designed to reflect the premium educational experience and world-class facilities provided at Seedling Schools.
            </p>
          </div>
          <div className="lg:w-[350px]">
            <button className="group flex items-center gap-6 p-8 bg-neutral-950 text-white rounded-[2.5rem] hover:bg-primary transition-all shadow-editorial w-full">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-50 block mb-1">PDF Document</span>
                <span className="text-xl font-black">Full Fee Policy</span>
              </div>
            </button>
          </div>
        </div>

        {/* Fee Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] overflow-hidden shadow-editorial border border-black/5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-950 text-white">
                  <th className="px-12 py-10 font-black text-sm uppercase tracking-widest">Grade Level</th>
                  <th className="px-12 py-10 font-black text-sm uppercase tracking-widest">One-time Admission</th>
                  <th className="px-12 py-10 font-black text-sm uppercase tracking-widest">Composite Fee</th>
                  <th className="px-12 py-10 font-black text-sm uppercase tracking-widest">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {feeData.map((row, i) => (
                  <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                    <td className="px-12 py-8 font-black text-neutral-950 tracking-tight text-lg">{row.grade}</td>
                    <td className="px-12 py-8 text-neutral-600 font-medium">{row.admission}</td>
                    <td className="px-12 py-8 font-black text-primary text-xl">{row.composite}</td>
                    <td className="px-12 py-8">
                      <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-wider">
                        {row.frequency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Important Notes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "No Hidden Costs", desc: "Our fee structure is comprehensive. There are no unexpected mid-term levies." },
            { icon: CreditCard, title: "Flexible Payment", desc: "Fees can be paid online via our ERP portal or at the school accounts office." },
            { icon: Info, title: "Sibling Discount", desc: "Special concessions are available for siblings enrolled in the same session." }
          ].map((note, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white border border-black/5 shadow-sm hover:shadow-editorial transition-all duration-700">
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-primary mb-8 shadow-inner">
                {(() => {
                  const Icon = note.icon;
                  return <Icon className="w-7 h-7" />;
                })()}
              </div>
              <h4 className="text-xl font-black text-neutral-950 mb-4 tracking-tight">{note.title}</h4>
              <p className="text-sm font-medium text-neutral-500 leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 text-center bg-neutral-950 rounded-t-[5rem] mx-4 md:mx-8 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-heading text-white text-4xl md:text-5xl mb-16 italic font-serif">
            Financial <br /> <span className="text-secondary tracking-tighter">Assistance.</span>
          </h2>
          <p className="text-white/60 text-xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Have specific questions about scholarships or payment plans? Our accounts team is ready to assist you.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex h-24 px-16 bg-white text-neutral-950 rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary hover:text-white transition-all group"
          >
            Speak to Accounts
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
