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

### 环境变量（可选）

项目使用 Vite 环境变量控制接口地址与是否启用 mock（见 `.env.example`）：

- **`VITE_API_BASE`**：Axios `baseURL`（默认 `/api`）
- **`VITE_USE_MOCK`**：是否启用前端 mock（开发环境默认 `true`，生产默认 `false`）
- **`VITE_PROXY_TARGET`**：可选；配置后 Vite 会把 `/api` 代理到该后端地址

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
  api/              # 接口层（Axios 封装/模块化 API）
  layouts/          # 后台布局
  router/           # 路由与守卫
  stores/           # Pinia store（示例：auth）
  types/            # 类型定义（ApiResponse/DTO 等）
  utils/            # 工具方法（如 token 存储）
  styles/           # 全局样式
  views/            # 页面（login / dashboard / 404）
```
