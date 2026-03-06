---
description: 提交当前变更到 Git（含版权头年份检查和任务状态更新）
usage: /prompts:collaborator-commit
---

# 提交变更

提交当前变更到 Git，包括版权头年份检查和任务状态更新。

## 步骤 0：检查本地修改（CRITICAL）

```bash
git status --short
git diff
```

仔细阅读 `git diff` 输出，在用户修改的基础上进行增量编辑，不要覆盖用户的实现。

## 步骤 1：版权头年份检查（CRITICAL）

```bash
current_year=$(date +%Y)
echo "当前年份: $current_year"
```

对每个修改的文件，检查是否包含版权头。如果年份不是当前年份，更新：
- `Copyright (C) 2024-2025` -> `Copyright (C) 2024-<current_year>`
- `Copyright (C) 2024` -> `Copyright (C) 2024-<current_year>`

**检查清单**：
- [ ] 使用 `date +%Y` 动态获取当前年份（绝对不要硬编码）
- [ ] 已检查所有修改文件的版权头
- [ ] 已更新过期的版权年份
- [ ] 只更新修改的文件，不批量更新

## 步骤 2：分析变更并生成提交信息

提交消息格式（Conventional Commits）：
- `<type>(<scope>): <subject>`，subject 使用英文祈使语气，不超过 50 字符

Codex 署名：
```
Co-Authored-By: Codex <noreply@openai.com>
```

## 步骤 3：创建提交

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Codex <noreply@openai.com>
EOF
)"
```

## 提交后：任务状态更新

如果在任务工作流中，更新 task.md：
- 更新 `updated_at` 为当前时间
- 适当更新 `current_step`
- 如果任务完成，建议执行 `complete-task` 命令

**下一步**：
- 代码审查：`/prompts:collaborator-review-task <task-id>`
- 创建 PR：`/prompts:collaborator-create-pr <target-branch>`
- 完成任务：`/prompts:collaborator-complete-task <task-id>`
