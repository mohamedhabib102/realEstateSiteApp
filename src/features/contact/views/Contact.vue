<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Phone, Mail, MapPin, Send } from 'lucide-vue-next'

const { locale } = useI18n()
</script>

<template>
    <div class="min-h-screen bg-bg">
        <!-- Hero Section -->
        <section class="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img 
                    src="../../../assets/images/about.png" 
                    alt="Contact Hero" 
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
                    {{ locale === 'ar' ? 'تواصل معنا' : 'Get In Touch' }}
                </div>
                <h1 class="text-4xl md:text-6xl text-white font-bold mb-4 whitespace-pre-line" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                    {{ locale === 'ar' ? 'نحن هنا لمساعدتك\nفي بناء حلمك' : 'We Are Here To Help\nYou Build Your Dream' }}
                </h1>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="max-w-7xl mx-auto px-6 py-24">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <!-- Info -->
                <div 
                    class="space-y-12"
                    v-motion
                    :initial="{ opacity: 0, x: locale === 'ar' ? 50 : -50 }"
                    :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
                >
                    <div>
                        <h2 class="text-3xl md:text-5xl font-bold text-text-main mb-6" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                            {{ locale === 'ar' ? 'معلومات التواصل' : 'Contact Information' }}
                        </h2>
                        <p class="text-lg text-gray-500 leading-relaxed">
                            {{ locale === 'ar' ? 'هل لديك أسئلة أو استفسارات؟ فريقنا مستعد دائماً للرد عليك وتقديم الاستشارة التي تحتاجها.' : 'Have questions or inquiries? Our team is always ready to answer and provide the consultation you need.' }}
                        </p>
                    </div>

                    <div class="space-y-8">
                        <div class="flex items-start gap-6">
                            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin class="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-text-main mb-2">{{ locale === 'ar' ? 'مقرنا' : 'Our Location' }}</h3>
                                <p class="text-gray-500 whitespace-pre-line">
                                    {{ locale === 'ar' ? '123 شارع النيل، الزمالك\nالقاهرة، مصر' : '123 Nile Street, Zamalek\nCairo, Egypt' }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-6">
                            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Phone class="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-text-main mb-2">{{ locale === 'ar' ? 'رقم الهاتف' : 'Phone Number' }}</h3>
                                <p class="text-gray-500" dir="ltr">+20 123 456 7890</p>
                                <p class="text-gray-500" dir="ltr">+20 098 765 4321</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-6">
                            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail class="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-text-main mb-2">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address' }}</h3>
                                <p class="text-gray-500">info@dwello.com</p>
                                <p class="text-gray-500">support@dwello.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div 
                    class="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                >
                    <h3 class="text-2xl font-bold text-text-main mb-8" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                        {{ locale === 'ar' ? 'أرسل لنا رسالة' : 'Send Us A Message' }}
                    </h3>
                    <form @submit.prevent class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'الاسم الأول' : 'First Name' }}</label>
                                <input type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                            </div>
                            <div class="space-y-2">
                                <label class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'الاسم الأخير' : 'Last Name' }}</label>
                                <input type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address' }}</label>
                            <input type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-gray-700">{{ locale === 'ar' ? 'رسالتك' : 'Your Message' }}</label>
                            <textarea rows="5" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                            <Send class="w-5 h-5" :class="locale === 'ar' ? 'rotate-180' : ''" />
                            {{ locale === 'ar' ? 'إرسال الرسالة' : 'Send Message' }}
                        </button>
                    </form>
                </div>
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
