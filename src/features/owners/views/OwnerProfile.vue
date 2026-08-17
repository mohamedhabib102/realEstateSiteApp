<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '../../../data/products'
import { 
    MapPin, BadgeCheck, Star, Home, TrendingUp, MessageCircle, 
    ArrowLeft, ArrowRight, Phone, Calendar, BarChart3
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const owner = computed(() => ({
    id: '1',
    nameEn: 'Ahmed Mohamed',
    nameAr: 'أحمد محمد',
    titleEn: 'Senior Real Estate Consultant',
    titleAr: 'مستشار عقاري أول',
    bioEn: 'With over 12 years of experience in the Egyptian real estate market, Ahmed specializes in luxury residential properties across New Cairo, Zamalek, and the North Coast. Known for his integrity, market knowledge, and client-first approach.',
    bioAr: 'بخبرة تمتد لأكثر من 12 عاماً في سوق العقارات المصري، يتخصص أحمد في العقارات السكنية الفاخرة في القاهرة الجديدة والزمالك والساحل الشمالي. معروف بنزاهته ومعرفته الواسعة بالسوق ونهجه المتمحور حول العميل.',
    cityEn: 'Cairo, Egypt',
    cityAr: 'القاهرة، مصر',
    memberSince: '2019',
    verified: true,
    propertiesCount: 24,
    soldCount: 18,
    responseRate: 97,
    rating: 4.9,
    reviewsCount: 143,
    phone: '+20 100 123 4567',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    banner: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1400'
}))

const ownerListings = computed(() => products.slice(0, 3))

const activeTab = ref<'listings' | 'reviews'>('listings')

const stats = computed(() => [
    { icon: Home,         value: owner.value.propertiesCount,        labelEn: 'Listed Properties', labelAr: 'العقارات المنشورة', bg: 'bg-blue-50',   color: 'text-primary' },
    { icon: TrendingUp,   value: owner.value.soldCount,              labelEn: 'Properties Sold',   labelAr: 'العقارات المباعة',  bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { icon: MessageCircle, value: `${owner.value.responseRate}%`,    labelEn: 'Response Rate',     labelAr: 'معدل الاستجابة',    bg: 'bg-amber-50',   color: 'text-amber-600' },
    { icon: Star,         value: owner.value.rating,                 labelEn: 'Average Rating',    labelAr: 'متوسط التقييم',     bg: 'bg-purple-50',  color: 'text-purple-600' }
])

const mockReviews = [
    { id: 1, nameEn: 'Sarah Johnson', nameAr: 'سارة جونسون', rating: 5, dateEn: 'March 2026', dateAr: 'مارس 2026',
      commentEn: 'Ahmed was incredibly professional and helped us find our dream home in record time. Highly recommended!',
      commentAr: 'كان أحمد محترفاً للغاية وساعدنا في إيجاد منزل أحلامنا في وقت قياسي. أنصح به بشدة!' },
    { id: 2, nameEn: 'Mohamed Hassan', nameAr: 'محمد حسن', rating: 5, dateEn: 'January 2026', dateAr: 'يناير 2026',
      commentEn: 'Excellent service and deep knowledge of the market. Found the perfect property within our budget.',
      commentAr: 'خدمة ممتازة ومعرفة عميقة بالسوق. وجدنا العقار المثالي ضمن ميزانيتنا.' },
    { id: 3, nameEn: 'Layla Ibrahim', nameAr: 'ليلى إبراهيم', rating: 4, dateEn: 'November 2025', dateAr: 'نوفمبر 2025',
      commentEn: 'Very responsive and knowledgeable. Made the whole buying process smooth and stress-free.',
      commentAr: 'سريع الاستجابة وواسع المعرفة. جعل عملية الشراء سلسة وخالية من التوتر.' }
]
</script>

<template>
    <div class="min-h-screen bg-[#F9FAFB]">

        <!-- Banner -->
        <section class="relative h-64 md:h-72 overflow-hidden">
            <img :src="owner.banner" alt="Banner" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50"></div>
        </section>

        <!-- Profile Card -->
        <section class="max-w-6xl mx-auto px-6">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-md px-6 pt-0 pb-6 -mt-12 relative z-10">
                <div class="flex flex-col md:flex-row gap-5 items-start md:items-end">
                    <!-- Avatar -->
                    <div
                        v-motion :initial="{ opacity: 0, scale: 0.7 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 100 } }"
                        class="relative -mt-12 shrink-0"
                    >
                        <div class="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-gray-200">
                            <img :src="owner.avatar" alt="Owner" class="w-full h-full object-cover" />
                        </div>
                        <div v-if="owner.verified"
                            class="absolute bottom-1 bg-primary text-white rounded-full p-1.5 shadow-lg"
                            :class="locale === 'ar' ? 'left-1' : 'right-1'"
                        >
                            <BadgeCheck class="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <!-- Info -->
                    <div
                        v-motion :initial="{ opacity: 0, x: locale === 'ar' ? 30 : -30 }" :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 200 } }"
                        class="flex-1 pt-4 md:pt-2"
                    >
                        <div class="flex flex-wrap items-center gap-3 mb-1">
                            <h1 class="text-2xl font-bold text-gray-900" :class="locale === 'ar' ? 'font-cairo' : ''">
                                {{ locale === 'ar' ? owner.nameAr : owner.nameEn }}
                            </h1>
                            <span v-if="owner.verified"
                                class="flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20"
                            >
                                <BadgeCheck class="w-3 h-3" />
                                {{ locale === 'ar' ? 'مالك موثق' : 'Verified Owner' }}
                            </span>
                        </div>
                        <p class="text-primary font-medium text-sm mb-2">{{ locale === 'ar' ? owner.titleAr : owner.titleEn }}</p>
                        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <div class="flex items-center gap-1"><MapPin class="w-3.5 h-3.5 text-primary" /><span>{{ locale === 'ar' ? owner.cityAr : owner.cityEn }}</span></div>
                            <div class="flex items-center gap-1"><Calendar class="w-3.5 h-3.5 text-primary" /><span>{{ locale === 'ar' ? `عضو منذ ${owner.memberSince}` : `Member Since ${owner.memberSince}` }}</span></div>
                            <div class="flex items-center gap-1.5"><Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span class="font-semibold text-gray-700">{{ owner.rating }}</span><span>({{ owner.reviewsCount }} {{ locale === 'ar' ? 'تقييم' : 'reviews' }})</span></div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div
                        v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
                        class="flex gap-2 pt-4 md:pt-2 shrink-0"
                    >
                        <button class="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm cursor-pointer">
                            <Phone class="w-4 h-4 text-primary" />
                            {{ locale === 'ar' ? 'اتصال' : 'Call' }}
                        </button>
                        <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium text-sm cursor-pointer">
                            <MessageCircle class="w-4 h-4" />
                            {{ locale === 'ar' ? 'رسالة' : 'Message' }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats -->
        <section class="max-w-6xl mx-auto px-6 mt-6 mb-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    v-for="(stat, i) in stats" :key="i"
                    v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 80 } }"
                    class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4"
                >
                    <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :class="stat.bg">
                        <component :is="stat.icon" class="w-5 h-5" :class="stat.color" />
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
                        <div class="text-xs text-gray-500 mt-0.5">{{ locale === 'ar' ? stat.labelAr : stat.labelEn }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="max-w-6xl mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <!-- Left -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- About -->
                    <div v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-3" :class="locale === 'ar' ? 'font-cairo' : ''">
                            {{ locale === 'ar' ? 'عن المالك' : 'About the Owner' }}
                        </h2>
                        <p class="text-gray-600 leading-relaxed text-sm">{{ locale === 'ar' ? owner.bioAr : owner.bioEn }}</p>
                    </div>

                    <!-- Tabs -->
                    <div v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
                        <div class="flex gap-1 p-1 bg-gray-100 rounded-xl mb-5 w-fit">
                            <button @click="activeTab = 'listings'"
                                class="px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                                :class="activeTab === 'listings' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                            >{{ locale === 'ar' ? 'العقارات' : 'Properties' }}</button>
                            <button @click="activeTab = 'reviews'"
                                class="px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                                :class="activeTab === 'reviews' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                            >
                                {{ locale === 'ar' ? 'التقييمات' : 'Reviews' }}
                                <span class="ms-1 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{{ owner.reviewsCount }}</span>
                            </button>
                        </div>

                        <!-- Listings -->
                        <div v-if="activeTab === 'listings'" class="space-y-4">
                            <div v-for="(product, idx) in ownerListings" :key="product.id"
                                v-motion :initial="{ opacity: 0, x: locale === 'ar' ? 20 : -20 }" :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 500, delay: idx * 100 } }"
                                @click="$router.push(`/${locale}/products/${product.id}`)"
                                class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex cursor-pointer hover:shadow-md transition-all group"
                            >
                                <div class="w-32 h-24 shrink-0 overflow-hidden">
                                    <img :src="product.image" :alt="locale === 'ar' ? product.titleAr : product.titleEn"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div class="flex-1 p-4 flex flex-col justify-between">
                                    <div class="font-bold text-gray-900 text-sm line-clamp-1">{{ locale === 'ar' ? product.titleAr : product.titleEn }}</div>
                                    <div class="flex items-center gap-1 text-xs text-gray-400">
                                        <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? product.locationAr : product.locationEn }}
                                    </div>
                                    <div class="flex items-center justify-between mt-1">
                                        <span class="text-primary font-bold text-sm">
                                            {{ locale === 'ar' ? product.price.toLocaleString('ar-EG') : product.price.toLocaleString('en-US') }}
                                            <span class="text-xs text-gray-400 font-normal"> {{ locale === 'ar' ? 'ج.م' : 'EGP' }} / {{ locale === 'ar' ? product.priceTypeAr : product.priceTypeEn }}</span>
                                        </span>
                                        <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
                                            :class="product.negotiable ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'">
                                            {{ product.negotiable ? (locale === 'ar' ? 'قابل للتفاوض' : 'Negotiable') : (locale === 'ar' ? 'غير قابل' : 'Fixed') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button class="w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-xl hover:border-primary hover:text-primary transition-all text-sm cursor-pointer">
                                {{ locale === 'ar' ? 'عرض جميع العقارات' : 'View All Properties' }} ({{ owner.propertiesCount }})
                            </button>
                        </div>

                        <!-- Reviews -->
                        <div v-if="activeTab === 'reviews'" class="space-y-4">
                            <div v-for="(review, idx) in mockReviews" :key="review.id"
                                v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: idx * 100 } }"
                                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                            >
                                <div class="flex items-start gap-4">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {{ (locale === 'ar' ? review.nameAr : review.nameEn).charAt(0) }}
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="font-bold text-gray-900 text-sm">{{ locale === 'ar' ? review.nameAr : review.nameEn }}</span>
                                            <span class="text-xs text-gray-400">{{ locale === 'ar' ? review.dateAr : review.dateEn }}</span>
                                        </div>
                                        <div class="flex gap-0.5 mb-2">
                                            <Star v-for="s in 5" :key="s" class="w-3.5 h-3.5"
                                                :class="s <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'" />
                                        </div>
                                        <p class="text-gray-600 text-sm leading-relaxed">{{ locale === 'ar' ? review.commentAr : review.commentEn }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div>
                    <div v-motion :initial="{ opacity: 0, x: locale === 'ar' ? -20 : 20 }" :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28"
                    >
                        <h3 class="font-bold text-gray-900 mb-5">{{ locale === 'ar' ? 'تواصل مع المالك' : 'Contact Owner' }}</h3>

                        <!-- Rating -->
                        <div class="flex items-center gap-3 mb-5 p-3 bg-amber-50 rounded-xl border border-amber-100">
                            <div class="text-3xl font-bold text-amber-500">{{ owner.rating }}</div>
                            <div>
                                <div class="flex gap-0.5 mb-0.5">
                                    <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400 text-amber-400" />
                                </div>
                                <div class="text-xs text-gray-500">{{ owner.reviewsCount }} {{ locale === 'ar' ? 'تقييم' : 'reviews' }}</div>
                            </div>
                        </div>

                        <!-- Response Rate -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1.5">
                                <span class="text-xs text-gray-500 font-medium">{{ locale === 'ar' ? 'معدل الاستجابة' : 'Response Rate' }}</span>
                                <span class="text-xs font-bold text-emerald-600">{{ owner.responseRate }}%</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2">
                                <div class="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full" :style="{ width: `${owner.responseRate}%` }"></div>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div class="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <Phone class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-sm text-gray-700" dir="ltr">{{ owner.phone }}</span>
                        </div>

                        <div class="space-y-3">
                            <button class="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 cursor-pointer">
                                <MessageCircle class="w-4 h-4" />{{ locale === 'ar' ? 'إرسال رسالة' : 'Send Message' }}
                            </button>
                            <button class="w-full py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer">
                                <Phone class="w-4 h-4 text-primary" />{{ locale === 'ar' ? 'اتصال مباشر' : 'Direct Call' }}
                            </button>
                        </div>

                        <div class="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
                            <BarChart3 class="w-3.5 h-3.5" />
                            {{ locale === 'ar' ? `عضو نشط منذ ${owner.memberSince}` : `Active since ${owner.memberSince}` }}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<style scoped>
.font-cairo { font-family: 'Cairo', sans-serif; }
.line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
</style>
