<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Save, ShieldCheck, CheckCircle2, FormInput, AlignLeft, Images, Type, Sparkles } from 'lucide-vue-next'
import ImageUpload from '../../../../components/ImageUpload.vue'
import { authPageContents, authHeroEditable } from '../../../../data/superAdminDashboard'
import type { AuthPageContent } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const pageKeys = [
    { key: 'login', labelEn: 'Login', labelAr: 'تسجيل الدخول' },
    { key: 'register', labelEn: 'Register', labelAr: 'إنشاء حساب' },
    { key: 'forgotPassword', labelEn: 'Forgot Password', labelAr: 'نسيت كلمة المرور' },
    { key: 'emailVerification', labelEn: 'Email Verification', labelAr: 'تأكيد البريد الإلكتروني' },
] as const

const activePage = ref<string>('login')
const pages = ref<AuthPageContent[]>(clone(authPageContents))
const hero = ref(authHeroEditable.map((f) => ({ ...f })))
const toast = ref('')

const current = (): AuthPageContent => {
    const found = pages.value.find((p) => p.key === activePage.value)
    return found ?? pages.value[0]
}

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ محتوى صفحات التسجيل' : 'Authentication pages content saved')
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'صفحات التسجيل' : 'Authentication Pages' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'عدّل كل نصوص وصور صفحات تسجيل الدخول والتسجيل' : 'Edit all text and image content of the auth pages' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Page Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-wrap gap-2">
            <button
                v-for="p in pageKeys"
                :key="p.key"
                @click="activePage = p.key"
                class="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                :class="activePage === p.key ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'"
            >
                {{ locale === 'ar' ? p.labelAr : p.labelEn }}
            </button>
        </div>

        <!-- Selected Page Editor -->
        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 mb-6"><ShieldCheck class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'نصوص الصفحة' : 'Page Content' }}</h3>

            <div class="space-y-6">
                <!-- Title / Subtitle -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)' }}</label><input v-model="current().titleEn" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)' }}</label><input v-model="current().titleAr" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'النص الفرعي (إنجليزي)' : 'Subtitle (English)' }}</label><textarea v-model="current().subtitleEn" rows="2" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'النص الفرعي (عربي)' : 'Subtitle (Arabic)' }}</label><textarea v-model="current().subtitleAr" rows="2" :class="inputCls" /></div>
                </div>

                <!-- Description -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="current().descriptionEn !== undefined">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1 inline-flex items-center gap-1"><AlignLeft class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)' }}</label><textarea v-model="current().descriptionEn" rows="3" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1 inline-flex items-center gap-1"><AlignLeft class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)' }}</label><textarea v-model="current().descriptionAr" rows="3" :class="inputCls" /></div>
                </div>

                <!-- Button -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1 inline-flex items-center gap-1"><Type class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'زر الإجراء (إنجليزي)' : 'Button (English)' }}</label><input v-model="current().buttonLabelEn" :class="inputCls" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1 inline-flex items-center gap-1"><Type class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'زر الإجراء (عربي)' : 'Button (Arabic)' }}</label><input v-model="current().buttonLabelAr" :class="inputCls" /></div>
                </div>

                <!-- Form Fields -->
                <div v-if="current().formFields" class="pt-4 border-t border-gray-100">
                    <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 inline-flex items-center gap-1.5"><FormInput class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'حقول النموذج' : 'Form Fields' }}</p>
                    <div class="space-y-3">
                        <div v-for="f in current().formFields" :key="f.key" class="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'التسمية (إنجليزي)' : 'Label (English)' }}</label><input v-model="f.labelEn" :class="inputCls" /></div>
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'التسمية (عربي)' : 'Label (Arabic)' }}</label><input v-model="f.labelAr" :class="inputCls" /></div>
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'النص الإرشادي (إنجليزي)' : 'Placeholder (English)' }}</label><input v-model="f.placeholderEn" :class="inputCls" /></div>
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'النص الإرشادي (عربي)' : 'Placeholder (Arabic)' }}</label><input v-model="f.placeholderAr" :class="inputCls" /></div>
                        </div>
                    </div>
                </div>

                <!-- Extra Texts -->
                <div v-if="current().texts.length" class="pt-4 border-t border-gray-100">
                    <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 inline-flex items-center gap-1.5"><Type class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'نصوص إضافية' : 'Additional Text' }}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div v-for="t in current().texts" :key="t.key" class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'النص (إنجليزي)' : 'Text (English)' }}</label><input v-model="t.labelEn" :class="inputCls" /></div>
                            <div><label class="block text-[11px] font-semibold text-gray-500 mb-1">{{ locale === 'ar' ? 'النص (عربي)' : 'Text (Arabic)' }}</label><input v-model="t.labelAr" :class="inputCls" /></div>
                        </div>
                    </div>
                </div>

                <!-- Images -->
                <div v-if="current().images.length" class="pt-4 border-t border-gray-100">
                    <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 inline-flex items-center gap-1.5"><Images class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'الصور' : 'Images' }}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload
                            v-for="img in current().images"
                            :key="img.key"
                            v-model="img.value"
                            :label="locale === 'ar' ? img.labelAr : img.labelEn"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Hero Section Content (shared across auth pages) -->
        <section v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 180 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 mb-5"><Sparkles class="w-5 h-5 text-secondary" />{{ locale === 'ar' ? 'محتوى قسم البطل' : 'Hero Section Content' }}</h3>
            <div class="space-y-4">
                <div v-for="f in hero" :key="f.key">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? f.label.ar : f.label.en }}</label>
                    <textarea v-model="f.value" rows="2" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea>
                </div>
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