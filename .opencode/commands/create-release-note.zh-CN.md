---
description: 从 Git 历史生成发布说明
agent: general
subtask: false
---

根据自上次发布以来的 Git 提交历史生成发布说明。

1. **查找上次发布标签**

!git tag --sort=-version:refname | head -5

如果没有标签，使用初始提交作为起点：
!git rev-list --max-parents=0 HEAD

2. **收集上次发布以来的提交**

!git log {last-tag}..HEAD --oneline --no-merges

3. **分类变更**

根据 Conventional Commits 前缀按类型分组：
- **新功能** (feat)：新功能
- **Bug 修复** (fix)：Bug 修复
- **文档** (docs)：文档更新
- **重构** (refactor)：代码重构
- **测试** (test)：测试添加/修改
- **杂项** (chore)：维护任务

4. **检查破坏性变更**

搜索提交消息中的 "BREAKING CHANGE" 或类型后的 "!"：
!git log {last-tag}..HEAD --oneline --no-merges --grep="BREAKING"

5. **生成发布说明**

以 Markdown 格式输出发布说明：

```
## 变更内容

### 破坏性变更
- {破坏性变更描述}

### 新功能
- {功能描述及 PR/提交引用}

### Bug 修复
- {修复描述}

### 其他变更
- {其他变更}

### 贡献者
- {贡献者列表}

**完整变更日志：** {last-tag}...{new-tag}
```

6. **输出发布说明**

显示生成的发布说明供用户审查和编辑。

**下一步：** 复制说明后使用 `gh release create` 创建 GitHub 发布。
