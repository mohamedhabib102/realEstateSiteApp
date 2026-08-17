<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Globe, ArrowLeft, MailCheck, RotateCw } from 'lucide-vue-next'
import authBg from '../../../assets/images/auth.jpg'

const { t, locale } = useI18n()
const router = useRouter()

const code = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const toggleLanguage = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar'
    router.push(`/${newLocale}/verify-email`)
}

const goToHome = () => {
    router.push(`/${locale.value}`)
}

const goToLogin = () => {
    router.push(`/${locale.value}/login`)
}

const handleVerify = () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!code.value) {
        errorMessage.value = locale.value === 'ar' ? 'يرجى إدخال رمز التحقق' : 'Please enter the verification code'
        return
    }

    isSubmitting.value = true
    setTimeout(() => {
        isSubmitting.value = false
        successMessage.value = locale.value === 'ar' ? 'تم التحقق من بريدك الإلكتروني بنجاح!' : 'Email verified successfully!'
        setTimeout(() => goToLogin(), 1500)
    }, 800)
}

const handleResend = () => {
    successMessage.value = locale.value === 'ar' ? 'تم إعادة إرسال رمز التحقق!' : 'Verification code resent!'
}
</script>

<template>
    <div
        class="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative bg-cover bg-center bg-no-repeat overflow-x-hidden"
        :style="{ backgroundImage: `url(${authBg})` }"
    >
        <!-- Background Overlay / Blur for Depth -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

        <!-- Floating Language Switcher & Home Button -->
        <div
            class="absolute top-6 z-30 flex items-center gap-4 text-white"
            :class="locale === 'ar' ? 'left-6' : 'right-6'"
        >
            <button
                @click="toggleLanguage"
                class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/80 hover:bg-primary/60 backdrop-blur-md text-white font-medium text-xs sm:text-sm transition-all cursor-pointer border border-white/20 shadow-md"
            >
                <Globe class="w-4 h-4" />
                <span>{{ locale === 'ar' ? 'English' : 'العربية' }}</span>
            </button>
            <button
                @click="goToHome"
                class="px-3.5 py-1.5 rounded-full bg-primary/80 hover:bg-primary/60 backdrop-blur-md text-white font-medium text-xs sm:text-sm transition-all cursor-pointer border border-white/20 shadow-md"
            >
                {{ locale === 'ar' ? 'الرئيسية' : 'Home' }}
            </button>
        </div>

        <!-- Main Card Container -->
        <div
            class="w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[44px] shadow-2xl overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 p-3 sm:p-4 my-auto border border-white/40"
            v-motion
            :initial="{ opacity: 0, y: 35, scale: 0.97 }"
            :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 600, ease: 'easeOut' } }"
        >
            <!-- Left Form Side -->
            <div
                class="order-2 lg:order-1 lg:col-span-6 px-6 py-8 sm:px-10 sm:py-10 md:px-12 flex flex-col justify-between"
                v-motion
                :initial="{ opacity: 0, x: locale === 'ar' ? 25 : -25 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 200 } }"
            >
                <div>
                    <!-- Brand Logo -->
                    <div class="flex justify-center mb-6 cursor-pointer group" @click="goToHome">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md">
                                <span class="font-bold text-lg leading-none">D</span>
                            </div>
                            <span class="text-2xl font-bold tracking-widest text-primary uppercase font-playfair">
                                DWELLO
                            </span>
                        </div>
                    </div>

                    <!-- Header -->
                    <div class="text-center mb-6">
                        <div class="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <MailCheck class="w-7 h-7 text-primary" />
                        </div>
                        <h1
                            class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
                            :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                        >
                            {{ t('auth.verifyTitle') }}
                        </h1>
                        <p class="text-xs sm:text-sm text-gray-500 font-normal">
                            {{ t('auth.verifySubtitle') }}
                        </p>
                    </div>

                    <!-- Feedback Alert -->
                    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs sm:text-sm text-center font-medium">
                        {{ errorMessage }}
                    </div>
                    <div v-if="successMessage" class="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs sm:text-sm text-center font-medium">
                        {{ successMessage }}
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="handleVerify" class="space-y-4">
                        <!-- Verification Code Field -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.verificationCode') }}
                            </label>
                            <input
                                type="text"
                                v-model="code"
                                :placeholder="t('auth.verificationCodePlaceholder')"
                                class="w-full px-4 py-3 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                required
                            />
                        </div>

                        <!-- Verify Button -->
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base tracking-wide shadow-md shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer transform active:scale-[0.99] disabled:opacity-70 mt-3"
                        >
                            <span v-if="!isSubmitting">{{ t('auth.verifyEmail') }}</span>
                            <span v-else>{{ locale === 'ar' ? 'جارٍ التحقق...' : 'Verifying...' }}</span>
                        </button>
                    </form>

                    <!-- Resend Code -->
                    <div class="mt-6 flex items-center justify-center gap-2">
                        <span class="text-xs text-gray-500">{{ t('auth.didntReceive') }}</span>
                        <button
                            type="button"
                            @click="handleResend"
                            class="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                        >
                            <RotateCw class="w-3.5 h-3.5" />
                            {{ t('auth.resendCode') }}
                        </button>
                    </div>
                </div>

                <!-- Back to Login Link -->
                <div class="text-center pt-6 mt-4">
                    <button
                        type="button"
                        @click="goToLogin"
                        class="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors cursor-pointer font-semibold"
                    >
                        <ArrowLeft class="w-4 h-4" :class="locale === 'ar' ? 'rotate-180' : ''" />
                        {{ t('auth.backToLogin') }}
                    </button>
                </div>
            </div>

            <!-- Right Hero Image Side -->
            <div
                class="order-1 lg:order-2 lg:col-span-6 relative rounded-[26px] sm:rounded-[36px] overflow-hidden min-h-[380px] lg:min-h-[580px] flex flex-col justify-end p-8 sm:p-12"
                v-motion
                :initial="{ opacity: 0, scale: 1.02 }"
                :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 250 } }"
            >
                <img
                    :src="authBg"
                    alt="Real Estate Architecture"
                    class="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div
                    class="relative z-10 text-white max-w-md"
                    v-motion
                    :initial="{ opacity: 0, y: 25 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 450 } }"
                >
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 tracking-tight text-white font-playfair"
                    >
                        {{ t('auth.heroTitle') }}
                    </h2>
                    <p class="text-gray-200 text-xs sm:text-sm leading-relaxed font-light">
                        {{ t('auth.heroDesc') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
</style>