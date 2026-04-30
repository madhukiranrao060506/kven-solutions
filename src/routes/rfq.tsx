import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { VERTICALS, type Vertical } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/rfq")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Kven Solutions" },
      { name: "description", content: "Tell us about your project. A multi-step adaptive form for civil, interior, events, or supplies engagements." },
      { property: "og:title", content: "Request a Quote — Kven Solutions" },
      { property: "og:description", content: "Senior partner reply within one business day." },
    ],
  }),
  component: RFQPage,
});

const baseSchema = z.object({
  contact_name: z.string().trim().min(1).max(100),
  contact_email: z.string().trim().email().max(255),
  contact_phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
});

interface RFQState {
  vertical?: Vertical;
  details: Record<string, string>;
  budget: string;
  timeline: string;
  contact: { name: string; email: string; phone: string; company: string };
}

const initial: RFQState = {
  details: {},
  budget: "$50k – $250k",
  timeline: "1–3 months",
  contact: { name: "", email: "", phone: "", company: "" },
};

function RFQPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<RFQState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const parsed = baseSchema.safeParse({
      contact_name: state.contact.name,
      contact_email: state.contact.email,
      contact_phone: state.contact.phone || undefined,
      company: state.contact.company || undefined,
    });
    if (!parsed.success || !state.vertical) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    const { data: auth } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("rfq_submissions")
      .insert({
        user_id: auth.user?.id ?? null,
        vertical: state.vertical,
        contact_name: parsed.data.contact_name,
        contact_email: parsed.data.contact_email,
        contact_phone: parsed.data.contact_phone ?? null,
        company: parsed.data.company ?? null,
        payload: { details: state.details, budget: state.budget, timeline: state.timeline },
      })
      .select("reference_code")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Submission failed. Please try again.");
      return;
    }
    setReference(data.reference_code);
    setStep(5);
  };

  return (
    <SiteShell>
      <section className="pt-40 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>Request a quote</Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.05]">
              Tell us about your <span className="italic text-gradient-gold">project.</span>
            </h1>
          </Reveal>

          {step < 5 && (
            <div className="mt-12 flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("h-1 flex-1 transition-all", s <= step ? "bg-primary" : "bg-border")} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-3xl glass-strong rounded-sm p-8 sm:p-12 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && <StepVertical state={state} setState={setState} />}
              {step === 1 && state.vertical && <StepDetails vertical={state.vertical} state={state} setState={setState} />}
              {step === 2 && <StepBudget state={state} setState={setState} />}
              {step === 3 && <StepContact state={state} setState={setState} />}
              {step === 4 && <StepReview state={state} />}
              {step === 5 && reference && <StepDone reference={reference} />}
            </motion.div>
          </AnimatePresence>

          {step < 5 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < 4 ? (
                <button onClick={next} disabled={step === 0 && !state.vertical} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm rounded-sm shadow-gold hover:bg-gold-soft transition-colors disabled:opacity-40">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={submitting} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm rounded-sm shadow-gold hover:bg-gold-soft transition-colors disabled:opacity-40">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Submit RFQ
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function StepVertical({ state, setState }: { state: RFQState; setState: (s: RFQState) => void }) {
  return (
    <div>
      <h2 className="font-display text-2xl">Which service?</h2>
      <p className="text-sm text-muted-foreground mt-2">Pick the vertical that best fits your project.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        {VERTICALS.map((v) => (
          <button
            key={v.id}
            onClick={() => setState({ ...state, vertical: v.id, details: {} })}
            className={cn(
              "text-left p-5 border rounded-sm transition-all flex gap-4",
              state.vertical === v.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
            )}
          >
            <div className="h-10 w-10 grid place-items-center rounded-sm border-gold-hairline text-primary">
              <v.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-lg">{v.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{v.tagline}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const FIELD_MAP: Record<Vertical, { key: string; label: string; placeholder?: string }[]> = {
  civil: [
    { key: "project_type", label: "Project type", placeholder: "Bridge, tower, infrastructure..." },
    { key: "site_area", label: "Site area (m²)", placeholder: "e.g. 4,500" },
    { key: "location", label: "Site location", placeholder: "City, country" },
    { key: "start", label: "Target start date" },
  ],
  interior: [
    { key: "space_type", label: "Space type", placeholder: "Residence, office, hospitality..." },
    { key: "area", label: "Area (m²)", placeholder: "e.g. 320" },
    { key: "style", label: "Style preference", placeholder: "Modern, classical, industrial..." },
    { key: "ready_by", label: "Ready by" },
  ],
  events: [
    { key: "event_type", label: "Event type", placeholder: "Gala, launch, conference..." },
    { key: "guests", label: "Guest count", placeholder: "e.g. 600" },
    { key: "venue", label: "Venue status", placeholder: "Confirmed, scouting, need recommendation" },
    { key: "date", label: "Event date" },
  ],
  supplies: [
    { key: "category", label: "Material category", placeholder: "Cement, steel, finishes..." },
    { key: "quantity", label: "Quantity / scale", placeholder: "e.g. 200 t/month" },
    { key: "delivery", label: "Delivery location", placeholder: "City / site" },
    { key: "frequency", label: "Frequency", placeholder: "One-off, recurring, contract" },
  ],
};

function StepDetails({ vertical, state, setState }: { vertical: Vertical; state: RFQState; setState: (s: RFQState) => void }) {
  const fields = FIELD_MAP[vertical];
  return (
    <div>
      <h2 className="font-display text-2xl">Project details</h2>
      <p className="text-sm text-muted-foreground mt-2">Just the essentials — we'll dive deeper on the call.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {fields.map((f) => (
          <div key={f.key} className="sm:col-span-1">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
            <input
              value={state.details[f.key] || ""}
              onChange={(e) => setState({ ...state, details: { ...state.details, [f.key]: e.target.value } })}
              placeholder={f.placeholder}
              className="w-full mt-1.5 px-4 py-3 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBudget({ state, setState }: { state: RFQState; setState: (s: RFQState) => void }) {
  const budgets = ["< $50k", "$50k – $250k", "$250k – $1M", "$1M – $5M", "$5M+"];
  const timelines = ["< 1 month", "1–3 months", "3–6 months", "6–12 months", "12+ months"];
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl">Investment range</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
          {budgets.map((b) => (
            <button key={b} onClick={() => setState({ ...state, budget: b })} className={cn("p-3 text-sm border rounded-sm transition-all", state.budget === b ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40")}>{b}</button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-display text-2xl">Timeline</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
          {timelines.map((t) => (
            <button key={t} onClick={() => setState({ ...state, timeline: t })} className={cn("p-3 text-sm border rounded-sm transition-all", state.timeline === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40")}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepContact({ state, setState }: { state: RFQState; setState: (s: RFQState) => void }) {
  const c = state.contact;
  const set = (k: keyof typeof c, v: string) => setState({ ...state, contact: { ...c, [k]: v } });
  return (
    <div>
      <h2 className="font-display text-2xl">Your contact</h2>
      <p className="text-sm text-muted-foreground mt-2">A senior partner will respond within one business day.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Input label="Full name *" value={c.name} onChange={(v) => set("name", v)} />
        <Input label="Email *" type="email" value={c.email} onChange={(v) => set("email", v)} />
        <Input label="Phone" value={c.phone} onChange={(v) => set("phone", v)} />
        <Input label="Company" value={c.company} onChange={(v) => set("company", v)} />
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1.5 px-4 py-3 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm" />
    </div>
  );
}

function StepReview({ state }: { state: RFQState }) {
  const v = VERTICALS.find((x) => x.id === state.vertical);
  return (
    <div>
      <h2 className="font-display text-2xl">Review</h2>
      <p className="text-sm text-muted-foreground mt-2">A quick summary before submission.</p>
      <dl className="mt-8 space-y-4 text-sm">
        <Row label="Service" value={v?.title} />
        {Object.entries(state.details).map(([k, val]) => <Row key={k} label={k.replace(/_/g, " ")} value={val} />)}
        <Row label="Budget" value={state.budget} />
        <Row label="Timeline" value={state.timeline} />
        <Row label="Contact" value={`${state.contact.name} · ${state.contact.email}`} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground capitalize">{label}</dt>
      <dd className="col-span-2">{value}</dd>
    </div>
  );
}

function StepDone({ reference }: { reference: string }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/15">
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </div>
      <h2 className="font-display text-3xl mt-6">RFQ received.</h2>
      <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">Reference <span className="text-primary font-mono">{reference}</span>. A senior partner will be in touch within one business day.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="px-6 py-3 border-gold-hairline text-sm rounded-sm hover:bg-primary/10 transition-colors">Return home</Link>
        <Link to="/portfolio" className="px-6 py-3 bg-primary text-primary-foreground text-sm rounded-sm">View portfolio</Link>
      </div>
    </div>
  );
}
