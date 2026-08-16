<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from './components/Header.vue';
import GlobalDrawer from './components/GlobalDrawer.vue';
import Footer from './components/Footer.vue';

const { locale } = useI18n();
const isDrawerOpen = ref(false);

const handleResize = () => {
    if (window.innerWidth >= 1024) {
        isDrawerOpen.value = false;
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="min-h-screen bg-bg flex flex-col relative">
        <Header @open-drawer="isDrawerOpen = true" />

        <GlobalDrawer :is-open="isDrawerOpen" @close="isDrawerOpen = false" />

        <main class="flex-grow relative z-0">
            <router-view :key="locale" />
        </main>

        <Footer />
    </div>
</template>
