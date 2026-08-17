<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, MapPin, BedDouble, Bath, Maximize, Heart,
    MessageSquare, Building2, CheckCircle2
} from 'lucide-vue-next'
import { products } from '../../../../data/products'

const { locale } = useI18n()

const search = ref('')
const priceFilter = ref('all')
const saved = ref<Set<string>>(new Set(['2']))
const toast = ref('')

const priceRanges = [
    { value: 'all', min: 0, max: Infinity, en: 'All Prices', ar: 'كل الأسعار' },
    { value: 'under1500', min: 0, max: 1500, en: 'Under 1,500 EGP', ar: 'أقل من 1,500 ج.م' },
    { value: '1500to3000', min: 1500, max: 3000, en: '1,500 – 3,000 EGP', ar: '1,500 – 3,000 ج.م' },
    { value: 'over3000', min: 3000, max: Infinity, en: 'Over 3,000 EGP', ar: 'أكثر من 3,000 ج.م' },
]

const filtered = computed(() =>
    products.filter((p) => {
        const title = locale.value === 'ar' ? p.titleAr : p.titleEn
        const location = locale.value === 'ar' ? p.locationAr : p.locationEn
        const matchesSearch = (title + ' ' + location).toLowerCase().includes(search.value.toLowerCase())
        const range = priceRanges.find((r) => r.value === priceFilter.value)!
        const matchesPrice = p.price >= range.min && p.price <= range.max
        return matchesSearch && matchesPrice
    })
)

const toggleSave = (id: string) => {
    if (saved.value.has(id)) {
        saved.value.delete(id)
        saved.value = new Set(saved.value)
    } else {
        saved.value.add(id)
        saved.value = new Set(saved.value)
    }
}

const startConversation = (p: (typeof products)[number]) => {
    const name = locale.value === 'ar' ? p.titleAr : p.titleEn
    showToast(locale.value === 'ar' ? `تم إرسال طلب محادثة بخصوص "${name}"` : `Chat request sent for "${name}"`)
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'استكشاف العقارات' : 'Explore Properties' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'عقار متاح' : 'available properties' }}</p>
            </div>
        </div>

        <!-- Filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'ابحث عن عقار أو موقع...' : 'Search by property or location...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <div class="flex gap-3 flex-wrap">
                <select v-model="priceFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                    <option v-for="r in priceRanges" :key="r.value" :value="r.value">{{ locale === 'ar' ? r.ar : r.en }}</option>
                </select>
            </div>
        </div>

        <!-- List -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(p, i) in filtered" :key="p.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
            >
                <div class="relative h-40 overflow-hidden">
                    <img :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                        @click="toggleSave(p.id)"
                        class="absolute top-3 p-1.5 rounded-lg bg-white/90 hover:bg-white transition-colors cursor-pointer"
                        :class="[saved.has(p.id) ? 'text-red-500' : 'text-gray-500', locale === 'ar' ? 'left-3' : 'right-3']"
                        :title="locale === 'ar' ? (saved.has(p.id) ? 'إزالة من المحفوظات' : 'حفظ العقار') : (saved.has(p.id) ? 'Remove from saved' : 'Save property')"
                    >
                        <Heart class="w-4 h-4" :class="saved.has(p.id) ? 'fill-red-500' : ''" />
                    </button>
                    <span class="absolute bottom-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-[11px] font-bold shadow-sm" :class="locale === 'ar' ? 'right-3' : 'left-3'">
                        {{ (p.rating ?? 0).toFixed(1) }} ★
                    </span>
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? p.titleAr : p.titleEn }}</div>
                    <div class="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? p.locationAr : p.locationEn }}
                    </div>
                    <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                        <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5" />{{ p.bedrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5" />{{ p.bathrooms }}</span>
                        <span class="inline-flex items-center gap-1"><Maximize class="w-3.5 h-3.5" />{{ p.area }}m²</span>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-primary font-bold text-sm">{{ p.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }} / {{ locale === 'ar' ? p.priceTypeAr : p.priceTypeEn }}</span></span>
                    </div>
                    <button
                        @click="startConversation(p)"
                        class="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-semibold cursor-pointer active:scale-[0.98]"
                    >
                        <MessageSquare class="w-4 h-4" />
                        {{ locale === 'ar' ? 'ابدأ محادثة' : 'Start Conversation' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <Building2 class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد عقارات مطابقة' : 'No matching properties' }}</p>
        </div>

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