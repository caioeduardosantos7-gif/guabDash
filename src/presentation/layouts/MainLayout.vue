<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '../components/AppSidebar.vue'
import AppTopBar from '../components/AppTopBar.vue'
import MobileNav from '../components/MobileNav.vue'
import { useSidebarStore } from '../../domain/useSidebarStore'

const darkMode = ref(false)
const { collapsed } = useSidebarStore()

function toggleDark() {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div class="flex w-full min-h-screen bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
    <AppSidebar />

    <main
      class="flex-1 flex flex-col min-h-screen transition-all duration-300 ml-0 md:!ml-[var(--sidebar-w)]"
      :style="{ '--sidebar-w': collapsed ? '68px' : '220px' } as any"
    >
      <AppTopBar :dark-mode="darkMode" @toggle-dark="toggleDark" />

      <div class="p-4 md:p-7 pb-24 md:pb-7 flex-1">
        <router-view />
      </div>
    </main>

    <MobileNav />
  </div>
</template>
