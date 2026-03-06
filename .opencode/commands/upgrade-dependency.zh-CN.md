---
description: 升级项目依赖
agent: general
subtask: false
---

将指定依赖升级到新版本。

从 `$ARGUMENTS` 中解析参数，格式为：`<包名> <旧版本> <新版本>`。
如果参数缺失，回复：
"请提供包名和版本号。示例：/upgrade-dependency yaml 2.6.0 2.7.0"
然后 STOP。

1. **解析参数**

提取：包名、旧版本、新版本。

2. **查找依赖位置**

<!-- TODO: 替换为你项目的依赖文件查找方式 -->
<!-- 示例： -->
<!-- Node.js: package.json (dependencies / devDependencies) -->
<!-- Python: pyproject.toml / requirements.txt -->
<!-- Java: pom.xml / build.gradle -->
在项目的依赖文件中搜索指定包。

如果未找到，回复："在依赖文件中未找到包 {name}。"然后 STOP。

3. **检查主版本升级**

如果主版本号发生变化（例如 1.x 到 2.x），警告：
"这是主版本升级，可能存在破坏性变更。请谨慎操作。"

4. **更新版本号**

在依赖文件中更新依赖版本。

5. **安装依赖**

<!-- TODO: 替换为你项目的安装命令 -->
!npm install

6. **验证构建**

<!-- TODO: 替换为你项目的构建命令 -->
!npm run build

7. **运行测试**

<!-- TODO: 替换为你项目的测试命令 -->
!npm test

8. **报告结果**

报告：
- 修改了哪些文件
- 构建和测试是否通过
- 检测到的任何警告或破坏性变更

不要自动提交。提醒用户使用 `/commit`。

**下一步：** 使用 `/commit` 提交依赖升级。
