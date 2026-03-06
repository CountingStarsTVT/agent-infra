---
description: 为任务设计技术方案并输出实施计划
argument-hint: <task-id>
---

为任务 $1 设计技术方案，输出详细的实施计划。

执行以下步骤:

1. 查找任务文件:
   按以下优先级搜索:
   - .ai-workspace/active/$1/task.md（优先）
   - .ai-workspace/blocked/$1/task.md
   - .ai-workspace/completed/$1/task.md
   如果都不存在，提示用户任务不存在。

2. 读取需求分析:
   读取 analysis.md，理解问题的根本原因、影响范围、技术约束和依赖关系。

3. 设计解决方案:
   - 提出多个可行方案并对比优劣（效果、成本、风险、可维护性）
   - 选择最合适的方案并说明理由
   - 制定详细的实施步骤
   - 列出需要创建/修改的文件清单
   - 设计验证策略
   - 评估影响和制定风险控制方案

4. 输出方案文档:
   创建 .ai-workspace/active/$1/plan.md

5. 更新任务状态:
   - current_step: technical-design
   - assigned_to: codex
   - updated_at: 当前时间
   - 标记 technical-design 为完成

6. 告知用户:
   - 这是**人工审查检查点**，请审查技术方案
   - 审查通过后: `/prompts:collaborator-implement-task $1`

**注意**: 充分思考，不要急于实施。这是必须的人工检查点。
