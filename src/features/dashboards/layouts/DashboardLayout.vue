<script setup lang="ts">
import { ref } from 'vue'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import DashboardHeader from '../components/DashboardHeader.vue'

const SIDEBAR_STORAGE_KEY = 'dwello-dashboard-sidebar-collapsed'

const mobileOpen = ref(false)

const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY)
const collapsed = ref(stored === '1')

const toggleCollapse = () => {
    collapsed.value = !collapsed.value
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed.value ? '1' : '0')
}
</script>

<template>
    <div class="flex w-full min-h-screen bg-bg">
        <DashboardSidebar
            :mobile-open="mobileOpen"
            :collapsed="collapsed"
            @close-mobile="mobileOpen = false"
            @toggle-collapse="toggleCollapse"
        />

        <div class="flex flex-col flex-1 min-w-0">
            <DashboardHeader :on-menu="() => (mobileOpen = true)" />
            <main class="flex-1 p-4 md:p-6 lg:p-8">
                <router-view v-slot="{ Component }">
                    <transition name="page" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>