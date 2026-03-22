<template>
  <div class="min-h-screen bg-gray-100 dark:bg-[#272727] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
    <!-- Decorative circles -->
    <div class="fixed top-[-80px] right-[-60px] w-[220px] h-[220px] border-[28px] border-indigo-500/10 rounded-full pointer-events-none"></div>
    <div class="fixed bottom-[-60px] left-[-60px] w-[180px] h-[180px] border-[22px] border-indigo-500/8 rounded-full pointer-events-none"></div>

    <!-- Card -->
    <div class="bg-white dark:bg-[#1e1e1e] rounded-[28px] px-8 pt-10 pb-8 w-full max-w-[380px] shadow-lg border border-gray-200 dark:border-[#3a3a3a] relative z-10">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <div class="w-12 h-12 bg-indigo-500 rounded-xl grid place-items-center text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
      </div>

      <h1 class="text-[1.65rem] font-extrabold text-gray-900 dark:text-gray-100 text-center mb-2.5 tracking-tight">
        {{ t('login.title') }}
      </h1>
      <p class="text-[0.88rem] text-gray-500 dark:text-gray-400 text-center leading-relaxed mb-7">
        {{ t('login.subtitle') }}
      </p>

      <!-- Error -->
      <div v-if="error" class="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-[13px] font-medium">
        {{ error }}
      </div>

      <!-- Email -->
      <div class="relative mb-3.5">
        <input
          v-model="email"
          type="text"
          :placeholder="t('login.userPlaceholder')"
          class="w-full px-4 py-[15px] pr-11 border-[1.5px] border-gray-200 dark:border-[#3a3a3a] rounded-[14px] text-[0.88rem] text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1e1e1e] outline-none transition-colors font-sans placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-indigo-500 dark:focus:border-indigo-500"
          @keyup.enter="$refs.passInput?.focus()"
        />
        <div class="absolute right-3.5 top-1/2 -translate-y-1/2">
          <div class="w-[22px] h-[22px] rounded-full border-[1.5px] border-gray-200 dark:border-[#3a3a3a] bg-white dark:bg-[#1e1e1e]"></div>
        </div>
      </div>

      <!-- Password -->
      <div class="relative mb-3.5">
        <input
          ref="passInput"
          v-model="password"
          :type="showPass ? 'text' : 'password'"
          :placeholder="t('login.passwordPlaceholder')"
          class="w-full px-4 py-[15px] pr-[70px] border-[1.5px] border-gray-200 dark:border-[#3a3a3a] rounded-[14px] text-[0.88rem] text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1e1e1e] outline-none transition-colors font-sans placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-indigo-500 dark:focus:border-indigo-500"
          @keyup.enter="handleLogin"
        />
        <div class="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer select-none text-[0.78rem] font-semibold text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" @click="showPass = !showPass">
          {{ showPass ? t('login.hide') : t('login.show') }}
        </div>
      </div>

      <!-- Trouble -->
      <p class="text-[0.8rem] text-gray-400 dark:text-gray-500 mb-5 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
        {{ t('login.troubleLink') }}
      </p>

      <!-- Sign in -->
      <button
        class="w-full py-4 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white text-base font-semibold rounded-[14px] cursor-pointer transition-all tracking-wide mb-5 disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="handleLogin"
      >
        {{ loading ? t('login.loading') : t('login.signIn') }}
      </button>

      <!-- Register -->
      <p class="text-center text-[0.8rem] text-gray-400 dark:text-gray-500">
        {{ t('login.noAccount') }}
        <span class="font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          {{ t('login.requestAccess') }}
        </span>
      </p>
    </div>

    <!-- Footer -->
    <footer class="text-center text-[0.75rem] text-gray-400 dark:text-gray-500 mt-5 z-10">
      Copyright &copy; GuanVendas {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../domain/useAuthStore'

const { t } = useI18n()
const router = useRouter()
const { login, loading } = useAuthStore()

const email = ref('')
const password = ref('')
const showPass = ref(false)
const error = ref('')
const passInput = ref<HTMLInputElement | null>(null)

async function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = t('login.fillAll')
    return
  }
  try {
    await login(email.value, password.value)
    router.replace({ name: 'dashboard' })
  } catch {
    error.value = t('login.invalidCredentials')
  }
}
</script>
