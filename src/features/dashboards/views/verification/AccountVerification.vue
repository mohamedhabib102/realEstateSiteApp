<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { BadgeCheck, Clock, CheckCircle2, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-vue-next'
import VerificationForm from '../../components/VerificationForm.vue'
import { verificationState, submitVerification } from '../../../../data/verificationState'

const { locale } = useI18n()
const route = useRoute()

// The same page is shared by Owner and Buyer; the role comes from the route name.
const role = computed<'owner' | 'buyer'>(() =>
    route.name?.toString().startsWith('owner') ? 'owner' : 'buyer'
)

const state = computed(() => verificationState[role.value])
const isSubmitting = ref(false)
const toast = ref('')

const statusMeta: Record<string, { en: string; ar: string; cls: string; icon: typeof Clock }> = {
    'not-verified': { en: 'Not Verified', ar: 'غير موثق', cls: 'bg-amber-50 text-amber-700', icon: AlertTriangle },
    pending: { en: 'Pending Review', ar: 'قيد المراجعة', cls: 'bg-amber-50 text-amber-700', icon: Clock },
    approved: { en: 'Verified', ar: 'موثق', cls: 'bg-emerald-50 text-emerald-700', icon: BadgeCheck },
    rejected: { en: 'Rejected', ar: 'مرفوض', cls: 'bg-red-50 text-red-600', icon: AlertTriangle },
}

const onSubmit = (payload: { fullNameAr: string; fullNameEn: string; nationalIdFront: string; nationalIdBack: string }) => {
    if (!payload.fullNameAr || !payload.fullNameEn || !payload.nationalIdFront || !payload.nationalIdBack) {
        showToast(locale.value === 'ar' ? 'يرجى ملء جميع الحقول ورفع صور الهوية' : 'Please fill in all fields and upload both ID images')
        return
    }
    isSubmitting.value = true
    setTimeout(() => {
        submitVerification(role.value, payload)
        isSubmitting.value = false
        showToast(locale.value === 'ar' ? 'تم إرسال طلب التحقق بنجاح، بانتظار المراجعة' : 'Verification request submitted, pending review')
    }, 800)
}

const showToast = (msg: string) => {
    toast.value = msg
    setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
            <h1 class="text-2xl font-bold text-gray-900">{{ locale === 'ar' ? 'التحقق من الحساب' : 'Account Verification' }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'أكد هويتك لرفع مستوى الثقة والوصول إلى جميع المزايا' : 'Verify your identity to increase trust and unlock all features' }}</p>
        </div>

        <!-- Status banner -->
        <div
            v-motion :initial="{ opacity: 0, y: 12 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 80 } }"
            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-wrap items-center gap-4"
        >
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck class="w-6 h-6 text-primary" />
            </div>
            <div class="flex-1 min-w-[200px]">
                <div class="text-sm font-bold text-gray-900">{{ locale === 'ar' ? 'حالة التحقق' : 'Verification Status' }}</div>
                <div class="text-xs text-gray-400 mt-0.5">
                    {{ state.status === 'approved' ? (locale === 'ar' ? 'تم توثيق حسابك بنجاح' : 'Your account has been verified') : state.status === 'pending' ? (locale === 'ar' ? 'طلبك قيد المراجعة، سيتم إعلامك قريباً' : 'Your request is under review, you will be notified soon') : state.status === 'rejected' ? (locale === 'ar' ? 'تم رفض طلبك، يرجى إعادة المحاولة ببيانات صحيحة' : 'Your request was rejected, please retry with correct details') : (locale === 'ar' ? 'حسابك غير موثق بعد' : 'Your account is not verified yet') }}
                </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" :class="statusMeta[state.status].cls">
                <component :is="statusMeta[state.status].icon" class="w-4 h-4" />
                {{ locale === 'ar' ? statusMeta[state.status].ar : statusMeta[state.status].en }}
            </span>
        </div>

        <!-- Form card (hidden once approved) -->
        <div
            v-if="state.status !== 'approved'"
            v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 140 } }"
            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
            <h3 class="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><BadgeCheck class="w-5 h-5 text-primary" />{{ locale === 'ar' ? 'إرسال طلب التحقق' : 'Submit Verification Request' }}</h3>
            <p class="text-sm text-gray-400 mb-5">{{ locale === 'ar' ? 'قم برفع صورتَي الهوية الوطنية الأمامية والخلفية مع اسمك الكامل كما في الهوية.' : 'Upload the front and back images of your National ID along with your full name as shown on it.' }}</p>
            <VerificationForm :submitting="isSubmitting" @submit="onSubmit" />
        </div>

        <!-- Approved state -->
        <div
            v-else
            v-motion :initial="{ opacity: 0, y: 14 }" :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 140 } }"
            class="bg-white rounded-2xl border border-emerald-100 shadow-sm p-8 text-center"
        >
            <div class="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 class="w-8 h-8 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900">{{ locale === 'ar' ? 'تم التحقق من حسابك' : 'Your account is verified' }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ locale === 'ar' ? 'يمكنك الآن الاستفادة من جميع مزايا المنصة بثقة تامة.' : 'You can now enjoy all platform features with full trust.' }}</p>
            <div class="inline-flex items-center gap-1.5 mt-4 text-xs text-emerald-600 font-semibold">
                <ArrowRight class="w-4 h-4" :class="locale === 'ar' ? 'rotate-180' : ''" />
                {{ locale === 'ar' ? 'حالة موثقة' : 'Verified status' }}
            </div>
        </div>

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