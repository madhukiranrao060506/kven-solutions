'use client'
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const supabase = createClient(
  "https://alxvakgaosrpnudmxerw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHZha2dhb3NycG51ZG14ZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjIxNDUsImV4cCI6MjEwODMzODE0NX0.y4wMaVGjL9iaH_llYGE0Q4pcutpFM7AYaTFWWecgc18"
);

export const Route = createFileRoute("/rfq")({
  component: RFQPage,
});

const SERVICES = [
  { id: "civil", label: "Civil Works", desc: "Structural engineering & construction" },
  { id: "interior", label: "Interior Design", desc: "Bespoke residential & commercial interiors" },
  { id: "events", label: "Event Management", desc: "Corporate & cultural event production" },
  { id: "supplies", label: "Contracts & Supplies", desc: "Material procurement & logistics" },
];

const BUDGETS = ["Below ₹1 Lakh", "₹1 – ₹3 Lakhs", "₹3 – ₹5 Lakhs", "₹5 – ₹10 Lakhs", "Above ₹10 Lakhs"];
const TIMELINES = ["< 1 month", "1–3 months", "3–6 months", "6–12 months", "> 1 year"];

function RFQPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    service: "",
    spaceType: "",
    area: "",
    style: "",
    readyBy: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in your name, email and phone.");
      return;
    }
    setSending(true);
    setError("");

    try {
      await emailjs.init("buC7d6SAzfFH4RSpL");

      const templateParams = {
        client_name: form.name,
        client_phone: form.phone,
        client_email: form.email,
        service: SERVICES.find(s => s.id === form.service)?.label || form.service,
        space_type: form.spaceType,
        area: form.area,
        style: form.style,
        ready_by: form.readyBy,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message || "No additional message",
      };

      // Send to Kven Solutions
      await emailjs.send("KVEN_SOLUTIONS", "template_zcoum9r", templateParams);

      // Send confirmation to customer
      if (form.email) {
        await emailjs.send("KVEN_SOLUTIONS", "template_5hrfits", {
          ...templateParams,
          time_slot: "To be confirmed",
          date: "To be confirmed",
          location: "Not specified",
        });
      }

      // Save to Supabase
      await supabase.from("APPOINTMENTS").insert({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: SERVICES.find(s => s.id === form.service)?.label || form.service,
        space_type: form.spaceType,
        area: form.area,
        style: form.style,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message || "",
      });

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <SiteShell>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <div className="mx-auto mb-8 h-16 w-16 rounded-full bg-primary/10 grid place-items-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <Eyebrow>Submitted</Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl mt-4">
              Thank you, {form.name}.
            </h1>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Your request has been received. A confirmation has been sent to <strong>{form.email}</strong>.
              Our team will contact you at <strong>{form.phone}</strong> within one business day.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep(0); setForm({ service: "", spaceType: "", area: "", style: "", readyBy: "", budget: "", timeline: "", name: "", email: "", phone: "", message: "" }); }}
              className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
            >
              Submit another request <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SiteShell>
    );
  }

  const steps = [
    // Step 0: Service
    <div key="service" className="space-y-4">
      <Reveal>
        <Eyebrow>Step 1 of 4</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl mt-4">What can we help with?</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => { set("service", s.id); setStep(1); }}
            className={`text-left p-5 rounded-sm border transition-all ${
              form.service === s.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="font-display text-lg">{s.label}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>,

    // Step 1: Project details
    <div key="details" className="space-y-6">
      <Reveal>
        <Eyebrow>Step 2 of 4</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl mt-4">Tell us about the project.</h2>
      </Reveal>
      <div className="space-y-4 mt-8">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Space / Project type</label>
          <input
            value={form.spaceType}
            onChange={e => set("spaceType", e.target.value)}
            placeholder="e.g. Villa, Office, Warehouse..."
            className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Area (sqft / sqm)</label>
            <input
              value={form.area}
              onChange={e => set("area", e.target.value)}
              placeholder="e.g. 2000 sqft"
              className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Style preference</label>
            <input
              value={form.style}
              onChange={e => set("style", e.target.value)}
              placeholder="e.g. Modern, Traditional..."
              className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Ready to start by</label>
          <input
            value={form.readyBy}
            onChange={e => set("readyBy", e.target.value)}
            placeholder="e.g. 3 months, January 2025..."
            className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm rounded-sm hover:bg-gold-soft transition-colors">
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>,

    // Step 2: Budget & Timeline
    <div key="budget" className="space-y-6">
      <Reveal>
        <Eyebrow>Step 3 of 4</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl mt-4">Scope & budget.</h2>
      </Reveal>
      <div className="space-y-6 mt-8">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">Budget range</label>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map(b => (
              <button
                key={b}
                onClick={() => set("budget", b)}
                className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                  form.budget === b ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">Delivery timeline</label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map(t => (
              <button
                key={t}
                onClick={() => set("timeline", t)}
                className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                  form.timeline === t ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm rounded-sm hover:bg-gold-soft transition-colors">
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>,

    // Step 3: Contact
    <div key="contact" className="space-y-6">
      <Reveal>
        <Eyebrow>Step 4 of 4</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl mt-4">Your contact details.</h2>
      </Reveal>

      <div className="bg-secondary/30 rounded-sm p-4 text-sm space-y-2 mt-6">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Review</div>
        {[
          ["Service", SERVICES.find(s => s.id === form.service)?.label],
          ["Space type", form.spaceType],
          ["Area", form.area],
          ["Style", form.style],
          ["Ready by", form.readyBy],
          ["Budget", form.budget],
          ["Timeline", form.timeline],
        ].filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-muted-foreground">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Full Name *</label>
            <input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="Your name"
              className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Phone *</label>
            <input
              value={form.phone}
              onChange={e => set("phone", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Email *</label>
          <input
            value={form.email}
            onChange={e => set("email", e.target.value)}
            placeholder="your@email.com"
            type="email"
            className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Additional message</label>
          <textarea
            value={form.message}
            onChange={e => set("message", e.target.value)}
            placeholder="Anything else you'd like us to know..."
            rows={3}
            className="w-full bg-secondary/40 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive border border-destructive/30 rounded-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={sending}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm rounded-sm hover:bg-gold-soft transition-colors disabled:opacity-60"
        >
          {sending ? "Sending..." : "Submit RFQ"} {!sending && <Check className="w-4 h-4" />}
        </button>
      </div>
    </div>,
  ];

  return (
    <SiteShell>
      <section className="relative min-h-screen py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-1 mb-12">
            {[0,1,2,3].map(i => (
              <div
                key={i}
                className={`h-0.5 flex-1 transition-all duration-500 ${i <= step ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          {steps[step]}
        </div>
      </section>
    </SiteShell>
  );
}