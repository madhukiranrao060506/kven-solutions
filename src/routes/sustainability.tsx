import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Recycle, Wind, Droplets, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability Ledger — Kven Solutions" },
      { name: "description", content: "Our quarterly Green Score, embodied-carbon tracking, and waste reduction performance across active projects." },
      { property: "og:title", content: "Sustainability Ledger — Kven Solutions" },
      { property: "og:description", content: "Greener by design, by audit, by default." },
    ],
  }),
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Sustainability</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-4xl leading-[1.05]">
              The <span className="italic text-gradient-gold">Green Score,</span> published quarterly.
            </h1>
            <p className="text-muted-foreground mt-8 max-w-xl text-lg">
              Every active project is audited against our internal Green Standard — embodied carbon, recycled content, and on-site waste — and the results are published.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 gap-8">
          <Reveal className="lg:col-span-5">
            <div className="glass-strong rounded-sm p-12 text-center aspect-square flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at center, var(--gold), transparent 70%)" }} />
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground relative">Current Score</div>
              <div className="font-display text-9xl text-gradient-gold mt-4 relative">A+</div>
              <div className="text-sm text-muted-foreground mt-4 relative">Q2 2026 audit cycle</div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Recycle, label: "Recycled inputs", value: "62%", desc: "Across all material orders" },
              { icon: Wind, label: "Carbon vs benchmark", value: "-38%", desc: "Embodied CO₂ per m²" },
              { icon: Droplets, label: "Water reuse", value: "44%", desc: "Site water reclaimed" },
              { icon: Leaf, label: "Site waste vs benchmark", value: "-41%", desc: "Diverted from landfill" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="glass rounded-sm p-8 h-full">
                  <s.icon className="w-6 h-6 text-primary" />
                  <div className="font-display text-4xl mt-4 text-gradient-gold">{s.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">{s.label}</div>
                  <div className="text-sm text-muted-foreground mt-2">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-charcoal/30">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">Initiatives in motion.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Low-carbon concrete", body: "Pilot of GGBS-blended mixes across two civil sites — 28% CO₂ reduction." },
              { title: "Reclaimed materials program", body: "Partnerships with three regional reclaimers feeding our finishing inventory." },
              { title: "Solar-powered sites", body: "Diesel generators replaced with hybrid solar + battery on four active sites." },
            ].map((x, i) => (
              <Reveal key={x.title} delay={i * 0.05}>
                <div className="border-gold-hairline rounded-sm p-8 h-full">
                  <Eyebrow>Initiative</Eyebrow>
                  <h3 className="font-display text-2xl mt-4">{x.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary mt-12 group">
              Discuss a sustainable project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
