<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Save, Home, CheckCircle2 } from 'lucide-vue-next'
import { homepageEditable } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const fields = ref(homepageEditable.map((f) => ({ ...f })))
const toast = ref('')

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ إعدادات الصفحة الرئيسية' : 'Homepage settings saved')
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'الصفحة الرئيسية' : 'Homepage' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'قم بتعديل عناصر النص في الصفحة الرئيسية' : 'Edit the text content of the homepage' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 mb-5"><Home class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'محتوى الصفحة الرئيسية' : 'Homepage Content' }}</h3>
            <div class="space-y-5">
                <div v-for="f in fields" :key="f.key">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? f.label.ar : f.label.en }}</label>
                    <textarea
                        v-if="f.type === 'textarea'"
                        v-model="f.value"
                        rows="2"
                        class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    ></textarea>
                    <input
                        v-else
                        v-model="f.value"
                        class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
            </div>
        </section>

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