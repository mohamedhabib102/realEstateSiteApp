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

export interface RoleConfig {
    role: UserRole
    roleLabel: RoleLabel
    items: DashboardItem[]
}