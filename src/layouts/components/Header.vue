<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Globe, Menu, User } from 'lucide-vue-next';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

const isScrolled = ref(false);

const emit = defineEmits<{
    (e: 'open-drawer'): void;
}>();

const isHome = computed(() => {
    return route.name === 'home' || route.path === '/' || route.path === `/${locale.value}` || route.path === `/${locale.value}/`;
});

const handleScroll = () => {
    let threshold = 140;
    if (isHome.value) {
        const heroEl = document.querySelector('.pin-spacer') || document.getElementById('hero');
        if (heroEl) {
            threshold = (heroEl as HTMLElement).offsetTop + (heroEl as HTMLElement).offsetHeight - 120;
        } else {
            threshold = window.innerHeight * 2.5;
        }
    }
    isScrolled.value = window.scrollY > threshold;
};

watch(() => route.path, () => {
    handleScroll();
});

onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const toggleLanguage = () => {
    const newLocale = locale.value === 'ar' ? 'en' : 'ar';
    const currentPath = router.currentRoute.value.fullPath;
    let newPath = currentPath;
    
    if (currentPath.startsWith(`/${locale.value}/`)) {
        newPath = currentPath.replace(`/${locale.value}/`, `/${newLocale}/`);
    } else if (currentPath === `/${locale.value}`) {
        newPath = `/${newLocale}`;
    } else {
        newPath = `/${newLocale}${currentPath}`;
    }
    
    router.push(newPath);
};
</script>

<template>
    <header 
        class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out"
        :class="isScrolled ? 'bg-surface/90 backdrop-blur-xl shadow-md py-4' : 'bg-transparent py-6'"
    >
        <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <!-- Logo -->
            <router-link :to="`/${locale}`" class="flex items-center gap-2.5 group cursor-pointer">
                <div class="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center shadow-md">
                    <span class="font-bold text-xl leading-none">D</span>
                </div>
                <span 
                    class="text-2xl font-bold tracking-widest uppercase transition-colors"
                    :class="isScrolled ? 'text-primary' : 'text-white'"
                >
                    Dwello
                </span>
            </router-link>

            <!-- Desktop Navigation Links -->
            <nav 
                class="hidden lg:flex items-center gap-8 font-semibold text-base transition-colors"
                :class="isScrolled ? 'text-text-main' : 'text-white/90'"
            >
                <router-link :to="`/${locale}`" class="hover:text-primary transition-colors">
                    {{ t('nav.home') }}
                </router-link>
                <router-link :to="`/${locale}/about`" class="hover:text-primary transition-colors">
                    {{ t('nav.about') }}
                </router-link>
                <router-link :to="`/${locale}/products`" class="hover:text-primary transition-colors">
                    {{ t('nav.products') }}
                </router-link>
                <router-link :to="`/${locale}/compare`" class="hover:text-primary transition-colors">
                    {{ t('nav.compare') }}
                </router-link>
                <router-link :to="`/${locale}/blog`" class="hover:text-primary transition-colors">
                    {{ t('nav.blog') }}
                </router-link>
                <router-link :to="`/${locale}/contact`" class="hover:text-primary transition-colors">
                    {{ t('nav.contact') }}
                </router-link>
            </nav>

            <!-- Action Controls (Language, Login, Mobile Toggle) -->
            <div class="flex items-center gap-3 sm:gap-4">
                <!-- Premium Login Button -->
                <router-link 
                    :to="`/${locale}/login`"
                    class="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                    :class="isScrolled 
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20' 
                        : 'bg-white/95 text-primary hover:bg-white backdrop-blur-md border border-white/50 shadow-black/10'"
                >
                    <User class="w-4 h-4 stroke-[2]" />
                    <span>{{ t('nav.login') }}</span>
                </router-link>

                <!-- Language Toggle Button (Always Visible) -->
                <button 
                    @click="toggleLanguage" 
                    class="flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-medium text-sm"
                    :class="isScrolled ? 'border-primary/20 text-primary hover:bg-primary/5' : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'"
                >
                    <Globe class="w-4 h-4 stroke-[1.75]" />
                    <span class="uppercase tracking-wider">
                        <span class="lg:hidden">{{ locale === 'ar' ? 'EN' : 'عربي' }}</span>
                        <span class="hidden lg:inline">{{ locale === 'ar' ? 'English' : 'العربية' }}</span>
                    </span>
                </button>

                <!-- Mobile Menu Toggle Button (Visible on Mobile & Tablet < lg) -->
                <button 
                    @click="emit('open-drawer')"
                    class="lg:hidden p-2 transition-colors cursor-pointer"
                    :class="isScrolled ? 'text-text-main hover:text-primary' : 'text-white hover:text-gray-200'"
                    aria-label="Toggle Navigation"
                >
                    <Menu class="w-8 h-8" stroke-width="1.75" />
                </button>
            </div>
        </div>
    </header>
</template>
