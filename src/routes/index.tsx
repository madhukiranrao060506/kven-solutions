function Testimonials() {
  const [i, setI] = useState(0);
  if (TESTIMONIALS.length === 0) return null;
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