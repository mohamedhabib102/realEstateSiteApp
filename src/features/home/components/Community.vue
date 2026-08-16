<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, type Product } from '../../../data/products'
import { Search, ChevronDown, MapPin, Bed, Bath, Square, ArrowLeft, ArrowRight, Home, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-vue-next'

const { t, locale } = useI18n()
const router = useRouter()

// Selected filter values
const selectedType = ref<string>('all')
const selectedLocation = ref<string>('all')
const selectedPrice = ref<string>('all')

// Search results state
const hasSearched = ref<boolean>(false)
const searchResults = ref<Product[]>([])
const resultsSectionRef = ref<HTMLElement | null>(null)

// Localized Dynamic Filter Options extracted directly from products.ts data
const locationsList = computed(() => {
    const defaultAll = { value: 'all', labelAr: 'كل المدن والمواقع', labelEn: 'All Locations', matchAr: '', matchEn: '' }
    
    // Extract unique locations from products.ts
    const seen = new Set<string>()
    const unique: Array<{ value: string; labelAr: string; labelEn: string; matchAr: string; matchEn: string }> = []
    
    products.forEach((p, idx) => {
        const key = `${p.locationAr}|${p.locationEn}`
        if (!seen.has(key)) {
            seen.add(key)
            unique.push({
                value: `loc_${idx}`,
                labelAr: p.locationAr,
                labelEn: p.locationEn,
                matchAr: p.locationAr,
                matchEn: p.locationEn
            })
        }
    })

    return [defaultAll, ...unique]
})

const propertyTypes = computed(() => {
    const defaultAll = { value: 'all', labelAr: 'جميع الأنواع', labelEn: 'All Types', keywords: [] as string[] }
    
    const candidateTypes = [
        { key: 'apartment', labelAr: 'شقة سكنية', labelEn: 'Apartment', keywords: ['شقة', 'apartment', 'residence'] },
        { key: 'villa', labelAr: 'فيلا فاخرة', labelEn: 'Villa', keywords: ['فيلا', 'villa'] },
        { key: 'studio', labelAr: 'استوديو مودرن', labelEn: 'Studio', keywords: ['استوديو', 'studio'] },
        { key: 'chalet', labelAr: 'شاليه ساحلي', labelEn: 'Chalet', keywords: ['شاليه', 'chalet'] },
        { key: 'loft', labelAr: 'شقة لوفت', labelEn: 'Designer Loft', keywords: ['لوفت', 'loft'] },
        { key: 'penthouse', labelAr: 'بنتهاوس', labelEn: 'Penthouse', keywords: ['بنتهاوس', 'penthouse'] },
        { key: 'estate', labelAr: 'قصر ملكي', labelEn: 'Royal Estate', keywords: ['قصر', 'estate'] }
    ]

    // Filter only types that are present in products.ts
    const existing = candidateTypes.filter(t => {
        return products.some(p => {
            const combined = (p.titleAr + ' ' + p.titleEn + ' ' + p.descriptionAr + ' ' + p.descriptionEn).toLowerCase()
            return t.keywords.some(k => combined.includes(k.toLowerCase()))
        })
    }).map(t => ({
        value: t.key,
        labelAr: t.labelAr,
        labelEn: t.labelEn,
        keywords: t.keywords
    }))

    return [defaultAll, ...existing]
})

const priceRanges = computed(() => [
    { value: 'all', labelAr: 'أي سعر / الغرض', labelEn: 'Any Price / Purpose' },
    { value: 'under_2000', labelAr: 'أقل من 2,000 ج.م', labelEn: 'Under 2,000 EGP' },
    { value: '2000_4000', labelAr: 'من 2,000 إلى 4,000 ج.م', labelEn: '2,000 - 4,000 EGP' },
    { value: '4000_6000', labelAr: 'من 4,000 إلى 6,000 ج.م', labelEn: '4,000 - 6,000 EGP' },
    { value: 'above_6000', labelAr: 'أكثر من 6,000 ج.م', labelEn: 'Above 6,000 EGP' }
])

const handleSearch = () => {
    const hasTypeFilter = selectedType.value !== 'all'
    const hasLocFilter = selectedLocation.value !== 'all'
    const hasPriceFilter = selectedPrice.value !== 'all'

    // If all filters are "all" → show all products
    if (!hasTypeFilter && !hasLocFilter && !hasPriceFilter) {
        searchResults.value = [...products]
        hasSearched.value = true
        setTimeout(() => resultsSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
        return
    }

    // Score each product by how many active filters it matches (0-3)
    const scored = products.map(p => {
        let score = 0

        // Type match
        if (hasTypeFilter) {
            const typeObj = propertyTypes.value.find(t => t.value === selectedType.value)
            if (typeObj && typeObj.keywords.length) {
                const text = (p.titleAr + ' ' + p.titleEn + ' ' + p.descriptionAr + ' ' + p.descriptionEn).toLowerCase()
                if (typeObj.keywords.some(kw => text.includes(kw.toLowerCase()))) score++
            }
        }

        // Location match
        if (hasLocFilter) {
            const locObj = locationsList.value.find(l => l.value === selectedLocation.value)
            if (locObj && locObj.matchAr) {
                if (p.locationAr === locObj.matchAr || p.locationEn === locObj.matchEn) score++
            }
        }

        // Price match
        if (hasPriceFilter) {
            const inRange = 
                (selectedPrice.value === 'under_2000' && p.price <= 2000) ||
                (selectedPrice.value === '2000_4000' && p.price > 2000 && p.price <= 4000) ||
                (selectedPrice.value === '4000_6000' && p.price > 4000 && p.price <= 6000) ||
                (selectedPrice.value === 'above_6000' && p.price > 6000)
            if (inRange) score++
        }

        return { product: p, score }
    })

    // Max possible score = number of active filters
    const maxScore = [hasTypeFilter, hasLocFilter, hasPriceFilter].filter(Boolean).length

    // Show products that match ALL active filters — if none, relax to any match
    let best = scored.filter(x => x.score === maxScore)
    if (best.length === 0) {
        best = scored.filter(x => x.score > 0)
    }

    searchResults.value = best.sort((a, b) => b.score - a.score).map(x => x.product)
    hasSearched.value = true

    setTimeout(() => resultsSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
}


const resetFilters = () => {
    selectedType.value = 'all'
    selectedLocation.value = 'all'
    selectedPrice.value = 'all'
    searchResults.value = [...products]
    hasSearched.value = true
}

const goToProduct = (id: string) => {
    router.push(`/${locale.value}/products/${id}`)
}

const goToAllProducts = () => {
    router.push(`/${locale.value}/products`)
}

const handleSubscribe = () => {
    alert(locale.value === 'ar' ? 'تم الاشتراك في النشرة العقارية بنجاح!' : 'Subscribed to property newsletter successfully!')
}
</script>

<template>
    <section class="relative py-24 md:py-32 w-full overflow-hidden min-h-[700px] flex flex-col justify-center">
        <!-- Background -->
        <div class="absolute inset-0 z-0">
            <img 
                src="../../../assets/images/Rectangle 110.png" 
                alt="Community Background" 
                class="w-full h-full object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920'"
            />
            <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div class="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-12">
            
            <!-- Section Title -->
            <div class="w-full flex flex-col items-center gap-4 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-secondary text-xs sm:text-sm font-semibold">
                    <Sparkles class="w-4 h-4 text-secondary" />
                    <span>{{ locale === 'ar' ? 'محرك البحث العقاري المتطور' : 'Advanced Real Estate Search' }}</span>
                </div>
                <h2 
                    v-motion
                    :initial="{ opacity: 0, y: -30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
                    class="text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                >
                    {{ t('community.title') }}
                </h2>
                <p class="text-gray-200 text-sm sm:text-lg max-w-2xl font-light">
                    {{ locale === 'ar' ? 'حدد مواصفات وموقع وسعر عقارك المثالي واستعرض النتائج المباشرة فوراً' : 'Specify your preferred unit type, location, and price to find matching properties instantly' }}
                </p>
            </div>

            <!-- Search Bar with Live Filter Controls -->
            <div 
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                class="bg-white rounded-2xl md:rounded-full w-full max-w-5xl flex flex-col md:flex-row items-center p-3 gap-3 md:gap-0 shadow-2xl border border-white/20"
            >
                <!-- 1. Property Type Dropdown -->
                <div class="flex-1 w-full px-5 py-2.5 border-b md:border-b-0 border-gray-200 relative" :class="locale === 'ar' ? 'md:border-l' : 'md:border-r'">
                    <label class="block text-xs text-gray-500 font-bold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">
                        {{ t('community.projectType') }}
                    </label>
                    <div class="relative flex items-center">
                        <select 
                            v-model="selectedType" 
                            class="w-full appearance-none bg-transparent outline-none font-bold text-gray-800 text-sm sm:text-base cursor-pointer"
                            :class="locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6'"
                        >
                            <option v-for="opt in propertyTypes" :key="opt.value" :value="opt.value" class="text-gray-800 font-medium">
                                {{ locale === 'ar' ? opt.labelAr : opt.labelEn }}
                            </option>
                        </select>
                        <ChevronDown class="absolute w-4 h-4 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                    </div>
                </div>

                <!-- 2. Location Dropdown -->
                <div class="flex-1 w-full px-5 py-2.5 border-b md:border-b-0 border-gray-200 relative" :class="locale === 'ar' ? 'md:border-l' : 'md:border-r'">
                    <label class="block text-xs text-gray-500 font-bold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">
                        {{ t('community.location') }}
                    </label>
                    <div class="relative flex items-center">
                        <select 
                            v-model="selectedLocation" 
                            class="w-full appearance-none bg-transparent outline-none font-bold text-gray-800 text-sm sm:text-base cursor-pointer"
                            :class="locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6'"
                        >
                            <option v-for="loc in locationsList" :key="loc.value" :value="loc.value" class="text-gray-800 font-medium">
                                {{ locale === 'ar' ? loc.labelAr : loc.labelEn }}
                            </option>
                        </select>
                        <ChevronDown class="absolute w-4 h-4 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                    </div>
                </div>

                <!-- 3. Price Range Dropdown -->
                <div class="flex-1 w-full px-5 py-2.5 mb-2 md:mb-0 relative">
                    <label class="block text-xs text-gray-500 font-bold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">
                        {{ locale === 'ar' ? 'نطاق السعر / الميزانية' : 'Price Budget' }}
                    </label>
                    <div class="relative flex items-center">
                        <select 
                            v-model="selectedPrice" 
                            class="w-full appearance-none bg-transparent outline-none font-bold text-gray-800 text-sm sm:text-base cursor-pointer"
                            :class="locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6'"
                        >
                            <option v-for="price in priceRanges" :key="price.value" :value="price.value" class="text-gray-800 font-medium">
                                {{ locale === 'ar' ? price.labelAr : price.labelEn }}
                            </option>
                        </select>
                        <ChevronDown class="absolute w-4 h-4 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                    </div>
                </div>

                <!-- Search Action Button -->
                <button 
                    @click="handleSearch" 
                    class="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                    <Search class="w-5 h-5 text-white" />
                    <span>{{ t('community.searchBtn') }}</span>
                </button>
            </div>

            <!-- Real Search Results Display Area -->
            <div ref="resultsSectionRef" v-if="hasSearched" class="w-full max-w-6xl mt-4">
                <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/30 shadow-2xl">
                    <!-- Results Header -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <SlidersHorizontal class="w-5 h-5" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                                    {{ locale === 'ar' ? 'نتائج البحث المتاحة' : 'Search Results' }}
                                    <span class="text-primary text-base font-bold">({{ searchResults.length }})</span>
                                </h3>
                                <p class="text-xs text-gray-500">
                                    {{ locale === 'ar' ? 'اضغط على أي عقار للانتقال لصفحة تفاصيله الكاملة' : 'Click on any property to view its full details' }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 self-end sm:self-auto">
                            <button 
                                @click="resetFilters" 
                                class="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                                <RefreshCw class="w-3.5 h-3.5" />
                                <span>{{ locale === 'ar' ? 'إعادة التعيين' : 'Reset Filters' }}</span>
                            </button>
                            <button 
                                @click="goToAllProducts" 
                                class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                                <span>{{ locale === 'ar' ? 'عرض كل العقارات' : 'View All' }}</span>
                                <ArrowLeft v-if="locale === 'ar'" class="w-3.5 h-3.5" />
                                <ArrowRight v-else class="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    <!-- Matched Cards Grid — vertical stack -->
                    <div v-if="searchResults.length > 0" class="flex flex-col gap-4">
                        <div 
                            v-for="product in searchResults" 
                            :key="product.id"
                            @click="goToProduct(product.id)"
                            class="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-row cursor-pointer hover:-translate-y-0.5"
                        >
                            <!-- Card Image (fixed width on left) -->
                            <div class="relative h-auto w-32 sm:w-44 md:w-52 shrink-0 overflow-hidden bg-gray-100">
                                <img 
                                    :src="product.imageMain || product.image" 
                                    :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                            </div>

                            <!-- Card Info (right side) -->
                            <div class="flex-1 p-4 flex flex-col justify-between min-w-0">
                                <div class="flex items-start justify-between gap-3 mb-2">
                                    <div class="min-w-0">
                                        <h4 class="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                                            {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                                        </h4>
                                        <div class="flex items-center gap-1 text-gray-500 text-xs">
                                            <MapPin class="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span class="truncate">{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
                                        </div>
                                    </div>
                                    <span 
                                        class="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-xs"
                                        :class="product.negotiable ? 'bg-emerald-500' : 'bg-red-500'"
                                    >
                                        {{ product.negotiable 
                                            ? (locale === 'ar' ? 'قابل للتفاوض' : 'Negotiable') 
                                            : (locale === 'ar' ? 'غير قابل للتفاوض' : 'Non-negotiable') 
                                        }}
                                    </span>
                                </div>

                                <div class="flex items-center justify-between gap-3 flex-wrap">
                                    <div class="flex items-center gap-3 text-gray-600 text-xs">
                                        <div class="flex items-center gap-1">
                                            <Bed class="w-3.5 h-3.5 text-primary" />
                                            <span>{{ product.bedrooms }}</span>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <Bath class="w-3.5 h-3.5 text-primary" />
                                            <span>{{ product.bathrooms }}</span>
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <Square class="w-3.5 h-3.5 text-primary" />
                                            <span>{{ product.area }} م²</span>
                                        </div>
                                    </div>
                                    <div class="flex items-end gap-1">
                                        <span class="font-extrabold text-primary text-sm sm:text-base">
                                            {{ locale === 'ar' ? product.price.toLocaleString('ar-EG') : product.price.toLocaleString('en-US') }}
                                        </span>
                                        <span class="text-[10px] font-normal text-gray-500 pb-0.5">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State (No Results) -->
                    <div v-else class="text-center py-12 px-4 space-y-4">
                        <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <Home class="w-8 h-8" />
                        </div>
                        <h4 class="text-xl font-bold text-gray-900" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                            {{ locale === 'ar' ? 'لم يتم العثور على عقارات مطابقة' : 'No Matching Properties Found' }}
                        </h4>
                        <p class="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                            {{ locale === 'ar' ? 'لم نعثر على عقارات تطابق معايير الفلترة المحددة. جرب تغيير المدينة أو اختيار نوع عقار مختلف.' : 'No properties matched your specific filters. Try expanding your search location or selecting a different property type.' }}
                        </p>
                        <div class="flex items-center justify-center gap-3 pt-2">
                            <button 
                                @click="resetFilters" 
                                class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                            >
                                {{ locale === 'ar' ? 'إعادة ضبط الخيارات' : 'Reset All Filters' }}
                            </button>
                            <button 
                                @click="goToAllProducts" 
                                class="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                                {{ locale === 'ar' ? 'تصفح كل العقارات' : 'Browse All Properties' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Newsletter Subscription -->
            <div class="w-full flex flex-col items-center gap-6 mt-8">
                <h3 
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
                    class="text-2xl sm:text-3xl text-white font-semibold text-center"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                >
                    {{ t('community.newsletterTitle') }}
                </h3>

                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
                    class="bg-white rounded-full w-full max-w-2xl flex items-center p-2 pl-6 shadow-2xl border border-white/30"
                    :class="locale === 'ar' ? 'pr-6 pl-2' : 'pl-6 pr-2'"
                >
                    <input 
                        type="email" 
                        :placeholder="t('community.newsletterPlaceholder')"
                        class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base font-medium"
                        :class="locale === 'ar' ? 'text-right' : 'text-left'"
                    />
                    <button @click="handleSubscribe" class="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md">
                        {{ t('community.subscribeBtn') }}
                    </button>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
select option {
    background-color: white;
    color: #1f2937;
    font-weight: 500;
}
</style>
