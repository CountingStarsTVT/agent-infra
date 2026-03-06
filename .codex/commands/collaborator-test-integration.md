---
description: Run the project's integration test workflow
usage: /prompts:collaborator-test-integration
---

# Run Integration Tests

Execute the integration test workflow for this project.

## 1. Verify Build Artifacts

<!-- TODO: Replace with your project's build verification -->
```bash
# Example: npm run build / mvn package / make build
```

Confirm build artifacts exist.

## 2. Run Integration Tests

<!-- TODO: Replace with your project's integration test command -->
```bash
# Example: npm run test:integration / mvn verify / pytest tests/integration/
```

## 3. Output Results

Report integration test results:
- Passing/failing test count
- Environment setup issues (if any)
- Failure details and suggested fixes

If tests fail, do not auto-fix. Wait for user decision.

## Next Steps

After tests pass:
- Commit code: `/prompts:collaborator-commit`
- Create PR: `/prompts:collaborator-create-pr`
