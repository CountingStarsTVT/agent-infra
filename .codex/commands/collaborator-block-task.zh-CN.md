---
description: 标记任务阻塞并记录阻塞原因
argument-hint: <task-id> [reason]
---

标记任务 $1 为阻塞状态，记录详细的阻塞原因，并移动到 blocked 目录。

**适用场景**: 编译失败且无法修复、测试失败且原因不明、依赖库有 Bug、需求不明确、等待外部依赖。

**不应标记为阻塞**: 代码审查有问题 -> 用 `/prompts:collaborator-refine-task $1`；实现遇到困难但可解决 -> 继续实施。

执行以下步骤:

1. 验证任务存在。

2. 分析并记录阻塞原因:
   用户提供的原因: $2
   如果为空，询问用户。

3. 获取当前时间。

4. 更新 task.md: status: blocked, blocked_at, blocked_reason。

5. 添加"阻塞信息"章节。

6. 移动到阻塞目录:
   ```bash
   mkdir -p .ai-workspace/blocked && mv .ai-workspace/active/$1 .ai-workspace/blocked/
   ```

7. 验证移动成功。

8. 告知用户:
   - 解除阻塞: `mv .ai-workspace/blocked/$1 .ai-workspace/active/`
   - 然后查看状态: `/prompts:collaborator-check-task $1`

**注意**: 阻塞信息要详细、准确、客观。
