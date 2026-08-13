<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MapPin, Home, DollarSign } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
    <div class="bg-surface/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 md:p-6 mx-auto w-full max-w-5xl border border-surface/50">
        <div class="flex flex-col md:flex-row items-center gap-4">
            
            <div class="flex-1 w-full bg-bg rounded-lg px-4 py-4 flex items-center justify-between border border-gray-200">
                <span class="text-text-main font-semibold">{{ t('search.location') }}</span>
                <MapPin class="w-5 h-5 text-secondary" />
            </div>

            <div class="flex-1 w-full bg-bg rounded-lg px-4 py-4 flex items-center justify-between border border-gray-200">
                <span class="text-text-main font-semibold">{{ t('search.type') }}</span>
                <Home class="w-5 h-5 text-secondary" />
            </div>

            <div class="flex-1 w-full bg-bg rounded-lg px-4 py-4 flex items-center justify-between border border-gray-200">
                <span class="text-text-main font-semibold">{{ t('search.priceRange') }}</span>
                <DollarSign class="w-5 h-5 text-secondary" />
            </div>

            <button class="w-full md:w-auto bg-text-main text-surface px-10 py-4 rounded-lg font-bold hover:bg-primary transition-colors whitespace-nowrap cursor-pointer text-lg">
                {{ t('hero.signUpBtn') }}
            </button>
        </div>
    </div>
</template>
