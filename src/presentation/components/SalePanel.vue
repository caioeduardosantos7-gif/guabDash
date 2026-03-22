<template>
  <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm p-6 mb-[22px] transition-colors duration-200">
    <!-- Header -->
    <header class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <BackButton />
        <h2 class="text-[17px] font-bold text-gray-900 dark:text-gray-100 m-0">{{ t('salesPanel.registerSale') }}</h2>
      </div>
      <button 
        class="flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/50 px-3 py-1.5 rounded-lg transition-colors border border-transparent cursor-pointer"
        @click="router.push({ name: 'clientes' })"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          <line x1="18" y1="8" x2="22" y2="8" /><line x1="20" y1="6" x2="20" y2="10" />
        </svg>
        {{ t('salesPanel.newCustomer') }}
      </button>
    </header>

    <!-- Product Rows -->
    <div class="space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="p-4 bg-gray-50 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] rounded-xl flex flex-col xl:flex-row gap-4 xl:items-center relative transition-colors duration-200">
        
        <!-- Produto -->
        <div class="relative w-full xl:border-r border-gray-200 dark:border-[#4a4a4a] xl:pr-4 xl:w-[35%]">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('salesPanel.product') }}</label>
          <input 
            v-model="item.product" 
            type="text" 
            autocomplete="off"
            :placeholder="t('salesPanel.productPlaceholder')"
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm placeholder-transparent focus:placeholder-gray-400" 
            @focus="activeDropdown = item.id"
            @input="activeDropdown = item.id"
          />
          <!-- Product autocomplete dropdown -->
          <ul
            v-if="activeDropdown === item.id && getFilteredProducts(item.product).length > 0"
            class="absolute left-0 right-0 xl:right-4 top-full mt-1 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-lg shadow-lg z-20 max-h-[200px] overflow-y-auto"
          >
            <li
              v-for="p in getFilteredProducts(item.product)"
              :key="p.id"
              class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors first:rounded-t-lg last:rounded-b-lg"
              @mousedown.prevent="selectProduct(item, p)"
            >
              <img :src="p.image" :alt="p.name" class="w-8 h-8 rounded object-cover shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-gray-900 dark:text-gray-100 truncate">{{ p.name }}</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ p.category }} · R$ {{ formatCurrency(p.price) }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 w-full xl:w-auto xl:border-r border-gray-200 dark:border-[#4a4a4a] xl:pr-4">
          <!-- Quantidade -->
          <div class="relative w-full sm:w-[120px]">
            <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('salesPanel.quantity') }}</label>
            <input 
              v-model.number="item.quantity" 
              type="number" 
              min="1" 
              class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm" 
            />
          </div>

          <!-- Preço -->
          <div class="relative w-full sm:w-[140px]">
            <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('salesPanel.price') }}</label>
            <input 
              v-model.number="item.price" 
              type="number" 
              step="0.01" 
              class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm" 
            />
          </div>
        </div>

        <!-- Forma -->
        <div class="relative w-full xl:w-[160px] xl:border-r border-gray-200 dark:border-[#4a4a4a] xl:pr-4">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('salesPanel.paymentMethod') }}</label>
          <select 
            v-model="item.method" 
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm cursor-pointer"
          >
            <option value="Dinheiro">{{ t('salesPanel.cash') }}</option>
            <option value="Cartão">{{ t('salesPanel.card') }}</option>
            <option value="Pix">{{ t('salesPanel.pix') }}</option>
          </select>
        </div>

        <!-- Subtotal / Actions -->
        <div class="flex items-center justify-between w-full xl:w-auto xl:ml-auto border-t border-gray-200 dark:border-[#3a3a3a] xl:border-none pt-4 xl:pt-0 mt-2 xl:mt-0 gap-6">
          <div class="text-left xl:text-right flex-1 xl:flex-none">
            <div class="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{{ t('salesPanel.subtotal') }}</div>
            <div class="text-[15px] font-bold text-gray-900 dark:text-gray-100">R$ {{ formatCurrency(item.quantity * item.price) }}</div>
          </div>

          <button 
            @click="removeItem(index)" 
            class="w-[34px] h-[34px] bg-red-50 dark:bg-red-950/30 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg flex items-center justify-center transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
            :aria-label="`Remover item ${index+1}`"
            :disabled="items.length <= 1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
      <div class="flex gap-2 w-full sm:w-auto">
        <button 
          class="flex-1 sm:flex-none px-4 py-2 border border-gray-200 dark:border-[#3a3a3a] bg-gray-50 hover:bg-gray-100 dark:bg-[#272727] dark:hover:bg-[#333] text-gray-700 dark:text-gray-200 text-[13px] font-semibold rounded-lg transition-colors cursor-pointer" 
          @click="addItem"
        >
          + {{ t('salesPanel.addItem') }}
        </button>
        <button 
          class="flex-1 sm:flex-none px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#272727] text-[13px] font-semibold rounded-lg transition-colors cursor-pointer" 
          @click="reset"
        >
          {{ t('salesPanel.clear') }}
        </button>
      </div>

      <div class="text-right w-full sm:w-auto flex flex-col items-end border-t border-gray-200 dark:border-[#3a3a3a] sm:border-none pt-4 sm:pt-0 mt-2 sm:mt-0">
        <div class="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{{ t('salesPanel.total') }}</div>
        <div class="text-[26px] font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-[-4px]">
          R$ {{ formatCurrency(total) }}
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="mt-6 border-t border-gray-200 dark:border-[#3a3a3a] pt-6 flex justify-end">
      <button 
        class="w-full sm:w-auto px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[14px] font-bold rounded-lg shadow-sm hover:-translate-y-px hover:shadow transition-all cursor-pointer" 
        @click="submit"
      >
        {{ t('salesPanel.registerSale') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '../../domain/useProductStore'
import type { Product } from '../../domain/models'
import type { SaleItem } from '../../domain/models'
import BackButton from './BackButton.vue'

const { t } = useI18n()
const router = useRouter()
const { products: registeredProducts } = useProductStore()

const activeDropdown = ref<number | null>(null)

function getFilteredProducts(query: string): Product[] {
  if (!query.trim()) return registeredProducts
  const q = query.toLowerCase()
  return registeredProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
}

function selectProduct(item: SaleItem, product: Product) {
  item.product = product.name
  item.price = product.price
  activeDropdown.value = null
}

// Close dropdown on outside click
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      activeDropdown.value = null
    }
  })
}

let nextId = 1
const items = reactive<SaleItem[]>([
  { id: nextId++, product: '', quantity: 1, price: 0, method: 'Dinheiro' }
])

function addItem() { 
  items.push({ id: nextId++, product: '', quantity: 1, price: 0, method: 'Dinheiro' }) 
}

function removeItem(i: number) { 
  if (items.length > 1) items.splice(i, 1) 
}

function reset() {
  items.splice(0, items.length, { id: nextId++, product: '', quantity: 1, price: 0, method: 'Dinheiro' })
}

const total = computed(() => items.reduce((s, it) => s + (Number(it.quantity) * Number(it.price || 0)), 0))

function formatCurrency(v: number) {
  return v.toFixed(2).replace('.', ',')
}

function submit() {
  const payload = { 
    items: items.map(i => ({ 
      product: i.product, 
      quantity: i.quantity, 
      price: i.price, 
      method: i.method 
    })), 
    total: total.value 
  }
  console.log('Registrar venda', payload)
}
</script>
