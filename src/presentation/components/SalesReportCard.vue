<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { dashboardService } from '../../application/container'
import { StringUtils } from '../../shared/StringUtils'
import type { SalesReport } from '../../domain/models'

const { t } = useI18n()

const timeFilters = ['1d', '7d', '30d', '1a', 'Máx']
const activeTime = ref('7d')

const monthKeys = ['months.jan', 'months.feb', 'months.mar', 'months.apr', 'months.may', 'months.jun', 'months.jul', 'months.aug', 'months.sep', 'months.oct', 'months.nov', 'months.dec']
const activeMonth = ref('months.aug')

const report = ref<SalesReport | null>(null)

const { formatBRL } = StringUtils

async function fetchReport() {
  report.value = await dashboardService.getSalesReport(activeTime.value, activeMonth.value)
}

onMounted(fetchReport)
watch([activeTime, activeMonth], fetchReport)
</script>

<template>
  <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl px-4 md:px-6 py-4 md:py-[22px] shadow-sm mb-4 md:mb-[22px] transition-colors duration-200">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
      <div>
        <h2 class="text-[15px] font-bold text-gray-900 dark:text-gray-100 m-0">
          {{ t('dashboard.salesReport') }}
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {{ t('dashboard.salesReportSub') }}
        </p>
      </div>
      <div class="flex items-center gap-1.5 bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-lg px-3 py-1.5 text-[13px] font-medium cursor-pointer text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {{ t('dashboard.totalSales') }}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>

    <div class="text-[34px] font-bold tracking-tighter text-gray-900 dark:text-gray-100 mb-1">R$ {{ report ? formatBRL(report.totalSales) : '—' }}</div>
    <div class="text-xs font-semibold" :class="report && report.deltaPercent >= 0 ? 'text-emerald-500' : 'text-red-500'">
      <template v-if="report">⬆ R$ {{ formatBRL(report.deltaSales) }} (+{{ report.deltaPercent }}%)</template>
      <template v-else>—</template>
    </div>

    <!-- Chart -->
    <div class="relative h-[120px] my-4">
      <svg class="w-full h-full" viewBox="0 0 800 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366f1" stop-opacity=".25"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity=".18"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,90 C60,85 120,60 200,50 C280,40 320,80 400,55 C480,30 540,65 600,40 C660,20 720,50 800,35 L800,120 L0,120 Z" fill="url(#g1)"/>
        <path d="M0,95 C80,100 160,75 240,80 C320,85 360,55 440,70 C520,85 580,55 640,65 C700,75 750,60 800,60 L800,120 L0,120 Z" fill="url(#g2)"/>
        <path d="M0,90 C60,85 120,60 200,50 C280,40 320,80 400,55 C480,30 540,65 600,40 C660,20 720,50 800,35" fill="none" stroke="#6366f1" stroke-width="2.5"/>
        <path d="M0,95 C80,100 160,75 240,80 C320,85 360,55 440,70 C520,85 580,55 640,65 C700,75 750,60 800,60" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="600" cy="40" r="5" fill="#6366f1" stroke="#fff" stroke-width="2"/>
      </svg>
      <!-- Tooltip -->
      <div class="absolute top-2 left-[62%] min-w-[148px] bg-gray-900 dark:bg-[#2a2d3e] dark:border dark:border-[#3a3a3a] text-white rounded-[10px] px-3.5 py-2.5 text-xs pointer-events-none shadow-md hidden md:block">
        <div class="text-[11px] opacity-60 mb-1.5">—</div>
        <div class="flex items-center gap-1.5 mb-[3px]">
          <div class="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
          <span class="opacity-70 flex-1">{{ t('dashboard.transactions') }}</span>
          <span class="font-semibold">—</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
          <span class="opacity-70 flex-1">{{ t('dashboard.products') }}</span>
          <span class="font-semibold">—</span>
        </div>
      </div>
    </div>

    <!-- Time Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0.5 border-t border-gray-200 dark:border-[#3a3a3a] pt-3.5">
      <div class="flex items-center gap-0.5">
      <button
        v-for="tf in timeFilters"
        :key="tf"
        class="px-3 py-[5px] rounded-lg text-xs font-semibold cursor-pointer border-none font-sans transition-all duration-150"
        :class="activeTime === tf
          ? 'bg-indigo-500 text-white'
          : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#272727] hover:text-gray-900 dark:hover:text-gray-100'"
        @click="activeTime = tf"
      >{{ tf }}</button>
      </div>

      <div class="hidden sm:block w-px h-5 bg-gray-200 dark:bg-[#3a3a3a] mx-2"></div>

      <div class="flex gap-0.5 sm:ml-auto overflow-x-auto scrollbar-hide">
        <button
          v-for="mk in monthKeys"
          :key="mk"
          class="px-2 py-[5px] rounded-lg text-xs font-medium cursor-pointer border-none font-sans transition-all duration-150"
          :class="activeMonth === mk
            ? 'bg-indigo-500 text-white font-bold'
            : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'"
          @click="activeMonth = mk"
        >{{ t(mk) }}</button>
      </div>
    </div>
  </div>
</template>
