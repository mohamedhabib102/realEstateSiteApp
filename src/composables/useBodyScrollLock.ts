import { watch, onUnmounted, type Ref } from 'vue'

// Module-level counter so multiple overlays (modals/drawers) never unlock the
// page while another is still open.
let lockCount = 0

function lockBody() {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
}

function unlockBody() {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
}

/**
 * Locks the page scroll while an overlay is active so only the overlay content
 * scrolls. Works alongside Lenis: inner scroll containers must also carry
 * `data-lenis-prevent` so the wheel reaches them instead of the page behind.
 */
export function useBodyScrollLock(active: Ref<boolean>) {
    watch(
        active,
        (isActive) => {
            if (isActive) {
                lockCount += 1
                if (lockCount === 1) lockBody()
            } else {
                lockCount = Math.max(0, lockCount - 1)
                if (lockCount === 0) unlockBody()
            }
        },
        { immediate: true }
    )

    onUnmounted(() => {
        if (active.value) {
            lockCount = Math.max(0, lockCount - 1)
            if (lockCount === 0) unlockBody()
        }
    })
}