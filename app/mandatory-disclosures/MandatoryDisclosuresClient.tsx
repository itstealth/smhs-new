"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { FileText, Download } from "lucide-react";

// ─── CMS Types (see page.tsx -- page_content /mandatory-disclosures) ───────────

type DisclosureDetail = { label: string; value: string };
type DisclosurePdfItem = { label: string; pdf: string };

export type CmsMandatoryItem = {
  section: string;
  field: string;
  value?: string;
  pdf?: string;
  details?: DisclosureDetail[];
  isPdfList?: boolean;
  pdfItems?: DisclosurePdfItem[];
};

function DetailValue({ item }: { item: CmsMandatoryItem }) {
  if (item.isPdfList) {
    return (
      <ul className="space-y-2.5">
        {item.pdfItems?.map((pdfItem, i) => (
          <li key={i}>
            <a href={pdfItem.pdf} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-start gap-2 text-sm text-navy hover:text-crimson transition-colors group">
              <FileText className="w-4 h-4 flex-shrink-0 mt-0.5 text-navy/40 group-hover:text-crimson transition-colors" />
              <span className="underline underline-offset-2 decoration-navy/20 group-hover:decoration-crimson leading-snug">{pdfItem.label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  if (item.details) {
    return (
      <div className="space-y-1.5">
        {item.details.map((d, i) => (
          <div key={i} className="flex flex-wrap gap-x-2 items-baseline">
            <span className="text-xs text-neutral-400 font-medium">{d.label}:</span>
            <span className="text-sm font-semibold text-neutral-800">{d.value}</span>
          </div>
        ))}
      </div>
    );
  }
  if (item.pdf) {
    return (
      <a href={item.pdf} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-navy-dark transition-colors">
        <Download className="w-3.5 h-3.5" />
        View PDF
      </a>
    );
  }
  return <span className="text-sm font-semibold text-neutral-800">{item.value}</span>;
}

export default function MandatoryDisclosuresClient({ mandatoryData }: { mandatoryData: CmsMandatoryItem[] }) {
  return (
    <div className="bg-off-white">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/smhs_about.webp"
        title="Mandatory Disclosures"
        badge="CBSE Compliance"
        breadcrumbs={[{ label: "Disclosures" }]}
      />

      <section className="pt-10 pb-10 md:pt-16 md:pb-12 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* ── Mobile: card stack ── */}
          <div className="md:hidden space-y-3">
            {mandatoryData.map((item, index) => (
              <motion.div
                key={item.section}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-navy/[0.04] border-b border-navy/8">
                  <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-navy">{item.section}</span>
                  </div>
                  <span className="font-semibold text-navy text-sm leading-snug">{item.field}</span>
                </div>
                <div className="px-4 py-4">
                  <DetailValue item={item} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Desktop: table ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block bg-white rounded-2xl shadow-xl shadow-navy/5 overflow-hidden border border-navy/10"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-navy to-navy-dark">
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white/90 w-16">S.No.</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white/90 w-64">Information</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white/90">Details</th>
                </tr>
              </thead>
              <tbody>
                {mandatoryData.map((item, index) => (
                  <motion.tr
                    key={item.section}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-neutral-100 hover:bg-navy/[0.02] transition-colors"
                  >
                    <td className="px-6 py-5 align-top">
                      <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
                        <span className="text-sm font-black text-navy">{item.section}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className="font-semibold text-neutral-800 text-sm leading-snug">{item.field}</span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <DetailValue item={item} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
