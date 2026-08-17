<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Plus, Building2, MapPin, BedDouble, Bath, Maximize,
    Eye, Pencil, Trash2, CheckCircle2, X, Video, Star
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import ImageUpload from '../../../../components/ImageUpload.vue'
import { properties as initialProperties, type Property, type PropertyStatus } from '../../../../data/ownerDashboard'
import { categories } from '../../../../data/categories'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<PropertyStatus | 'all'>('all')
const typeFilter = ref('all')
const propertyList = ref<Property[]>([...initialProperties])

const categoryOptions = categories.filter((c) => c.status === 'active')

const priceTypes = [
    { en: 'day', ar: 'يومياً' },
    { en: 'week', ar: 'أسبوعياً' },
    { en: 'month', ar: 'شهرياً' },
    { en: 'year', ar: 'سنوياً' },
]

const purposes = [
    { en: 'sale', ar: 'للبيع' },
    { en: 'rent', ar: 'للإيجار' },
]

const statusMeta: Record<PropertyStatus, { en: string; ar: string; cls: string }> = {
    active: { en: 'Active', ar: 'نشط', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'معلق', cls: 'bg-amber-50 text-amber-700' },
    sold: { en: 'Sold', ar: 'مباع', cls: 'bg-blue-50 text-blue-700' },
    inactive: { en: 'Inactive', ar: 'غير نشط', cls: 'bg-gray-100 text-gray-600' },
}

const filtered = computed(() =>
    propertyList.value.filter((p) => {
        const title = locale.value === 'ar' ? p.titleAr : p.titleEn
        const matchesSearch = title.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || p.status === statusFilter.value
        const matchesType = typeFilter.value === 'all' || (locale.value === 'ar' ? p.typeAr : p.typeEn) === typeFilter.value
        return matchesSearch && matchesStatus && matchesType
    })
)

const countBy = (s: PropertyStatus) => propertyList.value.filter((p) => p.status === s).length

// Modal state
const modalOpen = ref(false)
const editing = ref<Property | null>(null)
const deleting = ref<Property | null>(null)
const toast = ref('')
const newFeatureEn = ref('')
const newFeatureAr = ref('')

interface PropertyForm {
    titleEn: string; titleAr: string; locationEn: string; locationAr: string
    price: number; image: string; imageMain: string; images: string[]
    typeEn: string; typeAr: string
    purpose: 'sale' | 'rent'
    priceTypeEn: string; priceTypeAr: string
    bedrooms: number; bathrooms: number; area: number
    status: PropertyStatus; negotiable: boolean; rating: number
    descriptionEn: string; descriptionAr: string
    featuresEn: string[]; featuresAr: string[]
    bedTypeEn: string; bedTypeAr: string
    capacityEn: string; capacityAr: string
    bathTypeEn: string; bathTypeAr: string
    videoUrl: string
    listedAt: string
}

const emptyForm = (): PropertyForm => ({
    titleEn: '', titleAr: '', locationEn: '', locationAr: '', price: 0,
    image: '', imageMain: '', images: [], typeEn: 'Apartment', typeAr: 'شقة',
    purpose: 'sale',
    priceTypeEn: 'month', priceTypeAr: 'شهرياً',
    bedrooms: 1, bathrooms: 1, area: 0, status: 'active', negotiable: true, rating: 0,
    descriptionEn: '', descriptionAr: '', featuresEn: [], featuresAr: [],
    bedTypeEn: '', bedTypeAr: '', capacityEn: '', capacityAr: '',
    bathTypeEn: '', bathTypeAr: '', videoUrl: '',
    listedAt: new Date().toISOString().slice(0, 10),
})

const form = ref<PropertyForm>(emptyForm())

const openAdd = () => {
    editing.value = null
    form.value = emptyForm()
    modalOpen.value = true
}

