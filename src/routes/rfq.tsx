import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/rfq")({ component: RFQPage });

const SERVICES = [
  { id: "civil",    label: "Civil Works",          desc: "Structural engineering & construction" },
  { id: "interior", label: "Interior Design",      desc: "Bespoke residential & commercial interiors" },
  { id: "events",   label: "Event Management",     desc: "Corporate & cultural event production" },
  { id: "supplies", label: "Contracts & Supplies", desc: "Material procurement & logistics" },
];

const BUDGETS   = ["Below ₹1 Lakh", "₹1 – ₹3 Lakhs", "₹3 – ₹5 Lakhs", "₹5 – ₹10 Lakhs", "Above ₹10 Lakhs"];
const TIMELINES = ["< 1 month", "1–3 months", "3–6 months", "6–12 months", "> 1 year"];

const IS: React.CSSProperties = {
  width: "100%",
  background: "#1e1e1e",
  border: "1px solid #444",
  borderRadius: 4,
  padding: "12px 16px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "Inter, sans-serif",
  color: "#f0f0f0",
  WebkitTextFillColor: "#f0f0f0",
  caretColor: "#f0f0f0",
  pointerEvents: "auto",
};

function RFQPage() {
  const [step,      setStep]      = useState(0);
  const [service,   setService]   = useState("");
  const [budget,    setBudget]    = useState("");
  const [timeline,  setTimeline]  = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState("");

  const [spaceType, setSpaceType] = useState("");
  const [area,      setArea]      = useState("");
  const [style,     setStyle]     = useState("");
  const [readyBy,   setReadyBy]   = useState("");

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email and phone.");
      return;
    }
    setSending(true);
    setError("");

    const supabase = createClient(
      "https://alxvakgaosrpnudmxerw.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHZha2dhb3NycG51ZG14ZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjIxNDUsImV4cCI6MjEwODMzODE0NX0.y4wMaVGjL9iaH_llYGE0Q4pcutpFM7AYaTFWWecgc18"
    );

    const serviceLabel = SERVICES.find(s => s.id === service)?.label || service;
    try {
      await emailjs.init("buC7d6SAzfFH4RSpL");
      const p = {
        client_name: name.trim(), client_phone: phone.trim(), client_email: email.trim(),
        service: serviceLabel, space_type: spaceType, area, style, ready_by: readyBy,
        budget, timeline, message: message || "No additional message",
      };
      await emailjs.send("KVEN_SOLUTIONS", "template_zcoum9r", p);
      await emailjs.send("KVEN_SOLUTIONS", "template_5hrfits", {
        ...p, time_slot: "To be confirmed", date: "To be confirmed", location: "Not specified",
      });
      await supabase.from("APPOINTMENTS").insert({
        name: name.trim(), phone: phone.trim(), email: email.trim(),
        service: serviceLabel, space_type: spaceType, area, style, budget, timeline, message,
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setService(""); setBudget(""); setTimeline(""); setSubmitted(false);
    setSending(false); setError(""); setStep(0);
    setSpaceType(""); setArea(""); setStyle(""); setReadyBy("");
    setName(""); setEmail(""); setPhone(""); setMessage("");
  };

  const GOLD = "#C5A059";
  const LBL: React.CSSProperties = {
    fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "#888", display: "block", marginBottom: 8,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#f0f0f0", fontFamily: "Inter, sans-serif" }}>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, height: 64, zIndex: 50, background: "rgba(17,17,17,0.9)", borderBottom: "1px solid #2a2a2a", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "#f0f0f0", textDecoration: "none" }}>Kven Solutions</a>
          <a href="/" style={{ fontSize: 14, color: "#999", textDecoration: "none" }}>← Back to Home</a>
        </div>
      </nav>

      {submitted ? (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(197,160,89,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
              <Check size={28} color={GOLD} />
            </div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>Submitted</p>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 42, marginTop: 16 }}>Thank you, {name}.</h1>
            <p style={{ color: "#999", marginTop: 20, lineHeight: 1.7 }}>
              Confirmation sent to <strong style={{ color: "#f0f0f0" }}>{email}</strong>. We'll call <strong style={{ color: "#f0f0f0" }}>{phone}</strong> within one business day.
            </p>
            <button onClick={resetForm} style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: GOLD, background: "none", border: "none", cursor: "pointer" }}>
              Submit another request <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 48 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ height: 2, flex: 1, background: i <= step ? GOLD : "#333", transition: "background 0.4s" }} />
              ))}
            </div>

            {step === 0 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Step 1 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>What can we help with?</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => { setService(s.id); setStep(1); }}
                      style={{ textAlign: "left", padding: 20, border: `1px solid ${service === s.id ? GOLD : "#333"}`, background: service === s.id ? "rgba(197,160,89,0.05)" : "transparent", borderRadius: 4, cursor: "pointer", color: "#f0f0f0" }}>
                      <div style={{ fontFamily: "Playfair Display, serif", fontSize: 17 }}>{s.label}</div>
                      <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Step 2 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>Tell us about the project.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={LBL}>Space / Project Type</label>
                    <input type="text" placeholder="e.g. Villa, Office, Warehouse..." value={spaceType} onChange={e => setSpaceType(e.target.value)} style={IS} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={LBL}>Area (sqft / sqm)</label>
                      <input type="text" placeholder="e.g. 2000 sqft" value={area} onChange={e => setArea(e.target.value)} style={IS} />
                    </div>
                    <div>
                      <label style={LBL}>Style Preference</label>
                      <input type="text" placeholder="e.g. Modern, Traditional..." value={style} onChange={e => setStyle(e.target.value)} style={IS} />
                    </div>
                  </div>
                  <div>
                    <label style={LBL}>Ready to Start By</label>
                    <input type="text" placeholder="e.g. 3 months, January 2025..." value={readyBy} onChange={e => setReadyBy(e.target.value)} style={IS} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={14} /> Back</button>
                  <button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: "#111", border: "none", borderRadius: 4, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Next <ArrowRight size={14} /></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Step 3 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 32 }}>Scope & budget.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <label style={LBL}>Budget Range</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {BUDGETS.map(b => (
                        <button key={b} onClick={() => setBudget(b)} style={{ padding: "8px 16px", fontSize: 13, border: `1px solid ${budget === b ? GOLD : "#333"}`, background: budget === b ? "rgba(197,160,89,0.1)" : "transparent", color: budget === b ? "#f0f0f0" : "#888", borderRadius: 4, cursor: "pointer" }}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={LBL}>Delivery Timeline</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {TIMELINES.map(t => (
                        <button key={t} onClick={() => setTimeline(t)} style={{ padding: "8px 16px", fontSize: 13, border: `1px solid ${timeline === t ? GOLD : "#333"}`, background: timeline === t ? "rgba(197,160,89,0.1)" : "transparent", color: timeline === t ? "#f0f0f0" : "#888", borderRadius: 4, cursor: "pointer" }}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={14} /> Back</button>
                  <button onClick={() => setStep(3)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: "#111", border: "none", borderRadius: 4, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Next <ArrowRight size={14} /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Step 4 of 4</p>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, marginBottom: 24 }}>Your contact details.</h2>
                <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 4, padding: 16, marginBottom: 24, fontSize: 13 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Review</div>
                  {[["Service", SERVICES.find(s => s.id === service)?.label], ["Budget", budget], ["Timeline", timeline]].filter(([,v]) => v).map(([k,v]) => (
                    <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#888" }}>{k}</span><span style={{ color: "#f0f0f0" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={LBL}>Full Name *</label>
                      <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={IS} />
                    </div>
                    <div>
                      <label style={LBL}>Phone *</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} style={IS} />
                    </div>
                  </div>
                  <div>
                    <label style={LBL}>Email *</label>
                    <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={IS} />
                  </div>
                  <div>
                    <label style={LBL}>Additional Message</label>
                    <textarea placeholder="Anything else you'd like us to know..." rows={3} value={message} onChange={e => setMessage(e.target.value)} style={{ ...IS, resize: "none" }} />
                  </div>
                </div>
                {error && (
                  <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 4, fontSize: 13, color: "#f87171" }}>{error}</div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#888", background: "none", border: "none", cursor: "pointer" }}><ArrowLeft size={14} /> Back</button>
                  <button onClick={handleSubmit} disabled={sending} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: sending ? "#888" : GOLD, color: "#111", border: "none", borderRadius: 4, padding: "12px 32px", fontSize: 14, cursor: sending ? "not-allowed" : "pointer", fontWeight: 500 }}>
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