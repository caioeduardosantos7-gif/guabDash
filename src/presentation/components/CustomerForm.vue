<template>
  <form @submit.prevent="submit">
    <!-- Nome -->
    <div class="mb-3.5">
      <div class="relative">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('customers.name') }}</label>
        <input
          v-model="form.name"
          type="text"
          required
          :placeholder="t('customers.namePlaceholder')"
          class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
        />
      </div>
    </div>

    <!-- Tipo Pessoa + CPF/CNPJ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
      <div class="relative">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('customers.personType') }}</label>
        <select
          v-model="form.personType"
          class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer"
        >
          <option value="fisica">{{ t('customers.individual') }}</option>
          <option value="juridica">{{ t('customers.company') }}</option>
        </select>
      </div>
      <div class="relative">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">
          {{ form.personType === 'fisica' ? t('customers.cpf') : t('customers.cnpj') }}
        </label>
        <input
          v-model="form.document"
          type="text"
          :placeholder="form.personType === 'fisica' ? t('customers.cpfPlaceholder') : t('customers.cnpjPlaceholder')"
          :maxlength="form.personType === 'fisica' ? 14 : 18"
          class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
        />
        <span class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">{{ t('customers.documentHint') }}</span>
      </div>
    </div>

    <!-- Telefone + Email -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
      <div class="relative">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('customers.phone') }}</label>
        <input
          v-model="form.phone"
          type="tel"
          :placeholder="t('customers.phonePlaceholder')"
          class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
        />
      </div>
      <div class="relative">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3.5 z-10">{{ t('customers.email') }}</label>
        <input
          v-model="form.email"
          type="email"
          :placeholder="t('customers.emailPlaceholder')"
          class="block rounded-xl px-3.5 pb-2.5 pt-[22px] w-full text-[14px] font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] appearance-none outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-3 pt-[18px]">
      <button
        type="button"
        class="py-3 border border-gray-200 dark:border-[#3a3a3a] rounded-xl bg-white dark:bg-[#1e1e1e] text-[14px] font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        @click="$emit('cancel')"
      >
        {{ t('customers.cancel') }}
      </button>
      <button
        type="submit"
        class="py-3 border-none rounded-xl bg-indigo-500 hover:bg-indigo-600 text-[14px] font-semibold text-white cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ t('customers.save') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Customer } from '../../domain/models'

const { t } = useI18n()

const props = defineProps<{
  customer?: Customer | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'save', customer: Omit<Customer, 'id'>): void
}>()

const form = reactive({
  name: '',
  personType: 'fisica' as 'fisica' | 'juridica',
  document: '',
  phone: '',
  email: '',
})

onMounted(() => {
  if (props.customer) {
    form.name = props.customer.name
    form.personType = props.customer.personType
    form.document = props.customer.document
    form.phone = props.customer.phone
    form.email = props.customer.email
  }
})

function submit() {
  if (!form.name.trim()) return
  emit('save', {
    name: form.name.trim(),
    personType: form.personType,
    document: form.document.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
  })
}
</script>
