<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Landmark, Wallet, ArrowDownToLine, CreditCard, Plus, CheckCircle2,
    Clock, Loader, ArrowUpRight, ArrowDownRight, Building2, BadgeCheck,
    AlertTriangle, XCircle, Info, ChevronRight
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { bankCards, withdrawals, purchaseTransactions } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const balance = 82400
const onHold = 13900
const addCardOpen = ref(false)
const toast = ref('')
const toasts = ref<{ id: number; msg: string }[]>([])

const fmt = (n: number, showCents = true) =>
    n.toLocaleString('en-US', {
        minimumFractionDigits: showCents ? 2 : 0,
        maximumFractionDigits: showCents ? 2 : 0,
    })

const money = (n: number) => `EGP ${fmt(n)}`

// ---------- Withdrawal request ----------
type WdStatus = 'approved' | 'processing' | 'pending'
const WITHDRAW_MIN = 500
const FEE_RATE = 0.01

const withdrawOpen = ref(false)
const submitted = ref(false)
const lastRequestId = ref('WD-999')
const form = ref({ amount: 5000, cardId: bankCards[0].id })

const eligibleCards = computed(() => bankCards.filter((c) => !c.expired))
const selectedCard = computed(() => eligibleCards.value.find((c) => c.id === form.value.cardId) ?? eligibleCards.value[0])

const fee = computed(() => Math.round(Math.max(form.value.amount * FEE_RATE, 10)))
const net = computed(() => form.value.amount - fee.value)

const exceedsBalance = computed(() => form.value.amount > balance)
const belowMin = computed(() => form.value.amount > 0 && form.value.amount < WITHDRAW_MIN)
const amountError = computed(() =>
    exceedsBalance.value
        ? (locale.value === 'ar' ? `المبلغ يتجاوز الرصيد المتاح (${money(balance)})` : `Amount exceeds available balance (${money(balance)})`)
        : belowMin.value
            ? (locale.value === 'ar' ? `الحد الأدنى للسحب هو ${money(WITHDRAW_MIN)}` : `Minimum withdrawal is ${money(WITHDRAW_MIN)}`)
            : ''
)
const amountValid = computed(() => form.value.amount > 0 && !amountError.value)
const afterWithdrawal = computed(() => (amountValid.value ? balance - form.value.amount : balance))
const canSubmit = computed(() =>
    form.value.amount > 0 && !exceedsBalance.value && !belowMin.value && !!selectedCard.value
)

const processing = computed(() => {
    const days = selectedCard.value?.id === '1' ? 2 : 4
    const eta = new Date(Date.now() + days * 86400000)
    return {
        label: days === 2
            ? (locale.value === 'ar' ? '1–2 أيام عمل' : '1–2 business days')
            : (locale.value === 'ar' ? '2–4 أيام عمل' : '2–4 business days'),
        eta: locale.value === 'ar'
            ? eta.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })
            : eta.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    }
})

const quickAmounts = [5000, 10000, 20000, 40000]

const setQuick = (amt: number) => (form.value.amount = amt)
const setMax = () => (form.value.amount = balance)

const openWithdraw = () => {
    form.value = { amount: 5000, cardId: bankCards[0].id }
    submitted.value = false
    withdrawOpen.value = true
}

const submitWithdrawal = () => {
    if (!canSubmit.value) return
    submitted.value = true
    lastRequestId.value = `WD-${Math.floor(300 + Math.random() * 90)}`
    showToast(locale.value === 'ar' ? 'تم تقديم طلب السحب بنجاح' : 'Withdrawal request submitted')
}

const closeWithdraw = () => {
    withdrawOpen.value = false
    submitted.value = false
}

// ---------- Transaction history ----------
type TxnStatus = 'completed' | 'pending' | 'failed' | 'refunded'
const txnFilter = ref<TxnStatus | 'all'>('all')

