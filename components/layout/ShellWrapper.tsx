import { headers } from "next/headers";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SiteHeader from "@/components/Header/SiteHeader";

export default async function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "/";
  const isHome = pathname === "/";
  const isErpLogin = pathname.startsWith("/erp-login");
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isHome && !isAdmin && <SiteHeader pathname={pathname} />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isHome && !isErpLogin && !isAdmin && <Footer />}
      {!isAdmin && <FloatingButtons />}
    </>
  );
}
