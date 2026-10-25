import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { VERTICALS } from "@/data/site";
import { cn } from "@/lib/utils";

function NavLink({ to, children, exact = false }: { to: string; children: React.ReactNode; exact?: boolean }) {
  return (
    <Link
      to={to}
      className="relative px-4 py-2 text-sm group overflow-hidden"
      activeOptions={exact ? { exact: true } : undefined}
      activeProps={{ className: "text-primary [text-shadow:0_0_12px_rgba(197,160,89,0.6)]" }}
      inactiveProps={{ className: "text-foreground" }}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
        {children}
      </span>
      <span className="absolute left-4 right-4 bottom-1.5 h-px bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

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

  const mobileLinks = [
    { to: "/", label: "Home" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/supplies", label: "Supplies" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Client portal" },
  ];

  return (
    <>
      <motion.div
        style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.jpeg"
                alt="Kven Solutions Logo"
                className="h-16 w-16 object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(197,160,89,0.55)]"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/" exact>Home</NavLink>

              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="relative px-4 py-2 text-sm flex items-center gap-1 group overflow-hidden">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                    Services
                  </span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", megaOpen && "rotate-180")} />
                  <span className="absolute left-4 right-4 bottom-1.5 h-px bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
                            className="flex gap-3 p-3 rounded-md hover:bg-secondary/60 transition-all duration-300 group"
                          >
                            <div className="h-10 w-10 rounded-sm border-gold-hairline grid place-items-center text-primary group-hover:bg-primary/10 transition-colors duration-300">
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

              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/supplies">Supplies</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 px-3 py-2"
              >
                Client portal
              </Link>
              <Link
                to="/rfq"
                className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-gold-soft transition-all duration-300 hover:scale-105 rounded-sm shadow-gold"
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
                {mobileLinks.slice(0, 1).map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link to={l.to} onClick={() => setMobileOpen(false)} className="py-2 text-sm block transition-colors duration-300 hover:text-primary">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 mb-1"
                >
                  Services
                </motion.div>
                {VERTICALS.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                  >
                    <Link to="/services/$vertical" params={{ vertical: v.slug }} onClick={() => setMobileOpen(false)} className="py-2 text-sm flex items-center gap-2 transition-colors duration-300 hover:text-primary">
                      <v.icon className="w-4 h-4 text-primary" /> {v.title}
                    </Link>
                  </motion.div>
                ))}

                {mobileLinks.slice(1).map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn("py-2 text-sm block transition-colors duration-300 hover:text-primary", i === 0 && "mt-2")}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <Link
                    to="/rfq"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-3 text-sm font-medium rounded-sm w-full transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}