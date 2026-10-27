"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { EnquiryProvider } from "@/components/EnquiryContext";
import FloatingButtons from "@/components/FloatingButtons";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isErpLogin = pathname.startsWith("/erp-login");
  const isAdmin = pathname.startsWith("/admin");

  return (
    <EnquiryProvider>
      {!isHome && !isAdmin && <Header />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isHome && !isErpLogin && !isAdmin && <Footer />}
      {!isAdmin && <FloatingButtons />}
    </EnquiryProvider>
  );
}
