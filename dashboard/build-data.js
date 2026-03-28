#!/usr/bin/env node
// @ts-check
'use strict';

/**
 * Build script for the strategy dashboard.
 * Reads project markdown/CSV files (read-only) and outputs JSON to dashboard/data/.
 *
 * Each page's builder logic lives in dashboard/builders/*.js.
 */

const fs = require('fs');
const path = require('path');

const { buildOverview } = require('./builders/overview');
const { buildEntities } = require('./builders/pipeline');
const { buildCompetitors } = require('./builders/competitors');
const { buildDecisions } = require('./builders/decisions');
const { buildScoring } = require('./builders/scoring');
const { buildTimeline } = require('./builders/timeline');
const { buildResearch } = require('./builders/research');

// Safety: hardcoded paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'data');

if (!OUTPUT_DIR.startsWith(__dirname)) {
  console.error('SAFETY: Output directory must be inside dashboard/');
  process.exit(1);
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/**
 * Load project configuration.
 * @returns {Object}
 */
function loadProjectConfig() {
  const configPath = path.join(PROJECT_ROOT, 'project.config.json');
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (_e) {
    console.warn('  WARN: No project.config.json found — using defaults');
    return {};
  }
}

/**
 * Write a JSON file to the output directory.
 * @param {string} filename
 * @param {any} data
 */
function writeJSON(filename, data) {
  const outPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`  \u2713 ${filename} (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

const config = loadProjectConfig();
const buildTimestamp = new Date().toISOString();

console.log(`\nBuilding dashboard data for project at ${PROJECT_ROOT}\n`);

const overview = buildOverview(PROJECT_ROOT, config);
overview.buildTimestamp = buildTimestamp;

const entities = buildEntities(PROJECT_ROOT, config);
const competitors = buildCompetitors(PROJECT_ROOT);
const decisions = buildDecisions(PROJECT_ROOT);
const scoring = buildScoring(PROJECT_ROOT);
const timeline = buildTimeline(PROJECT_ROOT);
const research = buildResearch(PROJECT_ROOT);

writeJSON('overview.json', overview);
writeJSON('entities.json', entities);
writeJSON('competitors.json', competitors);
writeJSON('decisions.json', decisions);
writeJSON('scoring.json', scoring);
writeJSON('timeline.json', timeline);
writeJSON('research.json', research);

// Write build metadata for freshness indicator
writeJSON('meta.json', { buildTimestamp });

console.log('\nDone.\n');
