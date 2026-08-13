<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { products, type Product } from '../../../data/products'
import ProductCard from '../components/ProductCard.vue'
import { Filter, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

const selectedLocation = ref('')
const selectedPrice = ref('')
const searchQuery = ref('')

const locations = computed(() => {
    const locs = products.map(p => locale.value === 'ar' ? p.locationAr : p.locationEn)
    return [...new Set(locs)]
})

const priceRanges = computed(() => {
    return [
        { label: locale.value === 'ar' ? 'أقل من 50,000 ج.م' : 'Under 50K EGP', max: 50000 },
        { label: locale.value === 'ar' ? '50,000 - 5 مليون ج.م' : '50K - 5M EGP', min: 50000, max: 5000000 },
        { label: locale.value === 'ar' ? 'أكثر من 5 مليون ج.م' : 'Over 5M EGP', min: 5000000 }
    ]
})

const filteredProducts = computed(() => {
    return products.filter((p: Product) => {
        const matchLocation = selectedLocation.value ? 
            (locale.value === 'ar' ? p.locationAr : p.locationEn) === selectedLocation.value : true
        
        let matchPrice = true
        if (selectedPrice.value) {
            const range = priceRanges.value.find(r => r.label === selectedPrice.value)
            if (range) {
                if (range.min && p.price < range.min) matchPrice = false
                if (range.max && p.price >= range.max) matchPrice = false
            }
        }

        const matchSearch = searchQuery.value ? 
            (locale.value === 'ar' ? p.titleAr : p.titleEn).toLowerCase().includes(searchQuery.value.toLowerCase()) : true

        return matchLocation && matchPrice && matchSearch
    })
})

const navigateToProduct = (id: string) => {
    router.push(`/${locale.value}/products/${id}`)
}
</script>

<template>
    <div class="min-h-screen bg-bg">
        <!-- Hero Section -->
        <section class="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img 
                    src="../../../assets/images/Rectangle 110.png" 
                    alt="Products Hero" 
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/55"></div>
            </div>
            
            <div 
                class="relative z-10 text-center px-6"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
            >
                <h1 class="text-4xl md:text-6xl text-white font-bold mb-4" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                    {{ t('products.heroTitle') }}
                </h1>
                <p class="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                    {{ t('products.heroSubtitle') }}
                </p>
            </div>
        </section>

        <!-- Filters & Content -->
        <section class="max-w-7xl mx-auto px-6 py-16">
            <!-- Filter Bar -->
            <div 
                class="bg-white rounded-2xl p-6 shadow-xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-200/60 -mt-24 relative z-20"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
            >
                <!-- Search -->
                <div class="relative w-full md:w-1/3">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        v-model="searchQuery" 
                        :placeholder="t('products.search')" 
                        class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    >
                </div>

                <!-- Dropdowns -->
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-2/3">
                    <select v-model="selectedLocation" class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer">
                        <option value="">{{ t('products.allLocations') }}</option>
                        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>

                    <select v-model="selectedPrice" class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer">
                        <option value="">{{ t('products.allPrices', 'All Prices') }}</option>
                        <option v-for="range in priceRanges" :key="range.label" :value="range.label">{{ range.label }}</option>
                    </select>
                </div>
            </div>

            <!-- Products Grid -->
            <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div 
                    v-for="(product, index) in filteredProducts" 
                    :key="product.id"
                    @click="navigateToProduct(product.id)"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
                >
                    <ProductCard :product="product" />
                </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-20" v-motion-fade>
                <Filter class="w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50" />
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p class="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                <button @click="selectedLocation = ''; selectedPrice = ''; searchQuery = ''" class="mt-6 text-primary font-semibold hover:underline">
                    Clear all filters
                </button>
            </div>
        </section>
    </div>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
</style>
