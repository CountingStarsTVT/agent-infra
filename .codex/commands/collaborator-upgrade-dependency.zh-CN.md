---
description: 升级项目依赖到指定版本并验证
argument-hint: <package-name> <from-version> <to-version>
---

# 升级依赖

升级以下依赖：
- 包名：$1
- 当前版本：$2
- 目标版本：$3

## 步骤

<!-- TODO: 适配你项目的包管理器 -->

1. 在项目依赖文件中查找目标包。
   ```bash
   # 示例: 在 package.json / pom.xml / requirements.txt / go.mod 中搜索
   ```

2. 将版本号从 $2 更新为 $3。

3. 安装新版本:
   ```bash
   # 示例: npm install / mvn clean install / pip install -r requirements.txt / go mod tidy
   ```

4. 验证构建:
   ```bash
   # 示例: npm run build / mvn compile / make build / go build ./...
   ```

5. 运行测试:
   执行项目测试流程。参考 `test` 技能了解具体命令。

6. 输出变更摘要:
   - 修改了哪些文件
   - 构建和测试是否通过
   - 如果是 major 版本升级，提示可能的 breaking changes

不要自动提交，提醒用户: `/prompts:collaborator-commit`
