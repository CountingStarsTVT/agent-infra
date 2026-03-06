---
name: sync-pr
description: >
  将任务处理进度同步到对应的 Pull Request 评论。
  当用户要求同步进度到 PR 时触发。参数为 task-id。
---

# 同步进度到 PR

## 执行步骤

1. 查找任务文件，从 task.md 获取 PR 号码。
2. 读取上下文文件，提取关键进展。
3. 生成进度摘要。
4. 同步: `gh pr comment <pr-number> --body "<摘要>"`

**注意**: 在进度摘要中 @mention 相关审查者。
