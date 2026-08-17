<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Search, Bell, Menu, ShieldCheck, ChevronDown, Settings, User, LogOut, Globe } from 'lucide-vue-next'
import { ownerInfo, notifications } from '../../../data/ownerDashboard'
import { roleConfig } from '../roles'
import { currentRole } from '../../../data/currentRole'

defineProps<{
    onMenu: () => void
}>()

const { locale } = useI18n()
const router = useRouter()
const notifOpen = ref(false)
const profileOpen = ref(false)
const unreadCount = notifications.filter((n) => n.unread).length
const roleLabel = roleConfig[currentRole].roleLabel

const toggleLanguage = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar'
    const currentPath = router.currentRoute.value.fullPath
    let newPath = currentPath
    if (currentPath.startsWith(`/${locale.value}/`)) {
        newPath = currentPath.replace(`/${locale.value}/`, `/${newLocale}/`)
    } else if (currentPath === `/${locale.value}`) {
        newPath = `/${newLocale}`
    } else {
        newPath = `/${newLocale}${currentPath}`
    }
    router.push(newPath)
}
</script>

<template>
    <header class="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center px-3 md:px-6 gap-2 md:gap-4 z-40">
        <!-- Mobile menu -->
        <button @click="onMenu" class="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer" aria-label="Menu">
            <Menu class="w-5 h-5" />
        </button>

        <!-- Search -->
        <div class="flex-1 max-w-md relative ms-1 md:ms-2">
            <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="locale === 'ar' ? 'right-3' : 'left-3'" />
            <input
                type="text"
                :placeholder="locale === 'ar' ? 'ابحث في العقارات والمعاملات...' : 'Search properties, transactions...'"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                :class="locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'"
            />
        </div>

        <!-- Right: notifications + profile (profile pinned to far right) -->
        <div class="flex items-center gap-1.5 sm:gap-2 ms-auto">
            <!-- Language switcher -->
            <button
                @click="toggleLanguage"
                class="flex items-center gap-1.5 p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
                :title="locale === 'ar' ? 'English' : 'العربية'"
                :aria-label="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
            >
                <Globe class="w-5 h-5" />
                <span class="text-xs font-bold uppercase tracking-wider hidden md:inline">{{ locale === 'ar' ? 'EN' : 'عربي' }}</span>
            </button>

            <!-- Notifications -->
            <div class="relative">
                <button
                    @click="notifOpen = !notifOpen"
                    class="relative p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
                    aria-label="Notifications"
                >
                    <Bell class="w-5 h-5" />
                    <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {{ unreadCount }}
                    </span>
                </button>

                <Transition name="dropdown">
                    <div
                        v-if="notifOpen"
                        class="absolute z-50 top-full mt-2 w-80 max-w-[85vw] bg-white rounded-2xl border border-gray-100 shadow-xl origin-top"
                        :class="locale === 'ar' ? 'left-0' : 'right-0'"
                        v-motion :enter="{ opacity: 1, scale: 1, transition: { duration: 200 } }"
                    >
                        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                            <span class="font-bold text-gray-900 text-sm">{{ locale === 'ar' ? 'الإشعارات' : 'Notifications' }}</span>
                            <span class="text-[11px] text-primary font-semibold cursor-pointer">{{ locale === 'ar' ? 'تعليم كاقرأ' : 'Mark all read' }}</span>
                        </div>
                        <div class="max-h-80 overflow-y-auto">
                            <button
                                v-for="n in notifications"
                                :key="n.id"
                                class="w-full text-start px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 cursor-pointer"
                            >
                                <span class="mt-1.5 w-2 h-2 rounded-full shrink-0" :class="n.unread ? 'bg-secondary' : 'bg-gray-300'"></span>
                                <span class="flex-1">
                                    <span class="block text-sm text-gray-800 font-medium">{{ locale === 'ar' ? n.titleAr : n.titleEn }}</span>
                                    <span class="block text-[11px] text-gray-400 mt-0.5">{{ n.time }}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- Profile -->
            <div class="relative shrink-0">
                <button
                    @click="profileOpen = !profileOpen"
                    class="flex items-center gap-2.5 p-1 ps-1.5 rounded-xl transition-all cursor-pointer border border-transparent hover:bg-gray-100 hover:border-gray-100"
                >
                    <img :src="ownerInfo.avatar" alt="" class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
                    <span class="hidden lg:block text-start leading-tight">
                        <span class="block text-sm font-bold text-gray-900">{{ locale === 'ar' ? ownerInfo.nameAr : ownerInfo.nameEn }}</span>
                        <span class="block text-[11px] font-semibold text-primary flex items-center gap-1">
                            <ShieldCheck class="w-3 h-3" />
                            {{ locale === 'ar' ? roleLabel.ar : roleLabel.en }}
                        </span>
                    </span>
                    <ChevronDown class="w-4 h-4 text-gray-400 hidden lg:block" />
                </button>

                <Transition name="dropdown">
                    <div
                        v-if="profileOpen"
                        class="absolute z-50 top-full mt-2 w-60 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
                        :class="locale === 'ar' ? 'left-0' : 'right-0'"
                        v-motion :enter="{ opacity: 1, scale: 1, transition: { duration: 200 } }"
                    >
                        <div class="flex items-center gap-3 p-4 bg-gray-50/60 border-b border-gray-100">
                            <img :src="ownerInfo.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p class="text-sm font-bold text-gray-900">{{ locale === 'ar' ? ownerInfo.nameAr : ownerInfo.nameEn }}</p>
                                <p class="text-xs text-gray-400 mt-0.5">{{ ownerInfo.email }}</p>
                            </div>
                        </div>
                        <div class="p-2">
                            <router-link
                                :to="`/${locale}/dashboards/settings`"
                                @click="profileOpen = false"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            ><Settings class="w-4 h-4 text-gray-400" /> {{ locale === 'ar' ? 'الإعدادات' : 'Settings' }}</router-link>
                            <router-link
                                :to="`/${locale}/dashboards/settings`"
                                @click="profileOpen = false"
                                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            ><User class="w-4 h-4 text-gray-400" /> {{ locale === 'ar' ? 'الملف الشخصي' : 'View Profile' }}</router-link>
                            <div class="my-1 border-t border-gray-100"></div>
                            <button
                                @click="profileOpen = false; $router.push(`/${locale}/login`)"
                                class="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            ><LogOut class="w-4 h-4" /> {{ locale === 'ar' ? 'تسجيل الخروج' : 'Log Out' }}</button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: scale(0.98);
}
</style>