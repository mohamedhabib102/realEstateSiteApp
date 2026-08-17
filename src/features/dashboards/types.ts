import type { Component } from 'vue'

export type UserRole = 'owner' | 'buyer' | 'super-admin'

export interface RoleLabel {
    en: string
    ar: string
}

export interface DashboardItem {
    /** Stable key used to look up the label */
    key: string
    /** Unique vue-router route name */
    name: string
    /** Path relative to the /:locale/dashboards parent */
    path: string
    /** lucide-vue-next icon component */
    icon: Component
    label: RoleLabel
    component: Component
}

export interface DashboardGroup {
    /** Stable key used for expand/collapse state */
    key: string
    label: RoleLabel
    /** lucide-vue-next icon component */
    icon?: Component
    items: DashboardItem[]
}

export interface RoleConfig {
    role: UserRole
    roleLabel: RoleLabel
    /** When non-empty, the sidebar renders collapsible groups instead of a flat list */
    groups: DashboardGroup[]
    /** Flattened items used for routing (all items across groups) */
    items: DashboardItem[]
}