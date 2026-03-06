---
name: upgrade-dependency
description: >
  Upgrade a specified dependency package to a new version and verify
  the change. Triggered when the user requests dependency upgrade.
  Arguments: package name, old version, new version.
---

# Upgrade Dependency

## Steps

<!-- TODO: Adapt to your project's package manager -->

1. Find the target package in the project's dependency file.
2. Update the version number.
3. Install the new version:
   ```bash
   # Example: npm install / mvn clean install / pip install -r requirements.txt
   ```
4. Verify build:
   ```bash
   # Example: npm run build / mvn compile / make build
   ```
5. Run tests by executing the `test` skill.
6. Output change summary.

**Note**: For major version upgrades, warn about potential breaking changes. Do NOT auto-commit.
