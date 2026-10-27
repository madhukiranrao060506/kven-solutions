import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const supabase = createClient(
  "https://alxvakgaosrpnudmxerw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHZha2dhb3NycG51ZG14ZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjIxNDUsImV4cCI6MjEwODMzODE0NX0.y4wMaVGjL9iaH_llYGE0Q4pcutpFM7AYaTFWWecgc18"
);

export const Route = createFileRoute("/rfq")({ component: RFQPage });

const SERVICES = [
  { id: "civil",    label: "Civil Works",          desc: "Structural engineering & construction" },
  { id: "interior", label: "Interior Design",      desc: "Bespoke residential & commercial interiors" },
  { id: "events",   label: "Event Management",     desc: "Corporate & cultural event production" },
  { id: "supplies", label: "Contracts & Supplies", desc: "Material procurement & logistics" },
];

const BUDGETS   = ["Below ₹1 Lakh", "₹1 – ₹3 Lakhs", "₹3 – ₹5 Lakhs", "₹5 – ₹10 Lakhs", "Above ₹10 Lakhs"];
const TIMELINES = ["< 1 month", "1–3 months", "3–6 months", "6–12 months", "> 1 year"];

const INPUT_CLS = "w-full bg-[#1e1e1e] border border-[#333] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#C5A059] focus:outline-none";

