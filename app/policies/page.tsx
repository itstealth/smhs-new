"use client";

import { motion } from "framer-motion";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { Shield, Mail, Globe, FileText, Lock, Users, AlertCircle } from "lucide-react";

const sections = [
  {
    title: "Privacy Policy of Seedling School",
    icon: Shield,
    content: `This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy is managed with the help of standard privacy policy frameworks.\n\nWe use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.\n\nThis Privacy Policy applies to this website (smhs.seedlingschools.com), the school mobile application, and other digital services operated by Seedling School.`
  },
  {
    title: "Usage Device ID for Mobile App",
    icon: AlertCircle,
    content: `Our app may collect device IDs for the following purposes:\n\n• Analytics: To understand app usage and improve performance\n• App Functionality: To ensure smooth operation of core features\n• Security: To prevent misuse, fraud, and illegal activities\n\nWe may share this data with trusted third-party partners only for the purposes mentioned above. All data is encrypted in transit to ensure user privacy and security.\n\nUsers can request deletion of their data by contacting us at the email provided below.`
  },
  {
    title: "Usage of Location",
    icon: Users,
    content: `Our school ERP solutions may include real-time location tracking, particularly for school transportation services. By enabling background location services, the app provides accurate updates of school bus locations, helping enhance student safety and operational efficiency.\n\nLocation data is used strictly for safety, tracking, and operational purposes and is not shared for commercial use.`
  },
  {
    title: "Usage Data",
    icon: FileText,
    content: `We may collect information that your browser or device sends whenever you access our Service ("Usage Data"). This may include:\n\n• Internet Protocol (IP) address\n• Browser type and version\n• Pages visited within the app or website\n• Time and date of access\n• Time spent on specific features\n• Mobile device type, operating system, and unique device identifiers`
  },
  {
    title: "Tracking & Cookies Data",
    icon: Lock,
    content: `We use cookies and similar tracking technologies to track activity on our Service and store certain information.\n\nCookies are small data files containing anonymous identifiers sent to your device. Tracking technologies such as beacons, tags, and scripts are used to improve and analyze our Service.\n\nYou may choose to refuse cookies through your browser settings; however, some portions of the Service may not function properly.\n\nWe use:\n• Session Cookies to operate the Service\n• Preference Cookies to remember user settings\n• Security Cookies to enhance protection`
  },
  {
    title: "Use of Data",
    icon: Users,
    content: `Seedling School uses collected data for the following purposes:\n\n• To provide and maintain the Service\n• To notify users about updates or changes\n• To enable interactive features\n• To provide customer support\n• To improve app functionality and user experience\n• To monitor usage and performance\n• To detect, prevent, and resolve technical issues`
  },
  {
    title: "Transfer of Data",
    icon: Globe,
    content: `Your information, including Personal Data, may be transferred to and maintained on servers located outside your state or country, where data protection laws may differ.\n\nIf you are located outside India and choose to provide information, you consent to the transfer and processing of your data in India.\n\nSeedling School ensures that adequate security measures are in place to protect your data during such transfers.`
  },
  {
    title: "Disclosure of Data",
    icon: Shield,
    content: `Seedling School may disclose your Personal Data if required to:\n\n• Comply with legal obligations\n• Protect the rights or property of the school\n• Prevent or investigate possible wrongdoing\n• Ensure the safety of users or the public\n• Protect against legal liability`
  },
  {
    title: "Security of Data",
    icon: Lock,
    content: `The security of your data is important to us. While we use commercially acceptable measures to protect Personal Data, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.`
  },
  {
    title: "Service Providers",
    icon: Users,
    content: `We may engage third-party companies or individuals ("Service Providers") to:\n\n• Facilitate the Service\n• Provide services on our behalf\n• Assist in analyzing Service usage\n\nThese third parties are granted access to Personal Data only to perform assigned tasks and are contractually obligated to protect confidentiality.`
  },
  {
    title: "Analytics",
    icon: FileText,
    content: `We may use third-party analytics tools to monitor and analyze Service usage.\n\nGoogle Analytics is a web analytics service provided by Google Inc. Google uses collected data to track and monitor usage of the Service. This information may be shared with other Google services.\n\nFor more details, please review Google's Privacy Policy at: https://policies.google.com/privacy`
  },
  {
    title: "Links to Other Sites",
    icon: Globe,
    content: `Our Service may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites. Users are advised to review the privacy policies of any external sites they visit.`
  },
  {
    title: "Changes to This Privacy Policy",
    icon: AlertCircle,
    content: `We may update this Privacy Policy from time to time. Updates will be posted on this page and, where appropriate, notified via email or app notifications.\n\nChanges become effective once published.`
  },
  {
    title: "Contact Us",
    icon: Mail,
    content: `If you have any questions regarding this Privacy Policy, please contact us:\n\nSeedling Modern High School\nAshok Marg, Mahaveer Nagar-II, Durgapura, Jaipur 302018\n\nEmail: smhsjaipur@jnujaipur.ac.in\n\nWebsite: https://seedlingschools.com/\n\nLandline: 0141-3624000\nMobile: +91 95877 72837`,
    isLast: true
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-off-white">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/privacy.webp"
        objectPosition="center 60%"
        title="Privacy Policy"
        badge="Privacy & Safety"
        breadcrumbs={[{ label: "Privacy Policy" }]}
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
              This Privacy Policy describes how Seedling School collects, uses, and safeguards your information when you use our digital services.
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