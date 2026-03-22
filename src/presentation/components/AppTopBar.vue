<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UserMenu from './UserMenu.vue'

const { t } = useI18n()

defineProps<{
  darkMode: boolean
}>()

const emit = defineEmits<{
  'toggle-dark': []
}>()

const today = computed(() => {
  const d = new Date()
  const monthKeys = ['months.jan', 'months.feb', 'months.mar', 'months.apr', 'months.may', 'months.jun', 'months.jul', 'months.aug', 'months.sep', 'months.oct', 'months.nov', 'months.dec']
  return `${d.getDate()} ${t(monthKeys[d.getMonth()])} ${d.getFullYear()}`
})
</script>

<template>
  <header class="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#3a3a3a] px-4 md:px-7 py-3 md:py-[18px] flex items-center justify-between sticky top-0 z-[15] transition-colors duration-200">
    <div class="min-w-0">
      <h1 class="text-[18px] md:text-[22px] font-bold tracking-tight text-gray-900 dark:text-gray-100 m-0 truncate">
        {{ t('topbar.greeting') }}
      </h1>
      <p class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 hidden sm:block">
        {{ t('topbar.subtitle') }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Date Pill -->
      <div class="hidden md:flex items-center gap-[7px] bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-lg px-3 py-[7px] text-[13px] font-medium cursor-pointer text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {{ today }}
      </div>

      <!-- Notification Bell -->
      <div class="w-9 h-9 bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-lg grid place-items-center cursor-pointer relative text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors duration-200">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <div class="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-red-500 rounded-full border-[1.5px] border-white dark:border-[#1e1e1e]"></div>
      </div>

      <!-- User Menu -->
      <UserMenu :dark-mode="darkMode" @toggle-dark="emit('toggle-dark')" />
    </div>
  </header>
</template>
