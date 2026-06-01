# backend/functions — serverless endpoints

Small server-side functions for things that can't be trusted to the
browser. Deploy as Supabase Edge Functions, Netlify/Vercel functions, or
similar. Planned:

- `check-availability` — given a machine + date range, return whether it's free.
- `create-booking` — validate dates, prevent overlaps, write the booking.
- `payment-webhook` — receive deposit confirmation from Stripe, mark booking paid.
- `contact` — handle the website contact form, send the email.

Anything using a secret key (service-role key, Stripe secret) must run
here, **never** in the browser. Secrets come from `.env` / the host's
environment, never hard-coded.
