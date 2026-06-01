-- ─────────────────────────────────────────────────────────────
--  Elias Nijs — backend schema (starting point)
--
--  Written for Postgres / Supabase. This is a sketch to get the data
--  model down on paper — adjust types and add Row Level Security
--  policies before going live. See docs/architecture.md.
-- ─────────────────────────────────────────────────────────────

-- Machines: the catalog. Each row can be for sale, for rent, or both.
create table if not exists machines (
  id           text primary key,          -- e.g. 'wood-chipper-650'
  name_nl      text not null,
  name_en      text,
  brand        text,
  specs        jsonb,                      -- flexible spec sheet
  description  jsonb,                      -- { nl, en }
  for_sale     boolean not null default false,
  sale_price   numeric,
  rentable     boolean not null default false,
  daily_rate   numeric,
  images       text[],
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Cars: unique oldtimers for sale. One row = one physical car.
create table if not exists cars (
  id            uuid primary key default gen_random_uuid(),
  make          text not null,
  model         text not null,
  year          int,
  mileage       int,
  vin           text,
  asking_price  numeric,
  description   jsonb,                     -- { nl, en }
  gallery       text[],
  status        text not null default 'available',  -- available | reserved | sold
  created_at    timestamptz not null default now()
);

-- Customers: people who book or enquire. SENSITIVE — restrict access.
create table if not exists customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- Bookings: a machine rented for a date range. Powers both the
-- customer rental app and the admin planning calendar.
create table if not exists bookings (
  id          uuid primary key default gen_random_uuid(),
  machine_id  text not null references machines(id),
  customer_id uuid references customers(id),
  start_date  date not null,
  end_date    date not null,
  status      text not null default 'pending',  -- pending | confirmed | cancelled | completed
  deposit     numeric,
  created_at  timestamptz not null default now(),
  check (end_date >= start_date)
);

-- Stop two confirmed bookings overlapping on the same machine.
-- (Requires the btree_gist extension on Postgres/Supabase.)
-- create extension if not exists btree_gist;
-- alter table bookings add constraint no_overlap
--   exclude using gist (
--     machine_id with =,
--     daterange(start_date, end_date, '[]') with &&
--   ) where (status in ('pending','confirmed'));
