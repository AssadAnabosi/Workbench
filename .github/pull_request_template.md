## Summary

<!-- What changes and why, in a few lines. -->

Closes #

## Checklist

- [ ] Branch is `<type>/<description>` (feat, fix, hotfix, release, chore, docs or ci; no `ai/`, `claude/`, `codex/`, `copilot/` or `cursor/`)
- [ ] The PR is open against `main` and the title follows Conventional Commits (`type(scope): description`)
- [ ] `bun run typecheck`, `bun run lint` and `bun run test` pass
- [ ] `bun run --cwd apps/web i18n:check` passes if user-facing text changed
- [ ] Migration generated (`bun run db:generate`) if the schema changed, and not edited after being applied
- [ ] Docs changed with the code (see the table in `CONTRIBUTING.md`, "Documentation")
- [ ] `THIRD_PARTY_LICENSES.md` updated if a runtime dependency was added
- [ ] No AI co-author or attribution lines in commits or this description
