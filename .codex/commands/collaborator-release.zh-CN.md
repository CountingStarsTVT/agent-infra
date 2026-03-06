---
description: 执行版本发布流程
argument-hint: <version>
---

# 版本发布

执行版本 $1 的发布流程。

## 步骤

1. 解析并验证版本号（$1 必须符合 X.Y.Z 格式）。

2. 检查工作区状态:
   ```bash
   git status --short
   ```
   要求工作目录干净。如果有未提交的变更，要求用户先提交或暂存。

<!-- TODO: 添加你项目的发布步骤 -->

3. 更新项目文件中的版本引用:
   ```bash
   # 示例: 更新 package.json / pom.xml / setup.py 的版本号
   ```

4. 创建发布提交:
   ```bash
   git add .
   git commit -m "$(cat <<'EOF'
   chore: release v$1

   Co-Authored-By: Codex <noreply@openai.com>
   EOF
   )"
   ```

5. 创建 git tag:
   ```bash
   git tag -a v$1 -m "Release v$1"
   ```

6. 提供回滚指令（以防出现问题）。

**注意**: 不要自动推送，让用户审查后推送:
```bash
git push origin <branch> --follow-tags
```

## 下一步

- 生成发布说明: `/prompts:collaborator-create-release-note $1`
