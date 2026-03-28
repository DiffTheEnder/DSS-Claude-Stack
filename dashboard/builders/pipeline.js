// @ts-check
'use strict';

const { readFile } = require('./utils');
const { parse } = require('csv-parse/sync');

/**
 * Build entity/pipeline data from CSV.
 * @param {string} projectRoot
 * @param {Object} config - Project config
 * @returns {Object[]}
 */
function buildEntities(projectRoot, config) {
  console.log('Building entity data...');
  const csvPath = config.pipelineSourceOfTruth || 'data/entities.csv';
  const csv = readFile(projectRoot, csvPath);
  if (!csv) {
    console.warn('  No entity CSV found — skipping entity build');
    return [];
  }

  try {
    return parse(csv, { columns: true, skip_empty_lines: true, trim: true });
  } catch (e) {
    console.error(`  ERROR parsing CSV: ${e.message}`);
    return [];
  }
}

module.exports = { buildEntities };
