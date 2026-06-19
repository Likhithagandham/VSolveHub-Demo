# VSolveHub — Phase 1 Plan

## 0. Locked decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript | One stack for UI and backend (Route Handlers / Server Actions). |
| Database | SQLite (single file) | Zero-setup, fast, perfect for demo with mock data. |
| Data layer | Prisma ORM | Type-safe queries, migrations, near-free sqlite → postgresql swap. |
| App structure | One app, route groups | `(customer)` + `(provider)` share one DB and component library. |
| Build scope | Phase 1 only (D-27) | Direct worker booking: dispatch archetypes A/B, provider type Captain. C–F designed in schema, not fully wired. |
| Styling | Vanilla CSS (`globals.css`) | Keep existing design system; no new CSS framework. |
| State | Server is source of truth | Session cookie only. No localStorage as database. |

**Why SQLite + Prisma is prod-shaped:** PRD target is PostgreSQL. Prisma models map 1:1 — migrating later is config + export, not a rewrite.

---

## 1. Tech stack

### Frontend (both websites)

| Concern | Tool / approach |
|---------|-----------------|
| Pages & routing | Next.js App Router — `(marketing)`, `(customer)`, `(provider)` |
| Rendering | Server Components for data pages; Client Components for interactivity |
| Catalog pages | Static/ISR where possible |
| Booking / track / dashboards | Client components + API routes |
| Styling | Vanilla CSS + `globals.css` design tokens |
| Icons | Inline SVG set (`components/ui/ServiceIcons.tsx`) |
| Forms & validation | Native forms + Zod (shared client/server) |
| Mobile-first | Responsive CSS; bottom-nav mobile, header desktop |

### Backend (same Next.js app)

| Concern | Tool / approach |
|---------|-----------------|
| API | Route Handlers (`app/api/**/route.ts`) |
| Mutations | Server Actions (simple forms); Route Handlers (provider portal) |
| DB access | Prisma Client — singleton in `lib/db` |
| Schema | `prisma/schema.prisma` + `prisma migrate` |
| Seeding | `prisma/seed.ts` — catalog from `services.md` + mock users/captains/bookings |
| Auth (mock) | Cookie session + mock OTP; server decides new vs returning |
| Booking dispatch | `lib/dispatch` — captain pool, 30s offer waves |
| 30s timer | Server tick or `/api/dispatch/tick`; UI countdown is cosmetic |
| Notifications | Logged to `notification_logs` (no real SMS/WhatsApp) |
| Money | Integer **paise**; format to ₹ in UI. No floats. |
| Validation | Zod in `lib/validation` |

---

## 3. Database tables (Phase 1)

Defined in `prisma/schema.prisma`. SQLite: UUID→cuid, JSONB→String, money→Int (paise), enums→TEXT.

### Identity & customer
- `users` — phone-unique identity (customer and/or provider)
- `sessions` — cookie session
- `addresses` — address book, one default per user
- `saved_services` — wishlist
- `wallets` + `wallet_transactions` — balance + ledger

### Catalog
- `service_categories` — top level (slug, name, tagline, icon, order)
- `service_sub_categories` — mid level
- `services` — bookable items (slug, price paise, archetype, tags, unit)
- `skills` + `skill_sub_categories` — captain ↔ service matching

### Supply (Captain only, Phase 1)
- `providers` — `provider_type = CAPTAIN`
- `workers` — captain profile (status, skills, is_online, location, rating)
- `worker_skills`, `worker_documents`, `worker_kyc`

### Bookings & dispatch
- `bookings` — ref, archetype A–F, `archetype_details` JSON, status, slot, address, snapshotted amounts, `idempotency_key`
- `booking_status_logs` — append-only audit
- `job_assignments` — 30s offer ledger (OFFERED→ACCEPTED/DECLINED/EXPIRED)
- `provider_requests` — inbox-pull for C–F (Phase 2 wiring)
- `job_earnings`, `ratings`, `cancellations`, `disputes`

