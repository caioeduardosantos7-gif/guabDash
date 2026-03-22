<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { customerService } from '../../application/container'
import type { Customer } from '../../domain/models'
import CustomerModal from '../components/CustomerModal.vue'
import BackButton from '../components/BackButton.vue'

const { t } = useI18n()

const customers = reactive<Customer[]>([])
const showModal = ref(false)
const editingCustomer = ref<Customer | null>(null)
const search = ref('')
const customerToDelete = ref<Customer | null>(null)
const deleting = ref(false)

onMounted(async () => {
  const list = await customerService.list()
  customers.splice(0, customers.length, ...list)
})

function openModal() {
  editingCustomer.value = null
  showModal.value = true
}

function openEdit(customer: Customer) {
  editingCustomer.value = customer
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingCustomer.value = null
}

async function saveCustomer(data: Omit<Customer, 'id'>) {
  if (editingCustomer.value) {
    const updated = await customerService.update(editingCustomer.value.id, data)
    const idx = customers.findIndex(c => c.id === editingCustomer.value!.id)
    if (idx !== -1) customers[idx] = updated
  } else {
    const created = await customerService.create(data)
    customers.unshift(created)
  }
  closeModal()
}

function confirmDelete(customer: Customer) {
  customerToDelete.value = customer
}

async function deleteCustomer() {
  if (!customerToDelete.value) return
  deleting.value = true
  try {
    await customerService.remove(customerToDelete.value.id)
    const idx = customers.findIndex(c => c.id === customerToDelete.value!.id)
    if (idx !== -1) customers.splice(idx, 1)
    customerToDelete.value = null
  } finally {
    deleting.value = false
  }
}

function filteredCustomers() {
  if (search.value.trim().length < 2) return customers
  const q = search.value.toLowerCase()
  return customers.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.document.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.phone.includes(q)
  )
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <BackButton />
        <h2 class="text-[17px] font-bold text-gray-900 dark:text-gray-100 m-0">{{ t('customers.title') }}</h2>
        <span class="text-[12px] text-gray-400 dark:text-gray-500 tracking-wider">{{ customers.length }} {{ t('customers.registered') }}</span>
      </div>
      <button
        class="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white border-none rounded-[10px] px-3.5 py-2 text-[13px] font-semibold cursor-pointer transition-colors active:scale-[0.97]"
        @click="openModal"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {{ t('customers.registerCustomer') }}
      </button>
    </div>

    <!-- Search -->
    <div class="relative mb-4">
      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input
        v-model="search"
        type="text"
        :placeholder="t('customers.searchPlaceholder')"
        class="w-full py-2.5 pl-10 pr-4 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl text-[14px] font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      />
    </div>

    <!-- Customer List -->
    <div class="flex flex-col gap-3">
      <div
        v-for="c in filteredCustomers()"
        :key="c.id"
        class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl p-3 sm:p-4 flex items-start sm:items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Avatar -->
        <div class="w-11 h-11 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
          <span class="text-[16px] font-bold text-indigo-600 dark:text-indigo-400">{{ c.name.charAt(0).toUpperCase() }}</span>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <p class="text-[15px] font-semibold text-gray-900 dark:text-gray-100 truncate">{{ c.name }}</p>
            <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              :class="c.personType === 'fisica'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'"
            >
              {{ c.personType === 'fisica' ? t('customers.individual') : t('customers.company') }}
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-gray-400 dark:text-gray-500">
            <span v-if="c.document">{{ c.personType === 'fisica' ? t('customers.cpf') : t('customers.cnpj') }}: {{ c.document }}</span>
            <span v-if="c.phone">{{ c.phone }}</span>
            <span v-if="c.email">{{ c.email }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1.5">
          <button
            class="shrink-0 w-9 h-9 bg-gray-100 dark:bg-[#272727] hover:bg-amber-500 hover:text-white text-gray-400 dark:text-gray-500 dark:hover:text-white border-none rounded-[10px] flex items-center justify-center transition-colors cursor-pointer"
            @click="openEdit(c)"
            :title="t('customers.editCustomer')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            class="shrink-0 w-9 h-9 bg-gray-100 dark:bg-[#272727] hover:bg-red-500 hover:text-white text-gray-400 dark:text-gray-500 dark:hover:text-white border-none rounded-[10px] flex items-center justify-center transition-colors cursor-pointer"
            @click="confirmDelete(c)"
            :title="t('customers.deleteCustomer')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCustomers().length === 0" class="text-center py-12 text-gray-400 dark:text-gray-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2.5 opacity-50">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <p class="text-[14px]">{{ t('customers.noCustomers') }}</p>
      </div>
    </div>

    <!-- Modal -->
    <CustomerModal
      v-if="showModal"
      :customer="editingCustomer"
      @close="closeModal"
      @save="saveCustomer"
    />

    <!-- Delete Confirmation -->
    <Teleport to="body">
      <div
        v-if="customerToDelete"
        class="fixed inset-0 bg-black/45 flex items-center justify-center z-[200] backdrop-blur-[3px]"
        @click.self="customerToDelete = null"
      >
        <div class="bg-white dark:bg-[#1e1e1e] w-full max-w-[400px] mx-4 rounded-2xl p-6 shadow-xl">
          <!-- Icon -->
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </div>
          <h3 class="text-[17px] font-bold text-gray-900 dark:text-gray-100 text-center mb-2">{{ t('customers.deleteConfirmTitle') }}</h3>
          <p class="text-[13px] text-gray-500 dark:text-gray-400 text-center mb-6">
            {{ t('customers.deleteConfirmMessage') }} <span class="font-semibold text-gray-800 dark:text-gray-200">{{ customerToDelete.name }}</span>?
          </p>
          <div class="grid grid-cols-2 gap-3">
            <button
              class="py-2.5 border border-gray-200 dark:border-[#3a3a3a] rounded-xl bg-white dark:bg-[#272727] text-[14px] font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:border-gray-400 transition-colors"
              @click="customerToDelete = null"
            >
              {{ t('customers.deleteCancel') }}
            </button>
            <button
              class="py-2.5 border-none rounded-xl bg-red-500 hover:bg-red-600 text-[14px] font-semibold text-white cursor-pointer transition-colors disabled:opacity-60"
              :disabled="deleting"
              @click="deleteCustomer"
            >
              {{ t('customers.deleteConfirmButton') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
