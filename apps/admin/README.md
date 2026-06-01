# apps/admin — rental planning dashboard (internal)

Not built yet. Login-protected tool for your brother to:
- See a calendar of all machine bookings (the rental planning view).
- Add / edit / cancel bookings manually (phone & walk-in customers).
- Mark machines as in service / unavailable.
- Manage the car listings for sale.

This is the **private** side of the same booking system that `apps/rental`
exposes to customers. It must sit behind authentication — never ship it
without a login.
