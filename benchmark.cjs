const { performance } = require('perf_hooks');

const highlights = [
  'Lead architecture and engineering execution for Lumos, an AI-powered game analytics platform for product, market, and feature intelligence use cases.',
  'Re-architected Lumos backend and CDN-backed data delivery using Python, FastAPI, AWS CDK, S3, CloudFront, Lambda/Fargate, and Boto3.',
  'Built Steam analytics ETL pipelines for DAU/MAU, wishlist trends, feature metrics, personas, temporal backfills, tag taxonomy mapping, and copies-sold/revenue prediction.',
  'Integrated LLM-based search/chat with Azure API support, enabling natural-language querying of game intelligence and analytics.',
  'Hardened subscription, payments, authentication, and access-control workflows across Stripe, Cognito, Mixpanel, usage limits, feature overrides, team invites, and DB-backed subscription lifecycle.',
  'Modernized AWS infrastructure and release operations using serverless architecture, deployment validation, global latency optimization, CloudFront CDN patterns, and production runbooks.',
  'Mentored engineers and led cross-functional delivery across architecture, API documentation, release notes, user guides, AWS inventories, Confluence documentation, and roadmaps.'
];

function benchmarkOld() {
    let matches = 0;
    for (let i = 0; i < 100000; i++) {
        for (const item of highlights) {
            item.split(' ').forEach((word) => {
                const isKey = ['Led', 'Architected', 'Designed', 'Built', 'Managed'].includes(word);
                if (isKey) matches++;
            });
        }
    }
    return matches;
}

const KEY_VERBS = new Set(['Led', 'Architected', 'Designed', 'Built', 'Managed']);

function benchmarkNew() {
    let matches = 0;
    for (let i = 0; i < 100000; i++) {
        for (const item of highlights) {
            item.split(' ').forEach((word) => {
                const isKey = KEY_VERBS.has(word);
                if (isKey) matches++;
            });
        }
    }
    return matches;
}

const t0 = performance.now();
benchmarkOld();
const t1 = performance.now();

const t2 = performance.now();
benchmarkNew();
const t3 = performance.now();

console.log(`Old: ${t1 - t0} ms`);
console.log(`New: ${t3 - t2} ms`);
