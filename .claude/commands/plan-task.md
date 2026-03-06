---
description: Design technical solution for a task
---

Design a technical solution for task $ARGUMENTS.

1. Find the task file in `.ai-workspace/` (search active/blocked/completed).
2. Read `analysis.md`.
3. Design multiple candidate solutions, compare and select optimal.
4. Output plan to `.ai-workspace/active/{task-id}/plan.md` with:
   - Decision rationale
   - Implementation steps
   - File checklist
   - Verification strategy
   - Risk assessment
5. Update task status.
6. **Human checkpoint**: Inform user to review the plan before proceeding to `/implement-task`.
