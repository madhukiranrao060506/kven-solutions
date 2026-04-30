import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { VERTICALS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 rounded-sm border-gold-hairline grid place-items-center">
                <span className="font-display text-primary text-lg leading-none">K</span>
                <span className="absolute inset-0 rounded-sm bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg tracking-wide">KVEN</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Solutions</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="px-4 py-2 text-sm flex items-center gap-1 hover:text-primary transition-colors">
                  Services <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[640px]"
                    >
                      <div className="glass-strong rounded-lg p-4 grid grid-cols-2 gap-2 shadow-luxury">
                        {VERTICALS.map((v) => (
                          <Link
                            key={v.id}
                            to="/services/$vertical"
                            params={{ vertical: v.slug }}
                            className="flex gap-3 p-3 rounded-md hover:bg-secondary/60 transition-colors group"
                          >
                            <div className="h-10 w-10 rounded-sm border-gold-hairline grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
                              <v.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-display text-sm">{v.title}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{v.tagline}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/portfolio" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Portfolio</Link>
              <Link to="/supplies" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Supplies</Link>
              <Link to="/sustainability" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Sustainability</Link>
              <Link to="/about" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>About</Link>
              <Link to="/contact" className="px-4 py-2 text-sm hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Contact</Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Client portal
              </Link>
              <Link
                to="/rfq"
                className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-gold-soft transition-colors rounded-sm shadow-gold"
              >
                Get in Touch
              </Link>
              <button
                className="lg:hidden p-2 -mr-2"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-border overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                <Link to="/" onClick={() => setMobileOpen(false)} className="py-2 text-sm">Home</Link>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 mb-1">Services</div>
                {VERTICALS.map((v) => (
                  <Link key={v.id} to="/services/$vertical" params={{ vertical: v.slug }} onClick={() => setMobileOpen(false)} className="py-2 text-sm flex items-center gap-2">
                    <v.icon className="w-4 h-4 text-primary" /> {v.title}
                  </Link>
                ))}
                <Link to="/portfolio" onClick={() => setMobileOpen(false)} className="py-2 text-sm mt-2">Portfolio</Link>
                <Link to="/supplies" onClick={() => setMobileOpen(false)} className="py-2 text-sm">Supplies</Link>
                <Link to="/sustainability" onClick={() => setMobileOpen(false)} className="py-2 text-sm">Sustainability</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="py-2 text-sm">About</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-2 text-sm">Contact</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="py-2 text-sm">Client portal</Link>
                <Link
                  to="/rfq"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-3 text-sm font-medium rounded-sm"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
