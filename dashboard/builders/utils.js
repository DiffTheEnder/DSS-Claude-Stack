// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Read a file relative to the project root.
 * @param {string} projectRoot - Absolute path to project root
 * @param {string} relativePath - File path relative to project root
 * @returns {string|null} File contents or null if unreadable
 */
function readFile(projectRoot, relativePath) {
  const full = path.join(projectRoot, relativePath);
  try {
    return fs.readFileSync(full, 'utf-8');
  } catch (_e) {
    console.warn(`  WARN: Could not read ${relativePath}`);
    return null;
  }
}

/**
 * Parse markdown tables from a markdown string.
 * @param {string} md - Markdown content
 * @returns {Array<{headers: string[], rows: Object[]}>}
 */
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

/**
 * Split markdown content by headings of a given level.
 * @param {string} md - Markdown content
 * @param {number} [level=2] - Heading level to split on
 * @returns {Object<string, string>} Map of heading title to section content
 */
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

module.exports = { readFile, parseMarkdownTables, splitByHeadings };
