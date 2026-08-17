<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Save, Image, BarChart3, ShieldCheck, CheckCircle2, Trash2, Plus, GripVertical
} from 'lucide-vue-next'
import ContentSectionEditor from '../../components/ContentSectionEditor.vue'
import {
    aboutPageSections, aboutStats, aboutCoreValues,
    type AboutStat, type AboutValue,
} from '../../../../data/aboutPageContent'
import type { EditableSection } from '../../../../data/contentTypes'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const sections = ref<EditableSection[]>(clone(aboutPageSections))
const stats = ref<AboutStat[]>(clone(aboutStats))
const values = ref<AboutValue[]>(clone(aboutCoreValues))
const toast = ref('')
const activeTab = ref('sections')

const tabs = [
    { key: 'sections', labelEn: 'Page Sections', labelAr: 'أقسام الصفحة' },
    { key: 'stats', labelEn: 'Stats Counters', labelAr: 'إحصائيات' },
    { key: 'values', labelEn: 'Core Values', labelAr: 'القيم الأساسية' },
]

const icons: Record<string, any> = {
    hero: Image,
    story: Image,
    values: ShieldCheck,
    banner: Image,
}

const sectionByKey = (key: string) => sections.value.find((s) => s.key === key)!

const addStat = () => {
    stats.value.push({ id: Date.now(), value: 0, suffix: '+', label: { en: '', ar: '' } })
}

const removeStat = (id: number) => {
    stats.value = stats.value.filter((s) => s.id !== id)
}

const addValue = () => {
    values.value.push({ id: Date.now(), icon: 'shield', title: { en: '', ar: '' }, desc: { en: '', ar: '' } })
}

const removeValue = (id: number) => {
    values.value = values.value.filter((v) => v.id !== id)
}

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ محتوى صفحة من نحن' : 'About Us content saved')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const inputCls = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'من نحن' : 'About Us' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'تحرير محتوى صفحة من نحن' : 'Edit the About Us page content' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit flex-wrap">
            <button
                v-for="t in tabs" :key="t.key"
                @click="activeTab = t.key"
                class="px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer"
                :class="activeTab === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
            </button>
        </div>

        <!-- Page sections -->
        <div v-if="activeTab === 'sections'" class="space-y-4">
            <ContentSectionEditor v-for="key in ['hero', 'story', 'values', 'banner']" :key="key" :section="sectionByKey(key)" :icon="icons[key]" />
        </div>

        <!-- Stats -->
        <div v-else-if="activeTab === 'stats'" class="space-y-4">
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">{{ locale === 'ar' ? 'عدادات الإحصائيات المعروضة في القسم' : 'The stat counters shown in the section' }}</p>
                <button @click="addStat" class="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer">
                    <Plus class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'إضافة إحصائية' : 'Add Stat' }}
                </button>
            </div>

            <div v-for="(s, i) in stats" :key="s.id"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-sm font-bold text-gray-900 inline-flex items-center gap-2"><BarChart3 class="w-4 h-4 text-primary" />{{ locale === 'ar' ? `إحصائية ${i + 1}` : `Stat ${i + 1}` }}</h4>
                    <button @click="removeStat(s.id)" class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'القيمة' : 'Value' }}</label><input v-model.number="s.value" type="number" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'اللاحقة' : 'Suffix' }}</label><input v-model="s.suffix" :class="inputCls" /></div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التسمية (إنجليزي)' : 'Label (English)' }}</label>
                        <input v-model="s.label.en" :class="inputCls" />
                        <label class="block text-xs font-semibold text-gray-700 mb-1 mt-3">{{ locale === 'ar' ? 'التسمية (عربي)' : 'Label (Arabic)' }}</label>
                        <input v-model="s.label.ar" :class="inputCls" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Core values -->
        <div v-else-if="activeTab === 'values'" class="space-y-4">
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">{{ locale === 'ar' ? 'بطاقات القيم الأساسية (الأيقونات ثابتة)' : 'Core value cards (icons are fixed)' }}</p>
                <button @click="addValue" class="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer">
                    <Plus class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'إضافة قيمة' : 'Add Value' }}
                </button>
            </div>

            <div v-for="(v, i) in values" :key="v.id"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-sm font-bold text-gray-900 inline-flex items-center gap-2"><GripVertical class="w-4 h-4 text-gray-300" />{{ locale === 'ar' ? `قيمة ${i + 1}` : `Value ${i + 1}` }}</h4>
                    <button @click="removeValue(v.id)" class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)' }}</label>
                        <input v-model="v.title.en" :class="inputCls" />
                        <label class="block text-xs font-semibold text-gray-700 mb-1 mt-3">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)' }}</label>
                        <input v-model="v.title.ar" :class="inputCls" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)' }}</label>
                        <textarea v-model="v.desc.en" rows="3" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea>
                        <label class="block text-xs font-semibold text-gray-700 mb-1 mt-3">{{ locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)' }}</label>
                        <textarea v-model="v.desc.ar" rows="3" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea>
                    </div>
                </div>
            </div>
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