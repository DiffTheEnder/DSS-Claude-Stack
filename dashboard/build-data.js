#!/usr/bin/env node
/**
 * Build script for {{PROJECT_NAME}} Dashboard
 * Reads project markdown/CSV files (read-only) and outputs JSON to dashboard/data/
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { marked } = require('marked');

// Safety: hardcoded paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'data');

// Ensure output dir exists and is inside dashboard/
if (!OUTPUT_DIR.startsWith(__dirname)) {
  console.error('SAFETY: Output directory must be inside dashboard/');
  process.exit(1);
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Project Config ──────────────────────────────────────────────────────────

function loadProjectConfig() {
  const configPath = path.join(PROJECT_ROOT, 'project.config.json');
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    console.warn('  WARN: No project.config.json found — using defaults');
    return {};
  }
}

const PROJECT_CONFIG = loadProjectConfig();

// ─── Utilities ───────────────────────────────────────────────────────────────

function readFile(relativePath) {
  const full = path.join(PROJECT_ROOT, relativePath);
  try {
    return fs.readFileSync(full, 'utf-8');
  } catch (e) {
    console.warn(`  WARN: Could not read ${relativePath}`);
    return null;
  }
}

function parseMarkdownTables(md) {
  const tables = [];
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 3) {
        const headers = tableLines[0].split('|').map(c => c.trim()).filter(c => c);
        const rows = [];
        for (let r = 2; r < tableLines.length; r++) {
          const cells = tableLines[r].split('|').map(c => c.trim()).filter(c => c);
          if (cells.length > 0 && !cells[0].match(/^[-:]+$/)) {
            const row = {};
            headers.forEach((h, idx) => { row[h] = cells[idx] || ''; });
            rows.push(row);
          }
        }
        if (rows.length > 0) tables.push({ headers, rows });
      }
    } else {
      i++;
    }
  }
  return tables;
}

function splitByHeadings(md, level = 2) {
  const regex = new RegExp(`^${'#'.repeat(level)} (.+)$`, 'gm');
  const sections = {};
  let match;
  const positions = [];
  while ((match = regex.exec(md)) !== null) {
    positions.push({ title: match[1].trim(), start: match.index + match[0].length });
  }
  for (let i = 0; i < positions.length; i++) {
    const end = i + 1 < positions.length ? positions[i + 1].start - positions[i + 1].title.length - level - 2 : md.length;
    const content = md.substring(positions[i].start, end).trim();
    sections[positions[i].title] = content;
  }
  return sections;
}

// ─── Build Overview Data ─────────────────────────────────────────────────────

function buildOverview() {
  console.log('Building overview data...');
  const overview = {
    projectName: PROJECT_CONFIG.projectName || '',
    entityType: PROJECT_CONFIG.entityType || '',
    statusBlurb: '',
    killConditions: [],
    buildTime: new Date().toISOString(),
  };

  // Status blurb
  const blurb = readFile('docs/output/status-blurb.md');
  if (blurb) {
    overview.statusBlurb = blurb
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }

  // Kill conditions from executive summary
  const execSummary = readFile('docs/executive-summary.md');
  if (execSummary) {
    const tables = parseMarkdownTables(execSummary);
    for (const table of tables) {
      if (table.headers.some(h => h.toLowerCase().includes('condition'))) {
        overview.killConditions = table.rows.map(row => ({
          id: row['KC'] || row['#'] || '',
          condition: row['Condition'] || '',
          status: row['Status'] || 'UNTESTED',
          evidence: row['Key Evidence'] || '',
        }));
        break;
      }
    }
  }

  return overview;
}

// ─── Build Entity Data (from CSV) ───────────────────────────────────────────

function buildEntities() {
  console.log('Building entity data...');
  const csvPath = PROJECT_CONFIG.pipelineSourceOfTruth || 'data/entities.csv';
  const csv = readFile(csvPath);
  if (!csv) {
    console.warn('  No entity CSV found — skipping entity build');
    return [];
  }

  try {
    const records = parse(csv, { columns: true, skip_empty_lines: true, trim: true });
    return records;
  } catch (e) {
    console.error(`  ERROR parsing CSV: ${e.message}`);
    return [];
  }
}

// ─── Build Competitor Data ──────────────────────────────────────────────────

function buildCompetitors() {
  console.log('Building competitor data...');
  const researchMd = readFile('memory/research.md');
  if (!researchMd) return [];

  const tables = parseMarkdownTables(researchMd);
  if (tables.length === 0) return [];

  // Use the first table (capability map)
  return tables[0].rows;
}

// ─── Build Decisions Data ────────────────────────────────────────────────────

function buildDecisions() {
  console.log('Building decisions data...');
  const md = readFile('memory/decisions.md');
  if (!md) return [];

  const decisions = [];
  const decisionRegex = /### Decision (\d+):\s*(.+)/g;
  let match;
  const positions = [];

  while ((match = decisionRegex.exec(md)) !== null) {
    positions.push({
      number: parseInt(match[1], 10),
      title: match[2].trim(),
      start: match.index + match[0].length,
    });
  }

  if (positions.length === 0) return [];

  for (let i = 0; i < positions.length; i++) {
    const end = i + 1 < positions.length ? positions[i + 1].start - positions[i + 1].title.length - 20 : md.length;
    const block = md.substring(positions[i].start, end);

    const dateMatch = block.match(/\*\*Date\*\*:\s*(.+)/);
    const decidedMatch = block.match(/\*\*Decided\*\*:\s*(.+)/);
    const reversibilityMatch = block.match(/\*\*Reversibility\*\*:\s*(.+)/);
    const revisitMatch = block.match(/\*\*Revisit trigger\*\*:\s*(.+)/);

    decisions.push({
      number: positions[i].number,
      title: positions[i].title,
      date: dateMatch ? dateMatch[1].trim() : '',
      decided: decidedMatch ? decidedMatch[1].trim() : '',
      reversibility: reversibilityMatch ? reversibilityMatch[1].trim() : '',
      revisitTrigger: revisitMatch ? revisitMatch[1].trim() : '',
    });
  }

  return decisions;
}

// ─── Build Scoring Data ─────────────────────────────────────────────────────

function buildScoring() {
  console.log('Building scoring data...');
  const md = readFile('memory/scoring.md');
  if (!md) return { options: [], matrix: [], recommended: {} };

  const tables = parseMarkdownTables(md);
  const options = tables.length > 0 ? tables[0].rows : [];
  const matrix = tables.length > 1 ? tables[1].rows : [];

  // Extract Recommended Strategy section
  const recommended = {};
  const recMatch = md.match(/## Recommended Strategy([\s\S]*?)(?=\n## |\n# |$)/);
  if (recMatch) {
    const recBlock = recMatch[1];
    const optionMatch = recBlock.match(/\*\*Option\*\*:\s*(.+)/);
    const rationaleMatch = recBlock.match(/\*\*Rationale\*\*:\s*(.+)/);
    const risksMatch = recBlock.match(/\*\*Risks\*\*:\s*(.+)/);
    const fallbackMatch = recBlock.match(/\*\*Fallback\*\*:\s*(.+)/);

    if (optionMatch) recommended.option = optionMatch[1].trim();
    if (rationaleMatch) recommended.rationale = rationaleMatch[1].trim();
    if (risksMatch) recommended.risks = risksMatch[1].trim();
    if (fallbackMatch) recommended.fallback = fallbackMatch[1].trim();
  }

  return { options, matrix, recommended };
}

// ─── Build Timeline Data ────────────────────────────────────────────────────

function buildTimeline() {
  console.log('Building timeline data...');
  const md = readFile('docs/output/work-log.md');
  if (!md) return [];

  const tables = parseMarkdownTables(md);
  if (tables.length === 0) return [];

  // Find the table that has workstream-like headers
  let workTable = null;
  for (const table of tables) {
    const lowerHeaders = table.headers.map(h => h.toLowerCase());
    if (lowerHeaders.includes('workstream') || lowerHeaders.includes('item') || lowerHeaders.includes('date')) {
      workTable = table;
      break;
    }
  }
  if (!workTable) workTable = tables[0];

  const entries = workTable.rows.map(row => ({
    workstream: row['Workstream'] || row['workstream'] || '',
    item: row['Item'] || row['item'] || '',
    owner: row['Owner'] || row['owner'] || '',
    date: row['Date'] || row['date'] || '',
    output: row['Output'] || row['output'] || '',
  }));

  // Sort by date descending
  entries.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return entries;
}

// ─── Build Research Data ────────────────────────────────────────────────────

function buildResearch() {
  console.log('Building research data...');
  const researchDir = path.join(PROJECT_ROOT, 'research');
  const files = [];
  const grades = { confirmed: 0, secondary: 0, inference: 0, assumption: 0 };

  function scanDir(dir, relBase) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      console.warn(`  WARN: Could not read directory ${dir}`);
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relBase, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else if (entry.name.endsWith('.md') && entry.name !== '.gitkeep') {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const stat = fs.statSync(fullPath);

        // Determine type from path
        let type = 'other';
        if (relPath.startsWith('competitors/') || relPath.startsWith('competitors\\')) type = 'competitor';
        else if (relPath.startsWith('market/') || relPath.startsWith('market\\')) type = 'market';
        else if (relPath.startsWith('technical/') || relPath.startsWith('technical\\')) type = 'technical';

        // Entity name from filename slug
        const entityName = path.basename(entry.name, '.md').replace(/[-_]/g, ' ');

        // Check for TL;DR
        const hasTldr = /## TL;DR|## tl;dr/i.test(content);

        // Count evidence grades
        const confirmed = (content.match(/\[CONFIRMED\]/g) || []).length;
        const secondary = (content.match(/\[SECONDARY\]/g) || []).length;
        const inference = (content.match(/\[INFERENCE\]/g) || []).length;
        const assumption = (content.match(/\[ASSUMPTION\]/g) || []).length;

        grades.confirmed += confirmed;
        grades.secondary += secondary;
        grades.inference += inference;
        grades.assumption += assumption;

        files.push({
          filename: entry.name,
          path: relPath,
          type,
          entityName,
          hasTldr,
          grades: { confirmed, secondary, inference, assumption },
          lastModified: stat.mtime.toISOString(),
        });
      }
    }
  }

  scanDir(researchDir, '');

  // Identify gaps from memory/research.md capability map
  const gaps = [];
  const researchMd = readFile('memory/research.md');
  if (researchMd) {
    const tables = parseMarkdownTables(researchMd);
    if (tables.length > 0) {
      const entityNames = files.map(f => f.entityName.toLowerCase());
      for (const row of tables[0].rows) {
        // Check the first column as the entity identifier
        const firstCol = Object.values(row)[0] || '';
        if (firstCol && !entityNames.includes(firstCol.toLowerCase().replace(/[-_]/g, ' '))) {
          gaps.push(firstCol);
        }
      }
    }
  }

  return { files, grades, gaps };
}

// ─── Write Outputs ──────────────────────────────────────────────────────────

function writeJSON(filename, data) {
  const outPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`  ✓ ${filename} (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log(`\nBuilding dashboard data for project at ${PROJECT_ROOT}\n`);

const overview = buildOverview();
const entities = buildEntities();
const competitors = buildCompetitors();
const decisions = buildDecisions();
const scoring = buildScoring();
const timeline = buildTimeline();
const research = buildResearch();

writeJSON('overview.json', overview);
writeJSON('entities.json', entities);
writeJSON('competitors.json', competitors);
writeJSON('decisions.json', decisions);
writeJSON('scoring.json', scoring);
writeJSON('timeline.json', timeline);
writeJSON('research.json', research);

console.log('\nDone.\n');
