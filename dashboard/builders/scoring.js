// @ts-check
'use strict';

const { readFile, parseMarkdownTables } = require('./utils');

/**
 * Build scoring data from memory/scoring.md.
 * @param {string} projectRoot
 * @returns {{options: Object[], matrix: Object[], recommended: Object}}
 */
function buildScoring(projectRoot) {
  console.log('Building scoring data...');
  const md = readFile(projectRoot, 'memory/scoring.md');
  if (!md) return { options: [], matrix: [], recommended: {} };

  const tables = parseMarkdownTables(md);
  const options = tables.length > 0 ? tables[0].rows : [];
  const matrix = tables.length > 1 ? tables[1].rows : [];

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

module.exports = { buildScoring };
