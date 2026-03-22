<script setup lang="ts">
defineProps<{
  label: string
  value: string
  delta: string
  up: boolean
  icon: string
}>()
</script>

<template>
  <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl px-3 md:px-[18px] py-3 md:py-4 flex items-center gap-2.5 md:gap-3.5 shadow-sm hover:-translate-y-px hover:shadow-md transition-all duration-200">
    <div class="w-9 h-9 md:w-[42px] md:h-[42px] rounded-[10px] bg-gray-100 dark:bg-[#272727] grid place-items-center shrink-0">
      <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="icon"></svg>
    </div>
    <div>
      <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">{{ label }}</div>
      <div class="text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 my-0.5">{{ value }}</div>
      <span
        class="inline-flex items-center gap-[3px] text-xs font-semibold px-[7px] py-0.5 rounded-full"
        :class="up ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'text-red-500 bg-red-50 dark:bg-red-950/30'"
      >
        {{ up ? '▲' : '▼' }} {{ delta }}
      </span>
    </div>
  </div>
</template>
