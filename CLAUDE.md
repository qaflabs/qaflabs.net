@AGENTS.md

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Rules

Follow every rule in `docs/agents/rules/` when writing code or commits:

- `cn-object-notation.md`: build conditional class lists with `cn()` object notation, not ternaries or `&&`.
- `commit-conventions.md`: imperative, capitalised single-line titles that complete "If merged, this commit will…", with no prefixes or attribution trailers.
- `no-pass-through-re-exports.md`: import from a symbol's real location; never add or leave a file that only re-exports.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
