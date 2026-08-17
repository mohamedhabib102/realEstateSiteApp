<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Building2, TrendingUp, Eye, DollarSign, MapPin, BedDouble,
    Bath, Maximize, Users, MessageSquare, ArrowUpRight, ArrowLeftRight, Star, Target
} from 'lucide-vue-next'
import {
    properties, purchaseTransactions, conversations, analytics,
    ownerInfo
} from '../../../../data/ownerDashboard'
import RevenueChart from '../../components/RevenueChart.vue'

const { locale } = useI18n()

const statCards = computed(() => [
    { icon: Building2, value: properties.length, suffix: '', delta: '+2', labelEn: 'Active Properties', labelAr: 'العقارات النشطة', tone: 'primary', bg: 'bg-primary/10', text: 'text-primary' },
    { icon: DollarSign, value: analytics.revenue.toLocaleString(), suffix: '', delta: `+${analytics.revenueGrowth}%`, labelEn: 'Total Revenue', labelAr: 'إجمالي الإيرادات', tone: 'accent', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Eye, value: analytics.avgBooking.toLocaleString(), suffix: '', delta: `+${analytics.viewGrowth}%`, labelEn: 'Property Views', labelAr: 'مشاهدات العقارات', tone: 'amber', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: MessageSquare, value: '24', suffix: '', delta: '+6', labelEn: 'Open Conversations', labelAr: 'المحادثات المفتوحة', tone: 'info', bg: 'bg-blue-50', text: 'text-blue-600' },
])

const recentProperties = computed(() => properties.slice(0, 3))
const recentTransactions = computed(() => purchaseTransactions.slice(0, 4))
const recentConversations = computed(() => conversations.slice(0, 4))
const chartRange = ref('year')

