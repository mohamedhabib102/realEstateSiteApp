<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Heart, MapPin, BedDouble, Bath, Maximize, CheckCircle2, MessageSquare, Building2
} from 'lucide-vue-next'
import { products } from '../../../../data/products'
import { buyerFavorites as initialFavorites } from '../../../../data/buyerDashboard'

const { locale } = useI18n()

const saved = ref<Set<string>>(new Set(initialFavorites))
const toast = ref('')

const favorites = computed(() => products.filter((p) => saved.value.has(p.id)))

const toggleSave = (id: string) => {
    const p = products.find((x) => x.id === id)
    if (saved.value.has(id)) {
        saved.value.delete(id)
        saved.value = new Set(saved.value)
        showToast(locale.value === 'ar'
            ? `تمت إزالة "${p ? (locale.value === 'ar' ? p.titleAr : p.titleEn) : ''}" من المحفوظات`
            : `Removed "${p ? (locale.value === 'ar' ? p.titleAr : p.titleEn) : ''}" from favorites`)
    } else {
        saved.value.add(id)
        saved.value = new Set(saved.value)
        showToast(locale.value === 'ar'
            ? `تمت إضافة "${p ? (locale.value === 'ar' ? p.titleAr : p.titleEn) : ''}" إلى المحفوظات`
            : `Added "${p ? (locale.value === 'ar' ? p.titleAr : p.titleEn) : ''}" to favorites`)
    }
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}

const requestConversation = (p: (typeof products)[number]) => {
    const name = locale.value === 'ar' ? p.titleAr : p.titleEn
    showToast(locale.value === 'ar' ? `تم إرسال طلب محادثة بخصوص "${name}"` : `Chat request sent for "${name}"`)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المحفوظات' : 'Favorites' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ favorites.length }} {{ locale === 'ar' ? 'عقار محفوظ' : 'saved properties' }}</p>
            </div>
            <button
                v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }"
                @click="saved = new Set()"
                :disabled="favorites.length === 0"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Heart class="w-4 h-4" /> {{ locale === 'ar' ? 'مسح الكل' : 'Clear All' }}
            </button>
        </div>

        <!-- Favorites grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(p, i) in favorites" :key="p.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
            >
                <div class="relative h-40 overflow-hidden">
                    <img :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                        @click="toggleSave(p.id)"
                        class="absolute top-3 p-2 rounded-lg bg-white/90 hover:bg-white transition-colors cursor-pointer"
                        :class="locale === 'ar' ? 'left-3' : 'right-3'"
                        :title="locale === 'ar' ? 'إزالة من المحفوظات' : 'Remove from favorites'"
                    >
                        <Heart class="w-4 h-4 text-red-500 fill-red-500" />
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
                        @click="requestConversation(p)"
                        class="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-semibold cursor-pointer active:scale-[0.98]"
                    >
                        <MessageSquare class="w-4 h-4" />
                        {{ locale === 'ar' ? 'اطلب محادثة' : 'Request Conversation' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="favorites.length === 0" class="text-center py-20 text-gray-400">
            <Heart class="w-14 h-14 mx-auto mb-4 opacity-30" />
            <p class="font-bold text-gray-500">{{ locale === 'ar' ? 'لا توجد عقارات محفوظة' : 'No saved properties yet' }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ locale === 'ar' ? 'اضغط على أيقونة القلب في أي عقار لحفظه هنا' : 'Tap the heart icon on any property to save it here' }}</p>
            <router-link
                :to="`/${locale}/dashboards/properties`"
                class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all text-sm font-semibold"
            >
                <Building2 class="w-4 h-4" /> {{ locale === 'ar' ? 'استكشاف العقارات' : 'Explore Properties' }}
            </router-link>
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