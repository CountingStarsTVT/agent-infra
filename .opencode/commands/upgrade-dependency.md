---
description: Upgrade a project dependency
agent: general
subtask: false
---

Upgrade a specified dependency to a new version.

Parse arguments from `$ARGUMENTS` in the format: `<package-name> <old-version> <new-version>`.
If arguments are missing, respond:
"Please provide package name and versions. Example: /upgrade-dependency yaml 2.6.0 2.7.0"
Then STOP.

1. **Parse arguments**

Extract: package name, old version, new version.

2. **Find dependency location**

<!-- TODO: Replace with your project's dependency file lookup -->
<!-- Examples: -->
<!-- Node.js: package.json (dependencies / devDependencies) -->
<!-- Python: pyproject.toml / requirements.txt -->
<!-- Java: pom.xml / build.gradle -->
Search the project's dependency file for the specified package.

If not found, respond: "Package {name} not found in dependency files." Then STOP.

3. **Check for major version upgrade**

If the major version changes (e.g., 1.x to 2.x), warn:
"This is a major version upgrade. There may be breaking changes. Proceed with caution."

4. **Update version**

Update the dependency version in the dependency file.

5. **Install dependencies**

<!-- TODO: Replace with your project's install command -->
!npm install

6. **Verify build**

<!-- TODO: Replace with your project's build command -->
!npm run build

7. **Run tests**

<!-- TODO: Replace with your project's test command -->
!npm test

8. **Report results**

Report:
- Which files were modified
- Whether build and tests passed
- Any warnings or breaking changes detected

Do NOT auto-commit. Remind the user to use `/commit`.

**Next step:** Use `/commit` to commit the dependency upgrade.
