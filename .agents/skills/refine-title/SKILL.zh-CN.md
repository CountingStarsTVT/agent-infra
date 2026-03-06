---
name: refine-title
description: >
  深度分析 Issue 或 PR 内容，并将其标题重构为 Conventional Commits 格式。
  当用户要求优化标题时触发。参数为 issue 或 PR 编号。
---

# 重构标题

## 执行步骤

1. 识别对象（Issue 或 PR），获取详细信息。
2. 智能分析: 确定 Type、Scope、Subject。
3. 生成建议标题，询问用户确认。
4. 确认后执行修改。
