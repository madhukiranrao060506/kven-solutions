import { Building2, Sofa, PartyPopper, Package, type LucideIcon } from "lucide-react";

export type Vertical = "civil" | "interior" | "events" | "supplies";

export interface VerticalInfo {
  id: Vertical;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  highlights: string[];
}

export const VERTICALS: VerticalInfo[] = [
  {
    id: "civil",
    slug: "civil",
    title: "Civil Works",
    tagline: "Foundations engineered to endure.",
    description:
      "Bridges, commercial structures, and infrastructure delivered with precision engineering and uncompromising quality control.",
    icon: Building2,
    image:
      "",
    highlights: ["Structural engineering", "Project management", "Safety-first execution", "BIM modelling"],
  },
  {
    id: "interior",
    slug: "interior",
    title: "Interior Design",
    tagline: "Spaces that feel inevitable.",
    description:
      "Bespoke residential and corporate interiors that pair tactile materials with restrained, modern composition.",
    icon: Sofa,
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Concept & 3D visualisation", "Bespoke joinery", "Lighting design", "Turnkey delivery"],
  },
  {
    id: "events",
    slug: "events",
    title: "Event Management",
    tagline: "Choreographed, end to end.",
    description:
      "Corporate galas, launches, and cultural moments — produced with cinematic detail and operational rigour.",
    icon: PartyPopper,
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Production design", "Stage & AV", "Guest journey", "Brand integration"],
  },
  {
    id: "supplies",
    slug: "supplies",
    title: "Contracts & Supplies",
    tagline: "Material logistics, simplified.",
    description:
      "Reliable sourcing of construction, finishing, and MEP materials with transparent pricing and on-site logistics.",
    icon: Package,
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Bulk procurement", "Vendor vetting", "Just-in-time delivery", "Long-term contracts"],
  },
];

export interface Project {
  id: string;
  title: string;
  category: Vertical;
  location: string;
  year: number;
  scale: string;
  scope: string;
  cover: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  summary: string;
}

export const PROJECTS: Project[] = [
  {
    id: "azure-skybridge",
    title: "Azure Skybridge",
    category: "civil",
    location: "Riyadh, KSA",
    year: 2024,
    scale: "220 m span",
    scope: "Cable-stayed pedestrian bridge",
    cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Span", value: "220 m" },
      { label: "Load class", value: "AASHTO HL-93" },
      { label: "Steel", value: "1,840 t" },
      { label: "Duration", value: "26 months" },
    ],
    summary:
      "A landmark pedestrian crossing combining post-tensioned concrete and weathered steel — designed for resilience and a 100-year lifecycle.",
  },
  {
    id: "atelier-noir",
    title: "Atelier Noir Residence",
    category: "interior",
    location: "Doha, QA",
    year: 2024,
    scale: "640 m²",
    scope: "Full interior fit-out",
    cover: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Area", value: "640 m²" },
      { label: "Materials", value: "Travertine, walnut, brass" },
      { label: "Lighting", value: "Tunable white DALI" },
      { label: "Duration", value: "9 months" },
    ],
    summary:
      "A monolithic stone shell warmed by walnut joinery and discreet brass detailing — every fixture custom-designed.",
  },
  {
    id: "lumen-gala",
    title: "Lumen Gala 2024",
    category: "events",
    location: "Dubai, UAE",
    year: 2024,
    scale: "1,200 guests",
    scope: "Production design & delivery",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Guests", value: "1,200" },
      { label: "Stage", value: "180° immersive" },
      { label: "Crew", value: "140 specialists" },
      { label: "Run-of-show", value: "6 hours" },
    ],
    summary:
      "An immersive corporate gala combining kinetic lighting, generative visuals, and a hand-built circular stage.",
  },
  {
    id: "meridian-tower",
    title: "Meridian Tower",
    category: "civil",
    location: "Muscat, OM",
    year: 2023,
    scale: "32 floors",
    scope: "Mixed-use structural works",
    cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Floors", value: "32" },
      { label: "Concrete", value: "42,000 m³" },
      { label: "Duration", value: "34 months" },
      { label: "Certification", value: "LEED Gold" },
    ],
    summary: "A high-rise mixed-use tower delivered ahead of schedule with full LEED Gold compliance.",
  },
  {
    id: "veranda-suites",
    title: "Veranda Hotel Suites",
    category: "interior",
    location: "Beirut, LB",
    year: 2023,
    scale: "48 keys",
    scope: "Hospitality interiors",
    cover: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Keys", value: "48" },
      { label: "Palette", value: "Onyx, ivory, oak" },
      { label: "Duration", value: "11 months" },
    ],
    summary: "Boutique hotel suites with a quiet, residential warmth — every room individually composed.",
  },
  {
    id: "summit-launch",
    title: "Summit Product Launch",
    category: "events",
    location: "Riyadh, KSA",
    year: 2023,
    scale: "600 guests",
    scope: "Brand launch event",
    cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80",
    ],
    specs: [
      { label: "Guests", value: "600" },
      { label: "Format", value: "Keynote + reveal" },
      { label: "Crew", value: "70" },
    ],
    summary: "A precision-timed product reveal blending architectural staging with cinematic lighting.",
  },
];

