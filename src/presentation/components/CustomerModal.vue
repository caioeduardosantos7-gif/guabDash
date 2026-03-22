<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/45 flex items-center justify-center z-[200] transition-opacity duration-300 backdrop-blur-[3px]"
      @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-[#1e1e1e] w-full max-w-[520px] mx-4 rounded-2xl max-h-[90vh] overflow-y-auto pb-6 animate-scale-in">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 pt-5 mb-[18px]">
        <span class="text-[18px] font-bold text-gray-900 dark:text-gray-100">{{ customer ? t('customers.editCustomer') : t('customers.registerCustomer') }}</span>
        <button
          class="w-[34px] h-[34px] bg-gray-100 dark:bg-[#272727] border-none rounded-full flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors shrink-0"
          @click="$emit('close')"
          :aria-label="t('customers.close')"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <div class="px-5">
        <CustomerForm :customer="customer" @cancel="$emit('close')" @save="onSave" />
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Customer } from '../../domain/models'
import CustomerForm from './CustomerForm.vue'

const { t } = useI18n()

defineProps<{
  customer?: Customer | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', customer: Omit<Customer, 'id'>): void
}>()

function onSave(customer: Omit<Customer, 'id'>) {
  emit('save', customer)
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
