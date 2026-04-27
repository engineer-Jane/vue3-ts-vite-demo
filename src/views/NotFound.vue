<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="code">404</div>
      <div class="title">页面不存在</div>
      <div class="desc">你访问的路径可能已被移除或暂不可用。</div>
      <div class="actions">
        <button class="btn" type="button" @click="router.back()">返回</button>
        <button class="btn primary" type="button" @click="router.replace('/')">去仪表盘</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 60vh;
  display: grid;
  place-items: center;
}
.card {
  padding: 18px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--panel);
  text-align: center;
}
.code {
  font-size: 54px;
  font-weight: 900;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #6366f1, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.title {
  margin-top: 6px;
  font-weight: 800;
  color: var(--text);
}
.desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--muted);
}
.actions {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>

