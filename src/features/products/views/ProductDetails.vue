<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../../../data/products'
import { 
    MapPin, Star, Bed, Bath, Square, ArrowLeft, ArrowRight, CheckCircle2, 
    BadgeCheck, BadgeX, Phone, Video, Play, X, ZoomIn, Eye, Maximize2, Scale 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const productId = route.params.id as string

const product = computed(() => {
    return products.find(p => p.id === productId)
})

// Active Selected Image for Gallery
const selectedImage = ref<string>('')

watch(
    product,
    (p) => {
        if (p) {
            selectedImage.value = p.imageMain || (p.images && p.images.length ? p.images[0] : p.image)
        }
    },
    { immediate: true }
)

const selectImage = (img: string) => {
    selectedImage.value = img
}

// Amazon-style Desktop Zoom Magnifier
const isZoomActive = ref(false)
const zoomOrigin = ref({ x: 50, y: 50 })
const imageContainerRef = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
    if (!imageContainerRef.value) return
    const rect = imageContainerRef.value.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    zoomOrigin.value = {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
    }
}

const handleMouseEnter = () => {
    isZoomActive.value = true
}

const handleMouseLeave = () => {
    isZoomActive.value = false
    zoomOrigin.value = { x: 50, y: 50 }
}

// Video Modal State
const isVideoModalOpen = ref(false)
const openVideoModal = () => { isVideoModalOpen.value = true }
const closeVideoModal = () => { isVideoModalOpen.value = false }

// Fullscreen Image Lightbox Modal State
const isImageModalOpen = ref(false)
const currentModalImage = ref('')

const currentModalIndex = computed(() => {
    if (!product.value?.images) return 0
    const idx = product.value.images.indexOf(currentModalImage.value)
    return idx >= 0 ? idx : 0
})

const openImageModal = (img?: string) => {
    currentModalImage.value = img || selectedImage.value || product.value?.imageMain || product.value?.image || ''
    isImageModalOpen.value = true
}

const closeImageModal = () => {
    isImageModalOpen.value = false
}

const nextModalImage = () => {
    if (!product.value?.images || !product.value.images.length) return
    const nextIdx = (currentModalIndex.value + 1) % product.value.images.length
    currentModalImage.value = product.value.images[nextIdx]
    selectedImage.value = currentModalImage.value
}

