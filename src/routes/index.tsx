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
                className="absolute inset-0 h-full w-full object-cover ken-burns"
                fetchPriority={i === 0 ? "high" : "auto"}
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
          <ArrowDown className="w-3.5 h-3.5 text-primary scroll-hint" />
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
                active === i
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}