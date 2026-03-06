---
name: upgrade-dependency
description: >
  升级项目中的指定依赖包到新版本并验证变更。
  当用户要求升级依赖时触发。参数为包名、原版本和新版本。
---

# 升级依赖

## 执行步骤

<!-- TODO: 适配你的项目包管理器 -->

1. 在项目依赖文件中查找目标包。
   ```bash
   # 示例: grep "package-name" package.json / pom.xml / requirements.txt
   ```

2. 更新版本号。
   ```bash
   # 示例: npm install package@version / 编辑 pom.xml / pip install package==version
   ```

3. 安装新版本。
   ```bash
   # 示例: npm install / mvn dependency:resolve / pip install -r requirements.txt
   ```

4. 验证构建。
   ```bash
   # 示例: npm run build / mvn compile / python -m py_compile
   ```

5. 执行 `test` 技能进行测试验证。

6. 输出变更摘要。

**注意**: 如果是 major 版本升级，提示可能的 breaking changes。不要自动 git commit。
