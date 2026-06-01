# packages/theme — shared brand & UI

Single source of truth for the brand so the marketing site, rental app and
admin dashboard all look the same. Move shared bits here over time:

- Color tokens & fonts (currently in `apps/web/data/config.js`)
- The SVG icon set (currently inline in `apps/web/script.js`)
- Shared CSS / base styles

Until there's a build step, apps can just copy or symlink from here. The
point is: define the brand once, not three times.
