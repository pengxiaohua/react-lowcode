# 基于 React18 + TypeScript + Tailwind 的低代码平台

**English** | [中文](./README.md)

### 一个使用 React，快速搭建页面的低代码平台

## 计划实现：

- 操作历史快照
- 支持生成 react 模板组件
- 生成组件大纲树
- 提供常见的表单和列表模板
- 在 sandbox 中执行自定义逻辑
- 基于 monaco-editor 自定义代码补全规则
- 使用 Schema 描述数据结构（因为 schema 可以生成校验函数）

### 模型驱动的视图

从最简单的结构来看，一个模型驱动的视图体系包含以下要素：

- 模型

  - 定义状态结构
  - 定义动作

- 视图
  - 订阅状态
  - 触发动作

这是很简单的一种渲染模式，可以适用于大多数的场景。

## 克隆项目

```shell
git clone https://github.com/pengxiaohua/react-lowcode
```

```bash
cd react-lowcode

pnpm install

```

- run

```bash
pnpm run dev
```

- build

```bash
pnpm build
```

## 技术栈

- 编程语言：[TypeScript 5.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite 5.x](https://cn.vitejs.dev/)
- 前端框架：[React 18.x](https://react.dev/)
  <!-- - 路由工具：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html) -->
  <!-- - 状态管理：[Vuex 4.x](https://next.vuex.vuejs.org/) -->
    <!-- - PC 端 UI 框架：[Element Plus](https://element-plus.org/#/zh-CN) -->
  <!-- - H5 端 UI 框架：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/) -->
- Tailwind CSS：[tailwindcss](https://tailwindcss.com/)
- HTTP 工具：[Axios](https://axios-http.com/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
<!-- - 单元测试：[vue-test-utils](https://next.vue-test-utils.vuejs.org/) + [jest](https://jestjs.io/) + [vue-jest](https://github.com/vuejs/vue-jest) + [ts-jest](https://kulshekhar.github.io/ts-jest/) -->
- 自动部署：[GitHub Actions](https://docs.github.com/cn/actions/learn-github-actions)

### 功能清单

- [x] 动态添加页面
- [x] 拖拽式生成组件
- [ ] service worker + indexeddb 实现无服务端的前端交互
- [ ] 数据源管理(支持导入 swagger JSON 生成数据模型及接口)
- [ ] 提供预置函数
- [ ] 更多组件的封装
- [ ] 其他...

<!-- ### 简易说明

目前在使用表单时，需要把相关的`表单控件`放到`表单容器`内部，并且需要将`按钮`放到`表单容器`内，然后再讲`按钮的type`设置为`表单提交按钮`这时候点击提交按钮才会自动收集表单容器内部的所有字段和值 -->

|

### 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `build` 对构建系统或者外部依赖项进行了修改
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
