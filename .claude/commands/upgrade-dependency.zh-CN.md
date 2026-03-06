---
description: 升级项目依赖
---

升级依赖。参数：$ARGUMENTS（包名、原版本、新版本）。

<!-- TODO: 适配你的项目包管理器 -->

1. 在依赖文件中查找目标包。
2. 使用 Edit 工具更新版本号。
3. 安装新版本。
4. 验证构建。
5. 执行 `test` 技能进行测试验证。
6. 输出变更摘要。

**注意**: major 版本升级时提示 breaking changes。不要自动 git commit。