const openEdit = (p: Property) => {
    editing.value = p
    form.value = {
        titleEn: p.titleEn, titleAr: p.titleAr, locationEn: p.locationEn, locationAr: p.locationAr,
        price: p.price, image: p.image, imageMain: p.imageMain ?? '', images: p.images ? [...p.images] : [],
        typeEn: p.typeEn, typeAr: p.typeAr,
        purpose: p.purpose ?? (p.priceTypeEn ? 'rent' : 'sale'),
        priceTypeEn: p.priceTypeEn ?? 'month', priceTypeAr: p.priceTypeAr ?? 'شهرياً',
        bedrooms: p.bedrooms, bathrooms: p.bathrooms, area: p.area,
        status: p.status, negotiable: p.negotiable, rating: p.rating ?? 0,
        descriptionEn: p.descriptionEn ?? '', descriptionAr: p.descriptionAr ?? '',
        featuresEn: p.featuresEn ? [...p.featuresEn] : [], featuresAr: p.featuresAr ? [...p.featuresAr] : [],
        bedTypeEn: p.bedTypeEn ?? '', bedTypeAr: p.bedTypeAr ?? '',
        capacityEn: p.capacityEn ?? '', capacityAr: p.capacityAr ?? '',
        bathTypeEn: p.bathTypeEn ?? '', bathTypeAr: p.bathTypeAr ?? '',
        videoUrl: p.videoUrl ?? '',
        listedAt: p.listedAt,
    }
    modalOpen.value = true
}

const selectCategory = (i: number) => {
    form.value.typeEn = categoryOptions[i].nameEn
    form.value.typeAr = categoryOptions[i].nameAr
}

const selectPriceType = (i: number) => {
    form.value.priceTypeEn = priceTypes[i].en
    form.value.priceTypeAr = priceTypes[i].ar
}

const addFeatureEn = () => {
    const v = newFeatureEn.value.trim()
    if (!v) return
    form.value.featuresEn.push(v)
    newFeatureEn.value = ''
}

const addFeatureAr = () => {
    const v = newFeatureAr.value.trim()
    if (!v) return
    form.value.featuresAr.push(v)
    newFeatureAr.value = ''
}

const addGalleryImage = () => {
    form.value.images.push('')
}

const removeGalleryImage = (i: number) => {
    form.value.images.splice(i, 1)
}

const save = () => {
    if (!form.value.titleEn.trim() || !form.value.titleAr.trim() || !form.value.price) {
        showToast(locale.value === 'ar' ? 'يرجى إدخال العنوان والسعر' : 'Please enter a title and price')
        return
    }
    if (form.value.purpose === 'sale') {
        form.value.priceTypeEn = ''
        form.value.priceTypeAr = ''
    }
    const payload: Property = {
        ...form.value,
        purpose: form.value.purpose,
        id: editing.value ? editing.value.id : `new-${Date.now()}`,
        image: form.value.image || form.value.imageMain || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
        views: editing.value?.views ?? 0,
        categoryEn: form.value.typeEn, categoryAr: form.value.typeAr,
    }
    if (editing.value) {
        const idx = propertyList.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) {
            propertyList.value[idx] = { ...propertyList.value[idx], ...payload }
        }
        showToast(locale.value === 'ar' ? 'تم تحديث العقار بنجاح' : 'Property updated successfully')
    } else {
        propertyList.value.unshift(payload)
        showToast(locale.value === 'ar' ? 'تمت إضافة العقار بنجاح' : 'Property added successfully')
    }
    modalOpen.value = false
}