const txnStatusMeta: Record<TxnStatus, { en: string; ar: string; cls: string; dot: string }> = {
    completed: { en: 'Completed', ar: 'مكتمل', cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
    failed: { en: 'Failed', ar: 'فشل', cls: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
    refunded: { en: 'Refunded', ar: 'مسترجع', cls: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
}

const wdStatusMeta: Record<WdStatus, { en: string; ar: string; cls: string; icon: typeof Clock }> = {
    approved: { en: 'Approved', ar: 'معتمد', cls: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
    processing: { en: 'Processing', ar: 'قيد المعالجة', cls: 'bg-blue-50 text-blue-700', icon: Loader },
    pending: { en: 'Pending', ar: 'قيد المراجعة', cls: 'bg-amber-50 text-amber-700', icon: Clock },
}

const filteredTxns = computed(() =>
    purchaseTransactions.filter((t) => txnFilter.value === 'all' || t.status === txnFilter.value)
)

const txnCount = (s: TxnStatus) => purchaseTransactions.filter((t) => t.status === s).length

const recentWithdrawals = withdrawals.slice(0, 3)

// ---------- Toast ----------
let toastId = 0
const showToast = (msg: string) => {
    const id = ++toastId
    toasts.value.push({ id, msg })
    setTimeout(() => (toasts.value = toasts.value.filter((t) => t.id !== id)), 3200)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'البنوك والمعاملات' : 'Banking & Transactions' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'أدر شؤونك المالية وعمليات السحب' : 'Manage your finances and withdrawals' }}</p>
            </div>
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="flex gap-3">
                <button @click="addCardOpen = true" class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 text-gray-700 rounded-xl hover:border-primary/40 hover:text-primary shadow-sm transition-all text-sm font-semibold cursor-pointer">
                    <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة حساب' : 'Add Account' }}
                </button>
                <button @click="openWithdraw" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                    <ArrowDownToLine class="w-4 h-4" /> {{ locale === 'ar' ? 'طلب سحب' : 'Withdraw' }}
                </button>
            </div>
        </div>

        <!-- Financial summary cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Current balance -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450 } }"
                class="rounded-2xl bg-gradient-to-br from-primary via-blue-800 to-blue-900 p-6 text-white shadow-lg relative overflow-hidden">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"><Wallet class="w-5 h-5" /></div>
                        <div>
                            <div class="text-sm font-semibold text-white">{{ locale === 'ar' ? 'الرصيد الحالي' : 'Current Balance' }}</div>
                            <div class="text-[11px] text-white/60">{{ locale === 'ar' ? 'الأموال المتاحة' : 'Available funds' }}</div>
                        </div>
                    </div>
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold text-emerald-300">
                        <ArrowUpRight class="w-3.5 h-3.5" /> +12.4%
                    </span>
                </div>
                <div class="text-3xl font-bold tracking-tight tabular-nums" dir="ltr">{{ money(balance) }}</div>
                <div class="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                    <span class="text-white/70 flex items-center gap-1.5">
                        <Clock class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'قيد الانتظار' : 'On hold' }}
                    </span>
                    <span class="font-bold tabular-nums" dir="ltr">{{ money(onHold) }}</span>
                </div>
            </div>

            <!-- Pending withdrawals -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><Clock class="w-5 h-5 text-amber-600" /></div>
                        <div>
                            <div class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'سحوبات معلقة' : 'Pending Withdrawals' }}</div>
                            <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? 'قيد المراجعة' : 'In review' }}</div>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">{{ withdrawals.filter((w) => w.status !== 'approved').length }}</span>
                </div>
                <div class="text-2xl font-bold text-gray-900 tabular-nums" dir="ltr">{{ money(onHold) }}</div>
                <div class="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{{ locale === 'ar' ? 'معتمد' : 'Approved' }} · {{ withdrawals.filter((w) => w.status === 'approved').length }}</span>
                    <span>{{ locale === 'ar' ? 'معالجة' : 'Processing' }} · {{ withdrawals.filter((w) => w.status === 'processing').length }}</span>
                    <span>{{ locale === 'ar' ? 'معلق' : 'Pending' }} · {{ withdrawals.filter((w) => w.status === 'pending').length }}</span>
                </div>
            </div>

            <!-- Linked banks -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 180 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><CreditCard class="w-5 h-5 text-emerald-600" /></div>
                        <div>
                            <div class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'البنوك المرتبطة' : 'Linked Banks' }}</div>
                            <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? 'حسابات دفع' : 'Payment accounts' }}</div>
                        </div>
                    </div>
                    <button @click="addCardOpen = true" class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer" :title="locale === 'ar' ? 'إضافة' : 'Add'">
                        <Plus class="w-4 h-4" />
                    </button>
                </div>
                <div class="text-2xl font-bold text-gray-900">{{ bankCards.length }}</div>
                <div class="mt-4 flex items-center gap-2 text-[11px] text-gray-500">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                        <BadgeCheck class="w-3 h-3" /> {{ locale === 'ar' ? 'افتراضي' : 'Default' }}
                    </span>
                    {{ bankCards.find((c) => c.isDefault)?.bank }}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Bank accounts -->
            <section v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 150 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><Landmark class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'حساباتي البنكية' : 'My Bank Accounts' }}</h3>
                    <button @click="addCardOpen = true" class="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer">
                        <Plus class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'إضافة' : 'Add' }}
                    </button>
                </div>
                <div class="space-y-3">
                    <div
                        v-for="card in bankCards" :key="card.id"
                        class="group p-4 rounded-2xl border transition-all cursor-pointer"
                        :class="card.expired ? 'border-gray-100 bg-gray-50/60' : 'border-gray-100 hover:border-primary/30 hover:shadow-sm'"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="card.expired ? 'bg-gray-200' : 'bg-primary/10'">
                                    <Landmark class="w-5 h-5" :class="card.expired ? 'text-gray-400' : 'text-primary'" />
                                </div>
                                <div>
                                    <div class="font-semibold text-gray-900 text-sm flex items-center gap-2">
                                        {{ card.bank }}
                                        <span v-if="card.isDefault" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                                            <BadgeCheck class="w-3 h-3" /> {{ locale === 'ar' ? 'افتراضي' : 'Default' }}
                                        </span>
                                    </div>
                                    <div class="text-xs text-gray-400 mt-0.5 tabular-nums" dir="ltr">{{ card.accountNumber }} · {{ locale === 'ar' ? card.holderAr : card.holderEn }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span v-if="card.expired" class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 text-red-500 text-[11px] font-bold">
                                    <XCircle class="w-3 h-3" /> {{ locale === 'ar' ? 'منتهي' : 'Expired' }}
                                </span>
                                <span v-else class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                                    <CheckCircle2 class="w-3 h-3" /> {{ locale === 'ar' ? 'نشط' : 'Active' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Recent withdrawals -->
            <section v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 220 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><ArrowDownToLine class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'طلبات السحب الأخيرة' : 'Recent Withdrawals' }}</h3>
                    <button @click="openWithdraw" class="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer">
                        {{ locale === 'ar' ? 'طلب جديد' : 'New' }} <ArrowUpRight class="w-3.5 h-3.5" />
                    </button>
                </div>
                <div class="divide-y divide-gray-50">
                    <div v-for="w in recentWithdrawals" :key="w.id" class="flex items-center gap-3 py-3.5 group">
                        <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :class="wdStatusMeta[w.status].cls">
                            <component :is="wdStatusMeta[w.status].icon" class="w-4 h-4" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-800 tabular-nums" dir="ltr">{{ w.id }}</span>
                                <span class="text-sm font-bold text-gray-900 tabular-nums" dir="ltr">- {{ money(w.amount) }}</span>
                            </div>
                            <div class="flex items-center justify-between mt-0.5">
                                <span class="text-[11px] text-gray-400 truncate">{{ locale === 'ar' ? w.methodAr : w.methodEn }}</span>
                                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="wdStatusMeta[w.status].cls">
                                    <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                                    {{ locale === 'ar' ? wdStatusMeta[w.status].ar : wdStatusMeta[w.status].en }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{{ locale === 'ar' ? 'إجمالي هذا الشهر' : 'Total this month' }}</span>
                    <span class="font-bold text-gray-700 tabular-nums" dir="ltr">{{ money(25900) }}</span>
                </div>
            </section>
        </div>

        <!-- Transaction history -->
        <section v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 280 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><Building2 class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'سجل المعاملات' : 'Transaction History' }}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">{{ filteredTxns.length }} {{ locale === 'ar' ? 'معاملة' : 'transactions' }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button @click="txnFilter = 'all'" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border"
                        :class="txnFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-primary/40'">
                        {{ locale === 'ar' ? 'الكل' : 'All' }} · {{ purchaseTransactions.length }}
                    </button>
                    <button v-for="(m, s) in txnStatusMeta" :key="s" @click="txnFilter = s as TxnStatus" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border inline-flex items-center gap-1.5"
                        :class="txnFilter === s ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-primary/40'">
                        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {{ locale === 'ar' ? m.ar : m.en }} · {{ txnCount(s as TxnStatus) }}
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-[720px]">
                    <thead>
                        <tr class="bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-400">
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'المعاملة' : 'Transaction' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'التفاصيل' : 'Details' }}</th>
                            <th class="text-end px-6 py-3 font-semibold">{{ locale === 'ar' ? 'المبلغ' : 'Amount' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'التاريخ' : 'Date' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="t in filteredTxns" :key="t.id" class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <ArrowDownRight class="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <div class="text-sm font-bold text-gray-800 tabular-nums" dir="ltr">{{ t.id }}</div>
                                        <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? t.methodAr : t.methodEn }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="max-w-[220px]">
                                    <div class="text-sm font-medium text-gray-800 truncate">{{ locale === 'ar' ? t.propertyAr : t.propertyEn }}</div>
                                    <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? t.buyerAr : t.buyerEn }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-end">
                                <span class="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 tabular-nums" dir="ltr">
                                    <ArrowDownRight class="w-3.5 h-3.5" /> {{ money(t.amount) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 tabular-nums" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ t.date }}</td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="txnStatusMeta[t.status].cls">
                                    <span class="w-1.5 h-1.5 rounded-full" :class="txnStatusMeta[t.status].dot"></span>
                                    {{ locale === 'ar' ? txnStatusMeta[t.status].ar : txnStatusMeta[t.status].en }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="filteredTxns.length === 0" class="text-center py-14 text-gray-400">
                    <Building2 class="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p class="font-medium">{{ locale === 'ar' ? 'لا توجد معاملات مطابقة' : 'No matching transactions' }}</p>
                </div>
            </div>
        </section>

        <!-- Withdraw modal -->
        <BaseModal :open="withdrawOpen" @close="closeWithdraw" :max-width="'30rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><ArrowDownToLine class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'طلب سحب' : 'Request Withdrawal' }}</h3>
            </template>

            <template #body>
                <!-- Success state -->
                <div v-if="submitted" v-motion :initial="{ opacity: 0, scale: 0.96 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 250 } }" class="py-6 text-center">
                    <div class="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <CheckCircle2 class="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-1">{{ locale === 'ar' ? 'تم تقديم الطلب بنجاح' : 'Request submitted successfully' }}</h4>
                    <p class="text-sm text-gray-500 mb-4">{{ locale === 'ar' ? 'سيتم مراجعة طلبك وتحويل المبلغ خلال' : 'Your request is being reviewed and will arrive within' }} {{ processing.label }}.</p>
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-800 tabular-nums" dir="ltr">
                        {{ lastRequestId }}
                    </div>
                    <div class="mt-4 text-sm text-gray-600 flex items-center justify-center gap-1.5">
                        <Info class="w-4 h-4 text-primary" /> {{ locale === 'ar' ? `متوقع وصوله بحلول` : 'Estimated arrival' }} {{ processing.eta }}
                    </div>
                </div>

                <!-- Form state -->
                <div v-else class="space-y-5">
                    <!-- Available balance banner -->
                    <div class="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 p-4 flex items-center justify-between">
                        <div>
                            <div class="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{{ locale === 'ar' ? 'الرصيد المتاح' : 'Available balance' }}</div>
                            <div class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums" dir="ltr">{{ money(balance) }}</div>
                            <div v-if="amountValid" class="text-[11px] text-emerald-600 font-semibold mt-0.5">
                                {{ locale === 'ar' ? 'المتبقي بعد السحب' : 'Remaining after withdrawal' }}:
                                <span class="tabular-nums" dir="ltr">{{ money(afterWithdrawal) }}</span>
                            </div>
                        </div>
                        <button @click="setMax" class="px-3 py-1.5 rounded-lg bg-white border border-primary/20 text-primary text-xs font-bold hover:bg-primary/5 transition-colors cursor-pointer">
                            {{ locale === 'ar' ? 'السحب الكامل' : 'Max' }}
                        </button>
                    </div>

                    <!-- Amount -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'مبلغ السحب' : 'Withdrawal amount' }}</label>
                        <div class="relative">
                            <span class="absolute top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 bg-white rounded-lg border border-gray-100 px-2 py-1 tabular-nums" :class="locale === 'ar' ? 'left-3' : 'right-3'">EGP</span>
                            <input
                                v-model.number="form.amount"
                                type="number"
                                :min="WITHDRAW_MIN"
                                :max="balance"
                                class="w-full px-4 py-3 bg-gray-50 border rounded-xl text-base font-bold text-gray-900 tabular-nums focus:outline-none focus:ring-2 transition-all"
                                :class="[
                                    amountError ? 'border-red-300 focus:ring-red-200' : amountValid ? 'border-emerald-300 focus:ring-emerald-200' : 'border-gray-100 focus:ring-primary/30',
                                    locale === 'ar' ? 'pl-16 pr-4' : 'pr-16 pl-4'
                                ]"
                                dir="ltr"
                            />
                            <span v-if="amountValid" class="absolute top-1/2 -translate-y-1/2 text-emerald-500" :class="locale === 'ar' ? 'right-3' : 'left-3'">
                                <CheckCircle2 class="w-4 h-4" />
                            </span>
                        </div>

                        <!-- Quick amounts -->
                        <div class="flex gap-2 mt-2 flex-wrap">
                            <button v-for="amt in quickAmounts" :key="amt" @click="setQuick(amt)"
                                class="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer tabular-nums"
                                :class="form.amount === amt ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-primary/40'">
                                {{ amt.toLocaleString() }}
                            </button>
                        </div>

                        <!-- Range slider -->
                        <input
                            v-model.number="form.amount"
                            type="range"
                            :min="WITHDRAW_MIN"
                            :max="balance"
                            :step="500"
                            class="w-full mt-3 accent-primary cursor-pointer"
                        />

                        <!-- Validation -->
                        <p v-if="amountError" class="mt-2 text-xs font-semibold text-red-500 flex items-center gap-1.5">
                            <AlertTriangle class="w-3.5 h-3.5" /> {{ amountError }}
                        </p>
                        <p v-else class="mt-2 text-[11px] text-gray-400 flex items-center gap-1.5">
                            <Info class="w-3.5 h-3.5" /> {{ locale === 'ar' ? `الحد الأدنى ${money(WITHDRAW_MIN)}` : `Minimum ${money(WITHDRAW_MIN)}` }} · {{ locale === 'ar' ? 'بدون عمولة على الحساب الافتراضي' : 'no fee on default account' }}
                        </p>
                    </div>

                    <!-- Bank account selection -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? 'إلى الحساب' : 'Transfer to' }}</label>
                        <div class="space-y-2">
                            <button
                                v-for="card in eligibleCards" :key="card.id"
                                @click="form.cardId = card.id"
                                class="w-full text-start flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer"
                                :class="form.cardId === card.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30 bg-white'"
                            >
                                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Landmark class="w-5 h-5 text-primary" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                        {{ card.bank }}
                                        <span v-if="card.isDefault" class="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">{{ locale === 'ar' ? 'افتراضي' : 'Default' }}</span>
                                    </div>
                                    <div class="text-[11px] text-gray-400 tabular-nums" dir="ltr">{{ card.accountNumber }} · {{ locale === 'ar' ? card.holderAr : card.holderEn }}</div>
                                </div>
                                <span class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors" :class="form.cardId === card.id ? 'border-primary' : 'border-gray-200'">
                                    <span v-if="form.cardId === card.id" class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Withdrawal summary -->
                    <div class="rounded-xl bg-primary/5 border border-primary/10 p-4 space-y-2.5 text-sm">
                        <div class="flex items-center justify-between text-gray-600">
                            <span>{{ locale === 'ar' ? 'المبلغ' : 'Amount' }}</span>
                            <span class="font-semibold tabular-nums" dir="ltr">{{ money(form.amount) }}</span>
                        </div>
                        <div class="flex items-center justify-between text-gray-600">
                            <span>{{ locale === 'ar' ? 'رسوم المعالجة (1%)' : 'Processing fee (1%)' }}</span>
                            <span class="font-semibold text-red-500 tabular-nums" dir="ltr">- {{ money(fee) }}</span>
                        </div>
                        <div class="border-t border-primary/10 pt-2.5 flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ locale === 'ar' ? 'ستستلم' : 'You will receive' }}</span>
                            <span class="font-bold text-gray-900 tabular-nums" dir="ltr">{{ money(net) }}</span>
                        </div>
                    </div>

                    <!-- Estimated processing -->
                    <div class="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Clock class="w-4 h-4 text-primary shrink-0" />
                        <p class="text-xs text-gray-600">
                            {{ locale === 'ar' ? 'الوقت التقديري للمعالجة' : 'Estimated processing time' }}: <span class="font-bold text-gray-800">{{ processing.label }}</span>
                            <span class="text-gray-400"> · {{ locale === 'ar' ? 'يصل بحلول' : 'arrives by' }} {{ processing.eta }}</span>
                        </p>
                    </div>
                </div>
            </template>

            <template #footer>
                <template v-if="submitted">
                    <button @click="closeWithdraw" class="w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">
                        {{ locale === 'ar' ? 'تم' : 'Done' }}
                    </button>
                </template>
                <template v-else>
                    <button @click="closeWithdraw" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                        {{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}
                    </button>
                    <button
                        @click="submitWithdrawal"
                        :disabled="!canSubmit"
                        class="flex-1 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-[#2563EB] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <ArrowDownToLine class="w-4 h-4" /> {{ locale === 'ar' ? 'إرسال الطلب' : 'Submit Request' }}
                    </button>
                </template>
            </template>
        </BaseModal>

        <!-- Add account modal -->
        <BaseModal :open="addCardOpen" @close="addCardOpen = false" :max-width="'26rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><Landmark class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'إضافة حساب بنكي' : 'Add Bank Account' }}</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'اسم البنك' : 'Bank Name' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'رقم الحساب' : 'Account Number' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'اسم صاحب الحساب' : 'Account Holder' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="addCardOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="addCardOpen = false; showToast(locale === 'ar' ? 'تمت إضافة الحساب' : 'Account added')" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إضافة' : 'Add' }}</button>
            </template>
        </BaseModal>

        <!-- Toasts -->
        <Teleport to="body">
            <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] space-y-2 w-[calc(100%-2rem)] max-w-sm">
                <TransitionGroup name="toast">
                    <div v-for="t in toasts" :key="t.id" class="px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                        <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ t.msg }}
                    </div>
                </TransitionGroup>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
.tabular-nums {
    font-variant-numeric: tabular-nums;
}
</style>