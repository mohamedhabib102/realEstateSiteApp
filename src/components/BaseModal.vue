<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'

defineProps<{
    open: boolean
    maxWidth?: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const { locale } = useI18n()
</script>

<template>
    <Teleport to="body">
        <Transition name="overlay">
            <div v-if="open" class="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>
        </Transition>

        <Transition name="modal">
            <div v-if="open" class="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
                <div
                    class="bg-white rounded-2xl shadow-2xl w-full pointer-events-auto max-h-[90vh] overflow-y-auto"
                    :style="{ maxWidth: maxWidth || '28rem' }"
                    v-motion :initial="{ opacity: 0, scale: 0.95, y: 12 }" :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 220, ease: 'easeOut' } }"
                >
                    <div class="flex items-center justify-between px-6 pt-6">
                        <slot name="title"></slot>
                        <button @click="emit('close')" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Close">
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                    <div class="px-6 pb-6 pt-4">
                        <slot name="body"></slot>
                    </div>
                    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
}
</style>