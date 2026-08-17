<script setup lang="ts">
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EditableSection } from '../../../data/contentTypes'
import ImageUpload from '../../../components/ImageUpload.vue'

defineProps<{
    section: EditableSection
    icon?: Component
}>()

const { locale } = useI18n()
</script>

<template>
    <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <component :is="icon" v-if="icon" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-bold text-gray-900">{{ locale === 'ar' ? section.label.ar : section.label.en }}</h3>
                <p class="text-xs text-gray-400 mt-0.5">{{ locale === 'ar' ? section.hint.ar : section.hint.en }}</p>
            </div>
        </div>

        <div class="space-y-5">
            <div v-for="f in section.fields" :key="f.key">
                <p class="text-xs font-semibold text-gray-700 mb-2">{{ locale === 'ar' ? f.label.ar : f.label.en }}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <span class="block text-[11px] font-medium text-gray-400 mb-1">{{ locale === 'ar' ? 'إنجليزي' : 'English' }}</span>
                        <textarea
                            v-if="f.type === 'textarea'"
                            v-model="f.value.en"
                            rows="3"
                            class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        ></textarea>
                        <input
                            v-else
                            v-model="f.value.en"
                            class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div>
                        <span class="block text-[11px] font-medium text-gray-400 mb-1">{{ locale === 'ar' ? 'عربي' : 'Arabic' }}</span>
                        <textarea
                            v-if="f.type === 'textarea'"
                            v-model="f.value.ar"
                            rows="3"
                            class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        ></textarea>
                        <input
                            v-else
                            v-model="f.value.ar"
                            class="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                </div>
            </div>

            <div v-if="section.images.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <ImageUpload
                    v-for="img in section.images"
                    :key="img.key"
                    v-model="img.value"
                    :label="locale === 'ar' ? img.label.ar : img.label.en"
                />
            </div>
        </div>
    </section>
</template>