import type { Metadata } from "next";
import ApplyClient, { type CampusConfig } from "./ApplyClient";

export const metadata: Metadata = {
  title: "Registration / Admission | Seedling Modern High School",
  description:
    "Apply online for admission to Seedling Modern High School, Durgapura, Jaipur, and pay the registration fee securely.",
};

export const dynamic = "force-dynamic";

/** This campus. Fees and grades come from the group app, not from here. */
const SCHOOL_KEY = "smhs-cbse";

/**
 * The group app owns fees, grade lists and the payment gateway. This page only
 * renders the form in Seedling Public School's own layout — so the header and
 * footer are the site's real components, not a copy.
 */
const CONFIG_URL =
  process.env.GROUP_APP_URL ?? "http://localhost:3003";

async function loadCampus(): Promise<CampusConfig | null> {
  try {
    const res = await fetch(
      `${CONFIG_URL}/api/admissions/config?school=${SCHOOL_KEY}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.school as CampusConfig;
  } catch {
    return null;
  }
}

export default async function ApplyPage() {
  const campus = await loadCampus();

  if (!campus) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-serif text-3xl text-navy">
            Online admission is temporarily unavailable
          </h1>
          <p className="mt-4 text-text-light font-dm">
            Please try again shortly, or call the admission helpline on{" "}
            <a href="tel:+919587772837" className="text-crimson font-semibold">
              +91 95877 72837
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  return <ApplyClient campus={campus} />;
}