const performanceRings = computed(() => [
    { key: 'response', icon: MessageSquare, value: 97, delta: '+2.0', labelEn: 'Response Rate', labelAr: 'نسبة الاستجابة', subEn: 'Avg. reply time', subAr: 'متوسط وقت الرد', color: 'text-emerald-500', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', track: 'text-gray-200' },
    { key: 'occupancy', icon: Building2, value: 78, delta: '+6.4', labelEn: 'Occupancy', labelAr: 'الإشغال', subEn: 'Units occupied', subAr: 'الوحدات المشغولة', color: 'text-primary', bg: 'bg-primary/10', iconColor: 'text-primary', track: 'text-gray-200' },
    { key: 'conversion', icon: TrendingUp, value: 64, delta: '+3.1', labelEn: 'Conversion', labelAr: 'التحويل', subEn: 'Leads to deals', subAr: 'من العملاء إلى الصفقات', color: 'text-amber-500', bg: 'bg-amber-50', iconColor: 'text-amber-600', track: 'text-gray-200' },
    { key: 'rating', icon: Star, value: 92, delta: '+0.5', labelEn: 'Satisfaction', labelAr: 'رضا العملاء', subEn: 'Avg. rating 4.9', subAr: 'متوسط التقييم 4.9', color: 'text-blue-500', bg: 'bg-blue-50', iconColor: 'text-blue-600', track: 'text-gray-200' },
])

const performanceGoals = computed(() => [
    { key: 'revenue', labelEn: 'Monthly revenue target', labelAr: 'هدف الإيرادات الشهري', value: 74, color: 'from-primary to-blue-500' },
    { key: 'views', labelEn: 'Listings views goal', labelAr: 'هدف مشاهدات العقارات', value: 88, color: 'from-emerald-400 to-emerald-600' },
    { key: 'response', labelEn: 'Response-rate goal', labelAr: 'هدف معدل الاستجابة', value: 97, color: 'from-amber-400 to-amber-600' },
])

const performanceFooter = computed(() => [
    { icon: Users, labelEn: 'Success. transactions', labelAr: 'معاملة ناجحة', value: analytics.transactions, color: 'text-primary' },
    { icon: MessageSquare, labelEn: 'Active conversations', labelAr: 'محادثة نشطة', value: '24', color: 'text-secondary' },
    { icon: Star, labelEn: 'Average rating', labelAr: 'متوسط التقييم', value: '4.9', color: 'text-amber-500' },
])

const chartRanges = [
    { key: 'month', labelEn: 'Month', labelAr: 'شهر' },
    { key: 'quarter', labelEn: 'Quarter', labelAr: 'ربع' },
    { key: 'year', labelEn: 'Year', labelAr: 'سنة' },
]

const statusMeta: Record<string, { en: string; ar: string; cls: string }> = {
    active: { en: 'Active', ar: 'نشط', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'معلق', cls: 'bg-amber-50 text-amber-700' },
    sold: { en: 'Sold', ar: 'مباع', cls: 'bg-blue-50 text-blue-700' },
    inactive: { en: 'Inactive', ar: 'غير نشط', cls: 'bg-gray-100 text-gray-600' },
}

const txnStatus: Record<string, { en: string; ar: string; cls: string }> = {
    completed: { en: 'Completed', ar: 'مكتمل', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    failed: { en: 'Failed', ar: 'فشل', cls: 'bg-red-50 text-red-600' },
    refunded: { en: 'Refunded', ar: 'مسترجع', cls: 'bg-gray-100 text-gray-600' },
}

const greeting = computed(() => {
    const name = locale.value === 'ar' ? ownerInfo.nameAr.split(' ')[0] : ownerInfo.nameEn.split(' ')[0]
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
            <button
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-[0.98] text-sm font-semibold"
            >
                <Building2 class="w-4 h-4" />
                {{ locale === 'ar' ? 'إضافة عقار' : 'Add Property' }}
            </button>
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
                        <TrendingUp class="w-3 h-3" />{{ stat.delta }}
                    </span>
                </div>
                <div class="text-2xl font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ stat.value }}{{ stat.suffix }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ locale === 'ar' ? stat.labelAr : stat.labelEn }}</div>
            </div>
        </div>

        <!-- Revenue Analytics -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 150 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'تحليل الإيرادات' : 'Revenue Analytics' }}</h3>
                    <p class="text-sm text-gray-400 mt-0.5">{{ locale === 'ar' ? 'الدخل والحجوزات على مدار العام' : 'Revenue and bookings across the year' }}</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex gap-1 p-1 bg-gray-100 rounded-xl">
                        <button
                            v-for="r in chartRanges" :key="r.key" @click="chartRange = r.key"
                            class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            :class="chartRange === r.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                        >{{ locale === 'ar' ? r.labelAr : r.labelEn }}</button>
                    </div>
                    <span class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                        <ArrowUpRight class="w-4 h-4" />{{ analytics.revenueGrowth }}%
                    </span>
                </div>
            </div>
            <RevenueChart />
        </section>

        <!-- Performance section -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 250 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><Target class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'حركة الأداء' : 'Performance' }}</h3>
                    <p class="text-sm text-gray-400 mt-0.5">{{ locale === 'ar' ? 'مؤشرات الأداء الرئيسية الشهرية' : 'Monthly key performance indicators' }}</p>
                </div>
                <span class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">{{ locale === 'ar' ? 'مؤشر صحي' : 'Healthy metrics' }}</span>
            </div>

            <!-- KPI rings -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                    v-for="(m, i) in performanceRings" :key="m.key"
                    v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 300 + i * 80 } }"
                    class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-sm hover:border-primary/20 transition-all"
                >
                    <div class="relative shrink-0 w-16 h-16">
                        <svg viewBox="0 0 42 42" class="w-16 h-16 -rotate-90">
                            <circle cx="21" cy="21" r="15.5" fill="none" stroke-width="4" class="stroke-current text-gray-200"></circle>
                            <circle
                                cx="21" cy="21" r="15.5" fill="none" stroke-width="4" stroke-linecap="round"
                                class="stroke-current" :class="m.color"
                                pathLength="100" :stroke-dasharray="`${m.value} ${100 - m.value}`"
                            ></circle>
                        </svg>
                        <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">{{ m.value }}%</span>
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                            <span class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="m.bg">
                                <component :is="m.icon" class="w-4 h-4" :class="m.iconColor" />
                            </span>
                        </div>
                        <div class="text-sm font-bold text-gray-900 mt-1.5 truncate">{{ locale === 'ar' ? m.labelAr : m.labelEn }}</div>
                        <div class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? m.subAr : m.subEn }}</div>
                        <span class="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 mt-1">
                            <ArrowUpRight class="w-3 h-3" />{{ m.delta }}%
                        </span>
                    </div>
                </div>
            </div>

            <!-- Goals -->
            <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 pt-5 border-t border-gray-100">
                <div v-for="g in performanceGoals" :key="g.key">
                    <div class="flex items-center justify-between text-xs font-medium mb-2">
                        <span class="text-gray-500">{{ locale === 'ar' ? g.labelAr : g.labelEn }}</span>
                        <span class="font-bold text-gray-800">{{ g.value }}%</span>
                    </div>
                    <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
                            :class="g.color"
                            :style="{ width: g.value + '%' }"
                            v-motion :initial="{ width: '0%' }" :visibleOnce="{ width: g.value + '%', transition: { duration: 900, delay: 200 } }"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Footer stats -->
            <div class="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                <div v-for="f in performanceFooter" :key="f.labelEn" class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
                    <span class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                        <component :is="f.icon" class="w-4 h-4" :class="f.color" />
                    </span>
                    <div>
                        <div class="text-lg font-bold text-gray-900 leading-none">{{ f.value }}</div>
                        <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? f.labelAr : f.labelEn }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Recently added properties -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'أحدث العقارات المضافة' : 'Recently Added Properties' }}</h3>
                <router-link :to="`/${locale}/dashboards/properties`" class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    {{ locale === 'ar' ? 'عرض الكل' : 'View all' }}
                    <ArrowUpRight class="w-4 h-4" />
                </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <router-link
                    v-for="(prop, i) in recentProperties"
                    :key="prop.id"
                    :to="`/${locale}/dashboards/properties`"
                    v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 260 + i * 90 } }"
                    class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                    <div class="relative h-36 overflow-hidden">
                        <img :src="prop.image" :alt="locale === 'ar' ? prop.titleAr : prop.titleEn" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span class="absolute top-3 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="[statusMeta[prop.status].cls, locale === 'ar' ? 'right-3' : 'left-3']">
                            {{ locale === 'ar' ? statusMeta[prop.status].ar : statusMeta[prop.status].en }}
                        </span>
                    </div>
                    <div class="p-4">
                        <div class="font-bold text-sm text-gray-900 line-clamp-1">{{ locale === 'ar' ? prop.titleAr : prop.titleEn }}</div>
                        <div class="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? prop.locationAr : prop.locationEn }}
                        </div>
                        <div class="flex items-center gap-3 mt-3 text-[11px] text-gray-500">
                            <span class="inline-flex items-center gap-1"><BedDouble class="w-3.5 h-3.5 text-gray-400" />{{ prop.bedrooms }}</span>
                            <span class="inline-flex items-center gap-1"><Bath class="w-3.5 h-3.5 text-gray-400" />{{ prop.bathrooms }}</span>
                            <span class="inline-flex items-center gap-1"><Maximize class="w-3.5 h-3.5 text-gray-400" />{{ prop.area }}m²</span>
                        </div>
                        <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span class="text-primary font-bold text-sm">{{ prop.price.toLocaleString() }} <span class="text-[11px] font-normal text-gray-400">{{ locale === 'ar' ? 'ج.م' : 'EGP' }}</span></span>
                            <span class="text-xs text-gray-400 inline-flex items-center gap-1"><Eye class="w-3.5 h-3.5" />{{ prop.views }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </section>

        <!-- Recent transactions + conversations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Transactions -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 250 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'أحدث معاملات الشراء' : 'Recent Purchase Transactions' }}</h3>
                    <router-link :to="`/${locale}/dashboards/transactions`" class="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                        {{ locale === 'ar' ? 'الكل' : 'All' }} <ArrowLeftRight class="w-3.5 h-3.5" />
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <div v-for="txn in recentTransactions" :key="txn.id" class="flex items-center gap-3 py-3">
                        <img :src="txn.avatar" alt="" class="w-9 h-9 rounded-full object-cover" />
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-semibold text-gray-800 truncate">{{ locale === 'ar' ? txn.buyerAr : txn.buyerEn }}</div>
                            <div class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? txn.propertyAr : txn.propertyEn }} · {{ txn.id }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-sm font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ txn.amount.toLocaleString() }} <span class="text-[10px] font-normal text-gray-400">EGP</span></div>
                            <span class="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full" :class="txnStatus[txn.status].cls">
                                {{ locale === 'ar' ? txnStatus[txn.status].ar : txnStatus[txn.status].en }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Conversations -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 320 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'أحدث المحادثات' : 'Recent Conversations' }}</h3>
                    <router-link :to="`/${locale}/dashboards/conversations`" class="text-sm font-semibold text-primary hover:underline">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <router-link
                        v-for="con in recentConversations"
                        :key="con.id"
                        :to="`/${locale}/dashboards/conversations`"
                        class="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
                    >
                        <div class="relative shrink-0">
                            <img :src="con.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                            <span v-if="con.online" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? con.clientAr : con.clientEn }}</span>
                                <span class="text-[11px] text-gray-400">{{ con.time }}</span>
                            </div>
                            <div class="flex items-center justify-between mt-0.5">
                                <span class="text-xs text-gray-500 truncate">{{ locale === 'ar' ? con.lastMessageAr : con.lastMessageEn }}</span>
                                <span v-if="con.unread" class="w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ms-2">{{ con.unread }}</span>
                            </div>
                        </div>
                    </router-link>
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