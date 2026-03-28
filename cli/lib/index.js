// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { askQuestions } = require('./prompts');
const { scaffold } = require('./scaffold');

async function main(nameArg) {
  console.log('\n  DS Strategy Stack — Your Project\'s Second Brain\n');

  const answers = await askQuestions(nameArg);

  if (!answers.projectName || !answers.projectType || !answers.structure) {
    console.log('Missing required answers. Exiting.');
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), answers.projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`\n  Error: Directory "${answers.projectName}" already exists.\n`);
    process.exit(1);
  }

  // Resolve template directory — when published, it's at cli/template/
  // When running from source, it's the repo root (parent of cli/)
  let templateDir = path.join(__dirname, '..', 'template');
  if (!fs.existsSync(templateDir)) {
    templateDir = path.resolve(__dirname, '..', '..');
  }

  console.log(`\n  Creating project in ${targetDir}\n`);

  try {
    const { modules } = scaffold(targetDir, templateDir, {
      projectName: answers.projectName,
      projectType: answers.projectType,
      structure: answers.structure,
    });

    // Git init
    try {
      execSync('git init', { cwd: targetDir, stdio: 'ignore' });
      execSync('git add -A', { cwd: targetDir, stdio: 'ignore' });
      execSync('git commit -m "Initial project from DS Strategy Stack"', {
        cwd: targetDir,
        stdio: 'ignore',
      });
      console.log('  \u2713 Git repository initialised');
    } catch (_e) {
      console.log('  \u26A0 Could not initialise git \u2014 you can do this manually');
    }

    // Install dashboard dependencies
    if (modules.dashboard && fs.existsSync(path.join(targetDir, 'dashboard', 'package.json'))) {
      console.log('  \u23F3 Installing dashboard dependencies...');
      try {
        execSync('npm install', {
          cwd: path.join(targetDir, 'dashboard'),
          stdio: 'ignore',
        });
        console.log('  \u2713 Dashboard dependencies installed');
      } catch (_e) {
        console.log('  \u26A0 Could not install dashboard deps \u2014 run "cd dashboard && npm install" manually');
      }
    }

    console.log(`
  \u2705 Project created!

  Next steps:

    cd ${answers.projectName}
    claude
    /onboard

  The /onboard skill will walk you through configuring
  your hypothesis, scoring dimensions, and kill conditions.
`);
  } catch (err) {
    console.error(`\n  Error: ${err.message}\n`);
    process.exit(1);
  }
}

module.exports = { main };
