"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { FileText, AlertTriangle, Link2, Scale, Shield, Globe } from "lucide-react";

const sections = [
  {
    title: "Terms and Conditions of Use",
    icon: FileText,
    content: `For the purpose of these Terms and Conditions, "School" refers to Seedling Group of Schools, an educational institution operating in Jaipur, Rajasthan, India, along with its associated campuses, management, and administration.\n\nBy accessing and using this website, you accept and agree to be bound by the following Terms and Conditions. If you do not agree with any part of these terms, you should discontinue use of this website immediately.`
  },
  {
    title: "Website Information Disclaimer",
    icon: AlertTriangle,
    content: `Seedling Group of Schools makes every effort to ensure that the information provided on this website is accurate and up to date. However, the School gives no warranty or guarantee regarding the accuracy, completeness, or suitability of the information for any specific purpose. The content available on this website does not constitute legal, professional, or educational advice.\n\nAll implied warranties and conditions are excluded to the fullest extent permitted by law. The School shall not be liable for any direct or indirect loss, damage, or inconvenience arising from the use of, or reliance upon, the information contained on this website, except in cases of death or personal injury caused by negligence.`
  },
  {
    title: "Third-Party Links",
    icon: Link2,
    content: `This website may contain links to third-party websites for convenience and informational purposes only. Seedling Group of Schools has no control over the content of such websites and accepts no responsibility or liability for their content, availability, or practices.`
  },
  {
    title: "Changes to Terms",
    icon: AlertTriangle,
    content: `The School reserves the right to modify, amend, update, or remove any part of these Terms and Conditions at any time without prior notice. By continuing to use the website, you agree to be bound by the current version of these terms. Users are advised to review this page periodically.`
  },
  {
    title: "Acceptable Use",
    icon: Shield,
    content: `You must not use this website or any of its interactive features to:\n\n• Commit or encourage unlawful activities\n• Misrepresent your identity or provide false information\n• Hack, attempt to hack, or interfere with the website or its systems\n• Store or misuse personal data obtained from the website\n• Upload, post, or transmit obscene, offensive, defamatory, or unlawful material\n• Introduce viruses, malware, or any harmful data that may damage the website or its systems`
  },
  {
    title: "Website Availability",
    icon: Globe,
    content: `While Seedling Group of Schools endeavors to keep the website accessible at all times, it reserves the right to suspend, restrict, or withdraw access to the website (in whole or in part) at any time without notice for operational, security, or administrative reasons.`
  },
  {
    title: "Disclaimer",
    icon: AlertTriangle,
    content: `Changes to Academic Information\n\nThe School strives to ensure that all academic, course, admission, facility, and fee-related information published on the website is accurate at the time of publication. However, changes may become necessary due to academic, regulatory, staffing, or operational requirements. The School will make reasonable efforts to inform stakeholders of any significant changes. Users are advised to regularly check the website or contact the School directly for the latest information.`
  },
  {
    title: "No Liability to Parents or Third Parties",
    icon: Shield,
    content: `Any dealings or communications between Seedling Group of Schools and students or prospective students do not create a legal or contractual relationship with parents, guardians, sponsors, or other third parties. Use of the online prospectus and website content is subject to these Terms and Conditions.`
  },
  {
    title: "Copyright",
    icon: FileText,
    content: `All content on this website, including text, images, logos, and design, is protected by copyright and other intellectual property laws. Content may be viewed, printed, or downloaded solely for personal and non-commercial use. No material may be copied, modified, reproduced, published, or distributed without prior written permission from Seedling Group of Schools.\n\nThe name, logo, and trademarks of Seedling Group of Schools may not be used without express written authorization from the School.`
  },
  {
    title: "Complaints",
    icon: AlertTriangle,
    content: `Any complaints regarding material published on the School's website or references to the School on external websites will be reviewed and addressed as promptly as reasonably possible.`
  },
  {
    title: "Governing Law and Jurisdiction",
    icon: Scale,
    content: `These Terms and Conditions constitute the entire agreement regarding the use of this website. They shall be governed by and interpreted in accordance with the laws of India. Users submit to the non-exclusive jurisdiction of the courts of India.`,
    isLast: true
  }
];

export default function TermsConditionsPage() {
  return (
    <div className="bg-off-white">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.jpg"
        title="Terms & Conditions"
        badge="Legal"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      {/* Content */}
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
              Please read these Terms and Conditions carefully before using this website. By using our website, you agree to be bound by these terms.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
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
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-navy">{section.title}</h2>
                </div>
                <div className="px-6 py-5">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-neutral-600 leading-relaxed font-dm mb-3 last:mb-0 whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}