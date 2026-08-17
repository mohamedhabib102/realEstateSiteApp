<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    User, Shield, Bell, Trash2, Camera, Key, LogOut,
    Mail, Smartphone, Save
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { ownerInfo } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const activeTab = ref('personal')
const toast = ref('')

const tabs = [
    { key: 'personal', icon: User, labelEn: 'Personal Information', labelAr: 'المعلومات الشخصية' },
    { key: 'security', icon: Shield, labelEn: 'Security', labelAr: 'الأمان' },
    { key: 'notifications', icon: Bell, labelEn: 'Notifications', labelAr: 'الإشعارات' },
]

const notificationPrefs = [
    { key: 'newProperty', labelEn: 'New purchase requests', labelAr: 'طلبات الشراء الجديدة', val: true, tone: 'text-primary' },
    { key: 'messages', labelEn: 'New messages', labelAr: 'الرسائل الجديدة', val: true, tone: 'text-primary' },
    { key: 'payments', labelEn: 'Payment updates', labelAr: 'تحديثات الدفع', val: true, tone: 'text-emerald-600' },
    { key: 'marketing', labelEn: 'Marketing & promotions', labelAr: 'التسويق والعروض', val: false, tone: 'text-amber-600' },
]

// Password modal
const passOpen = ref(false)
const passForm = ref({ current: '', new: '', confirm: '' })
const savePassword = () => {
    if (passForm.value.new === passForm.value.confirm && passForm.value.new) {
        passOpen.value = false
        showToast(locale.value === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully')
        passForm.value = { current: '', new: '', confirm: '' }
    }
}

// Danger zone confirm
const dangerOpen = ref(false)
const confirmDeleteAccount = () => {
    dangerOpen.value = false
    showToast(locale.value === 'ar' ? 'تم إرسال طلب حذف الحساب' : 'Account deletion requested')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'الإعدادات' : 'Settings' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'أدر حسابك وأمانك الشخصي' : 'Manage your profile, notifications, and security' }}</p>
        </div>

        <!-- Layout -->
        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }" class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
            <!-- Tabs sidebar -->
            <aside class="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 h-fit lg:sticky lg:top-20">
                <button
                    v-for="tab in tabs" :key="tab.key"
                    @click="activeTab = tab.key"
                    class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    :class="activeTab === tab.key ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'"
                >
                    <component :is="tab.icon" class="w-4.5 h-4.5" />
                    {{ locale === 'ar' ? tab.labelAr : tab.labelEn }}
                </button>

                <!-- Danger zone link -->
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <button @click="activeTab = 'danger'" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        :class="activeTab === 'danger' ? 'bg-red-50 text-red-600' : 'text-red-500 hover:bg-red-50'">
                        <Trash2 class="w-4.5 h-4.5" />
                        {{ locale === 'ar' ? 'منطقة الخطر' : 'Danger Zone' }}
                    </button>
                </div>
            </aside>

            <!-- Content -->
            <div class="space-y-5">
                <!-- Personal -->
                <section v-if="activeTab === 'personal'" v-motion class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><User class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'المعلومات الشخصية' : 'Personal Information' }}</h3>

                    <div class="flex items-center gap-4 mb-6">
                        <div class="relative group">
                            <img :src="ownerInfo.avatar" alt="" class="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20" />
                            <div class="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera class="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold text-gray-900">{{ locale === 'ar' ? ownerInfo.nameAr : ownerInfo.nameEn }}</div>
                            <div class="text-sm text-gray-500 mt-0.5">{{ ownerInfo.email }}</div>
                            <div class="text-sm text-primary font-semibold mt-0.5">{{ locale === 'ar' ? 'مالك' : 'Owner' }}</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم الكامل' : 'Full Name' }}</label>
                            <input :value="locale === 'ar' ? ownerInfo.nameAr : ownerInfo.nameEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}</label>
                            <input :value="ownerInfo.email" type="email" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'رقم الهاتف' : 'Phone' }}</label>
                            <input :value="ownerInfo.phone" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الموقع' : 'Location' }}</label>
                            <input :value="locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end">
                        <button @click="showToast(locale === 'ar' ? 'تم حفظ التغييرات' : 'Changes saved')" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-semibold cursor-pointer">
                            <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
                        </button>
                    </div>
                </section>

                <!-- Security -->
                <section v-if="activeTab === 'security'" v-motion class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><Shield class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'الأمان' : 'Security' }}</h3>
                    <div class="space-y-3">
                        <button @click="passOpen = true" class="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Key class="w-5 h-5 text-primary" /></div>
                            <div class="flex-1 text-start">
                                <div class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? 'كلمة المرور' : 'Password' }}</div>
                                <div class="text-xs text-gray-400">{{ locale === 'ar' ? 'غيّر كلمة المرور الخاصة بك' : 'Update your account password' }}</div>
                            </div>
                            <span class="text-primary text-sm font-semibold">{{ locale === 'ar' ? 'تغيير' : 'Change' }}</span>
                        </button>
                        <button class="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><Smartphone class="w-5 h-5 text-emerald-600" /></div>
                            <div class="flex-1 text-start">
                                <div class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication' }}</div>
                                <div class="text-xs text-gray-400">{{ locale === 'ar' ? 'فعّال — أضف طبقة أمان إضافية' : 'Enabled — add an extra security layer' }}</div>
                            </div>
                            <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold">{{ locale === 'ar' ? 'مفعّل' : 'On' }}</span>
                        </button>
                    </div>
                </section>

                <!-- Notifications -->
                <section v-if="activeTab === 'notifications'" v-motion class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"><Bell class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'الإشعارات' : 'Notifications' }}</h3>
                    <div class="divide-y divide-gray-50">
                        <div v-for="n in notificationPrefs" :key="n.key" class="flex items-center justify-between py-3.5">
                            <div>
                                <div class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? n.labelAr : n.labelEn }}</div>
                            </div>
                            <button
                                @click="n.val = !n.val"
                                class="relative w-11 h-6 rounded-full transition-colors cursor-pointer"
                                :class="n.val ? 'bg-primary' : 'bg-gray-200'"
                                role="switch"
                            >
                                <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" :class="n.val ? (locale === 'ar' ? 'left-0.5' : 'right-0.5') : (locale === 'ar' ? 'right-0.5' : 'left-0.5')"></span>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Danger Zone -->
                <section v-if="activeTab === 'danger'" v-motion class="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                    <h3 class="text-lg font-bold text-red-600 mb-2 flex items-center gap-2"><Trash2 class="w-5 h-5" />{{ locale === 'ar' ? 'منطقة الخطر' : 'Danger Zone' }}</h3>
                    <p class="text-sm text-gray-500 mb-5">{{ locale === 'ar' ? 'إجراءات لا يمكن التراجع عنها. يرجى الحذر.' : 'These actions are irreversible. Please proceed with caution.' }}</p>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                            <div class="flex items-center gap-3">
                                <LogOut class="w-5 h-5 text-gray-500" />
                                <div>
                                    <div class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? 'تسجيل الخروج من جميع الأجهزة' : 'Log out from all devices' }}</div>
                                    <div class="text-xs text-gray-400">{{ locale === 'ar' ? 'إنهاء جميع الجلسات النشطة' : 'End all active sessions' }}</div>
                                </div>
                            </div>
                            <button class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'تنفيذ' : 'Proceed' }}</button>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/40">
                            <div class="flex items-center gap-3">
                                <Trash2 class="w-5 h-5 text-red-500" />
                                <div>
                                    <div class="text-sm font-bold text-red-700">{{ locale === 'ar' ? 'حذف الحساب' : 'Delete Account' }}</div>
                                    <div class="text-xs text-red-500/80">{{ locale === 'ar' ? 'حذف حسابك وكل بياناتك نهائياً' : 'Permanently delete your account and data' }}</div>
                                </div>
                            </div>
                            <button @click="dangerOpen = true" class="px-4 py-2 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- Password modal -->
        <BaseModal :open="passOpen" @close="passOpen = false" :max-width="'26rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Key class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'تغيير كلمة المرور' : 'Change Password' }}</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'كلمة المرور الحالية' : 'Current password' }}</label>
                        <input v-model="passForm.current" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'كلمة المرور الجديدة' : 'New password' }}</label>
                        <input v-model="passForm.new" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm new password' }}</label>
                        <input v-model="passForm.confirm" type="password" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div v-if="passForm.new && passForm.confirm && passForm.new !== passForm.confirm" class="text-xs font-medium text-red-500">
                        {{ locale === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match' }}
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="passOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="savePassword" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'تحديث' : 'Update' }}</button>
            </template>
        </BaseModal>

        <!-- Delete confirm -->
        <BaseModal :open="dangerOpen" @close="dangerOpen = false" :max-width="'24rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'تأكيد حذف الحساب' : 'Confirm Account Deletion' }}</h3>
            </template>
            <template #body>
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><Trash2 class="w-5 h-5 text-red-500" /></div>
                    <p class="text-sm text-gray-600">{{ locale === 'ar' ? 'سيتم حذف حسابك وجميع بياناتك بشكل نهائي. هل أنت متأكد؟' : 'Your account and all associated data will be permanently deleted. Are you sure?' }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="dangerOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="confirmDeleteAccount" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حذف نهائياً' : 'Delete' }}</button>
            </template>
        </BaseModal>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold">{{ toast }}</div>
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