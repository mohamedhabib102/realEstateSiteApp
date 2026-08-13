<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            
            <!-- Image Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                
                <!-- Card 1 -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                    class="flex flex-col w-full"
                    :class="locale === 'ar' ? 'items-end text-right' : 'items-start text-left'"
                >
                    <span class="text-6xl md:text-7xl font-playfair mb-2 text-black">01</span>
                    <span class="text-gray-600 font-bold tracking-wider mb-6">{{ t('rooms.cardSubtitle') }}</span>
                    
                    <div class="h-[250px] md:h-[300px] w-full rounded-md overflow-hidden mb-6 shadow-md">
                        <img 
                            src="../../../assets/images/room1.png" 
                            alt="Room 1" 
                            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onerror="this.src='https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800'"
                        />
                    </div>

                    <h3 
                        class="text-2xl text-gray-800 mb-4 leading-snug"
                        :class="locale === 'ar' ? 'font-cairo font-bold' : 'font-playfair'"
                    >
                        {{ t('rooms.cardTitle') }}
                    </h3>
                    <p class="text-gray-500 mb-8 text-sm md:text-base leading-relaxed h-[80px]">
                        {{ t('rooms.cardDesc') }}
                    </p>

                    <button class="bg-[#1e1e1e] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-black transition-colors w-max">
                        {{ t('rooms.contactUs') }}
                    </button>
                </div>
                
                <!-- Card 2 -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
                    class="flex flex-col w-full"
                    :class="locale === 'ar' ? 'items-end text-right' : 'items-start text-left'"
                >
                    <span class="text-6xl md:text-7xl font-playfair mb-2 text-black">02</span>
                    <span class="text-gray-600 font-bold tracking-wider mb-6">{{ t('rooms.cardSubtitle') }}</span>
                    
                    <div class="h-[250px] md:h-[300px] w-full rounded-md overflow-hidden mb-6 shadow-md">
                        <img 
                            src="../../../assets/images/room2.png" 
                            alt="Room 2" 
                            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'"
                        />
                    </div>

                    <h3 
                        class="text-2xl text-gray-800 mb-4 leading-snug"
                        :class="locale === 'ar' ? 'font-cairo font-bold' : 'font-playfair'"
                    >
                        {{ t('rooms.cardTitle') }}
                    </h3>
                    <p class="text-gray-500 mb-8 text-sm md:text-base leading-relaxed h-[80px]">
                        {{ t('rooms.cardDesc') }}
                    </p>

                    <button class="bg-[#1e1e1e] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-black transition-colors w-max">
                        {{ t('rooms.contactUs') }}
                    </button>
                </div>

                <!-- Card 3 -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
                    class="flex flex-col w-full"
                    :class="locale === 'ar' ? 'items-end text-right' : 'items-start text-left'"
                >
                    <span class="text-6xl md:text-7xl font-playfair mb-2 text-black">03</span>
                    <span class="text-gray-600 font-bold tracking-wider mb-6">{{ t('rooms.cardSubtitle') }}</span>
                    
                    <div class="h-[250px] md:h-[300px] w-full rounded-md overflow-hidden mb-6 shadow-md">
                        <img 
                            src="../../../assets/images/room3.png" 
                            alt="Room 3" 
                            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'"
                        />
                    </div>

                    <h3 
                        class="text-2xl text-gray-800 mb-4 leading-snug"
                        :class="locale === 'ar' ? 'font-cairo font-bold' : 'font-playfair'"
                    >
                        {{ t('rooms.cardTitle') }}
                    </h3>
                    <p class="text-gray-500 mb-8 text-sm md:text-base leading-relaxed h-[80px]">
                        {{ t('rooms.cardDesc') }}
                    </p>

                    <button class="bg-[#1e1e1e] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-black transition-colors w-max">
                        {{ t('rooms.contactUs') }}
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
