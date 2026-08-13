<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
                
                <!-- Left Side (Text + Number) -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, x: locale === 'ar' ? 50 : -50 }"
                    :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
                    class="flex flex-col"
                    :class="locale === 'ar' ? 'items-start text-right md:pr-12' : 'items-start text-left md:pl-12'"
                >
                    <h2 
                        class="text-4xl md:text-5xl text-black leading-tight mb-8"
                        :class="locale === 'ar' ? 'font-cairo font-bold' : 'font-playfair font-medium'"
                    >
                        {{ t('experience.title') }}
                    </h2>
                    
                    <div class="relative flex flex-col items-center self-start">
                        <!-- Huge Number with Image Background -->
                        <span 
                            class="text-[12rem] md:text-[16rem] font-bold leading-none bg-clip-text text-transparent bg-cover bg-center"
                            style="background-image: url('/src/assets/images/room1.png'); -webkit-background-clip: text; color: transparent;"
                        >
                            12
                        </span>
                        <span class="text-blue-600 font-medium text-xl md:text-2xl mt-4">
                            {{ t('experience.years') }}
                        </span>
                    </div>
                </div>

                <!-- Right Side (Descriptions + Button) -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, x: locale === 'ar' ? -50 : 50 }"
                    :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 1000, delay: 200 } }"
                    class="flex flex-col gap-12"
                    :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                    <p class="text-gray-500 text-lg leading-relaxed">
                        {{ t('experience.desc1') }}
                    </p>
                    <p class="text-gray-500 text-lg leading-relaxed">
                        {{ t('experience.desc2') }}
                    </p>

                    <button class="border border-black text-black px-10 py-4 font-semibold hover:bg-black hover:text-white transition-colors duration-300 w-max mt-4 text-lg">
                        {{ t('experience.contactUs') }}
                    </button>
                </div>
            </div>
            
        </div>
    </section>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
</style>
