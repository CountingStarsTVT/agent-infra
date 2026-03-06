---
description: Run the full unit test suite
agent: general
subtask: false
---

Run the project's unit test suite and report results.

1. **Run type/compile check (if applicable)**

<!-- TODO: Replace with your project's type check command -->
!npx tsc --noEmit

2. **Run unit tests**

<!-- TODO: Replace with your project's test command -->
!npm test

3. **Output test results summary**

Report:
- Number of tests passed
- Number of tests failed (if any)
- Test coverage (if configured)

4. **Handle failures**

If tests fail:
- Output failure details and error messages
- Suggest possible fix directions
- Do NOT auto-fix code; wait for user decision

**Next step:** Once tests pass, use `/commit` to commit changes.
