# Kven Solutions — Luxury Corporate Site

A premium, multi-page experience for a multi-disciplinary firm (Civil Works, Interior Design, Event Management, Contracts & Supplies). Modern Industrial Elegance: Deep Charcoal `#1A1A1A`, Champagne Gold `#C5A059`, Crisp White, with dark-mode-first styling, refined serif display type paired with a clean sans, and Framer Motion micro-interactions throughout.

## Design system

- Palette: Deep Charcoal background, Champagne Gold accents, Crisp White text, muted graphite for surfaces, hairline gold dividers.
- Typography: serif display (Playfair Display) for headings; Inter for body and UI.
- Motion: scroll-reveals, parallax, magnetic hover on CTAs, page transitions, smooth section morph between Civil → Interior in the hero.
- Global: glassmorphic sticky header, scroll progress bar at the top, custom cursor accent on desktop, dark/light toggle (dark default).

## Site architecture (TanStack routes)

```text
/                       Cinematic homepage
/services               Overview of all four verticals
/services/civil         Civil Works detail
/services/interior      Interior Design detail
/services/events        Event Management detail
/services/supplies      Contracts & Supplies detail
/portfolio              Filterable gallery (Civil / Interior / Events) with Quick View modals
/supplies               Searchable materials catalog with "Add to Inquiry" cart
/rfq                    Multi-step adaptive Request for Quote
/sustainability         Green Score / carbon initiatives ledger
/about                  Company story, leadership, values
/contact                Contact + map + direct lines
/login                  Client portal sign-in
/portal                 Authenticated client dashboard (project progress, documents, RFQ history)
```

Each route gets unique SEO metadata (title, description, og tags).

## Homepage sections (in order)

1. Glassmorphic sticky header with mega-menu grouping the four verticals (icon + one-line description per item) and a "Get in Touch" gold CTA.
2. Cinematic hero — full-bleed crossfading image slider (bridge → luxury lounge → event hall → warehouse) with Ken Burns zoom, gold gradient overlay, headline "Building the Foundations of Excellence," subline, dual CTAs ("Explore Portfolio", "Request a Quote"), and a "Scroll to Explore" micro-animation.
3. Civil → Interior cohesive transition: a horizontally split parallax band where the left (steel/concrete texture) morphs into the right (warm interior) as the user scrolls.
4. Vertical Bento Grid — interactive 4-card grid; on hover each card expands to reveal a summary and "View Projects" CTA.
5. Featured portfolio strip (6 curated projects with Quick View modals).
6. CSS 3D "Digital Twin" section — layered floor-plan mockup with mouse-tilt parallax, animated gold wireframe overlay, and a caption about BIM / digital twin capability.
7. Impact counters — scroll-triggered animated stats (Projects Completed, Tons of Material Supplied, Events Managed, Years of Excellence).
8. Sustainability Ledger preview — Green Score gauge, 3 highlight metrics, link to full page.
9. Process timeline — 4-step engagement flow (Consult → Design → Execute → Handover).
10. Client logos marquee — infinite-scroll partner strip.
11. Testimonials carousel — refined quote cards.
12. CTA band — "Start your project" → /rfq.
13. Footer — verticals, company, legal, social, newsletter, address.

## Portfolio engine (/portfolio)

- Filter chips: All, Civil, Interior, Events.
- Masonry grid with lazy-loaded images and hover lift.
- Quick View modal: high-res gallery (swipeable), project meta (location, year, scope, scale), tech specs, and a related-projects rail.

## RFQ system (/rfq)

Multi-step adaptive form with progress indicator:
1. Choose service vertical (Civil / Interior / Events / Supplies).
2. Adaptive details:
   - Civil → site area, project type, location, target start date.
   - Interior → space type, square footage, style preference, budget band.
   - Events → guest count, event type, venue status, date.
   - Supplies → category, quantities, delivery location, recurring vs one-off.
3. Timeline + budget range (sliders).
4. Contact details + optional file upload (drawings/briefs).
5. Review + submit → stored in Supabase, confirmation screen with reference number.

## Supplies catalog (/supplies)

- Search bar + category filters (Cement, Steel, Finishes, Fixtures, MEP, etc.).
- Card grid with spec sheet preview.
- "Add to Inquiry" builds a floating cart; checkout submits a consolidated inquiry to Supabase.

## Client portal (/login → /portal)

- Sleek minimal login (email + password, Google sign-in).
- Authenticated dashboard: active projects with progress bars, milestone timeline, document downloads, RFQ history, account settings.
- Roles stored in a separate `user_roles` table; a `has_role` security-definer function gates admin views.

## Backend (Supabase via Lovable Cloud)

Tables:
- `profiles` (id → auth.users, full_name, company, phone, avatar_url)
- `user_roles` (user_id, role enum: admin | client)
- `rfq_submissions` (id, user_id nullable, vertical, payload jsonb, status, reference_code, created_at)
- `supply_inquiries` (id, user_id nullable, items jsonb, contact jsonb, status, created_at)
- `projects` (id, client_id, title, vertical, status, progress_pct, started_at, eta)
- `project_documents` (id, project_id, name, storage_path, uploaded_at)

RLS:
- Clients can read only their own profile, projects, documents, and submissions.
- Admins (via `has_role(auth.uid(), 'admin')`) can read all.
- Anonymous users may insert into `rfq_submissions` and `supply_inquiries` (rate-limited via simple checks).

Auth: email/password + Google. Auto-create profile + default `client` role on signup via trigger. Email redirects set to `window.location.origin`.

## Technical notes

- TanStack Start file-based routes; each section page is its own route file with unique `head()` meta.
- Framer Motion for reveals, parallax, mega-menu, page transitions, marquee.
- All imagery from curated Unsplash sources, served at responsive sizes with `loading="lazy"` and `decoding="async"`; hero uses preloaded primary frame for LCP.
- No Three.js — the "Digital Twin" section uses layered CSS 3D transforms + mouse parallax to keep Lighthouse ≥ 95.
- Tailwind tokens extended via `src/styles.css` with the charcoal/gold palette in oklch; dark theme is default with a light variant available.
- Lucide icons throughout.
- Form validation via zod on both client and server function handlers.

## Out of scope (this pass)

- Real document storage upload UI in admin (read-only viewer for clients only).
- Payment processing.
- Multi-language.

After approval, I'll enable Lovable Cloud, scaffold the schema and routes, then build the homepage first (with the Civil → Interior transition polished), followed by the inner pages, portfolio, RFQ, supplies, and portal.