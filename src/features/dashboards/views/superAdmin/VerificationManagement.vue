<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Search, BadgeCheck, Check, X, Eye, ShieldCheck, CheckCircle2, Building2, User
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import { verificationRequests, type VerificationRequest, type VerificationStatus } from '../../../../data/verificationRequests'

const { locale } = useI18n()

const search = ref('')
const statusFilter = ref<VerificationStatus | 'all'>('all')
const list = ref<VerificationRequest[]>([...verificationRequests])
const viewing = ref<VerificationRequest | null>(null)
const toast = ref('')

const statusMeta: Record<VerificationStatus, { en: string; ar: string; cls: string }> = {
    pending: { en: 'Pending', ar: 'قيد الانتظار', cls: 'bg-amber-50 text-amber-700' },
    approved: { en: 'Approved', ar: 'موثق' , cls: 'bg-emerald-50 text-emerald-700' },
    rejected: { en: 'Rejected', ar: 'مرفوض', cls: 'bg-red-50 text-red-600' },
}

const filtered = computed(() =>
    list.value.filter((r) => {
        const name = locale.value === 'ar' ? r.userNameAr : r.userNameEn
        const matchesSearch = name.toLowerCase().includes(search.value.toLowerCase())
            || r.id.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || r.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
)

const countBy = (s: VerificationStatus) => list.value.filter((r) => r.status === s).length

const approve = (r: VerificationRequest) => {
    const idx = list.value.findIndex((x) => x.id === r.id)
    if (idx !== -1) list.value[idx] = { ...list.value[idx], status: 'approved' }
    if (viewing.value?.id === r.id) viewing.value = { ...list.value[idx] }
    showToast(locale.value === 'ar' ? 'تمت الموافقة على التحقق' : 'Verification approved')
}

const reject = (r: VerificationRequest) => {
    const idx = list.value.findIndex((x) => x.id === r.id)
    if (idx !== -1) list.value[idx] = { ...list.value[idx], status: 'rejected' }
    if (viewing.value?.id === r.id) viewing.value = { ...list.value[idx] }
    showToast(locale.value === 'ar' ? 'تم رفض التحقق' : 'Verification rejected')
}

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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'إدارة التحقق' : 'Verification Management' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'طلب تحقق' : 'verification requests' }}</p>
            </div>
        </div>

        <!-- Monitoring note -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck class="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p class="text-sm text-gray-600">
                {{ locale === 'ar'
                    ? 'يراجع المشرف العام طلبات التحقق المقدمة من المالكين والمشترين (الاسم، الدور، الحالة، تاريخ التقديم، وصورتا الهوية الوطنية) ويعتمدها أو يرفضها.'
                    : 'The admin reviews verification requests submitted by owners and buyers (name, role, status, submitted date, and National ID images) and approves or rejects them.' }}
            </p>
        </div>

        <!-- Filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'بحث بالاسم أو رقم الطلب...' : 'Search by name or request id...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <select v-model="statusFilter" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                <option value="all">{{ locale === 'ar' ? 'كل الحالات' : 'All Status' }}</option>
                <option v-for="(m, s) in statusMeta" :key="s" :value="s">{{ locale === 'ar' ? m.ar : m.en }}</option>
            </select>
        </div>

        <!-- Summary chips -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120 } }" class="flex flex-wrap gap-3">
            <button @click="statusFilter = 'all'" class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? 'الكل' : 'All' }} ({{ list.length }})
            </button>
            <button v-for="(m, s) in statusMeta" :key="s" @click="statusFilter = s"
                class="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border"
                :class="statusFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/40'">
                {{ locale === 'ar' ? m.ar : m.en }} ({{ countBy(s as VerificationStatus) }})
            </button>
        </div>

        <!-- List -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(r, i) in filtered" :key="r.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <img :src="r.avatar" alt="" class="w-11 h-11 rounded-full object-cover shrink-0" />
                        <div class="min-w-0">
                            <div class="font-bold text-gray-900 text-sm truncate">{{ locale === 'ar' ? r.userNameAr : r.userNameEn }}</div>
                            <div class="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                                <component :is="r.role === 'owner' ? Building2 : User" class="w-3 h-3 text-primary" />
                                {{ r.role === 'owner' ? (locale === 'ar' ? 'مالك' : 'Owner') : (locale === 'ar' ? 'مشتري' : 'Buyer') }}
                            </div>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0" :class="statusMeta[r.status].cls">
                        {{ locale === 'ar' ? statusMeta[r.status].ar : statusMeta[r.status].en }}
                    </span>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100">
                    <div class="text-[11px] text-gray-400">{{ locale === 'ar' ? 'تاريخ التقديم' : 'Submitted' }}</div>
                    <div class="text-sm font-semibold text-gray-800 mt-0.5" dir="ltr">{{ r.submittedAt }}</div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    <button @click="viewing = r" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-xs font-bold cursor-pointer">
                        <Eye class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'عرض التفاصيل' : 'View Details' }}
                    </button>
                    <button v-if="r.status === 'pending'" @click="approve(r)" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-xs font-bold cursor-pointer">
                        <Check class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'اعتماد' : 'Approve' }}
                    </button>
                    <button v-if="r.status === 'pending'" @click="reject(r)" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs font-bold cursor-pointer">
                        <X class="w-3.5 h-3.5" /> {{ locale === 'ar' ? 'رفض' : 'Reject' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="filtered.length === 0" class="text-center py-16 text-gray-400">
            <BadgeCheck class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا توجد طلبات مطابقة' : 'No matching requests' }}</p>
        </div>

        <!-- View details modal -->
        <BaseModal :open="!!viewing" @close="viewing = null" :max-width="'38rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900 flex items-center gap-2"><BadgeCheck class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'تفاصيل الطلب' : 'Request Details' }}</h3></template>
            <template #body>
                <div v-if="viewing" class="space-y-5">
                    <div class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <img :src="viewing.avatar" alt="" class="w-14 h-14 rounded-full object-cover" />
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-gray-900">{{ locale === 'ar' ? viewing.userNameAr : viewing.userNameEn }}</div>
                            <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <component :is="viewing.role === 'owner' ? Building2 : User" class="w-3.5 h-3.5 text-primary" />
                                {{ viewing.role === 'owner' ? (locale === 'ar' ? 'مالك' : 'Owner') : (locale === 'ar' ? 'مشتري' : 'Buyer') }}
                                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span dir="ltr">{{ viewing.id }}</span>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0" :class="statusMeta[viewing.status].cls">
                            {{ locale === 'ar' ? statusMeta[viewing.status].ar : statusMeta[viewing.status].en }}
                        </span>
                    </div>

                    <div>
                        <div class="text-[11px] text-gray-400 mb-1">{{ locale === 'ar' ? 'تاريخ التقديم' : 'Submitted At' }}</div>
                        <div class="text-sm font-semibold text-gray-800" dir="ltr">{{ viewing.submittedAt }}</div>
                    </div>

                    <div>
                        <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{{ locale === 'ar' ? 'صور الهوية الوطنية' : 'National ID Images' }}</p>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <span class="block text-[11px] font-medium text-gray-400 mb-1.5">{{ locale === 'ar' ? 'الوجه الأمامي' : 'Front' }}</span>
                                <img :src="viewing.nationalIdFront" alt="National ID Front" class="w-full h-36 object-cover rounded-xl border border-gray-100" />
                            </div>
                            <div>
                                <span class="block text-[11px] font-medium text-gray-400 mb-1.5">{{ locale === 'ar' ? 'الوجه الخلفي' : 'Back' }}</span>
                                <img :src="viewing.nationalIdBack" alt="National ID Back" class="w-full h-36 object-cover rounded-xl border border-gray-100" />
                            </div>
                        </div>
                    </div>

                    <div v-if="viewing.status === 'pending'" class="flex justify-end gap-2 pt-2">
                        <button @click="reject(viewing)" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-semibold cursor-pointer">
                            <X class="w-4 h-4" /> {{ locale === 'ar' ? 'رفض' : 'Reject' }}
                        </button>
                        <button @click="approve(viewing)" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-sm font-semibold cursor-pointer">
                            <Check class="w-4 h-4" /> {{ locale === 'ar' ? 'اعتماد' : 'Approve' }}
                        </button>
                    </div>
                </div>
            </template>
        </BaseModal>

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