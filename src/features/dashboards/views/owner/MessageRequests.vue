<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, Inbox, Mail, Phone, Check, X, Building2, CheckCircle2
} from 'lucide-vue-next'
import { messageRequests, type MessageRequest, type MessageRequestStatus } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<'all' | MessageRequestStatus>('all')
const list = ref<MessageRequest[]>([...messageRequests])

const statusMeta: Record<MessageRequestStatus, { en: string; ar: string; cls: string }> = {
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    accepted: { en: 'Accepted', ar: 'مقبول', cls: 'bg-emerald-50 text-emerald-700' },
    rejected: { en: 'Rejected', ar: 'مرفوض', cls: 'bg-red-50 text-red-600' },
}

const filtered = computed(() =>
    list.value.filter((r) => {
        const name = locale.value === 'ar' ? r.buyerAr : r.buyerEn
        const prop = locale.value === 'ar' ? r.propertyAr : r.propertyEn
        const matchesSearch = (name + ' ' + prop).toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || r.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
)

const countBy = (s: MessageRequestStatus) => list.value.filter((r) => r.status === s).length

const setStatus = (r: MessageRequest, s: MessageRequestStatus) => {
    const idx = list.value.findIndex((x) => x.id === r.id)
    if (idx !== -1) {
        list.value[idx] = { ...list.value[idx], status: s }
        showToast(
            s === 'accepted'
                ? (locale.value === 'ar' ? 'تم قبول الطلب' : 'Request accepted')
                : (locale.value === 'ar' ? 'تم رفض الطلب' : 'Request rejected')
        )
    }
}

const toast = ref('')
const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'طلبات الرسائل' : 'Message Requests' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'طلب' : 'requests' }}</p>
            </div>
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/5 text-primary rounded-xl text-sm font-semibold">
                <Inbox class="w-4 h-4" /> {{ countBy('pending') }} {{ locale === 'ar' ? 'بانتظار الرد' : 'awaiting response' }}
            </div>
        </div>

        <!-- Search + filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 90 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'ابحث عن مشترٍ أو عقار...' : 'Search buyer or property...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <div class="flex flex-wrap gap-3">
                <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                    :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                    {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ list.length }})
                </button>
                <button v-for="(m, s) in statusMeta" :key="s" @click="statusFilter = s"
                    class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                    :class="statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                    {{ locale === 'ar' ? m.ar : m.en }} ({{ countBy(s as MessageRequestStatus) }})
                </button>
            </div>
        </div>

        <!-- Request list -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
                v-for="(r, i) in filtered" :key="r.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
                <!-- Buyer header -->
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <img :src="r.buyerAvatar" alt="" class="w-11 h-11 rounded-full object-cover shrink-0" />
                        <div class="min-w-0">
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-gray-900 text-sm truncate">{{ locale === 'ar' ? r.buyerAr : r.buyerEn }}</span>
                                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wide shrink-0">{{ r.buyerType === 'buyer' ? (locale === 'ar' ? 'مشترٍ' : 'Buyer') : (locale === 'ar' ? 'مستأجر' : 'Renter') }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                                <span class="inline-flex items-center gap-1"><Mail class="w-3 h-3" />{{ r.buyerEmail }}</span>
                                <span class="inline-flex items-center gap-1"><Phone class="w-3 h-3" />{{ r.buyerPhone }}</span>
                            </div>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0" :class="statusMeta[r.status].cls">
                        {{ locale === 'ar' ? statusMeta[r.status].ar : statusMeta[r.status].en }}
                    </span>
                </div>

                <!-- Property -->
                <div class="mt-4 flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                    <img :src="r.propertyImage" alt="" class="w-11 h-9 rounded-lg object-cover shrink-0" />
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-bold text-gray-800 truncate">{{ locale === 'ar' ? r.propertyAr : r.propertyEn }}</div>
                        <div class="text-[11px] text-gray-400 inline-flex items-center gap-1"><Building2 class="w-3 h-3" />{{ locale === 'ar' ? 'العقار المعني' : 'Property in question' }}</div>
                    </div>
                    <span class="text-[11px] text-gray-400 shrink-0">{{ r.date }}</span>
                </div>

                <!-- Message -->
                <p class="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {{ locale === 'ar' ? r.messageAr : r.messageEn }}
                </p>

                <!-- Actions -->
                <div class="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <template v-if="r.status === 'pending'">
                        <button @click="setStatus(r, 'accepted')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer">
                            <Check class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'قبول' : 'Accept' }}
                        </button>
                        <button @click="setStatus(r, 'rejected')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">
                            <X class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'رفض' : 'Reject' }}
                        </button>
                    </template>
                    <template v-else>
                        <span class="text-xs font-semibold text-gray-400 inline-flex items-center gap-1.5">
                            <CheckCircle2 v-if="r.status === 'accepted'" class="w-3.5 h-3.5 text-emerald-500" />
                            <X v-else class="w-3.5 h-3.5 text-red-400" />
                            {{ r.status === 'accepted'
                                ? (locale === 'ar' ? 'تم قبول هذا الطلب' : 'This request has been accepted')
                                : (locale === 'ar' ? 'تم رفض هذا الطلب' : 'This request has been rejected') }}
                        </span>
                    </template>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <Inbox class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد طلبات مطابقة' : 'No matching requests' }}</p>
        </div>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>