<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Package, Plus, Pencil, Trash2, MapPin, BedDouble,
    Bath, CheckCircle2
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { products, type Product } from '../../../../data/products'

const { locale } = useI18n()

const search = ref('')
const list = ref<Product[]>([...products])
const modalOpen = ref(false)
const editing = ref<Product | null>(null)
const deleting = ref<Product | null>(null)
const toast = ref('')

const form = ref({ titleEn: '', titleAr: '', price: 0, bedrooms: 1, bathrooms: 1, area: 0 })

const filtered = computed(() =>
    list.value.filter((p) => {
        const title = locale.value === 'ar' ? p.titleAr : p.titleEn
        return title.toLowerCase().includes(search.value.toLowerCase())
    })
)

const openAdd = () => {
    editing.value = null
    form.value = { titleEn: '', titleAr: '', price: 0, bedrooms: 1, bathrooms: 1, area: 0 }
    modalOpen.value = true
}

const openEdit = (p: Product) => {
    editing.value = p
    form.value = { titleEn: p.titleEn, titleAr: p.titleAr, price: p.price, bedrooms: p.bedrooms, bathrooms: p.bathrooms, area: p.area }
    modalOpen.value = true
}

const save = () => {
    if (editing.value) {
        const idx = list.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) list.value[idx] = { ...list.value[idx], ...form.value }
        showToast(locale.value === 'ar' ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully')
    } else {
        list.value.unshift({ id: `p-${Date.now()}`, image: '', imageMain: '', images: [], ...form.value, createdAt: '', videoUrl: '', latitude: 0, longitude: 0, rating: 0, negotiable: true, locationEn: '', locationAr: '', descriptionEn: '', descriptionAr: '', featuresEn: [], featuresAr: [], bedTypeEn: '', bedTypeAr: '', capacityEn: '', capacityAr: '', bathTypeEn: '', bathTypeAr: '', imagesCount: 0, currentImageIndex: 0, priceTypeEn: 'month', priceTypeAr: 'شهرياً' } as unknown as Product)
        showToast(locale.value === 'ar' ? 'تمت إضافة المنتج بنجاح' : 'Product added successfully')
    }
    modalOpen.value = false
}

const confirmDelete = () => {
    if (deleting.value) {
        list.value = list.value.filter((p) => p.id !== deleting.value!.id)
        showToast(locale.value === 'ar' ? 'تم حذف المنتج' : 'Product deleted')
        deleting.value = null
    }
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المنتجات' : 'Products' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'منتج' : 'products' }}</p>
            </div>
            <button @click="openAdd" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة منتج' : 'Add Product' }}
            </button>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="relative max-w-sm">
            <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
            <input v-model="search" type="text" :placeholder="locale === 'ar' ? 'ابحث عن منتج...' : 'Search products...'"
                class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(p, i) in filtered" :key="p.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div class="relative h-40 overflow-hidden">
                    <img v-if="p.image" :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400"><Package class="w-10 h-10 opacity-40" /></div>
                </div>
                <div class="p-4">
                    <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? p.titleAr : p.titleEn }}</div>
                    <div class="flex items-center gap-1 text-xs text-gray-400 mt-1"><MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? p.locationAr : p.locationEn }}</div>
                    <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                        <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5" />{{ p.bedrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5" />{{ p.bathrooms }}</span>
                        <span class="inline-flex items-center gap-1">{{ p.area }}m²</span>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-primary font-bold text-sm">{{ p.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
                        <div class="flex gap-1.5">
                            <button @click="openEdit(p)" class="p-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer" :title="locale === 'ar' ? 'تعديل' : 'Edit'"><Pencil class="w-4 h-4" /></button>
                            <button @click="deleting = p" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <Package class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد منتجات مطابقة' : 'No matching products' }}</p>
        </div>

        <!-- Add/Edit modal -->
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'30rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل المنتج' : 'Edit Product') : (locale === 'ar' ? 'إضافة منتج' : 'Add Product') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (English)' }}</label><input v-model="form.titleEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (Arabic)' }}</label><input v-model="form.titleAr" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'السعر (EGP)' : 'Price (EGP)' }}</label><input v-model.number="form.price" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المساحة' : 'Area m²' }}</label><input v-model.number="form.area" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'غرف نوم' : 'Bedrooms' }}</label><input v-model.number="form.bedrooms" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'حمامات' : 'Bathrooms' }}</label><input v-model.number="form.bathrooms" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
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
                    <p class="text-sm text-gray-600">{{ locale === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?' }}</p>
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
.line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>