<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <BackButton />
      <h2 class="text-[17px] font-bold text-gray-900 dark:text-gray-100">{{ t('profile.title') }}</h2>
    </div>

    <!-- User Info Card -->
    <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm p-6 transition-colors duration-200">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('profile.personalInfo') }}</h3>

      <!-- Name -->
      <div class="relative mb-4">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.name') }}</label>
        <input
          v-model="form.name"
          type="text"
          class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <!-- Email -->
      <div class="relative mb-4">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.email') }}</label>
        <input
          v-model="form.email"
          type="email"
          class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <button
        class="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="saving"
        @click="saveProfile"
      >
        {{ t('profile.save') }}
      </button>

      <!-- Success message -->
      <span v-if="profileSaved" class="ml-3 text-[13px] text-emerald-500 font-medium">{{ t('profile.saved') }}</span>
    </div>

    <!-- Company Card -->
    <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm p-6 transition-colors duration-200">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('profile.companyInfo') }}</h3>

      <!-- Company Name -->
      <div class="relative mb-4">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.companyName') }}</label>
        <input
          v-model="companyForm.name"
          type="text"
          class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Company Document -->
        <div class="relative flex-1">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.companyDocument') }}</label>
          <input
            v-model="companyForm.document"
            type="text"
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>

        <!-- Company Phone -->
        <div class="relative flex-1">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.companyPhone') }}</label>
          <input
            v-model="companyForm.phone"
            type="text"
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Change Password Card -->
    <div class="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-sm p-6 transition-colors duration-200">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">{{ t('profile.changePassword') }}</h3>

      <!-- Current password -->
      <div class="relative mb-4">
        <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.currentPassword') }}</label>
        <input
          v-model="passForm.currentPassword"
          type="password"
          class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mb-4">
        <!-- New password -->
        <div class="relative flex-1">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.newPassword') }}</label>
          <input
            v-model="passForm.newPassword"
            type="password"
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
        <!-- Confirm password -->
        <div class="relative flex-1">
          <label class="absolute text-[11px] font-medium text-gray-500 dark:text-gray-400 top-[7px] left-3 z-10">{{ t('profile.confirmPassword') }}</label>
          <input
            v-model="passForm.confirmPassword"
            type="password"
            class="block rounded-lg px-3 pb-2 pt-[22px] w-full text-[13px] font-medium text-gray-900 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#4a4a4a] appearance-none dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      <div v-if="passError" class="mb-3 text-[13px] text-red-500 font-medium">{{ passError }}</div>

      <button
        class="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="changingPass"
        @click="handleChangePassword"
      >
        {{ t('profile.updatePassword') }}
      </button>

      <span v-if="passSaved" class="ml-3 text-[13px] text-emerald-500 font-medium">{{ t('profile.passwordChanged') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../domain/useAuthStore'
import { authService } from '../../application/container'
import BackButton from '../components/BackButton.vue'

const { t } = useI18n()
const { user } = useAuthStore()

const form = reactive({ name: '', email: '' })
const companyForm = reactive({ name: '', document: '', phone: '' })
const passForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })

const saving = ref(false)
const profileSaved = ref(false)
const changingPass = ref(false)
const passSaved = ref(false)
const passError = ref('')

onMounted(() => {
  if (user.value) {
    form.name = user.value.name
    form.email = user.value.email
    if (user.value.company) {
      companyForm.name = user.value.company.name
      companyForm.document = user.value.company.document
      companyForm.phone = user.value.company.phone
    }
  }
})

async function saveProfile() {
  saving.value = true
  profileSaved.value = false
  try {
    const company = companyForm.name
      ? { name: companyForm.name, document: companyForm.document, phone: companyForm.phone }
      : null
    const updated = await authService.updateProfile({ name: form.name, email: form.email, company })
    if (user.value) {
      user.value.name = updated.name
      user.value.email = updated.email
      user.value.company = updated.company
    }
    profileSaved.value = true
  } finally {
    saving.value = false
  }
}

async function handleChangePassword() {
  passError.value = ''
  passSaved.value = false
  if (passForm.newPassword !== passForm.confirmPassword) {
    passError.value = t('profile.passwordMismatch')
    return
  }
  if (passForm.newPassword.length < 6) {
    passError.value = t('profile.passwordTooShort')
    return
  }
  changingPass.value = true
  try {
    await authService.changePassword({
      currentPassword: passForm.currentPassword,
      newPassword: passForm.newPassword,
    })
    passSaved.value = true
    passForm.currentPassword = ''
    passForm.newPassword = ''
    passForm.confirmPassword = ''
  } catch {
    passError.value = t('profile.passwordError')
  } finally {
    changingPass.value = false
  }
}
</script>
