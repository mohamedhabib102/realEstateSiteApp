<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Save, CheckCircle2, Scale } from 'lucide-vue-next'
import ContentSectionEditor from '../../components/ContentSectionEditor.vue'
import { comparePageSections } from '../../../../data/comparePageContent'
import type { EditableSection } from '../../../../data/contentTypes'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const sections = ref<EditableSection[]>(clone(comparePageSections))
const toast = ref('')

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ محتوى صفحة المقارنة' : 'Comparison page content saved')
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'صفحة المقارنة' : 'Comparison Page' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'قم بتحرير المحتوى الثابت لصفحة المقارنة' : 'Edit the static content of the comparison page' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Info note -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
            <Scale class="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p class="text-sm text-gray-600">
                {{ locale === 'ar'
                    ? 'يتم إدارة المحتوى الديناميكي (الجدول المقارن، خصائص العقارات) تلقائياً من بيانات العقارات. هذه الصفحة تتحكم فقط في النصوص الثابتة الخاصة بالصفحة نفسها.'
                    : 'Dynamic content (the comparison table, property specs) is served from product data. This page only manages the static text that belongs to the page itself.' }}
            </p>
        </div>

        <!-- Section editors -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ContentSectionEditor
                v-for="(section, i) in sections"
                :key="section.key"
                :section="section"
                :icon="Scale"
                v-motion
                :initial="{ opacity: 0, y: 16 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 + i * 60 } }"
            />
        </div>

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
