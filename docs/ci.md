# CI and workflows

Workbench has five GitHub Actions workflows in `.github/workflows/`, plus Dependabot. This page is the map: what each one does, what starts it and what it needs. Deployment steps are in [deployment.md](deployment.md).

## At a glance

| Workflow | File | Starts on | Runs | Secrets and variables |
| -- | -- | -- | -- | -- |
| CI | `ci.yml` | Pull requests | Typecheck, lint, translation keys, tests, web build, Wrangler dry runs | none |
| Docs | `docs.yml` | Pull requests and pushes to `main`; steps run only when Markdown or the formatter's files change | Markdown formatting check (always reports) | none |
| Deploy API | `deploy.yml` | Pushes to `main` that touch the API, `packages/shared`, the root `package.json` or `bun.lock`, or the workflow | Render config, apply remote D1 migrations, deploy the Worker | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; variables `API_DOMAIN`, `WEB_ORIGIN`, `D1_DATABASE_ID` |
| Deploy web | `deploy-web.yml` | Pushes to `main` that touch the web app, `packages/shared`, the root `package.json` or `bun.lock`, or the workflow | Build the PWA with the API's URL, deploy it | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; variables `API_DOMAIN`, `WEB_ORIGIN`, optional `VITE_APP_TITLE` |
| Deploy landing | `deploy-landing.yml` | Pushes to `main` that touch the landing app, the root `package.json` or `bun.lock`, or the workflow; by hand | Build the landing page, publish to GitHub Pages | none (`pages: write`, `id-token: write`) |

Dependabot (`.github/dependabot.yml`) opens weekly pull requests for GitHub Actions versions and for the Markdown formatter pinned in `requirements-docs.txt`. Those pull requests run CI and Docs like any other.

## CI

- **Starts on:** every pull request. There is no push trigger, so a branch with an open pull request isn't checked twice.
- **Concurrency:** one run per branch; a new push cancels the older run.
- **Steps:** `bun install --frozen-lockfile`, `typecheck`, `lint`, translation keys (`apps/web` `i18n:check`), `test`, a web build with `VITE_APP_TITLE=Workbench`, then a dry-run deploy of the web app and of the Worker. The dry runs catch a broken Wrangler config before a merge does.
- **Blocking merges:** add `check` (the CI job) as a required check in the `main` branch ruleset.

## Docs

- **Starts on:** every pull request and pushes to `main`. The job always runs and reports, so it can be a required check.

- **Scope:** a first step compares the changed files with the pull request's base (or the pushed range). If no Markdown file, `docs/`, `.mdformat.toml`, `requirements-docs.txt` or the workflow itself changed, the remaining steps are skipped and the check passes. If the range can't be read, the check runs in full.

- **Runs:** `mdformat --check --compact-tables` over `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md` and `docs/`. The formatter version is pinned in `requirements-docs.txt`, and its settings are in `.mdformat.toml`.

- **Fix a failure** by running the same command without `--check`:

  ```sh
  pip install -r requirements-docs.txt
  mdformat --compact-tables README.md CONTRIBUTING.md AGENTS.md CLAUDE.md docs
  ```

- **Blocking merges:** add `Markdown formatting` as a required check in the `main` ruleset. Because the job always reports, a pull request that doesn't touch docs still gets a passing check.

## Deploy API and Deploy web

- **Starts on:** a push to `main` that touches the app's paths. Deploy API doesn't run for web-only changes, and the reverse. Changing `packages/shared` starts both, since both import it. A change to the root `package.json` or `bun.lock` starts both too, because they set the dependency versions each one builds with; the cost is one redundant deploy when a lockfile change only touches the other app.
- **Landing:** doesn't import `packages/shared`, so changes there don't start it.
- **Pinning:** every action is pinned to an exact version, with `ubuntu-24.04` as the runner, and each workflow sets `permissions: contents: read`. Dependabot proposes updates.
- **Concurrency:** one deploy per app at a time, never cancelled, so a second merge waits instead of racing the first.
- **Deploy API:** renders `wrangler.deploy.jsonc` from the repository variables, applies remote migrations, then deploys the Worker.
- **Deploy web:** checks that `API_DOMAIN` and `WEB_ORIGIN` are set, builds the PWA against `https://$API_DOMAIN`, renders its Wrangler config and deploys it.
- The repository contains only `example.com` placeholders; the real domain and database ID live in repository variables (see [configuration.md](configuration.md)).

## Deploy landing

- **Starts on:** a push to `main` that touches `apps/landing`, or by hand from Actions.
- **Concurrency:** one Pages deployment at a time (group `pages`), never cancelled.
- The custom domain is set in Settings → Pages, so it stays out of the repository.

## Changing the workflows

- Pin actions to an exact version (`actions/checkout@v7.0.1`), not a major tag. Dependabot proposes updates.
- When a path filter changes, check that every file the job reads is covered: the app's folder, `packages/shared` if it's imported, the root `package.json` and `bun.lock`, and the workflow itself.
- A pull request runs its own copy of the workflows, so review changes under `.github/workflows/` as carefully as code.
- Keep the Bun and Node versions in every workflow in step.
- Update this page in the same pull request as the workflow change.
