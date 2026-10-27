import HeroWrapper from "@/components/layout/HeroWrapper";
import { ArrowRight } from "lucide-react";
import { cmsFetch } from "@/lib/cms";
import EventsClient, { type CmsEvent } from "./EventsClient";

export default async function EventsPage() {
  const events = await cmsFetch<CmsEvent>("events");

  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/img107.webp"
        title="Events"
        badge="School Events"
        breadcrumbs={[{ label: "Events" }]}
      />

      <EventsClient events={events} />

      {/* Suggestion Section */}
      <section className="py-48 bg-white border-y border-black/5 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-label mb-8 block uppercase tracking-[0.3em]">Be Part of the Scene</span>
          <h2 className="text-heading text-6xl md:text-[8rem] mb-12">Host an <br /> <span className="text-primary tracking-tighter italic">Event.</span></h2>
          <p className="text-xl text-neutral-500 font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            Our campus spaces are available for collaborative educational events, seminars, and workshops that align with our mission.
          </p>
          <button className="inline-flex h-24 px-16 bg-neutral-950 text-white rounded-full items-center justify-center font-black text-2xl shadow-editorial hover:bg-primary transition-all group">
            Inquire for Venue
            <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
}
