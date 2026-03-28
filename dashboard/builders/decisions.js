// @ts-check
'use strict';

const { readFile } = require('./utils');

/**
 * Build decisions data from memory/decisions.md.
 * @param {string} projectRoot
 * @returns {Object[]}
 */
function buildDecisions(projectRoot) {
  console.log('Building decisions data...');
  const md = readFile(projectRoot, 'memory/decisions.md');
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

module.exports = { buildDecisions };
