---
name: skill-validation
description: Use this skill when creating, editing, reviewing, or merging Codex skills. It validates that skills follow the required .agents/skills structure, SKILL.md metadata format, and repository merge-gate rules.
---

# Skill Validation

Use this skill to validate whether skills in this repository comply with Codex skill conventions before merge.

## When To Trigger
- User asks to create or update a skill.
- User asks to review skill structure or metadata.
- Before opening or approving a PR that changes `.agents/skills`.

## Validation Standard
A valid skill must:
- Live under `.agents/skills/<skill-name>/`.
- Include `.agents/skills/<skill-name>/SKILL.md` (uppercase, required).
- Use frontmatter in `SKILL.md` with non-empty `name` and `description`.
- Keep skill folder name in `kebab-case`.
- Keep `name` equal to the folder name.
- Only use approved top-level entries in a skill folder:
  - `SKILL.md`
  - `references/`
  - `scripts/`
  - `assets/`
  - `agents/`

## Repository Gate Rules
- Reject lowercase `skill.md`.
- Reject root-level legacy skill docs (`Code-review.md`, `Security-review.md`).
- Reject root artifact files matching `*status*.html`, `*.log`, `*.tmp`, `*.bak`.
- Reject test artifact files under `ref/` matching `*Test*.txt`.
- If any changed skill violates the rules, validation result is `FAIL`.

## Output Format
```md
## Skill Validation Result
- Status: PASS | FAIL
- Checked Scope: changed-only | all

## Findings
- [ERROR] <path>: <rule violated>
- [WARN] <path>: <non-blocking issue>

## Fix Suggestions
1. ...
2. ...
```

## Execution Path
- Use `node scripts/validate-skills.mjs --all` for full audit.
- Use `node scripts/validate-skills.mjs --changed-only --base <sha> --head <sha>` for PR gate.
