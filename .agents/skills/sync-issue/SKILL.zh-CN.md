---
name: sync-issue
description: >
  将任务处理进度同步到对应的 GitHub Issue 评论。
  当用户要求同步进度到 issue 时触发。参数为 task-id。
---

# 同步进度到 Issue

## 执行步骤

1. 查找任务文件，从 task.md 获取 issue_number。
2. 读取上下文文件，提取关键进展。
3. 生成进度摘要。
4. 同步: `gh issue comment <issue-number> --body "<摘要>"`

**注意**: 摘要要简洁，面向人类阅读。
