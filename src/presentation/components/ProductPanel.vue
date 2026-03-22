<template>
  <div>
    <!-- Search -->
    <div class="relative mb-3.5">
      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input
        v-model="search"
        type="text"
        :placeholder="t('products.searchPlaceholder')"
        class="w-full py-2.5 pl-10 pr-4 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl text-[14px] font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      />
    </div>

    <!-- Toolbar: Pills + View Toggle -->
    <div class="flex items-center justify-between gap-2.5 mb-3.5">
      <!-- Category Pills -->
      <div class="flex gap-1.5 overflow-x-auto flex-1 scrollbar-hide">
        <button
          v-for="cat in allCategories"
          :key="cat"
          class="px-3.5 py-1.5 rounded-full border text-[12px] font-medium whitespace-nowrap transition-all cursor-pointer"
          :class="activeCategory === cat
            ? 'bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100 text-white dark:text-gray-900'
            : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#3a3a3a] text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400'"
          @click="activeCategory = cat"
        >
          {{ cat === 'Todos' ? t('products.all') : cat }}
        </button>
      </div>

      <!-- View Toggle -->
      <div class="flex gap-0.5 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-[10px] p-[3px] shrink-0">
        <button
          class="w-8 h-8 rounded-[7px] flex items-center justify-center transition-all cursor-pointer"
          :class="viewMode === 'list' ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
          @click="viewMode = 'list'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button
          class="w-8 h-8 rounded-[7px] flex items-center justify-center transition-all cursor-pointer"
          :class="viewMode === 'grid' ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
          @click="viewMode = 'grid'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Meta Row: Count + Sort -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-[12px] text-gray-400 dark:text-gray-500">
        <strong class="text-gray-900 dark:text-gray-100">{{ filtered.length }}</strong> {{ t('products.productsFound') }}
      </p>
      <div class="relative">
        <label class="absolute text-[10px] font-medium text-gray-500 dark:text-gray-400 top-[5px] left-3 z-10">{{ t('products.sort') }}</label>
        <select
          v-model="sortBy"
          class="block rounded-[10px] pl-3 pr-8 pb-1.5 pt-[18px] text-[12px] font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
        >
          <option value="default">{{ t('products.sort') }}</option>
          <option value="price_asc">{{ t('products.lowestPrice') }}</option>
          <option value="price_desc">{{ t('products.highestPrice') }}</option>
          <option value="name">{{ t('products.nameAZ') }}</option>
        </select>
      </div>
    </div>

    <!-- LIST VIEW -->
    <div v-if="viewMode === 'list'" class="flex flex-col gap-3">
      <div
        v-for="p in filtered"
        :key="p.id"
        class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        @click="$emit('open-detail', p)"
      >
        <img :src="p.image" :alt="p.name" class="w-20 h-20 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="text-[11px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-0.5">{{ p.category }}</p>
          <p class="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-0.5 truncate">{{ p.name }}</p>
          <p class="text-[12px] text-gray-400 dark:text-gray-500 mb-2 line-clamp-1">{{ p.description }}</p>
          <div class="flex items-center gap-2">
            <span class="text-[16px] font-bold text-gray-900 dark:text-gray-100">R$ {{ formatCurrency(p.price) }}</span>
            <span v-if="p.oldPrice" class="text-[12px] text-gray-400 line-through">R$ {{ formatCurrency(p.oldPrice) }}</span>
            <span v-if="p.oldPrice" class="text-[10px] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">{{ t('products.sale') }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            class="bg-gray-100 dark:bg-[#272727] hover:bg-amber-500 hover:text-white text-gray-500 dark:text-gray-400 border-none rounded-[10px] p-2.5 cursor-pointer flex items-center justify-center transition-colors"
            @click.stop="$emit('edit', p)"
            :title="t('products.editProduct')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            class="bg-indigo-500 hover:bg-indigo-600 text-white border-none rounded-[10px] px-3.5 py-2.5 text-[12px] font-semibold cursor-pointer flex items-center gap-1.5 whitespace-nowrap transition-colors"
            @click.stop="$emit('open-detail', p)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span class="hidden sm:inline">{{ t('products.details') }}</span>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2.5 opacity-50">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="8" x2="14" y2="14"/><line x1="14" y1="8" x2="8" y2="14"/>
        </svg>
        <p class="text-[14px]">{{ t('products.noProductsFound') }}</p>
      </div>
    </div>

    <!-- GRID VIEW -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <div
        v-for="p in filtered"
        :key="p.id"
        class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        @click="$emit('open-detail', p)"
      >
        <img :src="p.image" :alt="p.name" class="w-full h-[180px] object-cover block" />
        <div class="p-3">
          <p class="text-[10px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">{{ p.category }}</p>
          <p class="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-2.5 leading-tight line-clamp-2">{{ p.name }}</p>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[14px] font-bold text-gray-900 dark:text-gray-100 block">R$ {{ formatCurrency(p.price) }}</span>
              <span v-if="p.oldPrice" class="text-[11px] text-gray-400 line-through block">R$ {{ formatCurrency(p.oldPrice) }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                class="w-8 h-8 bg-gray-100 dark:bg-[#272727] hover:bg-amber-500 hover:text-white text-gray-400 dark:text-gray-500 dark:hover:text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0"
                @click.stop="$emit('edit', p)"
                :title="t('products.editProduct')"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button
                class="w-8 h-8 bg-gray-900 dark:bg-gray-100 hover:bg-indigo-500 dark:hover:bg-indigo-500 text-white dark:text-gray-900 dark:hover:text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0"
                @click.stop="$emit('open-detail', p)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2.5 opacity-50">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="8" x2="14" y2="14"/><line x1="14" y1="8" x2="8" y2="14"/>
        </svg>
        <p class="text-[14px]">{{ t('products.noProductsFound') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { StringUtils } from '../../shared/StringUtils'
import type { Product } from '../../domain/models'

const { t } = useI18n()

const props = defineProps<{
  products: Product[]
  categories: string[]
}>()

defineEmits<{
  (e: 'open-detail', product: Product): void
  (e: 'edit', product: Product): void
}>()

const search = ref('')
const activeCategory = ref('Todos')
const sortBy = ref('default')
const viewMode = ref<'list' | 'grid'>('list')

const allCategories = computed(() => ['Todos', ...props.categories])

const filtered = computed(() => {
  let list = [...props.products]

  if (activeCategory.value !== 'Todos') {
    list = list.filter(p => p.category === activeCategory.value)
  }

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'price_asc') list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name))

  return list
})

const { formatCurrency } = StringUtils
</script>
