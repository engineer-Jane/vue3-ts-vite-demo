# Vite Vue3 Admin（脚手架）

一个**开箱即用的后台管理系统脚手架**，基于 Vite + Vue 3 + TypeScript，内置基础路由、登录页、后台布局（侧边栏/头部/内容区），并集成 ESLint / Prettier / Husky / Commitlint 的提交与格式规范。

## 预览截图

> 说明：仓库内提供的是 **SVG 占位截图**，方便你先把 README 跑通；你可以替换为真实截图（PNG/JPG）并保持文件路径不变。

### 登录页

![登录页](docs/screenshots/login.svg)

### 仪表盘

![仪表盘](docs/screenshots/dashboard.svg)

## 技术栈

- **构建**：Vite
- **框架**：Vue 3（`<script setup>`）
- **语言**：TypeScript
- **路由**：Vue Router
- **状态管理**：Pinia
- **规范**：ESLint + Prettier
- **提交规范**：Husky + lint-staged + Commitlint（Conventional Commits）

## 本地运行

### 环境要求

- Node.js 18+（建议 LTS）
- npm 9+

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

默认访问：`http://localhost:5173/`

### 构建与预览

```bash
npm run build
npm run preview
```

## 代码规范与提交规范

### 格式化与检查

```bash
npm run lint
npm run lint:fix
npm run format
```

### Husky Hooks

- **pre-commit**：执行 `lint-staged`（对暂存区文件自动修复/格式化）
- **commit-msg**：执行 commitlint 校验提交信息

### 提交信息示例

```bash
git commit -m "feat: init admin scaffold"
git commit -m "fix: correct login redirect"
```

## 目录结构（简化）

```text
src/
  layouts/          # 后台布局
  router/           # 路由与守卫
  stores/           # Pinia store（示例：auth）
  styles/           # 全局样式
  views/            # 页面（login / dashboard / 404）
```
