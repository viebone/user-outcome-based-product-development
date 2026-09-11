#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const SKIP_DIR_NAMES = new Set(['.git', 'node_modules', '__pycache__']);
function isSkippable(name) {
  return SKIP_DIR_NAMES.has(name) || name.startsWith('venv') || name.startsWith('.');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) fm[key] = value;
  }
  return fm;
}

function listSpecFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md') && e.name !== '.gitkeep')
    .map((e) => path.join(dir, e.name));
}

function isFrameworkRoot(dir) {
  try {
    return (
      fs.existsSync(path.join(dir, 'product-template')) &&
      fs.existsSync(path.join(dir, 'roles')) &&
      fs.existsSync(path.join(dir, 'CLAUDE.md'))
    );
  } catch {
    return false;
  }
}

// Walk up from `dir`; if some ancestor's parent directory is literally named
// "products", `dir` is a product folder (or nested inside one).
function findProductContext(dir) {
  let cur = path.resolve(dir);
  for (;;) {
    const parent = path.dirname(cur);
    if (path.basename(parent) === 'products') {
      return { productName: path.basename(cur), frameworkRoot: path.dirname(parent) };
    }
    if (parent === cur) return null;
    cur = parent;
  }
}

function summarizeProduct(productDir, productName) {
  const outcomeFiles = listSpecFiles(path.join(productDir, 'outcomes'));
  const activeOutcomes = outcomeFiles.filter(
    (f) => parseFrontmatter(fs.readFileSync(f, 'utf8')).status === 'active'
  ).length;

  const changeFiles = listSpecFiles(path.join(productDir, 'changes'));
  const changes = changeFiles.map((f) => {
    const fm = parseFrontmatter(fs.readFileSync(f, 'utf8'));
    return { id: fm.id || path.basename(f, '.md'), date: fm.date || '', status: fm.status || 'unknown' };
  });
  changes.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const mostRecent = changes[0];
  const incomplete = changes.filter((c) => c.status !== 'complete');

  let line = `- **${productName}**: ${activeOutcomes} active outcome(s)`;
  line += mostRecent
    ? `, latest change \`${mostRecent.id}\` (${mostRecent.status})`
    : ', no change requests yet';
  if (incomplete.length > 0) {
    line += ` — ⚠️ ${incomplete.length} unfinished: ${incomplete
      .map((c) => `${c.id} (${c.status})`)
      .join(', ')}`;
  }
  return line;
}

function buildRootContext(cwd) {
  const productsDir = path.join(cwd, 'products');
  if (!fs.existsSync(productsDir)) return null;

  const entries = fs
    .readdirSync(productsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !isSkippable(e.name));
  if (entries.length === 0) return null;

  const lines = entries.map((e) => summarizeProduct(path.join(productsDir, e.name), e.name));
  return (
    `## UOBPD workspace — product status\n\n${lines.join('\n')}\n\n` +
    'Run `/change-request` before touching specs or code for any product above.'
  );
}

function buildProductWarning(ctx) {
  return (
    `⚠️ You opened the "${ctx.productName}" product folder directly, not the framework ` +
    `workspace root. Shared skills, roles, and templates from ${ctx.frameworkRoot} will NOT be ` +
    `available in this session. Consider reopening ${ctx.frameworkRoot} as your workspace instead.`
  );
}

function main() {
  const cwd = process.cwd();
  let payload = null;

  if (isFrameworkRoot(cwd)) {
    const context = buildRootContext(cwd);
    if (context) {
      payload = {
        hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context },
      };
    }
  } else {
    const ctx = findProductContext(cwd);
    if (ctx && isFrameworkRoot(ctx.frameworkRoot)) {
      const message = buildProductWarning(ctx);
      payload = {
        systemMessage: message,
        hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: message },
      };
    }
  }

  if (payload) {
    process.stdout.write(JSON.stringify(payload));
  }
}

main();
