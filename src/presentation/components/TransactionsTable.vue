<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { transactionService } from '../../application/container'
import type { Transaction } from '../../domain/models'

const { t } = useI18n()

const search = ref('')
const transactions = ref<Transaction[]>([])

onMounted(async () => {
  transactions.value = await transactionService.list()
})

const filteredTx = computed(() => {
  if (search.value.trim().length < 2) return transactions.value
  const q = search.value.toLowerCase()
  return transactions.value.filter(tx =>
    tx.item.toLowerCase().includes(q) ||
    tx.id.toLowerCase().includes(q)
  )
})

const statusClasses: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
  cancelled: 'bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400',
}
</script>

<template>
  <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm overflow-hidden transition-colors duration-200">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 md:px-[18px] py-3 md:py-4 border-b border-gray-200 dark:border-[#3a3a3a]">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 m-0">
        {{ t('dashboard.latestTransactions') }}
      </h3>
      <div class="flex gap-2 items-center">
        <!-- Search -->
        <div class="flex items-center gap-2 bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-lg px-3 py-[7px] text-[13px] text-gray-500 dark:text-gray-400 w-full sm:w-[175px] transition-colors duration-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="search"
            type="text"
            :placeholder="t('dashboard.searchPlaceholder')"
            class="border-none bg-transparent outline-none text-[13px] font-sans w-full text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <!-- Filter -->
        <div class="w-[34px] h-[34px] bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-lg grid place-items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors duration-200">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
    <table class="w-full border-collapse min-w-[600px]">
      <thead>
        <tr>
          <th class="w-9 px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            <input type="checkbox" class="w-[15px] h-[15px] accent-indigo-500 cursor-pointer" />
          </th>
          <th class="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            {{ t('dashboard.orderNumber') }}
          </th>
          <th class="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            {{ t('dashboard.item') }}
          </th>
          <th class="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            {{ t('dashboard.date') }}
          </th>
          <th class="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            {{ t('dashboard.value') }}
          </th>
          <th class="px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#272727] border-b border-gray-200 dark:border-[#3a3a3a]">
            {{ t('dashboard.status') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredTx.length === 0">
          <td colspan="6" class="px-3.5 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            {{ t('dashboard.noTransactions') }}
          </td>
        </tr>
        <tr
          v-for="tx in filteredTx"
          :key="tx.id + tx.item"
          class="border-b border-gray-200 dark:border-[#3a3a3a] last:border-b-0 cursor-pointer transition-colors duration-100"
          :class="tx.selected ? 'bg-indigo-50 dark:bg-indigo-950/30' : 'hover:bg-gray-50 dark:hover:bg-[#272727]'"
          @click="tx.selected = !tx.selected"
        >
          <td class="px-3.5 py-[11px] text-[13px]">
            <input type="checkbox" v-model="tx.selected" class="w-[15px] h-[15px] accent-indigo-500 cursor-pointer" @click.stop />
          </td>
          <td class="px-3.5 py-[11px] text-xs font-mono text-gray-500 dark:text-gray-400">{{ tx.id }}</td>
          <td class="px-3.5 py-[11px] text-[13px] text-gray-900 dark:text-gray-100">{{ tx.item }}</td>
          <td class="px-3.5 py-[11px] text-[13px] text-gray-500 dark:text-gray-400">{{ tx.date }}</td>
          <td class="px-3.5 py-[11px] text-[13px] font-bold text-gray-900 dark:text-gray-100">{{ tx.price }}</td>
          <td class="px-3.5 py-[11px] text-[13px]">
            <span
              class="inline-flex items-center gap-[5px] text-xs font-semibold px-[9px] py-[3px] rounded-md"
              :class="statusClasses[tx.status]"
            >{{ t(`dashboard.status${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}`) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
