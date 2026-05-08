#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const SKILLS_ROOT = '.agents/skills';
const ALLOWED_SKILL_TOP_LEVEL = new Set(['SKILL.md', 'references', 'scripts', 'assets', 'agents']);
const LEGACY_ROOT_DOCS = new Set(['Code-review.md', 'Security-review.md']);
const ROOT_ARTIFACT_RE = [
  /status.*\.html$/i,
  /\.log$/i,
  /\.tmp$/i,
  /\.bak$/i,
];
const REF_TEST_TXT_RE = /^ref\/.*(?:\/|^)[^/]*test[^/]*\.txt$/i;

function parseArgs(argv) {
  const args = { changedOnly: false, all: false, base: null, head: null };
  for (let i = 0; i < argv.length; i += 1) {
    const v = argv[i];
    if (v === '--changed-only') args.changedOnly = true;
    else if (v === '--all') args.all = true;
    else if (v === '--base') args.base = argv[i + 1] || null, i += 1;
    else if (v === '--head') args.head = argv[i + 1] || null, i += 1;
  }
  if (!args.changedOnly && !args.all) args.all = true;
  return args;
}

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function isKebabCase(name) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name);
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { ok: false, reason: 'SKILL.md must start with YAML frontmatter (---).' };
  const body = match[1].split(/\r?\n/);
  const map = new Map();
  for (const line of body) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) map.set(key, value);
  }
  const name = (map.get('name') || '').trim();
  const description = (map.get('description') || '').trim();
  if (!name) return { ok: false, reason: 'Frontmatter is missing non-empty name.' };
  if (!description) return { ok: false, reason: 'Frontmatter is missing non-empty description.' };
  return { ok: true, name, description };
}

function listSkillDirsAll() {
  const abs = path.join(ROOT, SKILLS_ROOT);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.posix.join(SKILLS_ROOT, d.name));
}

function changedFiles(base, head) {
  const out = run(`git diff --name-only --diff-filter=ACMRT ${base}...${head}`);
  return out ? out.split('\n').map((s) => s.trim()).filter(Boolean) : [];
}

function allTrackedFiles() {
  const out = run('git ls-files');
  return out ? out.split('\n').map((s) => s.trim()).filter(Boolean) : [];
}

function listSkillDirsChanged(base, head) {
  const files = changedFiles(base, head);
  const dirs = new Set();
  for (const f of files) {
    const normalized = f.replace(/\\/g, '/');
    if (LEGACY_ROOT_DOCS.has(normalized)) {
      dirs.add('__LEGACY_DOC__');
      continue;
    }
    if (!normalized.startsWith(`${SKILLS_ROOT}/`)) continue;
    const parts = normalized.split('/');
    if (parts.length < 4) continue;
    const skillName = parts[2];
    if (!skillName || skillName.includes('.')) continue;
    dirs.add(`${parts[0]}/${parts[1]}/${skillName}`);
  }
  return [...dirs];
}

function validateLegacyDocs(errors, scope, base, head) {
  if (scope === 'all') {
    for (const f of LEGACY_ROOT_DOCS) {
      if (exists(f)) errors.push(`[ERROR] ${f}: legacy root-level skill doc is not allowed. Move/remove it.`);
    }
    return;
  }
  const files = changedFiles(base, head);
  for (const f of files) {
    if (LEGACY_ROOT_DOCS.has(f)) {
      errors.push(`[ERROR] ${f}: legacy root-level skill doc changed. Use .agents/skills/<skill>/SKILL.md.`);
    }
  }
}

function isRootArtifact(p) {
  if (!p || p.includes('/')) return false;
  return ROOT_ARTIFACT_RE.some((re) => re.test(p));
}

function isRefTestArtifact(p) {
  const normalized = (p || '').replace(/\\/g, '/');
  if (!REF_TEST_TXT_RE.test(normalized)) return false;
  return true;
}

