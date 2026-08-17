<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Users as UsersIcon, Search, Plus, Pencil, Trash2, ShieldCheck,
    Building2, UserRound, CheckCircle2, ChevronLeft, ChevronRight, Mail, Phone, Calendar
} from 'lucide-vue-next'
import BaseModal from '../../../../components/BaseModal.vue'
import ImageUpload from '../../../../components/ImageUpload.vue'
import {
    platformUsers, userRoleLabels, userStatusLabels,
    type PlatformUser, type PlatformUserRole, type PlatformUserStatus,
} from '../../../../data/users'

const { locale } = useI18n()

const list = ref<PlatformUser[]>([...platformUsers])
const search = ref('')
const roleFilter = ref<PlatformUserRole | 'all'>('all')
const statusFilter = ref<PlatformUserStatus | 'all'>('all')
const page = ref(1)
const perPage = 6
const modalOpen = ref(false)
const editing = ref<PlatformUser | null>(null)
const deleting = ref<PlatformUser | null>(null)
const toast = ref('')

const roleTabs = [
    { key: 'all' as const, labelEn: 'All Users', labelAr: 'كل المستخدمين' },
    { key: 'owner' as const, labelEn: 'Owners', labelAr: 'الملاك' },
    { key: 'buyer' as const, labelEn: 'Buyers', labelAr: 'المشترون' },
    { key: 'super-admin' as const, labelEn: 'Super Admins', labelAr: 'المشرفون' },
]

const roleIcon = { owner: Building2, buyer: UserRound, 'super-admin': ShieldCheck }

