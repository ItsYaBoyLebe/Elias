# private/ — local-only files

Anything you put in this folder **stays on your computer** and is never
committed or pushed to GitHub. The `.gitignore` ignores everything here
except this README.

Use it for the most sensitive stuff:

- Customer lists, contact details, contracts
- Pricing strategy, cost prices, margins
- Personal notes, passwords you jotted down, scans of documents
- Anything you'd be uncomfortable seeing in a public repo

## The three tiers of sensitivity (full details in `docs/security.md`)

| Where it goes      | Committed? | Use for                                            |
|--------------------|------------|----------------------------------------------------|
| `knowledge/`       | yes        | Reference docs that are safe to be public          |
| `private/` (here)  | no         | Sensitive files that must never leave your machine |
| `.env`             | no         | API keys, database passwords, secret tokens        |
| git-crypt files    | encrypted  | Files you want versioned but kept secret           |

If you ever need a private file on another machine, copy it manually
(USB, encrypted cloud, password manager) — not through git.
