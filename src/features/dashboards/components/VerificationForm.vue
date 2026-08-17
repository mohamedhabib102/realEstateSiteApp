<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircle2, CreditCard, User } from 'lucide-vue-next'
import ImageUpload from '../../../components/ImageUpload.vue'

defineProps<{
    submitting?: boolean
}>()

const emit = defineEmits<{
    (e: 'submit', payload: { fullNameAr: string; fullNameEn: string; nationalIdFront: string; nationalIdBack: string }): void
}>()

const { locale } = useI18n()

const fullNameAr = ref('')
const fullNameEn = ref('')
const nationalIdFront = ref('')
const nationalIdBack = ref('')

const inputCls = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'

const onSubmit = () => {
    emit('submit', {
        fullNameAr: fullNameAr.value.trim(),
        fullNameEn: fullNameEn.value.trim(),
        nationalIdFront: nationalIdFront.value,
        nationalIdBack: nationalIdBack.value,
    })
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-5">
        <!-- Personal names -->
        <div class="border border-gray-100 rounded-xl p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5"><User class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'الاسم الكامل' : 'Full Name' }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم الكامل (عربي)' : 'Full Name (Arabic)' }}</label>
                    <input v-model="fullNameAr" :class="inputCls" :placeholder="locale === 'ar' ? 'أدخل الاسم كما في الهوية' : 'Enter the name as shown on your ID'" required />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">{{ locale === 'ar' ? 'الاسم الكامل (إنجليزي)' : 'Full Name (English)' }}</label>
                    <input v-model="fullNameEn" :class="inputCls" :placeholder="locale === 'ar' ? 'أدخل الاسم بالحروف الإنجليزية' : 'Enter the name in English letters'" dir="ltr" required />
                </div>
            </div>
        </div>

        <!-- National ID images -->
        <div class="border border-gray-100 rounded-xl p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5"><CreditCard class="w-3.5 h-3.5" />{{ locale === 'ar' ? 'الهوية الوطنية' : 'National ID' }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload v-model="nationalIdFront" :label="locale === 'ar' ? 'الوجه الأمامي للهوية' : 'National ID Front'" />
                <ImageUpload v-model="nationalIdBack" :label="locale === 'ar' ? 'الوجه الخلفي للهوية' : 'National ID Back'" />
            </div>
        </div>

        <!-- Submit -->
        <div class="flex justify-end">
            <button
                type="submit"
                :disabled="submitting"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] text-sm font-bold shadow-md shadow-primary/20 cursor-pointer disabled:opacity-60"
            >
                <CheckCircle2 class="w-4 h-4" />
                {{ submitting ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...') : (locale === 'ar' ? 'إرسال الطلب' : 'Submit Request') }}
            </button>
        </div>
    </form>
</template>