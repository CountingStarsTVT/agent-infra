---
name: create-pr
description: >
  创建 Pull Request 到指定或自动推断的目标分支。
  当用户要求创建 PR 时触发。可选参数为目标分支。
---

# 创建 Pull Request

## 执行步骤

1. 确定目标分支（用户指定或自动推断）。
2. 读取 PR 模板，查看最近合并的 PR 格式。
3. 分析当前分支的完整变更。
4. 检查远程分支状态，如果未推送则先推送。
5. 创建 PR。

**注意**: 确保 PR 标题遵循 Conventional Commits 格式。
