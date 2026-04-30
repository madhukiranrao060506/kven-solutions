import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { VERTICALS, PROJECTS } from "@/data/site";

export const Route = createFileRoute("/services/$vertical")({
  loader: ({ params }) => {
    const v = VERTICALS.find((x) => x.slug === params.vertical);
    if (!v) throw notFound();
    return { vertical: v };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.vertical.title} — Kven Solutions` },
          { name: "description", content: loaderData.vertical.description },
          { property: "og:title", content: `${loaderData.vertical.title} — Kven Solutions` },
          { property: "og:description", content: loaderData.vertical.tagline },
          { property: "og:image", content: loaderData.vertical.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="pt-40 px-6 lg:px-10 max-w-[1440px] mx-auto">
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/services" className="text-primary mt-4 inline-block">View all services</Link>
      </div>
    </SiteShell>
  ),
  component: VerticalPage,
});

function VerticalPage() {
  const { vertical } = Route.useLoaderData();
  const related = PROJECTS.filter((p) => p.category === vertical.id).slice(0, 3);

  return (
    <SiteShell>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={vertical.image} alt={vertical.title} className="absolute inset-0 h-full w-full object-cover ken-burns" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="absolute inset-0 flex items-end pb-16 px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px] w-full">
            <Reveal>
              <Eyebrow>Service</Eyebrow>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-3xl leading-[1.05]">
                {vertical.title}
              </h1>
              <p className="text-xl text-muted-foreground mt-4 italic font-display">{vertical.tagline}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              {vertical.description}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Capabilities</div>
            <ul className="space-y-3">
              {vertical.highlights.map((h: string) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" /> {h}
                </li>
              ))}
            </ul>
            <Link to="/rfq" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 mt-8 text-sm rounded-sm shadow-gold hover:bg-gold-soft transition-colors">
              Brief us on a project <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 px-6 lg:px-10 bg-charcoal/30">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <Eyebrow>Related work</Eyebrow>
              <h2 className="font-display text-4xl sm:text-5xl mt-4">Recent {vertical.title.toLowerCase()} projects.</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5 mt-12">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link to="/portfolio" className="block relative aspect-[4/5] rounded-sm overflow-hidden group">
                    <img src={p.cover} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-display text-2xl">{p.title}</h3>
                      <div className="text-xs text-muted-foreground mt-1">{p.location} · {p.year}</div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
