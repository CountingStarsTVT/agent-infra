---
description: 根据技术方案实施任务并输出实现报告
argument-hint: <task-id>
---

根据技术方案实施任务 $1，编写代码和测试，输出实现报告。

执行以下步骤:

1. 验证前置条件:
   检查必需文件:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/plan.md
   如果不存在，提示用户先完成前置步骤。

2. 读取技术方案:
   仔细阅读 plan.md，理解技术方案、实施步骤、文件清单和测试策略。

3. 执行代码实现:
   按照 plan.md 步骤执行:
   - 实现功能代码
   - 编写完整的单元测试
   - 遵循项目编码规范
   - 修改带版权头的文件时，运行 `date +%Y` 更新版权头

4. 运行测试验证:
   执行项目测试流程确保所有测试通过。参考 `test` 技能了解具体测试命令。

5. 输出实现报告:
   创建 .ai-workspace/active/$1/implementation.md

6. 更新任务状态:
   - current_step: implementation
   - assigned_to: codex
   - updated_at: 当前时间
   - 标记 implementation 为完成

7. 告知用户:
   - 输出修改文件数、新增文件数、测试通过数
   - 提示下一步: `/prompts:collaborator-review-task $1`

**注意**: 严格遵循 plan.md，不要自动执行 git commit。
