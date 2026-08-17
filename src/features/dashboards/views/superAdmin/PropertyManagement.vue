<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Building2, MapPin, BedDouble, Bath, Maximize, Check, X, CheckCircle2
} from 'lucide-vue-next'
import { properties, type Property, type PropertyStatus } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const list = ref<Property[]>([...properties])
const filter = ref<PropertyStatus | 'all'>('pending')
const toast = ref('')

// Review queue; treat pending + inactive as requiring approval
const pendingList = () => list.value.filter((p) => p.status === 'pending' || p.status === 'inactive')

const filtered = () => {
    if (filter.value === 'all') return list.value
    return list.value.filter((p) => p.status === filter.value)
}

const tabs = [
    { key: 'pending' as const, labelEn: 'Pending Review', labelAr: 'قيد المراجعة' },
    { key: 'active' as const, labelEn: 'Approved', labelAr: 'معتمد' },
    { key: 'inactive' as const, labelEn: 'Inactive', labelAr: 'غير نشط' },
    { key: 'all' as const, labelEn: 'All', labelAr: 'الكل' },
]

const statusMeta: Record<PropertyStatus, { en: string; ar: string; cls: string }> = {
    active: { en: 'Approved', ar: 'معتمد', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending Review', ar: 'قيد المراجعة', cls: 'bg-amber-50 text-amber-700' },
    sold: { en: 'Sold', ar: 'مباع', cls: 'bg-blue-50 text-blue-700' },
    inactive: { en: 'Inactive', ar: 'غير نشط', cls: 'bg-gray-100 text-gray-600' },
}

const approve = (p: Property) => {
    const idx = list.value.findIndex((x) => x.id === p.id)
    if (idx !== -1) list.value[idx] = { ...list.value[idx], status: 'active' }
    showToast(locale.value === 'ar' ? 'تمت الموافقة على العقار' : 'Property approved')
}

const reject = (p: Property) => {
    const idx = list.value.findIndex((x) => x.id === p.id)
    if (idx !== -1) list.value[idx] = { ...list.value[idx], status: 'inactive' }
    showToast(locale.value === 'ar' ? 'تم رفض العقار' : 'Property rejected')
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'إدارة العقارات' : 'Property Management' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ pendingList().length }} {{ locale === 'ar' ? 'عقار بانتظار المراجعة' : 'properties pending review' }}</p>
        </div>

        <!-- Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit flex-wrap">
            <button v-for="t in tabs" :key="t.key" @click="filter = t.key"
                class="px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer"
                :class="filter === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
            </button>
        </div>

        <!-- List -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(p, i) in filtered()" :key="p.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div class="relative h-40 overflow-hidden">
                    <img :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span class="absolute top-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm" :class="[statusMeta[p.status].cls, locale === 'ar' ? 'right-3' : 'left-3']">
                        {{ locale === 'ar' ? statusMeta[p.status].ar : statusMeta[p.status].en }}
                    </span>
                </div>
                <div class="p-4">
                    <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? p.titleAr : p.titleEn }}</div>
                    <div class="flex items-center gap-1 text-xs text-gray-400 mt-1"><MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? p.locationAr : p.locationEn }}</div>
                    <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                        <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5" />{{ p.bedrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5" />{{ p.bathrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Maximize class="w-3.5 h-3.5" />{{ p.area }}m²</span>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-primary font-bold text-sm">{{ p.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
                        <div v-if="p.status === 'pending' || p.status === 'inactive'" class="flex gap-2">
                            <button @click="approve(p)" class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-xs font-bold cursor-pointer"><Check class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'موافقة' : 'Approve' }}</button>
                            <button @click="reject(p)" class="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs font-bold cursor-pointer"><X class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'رفض' : 'Reject' }}</button>
                        </div>
                        <span v-else class="text-xs text-gray-400 inline-flex items-center gap-1"><CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />{{ locale === 'ar' ? 'تمت المراجعة' : 'Reviewed' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filtered().length === 0" class="text-center py-16 text-gray-400">
            <Building2 class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد عقارات' : 'No properties' }}</p>
        </div>

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