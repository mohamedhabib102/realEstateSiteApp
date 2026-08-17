import {
    LayoutDashboard, Building2, ArrowLeftRight, MessageSquare, Settings,
    Landmark, Home, Info, Package, Newspaper, Mail, ShieldCheck, TrendingUp, Inbox,
    Sparkles, Heart, Users, Globe, FolderOpen, LayoutGrid, LogIn, BadgeCheck
} from 'lucide-vue-next'
import type { RoleConfig, UserRole, DashboardItem, DashboardGroup } from './types'

// Shared verification page used by both Owner and Buyer
import AccountVerification from './views/verification/AccountVerification.vue'

// Owner dashboard views
import OwnerOverview from './views/owner/Overview.vue'
import OwnerProperties from './views/owner/Properties.vue'
import OwnerMessageRequests from './views/owner/MessageRequests.vue'
import OwnerPurchaseTransactions from './views/owner/PurchaseTransactions.vue'
import OwnerConversations from './views/owner/Conversations.vue'
import OwnerSettings from './views/owner/Settings.vue'
import OwnerBanking from './views/owner/Banking.vue'

// Buyer dashboard views
import BuyerOverview from './views/buyer/Overview.vue'
import BuyerProperties from './views/buyer/Properties.vue'
import BuyerFavorites from './views/buyer/Favorites.vue'
import BuyerMessages from './views/buyer/Messages.vue'
import BuyerChatRequests from './views/buyer/ChatRequests.vue'
import BuyerBankAccounts from './views/buyer/BankAccounts.vue'
import BuyerSettings from './views/buyer/Settings.vue'

// Super admin dashboard views
import SuperAdminOverview from './views/superAdmin/Overview.vue'
import SuperAdminUsers from './views/superAdmin/Users.vue'
import SuperAdminWebsiteHeader from './views/superAdmin/WebsiteHeader.vue'
import SuperAdminHomepage from './views/superAdmin/Homepage.vue'
import SuperAdminAboutUs from './views/superAdmin/AboutUs.vue'
import SuperAdminProducts from './views/superAdmin/Products.vue'
import SuperAdminComparison from './views/superAdmin/Comparison.vue'
import SuperAdminCategories from './views/superAdmin/Categories.vue'
import SuperAdminBlog from './views/superAdmin/Blog.vue'
import SuperAdminContact from './views/superAdmin/Contact.vue'
import SuperAdminAuthPages from './views/superAdmin/AuthPages.vue'
import SuperAdminPropertyManagement from './views/superAdmin/PropertyManagement.vue'
import SuperAdminConversations from './views/superAdmin/Conversations.vue'
import SuperAdminPurchaseTransactions from './views/superAdmin/PurchaseTransactions.vue'
import SuperAdminPlatformRevenue from './views/superAdmin/PlatformRevenue.vue'
import SuperAdminSettings from './views/superAdmin/Settings.vue'
import SuperAdminVerificationManagement from './views/superAdmin/VerificationManagement.vue'

