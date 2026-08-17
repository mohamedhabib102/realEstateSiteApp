<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Save, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'
import { authPageContents, authHeroEditable } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const pages = ref(authPageContents.map((p) => ({ ...p })))
const hero = ref(authHeroEditable.map((f) => ({ ...f })))
const toast = ref('')

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ محتوى صفحات التسجيل' : 'Authentication pages content saved')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'صفحات التسجيل' : 'Authentication Pages' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'عدّل نصوص صفحات تسجيل الدخول وإنشاء الحساب' : 'Edit the login and register page text content' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 mb-5"><ShieldCheck class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'نصوص الصفحات' : 'Page Texts' }}</h3>
            <div class="space-y-6">
                <div v-for="p in pages" :key="p.key" class="border border-gray-100 rounded-xl p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{{ locale === 'ar' ? (p.key === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب') : (p.key === 'login' ? 'Login' : 'Register') }}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان' : 'Title' }}</label><input v-model="p.titleEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'النص الفرعي' : 'Subtitle' }}</label><input v-model="p.subtitleEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'زر الإجراء' : 'Button Label' }}</label><input v-model="p.buttonLabelEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    </div>
                </div>
            </div>
        </section>

        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 180 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 mb-5">{{ locale === 'ar' ? 'محتوى قسم البطل' : 'Hero Section Content' }}</h3>
            <div class="space-y-4">
                <div v-for="f in hero" :key="f.key">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? f.label.ar : f.label.en }}</label>
                    <textarea v-model="f.value" rows="2" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea>
                </div>
            </div>
        </section>

        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}</div>
        </Transition>
    </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>