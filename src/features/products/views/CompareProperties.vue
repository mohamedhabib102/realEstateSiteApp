<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, type Product } from '../../../data/products'
import { 
    Scale, ArrowLeftRight, Check, X, Star, MapPin, Bed, Bath, Square, 
    Users, Video, Eye, Sparkles, Building2
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

// Default to first two unique products
const propId1 = ref<string>(products[0]?.id ?? '')
const propId2 = ref<string>(products[1]?.id ?? '')

// Read from query params on mount ONLY
onMounted(() => {
    if (route.query.p1 && typeof route.query.p1 === 'string') {
        const found = products.find(p => p.id === route.query.p1)
        if (found) propId1.value = found.id
    }
    if (route.query.p2 && typeof route.query.p2 === 'string') {
        const found = products.find(p => p.id === route.query.p2)
        if (found) propId2.value = found.id
    }
})

const propertyA = computed<Product | undefined>(() =>
    products.find(p => p.id === propId1.value) ?? products[0]
)
const propertyB = computed<Product | undefined>(() =>
    products.find(p => p.id === propId2.value) ?? products[1]
)

const swapProperties = () => {
    const tmp = propId1.value
    propId1.value = propId2.value
    propId2.value = tmp
}

// Unique features union of A + B
const allUniqueFeatures = computed(() => {
    if (!propertyA.value || !propertyB.value) return []
    const isAr = locale.value === 'ar'
    const featsA = isAr ? propertyA.value.featuresAr : propertyA.value.featuresEn
    const featsB = isAr ? propertyB.value.featuresAr : propertyB.value.featuresEn
    return Array.from(new Set([...featsA, ...featsB]))
})

const hasFeature = (product: Product | undefined, feature: string) => {
    if (!product) return false
    const isAr = locale.value === 'ar'
    const list = isAr ? product.featuresAr : product.featuresEn
    return list.includes(feature)
}

const goToProduct = (id: string) => router.push(`/${locale.value}/products/${id}`)

// Comparison rows config
const specRows = computed(() => [
    {
        key: 'price',
        labelAr: 'السعر',
        labelEn: 'Price',
        renderA: () => `${propertyA.value?.price.toLocaleString(locale.value === 'ar' ? 'ar-EG' : 'en-US')} ${locale.value === 'ar' ? 'ج.م' : 'EGP'}${propertyA.value && (propertyA.value.purpose ?? 'rent') === 'rent' && propertyA.value.priceTypeEn ? (locale.value === 'ar' ? ' / ' + propertyA.value.priceTypeAr : ' / ' + propertyA.value.priceTypeEn) : ''}`,
        renderB: () => `${propertyB.value?.price.toLocaleString(locale.value === 'ar' ? 'ar-EG' : 'en-US')} ${locale.value === 'ar' ? 'ج.م' : 'EGP'}${propertyB.value && (propertyB.value.purpose ?? 'rent') === 'rent' && propertyB.value.priceTypeEn ? (locale.value === 'ar' ? ' / ' + propertyB.value.priceTypeAr : ' / ' + propertyB.value.priceTypeEn) : ''}`,
        highlightA: () => (propertyA.value?.price ?? 0) <= (propertyB.value?.price ?? 0),
        highlightB: () => (propertyB.value?.price ?? 0) <= (propertyA.value?.price ?? 0),
    },
    {
        key: 'area',
        labelAr: 'المساحة الإجمالية',
        labelEn: 'Total Area',
        renderA: () => `${propertyA.value?.area} م²`,
        renderB: () => `${propertyB.value?.area} م²`,
        highlightA: () => (propertyA.value?.area ?? 0) >= (propertyB.value?.area ?? 0),
        highlightB: () => (propertyB.value?.area ?? 0) >= (propertyA.value?.area ?? 0),
    },
    {
        key: 'bedrooms',
        labelAr: 'غرف النوم',
        labelEn: 'Bedrooms',
        renderA: () => `${propertyA.value?.bedrooms} (${locale.value === 'ar' ? propertyA.value?.bedTypeAr : propertyA.value?.bedTypeEn})`,
        renderB: () => `${propertyB.value?.bedrooms} (${locale.value === 'ar' ? propertyB.value?.bedTypeAr : propertyB.value?.bedTypeEn})`,
        highlightA: () => (propertyA.value?.bedrooms ?? 0) >= (propertyB.value?.bedrooms ?? 0),
        highlightB: () => (propertyB.value?.bedrooms ?? 0) >= (propertyA.value?.bedrooms ?? 0),
    },
    {
        key: 'bathrooms',
        labelAr: 'الحمامات',
        labelEn: 'Bathrooms',
        renderA: () => `${propertyA.value?.bathrooms} (${locale.value === 'ar' ? propertyA.value?.bathTypeAr : propertyA.value?.bathTypeEn})`,
        renderB: () => `${propertyB.value?.bathrooms} (${locale.value === 'ar' ? propertyB.value?.bathTypeAr : propertyB.value?.bathTypeEn})`,
        highlightA: () => (propertyA.value?.bathrooms ?? 0) >= (propertyB.value?.bathrooms ?? 0),
        highlightB: () => (propertyB.value?.bathrooms ?? 0) >= (propertyA.value?.bathrooms ?? 0),
    },
    {
        key: 'capacity',
        labelAr: 'سعة الأشخاص',
        labelEn: 'Capacity',
        renderA: () => locale.value === 'ar' ? (propertyA.value?.capacityAr ?? '-') : (propertyA.value?.capacityEn ?? '-'),
        renderB: () => locale.value === 'ar' ? (propertyB.value?.capacityAr ?? '-') : (propertyB.value?.capacityEn ?? '-'),
        highlightA: () => false,
        highlightB: () => false,
    },
    {
        key: 'rating',
        labelAr: 'التقييم',
        labelEn: 'Rating',
        renderA: () => `${propertyA.value?.rating} / 5 ⭐`,
        renderB: () => `${propertyB.value?.rating} / 5 ⭐`,
        highlightA: () => (propertyA.value?.rating ?? 0) >= (propertyB.value?.rating ?? 0),
        highlightB: () => (propertyB.value?.rating ?? 0) >= (propertyA.value?.rating ?? 0),
    },
])
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <!-- Hero Section -->
        <div class="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                <!-- Grid Pattern -->
                <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
                <!-- Tag -->
                <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-secondary text-sm font-semibold mb-6">
                    <Scale class="w-4 h-4" />
                    <span>{{ locale === 'ar' ? 'مقارنة العقارات والمواصفات' : 'Smart Property Comparison' }}</span>
                </div>

                <!-- Title -->
                <h1 
                    class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                >
                    {{ t('compare.title') }}
                </h1>

                <!-- Subtitle -->
                <p class="text-gray-400 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                    {{ t('compare.subtitle') }}
                </p>

                <!-- Stats Row — always LTR so order is consistent -->
                <div class="mt-10 flex items-center justify-center gap-8 sm:gap-12" style="direction: ltr;">
                    <div class="text-center">
                        <div class="text-3xl font-black text-white">{{ products.length }}</div>
                        <div class="text-xs text-gray-400 font-medium mt-1">{{ locale === 'ar' ? 'عقار متاح' : 'Properties' }}</div>
                    </div>
                    <div class="w-px h-10 bg-white/20"></div>
                    <div class="text-center">
                        <div class="text-3xl font-black text-white">{{ allUniqueFeatures.length }}</div>
                        <div class="text-xs text-gray-400 font-medium mt-1">{{ locale === 'ar' ? 'مميزة مقارنة' : 'Features Compared' }}</div>
                    </div>
                    <div class="w-px h-10 bg-white/20"></div>
                    <div class="text-center">
                        <div class="text-3xl font-black text-secondary">∞</div>
                        <div class="text-xs text-gray-400 font-medium mt-1">{{ locale === 'ar' ? 'تركيبة ممكنة' : 'Combinations' }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <!-- Selector Panel — no animation wrapper to prevent re-mount flicker -->
            <div class="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 mb-10">

                <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">

                    <!-- Slot A -->
                    <div class="space-y-4 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-bold text-primary uppercase tracking-widest">
                                {{ locale === 'ar' ? 'العقار (أ)' : 'Property (A)' }}
                            </span>
                            <span class="text-[10px] font-bold text-white bg-primary px-2.5 py-1 rounded-full">
                                {{ locale === 'ar' ? 'أساسي' : 'Primary' }}
                            </span>
                        </div>

                        <select 
                            v-model="propId1"
                            class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                            <option 
                                v-for="p in products" 
                                :key="p.id" 
                                :value="p.id"
                                :disabled="p.id === propId2"
                            >
                                {{ locale === 'ar' ? p.titleAr : p.titleEn }}
                            </option>
                        </select>

                        <!-- Mini preview A -->
                        <div v-if="propertyA" class="flex items-center gap-3 pt-1">
                            <img 
                                :src="propertyA.imageMain || propertyA.image" 
                                :alt="propertyA.titleEn"
                                class="w-18 h-14 rounded-xl object-cover border-2 border-primary/30 shrink-0"
                            />
                            <div class="min-w-0">
                                <div class="text-xs font-bold text-gray-900 truncate" :class="locale === 'ar' ? 'font-cairo' : ''">
                                    {{ locale === 'ar' ? propertyA.titleAr : propertyA.titleEn }}
                                </div>
                                <div class="text-primary font-black text-sm mt-0.5">
                                    {{ propertyA.price.toLocaleString() }} {{ locale === 'ar' ? 'ج.م' : 'EGP' }}<template v-if="(propertyA.purpose ?? 'rent') === 'rent' && propertyA.priceTypeEn"><span class="text-[10px] font-normal text-gray-400"> / {{ locale === 'ar' ? propertyA.priceTypeAr : propertyA.priceTypeEn }}</span></template>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Swap Button -->
                    <div class="flex justify-center">
                        <button 
                            @click="swapProperties"
                            class="p-4 bg-gray-900 hover:bg-primary text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                            :title="locale === 'ar' ? 'تبديل' : 'Swap'"
                        >
                            <ArrowLeftRight class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>

                    <!-- Slot B -->
                    <div class="space-y-4 bg-secondary/5 border border-secondary/20 rounded-2xl p-5">
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-bold text-secondary uppercase tracking-widest">
                                {{ locale === 'ar' ? 'العقار (ب)' : 'Property (B)' }}
                            </span>
                            <span class="text-[10px] font-bold text-white bg-secondary/80 px-2.5 py-1 rounded-full">
                                {{ locale === 'ar' ? 'للمقارنة' : 'Compare' }}
                            </span>
                        </div>

                        <select 
                            v-model="propId2"
                            class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all cursor-pointer"
                        >
                            <option 
                                v-for="p in products" 
                                :key="p.id" 
                                :value="p.id"
                                :disabled="p.id === propId1"
                            >
                                {{ locale === 'ar' ? p.titleAr : p.titleEn }}
                            </option>
                        </select>

                        <!-- Mini preview B -->
                        <div v-if="propertyB" class="flex items-center gap-3 pt-1">
                            <img 
                                :src="propertyB.imageMain || propertyB.image" 
                                :alt="propertyB.titleEn"
                                class="w-18 h-14 rounded-xl object-cover border-2 border-secondary/30 shrink-0"
                            />
                            <div class="min-w-0">
                                <div class="text-xs font-bold text-gray-900 truncate" :class="locale === 'ar' ? 'font-cairo' : ''">
                                    {{ locale === 'ar' ? propertyB.titleAr : propertyB.titleEn }}
                                </div>
                                <div class="text-secondary font-black text-sm mt-0.5">
                                    {{ propertyB.price.toLocaleString() }} {{ locale === 'ar' ? 'ج.م' : 'EGP' }}<template v-if="(propertyB.purpose ?? 'rent') === 'rent' && propertyB.priceTypeEn"><span class="text-[10px] font-normal text-gray-400"> / {{ locale === 'ar' ? propertyB.priceTypeAr : propertyB.priceTypeEn }}</span></template>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Comparison Table — no v-motion to prevent re-animation on select change -->
            <div v-if="propertyA && propertyB" class="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

                <!-- Image Headers -->
                <div class="grid grid-cols-2 border-b border-gray-200">
                    <!-- A Header -->
                    <div class="p-5 sm:p-7 border-r border-gray-200">
                        <div class="relative h-48 sm:h-60 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                            <img :src="propertyA.imageMain || propertyA.image" :alt="propertyA.titleEn" class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div class="absolute top-3 left-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">A</div>
                        </div>
                        <h3 class="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-1.5" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                            {{ locale === 'ar' ? propertyA.titleAr : propertyA.titleEn }}
                        </h3>
                        <div class="flex items-center gap-1 text-gray-500 text-xs mb-3">
                            <MapPin class="w-3.5 h-3.5 text-primary shrink-0" />
                            <span class="truncate">{{ locale === 'ar' ? propertyA.locationAr : propertyA.locationEn }}</span>
                        </div>
                        <button 
                            @click="goToProduct(propertyA.id)"
                            class="w-full py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                            <Eye class="w-3.5 h-3.5" />
                            <span>{{ t('compare.viewDetails') }}</span>
                        </button>
                    </div>

                    <!-- B Header -->
                    <div class="p-5 sm:p-7">
                        <div class="relative h-48 sm:h-60 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                            <img :src="propertyB.imageMain || propertyB.image" :alt="propertyB.titleEn" class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div class="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg">B</div>
                        </div>
                        <h3 class="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-1.5" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                            {{ locale === 'ar' ? propertyB.titleAr : propertyB.titleEn }}
                        </h3>
                        <div class="flex items-center gap-1 text-gray-500 text-xs mb-3">
                            <MapPin class="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            <span class="truncate">{{ locale === 'ar' ? propertyB.locationAr : propertyB.locationEn }}</span>
                        </div>
                        <button 
                            @click="goToProduct(propertyB.id)"
                            class="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                            <Eye class="w-3.5 h-3.5" />
                            <span>{{ t('compare.viewDetails') }}</span>
                        </button>
                    </div>
                </div>

                <!-- Specs Rows -->
                <div class="divide-y divide-gray-100">

                    <!-- Negotiable Row -->
                    <div class="grid grid-cols-2 divide-x divide-gray-100">
                        <div class="px-5 py-4 flex items-center gap-3">
                            <span class="text-xs text-gray-500 font-semibold shrink-0 hidden sm:inline">
                                {{ locale === 'ar' ? 'التفاوض:' : 'Negotiable:' }}
                            </span>
                            <span 
                                class="text-xs font-bold px-3 py-1.5 rounded-full"
                                :class="propertyA.negotiable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'"
                            >
                                {{ propertyA.negotiable 
                                    ? (locale === 'ar' ? '✓ قابل للتفاوض' : '✓ Negotiable') 
                                    : (locale === 'ar' ? '✗ غير قابل' : '✗ Non-negotiable') 
                                }}
                            </span>
                        </div>
                        <div class="px-5 py-4 flex items-center gap-3">
                            <span class="text-xs text-gray-500 font-semibold shrink-0 hidden sm:inline">
                                {{ locale === 'ar' ? 'التفاوض:' : 'Negotiable:' }}
                            </span>
                            <span 
                                class="text-xs font-bold px-3 py-1.5 rounded-full"
                                :class="propertyB.negotiable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'"
                            >
                                {{ propertyB.negotiable 
                                    ? (locale === 'ar' ? '✓ قابل للتفاوض' : '✓ Negotiable') 
                                    : (locale === 'ar' ? '✗ غير قابل' : '✗ Non-negotiable') 
                                }}
                            </span>
                        </div>
                    </div>

                    <!-- Dynamic Spec Rows -->
                    <div 
                        v-for="(row, idx) in specRows" 
                        :key="row.key"
                        class="grid grid-cols-2 divide-x divide-gray-100"
                        :class="idx % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'"
                    >
                        <!-- Value A -->
                        <div class="px-5 py-4 flex items-center gap-2 min-w-0">
                            <span class="text-xs text-gray-500 font-semibold shrink-0 hidden sm:inline w-20">
                                {{ locale === 'ar' ? row.labelAr : row.labelEn }}:
                            </span>
                            <span 
                                class="font-bold text-sm truncate px-2 py-0.5 rounded-lg"
                                :class="row.highlightA() ? 'text-emerald-700 bg-emerald-50' : 'text-gray-800'"
                            >
                                {{ row.renderA() }}
                            </span>
                        </div>
                        <!-- Value B -->
                        <div class="px-5 py-4 flex items-center gap-2 min-w-0">
                            <span class="text-xs text-gray-500 font-semibold shrink-0 hidden sm:inline w-20">
                                {{ locale === 'ar' ? row.labelAr : row.labelEn }}:
                            </span>
                            <span 
                                class="font-bold text-sm truncate px-2 py-0.5 rounded-lg"
                                :class="row.highlightB() ? 'text-emerald-700 bg-emerald-50' : 'text-gray-800'"
                            >
                                {{ row.renderB() }}
                            </span>
                        </div>
                    </div>

                </div>

                <!-- Features Checklist -->
                <div class="p-6 sm:p-8 border-t border-gray-200 bg-gray-50/50">
                    <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                        <Sparkles class="w-5 h-5 text-primary" />
                        {{ t('compare.features') }}
                    </h3>

                    <div class="rounded-2xl border border-gray-200 overflow-hidden bg-white">
                        <div 
                            v-for="(feat, idx) in allUniqueFeatures" 
                            :key="feat"
                            class="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100 last:border-b-0"
                            :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'"
                        >
                            <!-- Feature Name -->
                            <div class="px-4 py-3 flex items-center gap-2 min-w-0">
                                <div class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                <span class="text-xs font-semibold text-gray-700 truncate">{{ feat }}</span>
                            </div>
                            <!-- A status -->
                            <div class="px-4 py-3 flex items-center justify-center">
                                <span v-if="hasFeature(propertyA, feat)" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                    <Check class="w-3.5 h-3.5" />
                                    {{ locale === 'ar' ? 'متوفر' : 'Yes' }}
                                </span>
                                <span v-else class="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                                    <X class="w-3 h-3" />
                                    {{ locale === 'ar' ? 'غير متوفر' : 'No' }}
                                </span>
                            </div>
                            <!-- B status -->
                            <div class="px-4 py-3 flex items-center justify-center">
                                <span v-if="hasFeature(propertyB, feat)" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                    <Check class="w-3.5 h-3.5" />
                                    {{ locale === 'ar' ? 'متوفر' : 'Yes' }}
                                </span>
                                <span v-else class="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                                    <X class="w-3 h-3" />
                                    {{ locale === 'ar' ? 'غير متوفر' : 'No' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer CTA -->
                <div class="p-6 sm:p-8 bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div class="flex items-center gap-3 text-white text-center sm:text-start">
                        <Scale class="w-8 h-8 text-secondary shrink-0" />
                        <div>
                            <h4 class="font-bold text-base">
                                {{ locale === 'ar' ? 'جاهز للاختيار؟' : 'Ready to decide?' }}
                            </h4>
                            <p class="text-xs text-gray-400">
                                {{ locale === 'ar' ? 'تواصل مع المالك مباشرة أو استعرض المزيد' : 'Contact the owner directly or browse more' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                            @click="router.push(`/${locale}/products`)"
                            class="flex-1 sm:flex-initial px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
                        >
                            {{ locale === 'ar' ? 'تصفح الكل' : 'Browse All' }}
                        </button>
                        <button 
                            @click="goToProduct(propertyA!.id)"
                            class="flex-1 sm:flex-initial px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-md"
                        >
                            {{ locale === 'ar' ? 'عرض العقار A' : 'View A Details' }}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.font-playfair { font-family: 'Playfair Display', serif; }
.font-cairo { font-family: 'Cairo', sans-serif; }
</style>
