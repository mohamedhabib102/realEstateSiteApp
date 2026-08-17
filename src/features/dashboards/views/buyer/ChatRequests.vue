<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Inbox, MapPin, MessageCircle, CheckCircle2, ArrowUpRight, Clock
} from 'lucide-vue-next'
import { chatRequests, type ChatRequestStatus } from '../../../../data/buyerDashboard'

const { locale } = useI18n()

const tab = ref<ChatRequestStatus | 'all'>('all')

const tabs = [
    { key: 'all' as const, labelEn: 'All', labelAr: 'الكل' },
    { key: 'pending' as const, labelEn: 'Pending', labelAr: 'معلقة' },
    { key: 'accepted' as const, labelEn: 'Accepted', labelAr: 'مقبولة' },
    { key: 'rejected' as const, labelEn: 'Rejected', labelAr: 'مرفوضة' },
]

const list = ref([...chatRequests])

const filtered = computed(() => tab.value === 'all' ? list.value : list.value.filter((r) => r.status === tab.value))
const countBy = (s: ChatRequestStatus) => list.value.filter((r) => r.status === s).length

const statusMeta: Record<ChatRequestStatus, { en: string; ar: string; cls: string; dot: string }> = {
    pending: { en: 'Pending', ar: 'معلقة', cls: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
    accepted: { en: 'Accepted', ar: 'مقبولة', cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
    rejected: { en: 'Rejected', ar: 'مرفوضة', cls: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'طلبات المحادثة' : 'Chat Requests' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'متابعة طلبات المحادثة المرسلة إلى الملاك' : 'Track the chat requests you sent to owners' }}</p>
        </div>

        <!-- Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            <button
                v-for="t in tabs" :key="t.key"
                @click="tab = t.key"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                :class="tab === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
                <span v-if="t.key !== 'all'" class="w-1.5 h-1.5 rounded-full" :class="statusMeta[t.key].dot"></span>
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
                <span v-if="t.key !== 'all'" class="text-[11px] px-1.5 py-0.5 rounded-full" :class="statusMeta[t.key].cls">{{ countBy(t.key) }}</span>
            </button>
        </div>

        <!-- List -->
        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 } }" class="space-y-3">
            <div
                v-for="(r, i) in filtered" :key="r.id"
                v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 50 } }"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="w-12 h-12 rounded-2xl overflow-hidden shrink-0">
                        <img :src="r.avatar" alt="" class="w-full h-full object-cover" />
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-gray-900 text-sm truncate">{{ locale === 'ar' ? r.ownerAr : r.ownerEn }}</span>
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="statusMeta[r.status].cls">
                                {{ locale === 'ar' ? statusMeta[r.status].ar : statusMeta[r.status].en }}
                            </span>
                        </div>
                        <div class="flex items-center gap-1 text-xs text-gray-400 mt-0.5 truncate">
                            <MapPin class="w-3 h-3 text-primary" />{{ locale === 'ar' ? r.propertyAr : r.propertyEn }}
                        </div>
                        <p class="text-xs text-gray-500 mt-1.5 line-clamp-2">{{ locale === 'ar' ? r.messageAr : r.messageEn }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1 text-[11px] text-gray-400 me-auto sm:me-0"><Clock class="w-3 h-3" />{{ r.time }}</span>
                    <template v-if="r.status === 'accepted'">
                        <router-link
                            :to="`/${locale}/dashboards/messages`"
                            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-xs font-bold"
                        >
                            <MessageCircle class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'متابعة المحادثة' : 'Continue Conversation' }}
                            <ArrowUpRight class="w-3.5 h-3.5" />
                        </router-link>
                    </template>
                    <template v-else-if="r.status === 'pending'">
                        <span class="text-[11px] font-semibold text-amber-600 bg-amber-50 px-3 py-2 rounded-xl">
                            {{ locale === 'ar' ? 'بانتظار رد المالك' : 'Awaiting owner response' }}
                        </span>
                    </template>
                    <template v-else>
                        <span class="text-[11px] font-semibold text-gray-400 bg-gray-50 px-3 py-2 rounded-xl">
                            {{ locale === 'ar' ? 'تم رفض الطلب' : 'Request declined' }}
                        </span>
                    </template>
                </div>
            </div>

            <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
                <Inbox class="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p class="font-medium">{{ locale === 'ar' ? 'لا توجد طلبات' : 'No requests yet' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>