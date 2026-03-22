<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '../../domain/useProductStore'
import type { Product } from '../../domain/models'
import ProductPanel from '../components/ProductPanel.vue'
import ProductDetailModal from '../components/ProductDetailModal.vue'
import ProductFormModal from '../components/ProductFormModal.vue'
import BackButton from '../components/BackButton.vue'

const { t } = useI18n()
const { products, categories, addProduct, updateProduct } = useProductStore()

const selectedProduct = ref<Product | null>(null)
const showForm = ref(false)
const editingProduct = ref<Product | null>(null)

function openDetail(product: Product) {
  selectedProduct.value = product
}

function closeDetail() {
  selectedProduct.value = null
}

function openForm() {
  editingProduct.value = null
  showForm.value = true
}

function openEdit(product: Product) {
  editingProduct.value = product
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingProduct.value = null
}

function saveProduct(data: {
  name: string
  category: string
  price: number
  oldPrice: number | null
  description: string
  tags: string[]
  image: string | null
}) {
  if (editingProduct.value) {
    updateProduct(editingProduct.value.id, data)
  } else {
    addProduct(data)
  }
  closeForm()
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <BackButton />
        <h2 class="text-[17px] font-bold text-gray-900 dark:text-gray-100 m-0">{{ t('products.title') }}</h2>
        <span class="text-[12px] text-gray-400 dark:text-gray-500 tracking-wider">{{ products.length }} {{ t('products.pieces') }}</span>
      </div>
      <button
        class="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white border-none rounded-[10px] px-3.5 py-2 text-[13px] font-semibold cursor-pointer transition-colors active:scale-[0.97]"
        @click="openForm"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {{ t('products.registerProduct') }}
      </button>
    </div>

    <!-- Product Panel -->
    <ProductPanel
      :products="products"
      :categories="categories"
      @open-detail="openDetail"
      @edit="openEdit"
    />

    <!-- Detail Modal -->
    <ProductDetailModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeDetail"
    />

    <!-- Form Modal -->
    <ProductFormModal
      v-if="showForm"
      :categories="categories"
      :product="editingProduct"
      @close="closeForm"
      @save="saveProduct"
    />
  </div>
</template>
