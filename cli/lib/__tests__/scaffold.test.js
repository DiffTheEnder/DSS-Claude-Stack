const fs = require('fs');
const path = require('path');
const os = require('os');
const { scaffold, validateOptions } = require('../scaffold');

describe('validateOptions', () => {
  const tmpDir = path.join(os.tmpdir(), 'dss-test-' + Date.now());
  const fakeTemplate = path.join(os.tmpdir(), 'dss-template-' + Date.now());

  beforeAll(() => {
    // Create a minimal fake template
    fs.mkdirSync(fakeTemplate, { recursive: true });
    fs.writeFileSync(path.join(fakeTemplate, 'CLAUDE.md'), '# Test');
  });

  afterAll(() => {
    fs.rmSync(fakeTemplate, { recursive: true, force: true });
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test('rejects empty project name', () => {
    expect(() => validateOptions(tmpDir, fakeTemplate, {
      projectName: '',
      projectType: 'market-entry',
      structure: 'full',
    })).toThrow('Project name is required');
  });

  test('rejects invalid project name characters', () => {
    expect(() => validateOptions(tmpDir, fakeTemplate, {
      projectName: '../bad-path',
      projectType: 'market-entry',
      structure: 'full',
    })).toThrow('Invalid project name');
  });

  test('rejects unknown project type', () => {
    expect(() => validateOptions(tmpDir, fakeTemplate, {
      projectName: 'test-project',
      projectType: 'nonexistent',
      structure: 'full',
    })).toThrow('Unknown project type');
  });

  test('rejects unknown structure', () => {
    expect(() => validateOptions(tmpDir, fakeTemplate, {
      projectName: 'test-project',
      projectType: 'market-entry',
      structure: 'ultra',
    })).toThrow('Unknown structure');
  });

  test('rejects non-existent template directory', () => {
    expect(() => validateOptions(tmpDir, '/nonexistent/path', {
      projectName: 'test-project',
      projectType: 'market-entry',
      structure: 'full',
    })).toThrow('Template directory not found');
  });

  test('accepts valid options', () => {
    expect(() => validateOptions(tmpDir, fakeTemplate, {
      projectName: 'test-project',
      projectType: 'market-entry',
      structure: 'full',
    })).not.toThrow();
  });
});

describe('scaffold', () => {
  const fakeTemplate = path.join(os.tmpdir(), 'dss-scaffold-template-' + Date.now());
  let targetDir;

  beforeAll(() => {
    // Create a minimal template with required structure
    fs.mkdirSync(path.join(fakeTemplate, 'memory'), { recursive: true });
    fs.mkdirSync(path.join(fakeTemplate, 'research', 'competitors'), { recursive: true });
    fs.mkdirSync(path.join(fakeTemplate, 'docs'), { recursive: true });
    fs.writeFileSync(path.join(fakeTemplate, 'CLAUDE.md'), '# {{PROJECT_NAME}}');
    fs.writeFileSync(path.join(fakeTemplate, 'memory', 'research.md'), '# Research');
    fs.writeFileSync(path.join(fakeTemplate, 'memory', 'decisions.md'), '# Decisions');
  });

  beforeEach(() => {
    targetDir = path.join(os.tmpdir(), 'dss-scaffold-out-' + Date.now());
  });

  afterEach(() => {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    fs.rmSync(fakeTemplate, { recursive: true, force: true });
  });

  test('creates project directory with config', () => {
    const result = scaffold(targetDir, fakeTemplate, {
      projectName: 'My Project',
      projectType: 'market-entry',
      structure: 'full',
    });

    expect(fs.existsSync(targetDir)).toBe(true);
    expect(fs.existsSync(path.join(targetDir, 'project.config.json'))).toBe(true);

    const config = JSON.parse(fs.readFileSync(path.join(targetDir, 'project.config.json'), 'utf-8'));
    expect(config.projectName).toBe('My Project');
    expect(config.projectType).toBe('market-entry');
    expect(config.projectSlug).toBe('my-project');
    expect(result.modules.discovery).toBe(true);
  });

  test('minimal structure disables all optional modules', () => {
    const result = scaffold(targetDir, fakeTemplate, {
      projectName: 'Minimal Test',
      projectType: 'market-entry',
      structure: 'minimal',
    });

    expect(result.modules.discovery).toBe(false);
    expect(result.modules.pipeline).toBe(false);
    expect(result.modules.dashboard).toBe(false);
    expect(result.features.scoring).toBe(false);
    expect(result.features.evidenceGrading).toBe(false);
  });

  test('cleans up on failure for non-existent target parent', () => {
    // This test verifies the error handling path
    expect(() => scaffold(targetDir, fakeTemplate, {
      projectName: '',
      projectType: 'market-entry',
      structure: 'full',
    })).toThrow();

    // Target should not exist after cleanup
    expect(fs.existsSync(targetDir)).toBe(false);
  });
});
