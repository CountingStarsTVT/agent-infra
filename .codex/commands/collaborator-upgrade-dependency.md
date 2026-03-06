---
description: Upgrade a specified dependency package to a new version and verify
argument-hint: <package-name> <from-version> <to-version>
---

# Upgrade Dependency

Upgrade the following dependency:
- Package: $1
- Current version: $2
- Target version: $3

## Steps

<!-- TODO: Adapt to your project's package manager -->

1. Find the target package in the project's dependency file.
   ```bash
   # Example: grep in package.json / pom.xml / requirements.txt / go.mod
   ```

2. Update the version number from $2 to $3.

3. Install the new version:
   ```bash
   # Example: npm install / mvn clean install / pip install -r requirements.txt / go mod tidy
   ```

4. Verify build:
   ```bash
   # Example: npm run build / mvn compile / make build / go build ./...
   ```

5. Run tests:
   Execute the project's test workflow.
   Refer to the `test` skill for project-specific test commands.

6. Output change summary:
   - Which files were modified
   - Whether build and tests passed
   - For major version upgrades, warn about potential breaking changes

Do NOT auto-commit. Remind user: `/prompts:collaborator-commit`
