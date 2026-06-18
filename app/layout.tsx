import type { Metadata } from "next";
import { Geist_Mono, DM_Serif_Text, DM_Sans } from "next/font/google";
import Script from "next/script";
import ShellWrapper from "@/components/layout/ShellWrapper";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSerif = DM_Serif_Text({ variable: "--font-serif", subsets: ["latin"], weight: ["400"] });
const dmSans = DM_Sans({ variable: "--font-dm", subsets: ["latin"], weight: ["300","400","500","600","700"] });

export const metadata: Metadata = {
  title: "Seedling Modern High School | Best CBSE School in Jaipur",
  description: "Seedling Modern High School (SMHS) is a premier CBSE school in Jaipur offering world-class education from Nursery to Senior Secondary.",
  verification: {
    google: "LzKlHJhPde7RhG9zSVx4gbkk7ZuWP0GnfhcHhcK1Qe0",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${dmSerif.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
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
