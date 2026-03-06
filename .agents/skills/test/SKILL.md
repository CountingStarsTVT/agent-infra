---
name: test
description: >
  Execute the project's full test workflow (compilation check + unit tests).
  Triggered when the user requests running tests or verifying code quality.
---

# Run Tests

## 1. Compilation / Type Check

<!-- TODO: Replace with your project's compilation command -->
```bash
# Example: npx tsc --noEmit / mvn compile / go build ./...
```

Confirm no compilation errors.

## 2. Run All Unit Tests

<!-- TODO: Replace with your project's test command -->
```bash
# Example: npm test / mvn test / pytest / go test ./...
```

## 3. Output Results

Report test result summary:
- Passing/failing test count
- Failure details (if any)
- Suggested fix direction (if failures exist)

If tests fail, do not auto-fix code. Wait for user decision.
