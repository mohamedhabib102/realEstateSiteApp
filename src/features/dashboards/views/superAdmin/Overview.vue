<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Users, Building2, DollarSign, Hourglass, MessagesSquare, TrendingUp, ArrowUpRight
} from 'lucide-vue-next'
import { saAnalytics, superAdminInfo } from '../../../../data/superAdminDashboard'
import { purchaseTransactions, conversations } from '../../../../data/ownerDashboard'
import RevenueChart from '../../components/RevenueChart.vue'

const { locale } = useI18n()

const statCards = computed(() => [
    { icon: Users, value: saAnalytics.totalUsers.toLocaleString(), delta: `+${saAnalytics.userGrowth}%`, labelEn: 'Total Users', labelAr: 'إجمالي المستخدمين', bg: 'bg-primary/10', text: 'text-primary' },
    { icon: Building2, value: saAnalytics.totalProperties.toLocaleString(), delta: `+${saAnalytics.userGrowth}%`, labelEn: 'Total Properties', labelAr: 'إجمالي العقارات', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: DollarSign, value: saAnalytics.totalRevenue.toLocaleString(), delta: `+${saAnalytics.revenueGrowth}%`, labelEn: 'Platform Revenue', labelAr: 'إيرادات المنصة', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: TrendingUp, value: saAnalytics.websiteVisits.toLocaleString(), delta: '+12%', labelEn: 'Website Visits', labelAr: 'زيارات الموقع', bg: 'bg-blue-50', text: 'text-blue-600' },
])

const pendingCount = saAnalytics.pendingApprovals
const recentTxns = computed(() => purchaseTransactions.slice(0, 5))
const recentChats = computed(() => conversations.slice(0, 5))

const txnStatus: Record<string, { en: string; ar: string; cls: string }> = {
    completed: { en: 'Completed', ar: 'مكتمل', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    failed: { en: 'Failed', ar: 'فشل', cls: 'bg-red-50 text-red-600' },
    refunded: { en: 'Refunded', ar: 'مسترجع', cls: 'bg-gray-100 text-gray-600' },
}

const greeting = computed(() => {
    const name = locale.value === 'ar' ? superAdminInfo.nameAr.split(' ')[0] : superAdminInfo.nameEn.split(' ')[0]
    const date = locale.value === 'ar'
        ? new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })
        : new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    return { name, date }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Greeting + pending alert -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                    {{ locale === 'ar' ? `مرحباً، ${greeting.name}` : `Welcome back, ${greeting.name}` }}
                </h1>
                <p class="text-sm text-gray-500 mt-1 capitalize">{{ greeting.date }}</p>
            </div>
            <router-link
                :to="`/${locale}/dashboards/property-management`"
                v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 shadow-md shadow-amber-500/20 transition-all active:scale-[0.98] text-sm font-semibold"
            >
                <Hourglass class="w-4 h-4" />
                {{ pendingCount }} {{ locale === 'ar' ? 'طلبات موافقة معلقة' : 'pending approvals' }}
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
                        <TrendingUp class="w-3 h-3" />{{ stat.delta }}
                    </span>
                </div>
                <div class="text-2xl font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ stat.value }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ locale === 'ar' ? stat.labelAr : stat.labelEn }}</div>
            </div>
        </div>

        <!-- Platform revenue -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 160 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'إيرادات المنصة' : 'Platform Revenue' }}</h3>
                    <p class="text-sm text-gray-400 mt-0.5">{{ locale === 'ar' ? 'الإيرادات والحجوزات على مدار العام' : 'Revenue and bookings across the year' }}</p>
                </div>
                <span class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                    <ArrowUpRight class="w-4 h-4" />{{ saAnalytics.revenueGrowth }}%
                </span>
            </div>
            <RevenueChart />
        </section>

        <!-- Recent transactions + conversations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Transactions -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 240 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'أحدث معاملات الشراء' : 'Recent Purchase Transactions' }}</h3>
                    <router-link :to="`/${locale}/dashboards/purchase-transactions`" class="text-sm font-semibold text-primary hover:underline">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <div v-for="txn in recentTxns" :key="txn.id" class="flex items-center gap-3 py-3">
                        <img :src="txn.avatar" alt="" class="w-9 h-9 rounded-full object-cover" />
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-semibold text-gray-800 truncate">{{ locale === 'ar' ? txn.buyerAr : txn.buyerEn }}</div>
                            <div class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? txn.propertyAr : txn.propertyEn }} · {{ txn.id }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-sm font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ txn.amount.toLocaleString() }} <span class="text-[10px] font-normal text-gray-400">EGP</span></div>
                            <span class="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full" :class="txnStatus[txn.status].cls">{{ locale === 'ar' ? txnStatus[txn.status].ar : txnStatus[txn.status].en }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Conversations -->
            <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><MessagesSquare class="w-4 h-4 text-primary" />{{ locale === 'ar' ? 'المحادثات النشطة' : 'Active Conversations' }}</h3>
                    <router-link :to="`/${locale}/dashboards/conversations`" class="text-sm font-semibold text-primary hover:underline">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </router-link>
                </div>
                <div class="divide-y divide-gray-50">
                    <div v-for="c in recentChats" :key="c.id" class="flex items-center gap-3 py-3">
                        <div class="relative shrink-0">
                            <img :src="c.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                            <span v-if="c.online" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-800">{{ locale === 'ar' ? c.clientAr : c.clientEn }}</span>
                                <span class="text-[11px] text-gray-400">{{ c.time }}</span>
                            </div>
                            <div class="flex items-center justify-between mt-0.5">
                                <span class="text-xs text-gray-500 truncate">{{ locale === 'ar' ? c.lastMessageAr : c.lastMessageEn }}</span>
                                <span v-if="c.unread" class="w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ms-2">{{ c.unread }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>