// ---------- Owner items ----------
const ownerItems: DashboardItem[] = [
    { key: 'overview', name: 'ownerDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: OwnerOverview },
    { key: 'properties', name: 'ownerDashboardProperties', path: 'properties', icon: Building2, label: { en: 'Properties', ar: 'العقارات' }, component: OwnerProperties },
    { key: 'messageRequests', name: 'ownerDashboardMessageRequests', path: 'message-requests', icon: Inbox, label: { en: 'Message Requests', ar: 'طلبات الرسائل' }, component: OwnerMessageRequests },
    { key: 'transactions', name: 'ownerDashboardTransactions', path: 'transactions', icon: ArrowLeftRight, label: { en: 'Purchase Transactions', ar: 'معاملات الشراء' }, component: OwnerPurchaseTransactions },
    { key: 'banking', name: 'ownerDashboardBanking', path: 'banking', icon: Landmark, label: { en: 'Banking & Transactions', ar: 'البنوك والمعاملات' }, component: OwnerBanking },
    { key: 'conversations', name: 'ownerDashboardConversations', path: 'conversations', icon: MessageSquare, label: { en: 'Conversations', ar: 'المحادثات' }, component: OwnerConversations },
    { key: 'settings', name: 'ownerDashboardSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: OwnerSettings },
    { key: 'verification', name: 'ownerDashboardVerification', path: 'verification', icon: BadgeCheck, label: { en: 'Account Verification', ar: 'التحقق من الحساب' }, component: AccountVerification },
]

// ---------- Buyer items ----------
const buyerItems: DashboardItem[] = [
    { key: 'overview', name: 'buyerDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: BuyerOverview },
    { key: 'properties', name: 'buyerDashboardProperties', path: 'properties', icon: Building2, label: { en: 'Properties', ar: 'العقارات' }, component: BuyerProperties },
    { key: 'favorites', name: 'buyerDashboardFavorites', path: 'favorites', icon: Heart, label: { en: 'Favorites', ar: 'المفضلة' }, component: BuyerFavorites },
    { key: 'messages', name: 'buyerDashboardMessages', path: 'messages', icon: MessageSquare, label: { en: 'Messages', ar: 'الرسائل' }, component: BuyerMessages },
    { key: 'chatRequests', name: 'buyerDashboardChatRequests', path: 'chat-requests', icon: Inbox, label: { en: 'Chat Requests', ar: 'طلبات المحادثة' }, component: BuyerChatRequests },
    { key: 'bankAccounts', name: 'buyerDashboardBankAccounts', path: 'bank-accounts', icon: Landmark, label: { en: 'Bank Accounts & Payments', ar: 'الحسابات البنكية والمدفوعات' }, component: BuyerBankAccounts },
    { key: 'settings', name: 'buyerDashboardSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: BuyerSettings },
    { key: 'verification', name: 'buyerDashboardVerification', path: 'verification', icon: BadgeCheck, label: { en: 'Account Verification', ar: 'التحقق من الحساب' }, component: AccountVerification },
]

// ---------- Super admin items ----------
const saOverview: DashboardItem = { key: 'overview', name: 'superAdminDashboard', path: '', icon: LayoutDashboard, label: { en: 'Overview', ar: 'نظرة عامة' }, component: SuperAdminOverview }

const saWebsiteContent: DashboardGroup = {
    key: 'websiteContent',
    label: { en: 'Website Content', ar: 'محتوى الموقع' },
    icon: Globe,
    items: [
        { key: 'websiteHeader', name: 'superAdminWebsiteHeader', path: 'website-header', icon: Sparkles, label: { en: 'Website Header', ar: 'رأس الموقع' }, component: SuperAdminWebsiteHeader },
        { key: 'homepage', name: 'superAdminHomepage', path: 'homepage', icon: Home, label: { en: 'Homepage', ar: 'الصفحة الرئيسية' }, component: SuperAdminHomepage },
        { key: 'aboutUs', name: 'superAdminAboutUs', path: 'about-us', icon: Info, label: { en: 'About Us', ar: 'من نحن' }, component: SuperAdminAboutUs },
        { key: 'compare', name: 'superAdminComparison', path: 'compare', icon: ArrowLeftRight, label: { en: 'Comparison Page', ar: 'صفحة المقارنة' }, component: SuperAdminComparison },
        { key: 'contact', name: 'superAdminContact', path: 'contact', icon: Mail, label: { en: 'Contact', ar: 'تواصل معنا' }, component: SuperAdminContact },
        { key: 'authPages', name: 'superAdminAuthPages', path: 'auth-pages', icon: LogIn, label: { en: 'Authentication Pages', ar: 'صفحات التسجيل' }, component: SuperAdminAuthPages },
    ],
}

const saCatalog: DashboardGroup = {
    key: 'catalog',
    label: { en: 'Products & Categories', ar: 'المنتجات والتصنيفات' },
    icon: FolderOpen,
    items: [
        { key: 'products', name: 'superAdminProducts', path: 'products', icon: Package, label: { en: 'Products', ar: 'المنتجات' }, component: SuperAdminProducts },
        { key: 'categories', name: 'superAdminCategories', path: 'categories', icon: LayoutGrid, label: { en: 'Categories', ar: 'التصنيفات' }, component: SuperAdminCategories },
        { key: 'propertyManagement', name: 'superAdminPropertyManagement', path: 'property-management', icon: Building2, label: { en: 'Property Management', ar: 'إدارة العقارات' }, component: SuperAdminPropertyManagement },
        { key: 'blog', name: 'superAdminBlog', path: 'blog', icon: Newspaper, label: { en: 'Blog', ar: 'المدونة' }, component: SuperAdminBlog },
    ],
}

const saPlatform: DashboardGroup = {
    key: 'platform',
    label: { en: 'Platform Management', ar: 'إدارة المنصة' },
    icon: LayoutGrid,
    items: [
        { key: 'users', name: 'superAdminUsers', path: 'users', icon: Users, label: { en: 'Users', ar: 'المستخدمون' }, component: SuperAdminUsers },
        { key: 'verificationManagement', name: 'superAdminVerificationManagement', path: 'verification', icon: BadgeCheck, label: { en: 'Verification Management', ar: 'إدارة التحقق' }, component: SuperAdminVerificationManagement },
        { key: 'purchaseTransactions', name: 'superAdminPurchaseTransactions', path: 'purchase-transactions', icon: ArrowLeftRight, label: { en: 'Purchase Transactions', ar: 'معاملات الشراء' }, component: SuperAdminPurchaseTransactions },
        { key: 'conversations', name: 'superAdminConversations', path: 'conversations', icon: MessageSquare, label: { en: 'Conversations', ar: 'المحادثات' }, component: SuperAdminConversations },
        { key: 'platformRevenue', name: 'superAdminPlatformRevenue', path: 'platform-revenue', icon: TrendingUp, label: { en: 'Platform Revenue', ar: 'إيرادات المنصة' }, component: SuperAdminPlatformRevenue },
    ],
}

const saSettings: DashboardItem = { key: 'settings', name: 'superAdminSettings', path: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' }, component: SuperAdminSettings }

export const roleConfig: Record<UserRole, RoleConfig> = {
    owner: {
        role: 'owner',
        roleLabel: { en: 'Owner', ar: 'مالك' },
        groups: [],
        items: ownerItems,
    },
    buyer: {
        role: 'buyer',
        roleLabel: { en: 'Buyer', ar: 'مشتري' },
        groups: [],
        items: buyerItems,
    },
    'super-admin': {
        role: 'super-admin',
        roleLabel: { en: 'Super Admin', ar: 'مشرف عام' },
        groups: [saWebsiteContent, saCatalog, saPlatform],
        items: [saOverview, ...saWebsiteContent.items, ...saCatalog.items, ...saPlatform.items, saSettings],
    },
}
