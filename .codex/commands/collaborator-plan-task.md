---
description: Design a technical solution for a task and output an implementation plan
argument-hint: <task-id>
---

Design a technical solution for task $1 and output a detailed implementation plan.

Execute the following steps:

1. Find the task file:
   Search in order:
   - .ai-workspace/active/$1/task.md (priority)
   - .ai-workspace/blocked/$1/task.md
   - .ai-workspace/completed/$1/task.md
   If not found, inform the user the task does not exist.

2. Read requirement analysis:
   Read analysis.md to understand:
   - Root cause and impact scope
   - Technical constraints and special requirements
   - Related files and dependencies

3. Design solutions:
   - Propose multiple approaches and compare (effectiveness, cost, risk, maintainability)
   - Select the optimal approach with justification
   - Create detailed implementation steps
   - List files to create/modify
   - Design verification strategy (tests, validation, regression)
   - Assess impact (performance, security, compatibility)
   - Create risk mitigation and rollback plan

4. Output plan document:
   Create .ai-workspace/active/$1/plan.md containing:
   - Decision analysis (problem understanding, constraints, alternatives comparison, final choice)
   - Technical solution (core strategy, key technical points, implementation details)
   - Implementation steps (each step with actions and expected results)
   - File manifest (files to create and modify)
   - Verification strategy
   - Impact assessment
   - Risk mitigation

5. Update task status:
   - current_step: technical-design
   - assigned_to: codex
   - updated_at: current time
   - Mark technical-design as complete in workflow progress

6. Inform user:
   - Output plan name, effort estimate, risk level
   - This is a **human review checkpoint** - ask user to review the plan
   - After approval: `/prompts:collaborator-implement-task $1`

**Note**: Think thoroughly. This is a mandatory human checkpoint - wait for approval before proceeding.
