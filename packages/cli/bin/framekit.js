#!/usr/bin/env node

import('../dist/index.js').catch((err) => {
  console.error('Error loading Framekit CLI:', err);
  process.exit(1);
});
