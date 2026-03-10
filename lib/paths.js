'use strict';

const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

function resolveBundledTemplateDir() {
  return path.join(__dirname, '..', 'templates');
}

function resolveCloneTemplateDir() {
  return path.join(os.homedir(), '.ai-collaboration-installer', 'templates');
}

function normalizePath(targetPath) {
  try {
    return fs.realpathSync(targetPath);
  } catch {
    return path.resolve(targetPath);
  }
}

function resolveTemplateDir() {
  // npm install mode: templates shipped alongside the package
  const npmPath = resolveBundledTemplateDir();
  if (fs.existsSync(npmPath)) {
    return npmPath;
  }

  // clone install mode: ~/.ai-collaboration-installer/templates
  const clonePath = resolveCloneTemplateDir();
  if (fs.existsSync(clonePath)) {
    return clonePath;
  }

  return null;
}

function resolveInstallDir() {
  return path.join(os.homedir(), '.ai-collaboration-installer');
}

function isCloneInstall() {
  const npmPath = resolveBundledTemplateDir();
  const clonePath = resolveCloneTemplateDir();
  return fs.existsSync(npmPath) && normalizePath(npmPath) === normalizePath(clonePath);
}

module.exports = { resolveTemplateDir, resolveInstallDir, isCloneInstall };