const confirmDelete = () => {
    if (deleting.value) {
        propertyList.value = propertyList.value.filter((p) => p.id !== deleting.value!.id)
        showToast(locale.value === 'ar' ? 'تم حذف العقار' : 'Property deleted')
        deleting.value = null
    }
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const changeStatus = (p: Property, s: PropertyStatus) => {
    const idx = propertyList.value.findIndex((x) => x.id === p.id)
    if (idx !== -1) propertyList.value[idx] = { ...propertyList.value[idx], status: s }
}

const inputCls = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
</script>

<template>
    <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'إدارة العقارات' : 'Manage Properties' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'عقار' : 'properties' }}</p>
            </div>
            <button
                @click="openAdd"
                v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer"
            >
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة عقار' : 'Add Property' }}
            </button>
        </div>

        <!-- Filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'ابحث عن عقار...' : 'Search properties...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <div class="flex gap-3">
                <select v-model="statusFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                    <option value="all">{{ locale === 'ar' ? 'كل الحالات' : 'All Status' }}</option>
                    <option v-for="(m, s) in statusMeta" :key="s" :value="s">{{ locale === 'ar' ? m.ar : m.en }}</option>
                </select>
                <select v-model="typeFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                    <option value="all">{{ locale === 'ar' ? 'كل الأنواع' : 'All Types' }}</option>
                    <option v-for="c in categoryOptions" :key="c.id" :value="c.nameEn">{{ locale === 'ar' ? c.nameAr : c.nameEn }}</option>
                </select>
            </div>
        </div>

        <!-- Summary chips -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120 } }" class="flex flex-wrap gap-3">
            <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ propertyList.length }})
            </button>
            <button v-for="(m, s) in statusMeta" :key="s" @click="statusFilter = s"
                class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? m.ar : m.en }} ({{ countBy(s as PropertyStatus) }})
            </button>
        </div>

        <!-- List -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(prop, i) in filtered" :key="prop.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
                <div class="relative h-40 overflow-hidden">
                    <img :src="prop.image" :alt="locale === 'ar' ? prop.titleAr : prop.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm" :class="[statusMeta[prop.status].cls, locale === 'ar' ? 'right-3' : 'left-3']">
                        {{ locale === 'ar' ? statusMeta[prop.status].ar : statusMeta[prop.status].en }}
                    </span>
                    <div class="absolute bottom-3 flex gap-1.5" :class="locale === 'ar' ? 'left-3' : 'right-3'">
                        <button @click="changeStatus(prop, prop.status === 'active' ? 'inactive' : 'active')" class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-600 transition-colors cursor-pointer" :title="locale === 'ar' ? 'تفعيل/إيقاف' : 'Activate/Deactivate'">
                            <CheckCircle2 class="w-4 h-4" />
                        </button>
                        <button @click.stop="openEdit(prop)" class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-primary transition-colors cursor-pointer" :title="locale === 'ar' ? 'تعديل' : 'Edit'">
                            <Pencil class="w-4 h-4" />
                        </button>
                        <button @click.stop="deleting = prop" class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? prop.titleAr : prop.titleEn }}</div>
                    <div class="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? prop.locationAr : prop.locationEn }}
                    </div>
                    <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                        <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5" />{{ prop.bedrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5" />{{ prop.bathrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Maximize class="w-3.5 h-3.5" />{{ prop.area }}m²</span>
                        <span v-if="prop.rating" class="inline-flex items-center gap-1"><Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{{ prop.rating }}</span>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-primary font-bold text-sm">{{ prop.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}{{ (prop.purpose ?? 'rent') === 'rent' && (prop.priceTypeEn ?? '') ? ' / ' + (locale === 'ar' ? (prop.priceTypeAr ?? '') : (prop.priceTypeEn ?? '')) : '' }}</span></span>
                        <span class="text-xs text-gray-400 inline-flex items-center gap-1"><Eye class="w-3.5 h-3.5" />{{ prop.views }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <Building2 class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد عقارات مطابقة' : 'No matching properties' }}</p>
        </div>

        <!-- Add/Edit Modal -->
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'48rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل العقار' : 'Edit Property') : (locale === 'ar' ? 'إضافة عقار' : 'Add Property') }}</h3>
            </template>
            <template #body>
                <div class="space-y-6">
                    <!-- Images & Video -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'الصور والفيديو' : 'Images & Video' }}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ImageUpload v-model="form.image" :label="locale === 'ar' ? 'الصورة الرئيسية' : 'Main Image'" />
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'رابط الفيديو' : 'Video URL' }}</label>
                                <div class="relative">
                                    <Video class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                                    <input v-model="form.videoUrl" type="text" dir="ltr" placeholder="https://youtube.com/embed/..." :class="[inputCls, locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4']" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-semibold text-gray-700">{{ locale === 'ar' ? 'معرض الصور' : 'Image Gallery' }}</label>
                                <button @click="addGalleryImage" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary/5 text-primary rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors cursor-pointer">
                                    <Plus class="w-3 h-3" /> {{ locale === 'ar' ? 'إضافة صورة' : 'Add Image' }}
                                </button>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div v-for="(img, idx) in form.images" :key="idx" class="relative">
                                    <ImageUpload v-model="form.images[idx]" :label="locale === 'ar' ? `صورة ${idx + 1}` : `Image ${idx + 1}`" />
                                    <button @click="removeGalleryImage(idx)" class="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Remove'">
                                        <X class="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Basic info -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Information' }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)' }}</label><input v-model="form.titleEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)' }}</label><input v-model="form.titleAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الموقع (إنجليزي)' : 'Location (English)' }}</label><input v-model="form.locationEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الموقع (عربي)' : 'Location (Arabic)' }}</label><input v-model="form.locationAr" :class="inputCls" /></div>
                            <div class="col-span-2">
                                <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'التصنيف' : 'Category' }}</label>
                                <div class="flex gap-2 flex-wrap">
                                    <button v-for="(c, i) in categoryOptions" :key="c.id" @click="selectCategory(i)"
                                        class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                        :class="form.typeEn === c.nameEn ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:text-gray-700'">
                                        {{ locale === 'ar' ? c.nameAr : c.nameEn }}
                                    </button>
                                </div>
                            </div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'التقييم' : 'Rating' }}</label><input v-model.number="form.rating" type="number" min="0" max="5" step="0.1" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</label><select v-model="form.status" :class="[inputCls, 'cursor-pointer']"><option v-for="(m, s) in statusMeta" :key="s" :value="s">{{ locale === 'ar' ? m.ar : m.en }}</option></select></div>
                        </div>
                    </div>

                    <!-- Pricing -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'السعر والغرض' : 'Pricing & Purpose' }}</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'الغرض من العقار' : 'Property Purpose' }}</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <button v-for="p in purposes" :key="p.en" @click="form.purpose = p.en as 'sale' | 'rent'"
                                        class="px-3 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border"
                                        :class="form.purpose === p.en ? 'bg-primary text-white border-primary shadow-sm' : 'bg-gray-50 text-gray-500 border-gray-100 hover:text-gray-700'">
                                        {{ locale === 'ar' ? p.ar : p.en }}
                                    </button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div v-if="form.purpose === 'sale'">
                                    <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'سعر البيع (EGP)' : 'Property Price (EGP)' }}</label>
                                    <input v-model.number="form.price" type="number" :class="inputCls" />
                                </div>
                                <div v-else>
                                    <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'سعر الإيجار (EGP)' : 'Rental Price (EGP)' }}</label>
                                    <input v-model.number="form.price" type="number" :class="inputCls" />
                                </div>
                                <div v-if="form.purpose === 'rent'">
                                    <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'فترة الإيجار' : 'Rental Period' }}</label>
                                    <div class="flex gap-2 flex-wrap">
                                        <button v-for="(t, i) in priceTypes" :key="t.en" @click="selectPriceType(i)"
                                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                            :class="form.priceTypeEn === t.en ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:text-gray-700'">
                                            {{ locale === 'ar' ? t.ar : t.en }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <label class="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer">
                                <span class="text-xs font-semibold text-gray-700">{{ locale === 'ar' ? 'قابل للتفاوض' : 'Negotiable' }}</span>
                                <button type="button" @click="form.negotiable = !form.negotiable" class="relative w-11 h-6 rounded-full transition-colors cursor-pointer" :class="form.negotiable ? 'bg-primary' : 'bg-gray-200'">
                                    <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" :class="form.negotiable ? (locale === 'ar' ? 'left-0.5' : 'right-0.5') : (locale === 'ar' ? 'right-0.5' : 'left-0.5')"></span>
                                </button>
                            </label>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'الوصف' : 'Description' }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)' }}</label><textarea v-model="form.descriptionEn" rows="4" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)' }}</label><textarea v-model="form.descriptionAr" rows="4" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"></textarea></div>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'المميزات' : 'Features' }}</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المميزات (إنجليزي)' : 'Features (English)' }}</label>
                                <div class="flex gap-2 mb-2">
                                    <input v-model="newFeatureEn" @keyup.enter="addFeatureEn" :placeholder="locale === 'ar' ? 'أضف ميزة...' : 'Add a feature...'" :class="inputCls" />
                                    <button @click="addFeatureEn" class="px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer shrink-0"><Plus class="w-4 h-4" /></button>
                                </div>
                                <div class="flex gap-1.5 flex-wrap">
                                    <span v-for="(f, i) in form.featuresEn" :key="i" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[11px] font-bold">
                                        {{ f }}
                                        <button @click="form.featuresEn.splice(i, 1)" class="hover:text-red-500 transition-colors cursor-pointer"><X class="w-3 h-3" /></button>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المميزات (عربي)' : 'Features (Arabic)' }}</label>
                                <div class="flex gap-2 mb-2">
                                    <input v-model="newFeatureAr" @keyup.enter="addFeatureAr" :placeholder="locale === 'ar' ? 'أضف ميزة...' : 'Add a feature...'" :class="inputCls" />
                                    <button @click="addFeatureAr" class="px-3 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 text-xs font-bold transition-colors cursor-pointer shrink-0"><Plus class="w-4 h-4" /></button>
                                </div>
                                <div class="flex gap-1.5 flex-wrap">
                                    <span v-for="(f, i) in form.featuresAr" :key="i" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[11px] font-bold">
                                        {{ f }}
                                        <button @click="form.featuresAr.splice(i, 1)" class="hover:text-red-500 transition-colors cursor-pointer"><X class="w-3 h-3" /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Specs -->
                    <div class="border border-gray-100 rounded-xl p-4">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{{ locale === 'ar' ? 'المواصفات' : 'Specifications' }}</h4>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'غرف نوم' : 'Bedrooms' }}</label><input v-model.number="form.bedrooms" type="number" min="0" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'حمامات' : 'Bathrooms' }}</label><input v-model.number="form.bathrooms" type="number" min="0" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المساحة (m²)' : 'Area (m²)' }}</label><input v-model.number="form.area" type="number" min="0" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'تاريخ الإضافة' : 'Listed At' }}</label><input v-model="form.listedAt" type="date" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'نوع السرير (إنجليزي)' : 'Bed Type (English)' }}</label><input v-model="form.bedTypeEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'نوع السرير (عربي)' : 'Bed Type (Arabic)' }}</label><input v-model="form.bedTypeAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'السعة (إنجليزي)' : 'Capacity (English)' }}</label><input v-model="form.capacityEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'السعة (عربي)' : 'Capacity (Arabic)' }}</label><input v-model="form.capacityAr" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'نوع الحمام (إنجليزي)' : 'Bath Type (English)' }}</label><input v-model="form.bathTypeEn" :class="inputCls" /></div>
                            <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'نوع الحمام (عربي)' : 'Bath Type (Arabic)' }}</label><input v-model="form.bathTypeAr" :class="inputCls" /></div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="modalOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                    {{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}
                </button>
                <button @click="save" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">
                    {{ locale === 'ar' ? 'حفظ' : 'Save' }}
                </button>
            </template>
        </BaseModal>

        <!-- Delete confirm modal -->
        <BaseModal :open="!!deleting" @close="deleting = null" :max-width="'24rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion' }}</h3>
            </template>
            <template #body>
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                        <Trash2 class="w-5 h-5 text-red-500" />
                    </div>
                    <p class="text-sm text-gray-600">
                        {{ locale === 'ar' ? 'هل أنت متأكد من حذف هذا العقار؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete this property? This action cannot be undone.' }}
                    </p>
                </div>
            </template>
            <template #footer>
                <button @click="deleting = null" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                    {{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}
                </button>
                <button @click="confirmDelete" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">
                    {{ locale === 'ar' ? 'حذف' : 'Delete' }}
                </button>
            </template>
        </BaseModal>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
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