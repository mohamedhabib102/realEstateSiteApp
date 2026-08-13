<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Search, User } from 'lucide-vue-next'

const {  locale } = useI18n()
const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const toggleLanguage = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar'
    // Navigate to the same route but with new locale
    const newPath = route.path.replace(`/${locale.value}`, `/${newLocale}`)
    router.push(newPath)
}

const currentLanguageText = computed(() => locale.value === 'ar' ? 'English' : 'العربية')
</script>

<template>
    <header 
        class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out"
        :class="isScrolled ? 'bg-surface/95 backdrop-blur-lg shadow-md py-4 border-b border-primary/10' : 'bg-transparent backdrop-blur-none shadow-none py-6 border-b border-transparent'"
    >
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span class="text-surface font-bold text-xl leading-none">D</span>
                </div>
                <span class="text-2xl font-bold transition-colors" :class="isScrolled ? 'text-primary' : 'text-white'">Dwello</span>
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex gap-8 items-center" :class="isScrolled ? 'text-text-main' : 'text-white/90'">
                <router-link :to="`/${locale}/home`" class="font-semibold hover:text-primary transition-colors">{{ locale === 'ar' ? 'الرئيسية' : 'Home' }}</router-link>
                <router-link :to="`/${locale}/products`" class="font-semibold hover:text-primary transition-colors">{{ locale === 'ar' ? 'المنتجات' : 'Products' }}</router-link>
                <router-link :to="`/${locale}/about`" class="font-semibold hover:text-primary transition-colors">{{ locale === 'ar' ? 'عن الشركة' : 'About' }}</router-link>
                <router-link :to="`/${locale}/contact`" class="font-semibold hover:text-primary transition-colors">{{ locale === 'ar' ? 'تواصل معنا' : 'Contact Us' }}</router-link>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-4" :class="isScrolled ? 'text-text-main' : 'text-white'">
                <button class="p-2 hover:text-primary transition-colors cursor-pointer">
                    <Search class="w-5 h-5" />
                </button>
                <button class="p-2 hover:text-primary transition-colors cursor-pointer hidden sm:block">
                    <User class="w-5 h-5" />
                </button>
                <button 
                    @click="toggleLanguage" 
                    class="font-semibold text-sm px-3 py-1 border rounded-full transition-colors cursor-pointer"
                    :class="isScrolled ? 'border-primary/20 text-primary hover:bg-primary/5' : 'border-white/30 text-white hover:bg-white/10'"
                >
                    {{ currentLanguageText }}
                </button>
                <button class="hidden sm:block px-6 py-2.5 rounded-md font-semibold transition-colors cursor-pointer"
                    :class="isScrolled ? 'bg-text-main text-surface hover:bg-primary' : 'bg-white text-text-main hover:bg-gray-100'"
                >
                    {{ locale === 'ar' ? 'تسجيل' : 'Sign Up' }}
                </button>
            </div>
        </div>
    </header>
</template>
