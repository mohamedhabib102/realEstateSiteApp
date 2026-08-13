<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { X, Facebook, Instagram, Mail } from 'lucide-vue-next'

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
    { name: 'nav.contact', href: '/contact' },
    { name: 'nav.products', href: '/products' },
    { name: 'nav.blog', href: '/blog' },
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
                class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                @click="emit('close')"
            ></div>
        </Transition>

        <!-- Drawer -->
        <Transition :name="locale === 'ar' ? 'slide-right' : 'slide-left'">
            <div 
                v-if="isOpen" 
                class="fixed top-0 bottom-0 z-[101] w-80 max-w-[80vw] bg-[#111111] shadow-2xl flex flex-col"
                :class="locale === 'ar' ? 'right-0' : 'left-0'"
            >
                <!-- Close Button -->
                <div class="p-6 flex justify-end">
                    <button @click="emit('close')" class="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <X class="w-8 h-8" />
                    </button>
                </div>

                <!-- Navigation Links -->
                <nav class="flex-grow flex flex-col px-10 pt-4 gap-8 overflow-y-auto">
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
