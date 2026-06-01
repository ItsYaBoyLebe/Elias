# packages/model — shared data shapes

The vocabulary every app agrees on. Define each entity once here so the
catalog, booking flow and admin panel never drift apart.

Core entities:

- **Machine** — a rentable/sellable machine. Fields like `id`, `name`,
  `brand`, `specs`, `forSale`, `rentable`, `dailyRate`, `salePrice`,
  `images`.
- **Car** — a unique oldtimer for sale: `id`, `make`, `model`, `year`,
  `mileage`, `vin`, `askingPrice`, `gallery`, `status` (available / reserved / sold).
- **Booking** — a time-bound rental: `id`, `machineId`, `customerId`,
  `startDate`, `endDate`, `status`, `deposit`.
- **Customer** — `id`, `name`, `email`, `phone`. (Note: real customer
  records are sensitive — see `docs/security.md`.)

See `backend/schema.sql` for how these map to database tables.
