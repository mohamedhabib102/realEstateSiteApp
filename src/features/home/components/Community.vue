<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, ChevronDown } from 'lucide-vue-next'

const { t, tm, locale } = useI18n()

// Selected indices
const selectedProjectTypeIdx = ref<number | null>(null)
const selectedLocationIdx = ref<number | null>(null)
const selectedPriceIdx = ref<number | null>(null)

// Computed localized options
const projectTypes = computed(() => tm('community.projectTypes') as string[])
const locations = computed(() => tm('community.locations') as string[])
const prices = computed(() => tm('community.prices') as string[])

// Interaction
const handleSearch = () => {
    const pType = selectedProjectTypeIdx.value !== null ? projectTypes.value[selectedProjectTypeIdx.value] : t('community.projectTypePlaceholder')
    const loc = selectedLocationIdx.value !== null ? locations.value[selectedLocationIdx.value] : t('community.locationPlaceholder')
    const price = selectedPriceIdx.value !== null ? prices.value[selectedPriceIdx.value] : t('community.maxPricePlaceholder')
    
    alert(`${locale.value === 'ar' ? 'جاري البحث عن:' : 'Searching for:'}\n\n${t('community.projectType')}: ${pType}\n${t('community.location')}: ${loc}\n${t('community.maxPrice')}: ${price}`)
}

const handleSubscribe = () => {
    alert(locale.value === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!')
}
</script>

<template>
    <section class="relative py-24 md:py-32 w-full overflow-hidden min-h-[700px] flex items-center">
        <!-- Background -->
        <div class="absolute inset-0 z-0">
            <img 
                src="../../../assets/images/Rectangle 110.png" 
                alt="Community Background" 
                class="w-full h-full object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1920'"
            />
            <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div class="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-16">
            
            <div class="w-full flex flex-col items-center gap-8">
                <h2 
                    v-motion
                    :initial="{ opacity: 0, y: -30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
                    class="text-4xl md:text-5xl lg:text-6xl text-white font-medium text-center"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-outfit'"
                >
                    {{ t('community.title') }}
                </h2>

                <!-- Search Bar with Native Selects -->
                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                    class="bg-white rounded-xl md:rounded-full w-full max-w-5xl flex flex-col md:flex-row items-center p-2 md:p-3 gap-4 md:gap-0 shadow-2xl"
                >
                    <!-- Project Type -->
                    <div class="flex-1 w-full px-6 py-2 border-b md:border-b-0 border-gray-200 relative" :class="locale === 'ar' ? 'md:border-l' : 'md:border-r'">
                        <label class="block text-sm text-gray-700 font-semibold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">{{ t('community.projectType') }}</label>
                        <div class="relative flex items-center">
                            <select 
                                v-model="selectedProjectTypeIdx" 
                                class="w-full appearance-none bg-transparent outline-none font-medium cursor-pointer"
                                :class="[locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6', selectedProjectTypeIdx === null ? 'text-gray-400' : 'text-gray-700']"
                            >
                                <option :value="null" disabled selected>{{ t('community.projectTypePlaceholder') }}</option>
                                <option v-for="(opt, idx) in projectTypes" :key="idx" :value="idx" class="text-gray-700">{{ opt }}</option>
                            </select>
                            <ChevronDown class="absolute w-5 h-5 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="flex-1 w-full px-6 py-2 border-b md:border-b-0 border-gray-200 relative" :class="locale === 'ar' ? 'md:border-l' : 'md:border-r'">
                        <label class="block text-sm text-gray-700 font-semibold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">{{ t('community.location') }}</label>
                        <div class="relative flex items-center">
                            <select 
                                v-model="selectedLocationIdx" 
                                class="w-full appearance-none bg-transparent outline-none font-medium cursor-pointer"
                                :class="[locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6', selectedLocationIdx === null ? 'text-gray-400' : 'text-gray-700']"
                            >
                                <option :value="null" disabled selected>{{ t('community.locationPlaceholder') }}</option>
                                <option v-for="(opt, idx) in locations" :key="idx" :value="idx" class="text-gray-700">{{ opt }}</option>
                            </select>
                            <ChevronDown class="absolute w-5 h-5 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                        </div>
                    </div>

                    <!-- Max Price -->
                    <div class="flex-1 w-full px-6 py-2 mb-4 md:mb-0 relative">
                        <label class="block text-sm text-gray-700 font-semibold mb-1" :class="locale === 'ar' ? 'text-right' : 'text-left'">{{ t('community.maxPrice') }}</label>
                        <div class="relative flex items-center">
                            <select 
                                v-model="selectedPriceIdx" 
                                class="w-full appearance-none bg-transparent outline-none font-medium cursor-pointer"
                                :class="[locale === 'ar' ? 'text-right pl-6' : 'text-left pr-6', selectedPriceIdx === null ? 'text-gray-400' : 'text-gray-700']"
                            >
                                <option :value="null" disabled selected>{{ t('community.maxPricePlaceholder') }}</option>
                                <option v-for="(opt, idx) in prices" :key="idx" :value="idx" class="text-gray-700">{{ opt }}</option>
                            </select>
                            <ChevronDown class="absolute w-5 h-5 text-gray-400 pointer-events-none" :class="locale === 'ar' ? 'left-0' : 'right-0'" />
                        </div>
                    </div>

                    <!-- Search Button -->
                    <button @click="handleSearch" class="w-full md:w-auto bg-[#222] text-white px-10 py-4 rounded-lg md:rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors duration-300">
                        <Search class="w-5 h-5" />
                        {{ t('community.searchBtn') }}
                    </button>
                </div>
            </div>

            <!-- Newsletter -->
            <div class="w-full flex flex-col items-center gap-8 mt-12">
                <h3 
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
                    class="text-3xl md:text-4xl text-white font-medium text-center"
                    :class="locale === 'ar' ? 'font-cairo' : 'font-outfit'"
                >
                    {{ t('community.newsletterTitle') }}
                </h3>

                <div 
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
                    class="bg-white rounded-full w-full max-w-2xl flex items-center p-2 pl-6 shadow-2xl"
                    :class="locale === 'ar' ? 'pr-6 pl-2' : 'pl-6 pr-2'"
                >
                    <input 
                        type="email" 
                        :placeholder="t('community.newsletterPlaceholder')"
                        class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
                        :class="locale === 'ar' ? 'text-right' : 'text-left'"
                    />
                    <button @click="handleSubscribe" class="bg-[#222] text-white px-8 py-3.5 rounded-full font-medium hover:bg-black transition-colors duration-300">
                        {{ t('community.subscribeBtn') }}
                    </button>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.font-outfit {
    font-family: 'Outfit', sans-serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
/* Ensure options have background in all browsers */
select option {
    background-color: white;
    color: #374151;
}
</style>
