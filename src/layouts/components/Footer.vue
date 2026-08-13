<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Facebook, Linkedin, Twitter } from 'lucide-vue-next'

const { locale } = useI18n()
const router = useRouter()

const navigateTo = (path: string) => {
    router.push(`/${locale.value}${path}`)
}

const column1 = [
    { nameEn: 'Home', nameAr: 'الرئيسية', href: '' },
    { nameEn: 'About Us', nameAr: 'من نحن', href: '/about' },
    { nameEn: 'Products', nameAr: 'المنتجات', href: '/products' },
]

const column2 = [
    { nameEn: 'Contact Us', nameAr: 'تواصل معنا', href: '/contact' },
    { nameEn: 'Blog', nameAr: 'المدونة', href: '/blog' },
]

const handleSubscribe = () => {
    alert(locale.value === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!')
}
</script>

<template>
    <footer class="relative overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
            <img 
                src="../../assets/images/Rectangle 110.png" 
                alt="Footer Background" 
                class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/75"></div>
        </div>

        <div class="relative z-10">
            <!-- Newsletter Section -->
            <div class="max-w-3xl mx-auto px-6 pt-16 pb-12">
                <div 
                    class="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-full w-full flex items-center p-1.5 shadow-lg border border-gray-700/30"
                    :class="locale === 'ar' ? 'flex-row-reverse' : ''"
                >
                    <input 
                        type="email" 
                        :placeholder="locale === 'ar' ? 'اكتب بريدك الإلكتروني هنا' : 'Write E.Mail Here'"
                        class="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-500 text-base px-6"
                        :class="locale === 'ar' ? 'text-right' : 'text-left'"
                    />
                    <button 
                        @click="handleSubscribe" 
                        class="bg-white text-[#1e1e1e] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm shrink-0"
                    >
                        {{ locale === 'ar' ? 'اشتراك' : 'Subscribe' }}
                    </button>
                </div>
            </div>

            <!-- Main Footer Content -->
            <div class="max-w-7xl mx-auto px-6 pb-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    <!-- Brand Column -->
                    <div>
                        <h3 class="text-white font-bold text-lg tracking-widest uppercase mb-6" :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'">
                            DWELLO
                        </h3>
                        <p class="text-gray-400 leading-relaxed mb-8 text-sm">
                            {{ locale === 'ar' 
                                ? 'نحن ملتزمون بتحويل رؤيتك إلى واقع من خلال التصميم المبتكر والبناء عالي الجودة.'
                                : 'Lorem ipsum dolor sitametco nsectet ur. Ultrices diamcmm odo odio tellus eget.Lorem' 
                            }}
                        </p>
                        <div class="flex gap-4">
                            <a href="#" class="w-9 h-9 border border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                                <Facebook class="w-4 h-4" />
                            </a>
                            <a href="#" class="w-9 h-9 border border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                                <Linkedin class="w-4 h-4" />
                            </a>
                            <a href="#" class="w-9 h-9 border border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                                <Twitter class="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <!-- Links Column 1 -->
                    <div>
                        <nav class="flex flex-col gap-4">
                            <a 
                                v-for="(link, index) in column1" 
                                :key="index"
                                @click.prevent="link.href.startsWith('/') ? navigateTo(link.href) : null"
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                            >
                                {{ locale === 'ar' ? link.nameAr : link.nameEn }}
                            </a>
                        </nav>
                    </div>

                    <!-- Links Column 2 -->
                    <div>
                        <nav class="flex flex-col gap-4">
                            <a 
                                v-for="(link, index) in column2" 
                                :key="index"
                                @click.prevent="link.href.startsWith('/') ? navigateTo(link.href) : null"
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                            >
                                {{ locale === 'ar' ? link.nameAr : link.nameEn }}
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-gray-700/50">
                <div class="max-w-7xl mx-auto px-6 py-6">
                    <p class="text-gray-500 text-center text-sm">
                        {{ locale === 'ar' ? 'جميع الحقوق محفوظة' : 'Copyright' }} &copy; {{ new Date().getFullYear() }} Dwello
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}
</style>
