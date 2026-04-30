import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kven Solutions" },
      { name: "description", content: "Get in touch with Kven Solutions. Senior partner reply within one business day." },
      { property: "og:title", content: "Contact — Kven Solutions" },
      { property: "og:description", content: "Senior partner reply within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-20 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-3xl leading-[1.05]">
              Let's <span className="italic text-gradient-gold">talk.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="glass-strong rounded-sm p-10 lg:p-14">
              <h2 className="font-display text-3xl">Reach a partner directly.</h2>
              <div className="mt-10 space-y-6">
                <Item icon={Mail} label="Email" value="hello@kvensolutions.com" />
                <Item icon={Phone} label="Phone" value="+966 11 000 0000" />
                <Item icon={MapPin} label="Office" value={<>Tower 12, Olaya District<br />Riyadh, KSA</>} />
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">Have a defined scope?</p>
                <Link to="/rfq" className="inline-flex items-center gap-2 text-primary mt-3 group">
                  Open a Request for Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1400&q=80" alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

function Item({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 grid place-items-center rounded-sm border-gold-hairline text-primary"><Icon className="w-4 h-4" /></div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
        <div className="text-base mt-1">{value}</div>
      </div>
    </div>
  );
}
