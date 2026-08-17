<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Save, Sparkles, CheckCircle2 } from 'lucide-vue-next'
import { websiteHeaderFields } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const fields = ref(websiteHeaderFields.map((f) => ({ ...f })))
const toast = ref('')

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ إعدادات رأس الموقع' : 'Website header settings saved')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'رأس الموقع' : 'Website Header' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'تحكم في شعار الموقع وعناصر شريط التنقل' : 'Manage the site logo and navigation menu items' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Live preview -->
        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }" class="bg-[#0f1b3d] rounded-2xl p-5 text-white">
            <p class="text-[11px] uppercase tracking-wider text-white/50 mb-4">{{ locale === 'ar' ? 'معاينة حية' : 'Live preview' }}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 bg-secondary text-[#0f1b3d] rounded-lg flex items-center justify-center font-bold">D</span>
                    <span class="font-bold tracking-widest uppercase">{{ fields.find((f) => f.key === 'logo')?.value }}</span>
                </div>
                <nav class="hidden md:flex items-center gap-6 text-sm text-white/70">
                    <template v-for="f in fields.slice(2)" :key="f.key">
                        <span v-if="f.enabled" class="cursor-pointer">{{ locale === 'ar' ? f.value : f.value }}</span>
                    </template>
                </nav>
                <button class="px-4 py-2 rounded-lg bg-secondary text-[#0f1b3d] text-sm font-bold">{{ locale === 'ar' ? 'تسجيل الدخول' : 'Sign In' }}</button>
            </div>
        </section>

        <!-- Fields editor -->
        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 160 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 mb-5"><Sparkles class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'إعدادات العناصر' : 'Navigation & Branding' }}</h3>
            <div class="space-y-4">
                <div v-for="f in fields" :key="f.key" class="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-gray-100">
                    <div class="flex-1">
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? f.label.ar : f.label.en }}</label>
                        <input v-if="f.type === 'text'" v-model="f.value" class="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        <div v-else class="flex items-center gap-3">
                            <span class="w-10 h-10 bg-secondary text-[#0f1b3d] rounded-lg flex items-center justify-center font-bold">D</span>
                            <input v-model="f.value" class="flex-1 max-w-[200px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer shrink-0">
                        <span class="text-xs text-gray-500">{{ locale === 'ar' ? 'معروض' : 'Visible' }}</span>
                        <button @click="f.enabled = !f.enabled" class="relative w-11 h-6 rounded-full transition-colors cursor-pointer" :class="f.enabled ? 'bg-primary' : 'bg-gray-200'">
                            <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" :class="f.enabled ? (locale === 'ar' ? 'left-0.5' : 'right-0.5') : (locale === 'ar' ? 'right-0.5' : 'left-0.5')"></span>
                        </button>
                    </label>
                </div>
            </div>
        </section>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}
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