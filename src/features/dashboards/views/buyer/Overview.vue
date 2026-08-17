<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Heart, Building2, MessageSquare, Wallet, MapPin, BedDouble,
    Bath, Maximize, Star, ArrowUpRight, Inbox
} from 'lucide-vue-next'
import { products } from '../../../../data/products'
import { buyerInfo, buyerAnalytics, buyerMessages, chatRequests } from '../../../../data/buyerDashboard'

const { locale } = useI18n()

const statCards = computed(() => [
    { icon: Heart, value: buyerAnalytics.savedProperties, delta: '+3', labelEn: 'Saved Properties', labelAr: 'العقارات المحفوظة', bg: 'bg-primary/10', text: 'text-primary' },
    { icon: MessageSquare, value: buyerAnalytics.messages, delta: '+5', labelEn: 'Messages', labelAr: 'الرسائل', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Inbox, value: buyerAnalytics.pendingRequests, delta: '+2', labelEn: 'Pending Chat Requests', labelAr: 'طلبات المحادثة المعلقة', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: Wallet, value: buyerAnalytics.totalSpent.toLocaleString(), suffix: '', delta: '+8%', labelEn: 'Total Spent', labelAr: 'إجمالي الإنفاق', bg: 'bg-blue-50', text: 'text-blue-600' },
])

const recommended = computed(() => products.slice(0, 3))
const recentMessages = computed(() => buyerMessages.slice(0, 4))
const activeRequests = computed(() => chatRequests.filter((r) => r.status !== 'rejected'))

const greeting = computed(() => {
    const name = locale.value === 'ar' ? buyerInfo.nameAr.split(' ')[0] : buyerInfo.nameEn.split(' ')[0]
    const date = locale.value === 'ar'
        ? new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })
        : new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    return { name, date }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Greeting -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                    {{ locale === 'ar' ? `مرحباً، ${greeting.name}` : `Welcome back, ${greeting.name}` }}
                </h1>
                <p class="text-sm text-gray-500 mt-1 capitalize">{{ greeting.date }}</p>
            </div>
            <router-link
                :to="`/${locale}/dashboards/properties`"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold"
            >
                <Building2 class="w-4 h-4" />
                {{ locale === 'ar' ? 'استكشاف العقارات' : 'Explore Properties' }}
            </router-link>
        </div>

        <!-- Stat cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div
                v-for="(stat, i) in statCards"
                :key="i"
                v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 90 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
                <div class="flex items-center justify-between mb-4">
                    <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="stat.bg">
                        <component :is="stat.icon" class="w-5 h-5" :class="stat.text" />
                    </div>
                    <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <ArrowUpRight class="w-3 h-3" />{{ stat.delta }}
                    </span>
                </div>
                <div class="text-2xl font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ stat.value }}{{ stat.suffix }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ locale === 'ar' ? stat.labelAr : stat.labelEn }}</div>
            </div>
        </div>

        <!-- Recommended properties -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 160 } }">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'عقارات موصى بها' : 'Recommended For You' }}</h3>
                    <p class="text-sm text-gray-400 mt-0.5">{{ locale === 'ar' ? 'بناءً على تفضيلاتك ومواقعك المحفوظة' : 'Based on your preferences and saved locations' }}</p>
                </div>
                <router-link :to="`/${locale}/dashboards/properties`" class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    {{ locale === 'ar' ? 'عرض الكل' : 'View all' }}
                    <ArrowUpRight class="w-4 h-4" />
                </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <router-link
                    v-for="(p, i) in recommended"
                    :key="p.id"
                    :to="`/${locale}/dashboards/properties`"
                    v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 220 + i * 90 } }"
                    class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                    <div class="relative h-36 overflow-hidden">
                        <img :src="p.image" :alt="locale === 'ar' ? p.titleAr : p.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button @click.prevent class="absolute top-3 p-1.5 rounded-lg bg-white/90 hover:bg-white text-red-500 transition-colors cursor-pointer" :class="locale === 'ar' ? 'left-3' : 'right-3'">
                            <Heart class="w-4 h-4" />
                        </button>
                        <span class="absolute bottom-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-[11px] font-bold shadow-sm" :class="locale === 'ar' ? 'right-3' : 'left-3'">
                            {{ (p.rating ?? 0).toFixed(1) }} ★
                        </span>
                    </div>
                    <div class="p-4">
                        <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? p.titleAr : p.titleEn }}</div>
                        <div class="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? p.locationAr : p.locationEn }}
                        </div>
                        <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                            <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5 text-gray-400" />{{ p.bedrooms }}</span>
                            <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5 text-gray-400" />{{ p.bathrooms }}</span>
                            <span class="inline-flex items-center gap-1"><Maximize class="w-3.5 h-3.5 text-gray-400" />{{ p.area }}m²</span>
                        </div>
                        <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span class="text-primary font-bold text-sm">{{ p.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
                            <span class="inline-flex items-center gap-0.5 text-amber-500"><Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{{ p.rating ?? 0 }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Recent messages -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 260 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'أحدث الرسائل' : 'Recent Messages' }}</h3>
                    <router-link :to="`/${locale}/dashboards/messages`" class="text-sm font-semibold text-primary hover:underline">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <router-link
                        v-for="m in recentMessages"
                        :key="m.id"
                        :to="`/${locale}/dashboards/messages`"
                        class="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
                    >
                        <div class="relative shrink-0">
                            <img :src="m.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                            <span v-if="m.online" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? m.ownerAr : m.ownerEn }}</span>
                                <span class="text-[11px] text-gray-400">{{ m.time }}</span>
                            </div>
                            <div class="flex items-center justify-between mt-0.5">
                                <span class="text-xs text-gray-500 truncate">{{ locale === 'ar' ? m.lastMessageAr : m.lastMessageEn }}</span>
                                <span v-if="m.unread" class="w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ms-2">{{ m.unread }}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </section>

            <!-- Chat requests -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 320 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'طلبات المحادثة' : 'Chat Requests' }}</h3>
                    <router-link :to="`/${locale}/dashboards/chat-requests`" class="text-sm font-semibold text-primary hover:underline">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <div v-for="r in activeRequests" :key="r.id" class="flex items-center gap-3 py-3">
                        <div class="w-10 h-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center">
                            <img :src="r.avatar" alt="" class="w-9 h-9 rounded-lg object-cover" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-800 truncate">{{ locale === 'ar' ? r.ownerAr : r.ownerEn }}</span>
                                <span class="text-[11px] text-gray-400">{{ r.time }}</span>
                            </div>
                            <div class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? r.propertyAr : r.propertyEn }}</div>
                        </div>
                        <span class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            :class="r.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">
                            {{ locale === 'ar' ? (r.status === 'accepted' ? 'مقبول' : 'معلق') : (r.status === 'accepted' ? 'Accepted' : 'Pending') }}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>