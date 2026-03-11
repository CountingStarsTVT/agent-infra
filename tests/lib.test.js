const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const { filePath, loadFresh, renderPlaceholders } = require("./helpers");

test("paths detect clone installs when bundled templates live under HOME", () => {
  const originalHomedir = os.homedir;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ai-collab-home-"));

  try {
    const installDir = path.join(tmpDir, ".ai-collaboration-installer");
    fs.mkdirSync(path.join(installDir, "templates"), { recursive: true });

    os.homedir = () => tmpDir;
    const paths = loadFresh("lib/paths.js");

    assert.equal(paths.resolveInstallDir(), installDir);
    assert.equal(paths.resolveTemplateDir(), filePath("templates"));
    assert.equal(paths.isCloneInstall(), false);

    fs.rmSync(path.join(installDir, "templates"), { recursive: true, force: true });
    fs.symlinkSync(filePath("templates"), path.join(installDir, "templates"), "dir");

    const clonePaths = loadFresh("lib/paths.js");
    assert.equal(clonePaths.resolveTemplateDir(), filePath("templates"));
    assert.equal(clonePaths.isCloneInstall(), true);
  } finally {
    os.homedir = originalHomedir;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("renderPlaceholders only replaces double-brace placeholders", () => {
  const rendered = renderPlaceholders(
    "literal {project} {{project}} {org} {{org}}",
    { project: "demo", org: "acme" }
  );

  assert.equal(rendered, "literal {project} demo {org} acme");
});

test("prompt does not recreate readline after close", async () => {
  const readline = require("node:readline");
  const originalCreateInterface = readline.createInterface;
  const originalStdoutWrite = process.stdout.write;
  let createCount = 0;

  readline.createInterface = () => {
    createCount += 1;
    const handlers = {};

    return {
      on(event, handler) {
        handlers[event] = handler;
        return this;
      },
      close() {
        if (handlers.close) {
          handlers.close();
        }
      }
    };
  };
  process.stdout.write = () => true;

  try {
    const promptModule = loadFresh("lib/prompt.js");
    const firstPrompt = promptModule.prompt("Project name", "demo");

    promptModule.closePrompt();
    const firstValue = await firstPrompt;
    const secondValue = await promptModule.prompt("Project name", "demo");

    assert.equal(firstValue, "demo");
    assert.equal(secondValue, "demo");
    assert.equal(createCount, 1);
  } finally {
    readline.createInterface = originalCreateInterface;
    process.stdout.write = originalStdoutWrite;
  }
});
