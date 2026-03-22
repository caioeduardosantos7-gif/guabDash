<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const products = [
  { nameKey: 'Camiseta Arco-íris Branca', sold: 271, emoji: '👕' },
  { nameKey: 'Calça Cropped', sold: 185, emoji: '👖' },
  { nameKey: 'Boné Preto Huzzle', sold: 143, emoji: '🧢' },
]

const productIdx = ref(0)
const currentProduct = computed(() => products[productIdx.value])
const visibleProducts = computed(() => {
  const i = productIdx.value
  const len = products.length
  return [
    products[(i + len - 1) % len],
    products[i],
    products[(i + 1) % len],
  ]
})

function nextProduct() {
  productIdx.value = (productIdx.value + 1) % products.length
}

function prevProduct() {
  productIdx.value = (productIdx.value + products.length - 1) % products.length
}
</script>

<template>
  <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm p-5 flex flex-col transition-colors duration-200">
    <div class="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
      {{ t('dashboard.congratsTitle') }}
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-400 mb-[18px]">
      {{ t('dashboard.congratsSub') }}
    </div>

    <div class="flex-1 flex flex-col items-center gap-2.5">
      <!-- Product Images -->
      <div class="flex gap-3 justify-center">
        <div
          v-for="(p, i) in visibleProducts"
          :key="i"
          class="w-[76px] h-24 rounded-lg border bg-gray-100 dark:bg-[#272727] flex items-center justify-center text-[32px] shrink-0 transition-all duration-200"
          :class="i === 1
            ? 'scale-[1.08] border-indigo-500 shadow-md'
            : 'border-gray-200 dark:border-[#3a3a3a]'"
        >
          {{ p.emoji }}
        </div>
      </div>

      <!-- Carousel Nav -->
      <div class="flex items-center gap-2.5 mt-1">
        <div
          class="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] grid place-items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all duration-150"
          @click="prevProduct"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>
        <div
          class="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#272727] border border-gray-200 dark:border-[#3a3a3a] grid place-items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all duration-150"
          @click="nextProduct"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>

      <div class="text-sm font-bold text-center text-gray-900 dark:text-gray-100">
        {{ currentProduct.nameKey }}
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
        {{ currentProduct.sold }} {{ t('dashboard.sold') }}
      </div>
    </div>
  </div>
</template>
