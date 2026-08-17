<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
    MapPin, Calendar, Mail, User, ShieldAlert, ShieldCheck, Key,
    Smartphone, LogOut, Trash2, Camera, Edit2, CheckCircle2, AlertTriangle, ArrowRight
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { buyerInfo } from '../../../../data/buyerDashboard'
import { verificationState } from '../../../../data/verificationState'

const { locale, t } = useI18n()
const router = useRouter()

const buyer = computed(() => ({
    firstName: 'Sarah',
    lastName: 'Johnson',
    ...buyerInfo,
    dateOfBirth: '1994-09-20',
    gender: 'female',
    countryEn: 'Egypt',
    countryAr: 'مصر',
    cityEn: 'Cairo',
    cityAr: 'القاهرة',
    isVerified: verificationState.buyer.status === 'approved',
    roleEn: 'Buyer',
    roleAr: 'مشتري',
}))

const buyerFullName = () => `${buyer.value.firstName} ${buyer.value.lastName}`

const goToVerification = () => router.push(`/${locale.value}/dashboards/verification`)

const activeModal = ref<'password' | 'email' | 'phone' | null>(null)
const deleteOpen = ref(false)
const toast = ref('')

const passForm = ref({ current: '', new: '', confirm: '' })
const emailForm = ref({ newEmail: '' })
const phoneForm = ref({ newPhone: '' })
const deleteTyped = ref('')

const securityActions = computed(() => [
    { id: 'password' as const, icon: Key, label: t('buyerProfile.changePassword'), action: (): void => { activeModal.value = 'password' } },
    { id: 'email' as const, icon: Mail, label: t('buyerProfile.changeEmail'), action: (): void => { activeModal.value = 'email' } },
    { id: 'phone' as const, icon: Smartphone, label: t('buyerProfile.changePhone'), action: (): void => { activeModal.value = 'phone' } },
])

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const closeModal = () => {
    activeModal.value = null
    passForm.value = { current: '', new: '', confirm: '' }
    emailForm.value = { newEmail: '' }
    phoneForm.value = { newPhone: '' }
}

