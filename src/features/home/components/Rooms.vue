<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../../../data/products'
import { MapPin, Bed, Bath, Square, ArrowLeft, ArrowRight, Sparkles } from 'lucide-vue-next'

const { locale } = useI18n()
const router = useRouter()

const latestProducts = computed(() => {
    return [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4)
})

const goToProducts = () => {
    router.push(`/${locale.value}/products`)
}

const goToProductDetails = (id: string) => {
    router.push(`/${locale.value}/products/${id}`)
}
</script>

<template>
    <section class="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            
            <!-- Section Header with View All Button -->
            <div 
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
            >
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold mb-4">
                        <Sparkles class="w-4 h-4 text-primary" />
                        <span>{{ locale === 'ar' ? 'العقارات الأحدث' : 'Latest Properties' }}</span>
                    </div>
                    <h2 
                        class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                        :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                    >
                        {{ locale === 'ar' ? 'أحدث الوحـدات المضافة حديثاً' : 'Recently Added Units' }}
                    </h2>
                    <p class="text-gray-500 mt-2 text-base sm:text-lg max-w-2xl">
                        {{ locale === 'ar' ? 'تصفح أحدث الفرص العقارية المميزة المضافة حديثاً لقائمتنا بكافة التفاصيل' : 'Explore the newest luxury real estate additions to our catalog with complete details' }}
                    </p>
                </div>

                <!-- View All Top Button -->
                <button 
                    @click="goToProducts"
                    class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 group self-start md:self-auto"
                >
                    <span>{{ locale === 'ar' ? 'عرض كافة العقارات' : 'View All Properties' }}</span>
                    <ArrowLeft v-if="locale === 'ar'" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <ArrowRight v-else class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <!-- 4 Latest Products Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div 
                    v-for="(product, index) in latestProducts" 
                    :key="product.id"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 150 } }"
                    @click="goToProductDetails(product.id)"
                    class="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
                >
                    <!-- Property Image & Badges -->
                    <div class="relative h-[240px] w-full overflow-hidden bg-gray-100">
                        <img 
                            :src="product.image" 
                            :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                        
                        <!-- Number Badge (01, 02, 03, 04) -->
                        <span 
                            class="absolute top-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold font-playfair rounded-full border border-white/20"
                            :class="locale === 'ar' ? 'right-4' : 'left-4'"
                        >
                            0{{ index + 1 }}
                        </span>

                        <!-- Newest Ribbon Badge -->
                        <span 
                            class="absolute top-4 z-10 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-sm"
                            :class="locale === 'ar' ? 'left-4' : 'right-4'"
                        >
                            {{ locale === 'ar' ? 'جديد' : 'New' }}
                        </span>

                        <!-- Price Tag overlay on image -->
                        <div class="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
                            <span class="text-xl font-extrabold tracking-tight">
                                {{ locale === 'ar' ? product.price.toLocaleString('ar-EG') : product.price.toLocaleString('en-US') }}
                                <span class="text-xs font-normal opacity-90">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span>
                            </span>
                            <span 
                                class="text-[10px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs shadow-xs"
                                :class="product.negotiable ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'"
                            >
                                {{ product.negotiable 
                                    ? (locale === 'ar' ? 'قابل للتفاوض' : 'Negotiable') 
                                    : (locale === 'ar' ? 'غير قابل للتفاوض' : 'Non-negotiable') 
                                }}
                            </span>
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <!-- Title -->
                            <h3 
                                class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors"
                                :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                            >
                                {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                            </h3>

                            <!-- Location -->
                            <div class="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
                                <MapPin class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="truncate">{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
                            </div>
                        </div>

                        <!-- Stats & Action -->
                        <div>
                            <div class="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 text-gray-600 text-xs mb-4">
                                <div class="flex items-center gap-1">
                                    <Bed class="w-3.5 h-3.5 text-primary" />
                                    <span>{{ product.bedrooms }} {{ locale === 'ar' ? 'غرف' : 'Beds' }}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <Bath class="w-3.5 h-3.5 text-primary" />
                                    <span>{{ product.bathrooms }} {{ locale === 'ar' ? 'حمام' : 'Baths' }}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <Square class="w-3.5 h-3.5 text-primary" />
                                    <span>{{ product.area }} م²</span>
                                </div>
                            </div>

                            <button 
                                class="w-full py-2.5 bg-gray-50 group-hover:bg-primary group-hover:text-white text-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>{{ locale === 'ar' ? 'تفاصيل العقار' : 'View Details' }}</span>
                                <ArrowLeft v-if="locale === 'ar'" class="w-3.5 h-3.5" />
                                <ArrowRight v-else class="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Full View All Bar -->
            <div class="mt-12 text-center">
                <button 
                    @click="goToProducts"
                    class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                >
                    <span>{{ locale === 'ar' ? 'تصفح جميع العقارات المتاحة' : 'Browse All Available Properties' }}</span>
                    <ArrowLeft v-if="locale === 'ar'" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <ArrowRight v-else class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
</style>