### Platform & logs
- `otp_logs`, `notification_logs`, `cities`, `platform_config`
- `contact_enquiries`, `worker_applicants`

---

## 4. Service discovery (#1 UX priority)

**Goal:** customer finds the right service in seconds.

- Sticky smart search (name, sub-category, tags; fuzzy; grouped results)
- Popular search chips under search
- Category grid → sub-category pills → service cards (≤3 taps to book)
- Recently viewed + saved on home
- Deep links: `/services/[cat]/[slug]`
- Service cards: icon, name, sub-category, price range, single **Book Now** CTA

**Demo search:** server endpoint over `services` (name + tags), debounced client.

---

## 5. Booking is archetype-driven

Every service has archetype **A–F**. One column drives form, status machine, and fulfillment.

```
Customer taps Book → resolve(service) → archetype
  ├─ which FORM (flows/*Form.tsx)
  ├─ which STATUS MACHINE
  └─ which FULFILLMENT (push-dispatch vs inbox-pull)
```

Registry in `lib/booking/archetypes`.

### Archetypes

| Code | Used by | Customer asked | Status machine | Fulfillment | Phase 1 |
|------|---------|----------------|----------------|-------------|---------|
| **A** — Dispatch | Technician, Beauty, Cleaning, Vehicle | slot + address | SEARCHING → … → COMPLETED | Push-dispatch 30s waves | ✅ Full |
| **B** — Crew | Construction, Agri, labour | + headcount + days | same as A, per-crew | Push-dispatch per slot | ✅ Full |
| **C** — Staffing | Maids, cooks, drivers | role, schedule, pay, start | REQUESTED → … → CLOSED | Inbox-pull | ◐ enquiry form |
| **D** — Rental | Furniture, tents, tools | item, qty, dates, deposit | REQUESTED → … → CLOSED | Inbox-pull | ◐ enquiry form |
| **E** — Property | PG, hostels | sharing, move-in date | ENQUIRY → … → CLOSED | Inbox-pull | ◐ enquiry form |
| **F** — Quote | Events, media, painting | date, venue, guests | ENQUIRY → … → COMPLETED | Inbox-pull | ◐ enquiry form |

### Booking pipeline (`POST /api/bookings`)

1. **Resolve** — service + archetype config
2. **Validate** — archetype Zod schema → `archetype_details` JSON
3. **Auth gate** — verified session required
4. **Create** — atomic row, `booking_ref`, snapshotted `quoted_amount`, `idempotency_key`
5. **Log** — first `booking_status_logs` row
6. **Route** — A/B → push-dispatch; C–F → `provider_requests` (Phase 2)
7. **Confirm** — return ref + first status

### Fast path (Archetype A)
~2 taps: service locked, session auto-fill, slot chips + saved address → SEARCHING → live track.

---

## 8. Conventions

- Server is source of truth; browser holds session cookie only
- Money in **integer paise**; IST display, UTC storage
- Append-only `booking_status_logs` and `job_assignments`
- Zod shared client + server
- Forward-compatible schema (snake_case, nullable Phase-2 columns)
- Reproducible seed: `prisma migrate reset`

---

## Current implementation status

| Area | Status |
|------|--------|
| Next.js 15 + React 19 + TS + Vanilla CSS | ✅ Done |
| Customer UI (purple mobile shell from mockup) | ✅ Done |
| SQLite + Prisma (subset schema) | ✅ Partial |
| Mock OTP + cookie session | ✅ Done |
| Archetype A booking (slot + address) | ✅ Partial (simulated status, no real dispatch) |
| Archetype B + dispatch engine | ❌ Not built |
| Full catalog schema (sub-categories, skills) | ❌ Not built |
| Provider portal + Captain | ❌ Removed from MVP; Phase 1 target |
| Money in paise | ❌ Currently rupees in seed/UI |
| `services.md` real catalog | ⏳ Waiting on user |

**Next:** User provides actual service catalog → update `services.md`, `prisma/seed.ts`, and align schema with §3.
