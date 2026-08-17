<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Search, Trash2, MailOpen, CheckCircle2 } from 'lucide-vue-next'
import { contactMessages } from '../../../../data/superAdminDashboard'

const { locale } = useI18n()

const search = ref('')
const list = ref([...contactMessages])
const openId = ref<string | null>(null)

const filtered = computed(() =>
    list.value.filter((m) =>
        (locale.value === 'ar' ? m.nameAr : m.nameEn).toLowerCase().includes(search.value.toLowerCase())
    )
)

const markRead = (id: string) => {
    const idx = list.value.findIndex((m) => m.id === id)
    if (idx !== -1) list.value[idx] = { ...list.value[idx], read: true }
}

const toggleOpen = (id: string) => {
    openId.value = openId.value === id ? null : id
    markRead(id)
}
</script>

<template>
    <div class="space-y-6">
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'تواصل معنا' : 'Contact Messages' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ list.filter((m) => !m.read).length }} {{ locale === 'ar' ? 'رسالة غير مقروءة' : 'unread messages' }}</p>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="relative max-w-sm">
            <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
            <input v-model="search" type="text" :placeholder="locale === 'ar' ? 'ابحث عن مرسل...' : 'Search senders...'"
                class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'" />
        </div>

        <div v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120 } }" class="space-y-3">
            <div v-for="m in filtered" :key="m.id" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                :class="!m.read ? 'border-primary/30' : ''">
                <button @click="toggleOpen(m.id)" class="w-full text-start p-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer">
                    <div class="relative shrink-0">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="m.read ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'">
                            <MailOpen v-if="m.read" class="w-5 h-5" />
                            <Mail v-else class="w-5 h-5" />
                        </div>
                        <span v-if="!m.read" class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full ring-2 ring-white"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <span class="font-semibold text-gray-900 text-sm">{{ locale === 'ar' ? m.nameAr : m.nameEn }}</span>
                            <span class="text-[11px] text-gray-400">{{ m.date }}</span>
                        </div>
                        <div class="text-xs text-gray-500 mt-0.5 font-semibold">{{ locale === 'ar' ? m.subjectAr : m.subjectEn }}</div>
                        <div class="text-[11px] text-gray-400 mt-0.5">{{ m.email }}</div>
                    </div>
                </button>

                <div v-if="openId === m.id" v-motion :initial="{ opacity: 0, y: 8 }" :enter="{ opacity: 1, y: 0, transition: { duration: 250 } }" class="px-4 pb-4 pt-1">
                    <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p class="text-sm text-gray-600 leading-relaxed">{{ locale === 'ar' ? m.messageAr : m.messageEn }}</p>
                    </div>
                    <div class="flex justify-end mt-3">
                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer">
                            <CheckCircle2 class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'رد' : 'Reply' }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
                <Mail class="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p class="font-medium">{{ locale === 'ar' ? 'لا توجد رسائل' : 'No messages' }}</p>
            </div>
        </div>
    </div>
</template>