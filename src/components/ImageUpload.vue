<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { UploadCloud, X } from 'lucide-vue-next'

const props = defineProps<{
    modelValue: string
    label?: string
    hint?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: string): void
}>()

const { locale } = useI18n()
const input = ref<HTMLInputElement | null>(null)

const onFile = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => emit('update:modelValue', reader.result as string)
    reader.readAsDataURL(file)
}

const clear = () => emit('update:modelValue', '')
</script>

<template>
    <div>
        <label v-if="label" class="block text-xs font-semibold text-gray-700 mb-2">{{ label }}</label>
        <div class="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group">
            <img
                v-if="modelValue"
                :src="modelValue"
                alt=""
                class="w-full h-36 object-cover"
            />
            <div v-else class="w-full h-36 flex flex-col items-center justify-center text-gray-400">
                <UploadCloud class="w-8 h-8 mb-1 opacity-60" />
                <span class="text-xs font-medium">{{ locale === 'ar' ? 'اضغط لرفع صورة' : 'Click to upload an image' }}</span>
                <span v-if="hint" class="text-[10px] text-gray-400 mt-0.5">{{ hint }}</span>
            </div>
            <button
                type="button"
                @click="input?.click()"
                class="absolute inset-0 cursor-pointer"
                :title="locale === 'ar' ? 'رفع صورة' : 'Upload image'"
                :aria-label="locale === 'ar' ? 'رفع صورة' : 'Upload image'"
            ></button>
            <button
                v-if="modelValue"
                type="button"
                @click="clear"
                class="absolute top-2 p-1.5 rounded-lg bg-white/90 text-gray-500 hover:text-red-500 shadow-sm transition-colors cursor-pointer"
                :class="locale === 'ar' ? 'left-2' : 'right-2'"
                :title="locale === 'ar' ? 'إزالة' : 'Remove'"
                :aria-label="locale === 'ar' ? 'إزالة الصورة' : 'Remove image'"
            >
                <X class="w-4 h-4" />
            </button>
            <input ref="input" type="file" accept="image/*" class="hidden" @change="onFile" />
        </div>
    </div>
</template>