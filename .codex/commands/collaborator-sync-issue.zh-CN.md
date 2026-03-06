---
description: 将任务处理进度同步到 GitHub Issue 评论
argument-hint: <task-id>
---

将任务 $1 的处理进度摘要同步到对应的 GitHub Issue 评论。

执行以下步骤:

1. 查找任务文件（active/blocked/completed 目录）。

2. 读取任务信息: issue_number、标题、current_step、status。

3. 读取上下文文件（analysis.md、plan.md、implementation.md、review.md），提取关键进展。

4. 生成进度摘要（Markdown 格式）。

5. 同步到 Issue:
   ```bash
   gh issue comment <issue-number> --body "<摘要内容>"
   ```

6. 告知用户: 显示同步的 Issue 链接和核心内容摘要。

**注意**: 摘要要简洁，面向人类阅读，避免频繁同步，建议在完成一个完整阶段后同步。
