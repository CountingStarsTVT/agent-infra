---
description: 创建 Pull Request
---

创建 Pull Request。可选参数：目标分支 $ARGUMENTS。

1. 确定目标分支（从参数或 `git log` 推断）。
2. 读取 PR 模板：`.github/PULL_REQUEST_TEMPLATE.md`。
3. 查看最近合并的 PR 格式。
4. 分析当前分支变更。
5. 如果未推送则先推送。
6. 使用 `gh pr create` 创建 PR。
