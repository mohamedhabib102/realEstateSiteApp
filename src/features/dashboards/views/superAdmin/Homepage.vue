<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Save, Home, Image, Star, CheckCircle2, Plus, Trash2, GripVertical
} from 'lucide-vue-next'
import ContentSectionEditor from '../../components/ContentSectionEditor.vue'
import ImageUpload from '../../../../components/ImageUpload.vue'
import {
    heroSlides, homepageSections, testimonialReviews,
    type HeroSlide, type TestimonialReview,
} from '../../../../data/homepageContent'
import type { EditableSection } from '../../../../data/contentTypes'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const slides = ref<HeroSlide[]>(clone(heroSlides))
const sections = ref<EditableSection[]>(clone(homepageSections))
const reviews = ref<TestimonialReview[]>(clone(testimonialReviews))
const toast = ref('')

const activeTab = ref('hero')

const tabs = [
    { key: 'hero', labelEn: 'Hero Slides', labelAr: 'شرائح البطل' },
    { key: 'about', labelEn: 'About Section', labelAr: 'قسم من نحن' },
    { key: 'rooms', labelEn: 'Latest Properties', labelAr: 'أحدث العقارات' },
    { key: 'community', labelEn: 'Search & Newsletter', labelAr: 'البحث والنشرة' },
    { key: 'experience', labelEn: 'Experience', labelAr: 'الخبرة' },
    { key: 'testimonials', labelEn: 'Testimonials', labelAr: 'آراء العملاء' },
]

const sectionByKey = (key: string) => sections.value.find((s) => s.key === key)!

const icons = {
    about: Image,
    rooms: Home,
    community: Image,
    experience: Star,
}

const addSlide = () => {
    slides.value.push({
        id: Date.now(),
        title1: { en: '', ar: '' },
        title2: { en: '', ar: '' },
        subtitle: { en: '', ar: '' },
        buttonLabel: { en: '', ar: '' },
        image: '',
    })
}

const removeSlide = (id: number) => {
    if (slides.value.length === 1) return
    slides.value = slides.value.filter((s) => s.id !== id)
}

const addReview = () => {
    reviews.value.push({
        id: Date.now(),
        nameEn: '', nameAr: '', role: 'buyer', rating: 5,
        textEn: '', textAr: '', propertyEn: '', propertyAr: '',
        dateEn: '', dateAr: '', avatar: '',
    })
}

const removeReview = (id: number) => {
    reviews.value = reviews.value.filter((r) => r.id !== id)
}

