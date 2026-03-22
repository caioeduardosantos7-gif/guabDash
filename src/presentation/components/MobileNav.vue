<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const navItems = [
  { labelKey: 'nav.overview', route: '/', icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  { labelKey: 'nav.sales', route: '/vendas', icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>' },
  { labelKey: 'nav.products', route: '/produtos', icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { labelKey: 'nav.customers', route: '/clientes', icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
]

function isActive(navRoute: string) {
  return route.path === navRoute
}

function navigateTo(navRoute: string) {
  router.push(navRoute)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">
    <div class="w-full bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#3a3a3a] flex items-center justify-around px-2 pt-2.5 pb-5 rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
      <div
        v-for="item in navItems"
        :key="item.labelKey"
        class="flex flex-col items-center gap-1 cursor-pointer px-4 py-1 rounded-xl relative transition-colors duration-150"
        :class="isActive(item.route)
          ? 'text-indigo-500'
          : 'text-gray-400 dark:text-gray-500'"
        @click="navigateTo(item.route)"
      >
        <!-- Active indicator pill -->
        <div
          v-if="isActive(item.route)"
          class="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-indigo-500 rounded-b"
        />

        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="item.icon"></svg>
        <span
          class="text-[0.68rem] font-medium transition-colors duration-150"
          :class="isActive(item.route) ? 'font-semibold' : ''"
        >
          {{ t(item.labelKey) }}
        </span>
      </div>
    </div>
  </nav>
</template>
