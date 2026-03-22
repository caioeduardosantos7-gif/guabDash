<template>
  <div
    class="fixed inset-0 bg-black/45 flex items-center justify-center z-[200] transition-opacity duration-300 backdrop-blur-[3px]"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-[#1e1e1e] w-full max-w-[480px] mx-4 rounded-2xl pb-6 max-h-[90vh] overflow-y-auto relative animate-scale-in">

      <!-- Close Button -->
      <button
        class="absolute top-3.5 right-4 w-[34px] h-[34px] bg-gray-100 dark:bg-[#272727] border-none rounded-full flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors"
        @click="$emit('close')"
        :aria-label="t('products.close')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Image -->
      <img :src="product.image" :alt="product.name" class="w-full h-[260px] object-cover block rounded-t-2xl" />

      <!-- Body -->
      <div class="px-5 pt-5">
        <p class="text-[11px] font-semibold uppercase tracking-[1.5px] text-indigo-500 dark:text-indigo-400 mb-1.5">{{ product.category }}</p>
        <h2 class="text-[20px] font-bold text-gray-900 dark:text-gray-100 mb-2.5">{{ product.name }}</h2>

        <div class="flex items-center gap-2.5 mb-3.5">
          <span class="text-[22px] font-bold text-gray-900 dark:text-gray-100">R$ {{ formatCurrency(product.price) }}</span>
          <span v-if="product.oldPrice" class="text-[15px] text-gray-400 line-through">R$ {{ formatCurrency(product.oldPrice) }}</span>
          <span v-if="product.oldPrice" class="text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">{{ t('products.sale') }}</span>
        </div>

        <p class="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{{ product.description }}</p>

        <div class="flex gap-1.5 flex-wrap">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="bg-gray-100 dark:bg-[#272727] text-gray-500 dark:text-gray-400 text-[12px] px-3 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '../../domain/models'

const { t } = useI18n()

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'close'): void
}>()

function formatCurrency(v: number) {
  return v.toFixed(2).replace('.', ',')
}
</script>

<style scoped>
@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
</style>
