<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Newspaper, Plus, Pencil, Trash2, Calendar, User, CheckCircle2,
    MessageSquare, X, ImagePlus
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import ImageUpload from '../../../../components/ImageUpload.vue'
import ContentSectionEditor from '../../components/ContentSectionEditor.vue'
import { blogPosts, type BlogPost, type BlogPostListItem } from '../../../../data/blogPosts'
import { blogPageSections } from '../../../../data/blogPageContent'
import type { EditableSection } from '../../../../data/contentTypes'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const activeTab = ref('posts')

const tabs = [
    { key: 'posts', labelEn: 'Posts', labelAr: 'المقالات' },
    { key: 'content', labelEn: 'Page Content', labelAr: 'محتوى الصفحة' },
]

const pageSections = ref<EditableSection[]>(clone(blogPageSections))

const search = ref('')
const list = ref<BlogPost[]>([...blogPosts])
const modalOpen = ref(false)
const editing = ref<BlogPost | null>(null)
const deleting = ref<BlogPost | null>(null)
const previewing = ref<BlogPost | null>(null)
const toast = ref('')

const mockComments = [
    { nameEn: 'Mohamed Hassan', nameAr: 'محمد حسن', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100', date: '2026-08-10', textEn: 'Great article, very informative!', textAr: 'مقال رائع ومفيد جداً!' },
    { nameEn: 'Layla Ibrahim', nameAr: 'ليلى إبراهيم', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', date: '2026-08-11', textEn: 'Thanks for sharing these tips.', textAr: 'شكراً لمشاركة هذه النصائح.' },
    { nameEn: 'Omar Farouk', nameAr: 'عمر فاروق', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', date: '2026-08-12', textEn: 'Looking forward to the next post!', textAr: 'نتطلع للمقال القادم!' },
]

const emptyListItem = (): BlogPostListItem => ({ titleEn: '', titleAr: '', descEn: '', descAr: '' })

const emptyForm = (): BlogPost => ({
    id: Date.now(), titleEn: '', titleAr: '', excerptEn: '', excerptAr: '',
    descriptionEn: '', descriptionAr: '', list: [], additionalImages: [],
    date: new Date().toISOString().slice(0, 10), dateAr: '', authorEn: 'Admin', authorAr: 'إدارة',
    image: '', categoryEn: 'Blog', categoryAr: 'مدونة', readTimeEn: '5 min read', readTimeAr: '5 دقائق قراءة',
})

const form = ref<BlogPost>(emptyForm())

const filtered = computed(() =>
    list.value.filter((p) => {
        const title = locale.value === 'ar' ? p.titleAr : p.titleEn
        return title.toLowerCase().includes(search.value.toLowerCase())
    })
)

const openAdd = () => {
    editing.value = null
    form.value = emptyForm()
    modalOpen.value = true
}

const openEdit = (p: BlogPost) => {
    editing.value = p
    form.value = JSON.parse(JSON.stringify(p)) as BlogPost
    modalOpen.value = true
}

const addListItem = () => {
    form.value.list!.push(emptyListItem())
}

const removeListItem = (i: number) => {
    form.value.list!.splice(i, 1)
}

const addImage = () => {
    form.value.additionalImages!.push('')
}

const removeImage = (i: number) => {
    form.value.additionalImages!.splice(i, 1)
}

const save = () => {
    if (!form.value.titleEn.trim() || !form.value.titleAr.trim()) {
        showToast(locale.value === 'ar' ? 'يرجى إدخال عنوان المقال' : 'Please enter a post title')
        return
    }
    if (editing.value) {
        const idx = list.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) list.value[idx] = { ...form.value, id: editing.value!.id }
        showToast(locale.value === 'ar' ? 'تم تحديث المقال بنجاح' : 'Post updated successfully')
    } else {
        list.value.unshift({ ...form.value, id: Date.now() })
        showToast(locale.value === 'ar' ? 'تمت إضافة المقال بنجاح' : 'Post added successfully')
    }
    modalOpen.value = false
}

const confirmDelete = () => {
    if (deleting.value) {
        list.value = list.value.filter((p) => p.id !== deleting.value!.id)
        showToast(locale.value === 'ar' ? 'تم حذف المقال' : 'Post deleted')
        deleting.value = null
    }
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const inputCls = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المدونة' : 'Blog' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'مقال' : 'posts' }}</p>
            </div>
            <button v-if="activeTab === 'posts'" @click="openAdd" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة مقال' : 'Add Post' }}
            </button>
        </div>

        <!-- Section tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 90 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit flex-wrap">
            <button
                v-for="t in tabs" :key="t.key"
                @click="activeTab = t.key"
                class="px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer"
                :class="activeTab === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
            </button>
        </div>

        <template v-if="activeTab === 'posts'">
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="relative max-w-sm">
            <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
            <input v-model="search" type="text" :placeholder="locale === 'ar' ? 'ابحث عن مقال...' : 'Search posts...'"
                class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(p, i) in filtered" :key="p.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div class="relative h-36 overflow-hidden">
                    <img v-if="p.image" :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400"><Newspaper class="w-10 h-10 opacity-40" /></div>
                    <span class="absolute top-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-[11px] font-bold shadow-sm" :class="locale === 'ar' ? 'right-3' : 'left-3'">{{ locale === 'ar' ? p.categoryAr : p.categoryEn }}</span>
                </div>
                <div class="p-4">
                    <div class="font-bold text-sm text-gray-900 line-clamp-2">{{ locale === 'ar' ? p.titleAr : p.titleEn }}</div>
                    <div class="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                        <span class="inline-flex items-center gap-1"><User class="w-3 h-3" />{{ locale === 'ar' ? p.authorAr : p.authorEn }}</span>
                        <span class="inline-flex items-center gap-1"><Calendar class="w-3 h-3" />{{ locale === 'ar' ? p.dateAr : p.date }}</span>
                        <span class="inline-flex items-center gap-1"><MessageSquare class="w-3 h-3" />{{ mockComments.length }}</span>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end gap-1.5">
                        <button @click="previewing = p" class="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'التعليقات' : 'Comments'"><MessageSquare class="w-4 h-4" /></button>
                        <button @click="openEdit(p)" class="p-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer" :title="locale === 'ar' ? 'تعديل' : 'Edit'"><Pencil class="w-4 h-4" /></button>
                        <button @click="deleting = p" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <Newspaper class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد مقالات مطابقة' : 'No matching posts' }}</p>
        </div>
        </template>

        <!-- Page content (static) -->
        <div v-else class="space-y-5">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
                <Newspaper class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p class="text-sm text-gray-600">
                    {{ locale === 'ar'
                        ? 'يتم إدارة المقالات نفسها من تبويب المقالات. هنا يمكنك تحرير النصوص الثابتة الخاصة بصفحة المدونة العامة.'
                        : 'Posts themselves are managed in the Posts tab. Here you can edit the static text of the public blog page.' }}
                </p>
            </div>
            <ContentSectionEditor
                v-for="(section, i) in pageSections"
                :key="section.key"
                :section="section"
                :icon="Newspaper"
                v-motion
                :initial="{ opacity: 0, y: 16 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 + i * 60 } }"
            />
        </div>

        <!-- Add/Edit modal -->
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'48rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل المقال' : 'Edit Post') : (locale === 'ar' ? 'إضافة مقال' : 'Add Post') }}</h3></template>
            <template #body>
                <div class="space-y-6">
                    <!-- Basic -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Information' }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)' }}</label><input v-model="form.titleEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)' }}</label><input v-model="form.titleAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التصنيف (إنجليزي)' : 'Category (English)' }}</label><input v-model="form.categoryEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التصنيف (عربي)' : 'Category (Arabic)' }}</label><input v-model="form.categoryAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التاريخ (إنجليزي)' : 'Date (English)' }}</label><input v-model="form.date" type="date" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التاريخ (عربي)' : 'Date (Arabic)' }}</label><input v-model="form.dateAr" :placeholder="locale === 'ar' ? 'مثال: 15 مارس 2024' : 'e.g. March 15, 2024'" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الكاتب (إنجليزي)' : 'Author (English)' }}</label><input v-model="form.authorEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الكاتب (عربي)' : 'Author (Arabic)' }}</label><input v-model="form.authorAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'وقت القراءة (إنجليزي)' : 'Read Time (English)' }}</label><input v-model="form.readTimeEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'وقت القراءة (عربي)' : 'Read Time (Arabic)' }}</label><input v-model="form.readTimeAr" :class="inputCls" /></div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'الصور' : 'Images' }}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ImageUpload v-model="form.image" :label="locale === 'ar' ? 'صورة المقال الرئيسية' : 'Post Hero Image'" />
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <label class="block text-xs font-semibold text-gray-700">{{ locale === 'ar' ? 'صور إضافية داخل المقال' : 'Additional Inline Images' }}</label>
                                    <button @click="addImage" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary/5 text-primary rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors cursor-pointer">
                                        <ImagePlus class="w-3 h-3" /> {{ locale === 'ar' ? 'إضافة' : 'Add' }}
                                    </button>
                                </div>
                                <div class="space-y-3">
                                    <div v-for="(img, idx) in form.additionalImages ?? []" :key="idx" class="relative">
                                        <ImageUpload v-model="form.additionalImages![idx]" :label="locale === 'ar' ? `صورة ${idx + 1}` : `Image ${idx + 1}`" />
                                        <button @click="removeImage(idx)" class="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Remove'">
                                            <X class="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'المحتوى' : 'Content' }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المقتطف (إنجليزي)' : 'Excerpt (English)' }}</label><textarea v-model="form.excerptEn" rows="3" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المقتطف (عربي)' : 'Excerpt (Arabic)' }}</label><textarea v-model="form.excerptAr" rows="3" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                            <div class="col-span-2"><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف الكامل (إنجليزي) — استخدم سطراً جديداً لفصل الفقرات' : 'Full Description (English) — newline separates paragraphs' }}</label><textarea v-model="form.descriptionEn" rows="6" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                            <div class="col-span-2"><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف الكامل (عربي) — استخدم سطراً جديداً لفصل الفقرات' : 'Full Description (Arabic) — newline separates paragraphs' }}</label><textarea v-model="form.descriptionAr" rows="6" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                        </div>
                    </div>

                    <!-- List items -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400">{{ locale === 'ar' ? 'العناصر المدرجة' : 'List Items' }}</h4>
                            <button @click="addListItem" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary/5 text-primary rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors cursor-pointer">
                                <Plus class="w-3 h-3" /> {{ locale === 'ar' ? 'إضافة عنصر' : 'Add Item' }}
                            </button>
                        </div>
                        <div v-if="!form.list || form.list.length === 0" class="text-center py-6 text-gray-300 text-sm">
                            {{ locale === 'ar' ? 'لا توجد عناصر — يمكن إضافتها اختيارياً' : 'No items — optional' }}
                        </div>
                        <div v-for="(item, idx) in form.list" :key="idx" class="mb-4 border border-gray-100 rounded-xl p-4">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-xs font-bold text-gray-500">{{ locale === 'ar' ? `عنصر ${idx + 1}` : `Item ${idx + 1}` }}</span>
                                <button @click="removeListItem(idx)" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Remove'"><Trash2 class="w-3.5 h-3.5" /></button>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)' }}</label><input v-model="item.titleEn" :class="inputCls" /></div>
                                <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)' }}</label><input v-model="item.titleAr" :class="inputCls" /></div>
                                <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)' }}</label><textarea v-model="item.descEn" rows="2" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                                <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)' }}</label><textarea v-model="item.descAr" rows="2" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="modalOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="save" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حفظ' : 'Save' }}</button>
            </template>
        </BaseModal>

        <!-- Comments preview (UI-only mock) -->
        <BaseModal :open="!!previewing" @close="previewing = null" :max-width="'30rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare class="w-5 h-5 text-primary" /> {{ locale === 'ar' ? 'التعليقات' : 'Comments' }}
                    <span class="text-xs font-normal text-gray-400">{{ locale === 'ar' ? '(معاينة واجهة فقط)' : '(UI preview only)' }}</span>
                </h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div class="p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <p class="text-sm text-gray-600 line-clamp-2">{{ previewing ? (locale === 'ar' ? previewing.excerptAr : previewing.excerptEn) : '' }}</p>
                    </div>
                    <div v-for="(c, i) in mockComments" :key="i" class="flex gap-3 p-3 rounded-xl border border-gray-100">
                        <img :src="c.avatar" alt="" class="w-9 h-9 rounded-full object-cover shrink-0" />
                        <div class="min-w-0">
                            <div class="flex items-center justify-between gap-3">
                                <span class="text-sm font-bold text-gray-800">{{ locale === 'ar' ? c.nameAr : c.nameEn }}</span>
                                <span class="text-[11px] text-gray-400">{{ c.date }}</span>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">{{ locale === 'ar' ? c.textAr : c.textEn }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="previewing = null" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إغلاق' : 'Close' }}</button>
            </template>
        </BaseModal>

        <!-- Delete modal -->
        <BaseModal :open="!!deleting" @close="deleting = null" :max-width="'24rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion' }}</h3></template>
            <template #body>
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><Trash2 class="w-5 h-5 text-red-500" /></div>
                    <p class="text-sm text-gray-600">{{ locale === 'ar' ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this post?' }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="deleting = null" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="confirmDelete" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
            </template>
        </BaseModal>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}</div>
        </Transition>
    </div>
</template>

<style scoped>
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>