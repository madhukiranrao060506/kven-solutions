import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { LogOut, FileText, Building2, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Client Portal — Kven Solutions" },
      { name: "description", content: "Live project progress, documents, and submissions." },
    ],
  }),
  component: PortalPage,
});

interface ProjectRow {
  id: string;
  title: string;
  vertical: string;
  status: string;
  progress_pct: number;
  started_at: string | null;
  eta: string | null;
}

interface RFQRow {
  id: string;
  reference_code: string;
  vertical: string;
  status: string;
  created_at: string;
}

function PortalPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [rfqs, setRfqs] = useState<RFQRow[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/login" });
        return;
      }
      if (!mounted) return;
      setEmail(sess.session.user.email ?? "");
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("projects").select("id,title,vertical,status,progress_pct,started_at,eta").order("created_at", { ascending: false }),
        supabase.from("rfq_submissions").select("id,reference_code,vertical,status,created_at").order("created_at", { ascending: false }),
      ]);
      if (!mounted) return;
      setProjects((p as ProjectRow[]) ?? []);
      setRfqs((r as RFQRow[]) ?? []);
      setLoading(false);
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <SiteShell>
        <div className="pt-40 grid place-items-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="pt-40 pb-12 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] flex justify-between items-end flex-wrap gap-4">
          <Reveal>
            <Eyebrow>Client portal</Eyebrow>
            <h1 className="font-display text-4xl sm:text-5xl mt-4">Welcome back.</h1>
            <p className="text-sm text-muted-foreground mt-2">{email}</p>
          </Reveal>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground border-gold-hairline px-4 py-2.5 rounded-sm">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-2xl mb-6">Active projects</h2>
          {projects.length === 0 ? (
            <EmptyState icon={Building2} title="No active projects yet" body="Once we kick off your first project, you'll see live progress here." cta={{ label: "Open an RFQ", to: "/rfq" }} />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {projects.map((p) => (
                <div key={p.id} className="glass rounded-sm p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.vertical}</div>
                      <h3 className="font-display text-xl mt-2">{p.title}</h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 border-gold-hairline rounded-sm">{p.status.replace("_", " ")}</span>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span><span>{p.progress_pct}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-deep to-gold-soft" style={{ width: `${p.progress_pct}%` }} />
                    </div>
                  </div>
                  {(p.started_at || p.eta) && (
                    <div className="grid grid-cols-2 gap-4 text-xs mt-6 pt-4 border-t border-border">
                      <div><div className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Started</div><div className="mt-1">{p.started_at ?? "—"}</div></div>
                      <div><div className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">ETA</div><div className="mt-1">{p.eta ?? "—"}</div></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-2xl mb-6">Submission history</h2>
          {rfqs.length === 0 ? (
            <EmptyState icon={FileText} title="No submissions yet" body="Your RFQs and supply inquiries will appear here." />
          ) : (
            <div className="border-gold-hairline rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40">
                  <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs.map((r) => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="p-4 font-mono text-primary">{r.reference_code}</td>
                      <td className="p-4 capitalize">{r.vertical}</td>
                      <td className="p-4 capitalize">{r.status}</td>
                      <td className="p-4 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function EmptyState({ icon: Icon, title, body, cta }: { icon: typeof Building2; title: string; body: string; cta?: { label: string; to: string } }) {
  return (
    <div className="border-gold-hairline rounded-sm p-12 text-center">
      <div className="mx-auto h-12 w-12 grid place-items-center rounded-sm border-gold-hairline text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-display text-xl mt-6">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">{body}</p>
      {cta && (
        <Link to={cta.to} className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-primary-foreground text-sm rounded-sm">
          {cta.label}
        </Link>
      )}
    </div>
  );
}
