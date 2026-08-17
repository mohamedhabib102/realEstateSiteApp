import {
    LayoutDashboard, Building2, ArrowLeftRight, MessageSquare, Settings,
    Landmark, Home, Info, Package, Newspaper, Mail, ShieldCheck, TrendingUp, Inbox, Sparkles
} from 'lucide-vue-next'
import type { RoleConfig, UserRole } from './types'

// Owner dashboard views
import OwnerOverview from './views/owner/Overview.vue'
import OwnerProperties from './views/owner/Properties.vue'
import OwnerPurchaseTransactions from './views/owner/PurchaseTransactions.vue'
import OwnerConversations from './views/owner/Conversations.vue'
import OwnerSettings from './views/owner/Settings.vue'
import OwnerBanking from './views/owner/Banking.vue'

// Buyer dashboard views
import BuyerOverview from './views/buyer/Overview.vue'
import BuyerProperties from './views/buyer/Properties.vue'
import BuyerMessages from './views/buyer/Messages.vue'
import BuyerChatRequests from './views/buyer/ChatRequests.vue'
import BuyerBankAccounts from './views/buyer/BankAccounts.vue'
import BuyerSettings from './views/buyer/Settings.vue'

// Super admin dashboard views
import SuperAdminOverview from './views/superAdmin/Overview.vue'
import SuperAdminWebsiteHeader from './views/superAdmin/WebsiteHeader.vue'
import SuperAdminHomepage from './views/superAdmin/Homepage.vue'
import SuperAdminAboutUs from './views/superAdmin/AboutUs.vue'
import SuperAdminProducts from './views/superAdmin/Products.vue'
import SuperAdminBlog from './views/superAdmin/Blog.vue'
import SuperAdminContact from './views/superAdmin/Contact.vue'
import SuperAdminAuthPages from './views/superAdmin/AuthPages.vue'
import SuperAdminPropertyManagement from './views/superAdmin/PropertyManagement.vue'
import SuperAdminConversations from './views/superAdmin/Conversations.vue'
import SuperAdminPurchaseTransactions from './views/superAdmin/PurchaseTransactions.vue'
import SuperAdminPlatformRevenue from './views/superAdmin/PlatformRevenue.vue'
import SuperAdminSettings from './views/superAdmin/Settings.vue'

export const roleConfig: Record<UserRole, RoleConfig> = {
    owner: {
        role: 'owner',
        roleLabel: { en: 'Owner', ar: 'مالك' },
        items: [
            { key: 'overview', name: 'ownerDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: OwnerOverview },
            { key: 'properties', name: 'ownerDashboardProperties', path: 'properties', icon: Building2, label: { en: 'Properties', ar: 'العقارات' }, component: OwnerProperties },
            { key: 'transactions', name: 'ownerDashboardTransactions', path: 'transactions', icon: ArrowLeftRight, label: { en: 'Purchase Transactions', ar: 'معاملات الشراء' }, component: OwnerPurchaseTransactions },
            { key: 'banking', name: 'ownerDashboardBanking', path: 'banking', icon: Landmark, label: { en: 'Banking & Transactions', ar: 'البنوك والمعاملات' }, component: OwnerBanking },
            { key: 'conversations', name: 'ownerDashboardConversations', path: 'conversations', icon: MessageSquare, label: { en: 'Conversations', ar: 'المحادثات' }, component: OwnerConversations },
            { key: 'settings', name: 'ownerDashboardSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: OwnerSettings },
        ],
    },
    buyer: {
        role: 'buyer',
        roleLabel: { en: 'Buyer', ar: 'مشتري' },
        items: [
            { key: 'overview', name: 'buyerDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: BuyerOverview },
            { key: 'properties', name: 'buyerDashboardProperties', path: 'properties', icon: Building2, label: { en: 'Properties', ar: 'العقارات' }, component: BuyerProperties },
            { key: 'messages', name: 'buyerDashboardMessages', path: 'messages', icon: MessageSquare, label: { en: 'Messages', ar: 'الرسائل' }, component: BuyerMessages },
            { key: 'chatRequests', name: 'buyerDashboardChatRequests', path: 'chat-requests', icon: Inbox, label: { en: 'Chat Requests', ar: 'طلبات المحادثة' }, component: BuyerChatRequests },
            { key: 'bankAccounts', name: 'buyerDashboardBankAccounts', path: 'bank-accounts', icon: Landmark, label: { en: 'Bank Accounts & Payments', ar: 'الحسابات البنكية والمدفوعات' }, component: BuyerBankAccounts },
            { key: 'settings', name: 'buyerDashboardSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: BuyerSettings },
        ],
    },
    'super-admin': {
        role: 'super-admin',
        roleLabel: { en: 'Super Admin', ar: 'مشرف عام' },
        items: [
            { key: 'overview', name: 'superAdminDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: SuperAdminOverview },
            { key: 'websiteHeader', name: 'superAdminWebsiteHeader', path: 'website-header', icon: Sparkles, label: { en: 'Website Header', ar: 'رأس الموقع' }, component: SuperAdminWebsiteHeader },
            { key: 'homepage', name: 'superAdminHomepage', path: 'homepage', icon: Home, label: { en: 'Homepage', ar: 'الصفحة الرئيسية' }, component: SuperAdminHomepage },
            { key: 'aboutUs', name: 'superAdminAboutUs', path: 'about-us', icon: Info, label: { en: 'About Us', ar: 'من نحن' }, component: SuperAdminAboutUs },
            { key: 'products', name: 'superAdminProducts', path: 'products', icon: Package, label: { en: 'Products', ar: 'المنتجات' }, component: SuperAdminProducts },
            { key: 'blog', name: 'superAdminBlog', path: 'blog', icon: Newspaper, label: { en: 'Blog', ar: 'المدونة' }, component: SuperAdminBlog },
            { key: 'contact', name: 'superAdminContact', path: 'contact', icon: Mail, label: { en: 'Contact', ar: 'تواصل معنا' }, component: SuperAdminContact },
            { key: 'authPages', name: 'superAdminAuthPages', path: 'auth-pages', icon: ShieldCheck, label: { en: 'Authentication Pages', ar: 'صفحات التسجيل' }, component: SuperAdminAuthPages },
            { key: 'propertyManagement', name: 'superAdminPropertyManagement', path: 'property-management', icon: Building2, label: { en: 'Property Management', ar: 'إدارة العقارات' }, component: SuperAdminPropertyManagement },
            { key: 'conversations', name: 'superAdminConversations', path: 'conversations', icon: MessageSquare, label: { en: 'Conversations', ar: 'المحادثات' }, component: SuperAdminConversations },
            { key: 'purchaseTransactions', name: 'superAdminPurchaseTransactions', path: 'purchase-transactions', icon: ArrowLeftRight, label: { en: 'Purchase Transactions', ar: 'معاملات الشراء' }, component: SuperAdminPurchaseTransactions },
            { key: 'platformRevenue', name: 'superAdminPlatformRevenue', path: 'platform-revenue', icon: TrendingUp, label: { en: 'Platform Revenue', ar: 'إيرادات المنصة' }, component: SuperAdminPlatformRevenue },
            { key: 'settings', name: 'superAdminSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: SuperAdminSettings },
        ],
    },
}