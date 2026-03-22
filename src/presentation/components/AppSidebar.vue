<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { NavItem } from '../../domain/models'
import { useSidebarStore } from '../../domain/useSidebarStore'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { collapsed } = useSidebarStore()

const navItems: NavItem[] = [
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
  <aside
    class="min-h-screen bg-white dark:bg-[#1e1e1e] border-r border-gray-200 dark:border-[#3a3a3a] hidden md:flex flex-col py-5 fixed top-0 left-0 bottom-0 z-20 transition-all duration-300 overflow-hidden"
    :style="{ width: collapsed ? '68px' : '220px' }"
  >
    <!-- Logo -->
    <div
      class="flex items-center pb-5 overflow-hidden transition-all duration-300"
      :class="collapsed ? 'justify-center' : 'px-5'"
    >
      <div class="w-8 h-8 bg-indigo-500 rounded-lg grid place-items-center text-white shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <span
        class="ml-2.5 font-bold text-[17px] tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap transition-all duration-300"
        :class="collapsed ? 'opacity-0 w-0 ml-0 overflow-hidden' : 'opacity-100'"
      >
        {{ t('sidebar.brand') }}
      </span>
    </div>

    <!-- Section Label -->
    <div
      class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden transition-all duration-300"
      :class="collapsed ? 'h-0 pt-0 pb-0 opacity-0' : 'px-5 pt-4 pb-1.5 opacity-100'"
    >
      {{ t('sidebar.mainMenu') }}
    </div>
    <div v-if="collapsed" class="pt-4 pb-1.5"></div>

    <!-- Nav Items -->
    <div
      v-for="item in navItems"
      :key="item.labelKey"
      class="flex items-center py-2 cursor-pointer text-sm font-medium relative transition-colors duration-150"
      :class="[
        collapsed ? 'justify-center' : 'gap-2.5 px-5',
        isActive(item.route)
          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 before:content-[\'\'] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-indigo-500 before:rounded-r'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#272727] hover:text-gray-900 dark:hover:text-gray-100'
      ]"
      :title="collapsed ? t(item.labelKey) : undefined"
      @click="navigateTo(item.route)"
    >
      <svg class="w-[17px] h-[17px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
      <span
        class="whitespace-nowrap transition-all duration-300 overflow-hidden"
        :class="collapsed ? 'opacity-0 w-0' : 'opacity-100'"
      >
        {{ t(item.labelKey) }}
      </span>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Toggle Button -->
    <div class="flex justify-center py-4">
      <button
        class="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all cursor-pointer shadow-sm"
        @click="collapsed = !collapsed"
        :aria-label="collapsed ? t('sidebar.expand') : t('sidebar.collapse')"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline v-if="!collapsed" points="15 18 9 12 15 6"/>
          <polyline v-else points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </aside>
</template>