const prevModalImage = () => {
    if (!product.value?.images || !product.value.images.length) return
    const prevIdx = (currentModalIndex.value - 1 + product.value.images.length) % product.value.images.length
    currentModalImage.value = product.value.images[prevIdx]
    selectedImage.value = currentModalImage.value
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        closeVideoModal()
        closeImageModal()
    }
    if (isImageModalOpen.value) {
        if (e.key === 'ArrowRight') nextModalImage()
        if (e.key === 'ArrowLeft') prevModalImage()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

// Google Maps Embed URL
const mapEmbedUrl = computed(() => {
    if (!product.value) return ''
    const lat = product.value.latitude || 30.0444
    const lng = product.value.longitude || 31.2357
    const lang = locale.value === 'ar' ? 'ar' : 'en'
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=${lang}&z=15&output=embed`
})

const goBack = () => {
    router.back()
}

const goToOwnerProfile = () => {
    router.push(`/${locale.value}/owners/1`)
}

const goToCompare = () => {
    router.push(`/${locale.value}/compare?p1=${productId}`)
}
</script>

<template>
    <div class="min-h-screen bg-bg">
        <div v-if="product">
            <!-- Hero Section (Mobile-First Responsive Layout) -->
            <section class="relative min-h-[580px] lg:h-[72vh] flex flex-col justify-between overflow-hidden">
                <!-- Background Image with Gradients -->
                <div class="absolute inset-0 z-0">
                    <img 
                        :src="product.image" 
                        :alt="locale === 'ar' ? product.titleAr : product.titleEn" 
                        class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"></div>
                </div>

                <!-- Back to Properties Button -->
                <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 sm:pt-28">
                    <button 
                        @click="goBack" 
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all cursor-pointer border border-white/20 shadow-md active:scale-95 text-sm font-semibold"
                    >
                        <ArrowRight v-if="locale === 'ar'" class="w-4 h-4" />
                        <ArrowLeft v-else class="w-4 h-4" />
                        <span>{{ locale === 'ar' ? 'الرجوع للعقارات' : 'Back to Properties' }}</span>
                    </button>
                </div>
                
                <!-- Hero Content Overlay (Adaptive for Mobile & Desktop) -->
                <div class="relative z-10 w-full px-4 sm:px-6 pb-10 sm:pb-14 pt-16">
                    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 w-full">
                        
                        <!-- Title & Badges Left Column -->
                        <div 
                            v-motion
                            :initial="{ opacity: 0, y: 25 }"
                            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
                            class="w-full lg:max-w-3xl"
                        >
                            <!-- Rating & Category -->
                            <div class="flex items-center gap-3 mb-3 sm:mb-4">
                                <div class="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-white text-xs sm:text-sm font-bold">
                                    <Star class="w-4 h-4 fill-secondary text-secondary" />
                                    <span>{{ product.rating }} / 5</span>
                                </div>
                                <span 
                                    class="text-xs font-bold px-3 py-1 rounded-full shadow-sm"
                                    :class="product.negotiable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'"
                                >
                                    {{ product.negotiable 
                                        ? (locale === 'ar' ? 'قابل للتفاوض' : 'Negotiable') 
                                        : (locale === 'ar' ? 'غير قابل للتفاوض' : 'Non-negotiable') 
                                    }}
                                </span>
                            </div>

                            <!-- Title -->
                            <h1 
                                class="text-2xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-3 sm:mb-4 drop-shadow-md" 
                                :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                            >
                                {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                            </h1>

                            <!-- Location -->
                            <div class="flex items-center gap-2 text-white/90 text-sm sm:text-base font-medium">
                                <MapPin class="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                                <span>{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
                            </div>
                        </div>

                        <!-- Price & Action Card Right Column -->
                        <div 
                            class="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/30 shadow-2xl shrink-0 w-full sm:w-auto sm:min-w-[280px]"
                            v-motion
                            :initial="{ opacity: 0, y: 30 }"
                            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                        >
                            <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{{ t('products.priceType') }}</div>
                            <div class="text-2xl sm:text-3xl font-black text-primary mb-4">
                                {{ locale === 'ar' ? product.price.toLocaleString('ar-EG') : product.price.toLocaleString('en-US') }}
                                <span class="text-sm font-bold text-gray-700">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span>
                            </div>

                            <div class="space-y-2.5">
                                <button class="w-full bg-primary text-white py-3 px-4 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm">
                                    <Phone class="w-4 h-4" />
                                    <span>{{ t('products.contactUs') }}</span>
                                </button>
                                
                                <!-- Watch Video Tour Button -->
                                <button 
                                    @click="openVideoModal"
                                    class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group text-sm"
                                >
                                    <Play class="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                                    <span>{{ locale === 'ar' ? 'مشاهدة فيديو العقار' : 'Watch Video Tour' }}</span>
                                </button>

                                <!-- Compare Property Button -->
                                <button 
                                    @click="goToCompare"
                                    class="w-full bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group text-sm"
                                >
                                    <Scale class="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                                    <span>{{ locale === 'ar' ? 'مقارنة هذا العقار' : 'Compare Property' }}</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- Details Content Grid -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                
                <!-- Main Content Column -->
                <div class="lg:col-span-2 space-y-8 sm:space-y-12">
                    <!-- Quick Stats (Responsive Grid) -->
                    <div 
                        class="grid grid-cols-3 gap-3 sm:gap-4"
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                    >
                        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-sm text-center">
                            <Bed class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ product.bedrooms }}</div>
                            <div class="text-xs sm:text-sm text-gray-500">{{ t('products.bedrooms') }}</div>
                        </div>
                        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-sm text-center">
                            <Bath class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ product.bathrooms }}</div>
                            <div class="text-xs sm:text-sm text-gray-500">{{ t('products.bathrooms') }}</div>
                        </div>
                        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-sm text-center">
                            <Square class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            <div class="text-lg sm:text-2xl font-bold text-gray-900">{{ product.area }}</div>
                            <div class="text-xs sm:text-sm text-gray-500">{{ t('products.area') }}</div>
                        </div>
                    </div>

                    <!-- Interactive Image Gallery with Amazon-style Zoom & Mobile Lightbox Modal -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 50 } }"
                        class="bg-white p-4 sm:p-7 rounded-2xl border border-gray-200 shadow-sm space-y-5"
                    >
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Eye class="w-5 h-5 text-primary" />
                                <span>{{ locale === 'ar' ? 'معرض صور العقار' : 'Property Photo Gallery' }}</span>
                            </h3>
                            <span class="text-xs text-gray-500 hidden sm:flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                                <ZoomIn class="w-4 h-4 text-primary" />
                                <span>{{ locale === 'ar' ? 'مرر الماوس للتكبير أو اضغط لفتح المعرض' : 'Hover to zoom or click to open' }}</span>
                            </span>
                        </div>

                        <!-- Main Display Image (Zoom on Desktop, Clickable to open Fullscreen Modal on both) -->
                        <div 
                            ref="imageContainerRef"
                            @mousemove="handleMouseMove"
                            @mouseenter="handleMouseEnter"
                            @mouseleave="handleMouseLeave"
                            @click="openImageModal(selectedImage)"
                            class="relative h-[260px] sm:h-[420px] md:h-[480px] w-full rounded-2xl overflow-hidden bg-gray-950 border border-gray-200 cursor-pointer md:cursor-crosshair group select-none shadow-md"
                        >
                            <img 
                                :src="selectedImage" 
                                :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                                class="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
                                :style="{
                                    transform: isZoomActive ? 'scale(2.2)' : 'scale(1)',
                                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                                }"
                            />

                            <!-- Zoom / Tap indicator Badge -->
                            <div 
                                v-if="!isZoomActive"
                                class="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 pointer-events-none transition-opacity group-hover:opacity-0"
                            >
                                <Maximize2 class="w-3.5 h-3.5 text-secondary" />
                                <span>{{ locale === 'ar' ? 'اضغط لعرض كامل' : 'Click to View' }}</span>
                            </div>
                        </div>

                        <!-- Fullscreen View Button for Active Image (Works on Mobile & Desktop) -->
                        <button 
                            @click="openImageModal(selectedImage)"
                            class="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 group"
                        >
                            <Maximize2 class="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                            <span>{{ locale === 'ar' ? 'عرض الصورة بالحجم الكامل (ملء الشاشة)' : 'View Image in Fullscreen' }}</span>
                        </button>

                        <!-- Thumbnails Selector Strip -->
                        <div v-if="product.images && product.images.length" class="space-y-2 pt-1">
                            <div class="text-xs font-bold text-gray-500">
                                {{ locale === 'ar' ? 'تصفح صور العقار:' : 'Select Photo to View:' }}
                            </div>
                            <div class="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                                <button
                                    v-for="(img, idx) in product.images"
                                    :key="idx"
                                    @click="selectImage(img)"
                                    class="relative h-18 w-20 sm:h-24 sm:w-32 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 shadow-2xs hover:scale-105"
                                    :class="selectedImage === img ? 'border-primary ring-3 ring-primary/25 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'"
                                >
                                    <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
                                    <div v-if="selectedImage === img" class="absolute inset-0 bg-primary/10"></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
                        class="bg-white p-5 sm:p-7 rounded-2xl border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-xl font-bold text-gray-900 mb-4">{{ t('products.description') }}</h3>
                        <p class="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                            {{ locale === 'ar' ? product.descriptionAr : product.descriptionEn }}
                        </p>
                    </div>

                    <!-- Features -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
                        class="bg-white p-5 sm:p-7 rounded-2xl border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-xl font-bold text-gray-900 mb-5">{{ t('products.features') }}</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div 
                                v-for="(feature, index) in (locale === 'ar' ? product.featuresAr : product.featuresEn)" 
                                :key="index"
                                class="flex items-center gap-3 bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-100 shadow-2xs"
                            >
                                <CheckCircle2 class="w-5 h-5 text-accent shrink-0" />
                                <span class="text-gray-800 font-semibold text-sm sm:text-base">{{ feature }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Interactive Google Maps Section -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
                        class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-sm overflow-hidden"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MapPin class="w-5 h-5 text-primary" />
                                <span>{{ locale === 'ar' ? 'موقع العقار على Google Maps' : 'Property Location on Google Maps' }}</span>
                            </h3>
                            <span class="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                                {{ locale === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map' }}
                            </span>
                        </div>
                        <div class="relative w-full h-[280px] sm:h-[380px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                            <iframe 
                                :src="mapEmbedUrl" 
                                class="w-full h-full border-0" 
                                loading="lazy"
                                allowfullscreen
                                title="Property Location on Google Maps"
                            ></iframe>
                        </div>
                        <div class="mt-3 text-xs sm:text-sm text-gray-600 flex items-center gap-2 font-medium">
                            <MapPin class="w-4 h-4 text-primary shrink-0" />
                            <span>{{ locale === 'ar' ? product.locationAr : product.locationEn }}</span>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Column -->
                <div class="space-y-8">
                    <!-- Owner Card -->
                    <div 
                        class="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 lg:sticky lg:top-32 shadow-sm"
                        v-motion
                        :initial="{ opacity: 0, x: locale === 'ar' ? -30 : 30 }"
                        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
                    >
                        <h3 class="text-xl font-bold text-gray-900 mb-6">{{ locale === 'ar' ? 'صاحب العقار' : 'Listed By' }}</h3>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Owner" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-lg">{{ locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed' }}</div>
                                <div class="text-primary text-sm font-bold flex items-center gap-1">
                                    <BadgeCheck class="w-4 h-4" />
                                    {{ locale === 'ar' ? 'مالك موثق' : 'Verified Owner' }}
                                </div>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <button 
                                @click="goToOwnerProfile"
                                class="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl transition-colors border border-gray-200 font-bold text-sm cursor-pointer"
                            >
                                {{ locale === 'ar' ? 'عرض الملف الشخصي' : 'View Profile' }}
                            </button>
                            <button class="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                                <Phone class="w-4 h-4" />
                                {{ locale === 'ar' ? 'إرسال رسالة' : 'Send Message' }}
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
        
        <div v-else>
            <!-- 404 State -->
            <div class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
                <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p class="text-xl text-gray-500 mb-8">{{ locale === 'ar' ? 'العقار غير موجود' : 'Property not found' }}</p>
                <button @click="router.push(`/${locale}/products`)" class="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors font-semibold cursor-pointer">
                    {{ locale === 'ar' ? 'العودة للعقارات' : 'Back to Properties' }}
                </button>
            </div>
        </div>

        <!-- Fullscreen Image Lightbox Modal Overlay (Responsive for Mobile & Desktop) -->
        <Teleport to="body">
            <Transition 
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div 
                    v-if="isImageModalOpen && product" 
                    class="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-md select-none"
                    @click.self="closeImageModal"
                >
                    <!-- Modal Top Bar -->
                    <div class="w-full max-w-6xl flex items-center justify-between text-white py-2 z-10">
                        <div class="flex items-center gap-3">
                            <span class="px-3 py-1 bg-white/15 rounded-full text-xs font-bold font-mono">
                                {{ (currentModalIndex + 1) }} / {{ (product.images?.length || 1) }}
                            </span>
                            <span class="font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                                {{ locale === 'ar' ? product.titleAr : product.titleEn }}
                            </span>
                        </div>
                        <button 
                            @click="closeImageModal"
                            class="p-2.5 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                            title="Close"
                        >
                            <X class="w-6 h-6" />
                        </button>
                    </div>

                    <!-- Center Image & Navigation Arrows -->
                    <div class="relative flex-1 w-full max-w-6xl flex items-center justify-center my-2 overflow-hidden">
                        <!-- Prev Arrow -->
                        <button 
                            v-if="product.images && product.images.length > 1"
                            @click.stop="prevModalImage"
                            class="absolute left-2 sm:left-4 z-20 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all backdrop-blur-sm cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        >
                            <ArrowLeft class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <!-- Active Image Display -->
                        <img 
                            :src="currentModalImage" 
                            :alt="locale === 'ar' ? product.titleAr : product.titleEn" 
                            class="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                        />

                        <!-- Next Arrow -->
                        <button 
                            v-if="product.images && product.images.length > 1"
                            @click.stop="nextModalImage"
                            class="absolute right-2 sm:right-4 z-20 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all backdrop-blur-sm cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                        >
                            <ArrowRight class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    <!-- Bottom Modal Thumbnails Strip -->
                    <div v-if="product.images && product.images.length" class="w-full max-w-2xl flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 z-10 scrollbar-none">
                        <button
                            v-for="(img, idx) in product.images"
                            :key="idx"
                            @click.stop="currentModalImage = img; selectedImage = img"
                            class="relative h-12 w-14 sm:h-16 sm:w-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 shadow-sm"
                            :class="currentModalImage === img ? 'border-secondary scale-105 ring-2 ring-secondary/50' : 'border-white/20 opacity-50 hover:opacity-100'"
                        >
                            <img :src="img" :alt="`Modal thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Video Tour Modal Overlay -->
        <Teleport to="body">
            <Transition 
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div 
                    v-if="isVideoModalOpen && product" 
                    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
                    @click.self="closeVideoModal"
                >
                    <div class="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800 bg-gray-900/90">
                            <div class="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
                                <Video class="w-5 h-5 text-red-500 shrink-0" />
                                <span class="truncate max-w-[200px] sm:max-w-md">{{ locale === 'ar' ? product.titleAr : product.titleEn }}</span>
                            </div>
                            <button 
                                @click="closeVideoModal"
                                class="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                        <!-- Video Frame -->
                        <div class="relative aspect-video w-full bg-black">
                            <iframe 
                                :src="product.videoUrl + '?autoplay=1'" 
                                class="w-full h-full border-0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
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
