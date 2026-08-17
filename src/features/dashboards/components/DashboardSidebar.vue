<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import {
    X, LogOut, ChevronLeft, ChevronRight, ShieldCheck, ChevronDown
} from 'lucide-vue-next'
import { roleConfig } from '../roles'
import { currentRole } from '../../../data/currentRole'

const props = defineProps<{
    mobileOpen: boolean
    collapsed: boolean
}>()

const emit = defineEmits<{
    (e: 'close-mobile'): void
    (e: 'toggle-collapse'): void
}>()

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

const config = roleConfig[currentRole]
const navItems = config.items
const groups = config.groups
const hasGroups = computed(() => groups.length > 0)

// Expand/collapse state for sidebar groups (defaults to all expanded)
const expanded = ref<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.key, true]))
)

const isGroupOpen = (key: string) => expanded.value[key] !== false

const toggleGroup = (key: string) => {
    expanded.value = { ...expanded.value, [key]: !isGroupOpen(key) }
}

// Auto-expand the group that contains the active item
watch(
    () => route.name,
    (name) => {
        for (const g of groups) {
            if (g.items.some((i) => i.name === name) && !isGroupOpen(g.key)) {
                expanded.value = { ...expanded.value, [g.key]: true }
            }
        }
    },
    { immediate: true }
)

const isDesktop = ref(false)
let media: MediaQueryList | null = null
const syncIsDesktop = () => { isDesktop.value = !!media?.matches }
onMounted(() => {
    media = window.matchMedia('(min-width: 1024px)')
    syncIsDesktop()
    media.addEventListener('change', syncIsDesktop)
})
onUnmounted(() => {
    media?.removeEventListener('change', syncIsDesktop)
})

const hideLabels = computed(() => props.collapsed && isDesktop.value)
const toggleChevron = computed(() => {
    const isRtl = locale.value === 'ar'
    if (isRtl) return props.collapsed ? ChevronLeft : ChevronRight
    return props.collapsed ? ChevronRight : ChevronLeft
})

const isActive = (name: string) => route.name === name

const navigate = (name: string, path: string) => {
    emit('close-mobile')
    router.push(path ? `/${locale.value}/dashboards/${path}` : `/${locale.value}/dashboards`)
}

const logout = () => {
    emit('close-mobile')
    router.push(`/${locale.value}/login`)
}
</script>

