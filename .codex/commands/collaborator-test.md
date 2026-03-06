---
description: Run the project's full test workflow (compilation check + unit tests)
usage: /prompts:collaborator-test
---

# Run Tests

Execute the full test workflow for this project.

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

## Next Steps

After tests pass:
- Commit code: `/prompts:collaborator-commit`
- Review code: `/prompts:collaborator-review-task <task-id>`
