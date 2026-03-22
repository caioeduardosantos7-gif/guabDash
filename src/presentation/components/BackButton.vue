<template>
  <button
    class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#272727] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333] hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer border-none shrink-0"
    @click="router.go(-1)"
    :aria-label="t('nav.back')"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>
