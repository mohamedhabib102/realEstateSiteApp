<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../../../data/products'
import { MapPin, Star, Bed, Bath, Square, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const productId = route.params.id as string

const product = computed(() => {
    return products.find(p => p.id === productId)
})

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="min-h-screen bg-bg">
        <template v-if="product">
            <!-- Hero Section -->
            <section class="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div class="absolute inset-0 z-0">
                    <img 
                        :src="product.image" 
                        :alt="locale === 'ar' ? product.titleAr : product.titleEn" 
                        class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-black/30"></div>
                </div>

                <!-- Back Button -->
                <button 
                    @click="goBack" 
                    class="absolute top-32 z-20 flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                    :class="locale === 'ar' ? 'right-6 md:right-12' : 'left-6 md:left-12'"
                >
                    <ArrowRight v-if="locale === 'ar'" class="w-5 h-5" />
                    <ArrowLeft v-else class="w-5 h-5" />
                    <span class="font-medium">Back</span>
                </button>
                
                <!-- Title Overlay -->
                <div class="absolute bottom-0 left-0 w-full z-10 px-6 pb-16 md:pb-24 pt-32 bg-gradient-to-t from-white to-transparent">
                    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                        <div 
                            v-motion
                            :initial="{ opacity: 0, x: locale === 'ar' ? 50 : -50 }"
                            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
                        >
                            <div class="flex items-center gap-2 text-secondary mb-4">
                                <Star class="w-5 h-5 fill-secondary text-secondary" />
                                <span class="font-bold text-lg text-gray-800">{{ product.rating }}</span>
                            </div>
                            <h1 class="text-4xl md:text-6xl text-gray-900 font-bold mb-4" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                                {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                            </h1>
                            <div class="flex items-center gap-2 text-gray-500 text-lg">
                                <MapPin class="w-5 h-5 text-primary" />
                                <span>{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
                            </div>
                        </div>

                        <div 
                            class="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-xl shrink-0"
                            v-motion
                            :initial="{ opacity: 0, y: 50 }"
                            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                        >
                            <div class="text-sm text-gray-500 mb-1">{{ t('products.priceType') }}</div>
                            <div class="text-3xl font-bold text-primary mb-1">
                                {{ product.price.toLocaleString() }} <span class="text-xl">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span>
                                <span class="text-lg text-gray-600 font-normal">/ {{ locale === 'ar' ? product.priceTypeAr : product.priceTypeEn }}</span>
                            </div>
                            <button class="w-full mt-4 bg-[#1e1e1e] text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors">
                                {{ t('products.contactUs') || 'Contact Agent' }}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Details Content -->
            <section class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-12">
                    <!-- Quick Stats -->
                    <div 
                        class="grid grid-cols-3 gap-4"
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                    >
                        <div class="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-2 shadow-sm">
                            <Bed class="w-8 h-8 text-primary" />
                            <div class="text-2xl font-bold text-gray-900">{{ product.bedrooms }}</div>
                            <div class="text-sm text-gray-500">{{ t('products.bedrooms') }}</div>
                        </div>
                        <div class="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-2 shadow-sm">
                            <Bath class="w-8 h-8 text-primary" />
                            <div class="text-2xl font-bold text-gray-900">{{ product.bathrooms }}</div>
                            <div class="text-sm text-gray-500">{{ t('products.bathrooms') }}</div>
                        </div>
                        <div class="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-2 shadow-sm">
                            <Square class="w-8 h-8 text-primary" />
                            <div class="text-2xl font-bold text-gray-900">{{ product.area }}</div>
                            <div class="text-sm text-gray-500">{{ t('products.area') }}</div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
                    >
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ t('products.description') }}</h3>
                        <p class="text-lg text-gray-600 leading-relaxed">
                            {{ locale === 'ar' ? product.descriptionAr : product.descriptionEn }}
                        </p>
                    </div>

                    <!-- Features -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
                    >
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ t('products.features') }}</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div 
                                v-for="(feature, index) in (locale === 'ar' ? product.featuresAr : product.featuresEn)" 
                                :key="index"
                                class="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                            >
                                <CheckCircle2 class="w-5 h-5 text-accent shrink-0" />
                                <span class="text-gray-700 font-medium">{{ feature }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Agent Card -->
                    <div 
                        class="bg-white p-8 rounded-2xl border border-gray-200 sticky top-32 shadow-sm"
                        v-motion
                        :initial="{ opacity: 0, x: locale === 'ar' ? -30 : 30 }"
                        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
                    >
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Listed By</h3>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agent" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-lg">John Doe</div>
                                <div class="text-primary text-sm font-medium">Real Estate Agent</div>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <button class="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors border border-gray-200 font-medium">
                                View Profile
                            </button>
                            <button class="w-full py-3 bg-[#1e1e1e] text-white rounded-xl hover:bg-black transition-colors font-semibold">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </template>
        
        <template v-else>
            <!-- 404 State -->
            <div class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
                <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p class="text-xl text-gray-500 mb-8">Product not found</p>
                <button @click="router.push(`/${locale}/products`)" class="bg-[#1e1e1e] text-white px-8 py-3 rounded-xl hover:bg-black transition-colors font-semibold">
                    Back to Products
                </button>
            </div>
        </template>
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
