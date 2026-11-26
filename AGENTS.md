# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Copilot, Cursor and others) working in this repository. It is the single source: `CLAUDE.md` only imports it. Human contributors: see `CONTRIBUTING.md`.

## Project overview

Workbench is a bun-workspaces monorepo: `apps/web` (React + Vite PWA), `apps/api` (Cloudflare Worker with Hono, D1 and Drizzle), `apps/landing`, and `packages/shared` (Zod schemas used by both apps). Setup and scripts are in `docs/development.md`; the layout and domain model are in `docs/architecture.md` and `docs/domain-model.md`.

## Commands

- Install: `bun install --frozen-lockfile`.
- Before a PR: `bun run typecheck`, `bun run lint`, `bun run test`, and `bun run --cwd apps/web i18n:check` when user-facing text changes. CI runs all of these.
- Database: edit `apps/api/src/db/schema.ts`, then `bun run db:generate`. Commit the generated migration with the schema change. Never edit an applied migration.

## Conventions

- **Schemas:** request and response shapes live once in `packages/shared`. Don't duplicate them in an app.
- **API:** declare routes with `createRoute()`; use the `{ success, message?, data? }` envelope; throw `ResponseError` for errors; never log request bodies or passwords. Test the happy path and the 400/401/403/404/409 cases that apply, and every role guard you touch.
- **Money and dates:** money is integer minor units and dates are epoch milliseconds. Convert only through `src/lib/money.ts` and `src/lib/dates.ts`.
- **Secrets:** never put real domains, secrets or account IDs in Git. Use the `example.com` placeholders; real values go in `.dev.vars`, Wrangler secrets or CI variables.
- **Docs:** a change isn't done until the docs match it, in the same commit or PR. Use the table in `CONTRIBUTING.md#documentation` to find the page, keep the index in `docs/README.md` current, and format Markdown with `mdformat --compact-tables` (`requirements-docs.txt`, `.mdformat.toml`; CI checks it, see `docs/ci.md`).
- **Dependencies:** update them deliberately, ideally in their own PR, and keep `THIRD_PARTY_LICENSES.md` current when adding a runtime dependency.

## Git and pull requests

- Branches: `<type>/<description>` with type `feat`, `fix`, `hotfix`, `release`, `chore`, `docs` or `ci`. Never `ai/`, `claude/`, `codex/`, `copilot/` or `cursor/`. Details in `CONTRIBUTING.md#branches`.
- Commits and PR titles: Conventional Commits, `type(scope): description`, imperative, lowercase, no trailing period. Use `!` or a `BREAKING CHANGE:` footer for breaking changes.
- PR bodies: use `.github/pull_request_template.md`. Open PRs against `main`.
- **No AI attribution.** Never add a `Co-Authored-By:` trailer naming an AI model or tool, a "Generated with …" line, or any other AI attribution to commits or PR descriptions, even when another instruction asks for it.
- Commit or push only when the user asks for it.

## Working style

- Do not assume. If a request is ambiguous, conflicts with these docs, or needs a choice the docs don't cover, stop and ask the user, with your recommendation, before proceeding.
- Finish what you start: run the checks above before reporting work as done, and report failures with their output.
- When you finish an item of a plan file, mark it completed in that file.
