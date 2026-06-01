# Elias Nijs — tech home base

Website and (in progress) online tools for Elias Nijs: forestry machinery,
machine rental, service, and oldtimer/classic-car sales.

## Repo layout

```
apps/
  web/        Public marketing site + car listings (live; static HTML/CSS/JS)
  rental/     "Rent a machine online" booking flow (to build)
  admin/      Rental planning dashboard, login-only (to build)
packages/
  theme/      Brand: colors, fonts, icons — shared by all apps
  model/      Shared data shapes: Machine, Car, Booking, Customer
backend/      Database schema + serverless functions
docs/         Architecture + security guidance
knowledge/    Committed reference material (safe to be in the repo)
private/      Local-only files (gitignored — never leaves your computer)
```

## Running the website locally

It's a static site — no build step. From `apps/web`:

```bash
cd apps/web
python3 -m http.server 8000   # then open http://localhost:8000
```

## Where do I put a file? (important)

Decide sensitivity first — full guide in **[docs/security.md](docs/security.md)**:

| File is…                          | Put it in    | Committed? |
|-----------------------------------|--------------|------------|
| Safe reference material           | `knowledge/` | yes        |
| Sensitive (customers, prices…)    | `private/`   | no         |
| A secret (API key, password)      | `.env`       | no         |
| Versioned but must stay secret    | git-crypt    | encrypted  |

`.env` starts from `.env.example` (`cp .env.example .env`).

## Plan

See **[docs/architecture.md](docs/architecture.md)** for the design and the
step-by-step plan to add rental booking, planning, and car sales.
