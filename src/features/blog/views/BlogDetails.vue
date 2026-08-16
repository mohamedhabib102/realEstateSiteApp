<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { blogPosts } from '../../../data/blogPosts'
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Tag, Share2, BookOpen } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const postId = Number(route.params.id)

const post = computed(() => blogPosts.find(p => p.id === postId))

const relatedPosts = computed(() =>
    blogPosts.filter(p => p.id !== postId).slice(0, 3)
)

const goBack = () => router.push(`/${locale.value}/blog`)
const goToPost = (id: number) => {
    router.push(`/${locale.value}/blog/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const descriptionParagraphs = computed(() => {
    const text = (locale.value === 'ar' ? post.value?.descriptionAr : post.value?.descriptionEn) || ''
    if (!text) return []
    if (text.includes('\n')) {
        return text.split(/\n+/).map(p => p.trim()).filter(Boolean)
    }
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const paragraphs: string[] = []
    for (let i = 0; i < sentences.length; i += 2) {
        paragraphs.push(sentences.slice(i, i + 2).join(' ').trim())
    }
    return paragraphs
})
</script>

<template>
    <div class="min-h-screen bg-bg">
        <div v-if="post">
            <!-- Hero Banner -->
            <section class="relative h-[48vh] min-h-[360px] max-h-[480px] overflow-hidden">
                <img 
                    :src="post.image" 
                    :alt="locale === 'ar' ? post.titleAr : post.titleEn"
                    class="w-full h-full object-cover" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

                <!-- Hero Content Overlay -->
                <div class="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-12">
                    <div class="max-w-4xl mx-auto">
                        <!-- Category + Read time -->
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-3.5 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-md">
                                {{ locale === 'ar' ? post.categoryAr : post.categoryEn }}
                            </span>
                            <div class="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
                                <Clock class="w-3.5 h-3.5 text-secondary" />
                                <span>{{ locale === 'ar' ? post.readTimeAr : post.readTimeEn }}</span>
                            </div>
                        </div>
                        
                        <h1 
                            v-motion 
                            :initial="{ opacity: 0, y: 25 }"
                            :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                            class="text-2xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-4"
                            :class="locale === 'ar' ? 'font-cairo' : ''"
                        >
                            {{ locale === 'ar' ? post.titleAr : post.titleEn }}
                        </h1>

                        <div class="flex flex-wrap items-center gap-6 text-white/85 text-xs sm:text-sm font-medium">
                            <div class="flex items-center gap-2">
                                <User class="w-4 h-4 text-secondary" />
                                <span>{{ locale === 'ar' ? post.authorAr : post.authorEn }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Calendar class="w-4 h-4 text-secondary" />
                                <span>{{ locale === 'ar' ? post.dateAr : post.date }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Content Section -->
            <section class="max-w-7xl mx-auto px-6 py-10 md:py-14">
                
                <!-- Back to Blog Button (Crisp Primary Button, Zero Overlap) -->
                <div class="mb-8">
                    <button 
                        @click="goBack"
                        class="inline-flex items-center gap-2.5 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 group"
                    >
                        <ArrowRight v-if="locale === 'ar'" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <ArrowLeft v-else class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>{{ locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog' }}</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <!-- Article Body -->
                    <div class="lg:col-span-2">
                        <!-- Excerpt Quote Highlight -->
                        <div 
                            v-motion 
                            :initial="{ opacity: 0, y: 20 }"
                            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                            class="bg-blue-50/80 border-s-4 border-primary rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
                        >
                            <p class="text-gray-900 text-base sm:text-lg leading-relaxed font-semibold italic">
                                "{{ locale === 'ar' ? post.excerptAr : post.excerptEn }}"
                            </p>
                        </div>

                        <!-- Formatted Description Paragraphs -->
                        <div 
                            v-motion 
                            :initial="{ opacity: 0, y: 20 }"
                            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
                            class="prose-article space-y-5"
                        >
                            <p 
                                v-for="(para, idx) in descriptionParagraphs" 
                                :key="idx"
                                class="text-gray-800 leading-relaxed text-base sm:text-lg font-normal"
                                :class="idx === 0 ? 'text-lg sm:text-xl font-medium text-gray-900 border-s-4 border-primary ps-4 py-1.5 bg-primary/5 rounded-e-xl' : ''"
                            >
                                {{ para }}
                            </p>

                            <!-- Structured List Items -->
                            <div v-if="post.list && post.list.length" class="space-y-4 my-8">
                                <div 
                                    v-for="(item, li) in post.list" 
                                    :key="li"
                                    class="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <span class="w-3 h-3 rounded-full bg-primary mt-2 shrink-0 shadow-sm"></span>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-primary text-lg mb-1">
                                            {{ locale === 'ar' ? item.titleAr : item.titleEn }}
                                        </h4>
                                        <p class="text-gray-700 leading-relaxed text-base">
                                            {{ locale === 'ar' ? item.descAr : item.descEn }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Share & Tags Row -->
                        <div 
                            v-motion 
                            :initial="{ opacity: 0, y: 20 }"
                            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
                            class="mt-12 pt-8 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4"
                        >
                            <div class="flex items-center gap-2">
                                <Tag class="w-4 h-4 text-primary" />
                                <span class="text-sm font-medium text-gray-500">{{ locale === 'ar' ? 'التصنيف:' : 'Category:' }}</span>
                                <span class="px-3.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                    {{ locale === 'ar' ? post.categoryAr : post.categoryEn }}
                                </span>
                            </div>
                            <button
                                class="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 rounded-xl text-sm font-semibold transition-colors cursor-pointer border border-gray-200 shadow-sm"
                            >
                                <Share2 class="w-4 h-4 text-primary" />
                                {{ locale === 'ar' ? 'مشاركة المقال' : 'Share Article' }}
                            </button>
                        </div>

                        <!-- Author Card -->
                        <div 
                            v-motion 
                            :initial="{ opacity: 0, y: 20 }"
                            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
                            class="mt-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 flex items-center gap-5"
                        >
                            <div
                                class="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md"
                            >
                                {{ (locale === 'ar' ? post.authorAr : post.authorEn).charAt(0) }}
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-lg">{{ locale === 'ar' ? post.authorAr : post.authorEn }}</div>
                                <div class="text-sm text-primary font-semibold mb-0.5">{{ locale === 'ar' ? 'كاتب في منصة دويلو' : 'Writer at Dwello' }}</div>
                                <div class="text-xs text-gray-500">{{ locale === 'ar' ? 'خبير في مجالات العقارات، الاستثمار، والتصميم الداخلي' : 'Expert in real estate, investment, and interior design' }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="space-y-8">
                        <!-- Related Articles Widget -->
                        <div 
                            v-motion 
                            :initial="{ opacity: 0, x: locale === 'ar' ? -20 : 20 }"
                            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                            class="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sticky top-28"
                        >
                            <div class="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100">
                                <BookOpen class="w-5 h-5 text-primary" />
                                <h3 class="font-bold text-gray-900 text-lg">{{ locale === 'ar' ? 'مقالات ذات صلة' : 'Related Articles' }}</h3>
                            </div>
                            <div class="space-y-5">
                                <div 
                                    v-for="related in relatedPosts" 
                                    :key="related.id" 
                                    @click="goToPost(related.id)"
                                    class="flex gap-4 cursor-pointer group"
                                >
                                    <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                                        <img 
                                            :src="related.image"
                                            :alt="locale === 'ar' ? related.titleAr : related.titleEn"
                                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0 flex flex-col justify-center">
                                        <span class="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full w-max mb-1">
                                            {{ locale === 'ar' ? related.categoryAr : related.categoryEn }}
                                        </span>
                                        <p class="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                            {{ locale === 'ar' ? related.titleAr : related.titleEn }}
                                        </p>
                                        <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <Clock class="w-3 h-3 text-primary" />
                                            <span>{{ locale === 'ar' ? related.readTimeAr : related.readTimeEn }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>

        <!-- 404 State -->
        <div v-else class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
            <p class="text-xl text-gray-500 mb-8">{{ locale === 'ar' ? 'المقال غير موجود' : 'Article not found' }}</p>
            <button 
                @click="router.push(`/${locale}/blog`)"
                class="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all font-semibold cursor-pointer shadow-lg hover:scale-105"
            >
                {{ locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog' }}
            </button>
        </div>
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
</style>
