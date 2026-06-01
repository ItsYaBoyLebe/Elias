# Handling private & sensitive files

This repo is your tech home base, so it will collect notes, data and
secrets over time. The rule is simple: **decide the sensitivity of a file
before you save it, and put it in the right place.** There are four tiers.

## Tier 1 — Safe to commit → `knowledge/`

Reference material that anyone with repo access could see without harm:
how-to notes, deploy instructions, public spec sheets, architecture
decisions. Just drop the file in `knowledge/` and commit it normally.

## Tier 2 — Private, local-only → `private/`

Files that must **never** leave your computer: customer lists, pricing and
margins, contracts, personal notes, document scans. Put them in `private/`.
The `.gitignore` ignores everything in that folder (except its README), so
git will never track or push them. They live only on your disk.

If you need one on another machine, move it manually (encrypted USB,
password manager, encrypted cloud) — not through this repo.

## Tier 3 — Secrets / credentials → `.env`

API keys, database passwords, tokens. These never go in code and never get
committed. Workflow:

```bash
cp .env.example .env     # make your local copy
# edit .env, fill in the real values
```

`.env` is gitignored; only `.env.example` (with placeholders) is committed,
so a teammate knows which variables exist without seeing the values. Code
reads them from the environment at runtime.

**Never** paste a real key into a `.js`, `.html`, or `.example` file. A
secret committed once is compromised forever, even if you delete it later
(it stays in git history).

## Tier 4 — Versioned but secret → git-crypt (optional)

Sometimes you want a file *in* the repo (versioned, synced) but unreadable
to anyone without the key — e.g. a shared credentials file or a sensitive
config you and your brother both need. Use **git-crypt**: matched files are
transparently encrypted on commit and decrypted on checkout.

```bash
# one-time setup
brew install git-crypt        # macOS
cd /path/to/Elias
git-crypt init

# tell git which files to encrypt — create .gitattributes:
echo 'secrets/** filter=git-crypt diff=git-crypt' >> .gitattributes
echo '*.secret  filter=git-crypt diff=git-crypt'  >> .gitattributes
git add .gitattributes && git commit -m "Add git-crypt rules"

# share access with another machine/person via their GPG key:
git-crypt add-gpg-user <their-key-id>

# or export a symmetric key to unlock elsewhere (store it safely!):
git-crypt export-key ~/elias-crypt.key
```

Files matching those patterns are now encrypted in the repo and on GitHub,
but plain text on your unlocked machine. Anyone cloning without the key
sees only ciphertext.

## Quick decision guide

```
Is it a secret/credential?            → .env            (tier 3)
Must it never leave my computer?      → private/        (tier 2)
Want it versioned but unreadable?     → git-crypt        (tier 4)
Otherwise (safe reference material)   → knowledge/      (tier 1)
```

## If you ever commit a secret by accident

1. Rotate it immediately (generate a new key, revoke the old one). Assume
   it's burned — deleting it from git does **not** make it safe.
2. Remove it from history with `git filter-repo` or the BFG tool, then
   force-push.
3. Add the pattern to `.gitignore` so it can't happen again.
