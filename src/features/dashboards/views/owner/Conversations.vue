<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Send, MessageSquare } from 'lucide-vue-next'
import { conversations } from '../../../../data/ownerDashboard'

const { locale } = useI18n()

const search = ref('')
const activeId = ref<string | null>(conversations[0]?.id ?? null)
const draft = ref('')

const filtered = computed(() =>
    conversations.filter((c) =>
        (locale.value === 'ar' ? c.clientAr : c.clientEn).toLowerCase().includes(search.value.toLowerCase())
    )
)

const active = computed(() => conversations.find((c) => c.id === activeId.value) ?? null)

const send = () => {
    if (!draft.value.trim()) return
    draft.value = ''
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المحادثات' : 'Conversations' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ conversations.filter((c) => c.unread > 0).length }} {{ locale === 'ar' ? 'محادثة غير مقروءة' : 'unread conversations' }}</p>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100 } }"
            class="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <!-- List -->
            <aside class="border-gray-100 md:border-r lg:border-gray-100" :class="locale === 'ar' ? 'md:border-l md:border-r-0' : 'md:border-r'">
                <div class="p-4 border-b border-gray-100">
                    <div class="relative">
                        <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                        <input
                            v-model="search"
                            type="text"
                            :placeholder="locale === 'ar' ? 'ابحث عن عميل...' : 'Search clients...'"
                            class="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                        />
                    </div>
                </div>
                <div class="divide-y divide-gray-50">
                    <button
                        v-for="con in filtered" :key="con.id"
                        @click="activeId = con.id"
                        class="w-full text-start p-4 hover:bg-gray-50 transition-colors relative cursor-pointer"
                        :class="activeId === con.id ? 'bg-primary/5' : ''"
                    >
                        <div class="flex items-center gap-3">
                            <div class="relative shrink-0">
                                <img :src="con.avatar" alt="" class="w-11 h-11 rounded-full object-cover" />
                                <span v-if="con.online" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <span class="font-semibold text-gray-900 text-sm">{{ locale === 'ar' ? con.clientAr : con.clientEn }}</span>
                                    <span class="text-[11px] text-gray-400 shrink-0">{{ con.time }}</span>
                                </div>
                                <div class="flex items-center justify-between mt-0.5">
                                    <span class="text-xs text-gray-500 truncate">{{ locale === 'ar' ? con.lastMessageAr : con.lastMessageEn }}</span>
                                    <span v-if="con.unread" class="w-4.5 h-4.5 min-w-[18px] px-1.5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ms-2">{{ con.unread }}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div v-if="filtered.length === 0" class="p-8 text-center text-gray-400 text-sm">—</div>
                </div>
            </aside>

            <!-- Chat preview -->
            <section v-if="active">
                <div class="p-4 border-b border-gray-100 flex items-center gap-3">
                    <div class="relative shrink-0">
                        <img :src="active.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                        <span v-if="active.online" class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 text-sm">{{ locale === 'ar' ? active.clientAr : active.clientEn }}</div>
                        <div class="text-[11px] text-gray-400">{{ active.online ? (locale === 'ar' ? 'متصل الآن' : 'Online now') : (locale === 'ar' ? 'غير متصل' : 'Offline') }}</div>
                    </div>
                </div>

                <div class="p-6 space-y-4 bg-[#FAFBFD]">
                    <div class="flex items-center justify-center">
                        <span class="text-[11px] text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full">{{ locale === 'ar' ? 'اليوم' : 'Today' }}</span>
                    </div>
                    <div class="flex justify-start">
                        <div class="max-w-[75%] bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 shadow-sm">
                            {{ locale === 'ar' ? active.lastMessageAr : active.lastMessageEn }}
                            <span class="block text-[10px] text-gray-400 text-end mt-1">{{ active.time }}</span>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="max-w-[75%] bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm shadow-sm">
                            {{ locale === 'ar' ? 'بالتأكيد، يسعدني مساعدتك!' : 'Of course, happy to help!' }}
                            <span class="block text-[10px] text-white/70 text-end mt-1">1h</span>
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <div class="max-w-[75%] bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 shadow-sm">
                            {{ locale === 'ar' ? 'بالتأكيد، يمكنك زيارة العقار غداً في العاشرة صباحاً.' : 'Sure, you can visit the property tomorrow at 10 AM.' }}
                            <span class="block text-[10px] text-gray-400 text-end mt-1">1h</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 border-t border-gray-100 flex items-center gap-3">
                    <input
                        v-model="draft"
                        @keydown.enter="send"
                        type="text"
                        :placeholder="locale === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'"
                        class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button @click="send" class="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors cursor-pointer" aria-label="Send">
                        <Send class="w-5 h-5" :class="locale === 'ar' ? '-scale-x-100' : ''" />
                    </button>
                </div>
            </section>

            <section v-else class="flex flex-col items-center justify-center p-10 text-gray-400">
                <MessageSquare class="w-16 h-16 mb-4 opacity-40" />
                <p class="font-medium">{{ locale === 'ar' ? 'اختر محادثة لعرضها' : 'Select a conversation to view' }}</p>
            </section>
        </div>
    </div>
</template>