const save = () => {
    showToast(locale.value === 'ar' ? 'تم حفظ محتوى الصفحة الرئيسية' : 'Homepage content saved')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const inputCls = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
const textareaCls = inputCls + ' resize-none'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'الصفحة الرئيسية' : 'Homepage' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'قم بتحرير أقسام ومحتوى الصفحة الرئيسية' : 'Edit the homepage sections and content' }}</p>
            </div>
            <button @click="save" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Save class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Section tabs -->
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

        <!-- Hero slides -->
        <div v-if="activeTab === 'hero'" class="space-y-4">
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">{{ locale === 'ar' ? 'تحرير شرائح القسم الرئيسي (العناوين، الوصف، الأزرار، الصور)' : 'Edit the hero slides (titles, descriptions, buttons, images)' }}</p>
                <button @click="addSlide" class="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer">
                    <Plus class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'إضافة شريحة' : 'Add Slide' }}
                </button>
            </div>

            <div
                v-for="(slide, i) in slides" :key="slide.id"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <span class="w-9 h-9 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? `شريحة ${i + 1}` : `Slide ${i + 1}` }}</h3>
                    </div>
                    <button @click="removeSlide(slide.id)" :disabled="slides.length === 1" class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" :title="locale === 'ar' ? 'حذف الشريحة' : 'Delete slide'">
                        <Trash2 class="w-4 h-4" />
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان 1' : 'Title 1' }}</label>
                            <div class="grid grid-cols-2 gap-3">
                                <input v-model="slide.title1.en" :placeholder="locale === 'ar' ? 'إنجليزي' : 'English'" :class="inputCls" />
                                <input v-model="slide.title1.ar" :placeholder="locale === 'ar' ? 'عربي' : 'Arabic'" :class="inputCls" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان 2' : 'Title 2' }}</label>
                            <div class="grid grid-cols-2 gap-3">
                                <input v-model="slide.title2.en" :placeholder="locale === 'ar' ? 'إنجليزي' : 'English'" :class="inputCls" />
                                <input v-model="slide.title2.ar" :placeholder="locale === 'ar' ? 'عربي' : 'Arabic'" :class="inputCls" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف' : 'Subtitle' }}</label>
                            <div class="grid grid-cols-2 gap-3">
                                <textarea v-model="slide.subtitle.en" rows="3" :class="textareaCls"></textarea>
                                <textarea v-model="slide.subtitle.ar" rows="3" :class="textareaCls"></textarea>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'زر الإجراء' : 'Button Label' }}</label>
                            <div class="grid grid-cols-2 gap-3">
                                <input v-model="slide.buttonLabel.en" :class="inputCls" />
                                <input v-model="slide.buttonLabel.ar" :class="inputCls" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <ImageUpload
                            v-model="slide.image"
                            :label="locale === 'ar' ? 'صورة الشريحة' : 'Slide Image'"
                            :hint="locale === 'ar' ? 'PNG / JPG / SVG' : 'PNG / JPG / SVG'"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Section editors -->
        <template v-else-if="activeTab === 'about'">
            <ContentSectionEditor :section="sectionByKey('about')" :icon="icons.about" />
        </template>
        <template v-else-if="activeTab === 'rooms'">
            <ContentSectionEditor :section="sectionByKey('rooms')" :icon="icons.rooms" />
        </template>
        <template v-else-if="activeTab === 'community'">
            <ContentSectionEditor :section="sectionByKey('community')" :icon="icons.community" />
        </template>
        <template v-else-if="activeTab === 'experience'">
            <ContentSectionEditor :section="sectionByKey('experience')" :icon="icons.experience" />
        </template>

        <!-- Testimonials -->
        <div v-else-if="activeTab === 'testimonials'" class="space-y-4">
            <ContentSectionEditor :section="sectionByKey('testimonials')" :icon="Star" />
            <div class="flex items-center justify-between">
                <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'بطاقات التقييمات' : 'Review Cards' }}</h3>
                <button @click="addReview" class="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer">
                    <Plus class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'إضافة تقييم' : 'Add Review' }}
                </button>
            </div>

            <div
                v-for="(r, i) in reviews" :key="r.id"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-sm font-bold text-gray-900 inline-flex items-center gap-2"><GripVertical class="w-4 h-4 text-gray-300" />{{ locale === 'ar' ? `تقييم ${i + 1}` : `Review ${i + 1}` }}</h4>
                    <button @click="removeReview(r.id)" class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف التقييم' : 'Delete review'">
                        <Trash2 class="w-4 h-4" />
                    </button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ImageUpload v-model="r.avatar" :label="locale === 'ar' ? 'الصورة الرمزية' : 'Avatar'" />
                    <div class="lg:col-span-2 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)' }}</label><input v-model="r.nameEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)' }}</label><input v-model="r.nameAr" :class="inputCls" /></div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الدور' : 'Role' }}</label>
                                <select v-model="r.role" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                                    <option value="buyer">{{ locale === 'ar' ? 'مشتري' : 'Buyer' }}</option>
                                    <option value="seller">{{ locale === 'ar' ? 'بائع' : 'Seller' }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التقييم' : 'Rating' }}</label>
                                <select v-model.number="r.rating" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                                    <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العقار (إنجليزي)' : 'Property (English)' }}</label><input v-model="r.propertyEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العقار (عربي)' : 'Property (Arabic)' }}</label><input v-model="r.propertyAr" :class="inputCls" /></div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'النص (إنجليزي)' : 'Review (English)' }}</label>
                            <textarea v-model="r.textEn" rows="2" :class="textareaCls"></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'النص (عربي)' : 'Review (Arabic)' }}</label>
                            <textarea v-model="r.textAr" rows="2" :class="textareaCls"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التاريخ (إنجليزي)' : 'Date (English)' }}</label><input v-model="r.dateEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التاريخ (عربي)' : 'Date (Arabic)' }}</label><input v-model="r.dateAr" :class="inputCls" /></div>
                        </div>
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