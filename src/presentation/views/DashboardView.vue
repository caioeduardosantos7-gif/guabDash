<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatCard from '../components/StatCard.vue'
import SalesReportCard from '../components/SalesReportCard.vue'
import TransactionsTable from '../components/TransactionsTable.vue'
import CongratsCard from '../components/CongratsCard.vue'

const { t } = useI18n()

const stats = [
  { labelKey: 'dashboard.totalProducts', value: '250', delta: '+2,5%', up: true, icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { labelKey: 'dashboard.completedOrders', value: '124', delta: '+2,5%', up: true, icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 12 2 2 4-4"/>' },
  { labelKey: 'dashboard.cancelledOrders', value: '14', delta: '-1,5%', up: false, icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="10" y1="12" x2="14" y2="16"/><line x1="14" y1="12" x2="10" y2="16"/>' },
  { labelKey: 'dashboard.bestProducts', value: '119', delta: '+2,5%', up: true, icon: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>' },
]
</script>

<template>
  <div>
    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5 mb-4 md:mb-[22px]">
      <StatCard
        v-for="s in stats"
        :key="s.labelKey"
        :label="t(s.labelKey)"
        :value="s.value"
        :delta="s.delta"
        :up="s.up"
        :icon="s.icon"
      />
    </div>

    <!-- Sales Report -->
    <SalesReportCard />

    <!-- Bottom Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 lg:gap-[18px]">
      <TransactionsTable />
      <CongratsCard />
    </div>
  </div>
</template>
