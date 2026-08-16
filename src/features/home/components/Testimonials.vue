<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Star, Quote, BadgeCheck, UserCheck, Sparkles, Building2, ShoppingBag } from 'lucide-vue-next'

const { t, locale } = useI18n()

interface Review {
    id: number;
    nameAr: string;
    nameEn: string;
    role: 'seller' | 'buyer';
    rating: number;
    textAr: string;
    textEn: string;
    propertyAr: string;
    propertyEn: string;
    avatar: string;
    dateAr: string;
    dateEn: string;
}

const reviews = ref<Review[]>([
    {
        id: 1,
        nameAr: 'م. كريم سامي',
        nameEn: 'Eng. Karim Samy',
        role: 'seller',
        rating: 5,
        textAr: 'تجربة بيع فيلتي في القاهرة الجديدة كانت استثنائية وسريعة جداً. خلال أقل من أسبوع تواصل معي مشترين جادين وتم إتمام الصفقة بسعر ممتاز وشفافية كاملة دون أي وسائط مرهقة.',
        textEn: 'Selling my villa in New Cairo was an exceptional and seamless experience. Within less than a week, verified buyers reached out and we finalized the deal smoothly.',
        propertyAr: 'فيلا فاخرة - القاهرة الجديدة',
        propertyEn: 'Luxury Villa - New Cairo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        dateAr: 'منذ أسبوعين',
        dateEn: '2 weeks ago'
    },
    {
        id: 2,
        nameAr: 'سارة الشناوي',
        nameEn: 'Sarah El-Shennawy',
        role: 'buyer',
        rating: 5,
        textAr: 'وجدت استوديو أحلامي في دجلة المعادي بمواصفات دقيقة كما هي في الصور وفيديو المعاينة. الشفافية العالية وإمكانية التواصل المباشر مع المالك جعلت التجربة مريحة وآمنة جداً.',
        textEn: 'Found my dream studio in Degla Maadi exactly as described in the HD photos and video tour. High transparency and direct owner contact made everything stress-free.',
        propertyAr: 'استوديو مودرن - المعادي',
        propertyEn: 'Modern Studio - Maadi',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        dateAr: 'منذ شهر',
        dateEn: '1 month ago'
    },
    {
        id: 3,
        nameAr: 'د. طارق عبد العزيز',
        nameEn: 'Dr. Tarek Abdelaziz',
        role: 'buyer',
        rating: 5,
        textAr: 'أفضل منصة عقارية تعاملت معها على الإطلاق. خريطة Google Maps التفاعلية وميزة مقارنة العقارات ساعدتني في المقارنة بدقة وحسم قراري لشراء شاليه بالساحل الشمالي بكل ثقة.',
        textEn: 'The best real estate platform I have ever used. The interactive Google Map and side-by-side comparison tool helped me choose my North Coast chalet with complete confidence.',
        propertyAr: 'شاليه ساحلي - الساحل الشمالي',
        propertyEn: 'Waterfront Chalet - North Coast',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        dateAr: 'منذ 3 أسابيع',
        dateEn: '3 weeks ago'
    },
    {
        id: 4,
        nameAr: 'م. ياسمين خالد',
        nameEn: 'Yasmine Khaled',
        role: 'seller',
        rating: 5,
        textAr: 'عرضت شقتي اللوفت في الشيخ زايد، ونظام عرض الصور عالي الدقة وسهولة تفاوض الأسعار جذب عملاء مهتمين وموثوقين في أيام معدودة. الدعم الفني وسرعة الاستجابة فاقت التوقعات.',
        textEn: 'Listed my designer loft in Sheikh Zayed, and the HD photo presentation and clear pricing attracted serious clients in days. Responsive and trusted platform!',
        propertyAr: 'شقة لوفت - الشيخ زايد',
        propertyEn: 'Designer Loft - Sheikh Zayed',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        dateAr: 'منذ أسبوع',
        dateEn: '1 week ago'
    }
])
</script>

<template>
    <section class="py-24 md:py-32 bg-gray-50/70 border-t border-gray-200/70 overflow-hidden relative">
        <!-- Subtle Glow Elements -->
        <div class="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            
            <!-- Section Header -->
            <div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div 
                    v-motion
                    :initial="{ opacity: 0, y: -20 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                    class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold"
                >
                    <Sparkles class="w-4 h-4" />
                    <span>{{ t('testimonials.tag') }}</span>
                </div>

                <h2 
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
                    class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                >
                    {{ t('testimonials.title') }}
                </h2>

                <p 
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                    class="text-gray-600 text-base sm:text-lg font-light leading-relaxed"
                >
                    {{ t('testimonials.subtitle') }}
                </p>
            </div>

            <!-- Reviews Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                    v-for="(rev, idx) in reviews" 
                    :key="rev.id"
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: idx * 100 } }"
                    class="bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
                >
                    <!-- Top Quote Icon & Role Badge -->
                    <div class="flex items-center justify-between mb-6">
                        <!-- Role Badge: Buyer or Seller -->
                        <div class="flex items-center gap-2">
                            <span 
                                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
                                :class="rev.role === 'seller' ? 'bg-amber-50 text-amber-800 border border-amber-200/70' : 'bg-blue-50 text-blue-800 border border-blue-200/70'"
                            >
                                <Building2 v-if="rev.role === 'seller'" class="w-3.5 h-3.5" />
                                <ShoppingBag v-else class="w-3.5 h-3.5" />
                                <span>{{ rev.role === 'seller' ? t('testimonials.seller') : t('testimonials.buyer') }}</span>
                            </span>

                            <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                <BadgeCheck class="w-3.5 h-3.5 text-emerald-600" />
                                <span>{{ t('testimonials.verifiedReview') }}</span>
                            </span>
                        </div>

                        <div class="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                            <Quote class="w-5 h-5" />
                        </div>
                    </div>

                    <!-- Stars & Rating Score -->
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex items-center gap-1">
                            <Star 
                                v-for="star in 5" 
                                :key="star" 
                                class="w-4 h-4 text-amber-400 fill-amber-400" 
                            />
                        </div>
                        <span class="font-extrabold text-sm text-gray-800">
                            {{ rev.rating }} / 5
                        </span>
                        <span class="text-xs text-gray-400">
                            ({{ rev.rating === 5 ? (locale === 'ar' ? 'ممتاز' : 'Excellent') : (locale === 'ar' ? 'جيد جداً' : 'Very Good') }})
                        </span>
                    </div>

                    <!-- Review Text -->
                    <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        "{{ locale === 'ar' ? rev.textAr : rev.textEn }}"
                    </p>

                    <!-- User Info & Property Tag -->
                    <div class="pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div class="flex items-center gap-3.5">
                            <img 
                                :src="rev.avatar" 
                                :alt="locale === 'ar' ? rev.nameAr : rev.nameEn" 
                                class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary/40 transition-all shadow-sm"
                            />
                            <div>
                                <h4 class="font-bold text-gray-900 text-sm sm:text-base" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                                    {{ locale === 'ar' ? rev.nameAr : rev.nameEn }}
                                </h4>
                                <p class="text-xs text-gray-400 font-medium">
                                    {{ locale === 'ar' ? rev.propertyAr : rev.propertyEn }}
                                </p>
                            </div>
                        </div>

                        <span class="text-xs text-gray-400 font-light hidden sm:inline-block">
                            {{ locale === 'ar' ? rev.dateAr : rev.dateEn }}
                        </span>
                    </div>
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
</style>
