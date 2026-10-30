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
    description: "Bridges, commercial structures, and infrastructure delivered with precision engineering and uncompromising quality control.",
    icon: Building2,
    image: "",
    highlights: ["Structural engineering", "Project management", "Safety-first execution", "BIM modelling"],
  },
  {
    id: "interior",
    slug: "interior",
    title: "Interior Design",
    tagline: "Spaces that feel inevitable.",
    description: "Bespoke residential and corporate interiors that pair tactile materials with restrained, modern composition.",
    icon: Sofa,
    image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Concept & 3D visualisation", "Bespoke joinery", "Lighting design", "Turnkey delivery"],
  },
  {
    id: "events",
    slug: "events",
    title: "Event Management",
    tagline: "Choreographed, end to end.",
    description: "Corporate galas, launches, and cultural moments — produced with cinematic detail and operational rigour.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
    highlights: ["Production design", "Stage & AV", "Guest journey", "Brand integration"],
  },
  {
    id: "supplies",
    slug: "supplies",
    title: "Contracts & Supplies",
    tagline: "Material logistics, simplified.",
    description: "Reliable sourcing of construction, finishing, and MEP materials with transparent pricing and on-site logistics.",
    icon: Package,
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80",
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

export const PROJECTS: Project[] = [];

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

export const TESTIMONIALS: { quote: string; author: string; role: string }[] = [];

export const SUPPLIES: never[] = [];

export const SUPPLY_CATEGORIES = ["All", "Cement", "Steel", "Finishes", "Fixtures", "MEP"] as const;