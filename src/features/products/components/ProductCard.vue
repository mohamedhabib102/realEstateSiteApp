<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '../../../data/products'
import { Star, BedDouble, Users, Bath } from 'lucide-vue-next'

const { locale } = useI18n()

defineProps<{
    product: Product
}>()
</script>

<template>
    <div 
        class="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer h-full flex flex-col border border-gray-100/90 hover:-translate-y-1.5"
    >
        <!-- Image Container -->
        <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
            <img 
                :src="product.image" 
                :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            <!-- Subtle Overlay Gradients -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

            <!-- Top Left/Right Star Rating (Matches Image 2) -->
            <div 
                class="absolute top-4 flex items-center gap-1 z-10"
                :class="locale === 'ar' ? 'right-4 flex-row-reverse' : 'left-4'"
            >
                <div class="flex items-center gap-1 bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                    <template v-for="star in 5" :key="star">
                        <Star 
                            class="w-3.5 h-3.5 transition-colors"
                            :class="star <= product.rating ? 'text-amber-400 fill-amber-400 drop-shadow' : 'text-white/40 fill-white/20'"
                        />
                    </template>
                </div>
            </div>

            <!-- Bottom Image Counter / Slider Indicator (Matches Image 2) -->
            <div class="absolute bottom-3.5 left-0 right-0 px-6 flex items-center justify-center gap-3 z-10 text-white font-medium text-xs sm:text-sm drop-shadow-md">
                <span class="opacity-90 font-semibold tracking-wider">{{ product.currentImageIndex || 4 }}</span>
                <div class="w-20 sm:w-28 h-[2px] bg-white/40 rounded-full overflow-hidden relative">
                    <div 
                        class="h-full bg-white rounded-full transition-all duration-300"
                        :style="{ width: `${((product.currentImageIndex || 4) / (product.imagesCount || 12)) * 100}%` }"
                    ></div>
                </div>
                <span class="opacity-90 font-semibold tracking-wider">{{ product.imagesCount || 12 }}</span>
            </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-5 sm:p-6 flex flex-col flex-grow justify-between">
            <div>
                <!-- Price -->
                <div class="flex items-baseline gap-1.5 mb-2">
                    <span class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {{ locale === 'ar' ? product.price.toLocaleString('ar-EG') : product.price.toLocaleString('en-US') }}
                    </span>
                    <span class="text-xs sm:text-sm font-medium text-gray-400">
                        {{ locale === 'ar' ? 'ج.م' : 'EGP' }}<template v-if="(product.purpose ?? 'rent') === 'rent' && product.priceTypeEn"> / {{ locale === 'ar' ? product.priceTypeAr : product.priceTypeEn }}</template>
                    </span>
                </div>

                <!-- Title -->
                <h3 
                    class="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-outfit'"
                >
                    {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                </h3>
                
                <!-- Location -->
                <p class="text-xs sm:text-sm text-gray-400 font-normal mb-5 truncate">
                    {{ locale === 'ar' ? product.locationAr : product.locationEn }}
                </p>
            </div>

            <!-- Bottom Specs Bar (Matches Image 2: Bed, Persons, Bath) -->
            <div class="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 items-center text-gray-700">
                <!-- Bed -->
                <div class="flex items-center gap-2 min-w-0" :title="locale === 'ar' ? product.bedTypeAr : product.bedTypeEn">
                    <BedDouble class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 shrink-0 stroke-[1.75]" />
                    <span class="text-xs sm:text-[13px] font-medium text-gray-600 truncate">
                        {{ locale === 'ar' ? product.bedTypeAr : product.bedTypeEn }}
                    </span>
                </div>

                <!-- Persons / Capacity -->
                <div class="flex items-center gap-2 justify-center min-w-0 border-x border-gray-100 px-1" :title="locale === 'ar' ? product.capacityAr : product.capacityEn">
                    <Users class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 shrink-0 stroke-[1.75]" />
                    <span class="text-xs sm:text-[13px] font-medium text-gray-600 truncate">
                        {{ locale === 'ar' ? product.capacityAr : product.capacityEn }}
                    </span>
                </div>

                <!-- Bath -->
                <div class="flex items-center gap-2 justify-end min-w-0" :title="locale === 'ar' ? product.bathTypeAr : product.bathTypeEn">
                    <Bath class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 shrink-0 stroke-[1.75]" />
                    <span class="text-xs sm:text-[13px] font-medium text-gray-600 truncate">
                        {{ locale === 'ar' ? product.bathTypeAr : product.bathTypeEn }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
