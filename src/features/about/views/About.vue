<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Users, Target, ShieldCheck, Award } from 'lucide-vue-next'
import { gsap } from 'gsap'

const { t, locale } = useI18n()

const statValues = reactive({ s0: 0, s1: 0, s2: 0, s3: 0 })
const statsConfig = [
    { target: 15, suffix: '+' },
    { target: 350, suffix: '+' },
    { target: 20, suffix: '+' },
    { target: 100, suffix: '%' }
]
const statLabels = computed(() => [
    locale.value === 'ar' ? 'سنوات خبرة' : 'Years Experience',
    locale.value === 'ar' ? 'مشاريع مكتملة' : 'Projects Completed',
    locale.value === 'ar' ? 'جوائز حصلنا عليها' : 'Awards Won',
    locale.value === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'
])

onMounted(() => {
    gsap.to(statValues, {
        s0: statsConfig[0].target,
        s1: statsConfig[1].target,
        s2: statsConfig[2].target,
        s3: statsConfig[3].target,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#stats-section",
            start: "top 85%",
        }
    })
})

const features = computed(() => [
    { icon: Target, title: locale.value === 'ar' ? 'رؤيتنا' : 'Our Vision', desc: locale.value === 'ar' ? 'إعادة تعريف الحياة العصرية من خلال الهندسة المعمارية المبتكرة والتصميم المستدام، وخلق منازل تلهم.' : 'To redefine modern living through innovative architecture and sustainable design, creating homes that inspire.' },
    { icon: ShieldCheck, title: locale.value === 'ar' ? 'مهمتنا' : 'Our Mission', desc: locale.value === 'ar' ? 'تقديم جودة استثنائية، وراحة لا مثيل لها، وتجربة سلسة لكل صاحب منزل نعمل معه.' : 'Delivering exceptional quality, unmatched comfort, and a seamless experience for every homeowner we work with.' },
    { icon: Users, title: locale.value === 'ar' ? 'فريقنا' : 'Our Team', desc: locale.value === 'ar' ? 'مجموعة متخصصة من المهندسين المعماريين والمصممين والمهندسين الشغوفين بتحويل أحلامك إلى حقيقة.' : 'A dedicated group of architects, designers, and engineers passionate about turning your dreams into reality.' },
    { icon: Award, title: locale.value === 'ar' ? 'التميز' : 'Excellence', desc: locale.value === 'ar' ? 'نحن لا نتنازل أبداً عن الجودة، ونضمن أن كل تفصيل يلبي أعلى معايير الفخامة والمتانة.' : 'We never compromise on quality, ensuring every detail meets the highest standards of luxury and durability.' }
])
</script>