const savePassword = () => {
    if (passForm.value.new !== passForm.value.confirm || !passForm.value.new) return
    closeModal()
    showToast(locale.value === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password updated successfully')
}

const saveEmail = () => {
    if (!emailForm.value.newEmail) return
    closeModal()
    showToast(locale.value === 'ar' ? 'تم تحديث البريد الإلكتروني بنجاح' : 'Email updated successfully')
}

const savePhone = () => {
    if (!phoneForm.value.newPhone) return
    closeModal()
    showToast(locale.value === 'ar' ? 'تم تحديث رقم الهاتف بنجاح' : 'Phone number updated successfully')
}

const confirmDelete = () => {
    if (deleteTyped.value.trim().toLowerCase() !== buyerFullName().toLowerCase()) return
    deleteOpen.value = false
    showToast(locale.value === 'ar' ? 'تم إرسال طلب حذف الحساب' : 'Account deletion requested')
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'الإعدادات' : 'Settings' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'أدر ملفك الشخصي وأمانك' : 'Manage your profile and security' }}</p>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }">
            <!-- Profile header card -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-start">
                <div class="relative shrink-0 group">
                    <div class="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white bg-gray-100 relative">
                        <img :src="buyer.avatar" alt="Profile" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                            <Camera class="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <h2 class="text-xl font-bold text-gray-900" :class="locale === 'ar' ? 'font-cairo' : ''">{{ buyerFullName() }}</h2>
                    <div class="flex items-center justify-center md:justify-start flex-wrap gap-2 text-sm text-gray-500 mt-1">
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{{ t('buyerProfile.memberSince') }} {{ buyer.memberSince }}</span>
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{{ t('buyerProfile.role') }} {{ locale === 'ar' ? buyer.roleAr : buyer.roleEn }}</span>
                        <span class="flex items-center gap-1" :class="buyer.isVerified ? 'text-emerald-600' : 'text-amber-500'">
                            <ShieldCheck v-if="buyer.isVerified" class="w-4 h-4" />
                            <ShieldAlert v-else class="w-4 h-4" />
                            {{ buyer.isVerified ? t('buyerProfile.verified') : t('buyerProfile.unverified') }}
                        </span>
                    </div>
                </div>
                <button class="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-colors font-medium text-sm cursor-pointer shrink-0">
                    <Edit2 class="w-4 h-4" /> {{ t('buyerProfile.editProfile') }}
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <!-- Personal info (2 cols) -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 160 } }" class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><User class="w-5 h-5 text-primary" />{{ t('buyerProfile.personalInfo') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.fullName') }}</label>
                        <p class="text-sm font-semibold text-gray-800">{{ buyerFullName() }}</p>
                    </div>
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.email') }}</label>
                        <p class="text-sm font-semibold text-gray-800">{{ buyer.email }}</p>
                    </div>
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.phone') }}</label>
                        <p class="text-sm font-semibold text-gray-800 dir-ltr text-start">{{ buyer.phone }}</p>
                    </div>
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.dob') }}</label>
                        <p class="text-sm font-semibold text-gray-800 flex items-center gap-2"><Calendar class="w-4 h-4 text-gray-400" />{{ buyer.dateOfBirth }}</p>
                    </div>
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.gender') }}</label>
                        <p class="text-sm font-semibold text-gray-800">{{ buyer.gender === 'male' ? t('buyerProfile.male') : buyer.gender === 'female' ? t('buyerProfile.female') : t('buyerProfile.notSpecified') }}</p>
                    </div>
                    <div>
                        <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.location') }}</label>
                        <p class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <MapPin class="w-4 h-4 text-gray-400" />{{ locale === 'ar' ? buyer.countryAr : buyer.countryEn }}, {{ locale === 'ar' ? buyer.cityAr : buyer.cityEn }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Security & danger (1 col) -->
            <div class="space-y-5">
                <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 220 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'التحقق من الحساب' : 'Account Verification' }}</h3>
                    <div class="flex items-center gap-3 p-3.5 rounded-xl border" :class="buyer.isVerified ? 'border-emerald-100 bg-emerald-50/40' : 'border-amber-100 bg-amber-50/40'">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="buyer.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-600'">
                            <ShieldCheck v-if="buyer.isVerified" class="w-5 h-5" />
                            <ShieldAlert v-else class="w-5 h-5" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-bold" :class="buyer.isVerified ? 'text-emerald-700' : 'text-amber-700'">
                                {{ buyer.isVerified ? (locale === 'ar' ? 'موثق' : 'Verified') : verificationState.buyer.status === 'pending' ? (locale === 'ar' ? 'قيد المراجعة' : 'Pending Review') : verificationState.buyer.status === 'rejected' ? (locale === 'ar' ? 'مرفوض' : 'Rejected') : (locale === 'ar' ? 'غير موثق' : 'Not Verified') }}
                            </div>
                            <div class="text-xs text-gray-500 mt-0.5">
                                {{ buyer.isVerified ? (locale === 'ar' ? 'تم توثيق هويتك بنجاح' : 'Your identity has been verified') : (locale === 'ar' ? 'وثّق حسابك لعرض شارة موثقة' : 'Verify your account to get a verified badge') }}
                            </div>
                        </div>
                        <button
                            v-if="!buyer.isVerified"
                            @click="goToVerification"
                            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-xs font-bold cursor-pointer shrink-0">
                            {{ verificationState.buyer.status === 'pending' ? (locale === 'ar' ? 'عرض' : 'View') : (locale === 'ar' ? 'تحقق' : 'Verify') }}
                            <ArrowRight class="w-3.5 h-3.5" :class="locale === 'ar' ? 'rotate-180' : ''" />
                        </button>
                    </div>
                </div>

                <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 220 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">{{ t('buyerProfile.security') }}</h3>
                    <div class="space-y-2">
                        <button v-for="action in securityActions" :key="action.id" @click="action.action" class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="p-2 rounded-lg bg-gray-50 group-hover:bg-white text-gray-500 transition-colors">
                                    <component :is="action.icon" class="w-4 h-4" />
                                </div>
                                <span class="text-sm font-medium text-gray-700">{{ action.label }}</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 280 } }" class="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                    <h3 class="text-sm font-bold text-red-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle class="w-4 h-4" /> {{ t('buyerProfile.dangerZone') }}
                    </h3>
                    <div class="space-y-3">
                        <button class="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="p-2 rounded-lg bg-gray-50 text-gray-500 transition-colors">
                                    <LogOut class="w-4 h-4" />
                                </div>
                                <div class="text-start">
                                    <div class="text-sm font-semibold text-gray-700">{{ t('buyerProfile.logoutAll') }}</div>
                                </div>
                            </div>
                        </button>
                        <button @click="deleteOpen = true" class="w-full flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors group cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="p-2 rounded-lg bg-red-100 text-red-500">
                                    <Trash2 class="w-4 h-4" />
                                </div>
                                <div class="text-start">
                                    <div class="text-sm font-bold text-red-600">{{ t('buyerProfile.deleteAccount') }}</div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <BaseModal :open="activeModal === 'password'" @close="closeModal" :max-width="'26rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Key class="w-5 h-5 text-primary" />{{ t('buyerProfile.securityModal.changePasswordTitle') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ t('buyerProfile.securityModal.currentPassword') }}</label><input v-model="passForm.current" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ t('buyerProfile.securityModal.newPassword') }}</label><input v-model="passForm.new" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ t('buyerProfile.securityModal.confirmPassword') }}</label><input v-model="passForm.confirm" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <p v-if="passForm.new && passForm.confirm && passForm.new !== passForm.confirm" class="text-xs font-medium text-red-500">{{ t('buyerProfile.securityModal.passwordMismatch') }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="closeModal" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.cancel') }}</button>
                <button @click="savePassword" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.update') }}</button>
            </template>
        </BaseModal>

        <BaseModal :open="activeModal === 'email'" @close="closeModal" :max-width="'26rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Mail class="w-5 h-5 text-primary" />{{ t('buyerProfile.securityModal.changeEmailTitle') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ t('buyerProfile.securityModal.newEmail') }}</label><input v-model="emailForm.newEmail" type="email" :placeholder="buyer.email" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                </div>
            </template>
            <template #footer>
                <button @click="closeModal" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.cancel') }}</button>
                <button @click="saveEmail" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.save') }}</button>
            </template>
        </BaseModal>

        <BaseModal :open="activeModal === 'phone'" @close="closeModal" :max-width="'26rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Smartphone class="w-5 h-5 text-primary" />{{ t('buyerProfile.securityModal.changePhoneTitle') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ t('buyerProfile.securityModal.newPhone') }}</label><input v-model="phoneForm.newPhone" type="tel" :placeholder="buyer.phone" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" /></div>
                </div>
            </template>
            <template #footer>
                <button @click="closeModal" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.cancel') }}</button>
                <button @click="savePhone" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.save') }}</button>
            </template>
        </BaseModal>

        <BaseModal :open="deleteOpen" @close="deleteOpen = false" :max-width="'26rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Trash2 class="w-5 h-5 text-red-500" />{{ t('buyerProfile.securityModal.deleteAccountTitle') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                        <AlertTriangle class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p class="text-sm text-red-700 leading-relaxed">{{ t('buyerProfile.securityModal.deleteAccountDesc') }}</p>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ buyerFullName() }}</label>
                        <input v-model="deleteTyped" type="text" :placeholder="t('buyerProfile.securityModal.typeNamePlaceholder')" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                    </div>
                    <p v-if="deleteTyped.trim() && deleteTyped.trim().toLowerCase() !== buyerFullName().toLowerCase()" class="text-xs font-medium text-red-500">{{ t('buyerProfile.securityModal.nameMismatch') }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="deleteOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ t('buyerProfile.securityModal.cancel') }}</button>
                <button @click="confirmDelete" :disabled="deleteTyped.trim().toLowerCase() !== buyerFullName().toLowerCase()" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{{ t('buyerProfile.deleteAccount') }}</button>
            </template>
        </BaseModal>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400" /> {{ toast }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translate(-50%, 10px);
}
</style>