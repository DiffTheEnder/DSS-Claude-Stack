const { PROJECT_TYPES } = require('../project-types');

describe('PROJECT_TYPES', () => {
  test('has 10 project types', () => {
    expect(Object.keys(PROJECT_TYPES)).toHaveLength(10);
  });

  test('every type has required fields', () => {
    for (const [key, type] of Object.entries(PROJECT_TYPES)) {
      expect(type).toHaveProperty('label');
      expect(type).toHaveProperty('description');
      expect(type).toHaveProperty('discovery');
      expect(type).toHaveProperty('pipeline');
      expect(type).toHaveProperty('dashboard');
      expect(type).toHaveProperty('entityType');
      expect(type).toHaveProperty('scoringDimensions');
      expect(typeof type.label).toBe('string');
      expect(typeof type.discovery).toBe('boolean');
      expect(Array.isArray(type.scoringDimensions)).toBe(true);
      expect(type.scoringDimensions.length).toBeGreaterThanOrEqual(3);
    }
  });

  test('custom type enables all modules by default', () => {
    expect(PROJECT_TYPES['custom'].discovery).toBe(true);
    expect(PROJECT_TYPES['custom'].pipeline).toBe(true);
    expect(PROJECT_TYPES['custom'].dashboard).toBe(true);
  });

  test('competitor-research disables discovery and pipeline', () => {
    expect(PROJECT_TYPES['competitor-research'].discovery).toBe(false);
    expect(PROJECT_TYPES['competitor-research'].pipeline).toBe(false);
    expect(PROJECT_TYPES['competitor-research'].dashboard).toBe(true);
  });

  test('business-case disables all modules', () => {
    expect(PROJECT_TYPES['business-case'].discovery).toBe(false);
    expect(PROJECT_TYPES['business-case'].pipeline).toBe(false);
    expect(PROJECT_TYPES['business-case'].dashboard).toBe(false);
  });
});
