<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Plus, Building2, MapPin, BedDouble, Bath, Maximize,
    Eye, Pencil, Trash2, MoreHorizontal, CheckCircle2
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { properties as initialProperties, type Property, type PropertyStatus } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<PropertyStatus | 'all'>('all')
const typeFilter = ref('all')
const propertyList = ref<Property[]>([...initialProperties])

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

const form = ref({
    titleEn: '', titleAr: '', locationEn: '', locationAr: '', price: 0,
    bedrooms: 1, bathrooms: 1, area: 0, status: 'active' as PropertyStatus,
    typeEn: 'Apartment', typeAr: 'شقة',
})

const openAdd = () => {
    editing.value = null
    form.value = { titleEn: '', titleAr: '', locationEn: '', locationAr: '', price: 0, bedrooms: 1, bathrooms: 1, area: 0, status: 'active', typeEn: 'Apartment', typeAr: 'شقة' }
    modalOpen.value = true
}

const openEdit = (p: Property) => {
    editing.value = p
    form.value = {
        titleEn: p.titleEn, titleAr: p.titleAr, locationEn: p.locationEn, locationAr: p.locationAr,
        price: p.price, bedrooms: p.bedrooms, bathrooms: p.bathrooms, area: p.area,
        status: p.status, typeEn: p.typeEn, typeAr: p.typeAr,
    }
    modalOpen.value = true
}

const save = () => {
    if (editing.value) {
        const idx = propertyList.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) {
            propertyList.value[idx] = { ...propertyList.value[idx], ...form.value }
        }
        showToast(locale.value === 'ar' ? 'تم تحديث العقار بنجاح' : 'Property updated successfully')
    } else {
        propertyList.value.unshift({
            id: `new-${Date.now()}`,
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
            views: 0,
            listedAt: new Date().toISOString().slice(0, 10),
            negotiable: true,
            ...form.value,
        } as Property)
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
                    <option value="Apartment">{{ locale === 'ar' ? 'شقة' : 'Apartment' }}</option>
                    <option value="Villa">{{ locale === 'ar' ? 'فيلا' : 'Villa' }}</option>
                    <option value="Studio">{{ locale === 'ar' ? 'استوديو' : 'Studio' }}</option>
                    <option value="Chalet">{{ locale === 'ar' ? 'شاليه' : 'Chalet' }}</option>
                    <option value="Penthouse">{{ locale === 'ar' ? 'بنتهاوس' : 'Penthouse' }}</option>
                    <option value="Loft">{{ locale === 'ar' ? 'لوفت' : 'Loft' }}</option>
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
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-primary font-bold text-sm">{{ prop.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
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
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'30rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل العقار' : 'Edit Property') : (locale === 'ar' ? 'إضافة عقار' : 'Add Property') }}</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'العنوان (عربي)' : 'Title (English)' }}</label>
                            <input v-model="form.titleEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الموقع (عربي)' : 'Location (English)' }}</label>
                            <input v-model="form.locationEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'السعر (EGP)' : 'Price (EGP)' }}</label>
                            <input v-model.number="form.price" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</label>
                            <select v-model="form.status" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                                <option v-for="(m, s) in statusMeta" :key="s" :value="s">{{ locale === 'ar' ? m.ar : m.en }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'غرف نوم' : 'Bedrooms' }}</label>
                            <input v-model.number="form.bedrooms" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'حمامات' : 'Bathrooms' }}</label>
                            <input v-model.number="form.bathrooms" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'المساحة' : 'Area m²' }}</label>
                            <input v-model.number="form.area" type="number" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
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
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold">
                {{ toast }}
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