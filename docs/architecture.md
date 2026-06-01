# Architecture

## Why this layout

The public website is read-only and simple. The features we want to add —
online machine rental, rental planning, and selling cars — are dynamic and
need stored state. So we keep the simple parts simple and isolate the
dynamic parts behind clear boundaries.

Two insights drive the structure:

1. **"Rent a machine online" and "rental planning" are one system seen from
   two sides.** Customers create bookings; your brother manages them. They
   share one source of truth: a bookings/availability table. So
   `apps/rental` (public) and `apps/admin` (private) both talk to the same
   `backend`.
2. **"Selling cars" is a catalog with leads, not a webshop.** Oldtimers are
   unique, low-volume items. They need good listings + a reservation/enquiry
   form, not a shopping cart.

## The pieces

```
apps/web      Public marketing site + car listings  (the current site, static)
apps/rental   Customer booking flow                  (to build)
apps/admin    Rental planning dashboard, login-only  (to build)
packages/theme  Brand: colors, fonts, icons — defined once, shared
packages/model  Shared data shapes: Machine, Car, Booking, Customer
backend/      Database schema + serverless functions (bookings, payments)
docs/         This file + security guidance
knowledge/    Committed reference material (safe to be in the repo)
private/      Local-only sensitive files (gitignored, never pushed)
```

## Recommended backend: managed (Supabase)

For a small business where you're the part-time tech person, a managed
backend gives you database + auth + file storage with almost no server code
to maintain. Supabase fits well, but Firebase or similar work too. The
`apps/web` site can stay deployed as plain static files (Netlify, Vercel, or
Cloudflare Pages — all free for this size).

## Suggested phasing

1. **Now (done):** restructure the repo; keep the existing site running
   under `apps/web`.
2. **Catalog:** split machine data into for-sale vs rentable fields, and add
   a `cars` dataset for the oldtimers. Show both on the public site.
3. **Backend:** stand up Supabase, apply `backend/schema.sql`, load the
   catalog.
4. **Booking:** build `apps/rental` (date picker → availability → reserve).
5. **Admin:** build `apps/admin` (the planning calendar) behind a login.
6. **Payments (optional):** add deposit collection via Stripe + a webhook.
