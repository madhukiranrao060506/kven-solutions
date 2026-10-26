import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, Quote, Compass, Hammer, Building2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { HERO_FRAMES, TESTIMONIALS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ImpactCounters />
      <ProcessTimeline />
      <Testimonials />
      <CTABand />
    </SiteShell>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % HERO_FRAMES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {HERO_FRAMES.map((f, i) => (
        <AnimatePresence key={f.src} mode="sync">
          {active === i && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={f.src}
                alt={f.label}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-10 flex flex-col justify-end pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl"
        >
          <Eyebrow>Kven Solutions</Eyebrow>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mt-6 leading-[1.02]">
            Building the<br />
            <span className="italic text-gradient-gold">Foundations</span> of Excellence.
          </h1>
          <p className="mt-8 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            A multi-disciplinary firm engineering structures, designing spaces, and producing experiences for institutions that refuse compromise.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-gold-soft transition-all rounded-sm shadow-gold"
            >
              Explore Portfolio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/rfq"
              className="inline-flex items-center gap-3 border-gold-hairline px-7 py-4 text-sm font-medium hover:bg-primary/10 transition-colors rounded-sm"
            >
              Request a Quote
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-6 lg:left-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <ArrowDown className="w-3.5 h-3.5 text-primary" />
          Scroll to explore
        </div>

        <div className="absolute bottom-10 right-6 lg:right-10 flex gap-2">
          {HERO_FRAMES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start: number | null = null;
        const dur = 1800;
        const step = (t: number) => {
          if (start == null) start = t;
          const p = Math.min((t - start) / dur, 1);
          setVal(Math.floor(p * to * (2 - p)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function ImpactCounters() {
  const stats = [
    { value: 300, suffix: "+", label: "Projects Completed" },
    { value: 10000, suffix: "+", label: "Material Supplied" },
    { value: 60, suffix: "+", label: "Events Produced" },
    { value: 2021, suffix: "", label: "Est. Year" },
  ];
  return (
    <section className="py-24 px-6 lg:px-10 border-y border-border">
      <div className="mx-auto max-w-[1440px] grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="text-center lg:text-left">
            <div className="font-display text-5xl lg:text-6xl text-gradient-gold">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-3">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const steps = [
    { icon: Compass, title: "Consult", body: "Brief discovery, feasibility, and scope alignment." },
    { icon: Building2, title: "Design", body: "Concept, technical drawings, and planning." },
    { icon: Hammer, title: "Execute", body: "Procurement, build, and live progress reporting." },
    { icon: ArrowRight, title: "Handover", body: "Commissioning, documentation, and aftercare." },
  ];
  return (
    <section className="py-32 px-6 lg:px-10 bg-charcoal/30">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="text-center max-w-2xl mx-auto">
          <Eyebrow>Engagement</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl mt-4">A four-step rhythm.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="text-center">
              <div className="mx-auto h-16 w-16 grid place-items-center rounded-full border-gold-hairline bg-background">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mt-6">0{i + 1}</div>
              <h3 className="font-display text-2xl mt-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 max-w-xs mx-auto">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section className="py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="w-10 h-10 text-primary mx-auto mb-8" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl leading-snug">
              "{TESTIMONIALS[i].quote}"
            </p>
            <div className="mt-8 text-sm">
              <div className="text-foreground">{TESTIMONIALS[i].author}</div>
              <div className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">{TESTIMONIALS[i].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={cn("h-1 transition-all", i === idx ? "w-12 bg-primary" : "w-6 bg-muted-foreground/30")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-[1200px] relative overflow-hidden rounded-sm border-gold-hairline">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
        <div className="relative px-8 sm:px-16 py-20 sm:py-28 max-w-2xl">
          <Eyebrow>Begin</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-tight">
            Ready to build something <span className="italic text-gradient-gold">unforgettable?</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md">
            Tell us about your project. We respond within one business day.
          </p>
          <Link
            to="/rfq"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 mt-10 text-sm font-medium hover:bg-gold-soft transition-colors rounded-sm shadow-gold"
          >
            Start your project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}