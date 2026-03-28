// @ts-check
'use strict';

const prompts = require('prompts');
const { PROJECT_TYPES } = require('./project-types');

async function askQuestions(defaultName) {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name',
      initial: defaultName || 'my-strategy-project',
    },
    {
      type: 'select',
      name: 'projectType',
      message: 'What type of project is this?',
      choices: Object.entries(PROJECT_TYPES).map(([value, t]) => ({
        title: t.label,
        description: t.description,
        value,
      })),
    },
    {
      type: 'select',
      name: 'structure',
      message: 'How much structure do you want?',
      choices: [
        { title: 'Full', description: 'All features: scoring, kill conditions, evidence grading, weekly reports, context snapshots', value: 'full' },
        { title: 'Essentials', description: 'Core features: research, pipeline, decisions, dashboard', value: 'essentials' },
        { title: 'Minimal', description: 'Bare bones: research and notes only', value: 'minimal' },
      ],
    },
  ], {
    onCancel: () => {
      console.log('\nSetup cancelled.');
      process.exit(0);
    },
  });

  return response;
}

module.exports = { askQuestions };
