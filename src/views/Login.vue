<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  username: 'admin',
  password: 'admin',
})

const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    await auth.login(form)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="title">登录</div>
      <div class="subtitle">默认账号密码：admin / admin</div>

      <form class="form" @submit.prevent="onSubmit">
        <label class="field">
          <span class="label">账号</span>
          <input v-model.trim="form.username" class="input" autocomplete="username" />
        </label>
        <label class="field">
          <span class="label">密码</span>
          <input
            v-model.trim="form.password"
            class="input"
            type="password"
            autocomplete="current-password"
          />
        </label>

        <div v-if="error" class="error">{{ error }}</div>

        <button class="btn primary" type="submit" :disabled="loading">
          {{ loading ? '登录中…' : '登录' }}
        </button>
      </form>

      <div class="hint">
        这是脚手架演示登录逻辑，真实项目请替换为接口登录并接入权限路由。
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 18px;
  background: radial-gradient(1200px 600px at 20% 10%, rgba(99, 102, 241, 0.25), transparent),
    radial-gradient(1200px 600px at 80% 40%, rgba(16, 185, 129, 0.18), transparent);
}

.card {
  width: 100%;
  max-width: 420px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--panel);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
}
.subtitle {
  margin-top: 6px;
  font-size: 13px;
  color: var(--muted);
}

.form {
  margin-top: 14px;
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
}
.label {
  font-size: 12px;
  color: var(--muted);
}
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  outline: none;
}
.input:focus {
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}

.error {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  font-size: 13px;
}

.hint {
  margin-top: 12px;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
}
</style>

