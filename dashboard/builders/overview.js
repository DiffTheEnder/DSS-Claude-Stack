// @ts-check
'use strict';

const { readFile, parseMarkdownTables } = require('./utils');

/**
 * Build overview data from project config and executive summary.
 * @param {string} projectRoot
 * @param {Object} config - Project config
 * @returns {Object}
 */
function buildOverview(projectRoot, config) {
  console.log('Building overview data...');
  const overview = {
    projectName: config.projectName || '',
    entityType: config.entityType || '',
    statusBlurb: '',
    killConditions: [],
    buildTime: new Date().toISOString(),
  };

  const blurb = readFile(projectRoot, 'docs/output/status-blurb.md');
  if (blurb) {
    overview.statusBlurb = blurb.replace(/<!--[\s\S]*?-->/g, '').trim();
  }

  const execSummary = readFile(projectRoot, 'docs/executive-summary.md');
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

module.exports = { buildOverview };
