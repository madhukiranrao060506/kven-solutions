import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { PROJECTS, type Project, type Vertical } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Kven Solutions" },
      { name: "description", content: "A curated selection of civil, interior, and event projects delivered by Kven Solutions." },
      { property: "og:title", content: "Portfolio — Kven Solutions" },
      { property: "og:description", content: "Selected work across structures, spaces, and experiences." },
    ],
  }),
  component: PortfolioPage,
});

const FILTERS: { id: Vertical | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil" },
  { id: "interior", label: "Interior" },
  { id: "events", label: "Events" },
];

function PortfolioPage() {
  const [filter, setFilter] = useState<Vertical | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const items = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);

  return (
    <SiteShell>
      <section className="pt-40 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-3xl leading-[1.05]">
              Built work, <span className="italic text-gradient-gold">curated.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-12">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-sm border transition-all",
                    filter === f.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1440px]">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <motion.button
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive(p)}
                  className="group relative overflow-hidden rounded-sm aspect-[4/5] text-left"
                >
                  <img src={p.cover} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.category}</div>
                    <h3 className="font-display text-2xl mt-2">{p.title}</h3>
                    <div className="text-xs text-muted-foreground mt-1">{p.location} · {p.year}</div>
                  </div>
                  <div className="absolute top-4 right-4 glass px-3 py-1 text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick view
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <QuickView project={active} onClose={() => setActive(null)} />
    </SiteShell>
  );
}

function QuickView({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-sm w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full bg-background/80 grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] bg-charcoal">
              <img src={project.gallery[idx]} alt="" className="absolute inset-0 h-full w-full object-cover" />
              {project.gallery.length > 1 && (
                <>
                  <button onClick={() => setIdx((i) => (i - 1 + project.gallery.length) % project.gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass grid place-items-center"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setIdx((i) => (i + 1) % project.gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass grid place-items-center"><ChevronRight className="w-4 h-4" /></button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.gallery.map((_, i) => (
                      <div key={i} className={cn("h-1 transition-all", i === idx ? "w-8 bg-primary" : "w-4 bg-white/40")} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-8 lg:p-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{project.category}</div>
              <h2 className="font-display text-3xl sm:text-4xl mt-2">{project.title}</h2>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-4">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {project.location}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {project.year}</span>
                <span className="flex items-center gap-2"><Ruler className="w-4 h-4 text-primary" /> {project.scale}</span>
              </div>
              <p className="text-base leading-relaxed mt-6 max-w-2xl">{project.summary}</p>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
                {project.specs.map((s) => (
                  <div key={s.label}>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</div>
                    <div className="font-display text-xl mt-1">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
