<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '../../../data/products'
import { MapPin, Star, Bed, Bath, Square } from 'lucide-vue-next'

const { locale } = useI18n()

defineProps<{
    product: Product
}>()
</script>

<template>
    <div 
        class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col border border-gray-200/60"
    >
        <!-- Image Container -->
        <div class="relative h-64 overflow-hidden">
            <img 
                :src="product.image" 
                :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star class="w-4 h-4 text-secondary fill-secondary" />
                <span class="font-bold text-sm text-gray-800">{{ product.rating }}</span>
            </div>
            <div class="absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-lg shadow-md">
                <span class="font-bold text-lg">{{ product.price.toLocaleString() }} <span class="text-sm font-normal">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
                <span class="text-sm opacity-80 ml-1">/ {{ locale === 'ar' ? product.priceTypeAr : product.priceTypeEn }}</span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {{ locale === 'ar' ? product.titleAr : product.titleEn }}
            </h3>
            
            <div class="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin class="w-4 h-4 shrink-0 text-primary" />
                <span class="text-sm truncate">{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
            </div>

            <!-- Features -->
            <div class="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-gray-200">
                <div class="flex flex-col items-center gap-1 text-gray-500">
                    <Bed class="w-5 h-5 text-primary/70" />
                    <span class="text-xs font-medium">{{ product.bedrooms }}</span>
                </div>
                <div class="flex flex-col items-center gap-1 text-gray-500 border-x border-gray-200">
                    <Bath class="w-5 h-5 text-primary/70" />
                    <span class="text-xs font-medium">{{ product.bathrooms }}</span>
                </div>
                <div class="flex flex-col items-center gap-1 text-gray-500">
                    <Square class="w-5 h-5 text-primary/70" />
                    <span class="text-xs font-medium">{{ product.area }} m²</span>
                </div>
            </div>
        </div>
    </div>
</template>
