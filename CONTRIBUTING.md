# Contributing

Thanks for helping out. Setup and scripts are in [docs/development.md](docs/development.md); every page is indexed in [docs/README.md](docs/README.md). Guidance for AI coding agents is in [AGENTS.md](AGENTS.md); human contributors can ignore it.

## Repository layout

| Path | Purpose |
| -- | -- |
| `apps/web` | React + Vite PWA |
| `apps/api` | Cloudflare Worker (Hono, D1, Drizzle) |
| `packages/shared` | Zod schemas and types used by both apps |

## Shared schemas

Request and response shapes live once in `packages/shared` and are used by the API (validation and generated OpenAPI) and the web app. Don't duplicate a schema in an app.

## Database changes

- Edit `apps/api/src/db/schema.ts`, then run `bun run db:generate`.
- Commit the generated SQL and metadata in `apps/api/migrations/` with the schema change. Never edit an applied migration; add a new one.
- Money is stored as integer minor units and dates as epoch milliseconds; convert only through `src/lib/money.ts` and `src/lib/dates.ts`.

## API code

- Declare every route with `createRoute()` so it appears in the OpenAPI document.
- Responses use the `{ success, message?, data? }` envelope; errors are thrown as `ResponseError`.
- Never log request bodies or passwords.
- Add tests for the happy path and the 400/401/403/404/409 cases that apply, and for every role guard you touch.

## Documentation

The docs live in [docs/](docs/), one topic per page, indexed in [docs/README.md](docs/README.md). Markdown is formatted by CI (see [docs/ci.md](docs/ci.md#docs)), so run the formatter before you push. Some rules keep the docs honest:

- **One fact, one page.** Other pages link to it instead of repeating it.
- **Docs change with the code.** A change isn't complete until the docs match it. They land in the same commit or PR.
- **A new page** is added to the table in `docs/README.md` in the same PR.
- **Describe the behaviour, not the diff.** Pages say what is true now, not what changed.

Before opening a PR, check every row that applies:

| If you change… | Update |
| -- | -- |
| An HTTP route, request or response shape, or the envelope | [api.md](docs/api.md) |
| A table, field, relation or delete behaviour (`apps/api/src/db/schema.ts`) | [domain-model.md](docs/domain-model.md) |
| Roles or the business restrictions | [roles-and-rules.md](docs/roles-and-rules.md) |
| Login, tokens, the cookie, sessions or rate limits | [auth.md](docs/auth.md) |
| A keyboard shortcut or what the command palette understands | [shortcuts.md](docs/shortcuts.md) |
| Right-to-left behaviour or how a component handles direction | [rtl.md](docs/rtl.md) |
| The demo data or its logins | [dev-data.md](docs/dev-data.md) |
| A variable, secret or repository variable | [configuration.md](docs/configuration.md) |
| Scripts, local setup or tests | [development.md](docs/development.md) |
| Cloudflare setup or how a deploy runs | [deployment.md](docs/deployment.md) |
| A GitHub Actions workflow or its triggers | [ci.md](docs/ci.md) |
| Modules, folders or the request flow | [architecture.md](docs/architecture.md) |
| The project's purpose, setup steps or the quickstart | [README.md](README.md) |
| These contribution rules | [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) |

## Checks

Before opening a pull request run:

```sh
bun run typecheck
bun run lint
bun run test
```

CI runs the same checks, plus the translation-key check (`bun run --cwd apps/web i18n:check`) and a web build and Worker and web dry-run deploys. Run `bun run --cwd apps/web i18n:check` yourself when you add or change user-facing text. Changes to Markdown also need the docs formatter; see [docs/ci.md](docs/ci.md#docs).

## Configuration

Keep real domains, secrets and account IDs out of Git. The repository uses `example.com` placeholders; real values belong in `.dev.vars` (local, gitignored), Wrangler secrets or CI variables.

## Branches

Every branch name follows `<type>/<description>`, with purpose prefixes only.

- **Allowed types:** `feat/`, `fix/`, `hotfix/` (urgent production fixes), `release/` (e.g. `release/v1.2.0`), `chore/` (dependencies, tooling), `docs/`, `ci/`.
- **No AI agent source prefixes:** no `ai/`, `claude/`, `codex/`, `copilot/` or `cursor/` branches, even when an AI agent creates the branch. Use the purpose prefix for the work instead.
- **The description** uses lowercase `a-z`, digits and hyphens between words. No uppercase, underscores, spaces, consecutive hyphens, and no leading or trailing hyphen.
- `main` is the only branch without a prefix. Dependabot's `dependabot/*` branches are the one exception, since Dependabot names them itself.

## Commits

Every commit message follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scope** is optional and names the area, e.g. `web`, `api`, `shared`, `db`, `ci`, `deps`, `docs`.
- **The description** is imperative, lowercase and has no trailing period, e.g. `feat(api): add bills routes`.
- **Breaking changes** are marked with `!` after the type/scope or a `BREAKING CHANGE:` footer.
- **PR titles** follow the same format.

## Pull requests

- Open every PR against `main`, using the template in `.github/pull_request_template.md`.
- One PR should do one thing. Keep dependency bumps, refactors and features in separate PRs where practical.
- The PR body links the issue it closes (`Closes #<issue>`) when there is one.

## No AI attribution

Never add an AI co-author or AI attribution to a commit message or PR description. That means no `Co-Authored-By:` trailer naming an AI model or tool (Claude, Copilot, Codex, Cursor, etc.) and no "Generated with …" lines. This applies to every commit, including AI-assisted ones.

## Dependencies

Update dependencies deliberately and, where practical, in their own pull request. Keep [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) up to date when adding a runtime dependency.
