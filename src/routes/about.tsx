import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kven Solutions" },
      { name: "description", content: "Founded in 2021, Kven Solutions is a multi-disciplinary firm of engineers, designers, and producers." },
      { property: "og:title", content: "About — Kven Solutions" },
      { property: "og:description", content: "A studio of engineers, designers, and producers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-4xl leading-[1.05]">
              A studio of <span className="italic text-gradient-gold">engineers, designers, and producers.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-lg leading-relaxed">
              Founded in 2008, Kven Solutions is a multi-disciplinary firm built around a single conviction: that the boundary between structure and experience is artificial.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-6">
              We deliver civil works, interiors, events, and supplies under one operational system — so a single client engagement can move from blueprint to opening night without changing partners.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary mt-8 group">
              View our work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-charcoal/30">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Values</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 max-w-2xl">Three things we will not negotiate.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { n: "01", t: "Senior accountability", b: "Every engagement is led by a partner who stays through handover." },
              { n: "02", t: "Disciplined craft", b: "We measure success by the things you don't have to think about." },
              { n: "03", t: "Quiet excellence", b: "We do the work; the work speaks." },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i * 0.06}>
                <div className="p-8 border-gold-hairline rounded-sm h-full">
                  <div className="font-display text-5xl text-gradient-gold">{v.n}</div>
                  <h3 className="font-display text-2xl mt-4">{v.t}</h3>
                  <p className="text-sm text-muted-foreground mt-3">{v.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