const statusMeta: Record<PlatformUserStatus, { en: string; ar: string; cls: string; dot: string }> = {
    active: { en: 'Active', ar: 'نشط', cls: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
    inactive: { en: 'Inactive', ar: 'غير نشط', cls: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
    suspended: { en: 'Suspended', ar: 'موقوف', cls: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
}

const filtered = computed(() => {
    const q = search.value.toLowerCase()
    return list.value.filter((u) => {
        const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value
        const matchesStatus = statusFilter.value === 'all' || u.status === statusFilter.value
        const name = locale.value === 'ar' ? u.nameAr : u.nameEn
        const matchesSearch = (name + ' ' + u.email).toLowerCase().includes(q)
        return matchesRole && matchesStatus && matchesSearch
    })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

const countByRole = (r: PlatformUserRole | 'all') => r === 'all' ? list.value.length : list.value.filter((u) => u.role === r).length

const resetPage = () => { page.value = 1 }

const openAdd = () => {
    editing.value = null
    form.value = {
        id: `U-${Date.now()}`,
        nameEn: '', nameAr: '', email: '', phone: '', role: 'buyer',
        status: 'active', joinedAt: new Date().toISOString().slice(0, 10),
        avatar: '', activityCount: 0,
    }
    modalOpen.value = true
}

const openEdit = (u: PlatformUser) => {
    editing.value = u
    form.value = { ...u }
    modalOpen.value = true
}

const form = ref<PlatformUser>({
    id: '', nameEn: '', nameAr: '', email: '', phone: '', role: 'buyer',
    status: 'active', joinedAt: '', avatar: '', activityCount: 0,
})

const save = () => {
    if (!form.value.nameEn.trim() || !form.value.email.trim()) {
        showToast(locale.value === 'ar' ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Please enter a name and email')
        return
    }
    if (editing.value) {
        const idx = list.value.findIndex((x) => x.id === editing.value!.id)
        if (idx !== -1) list.value[idx] = { ...form.value, id: editing.value!.id }
        showToast(locale.value === 'ar' ? 'تم تحديث المستخدم بنجاح' : 'User updated successfully')
    } else {
        list.value.unshift({ ...form.value })
        showToast(locale.value === 'ar' ? 'تمت إضافة المستخدم بنجاح' : 'User added successfully')
    }
    modalOpen.value = false
}

const confirmDelete = () => {
    if (deleting.value) {
        list.value = list.value.filter((u) => u.id !== deleting.value!.id)
        showToast(locale.value === 'ar' ? 'تم حذف المستخدم' : 'User deleted')
        deleting.value = null
    }
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
                <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'المستخدمون' : 'Users' }}</h1>
                <p class="text-sm text-gray-500 mt-1">{{ filtered.length }} {{ locale === 'ar' ? 'مستخدم' : 'users' }}</p>
            </div>
            <button @click="openAdd" v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-[0.98] text-sm font-semibold cursor-pointer">
                <Plus class="w-4 h-4" /> {{ locale === 'ar' ? 'إضافة مستخدم' : 'Add User' }}
            </button>
        </div>

        <!-- Role tabs -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }" class="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit flex-wrap">
            <button
                v-for="t in roleTabs" :key="t.key"
                @click="roleFilter = t.key; resetPage()"
                class="px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                :class="roleFilter === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
                {{ locale === 'ar' ? t.labelAr : t.labelEn }}
                <span class="text-[11px] px-1.5 py-0.5 rounded-full" :class="roleFilter === t.key ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'">{{ countByRole(t.key) }}</span>
            </button>
        </div>

        <!-- Filters -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120 } }" class="flex flex-col md:flex-row gap-3">
            <div class="relative flex-1 md:max-w-sm">
                <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
                <input
                    v-model="search"
                    type="text"
                    :placeholder="locale === 'ar' ? 'ابحث بالاسم أو البريد...' : 'Search by name or email...'"
                    class="w-full bg-white border border-gray-100 rounded-xl py-2.5 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
                />
            </div>
            <select v-model="statusFilter" @change="resetPage" class="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                <option value="all">{{ locale === 'ar' ? 'كل الحالات' : 'All Statuses' }}</option>
                <option v-for="(meta, key) in statusMeta" :key="key" :value="key">{{ locale === 'ar' ? meta.ar : meta.en }}</option>
            </select>
        </div>

        <!-- Users grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
                v-for="(u, i) in paged" :key="u.id"
                v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 60 } }"
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
                <div class="flex items-start gap-3">
                    <div class="relative shrink-0">
                        <img :src="u.avatar" alt="" class="w-12 h-12 rounded-2xl object-cover" />
                        <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white" :class="statusMeta[u.status].dot"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-1.5">
                            <component :is="roleIcon[u.role]" class="w-3.5 h-3.5 text-primary shrink-0" />
                            <span class="font-bold text-sm text-gray-900 truncate">{{ locale === 'ar' ? u.nameAr : u.nameEn }}</span>
                        </div>
                        <p class="text-xs text-gray-400 truncate mt-0.5" dir="ltr">{{ u.email }}</p>
                        <div class="flex items-center gap-2 mt-2 flex-wrap">
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary">
                                {{ locale === 'ar' ? userRoleLabels[u.role].ar : userRoleLabels[u.role].en }}
                            </span>
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="statusMeta[u.status].cls">
                                {{ locale === 'ar' ? statusMeta[u.status].ar : statusMeta[u.status].en }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 mt-4 text-[11px] text-gray-400">
                    <span class="inline-flex items-center gap-1"><Phone class="w-3 h-3" /><span dir="ltr">{{ u.phone }}</span></span>
                    <span class="inline-flex items-center gap-1"><Calendar class="w-3 h-3" />{{ u.joinedAt }}</span>
                    <span v-if="u.role !== 'super-admin'" class="inline-flex items-center gap-1 col-span-2">
                        {{ locale === 'ar'
                            ? (u.role === 'owner' ? `${u.activityCount} عقار منشور` : `${u.activityCount} عملية شراء`)
                            : (u.role === 'owner' ? `${u.activityCount} listed properties` : `${u.activityCount} purchases`) }}
                    </span>
                </div>

                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-1.5">
                    <button @click="openEdit(u)" class="p-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer" :title="locale === 'ar' ? 'تعديل' : 'Edit'"><Pencil class="w-4 h-4" /></button>
                    <button @click="deleting = u" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer" :title="locale === 'ar' ? 'حذف' : 'Delete'"><Trash2 class="w-4 h-4" /></button>
                </div>
            </div>
        </div>

        <div v-if="paged.length === 0" class="text-center py-16 text-gray-400">
            <UsersIcon class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p class="font-medium">{{ locale === 'ar' ? 'لا يوجد مستخدمون مطابقون' : 'No matching users' }}</p>
        </div>

        <!-- Pagination (mock) -->
        <div v-if="filtered.length > perPage" class="flex items-center justify-center gap-2">
            <button
                @click="page = Math.max(1, page - 1)"
                :disabled="page === 1"
                class="p-2 rounded-xl bg-white border border-gray-100 shadow-sm text-gray-500 hover:text-primary disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                :aria-label="locale === 'ar' ? 'السابق' : 'Previous'"
            ><ChevronLeft class="w-4 h-4" /></button>
            <button
                v-for="n in totalPages" :key="n"
                @click="page = n"
                class="w-9 h-9 rounded-xl text-sm font-bold transition-all cursor-pointer"
                :class="page === n ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border border-gray-100 text-gray-500 hover:text-primary'"
            >{{ n }}</button>
            <button
                @click="page = Math.min(totalPages, page + 1)"
                :disabled="page === totalPages"
                class="p-2 rounded-xl bg-white border border-gray-100 shadow-sm text-gray-500 hover:text-primary disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                :aria-label="locale === 'ar' ? 'التالي' : 'Next'"
            ><ChevronRight class="w-4 h-4" /></button>
        </div>

        <!-- Add/Edit modal -->
        <BaseModal :open="modalOpen" @close="modalOpen = false" :max-width="'32rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ editing ? (locale === 'ar' ? 'تعديل المستخدم' : 'Edit User') : (locale === 'ar' ? 'إضافة مستخدم' : 'Add User') }}</h3></template>
            <template #body>
                <div class="space-y-4">
                    <ImageUpload v-model="form.avatar" :label="locale === 'ar' ? 'الصورة الرمزية' : 'Avatar'" />
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (عربي)' : 'Name (English)' }}</label><input v-model="form.nameEn" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                        <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم (إنجليزي)' : 'Name (Arabic)' }}</label><input v-model="form.nameAr" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    </div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}</label><input v-model="form.email" type="email" dir="ltr" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div><label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'رقم الهاتف' : 'Phone' }}</label><input v-model="form.phone" dir="ltr" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الدور' : 'Role' }}</label>
                            <select v-model="form.role" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                                <option v-for="(label, key) in userRoleLabels" :key="key" :value="key">{{ locale === 'ar' ? label.ar : label.en }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</label>
                            <select v-model="form.status" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
                                <option v-for="(meta, key) in statusMeta" :key="key" :value="key">{{ locale === 'ar' ? meta.ar : meta.en }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="modalOpen = false" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="save" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حفظ' : 'Save' }}</button>
            </template>
        </BaseModal>

        <!-- Delete modal -->
        <BaseModal :open="!!deleting" @close="deleting = null" :max-width="'24rem'">
            <template #title><h3 class="text-lg font-bold text-gray-900">{{ locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion' }}</h3></template>
            <template #body>
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><Trash2 class="w-5 h-5 text-red-500" /></div>
                    <p class="text-sm text-gray-600">{{ locale === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?' }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="deleting = null" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">{{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}</button>
                <button @click="confirmDelete" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
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