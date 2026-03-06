---
description: 按照约定式提交格式提交当前变更到 Git
agent: general
subtask: false
---

按照 Conventional Commits 格式提交当前变更到 Git。

1. **检查本地修改**

!git status --short
!git diff
!git diff --cached

如果没有变更（无未跟踪、已修改或已暂存的文件），回复：
"没有需要提交的变更。"
然后 STOP。

2. **检查版权头**

!date +%Y

对于每个修改的文件，检查是否包含版权头。如果年份过期，在提交前更新为包含当前年份。

3. **参考最近提交的风格**

!git log --oneline -5

4. **暂存相关文件**

暂存与当前工作相关的文件。不要暂存敏感文件（.env、credentials、secrets）。

5. **草拟提交消息**

分析所有已暂存的变更，按照 Conventional Commits 格式草拟提交消息：

```
<type>(<scope>): <subject>
```

- type: feat, fix, docs, refactor, test, chore
- scope: 可选，受影响的模块
- subject: 英文，祈使语气，不超过 50 字符

6. **创建提交**

使用草拟的消息执行提交。附加 co-authored-by 行：

```
Co-Authored-By: OpenCode <noreply@opencode.ai>
```

7. **验证提交**

!git log --oneline -1
!git status --short

8. **如适用，更新任务状态**

如果此提交是任务工作流的一部分，使用当前时间戳和提交哈希更新 task.md 文件。

**下一步：** 使用 `/create-pr` 创建 Pull Request，或使用 `/complete-task` 完成任务。
