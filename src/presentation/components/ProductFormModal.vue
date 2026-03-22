<template>
  <div
    class="fixed inset-0 bg-black/45 flex items-center justify-center z-[200] transition-opacity duration-300 backdrop-blur-[3px]"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-[#1e1e1e] w-full max-w-[480px] mx-4 rounded-2xl max-h-[90vh] overflow-y-auto pb-6 animate-scale-in">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 pt-5 mb-[18px]">
        <span class="text-[18px] font-bold text-gray-900 dark:text-gray-100">{{ product ? t('products.editProduct') : t('products.newProduct') }}</span>
        <button
          class="w-[34px] h-[34px] bg-gray-100 dark:bg-[#272727] border-none rounded-full flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors shrink-0"
          @click="$emit('close')"
          :aria-label="t('products.close')"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Upload Photo -->
      <div
        class="mx-5 mb-4 border-[1.5px] border-dashed border-gray-200 dark:border-[#3a3a3a] rounded-[14px] flex flex-col items-center gap-2 cursor-pointer transition-colors overflow-hidden"
        :class="form.imagePreview ? 'p-0 border-solid' : 'p-[22px] hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10'"
        @click="triggerFileInput"
      >
        <template v-if="!form.imagePreview">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-gray-300 dark:text-gray-600">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
            <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
          </svg>
          <span class="text-[13px] text-gray-400 dark:text-gray-500">{{ t('products.uploadPhoto') }}</span>
        </template>
        <img v-else :src="form.imagePreview" alt="preview" class="w-full h-[180px] object-cover block" />
      </div>
      <input
        ref="fileInputEl"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />

      <!-- Nome do produto (Google-style input) -->
      <div class="px-5 mb-3.5">
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.productName') }}</label>
          <input
            v-model="form.name"
            type="text"
            :placeholder="t('products.productNamePlaceholder')"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          />
        </div>
      </div>

      <!-- Categoria + Preço -->
      <div class="px-5 grid grid-cols-2 gap-3 mb-3.5">
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.category') }}</label>
          <select
            v-model="form.category"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="">{{ t('products.selectCategory') }}</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.price') }}</label>
          <input
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
            :placeholder="t('products.pricePlaceholder')"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          />
        </div>
      </div>

      <!-- Preço antigo -->
      <div class="px-5 mb-3.5">
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.oldPrice') }}</label>
          <input
            v-model="form.oldPrice"
            type="number"
            min="0"
            step="0.01"
            :placeholder="t('products.pricePlaceholder')"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          />
        </div>
        <span class="text-[11px] text-gray-400 dark:text-gray-500 mt-1 block">{{ t('products.oldPriceHint') }}</span>
      </div>

      <!-- Descrição -->
      <div class="px-5 mb-3.5">
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.description') }}</label>
          <textarea
            v-model="form.description"
            rows="3"
            :placeholder="t('products.descriptionPlaceholder')"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          ></textarea>
        </div>
      </div>

      <!-- Tags -->
      <div class="px-5 mb-3.5">
        <div class="relative">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('products.tags') }}</label>
          <input
            v-model="form.tags"
            type="text"
            :placeholder="t('products.tagsPlaceholder')"
            class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          />
        </div>
        <span class="text-[11px] text-gray-400 dark:text-gray-500 mt-1 block">{{ t('products.tagsHint') }}</span>
      </div>

      <!-- Actions -->
      <div class="grid grid-cols-2 gap-3 px-5 pt-[18px]">
        <button
          class="py-3 border border-gray-200 dark:border-[#3a3a3a] rounded-xl bg-white dark:bg-[#1e1e1e] text-[14px] font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          @click="$emit('close')"
        >
          {{ t('products.cancel') }}
        </button>
        <button
          class="py-3 border-none rounded-xl bg-indigo-500 hover:bg-indigo-600 text-[14px] font-semibold text-white cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
          @click="save"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ product ? t('products.saveProduct') : t('products.saveProduct') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Product } from '../../domain/models'

const { t } = useI18n()

const props = defineProps<{
  categories: string[]
  product?: Product | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', product: {
    name: string
    category: string
    price: number
    oldPrice: number | null
    description: string
    tags: string[]
    image: string | null
  }): void
}>()

const fileInputEl = ref<HTMLInputElement | null>(null)

const form = reactive({
  name: '',
  category: '',
  price: '' as string | number,
  oldPrice: '' as string | number,
  description: '',
  tags: '',
  imagePreview: null as string | null,
})

onMounted(() => {
  if (props.product) {
    form.name = props.product.name
    form.category = props.product.category
    form.price = props.product.price
    form.oldPrice = props.product.oldPrice ?? ''
    form.description = props.product.description
    form.tags = props.product.tags.join(', ')
    form.imagePreview = props.product.image
  }
})

function triggerFileInput() {
  fileInputEl.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.imagePreview = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

function save() {
  if (!form.name.trim() || !form.category || !form.price) {
    alert(t('products.fillRequired'))
    return
  }

  emit('save', {
    name: form.name.trim(),
    category: form.category,
    price: parseFloat(String(form.price)),
    oldPrice: form.oldPrice ? parseFloat(String(form.oldPrice)) : null,
    description: form.description.trim(),
    tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    image: form.imagePreview,
  })
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
