import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, ShoppingBag, X, Send, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { SUPPLIES, SUPPLY_CATEGORIES } from "@/data/site";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/supplies")({
  head: () => ({
    meta: [
      { title: "Contracts & Supplies — Kven Solutions" },
      { name: "description", content: "Searchable catalog of construction, finishing, and MEP materials with bulk inquiry workflow." },
      { property: "og:title", content: "Contracts & Supplies — Kven Solutions" },
      { property: "og:description", content: "Material logistics, simplified." },
    ],
  }),
  component: SuppliesPage,
});

interface CartItem { id: string; qty: number }

function SuppliesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof SUPPLY_CATEGORIES)[number]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    return SUPPLIES.filter((s) => (cat === "All" || s.category === cat) && (q === "" || s.name.toLowerCase().includes(q.toLowerCase())));
  }, [q, cat]);

  const add = (id: string) => setCart((c) => {
    const existing = c.find((x) => x.id === id);
    if (existing) return c.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x);
    return [...c, { id, qty: 1 }];
  });
  const dec = (id: string) => setCart((c) => c.flatMap((x) => x.id === id ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x]));
  const remove = (id: string) => setCart((c) => c.filter((x) => x.id !== id));
  const total = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <SiteShell>
      <section className="pt-40 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Catalog</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-3xl leading-[1.05]">
              Materials, sourced with <span className="italic text-gradient-gold">discipline.</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl">
              Build your inquiry. We'll respond with verified pricing, lead times, and delivery logistics within one business day.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search materials..."
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {SUPPLY_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cn(
                      "px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-sm border transition-all",
                      cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    )}
                  >{c}</button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1440px]">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((s) => {
                const inCart = cart.find((c) => c.id === s.id);
                return (
                  <motion.div
                    layout
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group glass rounded-sm overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={s.image} alt={s.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.category}</div>
                      <div className="font-display text-lg mt-2 leading-tight">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-2">Per {s.unit} · Lead {s.lead}</div>
                      {inCart ? (
                        <div className="mt-4 flex items-center justify-between bg-primary/10 rounded-sm">
                          <button onClick={() => dec(s.id)} className="p-2.5 hover:bg-primary/20 transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm">{inCart.qty} added</span>
                          <button onClick={() => add(s.id)} className="p-2.5 hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => add(s.id)} className="mt-4 w-full inline-flex items-center justify-center gap-2 border-gold-hairline px-4 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-primary/10 transition-colors rounded-sm">
                          <Plus className="w-3.5 h-3.5" /> Add to inquiry
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No materials match your search.</div>
          )}
        </div>
      </section>

      {/* floating cart */}
      <AnimatePresence>
        {total > 0 && !open && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-40 glass-strong px-6 py-4 rounded-sm shadow-luxury inline-flex items-center gap-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm">{total} item{total !== 1 && "s"} · Submit inquiry</span>
          </motion.button>
        )}
      </AnimatePresence>

      <InquiryDrawer open={open} onClose={() => setOpen(false)} cart={cart} onClear={() => setCart([])} onRemove={remove} />
    </SiteShell>
  );
}

function InquiryDrawer({ open, onClose, cart, onClear, onRemove }: { open: boolean; onClose: () => void; cart: CartItem[]; onClear: () => void; onRemove: (id: string) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", location: "", notes: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || cart.length === 0) {
      toast.error("Please add items and complete required fields.");
      return;
    }
    setSubmitting(true);
    const items = cart.map((c) => {
      const s = SUPPLIES.find((x) => x.id === c.id)!;
      return { id: s.id, name: s.name, category: s.category, unit: s.unit, qty: c.qty };
    });
    const { data: auth } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("supply_inquiries")
      .insert({
        user_id: auth.user?.id ?? null,
        contact_name: form.name,
        contact_email: form.email,
        contact_phone: form.phone || null,
        company: form.company || null,
        delivery_location: form.location || null,
        notes: form.notes || null,
        items,
      })
      .select("reference_code")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit inquiry. Please try again.");
      return;
    }
    toast.success(`Inquiry received — reference ${data.reference_code}`);
    onClear();
    onClose();
    setForm({ name: "", email: "", phone: "", company: "", location: "", notes: "" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-background border-l border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <Eyebrow>Your inquiry</Eyebrow>
                <h2 className="font-display text-2xl mt-2">{cart.length} item{cart.length !== 1 && "s"}</h2>
              </div>
              <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-sm border-gold-hairline"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 space-y-3">
              {cart.map((c) => {
                const s = SUPPLIES.find((x) => x.id === c.id)!;
                return (
                  <div key={c.id} className="flex gap-3 p-3 border border-border rounded-sm">
                    <img src={s.image} alt="" className="w-16 h-16 object-cover rounded-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.qty} × {s.unit}</div>
                    </div>
                    <button onClick={() => onRemove(c.id)} className="text-muted-foreground hover:text-destructive p-1"><X className="w-4 h-4" /></button>
                  </div>
                );
              })}
            </div>

            <form onSubmit={submit} className="p-6 space-y-4 border-t border-border">
              <Field label="Full name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              <Field label="Delivery location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full mt-1.5 px-4 py-2.5 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm" />
              </div>
              <button disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm rounded-sm hover:bg-gold-soft transition-colors disabled:opacity-50">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit inquiry
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1.5 px-4 py-2.5 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm" />
    </div>
  );
}
