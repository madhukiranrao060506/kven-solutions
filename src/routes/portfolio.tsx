import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

const supabase = createClient(
  "https://alxvakgaosrpnudmxerw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHZha2dhb3NycG51ZG14ZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjIxNDUsImV4cCI6MjEwODMzODE0NX0.y4wMaVGjL9iaH_llYGE0Q4pcutpFM7AYaTFWWecgc18"
);

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil" },
  { id: "interior", label: "Interior" },
  { id: "events", label: "Events" },
  { id: "supplies", label: "Supplies" },
];

const CATEGORY_LABELS: Record<string, string> = {
  civil: "Civil Works",
  interior: "Interior Design",
  events: "Event Management",
  supplies: "Contracts & Supplies",
};

function PortfolioPage() {
  const [active, setActive] = useState("all");
  const [images, setImages] = useState<{ src: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const categories = ["civil", "interior", "events", "supplies"];
      const allImages: { src: string; category: string }[] = [];

      for (const cat of categories) {
        const { data, error } = await supabase.storage
          .from("works-images")
          .list(cat, { sortBy: { column: "created_at", order: "desc" } });

        if (!error && data) {
          data.forEach((file) => {
            const { data: urlData } = supabase.storage
              .from("works-images")
              .getPublicUrl(`${cat}/${file.name}`);
            allImages.push({ src: urlData.publicUrl, category: cat });
          });
        }
      }

      setImages(allImages);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const filtered = active === "all"
    ? images
    : images.filter((img) => img.category === active);

  return (
    <SiteShell>
      <section className="relative py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 leading-tight">
              Built work, <span className="italic text-gradient-gold">curated.</span>
            </h1>
          </Reveal>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-12 mb-16 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-6 py-2 text-xs uppercase tracking-[0.2em] border transition-all ${
                  active === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          {loading ? (
            <div className="text-muted-foreground text-sm py-20 text-center">
              Loading portfolio...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-muted-foreground text-sm mb-4">
                No images uploaded yet for this category.
              </div>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 text-primary text-sm hover:gap-3 transition-all"
              >
                Upload images in Admin Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((img, i) => (
                <Reveal key={img.src} delay={i * 0.04}>
                  <div className="group relative overflow-hidden rounded-sm aspect-[4/5]">
                    <img
                      src={img.src}
                      alt={CATEGORY_LABELS[img.category]}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                        {CATEGORY_LABELS[img.category]}
                      </div>
                      <h3 className="font-display text-2xl mt-2">Kven Solutions</h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        Visakhapatnam · 2024
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}