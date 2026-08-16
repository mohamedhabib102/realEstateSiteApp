<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Calendar, User, ArrowRight, Clock } from 'lucide-vue-next'
import { blogPosts } from '../../../data/blogPosts'

const { locale } = useI18n()
const router = useRouter()

const goToPost = (id: number) => {
    router.push(`/${locale.value}/blog/${id}`)
}
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
                <h1 class="text-4xl md:text-6xl text-white font-bold mb-4" :class="locale === 'ar' ? 'font-cairo' : ''">
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
                    @click="goToPost(post.id)"
                    class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 cursor-pointer hover:-translate-y-1"
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
                        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <!-- Category Badge -->
                        <div class="absolute top-4 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-sm"
                            :class="locale === 'ar' ? 'right-4' : 'left-4'">
                            {{ locale === 'ar' ? post.categoryAr : post.categoryEn }}
                        </div>
                    </div>

                    <!-- Post Content -->
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-gray-400 text-xs mb-3">
                            <div class="flex items-center gap-1.5">
                                <Calendar class="w-3.5 h-3.5" />
                                <span>{{ locale === 'ar' ? post.dateAr : post.date }}</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <User class="w-3.5 h-3.5" />
                                <span>{{ locale === 'ar' ? post.authorAr : post.authorEn }}</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <Clock class="w-3.5 h-3.5" />
                                <span>{{ locale === 'ar' ? post.readTimeAr : post.readTimeEn }}</span>
                            </div>
                        </div>

                        <h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                            :class="locale === 'ar' ? 'font-cairo' : ''">
                            {{ locale === 'ar' ? post.titleAr : post.titleEn }}
                        </h3>
                        <p class="text-gray-500 mb-5 line-clamp-3 text-sm leading-relaxed">
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
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
