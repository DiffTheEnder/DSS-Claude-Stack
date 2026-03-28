const path = require('path');
const { parseMarkdownTables, splitByHeadings, readFile } = require('../builders/utils');
const { buildOverview } = require('../builders/overview');
const { buildDecisions } = require('../builders/decisions');
const { buildScoring } = require('../builders/scoring');
const { buildCompetitors } = require('../builders/competitors');
const { buildTimeline } = require('../builders/timeline');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

describe('utils', () => {
  describe('parseMarkdownTables', () => {
    test('parses a simple markdown table', () => {
      const md = `
| Name | Score |
|------|-------|
| Alice | 10 |
| Bob | 20 |
`;
      const tables = parseMarkdownTables(md);
      expect(tables).toHaveLength(1);
      expect(tables[0].headers).toEqual(['Name', 'Score']);
      expect(tables[0].rows).toHaveLength(2);
      expect(tables[0].rows[0]).toEqual({ Name: 'Alice', Score: '10' });
    });

    test('returns empty array for no tables', () => {
      expect(parseMarkdownTables('# Just a heading\nSome text')).toEqual([]);
    });

    test('parses multiple tables', () => {
      const md = `
| A | B |
|---|---|
| 1 | 2 |

Some text

| C | D |
|---|---|
| 3 | 4 |
`;
      const tables = parseMarkdownTables(md);
      expect(tables).toHaveLength(2);
    });
  });

  describe('splitByHeadings', () => {
    test('splits markdown by h2', () => {
      const md = `# Title

## Section One

Content one

## Section Two

Content two
`;
      const sections = splitByHeadings(md, 2);
      expect(sections).toHaveProperty('Section One');
      expect(sections).toHaveProperty('Section Two');
      expect(sections['Section Two']).toContain('Content two');
    });
  });

  describe('readFile', () => {
    test('returns null for non-existent file', () => {
      const result = readFile(PROJECT_ROOT, 'nonexistent-file.md');
      expect(result).toBeNull();
    });

    test('reads an existing file', () => {
      const result = readFile(PROJECT_ROOT, 'README.md');
      expect(result).toBeTruthy();
      expect(result).toContain('DS Strategy Stack');
    });
  });
});

describe('builders', () => {
  describe('buildOverview', () => {
    test('returns overview object with required fields', () => {
      const result = buildOverview(PROJECT_ROOT, { projectName: 'Test', entityType: 'prospect' });
      expect(result).toHaveProperty('projectName', 'Test');
      expect(result).toHaveProperty('entityType', 'prospect');
      expect(result).toHaveProperty('buildTime');
      expect(result).toHaveProperty('killConditions');
      expect(Array.isArray(result.killConditions)).toBe(true);
    });

    test('handles empty config gracefully', () => {
      const result = buildOverview(PROJECT_ROOT, {});
      expect(result.projectName).toBe('');
      expect(result.entityType).toBe('');
    });
  });

  describe('buildDecisions', () => {
    test('returns array', () => {
      const result = buildDecisions(PROJECT_ROOT);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('buildScoring', () => {
    test('returns object with expected shape', () => {
      const result = buildScoring(PROJECT_ROOT);
      expect(result).toHaveProperty('options');
      expect(result).toHaveProperty('matrix');
      expect(result).toHaveProperty('recommended');
      expect(Array.isArray(result.options)).toBe(true);
    });
  });

  describe('buildCompetitors', () => {
    test('returns array', () => {
      const result = buildCompetitors(PROJECT_ROOT);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('buildTimeline', () => {
    test('returns array', () => {
      const result = buildTimeline(PROJECT_ROOT);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
