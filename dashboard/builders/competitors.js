// @ts-check
'use strict';

const { readFile, parseMarkdownTables } = require('./utils');

/**
 * Build competitor data from research memory.
 * @param {string} projectRoot
 * @returns {Object[]}
 */
function buildCompetitors(projectRoot) {
  console.log('Building competitor data...');
  const researchMd = readFile(projectRoot, 'memory/research.md');
  if (!researchMd) return [];

  const tables = parseMarkdownTables(researchMd);
  if (tables.length === 0) return [];

  return tables[0].rows;
}

module.exports = { buildCompetitors };