<template>
    <!-- Mobile overlay -->
    <Transition name="fade">
        <div
            v-if="mobileOpen"
            class="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm lg:hidden"
            @click="emit('close-mobile')"
        ></div>
    </Transition>

    <aside
        :class="[
            'flex flex-col bg-[#0f1b3d] text-white shrink-0 z-[96] transition-[width,transform] duration-300 ease-in-out',
            'w-72 max-w-[80vw]',
            'fixed lg:sticky lg:top-0 lg:h-screen top-0 bottom-0',
            locale === 'ar' ? 'right-0 lg:right-auto' : 'left-0 lg:left-auto',
            mobileOpen ? 'translate-x-0' : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full'),
            mobileOpen ? '' : 'lg:translate-x-0',
            collapsed ? 'lg:w-20' : 'lg:w-72'
        ]"
    >
        <!-- Brand -->
        <div class="relative h-16 flex items-center border-b border-white/10 shrink-0" :class="hideLabels ? 'justify-center px-0' : 'gap-3 px-6'">
            <div class="w-9 h-9 bg-secondary text-[#0f1b3d] rounded-lg flex items-center justify-center font-bold text-xl shadow-md shrink-0">D</div>
            <span v-if="!hideLabels" class="text-xl font-bold tracking-widest uppercase leading-none whitespace-nowrap">Dwello</span>
            <span v-if="!hideLabels" class="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-white/70">
                <ShieldCheck class="w-3 h-3" /> {{ locale === 'ar' ? config.roleLabel.ar : config.roleLabel.en }}
            </span>
            <button
                @click="emit('close-mobile')"
                class="ms-auto lg:hidden text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
            >
                <X class="w-5 h-5" />
            </button>
        </div>

        <!-- Collapse / expand toggle (desktop, edge facing the content) -->
        <button
            @click="emit('toggle-collapse')"
            class="hidden lg:flex absolute top-16 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white text-gray-600 border border-gray-200 shadow-md items-center justify-center hover:text-primary hover:bg-gray-50 transition-colors cursor-pointer"
            :class="locale === 'ar' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'"
            :title="collapsed
                ? (locale === 'ar' ? 'توسيع القائمة' : 'Expand menu')
                : (locale === 'ar' ? 'فتح القائمة' : 'Collapse menu')"
            :aria-label="collapsed
                ? (locale === 'ar' ? 'توسيع القائمة' : 'Expand menu')
                : (locale === 'ar' ? 'فتح القائمة' : 'Collapse menu')"
        >
            <component :is="toggleChevron" class="w-3.5 h-3.5" />
        </button>

        <!-- Navigation -->
        <nav data-lenis-prevent class="flex-grow py-4 min-h-0 overflow-y-auto overflow-x-hidden sidebar-scroll" :class="hideLabels ? 'px-2' : 'px-3'">
            <p v-if="!hideLabels" class="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">{{ locale === 'ar' ? config.roleLabel.ar : config.roleLabel.en }}</p>

            <!-- Flat mode (owner / buyer) -->
            <template v-if="!hasGroups">
                <div class="space-y-0.5">
                    <button
                        v-for="item in navItems"
                        :key="item.key"
                        @click="navigate(item.name, item.path)"
                        class="relative w-full flex items-center rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group"
                        :class="[
                            hideLabels ? 'justify-center py-2.5' : 'gap-3 px-3 py-2.5',
                            isActive(item.name)
                                ? 'bg-white/10 text-white shadow-inner'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                        ]"
                        :title="hideLabels ? (locale === 'ar' ? item.label.ar : item.label.en) : undefined"
                    >
                        <span
                            v-if="isActive(item.name)"
                            class="absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-secondary transition-all duration-150"
                            :class="locale === 'ar' ? 'right-0' : 'left-0'"
                        ></span>
                        <span
                            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                            :class="isActive(item.name) ? 'bg-secondary text-[#0f1b3d]' : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'"
                        >
                            <component :is="item.icon" class="w-4.5 h-4.5" stroke-width="2" />
                        </span>
                        <span v-if="!hideLabels" class="truncate">{{ locale === 'ar' ? item.label.ar : item.label.en }}</span>

                        <span
                            v-if="hideLabels"
                            class="hidden lg:block absolute top-1/2 -translate-y-1/2 z-30 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            :class="locale === 'ar' ? 'right-full mr-3' : 'left-full ml-3'"
                        >
                            {{ locale === 'ar' ? item.label.ar : item.label.en }}
                        </span>
                    </button>
                </div>
            </template>

            <!-- Grouped mode (super admin) -->
            <template v-else>
                <template v-for="group in groups" :key="group.key">
                    <div class="mb-1.5">
                        <!-- Group header -->
                        <button
                            v-if="!hideLabels"
                            @click="toggleGroup(group.key)"
                            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider text-white/35 hover:text-white/60 transition-colors cursor-pointer select-none"
                            :aria-expanded="isGroupOpen(group.key)"
                        >
                            <span class="inline-flex items-center gap-2">
                                <component :is="group.icon" class="w-3.5 h-3.5" v-if="group.icon" />
                                {{ locale === 'ar' ? group.label.ar : group.label.en }}
                            </span>
                            <ChevronDown
                                class="w-3.5 h-3.5 transition-transform duration-200"
                                :class="isGroupOpen(group.key) ? '' : '-rotate-90'"
                            />
                        </button>

                        <!-- Group items -->
                        <template v-if="isGroupOpen(group.key) || hideLabels">
                            <div class="space-y-0.5 mt-1">
                                <button
                                    v-for="item in group.items"
                                    :key="item.key"
                                    @click="navigate(item.name, item.path)"
                                    class="relative w-full flex items-center rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group"
                                    :class="[
                                        hideLabels ? 'justify-center py-2.5' : 'gap-3 px-3 py-2.5',
                                        isActive(item.name)
                                            ? 'bg-white/10 text-white shadow-inner'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                    ]"
                                    :title="hideLabels ? (locale === 'ar' ? item.label.ar : item.label.en) : undefined"
                                >
                                    <span
                                        v-if="isActive(item.name)"
                                        class="absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-secondary transition-all duration-150"
                                        :class="locale === 'ar' ? 'right-0' : 'left-0'"
                                    ></span>
                                    <span
                                        class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                                        :class="isActive(item.name) ? 'bg-secondary text-[#0f1b3d]' : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'"
                                    >
                                        <component :is="item.icon" class="w-4.5 h-4.5" stroke-width="2" />
                                    </span>
                                    <span v-if="!hideLabels" class="truncate">{{ locale === 'ar' ? item.label.ar : item.label.en }}</span>

                                    <span
                                        v-if="hideLabels"
                                        class="hidden lg:block absolute top-1/2 -translate-y-1/2 z-30 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                        :class="locale === 'ar' ? 'right-full mr-3' : 'left-full ml-3'"
                                    >
                                        {{ locale === 'ar' ? item.label.ar : item.label.en }}
                                    </span>
                                </button>
                            </div>
                        </template>
                    </div>
                </template>
            </template>
        </nav>

        <!-- Footer: logout (always fixed at bottom) -->
        <div class="shrink-0 py-4 border-t border-white/10 bg-[#0c1730]" :class="hideLabels ? 'px-2' : 'px-3.5'">
            <button
                @click="logout"
                class="w-full flex items-center rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer group relative"
                :class="hideLabels ? 'justify-center py-2.5' : 'gap-3 px-3 py-2.5'"
                :title="hideLabels ? (locale === 'ar' ? 'تسجيل الخروج' : 'Log Out') : undefined"
            >
                <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <LogOut class="w-4 h-4" />
                </span>
                <span v-if="!hideLabels">{{ locale === 'ar' ? 'تسجيل الخروج' : 'Log Out' }}</span>

                <span
                    v-if="hideLabels"
                    class="hidden lg:block absolute top-1/2 -translate-y-1/2 z-30 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    :class="locale === 'ar' ? 'right-full mr-3' : 'left-full ml-3'"
                >
                    {{ locale === 'ar' ? 'تسجيل الخروج' : 'Log Out' }}
                </span>
            </button>
        </div>
    </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Smooth, natural scrolling with a refined scrollbar that matches the dark sidebar */
.sidebar-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
}
.sidebar-scroll::-webkit-scrollbar {
    width: 5px;
}
.sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.14);
    border-radius: 9999px;
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.28);
}
</style>