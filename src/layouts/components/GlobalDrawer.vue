<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { X, Facebook, Instagram, Mail, User } from 'lucide-vue-next'

const { t, locale } = useI18n()
const router = useRouter()

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const navLinks = [
    { name: 'nav.home', href: '/' },
    { name: 'nav.about', href: '/about' },
    { name: 'nav.products', href: '/products' },
    { name: 'nav.compare', href: '/compare' },
    { name: 'nav.blog', href: '/blog' },
    { name: 'nav.contact', href: '/contact' },
]

const navigateTo = (href: string) => {
    emit('close')
    if (href.startsWith('/')) {
        router.push(`/${locale.value}${href === '/' ? '' : href}`)
    }
}
</script>

<template>
    <Teleport to="body">
        <!-- Backdrop -->
        <Transition name="fade">
            <div 
                v-if="isOpen" 
                class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
                @click="emit('close')"
            ></div>
        </Transition>

        <!-- Drawer -->
        <Transition :name="locale === 'ar' ? 'slide-right' : 'slide-left'">
            <div 
                v-if="isOpen" 
                class="fixed top-0 bottom-0 z-[101] w-80 max-w-[80vw] bg-[#111111] shadow-2xl flex flex-col lg:hidden"
                :class="locale === 'ar' ? 'right-0' : 'left-0'"
            >
                <!-- Close Button -->
                <div class="p-6 flex justify-end">
                    <button @click="emit('close')" class="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <X class="w-8 h-8" />
                    </button>
                </div>

                <!-- Navigation Links -->
                <nav class="flex-grow flex flex-col px-10 pt-4 gap-6 overflow-y-auto">
                    <a 
                        v-for="(link, index) in navLinks" 
                        :key="index"
                        @click.prevent="navigateTo(link.href)"
                        href="#"
                        class="text-2xl text-gray-300 hover:text-white transition-colors cursor-pointer"
                        :class="locale === 'ar' ? 'font-cairo font-semibold' : 'font-playfair font-medium'"
                    >
                        {{ t(link.name) }}
                    </a>

                    <!-- Auth Action Buttons -->
                    <div class="pt-6 mt-4 border-t border-gray-800 flex flex-col gap-3">
                        <button 
                            @click="navigateTo('/login')"
                            class="w-full py-3 px-5 rounded-xl bg-[#009ee2] hover:bg-[#0089c4] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            :class="locale === 'ar' ? 'font-cairo' : 'font-outfit'"
                        >
                            <User class="w-5 h-5" />
                            <span>{{ t('nav.login') }}</span>
                        </button>
                        
                        <button 
                            @click="navigateTo('/register')"
                            class="w-full py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white font-medium text-sm transition-all cursor-pointer text-center"
                            :class="locale === 'ar' ? 'font-cairo' : 'font-outfit'"
                        >
                            <span>{{ t('nav.register') }}</span>
                        </button>
                    </div>
                </nav>

                <!-- Social Media Icons -->
                <div class="p-10 flex gap-6 mt-auto">
                    <a href="#" class="text-gray-400 hover:text-white transition-transform hover:scale-110">
                        <Facebook class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-transform hover:scale-110">
                        <Instagram class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-transform hover:scale-110">
                        <Mail class="w-6 h-6" />
                    </a>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}

/* Backdrop transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Drawer slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide from Left */
.slide-left-enter-from,
.slide-left-leave-to {
    transform: translateX(-100%);
}

/* Slide from Right */
.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
