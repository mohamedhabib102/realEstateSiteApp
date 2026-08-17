<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Landmark, CreditCard, Plus, CheckCircle2, BadgeCheck, XCircle,
    Wallet, ArrowDownRight, ArrowUpRight, Building2
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { buyerBankCards, buyerPayments, buyerInfo } from '../../../../data/buyerDashboard'

const { locale } = useI18n()

const addCardOpen = ref(false)
const toast = ref('')

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const money = (n: number) => `EGP ${fmt(n)}`

const balance = 24500

type PayStatus = 'completed' | 'pending' | 'failed' | 'refunded'
const payFilter = ref<PayStatus | 'all'>('all')

const payStatusMeta: Record<PayStatus, { en: string; ar: string; cls: string }> = {
    completed: { en: 'Completed', ar: 'مكتمل', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    failed: { en: 'Failed', ar: 'فشل', cls: 'bg-red-50 text-red-600' },
    refunded: { en: 'Refunded', ar: 'مسترجع', cls: 'bg-gray-100 text-gray-600' },
}

// Outgoing payments the buyer made -> outgoing. Completed transactions are outgoing debits.
const filtered = computed(() =>
    buyerPayments.filter((p) => payFilter.value === 'all' || p.status === payFilter.value)
)

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'الحسابات البنكية والمدفوعات' : 'Bank Accounts & Payments' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'أدر بطاقات الدفع وسجل مدفوعاتك' : 'Manage your payment cards and payment history' }}</p>
            </div>
            <button @click="addCardOpen = true" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة بطاقة' : 'Add Card' }}
            </button>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Active cards -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><CreditCard class="w-5 h-5 text-emerald-600" /></div>
                        <div>
                            <div class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'بطاقات الدفع' : 'Payment Cards' }}</div>
                            <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? 'بطاقاتك المرتبطة' : 'Your linked cards' }}</div>
                        </div>
                    </div>
                    <button @click="addCardOpen = true" class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer" :title="locale === 'ar' ? 'إضافة' : 'Add'">
                        <Plus class="w-4 h-4" />
                    </button>
                </div>
                <div class="space-y-3">
                    <div v-for="card in buyerBankCards" :key="card.id" class="p-4 rounded-2xl border transition-all" :class="card.expired ? 'border-gray-100 bg-gray-50/60' : 'border-gray-100 hover:border-primary/30 hover:shadow-sm'">
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

            <!-- Available balance -->
            <div v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }"
                class="rounded-2xl bg-gradient-to-br from-primary via-blue-800 to-blue-900 p-6 text-white shadow-lg relative overflow-hidden">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"><Wallet class="w-5 h-5" /></div>
                        <div>
                            <div class="text-sm font-semibold text-white">{{ locale === 'ar' ? 'رصيد المدير' : 'Account Balance' }}</div>
                            <div class="text-[11px] text-white/60">{{ locale === 'ar' ? 'الأموال المتاحة' : 'Available funds' }}</div>
                        </div>
                    </div>
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold text-emerald-300">
                        <ArrowUpRight class="w-3.5 h-3.5" /> +9.2%
                    </span>
                </div>
                <div class="text-3xl font-bold tracking-tight tabular-nums" dir="ltr">{{ money(balance) }}</div>
                <div class="mt-5 pt-4 border-t border-white/15 text-xs text-white/70">
                    {{ locale === 'ar' ? 'آخر دفعة' : 'Last payment' }} · <span class="font-bold tabular-nums" dir="ltr">EGP 4,800.00</span>
                </div>
            </div>
        </div>

        <!-- Payment history -->
        <section v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 180 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 class="font-bold text-gray-900 flex items-center gap-2"><Building2 class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'سجل المدفوعات' : 'Payment History' }}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">{{ filtered.length }} {{ locale === 'ar' ? 'معاملة' : 'transactions' }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button @click="payFilter = 'all'" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border"
                        :class="payFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-primary/40'">
                        {{ locale === 'ar' ? 'الكل' : 'All' }}
                    </button>
                    <button v-for="(m, s) in payStatusMeta" :key="s" @click="payFilter = s as PayStatus" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border"
                        :class="payFilter === s ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-primary/40'">
                        {{ locale === 'ar' ? m.ar : m.en }}
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-[720px]">
                    <thead>
                        <tr class="bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-400">
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'المعاملة' : 'Transaction' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'العقار' : 'Property' }}</th>
                            <th class="text-end px-6 py-3 font-semibold">{{ locale === 'ar' ? 'المبلغ' : 'Amount' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'التاريخ' : 'Date' }}</th>
                            <th class="text-start px-6 py-3 font-semibold">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="p in filtered" :key="p.id" class="hover:bg-gray-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <ArrowDownRight class="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <div class="text-sm font-bold text-gray-800 tabular-nums" dir="ltr">{{ p.id }}</div>
                                        <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? p.methodAr : p.methodEn }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ locale === 'ar' ? p.propertyAr : p.propertyEn }}</td>
                            <td class="px-6 py-4 text-end">
                                <span class="inline-flex items-center gap-1 text-sm font-bold text-gray-900 tabular-nums" dir="ltr">{{ money(p.amount) }}</span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 tabular-nums" :dir="locale === 'ar' ? 'rtl' : 'ltr'">{{ p.date }}</td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="payStatusMeta[p.status].cls">
                                    {{ locale === 'ar' ? payStatusMeta[p.status].ar : payStatusMeta[p.status].en }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="filtered.length === 0" class="text-center py-14 text-gray-400">
                    <Building2 class="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p class="font-medium">{{ locale === 'ar' ? 'لا توجد معاملات مطابقة' : 'No matching transactions' }}</p>
                </div>
            </div>
        </section>

        <!-- Add card modal -->
        <BaseModal :open="addCardOpen" @close="addCardOpen = false" :max-width="'26rem'">
            <template #title>
                <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><CreditCard class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'إضافة بطاقة' : 'Add Payment Card' }}</h3>
            </template>
            <template #body>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'اسم البنك' : 'Bank Name' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'رقم البطاقة' : 'Card Number' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'اسم حامل البطاقة' : 'Card Holder' }}</label>
                        <input class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="addCardOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="addCardOpen = false; showToast(locale === 'ar' ? 'تمت إضافة البطاقة' : 'Card added')" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إضافة' : 'Add' }}</button>
            </template>
        </BaseModal>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translate(-50%, 10px);
}
</style>