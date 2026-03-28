// @ts-check
'use strict';

/** @type {Object<string, {label: string, description: string, discovery: boolean, pipeline: boolean, dashboard: boolean, entityType: string, scoringDimensions: string[]}>} */
const PROJECT_TYPES = {
  'market-entry': {
    label: 'Market Entry',
    description: 'Evaluating a new market or product opportunity',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'prospect',
    scoringDimensions: ['White Space', 'Urgency', 'Feasibility', 'Defensibility', 'Revenue Potential'],
  },
  'growth-strategy': {
    label: 'Growth Strategy',
    description: 'Expanding an existing product into new channels or segments',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'prospect',
    scoringDimensions: ['Growth Potential', 'CAC Efficiency', 'Retention Impact', 'Speed to Market', 'Scalability'],
  },
  'competitor-research': {
    label: 'Competitor Research',
    description: 'Competitive intelligence and landscape mapping',
    discovery: false, pipeline: false, dashboard: true,
    entityType: 'competitor',
    scoringDimensions: ['Market Share', 'Product Strength', 'Pricing Power', 'Growth Trajectory', 'Threat Level'],
  },
  'product-launch-gtm': {
    label: 'Product Launch / GTM',
    description: 'Bringing a product or feature to market',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'prospect',
    scoringDimensions: ['Market Readiness', 'Channel Fit', 'Competitive Timing', 'Resource Requirement', 'Revenue Impact'],
  },
  'internal-implementation': {
    label: 'Internal Implementation',
    description: 'Rolling out a new system, process, or initiative',
    discovery: false, pipeline: true, dashboard: true,
    entityType: 'workstream',
    scoringDimensions: ['Business Impact', 'Technical Complexity', 'Change Readiness', 'Resource Cost', 'Timeline Risk'],
  },
  'vendor-partner-eval': {
    label: 'Vendor / Partner Evaluation',
    description: 'Selecting tools, platforms, or partners',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'vendor',
    scoringDimensions: ['Capability Fit', 'Total Cost', 'Integration Effort', 'Vendor Stability', 'Lock-in Risk'],
  },
  'due-diligence': {
    label: 'Due Diligence',
    description: 'M&A, investment, or acquisition evaluation',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'target',
    scoringDimensions: ['Strategic Fit', 'Financial Health', 'Integration Risk', 'Synergy Potential', 'Cultural Alignment'],
  },
  'business-case': {
    label: 'Business Case',
    description: 'Building a case for investment or strategic change',
    discovery: false, pipeline: false, dashboard: false,
    entityType: 'option',
    scoringDimensions: ['ROI Potential', 'Strategic Alignment', 'Execution Risk', 'Stakeholder Support', 'Opportunity Cost'],
  },
  'transformation': {
    label: 'Transformation / Change',
    description: 'Organisational or process transformation',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'initiative',
    scoringDimensions: ['Impact Scope', 'Organisational Readiness', 'Resource Requirement', 'Risk Level', 'Time to Value'],
  },
  'custom': {
    label: 'Custom',
    description: 'Something else — configure modules manually',
    discovery: true, pipeline: true, dashboard: true,
    entityType: 'entity',
    scoringDimensions: ['White Space', 'Urgency', 'Feasibility', 'Defensibility', 'Revenue Potential'],
  },
};

module.exports = { PROJECT_TYPES };
