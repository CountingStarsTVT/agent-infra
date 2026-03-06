---
description: Run integration tests
agent: general
subtask: false
---

Run the project's integration test suite and report results.

1. **Build the project first (if needed)**

<!-- TODO: Replace with your project's build command -->
!npm run build

2. **Run integration tests**

<!-- TODO: Replace with your project's integration test command -->
!npm run test:integration

3. **Output test results summary**

Report:
- Number of integration tests passed
- Number of integration tests failed (if any)
- Any environment-related issues

4. **Handle failures**

If tests fail:
- Output failure details, error messages, and logs
- Distinguish between test failures and environment issues
- Suggest possible fix directions
- Do NOT auto-fix code; wait for user decision

**Next step:** Once all tests pass, use `/commit` to commit changes.
