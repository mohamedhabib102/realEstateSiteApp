<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { User, Shield, Bell, Lock, Save, CheckCircle2, Eye, EyeOff } from 'lucide-vue-next'
import { superAdminInfo } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const t = (en: string, ar: string) => (locale.value === 'ar' ? ar : en)

const p = ref({ name: superAdminInfo.nameEn, email: superAdminInfo.email, phone: '+20 100 123 4567' })
const activeTab = ref<'profile' | 'security' | 'notifications'>('profile')
const toast = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const sec = ref({ current: '', next: '', confirm: '' })
const notifications = ref([
    { key: 'approvals', en: 'New property approvals', ar: 'موافقات عقارات جديدة', on: true },
    { key: 'contacts', en: 'New contact submissions', ar: 'رسائل تواصل جديدة', on: true },
    { key: 'revenue', en: 'Revenue reports', ar: 'تقارير الإيرادات', on: false },
])

const tabs = [
    { key: 'profile' as const, labelEn: 'Profile', labelAr: 'الملف الشخصي', icon: User },
    { key: 'security' as const, labelEn: 'Security', labelAr: 'الأمان', icon: Shield },
    { key: 'notifications' as const, labelEn: 'Notifications', labelAr: 'الإشعارات', icon: Bell },
]

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const saveProfile = () => showToast(t('Profile updated', 'تم تحديث الملف الشخصي'))

const savePassword = () => {
    if (!sec.value.current || !sec.value.next || sec.value.next !== sec.value.confirm) {
        showToast(t('Password does not match confirmation', 'كلمة المرور غير متطابقة مع التأكيد'))
        return
    }
    sec.value = { current: '', next: '', confirm: '' }
    showToast(t('Password updated successfully', 'تم تحديث كلمة المرور بنجاح'))
}

const saveNotify = () => showToast(t('Notification preferences saved', 'تم حفظ تفضيلات الإشعارات'))
</script>

<template>
    <div class="space-y-6">
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ t('Settings', 'الإعدادات') }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ t('Manage your platform account settings', 'إدارة إعدادات حسابك في المنصة') }}</p>
        </div>

        <!-- Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 60 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit flex-wrap">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer"
                :class="activeTab === tab.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                <component :is="tab.icon" class="w-4 h-4" /> {{ t(tab.labelEn, tab.labelAr) }}
            </button>
        </div>

        <!-- Profile -->
        <section v-if="activeTab === 'profile'" v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 80 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span class="text-2xl font-bold text-primary">{{ p.name.charAt(0) }}</span>
                </div>
                <div>
                    <p class="font-bold text-gray-900">{{ p.name }}</p>
                    <p class="text-sm text-gray-500">{{ p.email }}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('Full Name', 'الاسم الكامل') }}</label><input v-model="p.name" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                <div><label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('Email', 'البريد الإلكتروني') }}</label><input v-model="p.email" type="email" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                <div><label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('Phone', 'الهاتف') }}</label><input v-model="p.phone" dir="ltr" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            </div>
            <div class="mt-6 flex justify-end">
                <button @click="saveProfile" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                    <Save class="w-4 h-4" /> {{ t('Save Changes', 'حفظ التغييرات') }}
                </button>
            </div>
        </section>

        <!-- Security -->
        <section v-if="activeTab === 'security'" v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 80 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
            <h3 class="font-bold text-gray-900 mb-2">{{ t('Change Password', 'تغيير كلمة المرور') }}</h3>
            <p class="text-sm text-gray-400 mb-6">{{ t('Use a strong password with at least 8 characters', 'استخدم كلمة مرور قوية تتكون من 8 أحرف على الأقل') }}</p>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('Current Password', 'كلمة المرور الحالية') }}</label>
                    <div class="relative">
                        <input v-model="sec.current" dir="ltr" :type="showCurrent ? 'text' : 'password'" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                        <button @click="showCurrent = !showCurrent" class="absolute inset-y-0 right-0 w-10 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <EyeOff v-if="showCurrent" class="w-4 h-4" /><Eye v-else class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('New Password', 'كلمة المرور الجديدة') }}</label>
                    <div class="relative">
                        <input v-model="sec.next" dir="ltr" :type="showNew ? 'text' : 'password'" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                        <button @click="showNew = !showNew" class="absolute inset-y-0 right-0 w-10 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <EyeOff v-if="showNew" class="w-4 h-4" /><Eye v-else class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">{{ t('Confirm New Password', 'تأكيد كلمة المرور الجديدة') }}</label>
                    <input v-model="sec.confirm" dir="ltr" :type="showNew ? 'text' : 'password'" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
            </div>
            <div class="mt-6 flex justify-end">
                <button @click="savePassword" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                    <Lock class="w-4 h-4" /> {{ t('Update Password', 'تحديث كلمة المرور') }}
                </button>
            </div>
        </section>

        <!-- Notifications -->
        <section v-if="activeTab === 'notifications'" v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 80 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div class="space-y-3">
                <label v-for="n in notifications" :key="n.key" class="flex items-center justify-between p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-primary/30 transition-colors">
                    <span class="text-sm font-semibold text-gray-700">{{ t(n.en, n.ar) }}</span>
                    <button @click="n.on = !n.on" class="relative w-12 h-6 rounded-full transition-colors cursor-pointer" :class="n.on ? 'bg-primary' : 'bg-gray-200'">
                        <span class="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" :class="n.on ? (locale === 'ar' ? 'right-0.5' : 'right-auto left-0.5') : (locale === 'ar' ? 'right-auto left-0.5' : 'right-0.5')"></span>
                    </button>
                </label>
            </div>
            <div class="mt-6 flex justify-end">
                <button @click="saveNotify" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                    <Save class="w-4 h-4" /> {{ t('Save Preferences', 'حفظ التفضيلات') }}
                </button>
            </div>
        </section>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}</div>
        </Transition>
    </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>