function RFQPage() {
  const [step,      setStep]      = useState(0);
  const [service,   setService]   = useState("");
  const [budget,    setBudget]    = useState("");
  const [timeline,  setTimeline]  = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState("");
  const [submittedName,  setSubmittedName]  = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");

  const spaceTypeRef = useRef<HTMLInputElement>(null);
  const areaRef      = useRef<HTMLInputElement>(null);
  const styleRef     = useRef<HTMLInputElement>(null);
  const readyByRef   = useRef<HTMLInputElement>(null);
  const nameRef      = useRef<HTMLInputElement>(null);
  const emailRef     = useRef<HTMLInputElement>(null);
  const phoneRef     = useRef<HTMLInputElement>(null);
  const messageRef   = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const name  = nameRef.current?.value?.trim()  || "";
    const email = emailRef.current?.value?.trim() || "";
    const phone = phoneRef.current?.value?.trim() || "";
    if (!name || !email || !phone) {
      setError("Please fill in your name, email and phone.");
      return;
    }
    setSending(true);
    setError("");
    const serviceLabel = SERVICES.find(s => s.id === service)?.label || service;
    const spaceType = spaceTypeRef.current?.value || "";
    const area      = areaRef.current?.value      || "";
    const style     = styleRef.current?.value     || "";
    const readyBy   = readyByRef.current?.value   || "";
    const message   = messageRef.current?.value   || "";
    try {
      await emailjs.init("buC7d6SAzfFH4RSpL");
      const p = {
        client_name: name, client_phone: phone, client_email: email,
        service: serviceLabel, space_type: spaceType, area, style,
        ready_by: readyBy, budget, timeline,
        message: message || "No additional message",
      };
      await emailjs.send("KVEN_SOLUTIONS", "template_zcoum9r", p);
      await emailjs.send("KVEN_SOLUTIONS", "template_5hrfits", {
        ...p, time_slot: "To be confirmed", date: "To be confirmed", location: "Not specified",
      });
      await supabase.from("APPOINTMENTS").insert({
        name, phone, email, service: serviceLabel,
        space_type: spaceType, area, style, budget, timeline, message,
      });
      setSubmittedName(name);
      setSubmittedEmail(email);
      setSubmittedPhone(phone);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setService(""); setBudget(""); setTimeline("");
    setSubmitted(false); setSending(false); setError(""); setStep(0);
    setSubmittedName(""); setSubmittedEmail(""); setSubmittedPhone("");
    [spaceTypeRef, areaRef, styleRef, readyByRef, nameRef, emailRef, phoneRef].forEach(r => { if (r.current) r.current.value = ""; });
    if (messageRef.current) messageRef.current.value = "";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#f0f0f0", fontFamily: "Inter, sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(17,17,17,0.9)", borderBottom: "1px solid #2a2a2a", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "#f0f0f0", textDecoration: "none" }}>Kven Solutions</a>
          <a href="/" style={{ fontSize: 14, color: "#999", textDecoration: "none" }}>← Back to Home</a>
        </div>
      </nav>

      {submitted ? (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(197,160,89,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
              <Check size={28} color="#C5A059" />
            </div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A059" }}>Submitted</p>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 42, marginTop: 16 }}>Thank you, {submittedName}.</h1>
            <p style={{ color: "#999", marginTop: 20, lineHeight: 1.7 }}>
              Your request has been received. A confirmation has been sent to <strong style={{ color: "#f0f0f0" }}>{submittedEmail}</strong>.
              Our team will contact you at <strong style={{ color: "#f0f0f0" }}>{submittedPhone}</strong> within one business day.
            </p>
            <button onClick={resetForm} style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#C5A059", background: "none", border: "none", cursor: "pointer" }}>
              Submit another request <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 48 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ height: 2, flex: 1, background: i <= step ? "#C5A059" : "#333", transition: "background 0.4s" }} />
              ))}
            </div>

            {step === 0 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A059", marginBottom: 16 }}>Step 1 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>What can we help with?</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => { setService(s.id); setStep(1); }}
                      style={{ textAlign: "left", padding: 20, border: `1px solid ${service === s.id ? "#C5A059" : "#333"}`, background: service === s.id ? "rgba(197,160,89,0.05)" : "transparent", borderRadius: 4, cursor: "pointer", color: "#f0f0f0" }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: 17 }}>{s.label}</div>
                      <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A059", marginBottom: 16 }}>Step 2 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>Tell us about the project.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Space / Project Type</label>
                    <input ref={spaceTypeRef} type="text" placeholder="e.g. Villa, Office, Warehouse..." className={INPUT_CLS} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Area (sqft / sqm)</label>
                      <input ref={areaRef} type="text" placeholder="e.g. 2000 sqft" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Style Preference</label>
                      <input ref={styleRef} type="text" placeholder="e.g. Modern, Traditional..." className={INPUT_CLS} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Ready to Start By</label>
                    <input ref={readyByRef} type="text" placeholder="e.g. 3 months, January 2025..." className={INPUT_CLS} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C5A059", color: "#111", border: "none", borderRadius: 4, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A059", marginBottom: 16 }}>Step 3 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>Scope & budget.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 12 }}>Budget Range</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {BUDGETS.map(b => (
                        <button key={b} onClick={() => setBudget(b)}
                          style={{ padding: "8px 16px", fontSize: 13, border: `1px solid ${budget === b ? "#C5A059" : "#333"}`, background: budget === b ? "rgba(197,160,89,0.1)" : "transparent", color: budget === b ? "#f0f0f0" : "#888", borderRadius: 4, cursor: "pointer" }}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 12 }}>Delivery Timeline</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {TIMELINES.map(t => (
                        <button key={t} onClick={() => setTimeline(t)}
                          style={{ padding: "8px 16px", fontSize: 13, border: `1px solid ${timeline === t ? "#C5A059" : "#333"}`, background: timeline === t ? "rgba(197,160,89,0.1)" : "transparent", color: timeline === t ? "#f0f0f0" : "#888", borderRadius: 4, cursor: "pointer" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={() => setStep(3)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C5A059", color: "#111", border: "none", borderRadius: 4, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A059", marginBottom: 16 }}>Step 4 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 24 }}>Your contact details.</h2>
                <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 4, padding: 16, marginBottom: 24, fontSize: 13 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Review</div>
                  {[["Service", SERVICES.find(s => s.id === service)?.label], ["Budget", budget], ["Timeline", timeline]]
                    .filter(([,v]) => v).map(([k,v]) => (
                    <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#888" }}>{k}</span>
                      <span style={{ color: "#f0f0f0" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Full Name *</label>
                      <input ref={nameRef} type="text" placeholder="Your name" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Phone *</label>
                      <input ref={phoneRef} type="tel" placeholder="+91 XXXXX XXXXX" className={INPUT_CLS} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Email *</label>
                    <input ref={emailRef} type="email" placeholder="your@email.com" className={INPUT_CLS} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 8 }}>Additional Message</label>
                    <textarea ref={messageRef} placeholder="Anything else you'd like us to know..." rows={3}
                      className={INPUT_CLS} style={{ resize: "none" }} />
                  </div>
                </div>
                {error && (
                  <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 4, fontSize: 13, color: "#f87171" }}>
                    {error}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleSubmit} disabled={sending}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: sending ? "#888" : "#C5A059", color: "#111", border: "none", borderRadius: 4, padding: "12px 32px", fontSize: 14, cursor: sending ? "not-allowed" : "pointer", fontWeight: 500 }}>
                    {sending ? "Sending…" : <><Check size={14} /> Submit RFQ</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}