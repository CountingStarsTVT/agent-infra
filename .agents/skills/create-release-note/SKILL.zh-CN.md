---
name: create-release-note
description: >
  从 PR 和 commit 生成版本发布说明。
  当用户要求生成发布说明时触发。参数为版本号。
---

# 创建发布说明

## 执行步骤

1. 确定版本范围（当前版本和上一个版本）。
2. 收集变更（git log、merged PR）。
3. 按类型和模块分类变更。
4. 生成 Markdown 格式的发布说明。
5. 创建 GitHub Draft Release。

**注意**: 发布前请审查草稿。
