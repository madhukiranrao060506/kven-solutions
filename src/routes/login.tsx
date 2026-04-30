import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Portal — Kven Solutions" },
      { name: "description", content: "Sign in to your client portal to view live project progress and documents." },
    ],
  }),
  component: LoginPage,
});

type Mode = "signin" | "signup";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/portal" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/portal",
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/portal" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/portal" });
    if (result.error) {
      toast.error("Google sign-in failed.");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/portal" });
  };

  return (
    <SiteShell>
      <section className="pt-32 pb-20 px-6 lg:px-10 min-h-[80vh] grid place-items-center">
        <div className="w-full max-w-md">
          <Reveal>
            <Eyebrow>Client portal</Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl mt-4">
              {mode === "signin" ? "Welcome back." : "Create access."}
            </h1>
            <p className="text-sm text-muted-foreground mt-3">
              {mode === "signin" ? "View live project progress and documents." : "Set up your client account in moments."}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-strong rounded-sm p-8 mt-10">
              <form onSubmit={submit} className="space-y-4">
                {mode === "signup" && (
                  <Field label="Full name" value={name} onChange={setName} />
                )}
                <Field label="Email" type="email" value={email} onChange={setEmail} required />
                <Field label="Password" type="password" value={password} onChange={setPassword} required />
                <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm rounded-sm hover:bg-gold-soft transition-colors disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button onClick={google} disabled={loading} className="w-full border-gold-hairline rounded-sm px-6 py-3.5 text-sm hover:bg-primary/10 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                Continue with Google
              </button>

              <div className="text-center text-xs text-muted-foreground mt-6">
                {mode === "signin" ? (
                  <>Don't have access? <button onClick={() => setMode("signup")} className="text-primary hover:underline">Create account</button></>
                ) : (
                  <>Already have an account? <button onClick={() => setMode("signin")} className="text-primary hover:underline">Sign in</button></>
                )}
              </div>
            </div>
          </Reveal>

          <div className="text-center mt-8">
            <Link to="/" className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">← Return to site</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1.5 px-4 py-3 bg-card border border-border rounded-sm focus:outline-none focus:border-primary text-sm" />
    </div>
  );
}
