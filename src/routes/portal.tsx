import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://alxvakgaosrpnudmxerw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHZha2dhb3NycG51ZG14ZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjIxNDUsImV4cCI6MjEwODMzODE0NX0.y4wMaVGjL9iaH_llYGE0Q4pcutpFM7AYaTFWWecgc18"
);

const CATEGORIES = [
  { id: "civil", label: "Civil Works", icon: "🏗" },
  { id: "interior", label: "Interior Design", icon: "🏛" },
  { id: "events", label: "Event Management", icon: "🎪" },
  { id: "supplies", label: "Contracts & Supplies", icon: "📦" },
  { id: "hero", label: "Hero Slideshow", icon: "🖼" },
];

export const Route = createFileRoute("/portal")({
  component: PortalPage,
});

function PortalPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [category, setCategory] = useState("civil");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const ADMIN_PASSWORD = "kven2024";

  useEffect(() => {
    if (loggedIn) fetchImages();
  }, [loggedIn, category]);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("works-images")
      .list(category, { sortBy: { column: "created_at", order: "desc" } });
    if (error) {
      setMessage("Error loading images");
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage("");

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `${category}/${fileName}`;

      const { error } = await supabase.storage
        .from("works-images")
        .upload(filePath, file);

      if (error) {
        setMessage(`Error uploading ${file.name}`);
      }
    }

    setMessage(`✅ ${files.length} image(s) uploaded successfully!`);
    setUploading(false);
    fetchImages();
    e.target.value = "";
  };

  const handleDelete = async (fileName: string) => {
    const { error } = await supabase.storage
      .from("works-images")
      .remove([`${category}/${fileName}`]);

    if (error) {
      setMessage("Error deleting image");
    } else {
      setMessage("🗑 Image deleted successfully!");
      setDeleteConfirm(null);
      fetchImages();
    }
  };

  const getImageUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from("works-images")
      .getPublicUrl(`${category}/${fileName}`);
    return data.publicUrl;
  };

  // Login screen
  if (!loggedIn) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Jost', sans-serif"
      }}>
        <div style={{
          background: "#0d0d0d", border: "1px solid #c9a84c33",
          padding: "48px", width: "360px", textAlign: "center"
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "24px", color: "#c9a84c",
            letterSpacing: "3px", marginBottom: "8px"
          }}>KVEN SOLUTIONS</div>
          <div style={{ fontSize: "11px", color: "#4a3f30", letterSpacing: "2px", marginBottom: "40px" }}>
            ADMIN PORTAL
          </div>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && password === ADMIN_PASSWORD && setLoggedIn(true)}
            style={{
              width: "100%", background: "#111",
              border: "1px solid #c9a84c33", color: "#f0e6c8",
              padding: "14px 16px", fontSize: "13px",
              outline: "none", marginBottom: "16px",
              fontFamily: "'Jost', sans-serif", boxSizing: "border-box"
            }}
          />

          {password && password !== ADMIN_PASSWORD && (
            <div style={{ color: "#c9a84c", fontSize: "12px", marginBottom: "12px" }}>
              ⚠️ Incorrect password
            </div>
          )}

          <button
            onClick={() => password === ADMIN_PASSWORD && setLoggedIn(true)}
            style={{
              width: "100%", padding: "14px",
              background: "#c9a84c", border: "none",
              color: "#0a0a0a", fontSize: "11px",
              letterSpacing: "3px", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Jost', sans-serif",
              fontWeight: 500
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      fontFamily: "'Jost', sans-serif", color: "#f0e6c8"
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 48px",
        borderBottom: "1px solid #c9a84c22",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#0d0d0d"
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "20px", color: "#c9a84c", letterSpacing: "3px"
        }}>
          KVEN SOLUTIONS — Admin Portal
        </div>
        <button
          onClick={() => setLoggedIn(false)}
          style={{
            background: "none", border: "1px solid #c9a84c33",
            color: "#4a3f30", padding: "8px 20px",
            fontSize: "11px", letterSpacing: "2px",
            textTransform: "uppercase", cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: "48px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "5px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "8px" }}>
          Manage
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "36px", fontWeight: 300, marginBottom: "48px"
        }}>
          Upload Works Images
        </h1>

        {/* Category Selection */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "9px", color: "#4a3f30", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
            Select Category
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                style={{
                  padding: "10px 20px",
                  background: category === cat.id ? "#c9a84c11" : "#0d0d0d",
                  border: `1px solid ${category === cat.id ? "#c9a84c" : "#c9a84c22"}`,
                  color: category === cat.id ? "#c9a84c" : "#4a3f30",
                  fontSize: "12px", cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                  transition: "all 0.2s"
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div style={{
          border: "2px dashed #c9a84c33",
          padding: "48px", textAlign: "center",
          marginBottom: "32px", background: "#0d0d0d",
          cursor: "pointer"
        }}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📤</div>
          <div style={{ fontSize: "16px", color: "#c9a84c", marginBottom: "8px" }}>
            Click to upload images
          </div>
          <div style={{ fontSize: "12px", color: "#4a3f30" }}>
            Supports JPG, JPEG, PNG, WEBP — Multiple files allowed
          </div>
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </div>

        {uploading && (
          <div style={{ textAlign: "center", color: "#c9a84c", marginBottom: "24px", fontSize: "14px" }}>
            ⏳ Uploading...
          </div>
        )}

        {message && (
          <div style={{
            padding: "12px 16px", border: "1px solid #c9a84c33",
            color: "#c9a84c", fontSize: "13px", marginBottom: "32px"
          }}>
            {message}
          </div>
        )}

        {/* Images Grid */}
        <div style={{ fontSize: "9px", color: "#4a3f30", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
          {images.length} image(s) in {CATEGORIES.find(c => c.id === category)?.label}
        </div>

        {loading ? (
          <div style={{ color: "#4a3f30", fontSize: "13px" }}>Loading images...</div>
        ) : images.length === 0 ? (
          <div style={{ color: "#4a3f30", fontSize: "13px" }}>No images uploaded yet for this category.</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px"
          }}>
            {images.map(img => (
              <div key={img.name} style={{ position: "relative", background: "#0d0d0d", border: "1px solid #c9a84c22" }}>
                <img
                  src={getImageUrl(img.name)}
                  alt={img.name}
                  style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "8px" }}>
                  <div style={{ fontSize: "10px", color: "#4a3f30", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {img.name}
                  </div>
                  {deleteConfirm === img.name ? (
                    <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                      <button
                        onClick={() => handleDelete(img.name)}
                        style={{
                          flex: 1, padding: "6px", background: "#ff4444",
                          border: "none", color: "white", fontSize: "10px",
                          cursor: "pointer", fontFamily: "'Jost', sans-serif"
                        }}
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          flex: 1, padding: "6px", background: "transparent",
                          border: "1px solid #c9a84c33", color: "#4a3f30",
                          fontSize: "10px", cursor: "pointer",
                          fontFamily: "'Jost', sans-serif"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(img.name)}
                      style={{
                        width: "100%", marginTop: "8px", padding: "6px",
                        background: "transparent", border: "1px solid #ff444433",
                        color: "#ff6666", fontSize: "10px",
                        cursor: "pointer", fontFamily: "'Jost', sans-serif"
                      }}
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}