function validateArtifactPolicy(errors, scope, base, head) {
  const files = scope === 'all' ? allTrackedFiles() : changedFiles(base, head);
  for (const f of files) {
    if (isRootArtifact(f)) {
      errors.push(`[ERROR] ${f}: root artifact file is not allowed by policy (status html/log/tmp/bak).`);
    }
    if (isRefTestArtifact(f)) {
      errors.push(`[ERROR] ${f}: test artifact under ref/ is not allowed (*Test*.txt).`);
    }
  }
}

function validateSkillDir(relDir, errors) {
  const folder = path.posix.basename(relDir);
  const absDir = path.join(ROOT, relDir);
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  const entryNames = new Set(entries.map((e) => e.name));

  if (!isKebabCase(folder)) {
    errors.push(`[ERROR] ${relDir}: skill folder name must be kebab-case.`);
  }

  if (entryNames.has('skill.md')) {
    errors.push(`[ERROR] ${relDir}/skill.md: lowercase file is forbidden. Use SKILL.md.`);
  }

  const skillFile = path.join(absDir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    errors.push(`[ERROR] ${relDir}/SKILL.md: missing required SKILL.md.`);
    return;
  }

  const raw = fs.readFileSync(skillFile, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm.ok) {
    errors.push(`[ERROR] ${relDir}/SKILL.md: ${fm.reason}`);
  } else if (fm.name !== folder) {
    errors.push(`[ERROR] ${relDir}/SKILL.md: frontmatter name='${fm.name}' must match folder '${folder}'.`);
  }

  for (const e of entries) {
    if (!ALLOWED_SKILL_TOP_LEVEL.has(e.name)) {
      errors.push(`[ERROR] ${relDir}/${e.name}: unsupported top-level entry. Allowed: SKILL.md, references/, scripts/, assets/, agents/.`);
      continue;
    }
    if (e.name !== 'SKILL.md' && e.isFile()) {
      errors.push(`[ERROR] ${relDir}/${e.name}: must be a directory when present.`);
    }
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const errors = [];
  let scope = 'all';
  let dirs = [];
  let base = args.base;
  let head = args.head;

  if (args.changedOnly) {
    scope = 'changed-only';
    if (!base) base = process.env.GITHUB_BASE_SHA || 'HEAD~1';
    if (!head) head = process.env.GITHUB_HEAD_SHA || 'HEAD';
    try {
      dirs = listSkillDirsChanged(base, head).filter((d) => d !== '__LEGACY_DOC__');
      validateLegacyDocs(errors, scope, base, head);
      validateArtifactPolicy(errors, scope, base, head);
    } catch (e) {
      errors.push(`[ERROR] git diff failed for range ${base}...${head}: ${e.message}`);
    }
  } else {
    dirs = listSkillDirsAll();
    validateLegacyDocs(errors, scope);
    validateArtifactPolicy(errors, scope);
  }

  for (const d of dirs) {
    if (!d.startsWith(`${SKILLS_ROOT}/`)) {
      errors.push(`[ERROR] ${d}: skill must be under ${SKILLS_ROOT}/<skill-name>/.`);
      continue;
    }
    if (!fs.existsSync(path.join(ROOT, d))) {
      continue;
    }
    validateSkillDir(d, errors);
  }

  const checked = dirs.length;
  if (errors.length === 0) {
    console.log('## Skill Validation Result');
    console.log('- Status: PASS');
    console.log(`- Checked Scope: ${scope}`);
    console.log(`- Skills Checked: ${checked}`);
    process.exit(0);
  }

  console.log('## Skill Validation Result');
  console.log('- Status: FAIL');
  console.log(`- Checked Scope: ${scope}`);
  console.log(`- Skills Checked: ${checked}`);
  console.log('');
  console.log('## Findings');
  for (const e of errors) console.log(`- ${e}`);
  console.log('');
  console.log('## Fix Suggestions');
  console.log('1. Ensure each skill is under .agents/skills/<skill-name>/ with SKILL.md (uppercase).');
  console.log('2. Add valid YAML frontmatter in SKILL.md with non-empty name and description.');
  console.log('3. Keep only allowed top-level entries: SKILL.md, references/, scripts/, assets/, agents/.');
  console.log('4. Remove blocked artifacts from root/ref (status html, *.log, *.tmp, *.bak, ref/*Test*.txt).');
  process.exit(1);
}

main();
