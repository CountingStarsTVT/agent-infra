---
description: 提交当前变更到 Git，包含版权头年份检查和任务状态更新
---

提交当前变更到 Git。

**步骤 0: 检查用户本地修改（CRITICAL）**

1. 查看修改文件：`git status --short`
2. 查看具体修改：`git diff`
3. 仔细阅读 diff 输出，在用户修改基础上增量编辑，不要覆盖用户的实现。

**步骤 1: 更新版权头年份（CRITICAL）**

1. 获取当前年份：`date +%Y`
2. 对每个修改的文件检查版权头并更新年份。使用 Edit 工具，不要硬编码年份。

**步骤 2: 分析变更并生成提交信息**

1. 查看变更：`git status` / `git diff` / `git log --oneline -5`
2. 生成 Conventional Commits 格式提交信息：
   - `<type>(<scope>): <subject>`（英文祈使语气，不超过 50 字符）
   - Body：2-4 个要点说明变更内容和原因
   - 署名：`Co-Authored-By: Claude <noreply@anthropic.com>`

**步骤 3: 创建提交**

```bash
git add <specific-files>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**步骤 4: 更新任务状态（如果是任务相关提交）**

根据情况更新 task.md。
