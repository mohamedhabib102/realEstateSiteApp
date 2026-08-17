<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Search, MailOpen, CheckCircle2, Image, Send } from 'lucide-vue-next'
import ContentSectionEditor from '../../components/ContentSectionEditor.vue'
import { contactMessages } from '../../../../data/superAdminDashboard'
import { contactPageSections } from '../../../../data/contactPageContent'
import type { EditableSection } from '../../../../data/contentTypes'

const { locale } = useI18n()

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

const tab = ref<'content' | 'messages'>('messages')
const sections = ref<EditableSection[]>(clone(contactPageSections))
const toast = ref('')

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

const save = () => {
    toast.value = locale.value === 'ar' ? 'تم حفظ محتوى صفحة التواصل' : 'Contact page content saved'
    setTimeout(() => (toast.value = ''), 3000)
}

const tabs = [
    { key: 'content' as const, labelEn: 'Page Content', labelAr: 'محتوى الصفحة', icon: Image },
    { key: 'messages' as const, labelEn: 'Messages', labelAr: 'الرسائل', icon: Mail },
]
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-end justify-between gap-3">
            <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'تواصل معنا' : 'Contact' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'تحرير محتوى الصفحة ومتابعة الرسائل' : 'Edit page content and review messages' }}</p>
            </div>
            <button
                v-if="tab === 'content'"
                @click="save"
                v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer"
            >
                <CheckCircle2 class="w-4 h-4" /> {{ locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes' }}
            </button>
        </div>

        <!-- Tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            <button
                v-for="t in tabs" :key="t.key"
                @click="tab = t.key"
                class="px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                :class="tab === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
                <component :is="t.icon" class="w-4 h-4" />
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
                <span v-if="t.key === 'messages'" class="text-[11px] px-1.5 py-0.5 rounded-full" :class="tab === t.key ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'">{{ list.filter((m) => !m.read).length }}</span>
            </button>
        </div>

        <!-- Page Content tab -->
        <div v-if="tab === 'content'" class="space-y-4">
            <ContentSectionEditor v-for="s in sections" :key="s.key" :section="s" :icon="s.key === 'form' ? Send : Image" />
        </div>

        <!-- Messages tab -->
        <template v-else>
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
        </template>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 bg-gray-900 text-white rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"><CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" /> {{ toast }}</div>
        </Transition>
    </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>