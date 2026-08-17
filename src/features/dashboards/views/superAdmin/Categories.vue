<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Plus, Pencil, Trash2, CheckCircle2, LayoutGrid
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { categories as initialCategories, type Category } from '../../../../data/categories'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<'all' | 'active' | 'inactive'>('all')
const list = ref<Category[]>([...initialCategories])
const modalOpen = ref(false)
const editing = ref<Category | null>(null)
const deleting = ref<Category | null>(null)
const toast = ref('')

const filtered = computed(() =>
    list.value.filter((c) => {
        const name = locale.value === 'ar' ? c.nameAr : c.nameEn
        const matchesSearch = name.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || c.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
)

const countBy = (s: 'active' | 'inactive') => list.value.filter((c) => c.status === s).length

const emptyForm = (): Category => ({
    id: '', nameEn: '', nameAr: '', status: 'active', properties: 0, createdAt: new Date().toISOString().slice(0, 10),
})

const form = ref<Category>(emptyForm())

const openAdd = () => {
    editing.value = null
    form.value = emptyForm()
    modalOpen.value = true
}

const openEdit = (c: Category) => {
    editing.value = c
    form.value = { ...c }
    modalOpen.value = true
}

const save = () => {
    if (!form.value.nameEn.trim() || !form.value.nameAr.trim()) {
        showToast(locale.value === 'ar' ? 'يرجى إدخال اسم التصنيف باللغتين' : 'Please enter the category name in both languages')
        return
    }
    if (editing.value) {
        const idx = list.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) list.value[idx] = { ...form.value, id: editing.value!.id }
        showToast(locale.value === 'ar' ? 'تم تحديث التصنيف بنجاح' : 'Category updated successfully')
    } else {
        list.value.unshift({ ...form.value, id: `cat-${Date.now()}` })
        showToast(locale.value === 'ar' ? 'تمت إضافة التصنيف بنجاح' : 'Category added successfully')
    }
    modalOpen.value = false
}

const confirmDelete = () => {
    if (deleting.value) {
        list.value = list.value.filter((c) => c.id !== deleting.value!.id)
        showToast(locale.value === 'ar' ? 'تم حذف التصنيف' : 'Category deleted')
        deleting.value = null
    }
}

const toggleStatus = (c: Category) => {
    const idx = list.value.findIndex((x) => x.id === c.id)
    if (idx !== -1) {
        list.value[idx] = { ...list.value[idx], status: c.status === 'active' ? 'inactive' : 'active' }
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'التصنيفات' : 'Categories' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'تصنيف' : 'categories' }}</p>
            </div>
            <button @click="openAdd" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة تصنيف' : 'Add Category' }}
            </button>
        </div>

        <!-- Info note -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 90 } }" class="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
            <LayoutGrid class="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p class="text-sm text-gray-600">
                {{ locale === 'ar'
                    ? 'ستظهر هذه التصنيفات لاحقاً في حقل اختيار التصنيف داخل نماذج إنشاء العقارات لكل من المشرف العام والمالك.'
                    : 'These categories will later populate the Category Select field inside the Property creation forms for both Super Admin and Owner.' }}
            </p>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input v-model="search" type="text" :placeholder="locale === 'ar' ? 'ابحث عن تصنيف...' : 'Search categories...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'" />
            </div>
            <select v-model="statusFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                <option value="all">{{ locale === 'ar' ? 'كل الحالات' : 'All Status' }}</option>
                <option value="active">{{ locale === 'ar' ? 'نشط' : 'Active' }}</option>
                <option value="inactive">{{ locale === 'ar' ? 'غير نشط' : 'Inactive' }}</option>
            </select>
        </div>

        <!-- Status chips -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120 } }" class="flex flex-wrap gap-3">
            <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ list.length }})
            </button>
            <button @click="statusFilter = 'active'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'active' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-100 hover:border-emerald-400/40'">
                {{ locale === 'ar' ? 'نشط' : 'Active' }} ({{ countBy('active') }})
            </button>
            <button @click="statusFilter = 'inactive'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'inactive' ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-400/40'">
                {{ locale === 'ar' ? 'غير نشط' : 'Inactive' }} ({{ countBy('inactive') }})
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(c, i) in filtered" :key="c.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <LayoutGrid class="w-5 h-5 text-primary" />
                        </div>
                        <div class="min-w-0">
                            <div class="font-bold text-gray-900 text-sm truncate">{{ locale === 'ar' ? c.nameAr : c.nameEn }}</div>
                            <div class="text-xs text-gray-400 mt-0.5 truncate">{{ locale === 'ar' ? c.nameEn : c.nameAr }}</div>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0"
                        :class="c.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'">
                        {{ c.status === 'active' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive') }}
                    </span>
                </div>
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div class="text-xs text-gray-500">
                        <span class="font-bold text-gray-800">{{ c.properties }}</span> {{ locale === 'ar' ? 'عقار' : 'properties' }}
                        <span class="mx-1.5 text-gray-200">|</span>
                        <span>{{ c.createdAt }}</span>
                    </div>
                    <div class="flex gap-1.5">
                        <button @click="toggleStatus(c)" class="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors cursor-pointer" :title="c.status === 'active' ? (locale === 'ar' ? 'إيقاف' : 'Deactivate') : (locale === 'ar' ? 'تفعيل' : 'Activate')">
                            <CheckCircle2 class="w-4 h-4" />
                        </button>
                        <button @click="openEdit(c)" class="p-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer" :title="locale === 'ar' ? 'تعديل' : 'Edit'"><Pencil class="w-4 h-4" /></button>
                        <button @click="deleting = c" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <LayoutGrid class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد تصنيفات مطابقة' : 'No matching categories' }}</p>
        </div>

        <!-- Add/Edit modal -->
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'28rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل التصنيف' : 'Edit Category') : (locale === 'ar' ? 'إضافة تصنيف' : 'Add Category') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)' }}</label><input v-model="form.nameEn" :class="inputCls" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)' }}</label><input v-model="form.nameAr" :class="inputCls" /></div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</label>
                        <select v-model="form.status" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                            <option value="active">{{ locale === 'ar' ? 'نشط' : 'Active' }}</option>
                            <option value="inactive">{{ locale === 'ar' ? 'غير نشط' : 'Inactive' }}</option>
                        </select>
                    </div>
                    <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-400 leading-relaxed">
                        {{ locale === 'ar'
                            ? 'عدد العقارات المرتبطة وتاريخ الإنشاء يُنشآن تلقائياً من النظام ولن يتم تحريرهما يدوياً.'
                            : 'The linked properties count and creation date are generated automatically by the system and are not edited manually.' }}
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="modalOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="save" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حفظ' : 'Save' }}</button>
            </template>
        </BaseModal>

        <!-- Delete modal -->
        <BaseModal :open="!!deleting" @close="deleting = null" :max-width="'24rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion' }}</h3></template>
            <template #body>
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><Trash2 class="w-5 h-5 text-red-500" /></div>
                    <p class="text-sm text-gray-600">{{ locale === 'ar' ? 'هل أنت متأكد من حذف هذا التصنيف؟' : 'Are you sure you want to delete this category?' }}</p>
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
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>