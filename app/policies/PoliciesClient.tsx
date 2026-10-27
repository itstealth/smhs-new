"use client";

import { motion } from "framer-motion";
import { Shield, Mail, Globe, FileText, Lock, Users, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// The CMS stores the icon as a string -- lucide components can't be
// serialised over JSON, so this is the lookup the task brief calls for.
// Shield is the fallback for an unknown/missing name.
const ICONS: Record<string, LucideIcon> = { Shield, Mail, Globe, FileText, Lock, Users, AlertCircle };

export type PolicySection = {
  title: string;
  icon: string;
  content: string;
  isLast?: boolean;
};

export default function PoliciesClient({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="pt-16 pb-10 md:pt-20 md:pb-12 bg-off-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-neutral-600 leading-relaxed text-lg font-dm">
            This Privacy Policy describes how Seedling School collects, uses, and safeguards your information when you use our digital services.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = ICONS[section.icon] ?? Shield;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className={`bg-white rounded-2xl shadow-md overflow-hidden border ${section.isLast ? 'border-crimson/20 bg-crimson/5' : 'border-navy/10'}`}
              >
                <div className="flex items-center gap-4 px-6 py-5 bg-linear-to-r from-navy/5 to-transparent border-b border-neutral-100">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.isLast ? 'bg-crimson text-white' : 'bg-navy text-white'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-navy">{section.title}</h2>
                </div>
                <div className="px-6 py-5">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-neutral-600 leading-relaxed font-dm mb-3 last:mb-0 whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
