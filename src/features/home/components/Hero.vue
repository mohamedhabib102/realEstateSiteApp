<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

gsap.registerPlugin(ScrollTrigger)

const { t, tm, locale } = useI18n()
const currentIndex = ref(0)
const heroSection = ref<HTMLElement | null>(null)
let scrollTriggerInstance: ScrollTrigger | null = null
const threeCanvas = ref<HTMLElement | null>(null)
const useFallbackImage = ref(true) // Start with fallback until model loads

const slides = computed(() => tm('hero.slides') as any[])

// Toggle language is now handled in MainLayout

const initThreeJS = () => {
    if (!threeCanvas.value) return
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    threeCanvas.value.appendChild(renderer.domElement)
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)
    
    camera.position.z = 5
    
    // Allow basic orbiting, no zoom to prevent breaking the scroll
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false
    
    const loader = new GLTFLoader()
    
    // Expected model path. If missing, it will gracefully fallback.
    const modelPath = '/models/hero-model.glb'
    
    loader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene)
            useFallbackImage.value = false // Hide fallback image once model is ready
            
            const animate = () => {
                requestAnimationFrame(animate)
                controls.update()
                
                if (gltf.scene) {
                    gltf.scene.rotation.y += 0.002 // Slow rotation
                }
                
                renderer.render(scene, camera)
            }
            animate()
        },
        undefined,
        (_error) => {
            // Model not found or error loading, standard images will remain visible
            useFallbackImage.value = true
        }
    )
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}

onMounted(() => {
    initThreeJS()
    
    scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroSection.value,
        start: 'top top',
        end: '+=300%', // Pin for 3 screen heights
        pin: true,
        scrub: true,
        onUpdate: (self) => {
            let progress = self.progress
            let newIndex = 0
            if (progress > 0.33 && progress <= 0.66) newIndex = 1
            if (progress > 0.66) newIndex = 2
            
            if (currentIndex.value !== newIndex) {
                currentIndex.value = newIndex
            }
        }
    })
})

onUnmounted(() => {
    if (scrollTriggerInstance) {
        scrollTriggerInstance.kill()
    }
})
</script>

<template>
    <!-- Pin wrapper -->
    <div ref="heroSection" class="relative w-full h-screen overflow-hidden bg-black" id="hero">
        
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <!-- Three.js Canvas Container -->
            <div 
                v-show="!useFallbackImage" 
                ref="threeCanvas" 
                class="w-full h-full absolute inset-0 z-0 cursor-move"
            ></div>

            <!-- Fallback Slider -->
            <Transition name="fade-slide" mode="out-in" appear>
                <div v-if="useFallbackImage" :key="currentIndex" class="absolute inset-0 w-full h-full">
                    <img 
                        src="../../../assets/images/hero-new.svg" 
                        alt="Smart Home" 
                        class="w-full h-full object-cover opacity-90 transition-transform duration-[3s]"
                        :style="{ transform: `scale(${1 + currentIndex * 0.05})` }"
                        onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920'"
                    />
                </div>
            </Transition>

            <!-- Unified Dark Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none"></div>
        </div>



        <div class="relative z-10 w-full h-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
            <!-- Container for RTL/LTR Layout -->
            <div class="flex flex-col lg:flex-row h-full justify-center lg:justify-between items-start lg:items-center pt-28 pb-10 lg:py-0 gap-6 lg:gap-0">
                
                <!-- Text Content -->
                <div class="flex flex-col max-w-3xl lg:max-w-4xl relative w-full items-start text-start">
                    <!-- Fixed height wrapper for text -->
                    <div 
                        class="min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] flex flex-col justify-center"
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
                    >
                        <Transition name="fade-slide" mode="out-in">
                            <div :key="currentIndex" class="flex flex-col gap-3 sm:gap-6 items-start">
                                <h1 
                                    class="text-2xl sm:text-4xl lg:text-[3.8rem] text-white leading-[1.2] font-semibold tracking-wide"
                                    :class="locale === 'ar' ? 'font-cairo' : 'font-playfair'"
                                >
                                    {{ slides[currentIndex].title1 }} <br />
                                    {{ slides[currentIndex].title2 }}
                                </h1>
                                
                                <p class="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-light max-w-xl whitespace-pre-line">
                                    {{ slides[currentIndex].subtitle }}
                                </p>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- Pagination Steps -->
                <div class="flex flex-col gap-3 sm:gap-6 mt-4 lg:mt-auto mb-4 lg:mb-20 shrink-0 items-start lg:items-end">
                    <div 
                        v-for="(n, i) in 3" 
                        :key="i"
                        @click="currentIndex = i"
                        class="flex items-center gap-4 sm:gap-6 text-white cursor-pointer transition-all duration-300 flex-row group"
                    >
                        <!-- Line -->
                        <div 
                            class="h-[2px] bg-white transition-all duration-500 rounded-full" 
                            :class="currentIndex === i ? 'w-10 sm:w-16 opacity-100' : 'w-0 opacity-0'"
                        ></div>
                        <!-- Number -->
                        <span 
                            class="tracking-widest transition-all duration-500 select-none" 
                            :class="currentIndex === i ? 'text-xl sm:text-2xl text-white font-bold' : 'text-base sm:text-lg text-gray-400 group-hover:text-gray-200'"
                        >
                            0{{ n }}
                        </span>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
.font-cairo {
    font-family: 'Cairo', sans-serif;
}

/* Transition for the text slides */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* Modal Transition */
.fade-modal-enter-active,
.fade-modal-leave-active {
    transition: opacity 0.4s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
    opacity: 0;
}
</style>
