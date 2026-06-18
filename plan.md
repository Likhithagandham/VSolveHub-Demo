# VSolveHub

Multi-sided marketplace for home services — customer booking + provider partner portal.

## Quick start

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Structure

- `app/(customer)` — customer-facing website
- `app/(provider)/partner` — provider partner portal
- `app/api` — Route Handlers
- `lib/booking/archetypes` — booking flow registry (A–F)
- `lib/provider/modes` — provider mode registry

See `plan.md` and `services.md` for product docs.
