<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const now = computed(() => new Date().toLocaleString())
</script>

<template>
  <div class="wrap">
    <div class="hero">
      <div>
        <div class="kicker">仪表盘</div>
        <h1 class="h1">欢迎回来，{{ auth.username }}</h1>
        <p class="p">当前时间：{{ now }}</p>
      </div>
      <div class="stat">
        <div class="num">3</div>
        <div class="label">示例卡片</div>
      </div>
    </div>

    <div class="grid">
      <section class="card">
        <div class="card-title">下一步建议</div>
        <ul class="list">
          <li>接入真实登录接口（Token/Refresh Token）</li>
          <li>接入权限：菜单/按钮级别</li>
          <li>封装请求：拦截器 + 统一错误处理</li>
          <li>加入多环境配置与 CI</li>
        </ul>
      </section>

      <section class="card">
        <div class="card-title">已集成</div>
        <div class="tags">
          <span class="tag">Vite</span>
          <span class="tag">Vue 3</span>
          <span class="tag">TypeScript</span>
          <span class="tag">Pinia</span>
          <span class="tag">Vue Router</span>
          <span class="tag">ESLint</span>
          <span class="tag">Prettier</span>
          <span class="tag">Husky</span>
          <span class="tag">Commitlint</span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: grid;
  gap: 16px;
}

.hero {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(16, 185, 129, 0.1));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.kicker {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 6px;
}
.h1 {
  margin: 0;
  font-size: 22px;
  color: var(--text);
}
.p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.stat {
  min-width: 140px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(99, 102, 241, 0.18);
  text-align: center;
}
@media (prefers-color-scheme: dark) {
  .stat {
    background: rgba(15, 23, 42, 0.55);
  }
}
.num {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
}
.label {
  margin-top: 2px;
  color: var(--muted);
  font-size: 12px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--panel);
}
.card-title {
  font-weight: 800;
  color: var(--text);
  margin-bottom: 10px;
}
.list {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
}
.list li {
  margin: 6px 0;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(99, 102, 241, 0.22);
  background: rgba(99, 102, 241, 0.1);
  color: var(--text);
}
</style>

