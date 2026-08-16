<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Globe, Building2, UserCheck, Check } from 'lucide-vue-next'
import authBg from '../../../assets/images/auth.jpg'

const { t, locale } = useI18n()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const selectedRole = ref<'owner' | 'client'>('client')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const toggleLanguage = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar'
    router.push(`/${newLocale}/register`)
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!fullName.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
        errorMessage.value = locale.value === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
        return
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = locale.value === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'
        return
    }

    isSubmitting.value = true
    setTimeout(() => {
        isSubmitting.value = false
        successMessage.value = locale.value === 'ar' ? 'تم إنشاء الحساب بنجاح! مرحباً بك في دويلو' : 'Account created successfully! Welcome to Dwello'
        setTimeout(() => {
            router.push(`/${locale.value}/products`)
        }, 1200)
    }, 800)
}

const handleGoogleAuth = () => {
    successMessage.value = locale.value === 'ar' ? 'جاري التسجيل عبر Google...' : 'Connecting with Google...'
    setTimeout(() => {
        router.push(`/${locale.value}/products`)
    }, 1000)
}

const goToLogin = () => {
    router.push(`/${locale.value}/login`)
}

const goToHome = () => {
    router.push(`/${locale.value}`)
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
                class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/80 hover:bg-primary/60  backdrop-blur-md text-white font-medium text-xs sm:text-sm transition-all cursor-pointer border border-white/20 shadow-md"
            >
                <Globe class="w-4 h-4" />
                <span>{{ locale === 'ar' ? 'English' : 'العربية' }}</span>
            </button>
            <button 
                @click="goToHome" 
                class="px-3.5 py-1.5 rounded-full bg-primary/80 hover:bg-primary/60  backdrop-blur-md text-white font-medium text-xs sm:text-sm transition-all cursor-pointer border border-white/20 shadow-md"
            >
                {{ locale === 'ar' ? 'الرئيسية' : 'Home' }}
            </button>
        </div>

        <!-- Main Card Container Matching Image 1 -->
        <div 
            class="w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[44px] shadow-2xl overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 p-3 sm:p-4 my-auto border border-white/40"
            v-motion
            :initial="{ opacity: 0, y: 35, scale: 0.97 }"
            :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 600, ease: 'easeOut' } }"
        >
            <!-- Left Form Side -->
            <div 
                class="order-2 lg:order-1 lg:col-span-6 px-6 py-6 sm:px-10 sm:py-8 md:px-12 flex flex-col justify-between"
                v-motion
                :initial="{ opacity: 0, x: locale === 'ar' ? 25 : -25 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 200 } }"
            >
                <div>
                    <!-- Brand Logo (Matches Footer and Brand Color) -->
                    <div class="flex justify-center mb-5 cursor-pointer group" @click="goToHome">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md">
                                <span class="font-bold text-lg leading-none">D</span>
                            </div>
                            <span class="text-2xl font-bold tracking-widest text-primary uppercase font-playfair">
                                DWELLO
                            </span>
                        </div>
                    </div>

                    <!-- Header (Matches Image 1: "Hello User !" and subtitle) -->
                    <div class="text-center mb-5">
                        <h1 
                            class="text-3xl sm:text-4xl font-bold text-gray-900 mb-1.5"
                            :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                        >
                            {{ t('auth.registerTitle') }}
                        </h1>
                        <p class="text-xs sm:text-sm text-gray-500 font-normal">
                            {{ t('auth.registerSubtitle') }}
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
                    <form @submit.prevent="handleRegister" class="space-y-3">
                        <!-- Full Name -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.fullName') }}
                            </label>
                            <input 
                                type="text"
                                v-model="fullName"
                                :placeholder="t('auth.fullNamePlaceholder')"
                                class="w-full px-4 py-2.5 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                required
                            />
                        </div>

                        <!-- Mail Field -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.email') }}
                            </label>
                            <input 
                                type="email"
                                v-model="email"
                                :placeholder="t('auth.emailPlaceholder')"
                                class="w-full px-4 py-2.5 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                required
                            />
                        </div>

                        <!-- Phone Field -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.phone') }}
                            </label>
                            <input 
                                type="text"
                                v-model="phone"
                                :placeholder="t('auth.phonePlaceholder')"
                                class="w-full px-4 py-2.5 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                required
                            />
                        </div>

                        <!-- Role Selection (Owner / Client) with Brand Palette -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.role') }}
                            </label>
                            <div class="grid grid-cols-2 gap-2.5">
                                <!-- Owner -->
                                <button 
                                    type="button"
                                    @click="selectedRole = 'owner'"
                                    class="py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer text-xs font-semibold"
                                    :class="selectedRole === 'owner' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-gray-200 bg-[#f2f4f7] text-gray-600 hover:bg-gray-200/60'"
                                >
                                    <Building2 class="w-3.5 h-3.5" />
                                    <span>{{ t('auth.roleOwner') }}</span>
                                    <Check v-if="selectedRole === 'owner'" class="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>

                                <!-- Client -->
                                <button 
                                    type="button"
                                    @click="selectedRole = 'client'"
                                    class="py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer text-xs font-semibold"
                                    :class="selectedRole === 'client' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-gray-200 bg-[#f2f4f7] text-gray-600 hover:bg-gray-200/60'"
                                >
                                    <UserCheck class="w-3.5 h-3.5" />
                                    <span>{{ t('auth.roleClient') }}</span>
                                    <Check v-if="selectedRole === 'client'" class="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.password') }}
                            </label>
                            <div class="relative">
                                <input 
                                    :type="showPassword ? 'text' : 'password'"
                                    v-model="password"
                                    :placeholder="t('auth.passwordPlaceholder')"
                                    class="w-full px-4 py-2.5 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    required
                                />
                                <button 
                                    type="button"
                                    @click="togglePasswordVisibility"
                                    class="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                                    :class="locale === 'ar' ? 'left-3' : 'right-3'"
                                >
                                    <EyeOff v-if="showPassword" class="w-4 h-4" />
                                    <Eye v-else class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Confirm Password Field -->
                        <div class="space-y-1">
                            <label class="block text-xs font-semibold text-gray-800">
                                {{ t('auth.confirmPassword') }}
                            </label>
                            <div class="relative">
                                <input 
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    v-model="confirmPassword"
                                    :placeholder="t('auth.confirmPasswordPlaceholder')"
                                    class="w-full px-4 py-2.5 bg-[#f2f4f7] border-none rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    required
                                />
                                <button 
                                    type="button"
                                    @click="toggleConfirmPasswordVisibility"
                                    class="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                                    :class="locale === 'ar' ? 'left-3' : 'right-3'"
                                >
                                    <EyeOff v-if="showConfirmPassword" class="w-4 h-4" />
                                    <Eye v-else class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Sign Up Button (Brand Navy) -->
                        <button 
                            type="submit"
                            :disabled="isSubmitting"
                            class="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base tracking-wide shadow-md shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer transform active:scale-[0.99] disabled:opacity-70 mt-2"
                        >
                            <span v-if="!isSubmitting">{{ t('auth.signUp') }}</span>
                            <span v-else>{{ locale === 'ar' ? 'جارٍ المعالجة...' : 'Signing Up...' }}</span>
                        </button>
                    </form>

                    <!-- Or Divider -->
                    <div class="relative my-4 text-center">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <span class="relative px-3 bg-white text-xs text-gray-400">
                            {{ t('auth.or') }}
                        </span>
                    </div>

                    <!-- Single Full-Width Google Button -->
                    <div>
                        <button 
                            type="button" 
                            @click="handleGoogleAuth"
                            class="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 font-semibold text-gray-700 text-sm shadow-sm transition-all hover:border-gray-400 cursor-pointer active:scale-[0.99]"
                        >
                            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                            </svg>
                            <span>{{ t('auth.googleButton') }}</span>
                        </button>
                    </div>
                </div>

                <!-- Bottom Link (Matches Image 1: "Already have an account ? Login Here") -->
                <div class="text-center pt-5 mt-2">
                    <p class="text-xs sm:text-sm text-gray-600">
                        {{ t('auth.alreadyHaveAccount') }}
                        <button 
                            type="button"
                            @click="goToLogin"
                            class="font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer ml-1"
                        >
                            {{ t('auth.loginHere') }}
                        </button>
                    </p>
                </div>
            </div>

            <!-- Right Hero Image Side Matching Image 1 -->
            <div 
                class="order-1 lg:order-2 lg:col-span-6 relative rounded-[26px] sm:rounded-[36px] overflow-hidden min-h-[380px] lg:min-h-[640px] flex flex-col justify-end p-8 sm:p-12"
                v-motion
                :initial="{ opacity: 0, scale: 1.02 }"
                :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 250 } }"
            >
                <!-- Image Background -->
                <img 
                    :src="authBg" 
                    alt="Real Estate Architecture" 
                    class="absolute inset-0 w-full h-full object-cover object-center"
                />
                
                <!-- Bottom Dark Gradient for Slogan Legibility -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <!-- Text Overlay (Matches Image 1) -->
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
