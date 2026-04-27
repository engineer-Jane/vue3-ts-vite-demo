<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const title = computed(() => (route.meta.title as string | undefined) ?? '后台管理')

async function onLogout() {
  auth.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <div class="layout">
    <aside class="sider">
      <div class="brand">
        <div class="logo">A</div>
        <div class="brand-text">
          <div class="name">Vite Vue3 Admin</div>
          <div class="desc">最小可用脚手架</div>
        </div>
      </div>

      <nav class="menu">
        <RouterLink class="item" :class="{ active: route.name === 'dashboard' }" to="/">
          仪表盘
        </RouterLink>
      </nav>
    </aside>

    <div class="main">
      <header class="header">
        <div class="header-title">{{ title }}</div>
        <div class="header-right">
          <span class="user">你好，{{ auth.username }}</span>
          <button class="btn ghost" type="button" @click="onLogout">退出登录</button>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  background: var(--bg);
}

.sider {
  border-right: 1px solid var(--border);
  background: var(--panel);
  padding: 16px 12px;
}

.brand {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(16, 185, 129, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.logo {
  height: 40px;
  width: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #10b981);
}

.brand-text .name {
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;
}
.brand-text .desc {
  margin-top: 2px;
  font-size: 12px;
  color: var(--muted);
}

.menu {
  margin-top: 14px;
  display: grid;
  gap: 6px;
}
.menu .item {
  text-decoration: none;
  color: var(--text);
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
}
.menu .item:hover {
  background: rgba(99, 102, 241, 0.08);
}
.menu .item.active {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.25);
}

.main {
  min-width: 0;
  display: grid;
  grid-template-rows: 56px 1fr;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

@media (prefers-color-scheme: dark) {
  .header {
    background: rgba(15, 23, 42, 0.55);
  }
}

.header-title {
  font-weight: 700;
  color: var(--text);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user {
  color: var(--muted);
  font-size: 13px;
}

.content {
  padding: 18px;
}
</style>