export const HERO_FRAMES = [
  { src: "/images/hero1.jpeg", label: "Civil" },
  { src: "/images/hero2.jpeg", label: "Interior" },
  { src: "/images/hero3.jpeg", label: "Events" },
  { src: "/images/hero4.jpeg", label: "Supplies" },
  { src: "/images/hero5.jpeg", label: "Civil" },
  { src: "/images/hero6.jpeg", label: "Interior" },
  { src: "/images/hero7.jpeg", label: "Events" },
  { src: "/images/hero8.jpeg", label: "Supplies" },
  { src: "/images/hero9.jpeg", label: "Civil" },
  { src: "/images/hero10.jpeg", label: "Interior" },
  { src: "/images/hero11.jpeg", label: "Events" },
  { src: "/images/hero12.jpeg", label: "Supplies" },
  { src: "/images/hero13.jpeg", label: "Civil" },
  { src: "/images/hero14.jpeg", label: "Interior" },
  { src: "/images/hero15.jpeg", label: "Events" },
  { src: "/images/hero16.jpeg", label: "Supplies" },
  { src: "/images/hero17.jpeg", label: "Civil" },
  { src: "/images/hero18.jpeg", label: "Interior" },
  { src: "/images/hero19.jpeg", label: "Events" },
];

export const PARTNERS = [
  "ARAMCO", "QATARI DIAR", "EMAAR", "DAMAC", "MAJID AL FUTTAIM",
  "SOBHA", "ALDAR", "ROSHN", "RED SEA GLOBAL", "DIRIYAH",
];

export const TESTIMONIALS = [
  {
    quote:
      "Kven delivered a turnkey HQ fit-out three weeks ahead of schedule. The execution discipline matched the design sensibility — rare combination.",
    author: "Layla Hassan",
    role: "COO, Northwind Capital",
  },
  {
    quote:
      "From structural engineering to event production, every touchpoint felt considered. They are the only team we re-engage without RFP.",
    author: "Marcus Reilly",
    role: "Head of Real Estate, Helios Group",
  },
  {
    quote:
      "The supply contract simplified our procurement across four sites. Single point of accountability, transparent pricing.",
    author: "Aisha Mansour",
    role: "Procurement Director, Solis Hospitality",
  },
];

export const SUPPLIES = [
  { id: "cem-opc-43", name: "Ordinary Portland Cement (OPC 43)", category: "Cement", unit: "tonne", lead: "3 days", image: "https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&w=900&q=80" },
  { id: "cem-opc-53", name: "Ordinary Portland Cement (OPC 53)", category: "Cement", unit: "tonne", lead: "3 days", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80" },
  { id: "steel-tmt-12", name: "TMT Rebar Ø12mm Fe500D", category: "Steel", unit: "tonne", lead: "5 days", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80" },
  { id: "steel-beam-i", name: "Structural I-Beam (IPE 200)", category: "Steel", unit: "metre", lead: "7 days", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80" },
  { id: "fin-marble-cal", name: "Calacatta Marble Slab", category: "Finishes", unit: "m²", lead: "10 days", image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80" },
  { id: "fin-oak-eng", name: "Engineered European Oak", category: "Finishes", unit: "m²", lead: "12 days", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80" },
  { id: "fix-brass-tap", name: "Solid Brass Mixer Tap", category: "Fixtures", unit: "unit", lead: "14 days", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80" },
  { id: "fix-led-track", name: "LED Magnetic Track System", category: "Fixtures", unit: "metre", lead: "9 days", image: "https://images.unsplash.com/photo-1565636192335-6db7a59ad7e1?auto=format&fit=crop&w=900&q=80" },
  { id: "mep-vrf-12", name: "VRF Outdoor Unit 12HP", category: "MEP", unit: "unit", lead: "21 days", image: "https://images.unsplash.com/photo-1591238372338-22d22e832e2c?auto=format&fit=crop&w=900&q=80" },
  { id: "mep-cable-cu", name: "Copper Power Cable 4×16mm²", category: "MEP", unit: "metre", lead: "5 days", image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=900&q=80" },
];

export const SUPPLY_CATEGORIES = ["All", "Cement", "Steel", "Finishes", "Fixtures", "MEP"] as const;