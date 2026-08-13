<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Calendar, User, ArrowRight } from 'lucide-vue-next'

const { locale } = useI18n()

const blogPosts = [
    {
        id: 1,
        titleEn: 'The Future of Smart Home Technology',
        titleAr: 'مستقبل تقنيات المنزل الذكي',
        excerptEn: 'Discover how smart home technology is revolutionizing the way we live, from automated lighting to AI-driven climate control.',
        excerptAr: 'اكتشف كيف تُحدث تقنيات المنزل الذكي ثورة في طريقة حياتنا، من الإضاءة الآلية إلى التحكم المناخي بالذكاء الاصطناعي.',
        date: '2024-03-15',
        author: 'Ahmed Hassan',
        image: new URL('../../../assets/images/product1.png', import.meta.url).href,
        category: 'Technology'
    },
    {
        id: 2,
        titleEn: 'Interior Design Trends for Modern Homes',
        titleAr: 'اتجاهات التصميم الداخلي للمنازل الحديثة',
        excerptEn: 'Explore the latest interior design trends that are shaping modern living spaces with elegance and functionality.',
        excerptAr: 'استكشف أحدث اتجاهات التصميم الداخلي التي تشكل المساحات السكنية الحديثة بأناقة ووظائف عملية.',
        date: '2024-02-20',
        author: 'Sara Ali',
        image: new URL('../../../assets/images/product2.png', import.meta.url).href,
        category: 'Design'
    },
    {
        id: 3,
        titleEn: 'Investing in Real Estate: A Beginner\'s Guide',
        titleAr: 'الاستثمار العقاري: دليل المبتدئين',
        excerptEn: 'Everything you need to know about getting started in real estate investment and building long-term wealth.',
        excerptAr: 'كل ما تحتاج لمعرفته عن بدء الاستثمار العقاري وبناء الثروة على المدى الطويل.',
        date: '2024-01-10',
        author: 'Omar Khaled',
        image: new URL('../../../assets/images/product3.png', import.meta.url).href,
        category: 'Investment'
    },
    {
        id: 4,
        titleEn: 'Sustainable Building Materials for Your Home',
        titleAr: 'مواد البناء المستدامة لمنزلك',
        excerptEn: 'Learn about eco-friendly building materials that reduce environmental impact without compromising on quality.',
        excerptAr: 'تعرف على مواد البناء الصديقة للبيئة التي تقلل الأثر البيئي دون المساومة على الجودة.',
        date: '2024-03-01',
        author: 'Nour Mahmoud',
        image: new URL('../../../assets/images/product4.png', import.meta.url).href,
        category: 'Sustainability'
    },
    {
        id: 5,
        titleEn: 'How to Choose the Perfect Location for Your Home',
        titleAr: 'كيف تختار الموقع المثالي لمنزلك',
        excerptEn: 'Location is everything in real estate. Here are the key factors to consider when choosing where to buy your next property.',
        excerptAr: 'الموقع هو كل شيء في العقارات. إليك العوامل الأساسية التي يجب مراعاتها عند اختيار مكان شراء عقارك القادم.',
        date: '2024-02-05',
        author: 'Laila Youssef',
        image: new URL('../../../assets/images/room1.png', import.meta.url).href,
        category: 'Tips'
    },
    {
        id: 6,
        titleEn: 'Renovating vs. Building New: What\'s Best for You?',
        titleAr: 'التجديد مقابل البناء الجديد: ما الأفضل لك؟',
        excerptEn: 'We break down the pros and cons of renovating an existing home versus building a brand-new one from scratch.',
        excerptAr: 'نحلل إيجابيات وسلبيات تجديد منزل قائم مقابل بناء منزل جديد من الصفر.',
        date: '2024-01-25',
        author: 'Karim Farid',
        image: new URL('../../../assets/images/room2.png', import.meta.url).href,
        category: 'Construction'
    }
]
</script>

<template>
    <div class="min-h-screen bg-bg">
        <!-- Hero Section -->
        <section class="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img 
                    src="../../../assets/images/Rectangle 110.png" 
                    alt="Blog Hero" 
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
                    {{ locale === 'ar' ? 'المدونة' : 'Our Blog' }}
                </h1>
                <p class="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                    {{ locale === 'ar' ? 'أحدث المقالات والأخبار من عالم العقارات' : 'Latest articles and news from the real estate world' }}
                </p>
            </div>
        </section>

        <!-- Blog Grid -->
        <section class="max-w-7xl mx-auto px-6 py-20">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article 
                    v-for="(post, index) in blogPosts" 
                    :key="post.id"
                    class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200/60 cursor-pointer"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
                >
                    <!-- Post Image -->
                    <div class="relative h-56 overflow-hidden">
                        <img 
                            :src="post.image" 
                            :alt="locale === 'ar' ? post.titleAr : post.titleEn"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                            {{ post.category }}
                        </div>
                    </div>

                    <!-- Post Content -->
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-gray-400 text-sm mb-3">
                            <div class="flex items-center gap-1">
                                <Calendar class="w-4 h-4" />
                                <span>{{ post.date }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <User class="w-4 h-4" />
                                <span>{{ post.author }}</span>
                            </div>
                        </div>

                        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {{ locale === 'ar' ? post.titleAr : post.titleEn }}
                        </h3>
                        <p class="text-gray-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                            {{ locale === 'ar' ? post.excerptAr : post.excerptEn }}
                        </p>

                        <div class="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                            <span>{{ locale === 'ar' ? 'اقرأ المزيد' : 'Read More' }}</span>
                            <ArrowRight class="w-4 h-4" :class="locale === 'ar' ? 'rotate-180' : ''" />
                        </div>
                    </div>
                </article>
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
