import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { VERTICALS } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-32 bg-charcoal/60">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl">Kven</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Solutions</div>
            <p className="text-sm text-muted-foreground mt-6 max-w-xs leading-relaxed">
              Multi-disciplinary builders of structures, spaces, and experiences for institutions that demand excellence.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" className="h-9 w-9 grid place-items-center border-gold-hairline rounded-sm hover:bg-primary/10 transition-colors">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center border-gold-hairline rounded-sm hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Verticals</div>
            <ul className="space-y-2 text-sm">
              {VERTICALS.map((v) => (
                <li key={v.id}>
                  <Link to="/services/$vertical" params={{ vertical: v.slug }} className="hover:text-primary transition-colors">{v.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/rfq" className="hover:text-primary transition-colors">Request a quote</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Client portal</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> Tower 12, Olaya District<br />Riyadh, KSA</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@kvensolutions.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Kven Solutions. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
