<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Globe, Menu } from 'lucide-vue-next';
import GlobalDrawer from './components/GlobalDrawer.vue';
import Footer from './components/Footer.vue';

const { locale } = useI18n();
const router = useRouter();

const isDrawerOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 400;
};

onMounted(() => {
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
    <div class="min-h-screen bg-bg flex flex-col relative">
        <!-- Global Top Menu -->
        <div 
            class="fixed z-50 transition-all duration-500 ease-out w-full flex items-center"
            :class="isScrolled ? 'top-0 bg-surface/30 backdrop-blur-xl shadow-sm py-4' : 'top-0 bg-transparent py-8 pointer-events-none'"
        >
            <!-- Content Wrapper -->
            <div 
                class="flex items-center gap-6 w-full max-w-7xl mx-auto px-8 md:px-12 pointer-events-auto transition-colors duration-500"
                :class="[
                    locale === 'ar' ? 'justify-start' : 'justify-end',
                    isScrolled ? 'text-text-main mix-blend-normal' : 'text-white mix-blend-difference'
                ]"
            >
                <div class="flex items-center gap-6" :class="locale === 'ar' ? 'flex-row-reverse' : ''">
                    <button @click="toggleLanguage" class="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer group">
                        <Globe class="w-7 h-7 stroke-[1.5]" />
                        <span class="font-medium text-lg uppercase tracking-wider">{{ locale === 'ar' ? 'EN' : 'عربي' }}</span>
                    </button>
                    <div @click="isDrawerOpen = true" class="cursor-pointer hover:opacity-70 transition-opacity">
                        <Menu class="w-10 h-10" stroke-width="1.5" />
                    </div>
                </div>
            </div>
        </div>

        <GlobalDrawer :is-open="isDrawerOpen" @close="isDrawerOpen = false" />

        <main class="flex-grow relative z-0">
            <router-view :key="locale" />
        </main>

        <Footer />
    </div>
</template>