<template>
    <div class="min-h-screen bg-bg">
        <!-- Hero Section -->
        <section class="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img 
                    src="../../../assets/images/about.png" 
                    alt="About Hero" 
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div 
                class="relative z-10 text-center px-6"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
            >
                <div class="inline-block px-5 py-2 border border-white/30 text-white rounded-full mb-6 font-semibold uppercase tracking-widest text-sm bg-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {{ t('aboutPage.heroSubtitle') }}
                </div>
                <h1 class="text-4xl md:text-6xl text-white font-bold mb-4 whitespace-pre-line" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                    {{ t('aboutPage.heroTitle') }}
                </h1>
            </div>
        </section>

        <!-- Our Story Section -->
        <section class="max-w-7xl mx-auto px-6 py-24">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div 
                    class="relative"
                    v-motion
                    :initial="{ opacity: 0, x: locale === 'ar' ? 50 : -50 }"
                    :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
                >
                    <div class="absolute -inset-4 bg-primary/10 rounded-3xl -z-10 blur-xl"></div>
                    <img src="../../../assets/images/about1.png" alt="Our Story" class="w-[75%] max-h-[450px] mx-auto rounded-2xl shadow-xl border border-gray-100 object-cover">
                </div>
                
                <div 
                    class="space-y-6"
                    v-motion
                    :initial="{ opacity: 0, x: locale === 'ar' ? -50 : 50 }"
                    :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
                >
                    <h2 class="text-3xl md:text-5xl font-bold text-text-main" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'" v-html="locale === 'ar' ? 'نبني الأحلام،<br/>منزلاً تلو الآخر' : 'Building Dreams,<br/>One Home at a Time'">
                    </h2>
                    <p class="text-lg text-gray-600 leading-relaxed">
                        {{ locale === 'ar' ? 'منذ انطلاقتنا، التزمنا بتحويل المنازل إلى أوطان. بدأت رحلتنا بإيمان بسيط: كل شخص يستحق مساحة تعكس شخصيته وطموحاته.' : 'Since our inception, we have been committed to transforming houses into homes. Our journey started with a simple belief: everyone deserves a space that reflects their personality and aspirations.' }}
                    </p>
                    <p class="text-lg text-gray-600 leading-relaxed">
                        {{ locale === 'ar' ? 'نحن نمزج بين أحدث التقنيات والجمال الخالد، مما يضمن أن كل مشروع نتولاه يمثل شهادة على تفانينا في التميز والابتكار.' : 'We blend cutting-edge technology with timeless aesthetics, ensuring that every project we undertake stands as a testament to our dedication to excellence and innovation.' }}
                    </p>
                    <button @click="$router.push(`/${locale}/contact`)" class="mt-4 px-8 py-3 bg-[#1e1e1e] text-white rounded-md hover:bg-black transition-colors font-semibold">
                        {{ t('aboutPage.contactUs', locale === 'ar' ? 'تواصل معنا' : 'Contact Us') }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section id="stats-section" class="bg-white py-20 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div 
                        v-for="(config, index) in statsConfig" 
                        :key="index"
                        class="space-y-2"
                        v-motion
                        :initial="{ opacity: 0, scale: 0.8 }"
                        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 600, delay: index * 100 } }"
                    >
                        <div class="text-4xl md:text-6xl font-bold text-primary flex items-center justify-center gap-1" :class="locale === 'ar' ? 'font-cairo flex-row-reverse' : 'font-playfair'">
                            <span>{{ Math.floor(statValues[`s${index}` as keyof typeof statValues]) }}</span>
                            <span>{{ config.suffix }}</span>
                        </div>
                        <div class="text-gray-500 font-medium tracking-wide uppercase text-sm">
                            {{ statLabels[index] }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Core Values Section -->
        <section class="max-w-7xl mx-auto px-6 py-24">
            <div 
                class="text-center mb-16"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            >
                <h2 class="text-3xl md:text-5xl font-bold text-text-main mb-6" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                    {{ locale === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values' }}
                </h2>
                <p class="text-lg text-gray-500 max-w-2xl mx-auto">
                    {{ locale === 'ar' ? 'المبادئ التي توجه كل ما نقوم به، لضمان تقديم الأفضل فقط لعملائنا.' : 'The principles that guide everything we do, ensuring we deliver nothing but the best to our clients.' }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                    v-for="(feature, index) in features" 
                    :key="index"
                    class="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/50 transition-colors group flex gap-6 shadow-sm"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
                >
                    <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                        <component :is="feature.icon" class="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">{{ feature.title }}</h3>
                        <p class="text-gray-500 leading-relaxed">{{ feature.desc }}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Bottom Banner -->
        <section class="px-6 py-12 mb-12">
            <div 
                class="max-w-7xl mx-auto bg-[#1e1e1e] rounded-3xl p-12 text-center relative overflow-hidden"
                v-motion
                :initial="{ opacity: 0, scale: 0.95 }"
                :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
            >
                <!-- Decorative background elements -->
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                
                <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                    {{ locale === 'ar' ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?' }}
                </h2>
                <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto relative z-10">
                    {{ locale === 'ar' ? 'انضم إلى مئات أصحاب المنازل الراضين ودعنا ننشئ شيئًا استثنائيًا معًا.' : 'Join hundreds of satisfied homeowners and let\'s create something extraordinary together.' }}
                </p>
                <button @click="$router.push(`/${locale}/contact`)" class="px-10 py-4 bg-white text-[#1e1e1e] rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg relative z-10">
                    {{ locale === 'ar' ? 'احصل على استشارة مجانية' : 'Get a Free Consultation' }}
                </button>
            </div>
        </section>
    </div>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
</style>
