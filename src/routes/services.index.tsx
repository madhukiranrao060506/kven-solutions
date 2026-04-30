import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { VERTICALS } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Kven Solutions" },
      { name: "description", content: "Civil Works, Interior Design, Event Management, and Contracts & Supplies — engineered to integrate." },
      { property: "og:title", content: "Services — Kven Solutions" },
      { property: "og:description", content: "Four disciplines, one standard of execution." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-4xl leading-[1.05]">
              Four disciplines.<br /><span className="italic text-gradient-gold">One accountable partner.</span>
            </h1>
            <p className="text-muted-foreground mt-8 max-w-xl text-lg">
              Each practice is led by senior specialists, but they share the same delivery system — so a multi-vertical engagement still has one project lead and one timeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1440px] space-y-6">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.05}>
              <Link
                to="/services/$vertical"
                params={{ vertical: v.slug }}
                className="group block relative overflow-hidden rounded-sm border-gold-hairline aspect-[16/7] md:aspect-[16/5]"
              >
                <img src={v.image} alt={v.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
                <div className="relative h-full flex flex-col justify-center p-10 lg:p-16 max-w-2xl">
                  <v.icon className="w-7 h-7 text-primary mb-4" />
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">{v.title}</h2>
                  <p className="text-muted-foreground mt-4 max-w-md">{v.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary mt-6 group-hover:gap-3 transition-all">
                    Explore {v.title} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
