---
description: Upgrade dependency package to new version
---

Upgrade dependency. Arguments: $ARGUMENTS (package name, old version, new version).

<!-- TODO: Adapt to your project's package manager -->

1. Find the target package in the dependency file.
2. Update the version number using Edit tool.
3. Install:
   ```bash
   # Example: npm install / mvn clean install / pip install -r requirements.txt
   ```
4. Verify build:
   ```bash
   # Example: npm run build / mvn compile / make build
   ```
5. Run tests by executing the `test` skill.
6. Output change summary.

**Note**: For major version upgrades, warn about breaking changes. Do NOT auto-commit.
