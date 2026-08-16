<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
    MapPin, ArrowLeft, ArrowRight, Phone, Calendar, 
    Mail, User, ShieldAlert, ShieldCheck, Key, 
    Smartphone, LogOut, Trash2, Camera, Edit2, Globe
} from 'lucide-vue-next'

const router = useRouter()
const { locale, t } = useI18n()

const buyer = computed(() => ({
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Mohamed',
    email: 'ahmed.mohamed@example.com',
    phone: '+20 100 123 4567',
    dateOfBirth: '1990-05-15',
    gender: 'male', // male, female, null
    countryEn: 'Egypt',
    countryAr: 'مصر',
    cityEn: 'Cairo',
    cityAr: 'القاهرة',
    memberSince: '2023',
    roleEn: 'Buyer',
    roleAr: 'مشتري',
    isVerified: false, // غير محقق الهوية
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
}))



// القوائم الخاصة بالأمان
const securityActions = computed(() => [
    { id: 'password', icon: Key, label: t('buyerProfile.changePassword'), action: () => console.log('Change Password') },
    { id: 'email', icon: Mail, label: t('buyerProfile.changeEmail'), action: () => console.log('Change Email') },
    { id: 'phone', icon: Smartphone, label: t('buyerProfile.changePhone'), action: () => console.log('Change Phone') },
])
</script>

<template>
    <div class="min-h-screen bg-[#F9FAFB] pb-20">

        <!-- Hero Section (Gradient Background instead of Image) -->
        <section class="relative h-48 md:h-64 overflow-hidden bg-linear-to-r from-primary to-blue-900">
            <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        </section>

        <!-- Profile Card & Layout -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <!-- Header Card (Overlapping Hero) -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-md px-6 pb-6 -mt-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-start">
                
                <!-- Avatar with Edit Button -->
                <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }" class="relative -mt-12 shrink-0 group">
                    <div class="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-gray-100 relative">
                        <img :src="buyer.avatar" alt="Profile" class="w-full h-full object-cover" />
                        <!-- Hover overlay for changing photo -->
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera class="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <!-- Basic Info -->
                <div v-motion :initial="{ opacity: 0, x: locale === 'ar' ? 20 : -20 }" :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }" class="flex-1 pt-2">
                    <h1 class="text-2xl font-bold text-gray-900 mb-1" :class="locale === 'ar' ? 'font-cairo' : ''">
                        {{ buyer.firstName }} {{ buyer.lastName }}
                    </h1>
                    <div class="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{{ t('buyerProfile.memberSince') }} {{ buyer.memberSince }}</span>
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{{ t('buyerProfile.role') }} {{ locale === 'ar' ? buyer.roleAr : buyer.roleEn }}</span>
                        <span class="flex items-center gap-1" :class="buyer.isVerified ? 'text-emerald-600' : 'text-amber-500'">
                            <ShieldCheck v-if="buyer.isVerified" class="w-4 h-4" />
                            <ShieldAlert v-else class="w-4 h-4" />
                            {{ buyer.isVerified ? t('buyerProfile.verified') : t('buyerProfile.unverified') }}
                        </span>
                    </div>
                </div>

                <!-- Edit Profile Button -->
                <div v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 200 } }" class="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <button class="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-colors font-medium text-sm">
                        <Edit2 class="w-4 h-4" />
                        {{ t('buyerProfile.editProfile') }}
                    </button>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                
                <!-- Right Column (Personal Info) - Takes 2 cols on Large -->
                <div class="lg:col-span-2 space-y-6">
                    
                    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" :class="locale === 'ar' ? 'font-cairo' : ''">
                            <User class="w-5 h-5 text-primary" />
                            {{ t('buyerProfile.personalInfo') }}
                        </h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Full Name -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.fullName') }}</label>
                                <p class="text-sm font-semibold text-gray-800">{{ buyer.firstName }} {{ buyer.lastName }}</p>
                            </div>
                            <!-- Email -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.email') }}</label>
                                <p class="text-sm font-semibold text-gray-800">{{ buyer.email }}</p>
                            </div>
                            <!-- Phone -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.phone') }}</label>
                                <p class="text-sm font-semibold text-gray-800 dir-ltr text-start">{{ buyer.phone }}</p>
                            </div>
                            <!-- DOB -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.dob') }}</label>
                                <p class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar class="w-4 h-4 text-gray-400" />
                                    {{ buyer.dateOfBirth }}
                                </p>
                            </div>
                            <!-- Gender -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.gender') }}</label>
                                <p class="text-sm font-semibold text-gray-800">
                                    {{ buyer.gender === 'male' ? t('buyerProfile.male') : buyer.gender === 'female' ? t('buyerProfile.female') : t('buyerProfile.notSpecified') }}
                                </p>
                            </div>
                            <!-- Location -->
                            <div>
                                <label class="text-xs font-medium text-gray-400 mb-1 block">{{ t('buyerProfile.location') }}</label>
                                <p class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                    <MapPin class="w-4 h-4 text-gray-400" />
                                    {{ locale === 'ar' ? buyer.countryAr : buyer.countryEn }}, 
                                    {{ locale === 'ar' ? buyer.cityAr : buyer.cityEn }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Left Column (Security & Verification) -->
                <div class="space-y-6">
                    
                    <!-- Verification Alert -->
                    <div v-if="!buyer.isVerified" v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }" 
                         class="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                        <div class="flex items-start gap-3">
                            <ShieldAlert class="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 class="text-sm font-bold text-amber-800 mb-1">{{ t('buyerProfile.verifyIdentityTitle') }}</h3>
                                <p class="text-xs text-amber-700 leading-relaxed mb-3">{{ t('buyerProfile.verifyIdentityDesc') }}</p>
                                <button class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors">
                                    {{ t('buyerProfile.verifyNow') }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Security Section -->
                    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t('buyerProfile.security') }}</h2>
                        
                        <div class="space-y-2">
                            <button v-for="action in securityActions" :key="action.id" @click="action.action" 
                                    class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 rounded-lg bg-gray-50 group-hover:bg-white text-gray-500 transition-colors">
                                        <component :is="action.icon" class="w-4 h-4" />
                                    </div>
                                    <span class="text-sm font-medium text-gray-700">{{ action.label }}</span>
                                </div>
                                <ArrowLeft v-if="locale === 'ar'" class="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                <ArrowRight v-else class="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                            </button>
                        </div>
                    </div>

                    <!-- Danger Zone -->
                    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 class="text-sm font-bold text-red-600 mb-4 uppercase tracking-wider">{{ t('buyerProfile.dangerZone') }}</h2>
                        
                        <div class="space-y-3">
                            <button class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                                <LogOut class="w-5 h-5" />
                                {{ t('buyerProfile.logoutAll') }}
                            </button>
                            
                            <button class="w-full flex items-center gap-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors text-sm font-bold">
                                <Trash2 class="w-5 h-5" />
                                {{ t('buyerProfile.deleteAccount') }}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>