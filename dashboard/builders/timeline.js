// @ts-check
'use strict';

const { readFile, parseMarkdownTables } = require('./utils');

/**
 * Build timeline data from work log.
 * @param {string} projectRoot
 * @returns {Object[]}
 */
function buildTimeline(projectRoot) {
  console.log('Building timeline data...');
  const md = readFile(projectRoot, 'docs/output/work-log.md');
  if (!md) return [];

  const tables = parseMarkdownTables(md);
  if (tables.length === 0) return [];

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

  entries.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  return entries;
}

module.exports = { buildTimeline };
