<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, MessageSquare, ShieldCheck, Eye, Filter, ArrowRight
} from 'lucide-vue-next'
import { platformConversations, type PlatformConversation } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<'all' | 'active' | 'pending' | 'closed'>('all')
const activeId = ref<string>(platformConversations[0]?.id ?? '')

const statusMeta: Record<PlatformConversation['status'], { en: string; ar: string; cls: string }> = {
    active: { en: 'Active', ar: 'نشط', cls: 'bg-emerald-50 text-emerald-700' },
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    closed: { en: 'Closed', ar: 'مغلقة', cls: 'bg-gray-100 text-gray-500' },
}

const filtered = computed(() =>
    platformConversations.filter((c) => {
        const name = locale.value === 'ar' ? `${c.buyerAr} ${c.ownerAr}` : `${c.buyerEn} ${c.ownerEn}`
        const matchesSearch = name.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || c.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
)

const active = computed(() => platformConversations.find((c) => c.id === activeId.value) ?? null)

const countBy = (s: PlatformConversation['status']) => platformConversations.filter((c) => c.status === s).length

const totalUnread = platformConversations.reduce((acc, c) => acc + c.unread, 0)
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المحادثات' : 'Conversations' }}</h1>
                <p class="text-sm text-gray-500 mt-1">
                    {{ platformConversations.length }} {{ locale === 'ar' ? 'محادثة بين المشترين والملاك' : 'conversations between buyers and owners' }}
                    · {{ totalUnread }} {{ locale === 'ar' ? 'رسالة غير مقروءة' : 'unread messages' }}
                </p>
            </div>
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/5 text-primary rounded-xl text-sm font-semibold">
                <ShieldCheck class="w-4 h-4" /> {{ locale === 'ar' ? 'وضع المراقبة' : 'Monitoring mode' }}
            </div>
        </div>

        <!-- Status chips -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 90 } }" class="flex flex-wrap gap-3">
            <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ platformConversations.length }})
            </button>
            <button v-for="(m, s) in statusMeta" :key="s" @click="statusFilter = s"
                class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? m.ar : m.en }} ({{ countBy(s as PlatformConversation['status']) }})
            </button>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }"
            class="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 items-start">

            <!-- Conversation list -->
            <aside class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="p-4 border-b border-gray-100">
                    <div class="relative">
                        <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="locale === 'ar' ? 'ابحث عن محادثة...' : 'Search conversations...'"
                            class="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                        />
                    </div>
                </div>
                <div data-lenis-prevent class="divide-y divide-gray-50 max-h-[560px] overflow-y-auto overscroll-contain">
                    <button
                        v-for="con in filtered" :key="con.id"
                        @click="activeId = con.id"
                        class="w-full text-start p-4 hover:bg-gray-50 transition-colors relative cursor-pointer"
                        :class="activeId === con.id ? 'bg-primary/5' : ''"
                    >
                        <div class="flex items-center gap-3">
                            <div class="relative shrink-0">
                                <div class="relative">
                                    <img :src="con.buyerAvatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                                    <span v-if="con.buyerOnline" class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                                </div>
                                <img :src="con.ownerAvatar" alt="" class="w-5 h-5 rounded-full object-cover absolute -bottom-1 -left-1 ring-2 ring-white" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <span class="font-semibold text-gray-900 text-sm truncate">{{ locale === 'ar' ? con.buyerAr : con.buyerEn }} <span class="text-gray-300 font-normal mx-0.5">↔</span> {{ locale === 'ar' ? con.ownerAr : con.ownerEn }}</span>
                                    <span class="text-[11px] text-gray-400 shrink-0 ms-2">{{ con.time }}</span>
                                </div>
                                <div class="flex items-center justify-between mt-1">
                                    <span class="text-xs text-gray-500 truncate">{{ locale === 'ar' ? con.lastMessageAr : con.lastMessageEn }}</span>
                                </div>
                                <div class="flex items-center gap-2 mt-1.5">
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold" :class="statusMeta[con.status].cls">{{ locale === 'ar' ? statusMeta[con.status].ar : statusMeta[con.status].en }}</span>
                                    <span v-if="con.unread" class="min-w-[18px] px-1.5 h-[18px] bg-secondary text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center">{{ con.unread }}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div v-if="filtered.length === 0" class="p-8 text-center text-gray-400 text-sm">
                        <Filter class="w-8 h-8 mx-auto mb-2 opacity-40" />
                        {{ locale === 'ar' ? 'لا توجد محادثات مطابقة' : 'No matching conversations' }}
                    </div>
                </div>
            </aside>

            <!-- Chat view (read-only) -->
            <section v-if="active" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <!-- Participants header -->
                <div class="p-4 border-b border-gray-100 bg-gray-50/60">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img :src="active.buyerAvatar" alt="" class="w-11 h-11 rounded-full object-cover" />
                                <span v-if="active.buyerOnline" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wide">{{ locale === 'ar' ? 'مشترٍ' : 'Buyer' }}</span>
                                    <span class="font-bold text-gray-900 text-sm">{{ locale === 'ar' ? active.buyerAr : active.buyerEn }}</span>
                                </div>
                                <div class="text-[11px] text-gray-400">{{ active.buyerOnline ? (locale === 'ar' ? 'متصل الآن' : 'Online now') : (locale === 'ar' ? 'غير متصل' : 'Offline') }}</div>
                            </div>
                        </div>
                        <div class="hidden sm:flex items-center text-gray-300"><ArrowRight class="w-4 h-4" :class="locale === 'ar' ? 'rotate-180' : ''" /></div>
                        <div class="flex items-center gap-3">
                            <div class="text-end">
                                <div class="flex items-center gap-2 justify-end">
                                    <span class="font-bold text-gray-900 text-sm">{{ locale === 'ar' ? active.ownerAr : active.ownerEn }}</span>
                                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-secondary/10 text-amber-600 uppercase tracking-wide">{{ locale === 'ar' ? 'مالك' : 'Owner' }}</span>
                                </div>
                                <div class="text-[11px] text-gray-400">{{ active.ownerOnline ? (locale === 'ar' ? 'متصل الآن' : 'Online now') : (locale === 'ar' ? 'غير متصل' : 'Offline') }}</div>
                            </div>
                            <div class="relative">
                                <img :src="active.ownerAvatar" alt="" class="w-11 h-11 rounded-full object-cover" />
                                <span v-if="active.ownerOnline" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                            </div>
                        </div>
                    </div>
                    <!-- Property context -->
                    <div class="mt-3 flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2">
                        <img :src="active.propertyImage" alt="" class="w-10 h-9 rounded-lg object-cover shrink-0" />
                        <div class="flex-1 min-w-0">
                            <div class="text-xs font-bold text-gray-800 truncate">{{ locale === 'ar' ? active.propertyAr : active.propertyEn }}</div>
                            <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? 'العقار محل المحادثة' : 'Property under discussion' }}</div>
                        </div>
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0" :class="statusMeta[active.status].cls">{{ locale === 'ar' ? statusMeta[active.status].ar : statusMeta[active.status].en }}</span>
                    </div>
                </div>

                <!-- Timeline -->
                <div data-lenis-prevent class="p-6 space-y-5 bg-[#FAFBFD] max-h-[440px] overflow-y-auto overscroll-contain">
                    <template v-for="(msg, i) in active.messages" :key="i">
                        <!-- Date separator -->
                        <div v-if="i === 0 || msg.date !== active.messages[i - 1].date" class="flex items-center justify-center">
                            <span class="text-[11px] text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full">{{ msg.date }}</span>
                        </div>
                        <div class="flex gap-2.5" :class="msg.sender === 'buyer' ? 'justify-start' : 'justify-end'">
                            <img v-if="msg.sender === 'buyer'" :src="active.buyerAvatar" alt="" class="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
                            <div class="max-w-[75%]" :class="msg.sender === 'buyer' ? 'text-start' : 'text-end'">
                                <div
                                    class="px-4 py-2.5 text-sm shadow-sm rounded-2xl"
                                    :class="msg.sender === 'buyer'
                                        ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                                        : 'bg-primary text-white rounded-tr-sm'"
                                >
                                    {{ locale === 'ar' ? msg.textAr : msg.textEn }}
                                    <span class="block text-[10px] mt-1" :class="msg.sender === 'buyer' ? 'text-gray-400 text-end' : 'text-white/70 text-end'">{{ msg.time }} · {{ msg.sender === 'buyer' ? (locale === 'ar' ? 'مشترٍ' : 'Buyer') : (locale === 'ar' ? 'مالك' : 'Owner') }}</span>
                                </div>
                            </div>
                            <img v-if="msg.sender === 'owner'" :src="active.ownerAvatar" alt="" class="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
                        </div>
                    </template>
                </div>

                <!-- Monitoring note -->
                <div class="p-4 border-t border-gray-100 flex items-center gap-3 bg-white">
                    <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Eye class="w-4 h-4 text-primary" />
                    </div>
                    <div class="text-xs text-gray-500">
                        <span class="font-bold text-gray-700">{{ locale === 'ar' ? 'مراقبة فقط' : 'Read-only monitoring' }}</span>
                        — {{ locale === 'ar'
                            ? 'المشرف لا يشارك في هذه المحادثة. هذه نافذة عرض فقط.'
                            : 'The Super Admin is not part of this conversation. This is a view-only window.' }}
                    </div>
                </div>
            </section>

            <section v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-10 text-gray-400">
                <MessageSquare class="w-16 h-16 mb-4 opacity-40" />
                <p class="font-medium">{{ locale === 'ar' ? 'اختر محادثة لعرضها' : 'Select a conversation to view' }}</p>
            </section>
        </div>
    </div>
</template>