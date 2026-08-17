<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, type TooltipItem } from 'chart.js'
import { TrendingUp, Wallet, Percent, PiggyBank, ArrowUpRight } from 'lucide-vue-next'
import { platformRevenue, saAnalytics } from '../../../../data/superAdminDashboard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const { locale } = useI18n()

const labelsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const labelsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس']

const range = ref<'revenue' | 'transactions'>('revenue')

const statCards = computed(() => [
    { icon: Wallet, value: platformRevenue.grossRevenue.toLocaleString(), labelEn: 'Gross Revenue', labelAr: 'إجمالي الإيرادات', bg: 'bg-primary/10', text: 'text-primary' },
    { icon: Percent, value: platformRevenue.commissionFees.toLocaleString(), labelEn: 'Commission Fees', labelAr: 'رسوم العمولة', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: PiggyBank, value: platformRevenue.netRevenue.toLocaleString(), labelEn: 'Net Revenue', labelAr: 'صافي الإيرادات', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: TrendingUp, value: platformRevenue.totalProfit.toLocaleString(), labelEn: 'Total Profit', labelAr: 'إجمالي الأرباح', bg: 'bg-blue-50', text: 'text-blue-600' },
])

const chartData = computed(() => ({
    labels: locale.value === 'ar' ? labelsAr : labelsEn,
    datasets: [
        {
            label: range.value === 'revenue'
                ? (locale.value === 'ar' ? 'إجمالي الإيرادات' : 'Gross Revenue')
                : (locale.value === 'ar' ? 'المعاملات' : 'Transactions'),
            data: range.value === 'revenue' ? [...platformRevenue.monthlyRevenue] : [...platformRevenue.monthlyTransactions],
            backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { left: number; top: number; right: number; bottom: number } } }) => {
                const { chart } = ctx
                const { ctx: c, chartArea } = chart
                if (!chartArea) return 'rgba(30,58,138,0.6)'
                const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                g.addColorStop(0, '#1E3A8A')
                g.addColorStop(1, '#2563EB')
                return g
            },
            borderRadius: 8,
            borderSkipped: false,
        },
    ],
}))

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#0f1b3d',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            padding: 12,
            cornerRadius: 10,
            callbacks: {
                label: (item: TooltipItem<'bar'>) => {
                    const raw = Number(item.raw)
                    return range.value === 'revenue' ? `EGP ${raw.toLocaleString()}` : `${raw} transactions`
                },
            },
        },
    },
    scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } } },
        y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: '#F3F4F6', drawTicks: false },
            ticks: {
                color: '#9CA3AF',
                font: { size: 11 },
                maxTicksLimit: 5,
                callback: (value: string | number) => {
                    const n = Number(value)
                    if (range.value === 'revenue') return `${(n / 1000).toFixed(0)}k`
                    return n
                },
            },
        },
    },
}))
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'إيرادات المنصة' : 'Platform Revenue' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'تحليل مالي شامل لإيرادات المنصة' : 'Comprehensive financial analysis for the platform' }}</p>
            </div>
            <span v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl">
                <ArrowUpRight class="w-4 h-4" />{{ saAnalytics.revenueGrowth }}% {{ locale === 'ar' ? 'نمو' : 'growth' }}
            </span>
        </div>

        <!-- Stat cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div v-for="(stat, i) in statCards" :key="i"
                v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 90 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4" :class="stat.bg">
                    <component :is="stat.icon" class="w-5 h-5" :class="stat.text" />
                </div>
                <div class="text-2xl font-bold text-gray-900" dir="ltr">EGP {{ stat.value }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ locale === 'ar' ? stat.labelAr : stat.labelEn }}</div>
            </div>
        </div>

        <!-- Revenue chart -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 160 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'الأداء الشهري' : 'Monthly Performance' }}</h3>
                    <p class="text-sm text-gray-400 mt-0.5">{{ locale === 'ar' ? 'الإيرادات والمعاملات على مدار الأشهر' : 'Revenue and transactions across the months' }}</p>
                </div>
                <div class="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    <button @click="range = 'revenue'" class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer" :class="range === 'revenue' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'">{{ locale === 'ar' ? 'الإيرادات' : 'Revenue' }}</button>
                    <button @click="range = 'transactions'" class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer" :class="range === 'transactions' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'">{{ locale === 'ar' ? 'المعاملات' : 'Transactions' }}</button>
                </div>
            </div>
            <div class="relative w-full h-72">
                <Bar :data="chartData" :options="chartOptions" />
            </div>
        </section>

        <!-- Monthly table -->
        <section v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 220 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 pb-3">
                <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? 'تفاصيل شهرية' : 'Monthly Breakdown' }}</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full min-w-[560px]">
                    <thead>
                        <tr class="bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-400">
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'الشهر' : 'Month' }}</th>
                            <th class="text-end px-6 py-3 font-semibold">{{ locale === 'ar' ? 'الإيرادات' : 'Revenue' }}</th>
                            <th class="text-end px-6 py-3 font-semibold">{{ locale === 'ar' ? 'الأرباح' : 'Profit' }}</th>
                            <th class="text-end px-6 py-3 font-semibold">{{ locale === 'ar' ? 'المعاملات' : 'Transactions' }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="(m, i) in labelsEn" :key="m" class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-6 py-3.5 text-sm font-medium text-gray-700">{{ locale === 'ar' ? labelsAr[i] : labelsEn[i] }}</td>
                            <td class="px-6 py-3.5 text-end text-sm font-bold text-gray-900 tabular-nums" dir="ltr">EGP {{ platformRevenue.monthlyRevenue[i].toLocaleString() }}</td>
                            <td class="px-6 py-3.5 text-end text-sm font-bold text-emerald-600 tabular-nums" dir="ltr">EGP {{ platformRevenue.monthlyProfit[i].toLocaleString() }}</td>
                            <td class="px-6 py-3.5 text-end text-sm font-semibold text-gray-600 tabular-nums">{{ platformRevenue.monthlyTransactions[i] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>