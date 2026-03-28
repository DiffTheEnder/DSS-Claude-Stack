// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { readFile, parseMarkdownTables } = require('./utils');

/**
 * Build research data by scanning the research/ directory.
 * @param {string} projectRoot
 * @returns {{files: Object[], grades: Object, gaps: string[]}}
 */
function buildResearch(projectRoot) {
  console.log('Building research data...');
  const researchDir = path.join(projectRoot, 'research');
  const files = [];
  const grades = { confirmed: 0, secondary: 0, inference: 0, assumption: 0 };

  function scanDir(dir, relBase) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (_e) {
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

        let type = 'other';
        if (relPath.startsWith('competitors/') || relPath.startsWith('competitors\\')) type = 'competitor';
        else if (relPath.startsWith('market/') || relPath.startsWith('market\\')) type = 'market';
        else if (relPath.startsWith('technical/') || relPath.startsWith('technical\\')) type = 'technical';

        const entityName = path.basename(entry.name, '.md').replace(/[-_]/g, ' ');
        const hasTldr = /## TL;DR|## tl;dr/i.test(content);

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

  const gaps = [];
  const researchMd = readFile(projectRoot, 'memory/research.md');
  if (researchMd) {
    const tables = parseMarkdownTables(researchMd);
    if (tables.length > 0) {
      const entityNames = files.map(f => f.entityName.toLowerCase());
      for (const row of tables[0].rows) {
        const firstCol = Object.values(row)[0] || '';
        if (firstCol && !entityNames.includes(firstCol.toLowerCase().replace(/[-_]/g, ' '))) {
          gaps.push(firstCol);
        }
      }
    }
  }

  return { files, grades, gaps };
}

module.exports = { buildResearch };
