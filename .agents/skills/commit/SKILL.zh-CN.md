---
name: commit
description: >
  提交当前变更到 Git，包含版权头年份检查和任务状态更新。
  当用户要求提交代码、git commit、保存变更时触发。
---

# 提交代码

## 步骤 0：检查用户本地修改（CRITICAL）

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

对每个修改的文件检查版权头并更新。

## 步骤 2：分析变更并生成提交信息

提交消息格式（Conventional Commits）：
- `<type>(<scope>): <subject>`，subject 使用英文祈使语气，不超过 50 字符

署名（使用你自己的模型名称）：
```
Co-Authored-By: <你的模型名称> <noreply@provider.com>
```

## 步骤 3：创建提交

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: <你的模型名称> <noreply@provider.com>
EOF
)"
```

## 提交后：任务状态更新

根据情况更新任务状态。
