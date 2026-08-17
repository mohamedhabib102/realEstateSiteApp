<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, ArrowLeftRight, Eye, ShieldCheck } from 'lucide-vue-next'
import { platformTransactions } from '../../../../data/superAdminDashboard'
import type { PlatformTransaction } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

type TxnStatus = PlatformTransaction['status']

const search = ref('')
const statusFilter = ref<TxnStatus | 'all'>('all')

const txnStatus: Record<TxnStatus, { en: string; ar: string; cls: string }> = {
    completed: { en: 'Completed', ar: 'مكتمل', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    failed: { en: 'Failed', ar: 'فشل', cls: 'bg-red-50 text-red-600' },
    refunded: { en: 'Refunded', ar: 'مسترجع', cls: 'bg-gray-100 text-gray-600' },
}

const filtered = computed(() =>
    platformTransactions.filter((t) => {
        const matchesSearch =
            (locale.value === 'ar' ? t.propertyAr : t.propertyEn).toLowerCase().includes(search.value.toLowerCase())
            || (locale.value === 'ar' ? t.buyerAr : t.buyerEn).toLowerCase().includes(search.value.toLowerCase())
            || (locale.value === 'ar' ? t.ownerAr : t.ownerEn).toLowerCase().includes(search.value.toLowerCase())
            || t.id.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || t.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
)

const countBy = (s: TxnStatus) => platformTransactions.filter((t) => t.status === s).length
const totalAmount = computed(() => filtered.value.reduce((sum, t) => sum + t.amount, 0))
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'معاملات الشراء' : 'Purchase Transactions' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'معاملة بين المشتري والمالك' : 'buyer - owner transactions' }}</p>
            </div>
        </div>

        <!-- Monitoring note -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck class="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p class="text-sm text-gray-600">
                {{ locale === 'ar'
                    ? 'يتم تسجيل هذه المعاملات بين المشتري والمالك تلقائياً. يمكن للمشرف فقط مراقبتها (المشتري، المالك، العقار، الحالة، المبلغ، التاريخ) دون التدخل فيها.'
                    : 'These transactions are recorded automatically between buyers and owners. The admin can only monitor them (buyer, owner, property, status, amount, date) without interfering.' }}
            </p>
        </div>

        <!-- Filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'بحث بالمعاملة أو الطرفين أو العقار...' : 'Search by transaction, party or property...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <select v-model="statusFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                <option value="all">{{ locale === 'ar' ? 'كل الحالات' : 'All Status' }}</option>
                <option v-for="(m, s) in txnStatus" :key="s" :value="s">{{ locale === 'ar' ? m.ar : m.en }}</option>
            </select>
        </div>

        <!-- Summary chips -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120 } }" class="flex flex-wrap gap-3">
            <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ platformTransactions.length }})
            </button>
            <button v-for="(m, s) in txnStatus" :key="s" @click="statusFilter = s"
                class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? m.ar : m.en }} ({{ countBy(s as TxnStatus) }})
            </button>
        </div>

        <!-- Table -->
        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 150 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[820px]">
                    <thead>
                        <tr class="bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-400">
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'المعاملة' : 'Transaction' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'الطرفان' : 'Parties' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'العقار' : 'Property' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'المبلغ' : 'Amount' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'التاريخ' : 'Date' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</th>
                            <th class="text-start px-5 py-3.5 font-semibold">{{ locale === 'ar' ? 'مراقبة' : 'Monitor' }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="txn in filtered" :key="txn.id" class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <ArrowLeftRight class="w-4 h-4 text-primary" />
                                    </div>
                                    <span class="text-sm font-bold text-gray-800" dir="ltr">{{ txn.id }}</span>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <img :src="txn.buyerAvatar" alt="" class="w-8 h-8 rounded-full object-cover ring-2 ring-white" :title="locale === 'ar' ? txn.buyerAr : txn.buyerEn" />
                                        <img :src="txn.ownerAvatar" alt="" class="w-8 h-8 rounded-full object-cover ring-2 ring-white" :title="locale === 'ar' ? txn.ownerAr : txn.ownerEn" />
                                    </div>
                                    <div class="min-w-0">
                                        <div class="text-sm font-medium text-gray-800 truncate">{{ locale === 'ar' ? txn.buyerAr : txn.buyerEn }}</div>
                                        <div class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? txn.ownerAr : txn.ownerEn }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <div class="max-w-[220px]">
                                    <div class="text-sm font-medium text-gray-800 truncate">{{ locale === 'ar' ? txn.propertyAr : txn.propertyEn }}</div>
                                </div>
                            </td>
                            <td class="px-5 py-4 text-sm font-bold text-gray-900" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
                                {{ txn.amount.toLocaleString() }} <span class="text-[10px] font-normal text-gray-400">EGP</span>
                            </td>
                            <td class="px-5 py-4 text-sm text-gray-500" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ txn.date }}</td>
                            <td class="px-5 py-4">
                                <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold" :class="txnStatus[txn.status].cls">
                                    {{ locale === 'ar' ? txnStatus[txn.status].ar : txnStatus[txn.status].en }}
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500">
                                    <Eye class="w-3.5 h-3.5" />
                                    {{ locale === 'ar' ? 'مراقبة' : 'Monitor' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="bg-gray-50/70">
                            <td colspan="3" class="px-5 py-3.5 text-sm font-semibold text-gray-600">{{ locale === 'ar' ? 'إجمالي المعروض' : 'Total (filtered)' }}</td>
                            <td class="px-5 py-3.5 text-sm font-bold text-primary" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
                                {{ totalAmount.toLocaleString() }} <span class="text-[10px] font-normal text-gray-400">EGP</span>
                            </td>
                            <td colspan="3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
                <ArrowLeftRight class="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p class="font-medium">{{ locale === 'ar' ? 'لا توجد معاملات مطابقة' : 'No matching transactions' }}</p>
            </div>
        </div>
    </div>
</template>