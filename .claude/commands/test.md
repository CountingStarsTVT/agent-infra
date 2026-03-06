---
description: Run full test workflow (compilation + unit tests)
---

Run the project's full test workflow.

**1. Compilation / Type Check**

<!-- TODO: Replace with your project's compilation command -->
```bash
# Example: npx tsc --noEmit / mvn compile / go build ./...
```

**2. Run All Unit Tests**

<!-- TODO: Replace with your project's test command -->
```bash
# Example: npm test / mvn test / pytest / go test ./...
```

**3. Output Results**

Report test result summary: passing/failing count, failure details, suggested fixes.

If tests fail, do not auto-fix. Wait for user decision.
