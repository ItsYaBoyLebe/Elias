# apps/rental — "rent a machine online" (customer-facing)

Not built yet. This app will let customers:
1. Browse rentable machines (reads the same catalog as `apps/web`).
2. Pick dates and see availability (reads bookings from the backend).
3. Reserve — creating a booking, optionally with a deposit payment.

It is the **public** side of the booking system. The **private** side
(your brother managing those bookings) lives in `apps/admin`. Both read
and write the same `bookings` table in `backend/`.

Stack suggestion: keep it a small static + JS app like `apps/web`, talking
to the backend (Supabase) over its JS client. No server to run yourself.
