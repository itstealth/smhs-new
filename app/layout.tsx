import type { Metadata } from "next";
import { Geist_Mono, DM_Serif_Text, DM_Sans } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import ShellWrapper from "@/components/layout/ShellWrapper";
import "./globals.css";
import LeadAttribution from "@/components/LeadAttribution";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
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
    <html lang="en" className={`${geistMono.variable} ${dmSerif.variable} ${dmSans.variable} relative h-full antialiased`}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS6FKS3S');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: `var npf_d='https://apply.seedlingschools.com';var npf_c='7260';var npf_m='1';var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://track.nopaperforms.com/js/track.js";document.body.appendChild(s);` }} />
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K12SSGBQDP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K12SSGBQDP');
          `}
        </Script>
        <ShellWrapper>{children}</ShellWrapper>
      </body>
    </html>
  );
}
