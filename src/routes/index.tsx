import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowDown, Quote, Leaf, Compass, Hammer, HandshakeIcon,
  Building2, Sparkles,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { VERTICALS, PROJECTS, HERO_FRAMES, PARTNERS, TESTIMONIALS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <CivilToInterior />
      <BentoGrid />
      <FeaturedPortfolio />
      <DigitalTwin />
      <ImpactCounters />
      <SustainabilityPreview />
      <ProcessTimeline />
      <PartnersMarquee />
      <Testimonials />
      <CTABand />
    </SiteShell>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % HERO_FRAMES.length), 5500);
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
                className="absolute inset-0 h-full w-full object-cover ken-burns"
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* gradients */}
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
          <ArrowDown className="w-3.5 h-3.5 text-primary scroll-hint" />
          Scroll to explore
        </div>

        {/* slide indicators */}
        <div className="absolute bottom-10 right-6 lg:right-10 flex gap-3">
          {HERO_FRAMES.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActive(i)}
              className="group flex items-center gap-2"
              aria-label={`Show ${f.label}`}
            >
              <span
                className={cn(
                  "h-px transition-all",
                  active === i ? "w-12 bg-primary" : "w-6 bg-muted-foreground/40 group-hover:bg-muted-foreground"
                )}
              />
              <span className={cn("text-[10px] uppercase tracking-[0.25em] transition-colors", active === i ? "text-primary" : "text-muted-foreground/60")}>
                {f.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CIVIL → INTERIOR ---------------- */
function CivilToInterior() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xL = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const xR = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const opacityR = useTransform(scrollYProgress, [0.1, 0.6], [0.4, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid grid-cols-2 h-[60vh] min-h-[420px]">
        <motion.div style={{ x: xL }} className="relative">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80"
            alt="Civil structure"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background/70" />
          <div className="absolute bottom-8 left-8 text-xs uppercase tracking-[0.3em] text-primary">Civil</div>
        </motion.div>
        <motion.div style={{ x: xR, opacity: opacityR }} className="relative">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
            alt="Interior space"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-background/70" />
          <div className="absolute bottom-8 right-8 text-xs uppercase tracking-[0.3em] text-primary">Interior</div>
        </motion.div>
      </div>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <Reveal className="text-center px-6">
          <p className="font-display italic text-2xl sm:text-4xl lg:text-5xl max-w-3xl text-foreground/90">
            From the structural to the sensorial — one continuous craft.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- BENTO GRID ---------------- */
function BentoGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <Reveal>
            <Eyebrow>Our verticals</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 max-w-2xl leading-tight">
              Four disciplines, one standard of execution.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground max-w-md">
              Engineered to integrate. Each practice operates independently, yet they compound — a single accountable partner from blueprint to handover.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.06}>
              <Link
                to="/services/$vertical"
                params={{ vertical: v.slug }}
                onMouseEnter={() => setHovered(v.id)}
                onMouseLeave={() => setHovered(null)}
                className="group block relative overflow-hidden rounded-sm aspect-[3/4] border-gold-hairline"
              >
                <img src={v.image} alt={v.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <v.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <AnimatePresence>
                    {hovered === v.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{v.description}</p>
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mt-4">
                          View projects <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {hovered !== v.id && (
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{v.tagline}</div>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED PORTFOLIO ---------------- */
function FeaturedPortfolio() {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-charcoal/30">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4">A curated portfolio.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/portfolio" className="group inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
              View full portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                to="/portfolio"
                className="group block relative overflow-hidden rounded-sm aspect-[4/5]"
              >
                <img src={p.cover} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.category}</div>
                  <h3 className="font-display text-2xl mt-2">{p.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">{p.location} · {p.year}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIGITAL TWIN (CSS 3D) ---------------- */
function DigitalTwin() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="mx-auto max-w-[1440px] grid lg:grid-cols-2 gap-16 items-center relative">
        <Reveal>
          <Eyebrow>Digital Twin</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-tight">
            Every project, modelled before it's built.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed max-w-lg">
            BIM coordination, 3D walkthroughs, and a living digital twin maintained through delivery — so the structure on day one matches the rendering on day zero.
          </p>
          <ul className="mt-8 space-y-3">
            {["Federated BIM 360 model", "Clash detection & resolution", "Live progress overlay", "Handover documentation"].map((x) => (
              <li key={x} className="flex items-center gap-3 text-sm">
                <span className="h-1 w-6 bg-primary" /> {x}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="relative aspect-square max-w-xl mx-auto"
            style={{ perspective: "1400px" }}
            onMouseMove={(e) => {
              const r = ref.current!.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              setTilt({ x: -py * 14, y: px * 18 });
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <motion.div
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Layer 1 — base plate */}
              <div
                className="absolute inset-8 rounded-sm border-gold-hairline glass-strong shadow-luxury"
                style={{ transform: "translateZ(0px)" }}
              />
              {/* Layer 2 — floor plan */}
              <div
                className="absolute inset-12 rounded-sm border border-primary/20 bg-charcoal/70 overflow-hidden"
                style={{ transform: "translateZ(40px)" }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="goldL" x1="0" x2="1">
                      <stop offset="0" stopColor="#C5A059" stopOpacity="0.7" />
                      <stop offset="1" stopColor="#C5A059" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#goldL)" strokeWidth="0.6" fill="none">
                    <rect x="20" y="20" width="160" height="160" />
                    <rect x="20" y="20" width="80" height="90" />
                    <rect x="100" y="20" width="80" height="60" />
                    <rect x="100" y="80" width="80" height="100" />
                    <rect x="20" y="110" width="55" height="70" />
                    <rect x="75" y="110" width="25" height="70" />
                    <line x1="40" y1="20" x2="40" y2="40" />
                    <line x1="60" y1="20" x2="60" y2="40" />
                    <line x1="160" y1="60" x2="180" y2="60" />
                    <circle cx="55" cy="65" r="10" />
                    <circle cx="135" cy="50" r="6" />
                  </g>
                </svg>
              </div>
              {/* Layer 3 — gold wireframe overlay */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-16 rounded-sm border border-primary/40"
                style={{ transform: "translateZ(80px)", boxShadow: "0 0 40px rgba(197,160,89,0.25)" }}
              />
              {/* Floating chips */}
              <div
                className="absolute top-2 right-2 glass px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-[0.2em] text-primary"
                style={{ transform: "translateZ(120px)" }}
              >
                Live · BIM 360
              </div>
              <div
                className="absolute bottom-2 left-2 glass px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5"
                style={{ transform: "translateZ(120px)" }}
              >
                <Sparkles className="w-3 h-3" /> Synced 12s ago
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- IMPACT COUNTERS ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
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
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function ImpactCounters() {
  const stats = [
    { value: 320, suffix: "+", label: "Projects Completed" },
    { value: 48000, suffix: "t", label: "Material Supplied" },
    { value: 180, suffix: "+", label: "Events Produced" },
    { value: 18, suffix: "", label: "Years of Excellence" },
  ];
  return (
    <section className="relative py-24 px-6 lg:px-10 border-y border-border">
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

/* ---------------- SUSTAINABILITY ---------------- */
function SustainabilityPreview() {
  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Sustainability ledger</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
            Greener by design, by audit, by default.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Our Green Score tracks embodied carbon, recycled content, and on-site waste across every active project — published quarterly.
          </p>
          <Link to="/sustainability" className="inline-flex items-center gap-2 text-sm text-primary mt-8 group">
            Read the ledger <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass p-8 rounded-sm">
              <Leaf className="w-6 h-6 text-primary mb-4" />
              <div className="font-display text-4xl text-gradient-gold">A+</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Green Score</div>
            </div>
            <div className="glass p-8 rounded-sm">
              <div className="font-display text-4xl text-gradient-gold">62%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Recycled inputs</div>
            </div>
            <div className="glass p-8 rounded-sm">
              <div className="font-display text-4xl text-gradient-gold">-41%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Site waste vs benchmark</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function ProcessTimeline() {
  const steps = [
    { icon: Compass, title: "Consult", body: "Brief discovery, feasibility, and scope alignment." },
    { icon: Building2, title: "Design", body: "Concept, technical drawings, and digital twin." },
    { icon: Hammer, title: "Execute", body: "Procurement, build, and live progress reporting." },
    { icon: HandshakeIcon, title: "Handover", body: "Commissioning, documentation, and aftercare." },
  ];
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-charcoal/30">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="text-center max-w-2xl mx-auto">
          <Eyebrow>Engagement</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl mt-4">A four-step rhythm.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="relative text-center">
              <div className="mx-auto h-16 w-16 grid place-items-center rounded-full border-gold-hairline bg-background relative z-10">
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

/* ---------------- PARTNERS MARQUEE ---------------- */
function PartnersMarquee() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section className="py-20 border-y border-border overflow-hidden">
      <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">
        Trusted by leading institutions
      </div>
      <div className="relative">
        <div className="flex gap-16 marquee whitespace-nowrap">
          {list.map((p, i) => (
            <div key={i} className="font-display text-2xl text-muted-foreground/60 hover:text-primary transition-colors tracking-[0.2em]">
              {p}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section className="relative py-32 px-6 lg:px-10">
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
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA BAND ---------------- */
function CTABand() {
  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-[1200px] relative overflow-hidden rounded-sm border-gold-hairline">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
        <div className="relative px-8 sm:px-16 py-20 sm:py-28 max-w-2xl">
          <Eyebrow>Begin</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-tight">
            Ready to build something <span className="italic text-gradient-gold">unforgettable?</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md">
            Tell us about your project. We respond within one business day with a senior partner.
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
