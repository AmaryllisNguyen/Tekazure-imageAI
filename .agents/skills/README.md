# Project Skills (Repo-local)

This repository stores project-specific skills under `.agents/skills`.

## Why repo-local
- Keep skill behavior consistent across collaborators.
- Avoid mixing project skills with global user skills in `~/.codex/skills`.
- Make onboarding and review easier through normal PR workflow.

## Structure
- `.agents/skills/<skill-name>/SKILL.md`
- `.agents/skills/<skill-name>/references/` (optional)
- `.agents/skills/<skill-name>/scripts/` (optional)
- `.agents/skills/<skill-name>/assets/` (optional)

## Naming rules
- Skill folder names must use `kebab-case`.
- Every skill must include `SKILL.md` (uppercase).
- Keep each skill focused on one responsibility.

## New skill checklist
- Add frontmatter in `SKILL.md` with `name` and `description`.
- Keep paths relative to the skill folder.
- Add references/scripts/assets only when needed.
- Validate with:
  - `rg --files .agents/skills`
  - `rg "references/|scripts/|assets/" .agents/skills -n`

## Merge Gate Policy
- All skill changes targeting `main` must pass the `skill-validation` GitHub Action.
- PRs that fail skill validation are rejected by required status checks.
- Artifact policy also fails PRs when blocked local artifacts are added:
  - Root: `*status*.html`, `*.log`, `*.tmp`, `*.bak`
  - Under `ref/`: `*Test*.txt`
- Before opening a PR, run:
  - `npm run validate:skills` (full repo audit)
  - `npm run validate:skills:changed` (quick changed-scope check)
