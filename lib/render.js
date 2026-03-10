'use strict';

const fs = require('node:fs');
const path = require('node:path');

function renderFile(src, dst, replacements) {
  if (!fs.existsSync(src)) {
    throw new Error(`Template file not found: ${src}`);
  }

  let content = fs.readFileSync(src, 'utf8');
  content = content
    .replace(/\{\{project\}\}/g, replacements.project)
    .replace(/\{\{org\}\}/g, replacements.org || '');

  const dir = path.dirname(dst);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dst, content, 'utf8');
}

module.exports = { renderFile };
