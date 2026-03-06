---
description: 将 Issue 或 PR 标题优化为 Conventional Commits 格式
agent: general
subtask: false
---

分析 GitHub Issue 或 PR 的内容，将其标题重写为 Conventional Commits 格式：`type(scope): subject`。

从 `$ARGUMENTS` 中解析编号。如果为空，回复：
"请提供 Issue 或 PR 编号。示例：/refine-title 1024"
然后 STOP。

1. **识别并获取信息**

尝试判断该编号是 Issue 还是 PR：

!gh issue view $ARGUMENTS --json number,title,body,labels,state 2>/dev/null
!gh pr view $ARGUMENTS --json number,title,body,labels,state,files 2>/dev/null

如果两者都不存在，回复："Issue/PR #$ARGUMENTS 不存在。"然后 STOP。

2. **深度分析**

从 body 内容、标签和（PR 的）文件变更确定类型：
- `fix` - Bug 修复，标签如 "type: bug"
- `feat` - 新功能，标签如 "type: feature"
- `docs` - 仅文档变更
- `test` - 仅测试变更
- `refactor` - 代码重构
- `chore` - 维护任务

从 body 提及、标签和文件路径确定范围（scope）。

通过阅读 body 生成 subject（忽略原标题以避免偏差）。保持 50 字符以内、英文、祈使语气、无句号。

3. **展示建议**

展示分析结果和建议的新标题：

```
分析对象：Issue/PR #{id}

当前标题：{原标题}
--------------------------------------------------
分析：
- 意图：{从 body 提取的一句话摘要}
- 推断类型：{type}（依据：{证据}）
- 推断范围：{scope}（依据：{证据}）
--------------------------------------------------
建议标题：{type}({scope}): {subject}
```

询问："确认修改此标题？(y/n)"

4. **执行修改**

如果确认：
- Issue：`!gh issue edit $ARGUMENTS --title "{new-title}"`
- PR：`!gh pr edit $ARGUMENTS --title "{new-title}"`

如果未确认，回复："已取消，未做任何修改。"然后 STOP。
