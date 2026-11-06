import type { Metadata } from "next";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import ShellWrapper from "@/components/layout/ShellWrapper";
import "./globals.css";
import LeadAttribution from "@/components/LeadAttribution";
import EnquiryDialog from "@/components/EnquiryDialog";

const dmSerif = DM_Serif_Text({ variable: "--font-serif", subsets: ["latin"], weight: ["400"] });
const dmSans = DM_Sans({ variable: "--font-dm", subsets: ["latin"], weight: ["300","400","500","600","700"] });

const SITE_URL = "https://smhs.seedlingschools.com";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return {
    title: "Best CBSE School in Durgapura Jaipur | Seedling Modern High School",
    description: "Seedling Modern High School — top CBSE school in Durgapura, Mahaveer Nagar, Jaipur. 33+ years of excellence, 100% board results, English medium, Nursery to Class XII. Admissions open 2026.",
    verification: {
      google: "LzKlHJhPde7RhG9zSVx4gbkk7ZuWP0GnfhcHhcK1Qe0",
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: pathname,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} relative h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Script id="deferred-tracking" strategy="afterInteractive">
          {`(function(w,d){
            var loaded=false;
            var activityTimer;
            function loadTracking(){
              if(loaded)return;
              loaded=true;
              w.clearTimeout(activityTimer);
              ['pointerdown','keydown','touchstart'].forEach(function(type){w.removeEventListener(type,onActivity);});
              w.dataLayer=w.dataLayer||[];
              w.gtag=w.gtag||function(){w.dataLayer.push(arguments);};
              w.gtag('js',new Date());
              w.gtag('config','G-K12SSGBQDP');
              var first=d.getElementsByTagName('script')[0];
              var gtm=d.createElement('script');
              gtm.async=true;
              gtm.src='https://www.googletagmanager.com/gtm.js?id=GTM-MS6FKS3S';
              first.parentNode.insertBefore(gtm,first);
              var ga=d.createElement('script');
              ga.async=true;
              ga.src='https://www.googletagmanager.com/gtag/js?id=G-K12SSGBQDP';
              first.parentNode.insertBefore(ga,first);
              w.npf_d='https://apply.seedlingschools.com';
              w.npf_c='7260';
              w.npf_m='1';
              var tracker=d.createElement('script');
              tracker.async=true;
              tracker.src='https://track.nopaperforms.com/js/track.js';
              first.parentNode.insertBefore(tracker,first);
            }
            function onActivity(){
              w.clearTimeout(activityTimer);
              activityTimer=w.setTimeout(loadTracking,1500);
            }
            ['pointerdown','keydown','touchstart'].forEach(function(type){w.addEventListener(type,onActivity,{once:true,passive:true});});
            w.setTimeout(loadTracking,30000);
          })(window,document);`}
        </Script>
        <LeadAttribution />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MS6FKS3S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Seedling Modern High School",
              url: "https://smhs.seedlingschools.com",
              logo: "https://smhs.seedlingschools.com/logo.webp",
              email: ["smhsjaipur@jnujaipur.ac.in", "smhsadmissions@seedlingschools.com"],
              telephone: "+91-95877-72837",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ashok Marg, Mahaveer Nagar-II, Durgapura",
                addressLocality: "Jaipur",
                postalCode: "302018",
                addressRegion: "Rajasthan",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/SMHSJaipur/",
                "https://www.instagram.com/smhsjaipur/?hl=en",
                "https://www.youtube.com/channel/UCJndN6j3ObAl8G1jbiY0TtA",
              ],
            }),
          }}
        />
        <ShellWrapper>{children}</ShellWrapper>
        <EnquiryDialog />
      </body>
    </html>
  );
}
