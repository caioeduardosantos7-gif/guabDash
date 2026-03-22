<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  darkMode: boolean
}>()

const emit = defineEmits<{
  'toggle-dark': []
}>()

const menuOpen = ref(false)
const wrapRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) {
    closeMenu()
  }
}

function onToggleDark() {
  emit('toggle-dark')
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="wrapRef" class="relative">
    <!-- Avatar -->
    <div
      class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white text-[13px] font-bold cursor-pointer select-none transition-all duration-150 hover:opacity-90"
      :class="menuOpen ? 'ring-[3px] ring-indigo-100 dark:ring-indigo-950/40' : 'hover:ring-[3px] hover:ring-indigo-100 dark:hover:ring-indigo-950/40'"
      @click.stop="toggleMenu"
    >
      GV
    </div>

    <!-- Menu Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1.5"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="menuOpen"
        class="absolute top-[calc(100%+10px)] right-0 w-[228px] bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-lg overflow-hidden z-[100] origin-top-right"
      >
        <!-- Header -->
        <div class="flex items-center gap-2.5 px-4 pt-3.5 pb-3 border-b border-gray-200 dark:border-[#3a3a3a]">
          <div class="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white text-[13px] font-bold shrink-0">
            GV
          </div>
          <div>
            <div class="text-[13px] font-bold text-gray-900 dark:text-gray-100 leading-tight">GuanVendas</div>
            <div class="text-[11px] text-gray-500 dark:text-gray-400">admin@guanvendas.com</div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-1.5">
          <!-- Perfil -->
          <div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-[13px] font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-100 group">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 group-hover:text-indigo-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {{ t('userMenu.profile') }}
          </div>

          <!-- Configurações -->
          <div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-[13px] font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-100 group">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 group-hover:text-indigo-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            {{ t('userMenu.settings') }}
          </div>

          <div class="h-px bg-gray-200 dark:bg-[#3a3a3a] mx-1.5 my-1"></div>

          <!-- Dark Mode -->
          <div
            class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-[13px] font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-100 group"
            @click.stop="onToggleDark"
          >
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 group-hover:text-indigo-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            {{ t('userMenu.darkMode') }}
            <!-- Toggle -->
            <div
              class="ml-auto w-[34px] h-5 rounded-full relative shrink-0 transition-colors duration-200"
              :class="darkMode ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-[#3a3a3a]'"
            >
              <div
                class="absolute top-[3px] left-[3px] w-3.5 h-3.5 bg-white rounded-full shadow transition-transform duration-200"
                :class="darkMode ? 'translate-x-3.5' : ''"
              ></div>
            </div>
          </div>

          <div class="h-px bg-gray-200 dark:bg-[#3a3a3a] mx-1.5 my-1"></div>

          <!-- Sair -->
          <div
            class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-[13px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-100"
            @click="closeMenu"
          >
            <svg class="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            {{ t('userMenu.logout') }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
