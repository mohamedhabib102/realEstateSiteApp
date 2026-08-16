<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

const goToProducts = () => {
    router.push(`/${locale.value}/products`)
}
</script>

<template>
    <section class="py-24 md:py-32 w-full bg-surface overflow-hidden">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            
            <div 
                class="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
                :class="locale === 'ar' ? 'lg:flex-row-reverse' : ''"
            >
                
                <!-- Images Section -->
                <div class="lg:block hidden w-full lg:w-1/2 relative h-[500px] md:h-[700px] flex justify-center items-center">
                    
                    <!-- Image 1 -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 100 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
                        class="absolute left-0 top-0 w-[45%] h-[60%] rounded-lg overflow-hidden shadow-2xl z-10"
                        :class="locale === 'ar' ? 'right-0 left-auto' : 'left-0'"
                    >
                        <img 
                            src="../../../assets/images/about1.png" 
                            alt="About Architecture 1" 
                            class="w-full h-full object-cover"
                            onerror="this.src='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'"
                        />
                    </div>
                    
                    <!-- Image 2 -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: -100 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 200, ease: 'easeOut' } }"
                        class="absolute right-0 bottom-0 w-[45%] h-[60%] rounded-lg overflow-hidden shadow-xl z-20"
                        :class="locale === 'ar' ? 'left-0 right-auto' : 'right-0'"
                    >
                        <img 
                            src="../../../assets/images/about2.png" 
                            alt="About Architecture 2" 
                            class="w-full h-full object-cover"
                            onerror="this.src='https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800'"
                        />
                    </div>
                </div>

                <!-- Text Content -->
                <div class="w-full lg:w-1/2 flex flex-col items-start gap-8">
                    
                    <!-- Subtitle -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, x: locale === 'ar' ? -30 : 30 }"
                        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, delay: 300 } }"
                        class="flex items-center gap-4"
                    >
                        <div class="w-12 h-[2px] bg-black"></div>
                        <span class="font-bold text-lg text-black">{{ t('about.subtitle') }}</span>
                    </div>

                    <!-- Title -->
                    <h2 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
                        class="text-4xl md:text-5xl lg:text-6xl text-black leading-[1.2]"
                        :class="locale === 'ar' ? 'font-cairo font-bold' : 'font-playfair font-medium'"
                        style="white-space: pre-line;"
                    >
                        {{ t('about.title') }}
                    </h2>

                    <!-- Descriptions -->
                    <div 
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }"
                        class="flex flex-col gap-6 mt-4"
                    >
                        <p class="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
                            {{ t('about.description1') }}
                        </p>
                        <p class="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                            {{ t('about.description2') }}
                        </p>
                    </div>

                    <!-- Button -->
                    <button 
                        @click="goToProducts"
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
                        class="mt-6 px-12 py-3.5 border-2 border-black text-black font-semibold text-lg hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                        {{ t('about.contactUs') }}
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
