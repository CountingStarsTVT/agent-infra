---
description: 将任务进度同步到 Issue 评论
---

将任务 $ARGUMENTS 的进度同步到 Issue。

1. 查找任务文件，从 task.md 获取 issue_number。
2. 读取上下文文件。
3. 生成进度摘要。
4. 发布评论：`gh issue comment {issue-number} --body "{摘要}"`。
5. 更新 task 的 last_synced_at。
