export interface SuperAdminInfo {
    nameEn: string
    nameAr: string
    email: string
    avatar: string
}

export const superAdminInfo: SuperAdminInfo = {
    nameEn: 'Omar Khaled',
    nameAr: 'عمر خالد',
    email: 'admin@dwello.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
}

export const saAnalytics = {
    totalUsers: 4820,
    totalProperties: 1528,
    totalListings: 2103,
    totalRevenue: 412800,
    pendingApprovals: 12,
    websiteVisits: 18920,
    activeChats: 87,
    revenueGrowth: 18.6,
    userGrowth: 9.4,
}

export interface ContactMessage {
    id: string
    nameEn: string
    nameAr: string
    email: string
    subjectEn: string
    subjectAr: string
    messageEn: string
    messageAr: string
    date: string
    read: boolean
}

export const contactMessages: ContactMessage[] = [
    {
        id: '1',
        nameEn: 'Mohamed Hassan',
        nameAr: 'محمد حسن',
        email: 'mohamed@example.com',
        subjectEn: 'Inquiry about listing a villa',
        subjectAr: 'استفسار حول إدراج فيلا',
        messageEn: 'I would like to know the requirements to list my villa on the platform.',
        messageAr: 'أود معرفة متطلبات إدراج فلتي على المنصة.',
        date: '2026-08-15',
        read: false,
    },
    {
        id: '2',
        nameEn: 'Layla Ibrahim',
        nameAr: 'ليلى إبراهيم',
        email: 'layla@example.com',
        subjectEn: 'Payment issue',
        subjectAr: 'مشكلة في الدفع',
        messageEn: 'My payment went through but the transaction is still pending.',
        messageAr: 'تمت عملية الدفع لكن المعاملة ما زالت قيد الانتظار.',
        date: '2026-08-14',
        read: true,
    },
    {
        id: '3',
        nameEn: 'Omar Farouk',
        nameAr: 'عمر فاروق',
        email: 'omar@example.com',
        subjectEn: 'Suggest a new feature',
        subjectAr: 'اقتراح ميزة جديدة',
        messageEn: 'Would be great to add a mortgage calculator on the property pages.',
        messageAr: 'سيكون من الرائع إضافة حاسبة الرهن العقاري في صفحات العقارات.',
        date: '2026-08-12',
        read: false,
    },
]

export interface AuthPageContent {
    key: string
    titleEn: string
    titleAr: string
    subtitleEn: string
    subtitleAr: string
    buttonLabelEn: string
    buttonLabelAr: string
}

export const authPageContents: AuthPageContent[] = [
    {
        key: 'login',
        titleEn: 'Welcome Back!',
        titleAr: 'أهلاً بعودتك!',
        subtitleEn: 'Enter below details to sign in to your account',
        subtitleAr: 'أدخل بياناتك أدناه لتسجيل الدخول إلى حسابك',
        buttonLabelEn: 'Sign In',
        buttonLabelAr: 'تسجيل الدخول',
    },
    {
        key: 'register',
        titleEn: 'Hello User!',
        titleAr: 'مرحباً بك!',
        subtitleEn: 'Enter below details to create an account',
        subtitleAr: 'أدخل بياناتك أدناه لإنشاء حساب جديد',
        buttonLabelEn: 'Sign Up',
        buttonLabelAr: 'إنشاء حساب',
    },
]

export interface WebsiteHeaderField {
    key: string
    label: { en: string; ar: string }
    value: string
    type: 'text' | 'logo' | 'toggle'
    enabled: boolean
}

export const websiteHeaderFields: WebsiteHeaderField[] = [
    { key: 'logo', label: { en: 'Brand Logo', ar: 'شعار العلامة' }, value: 'Dwello', type: 'logo', enabled: true },
    { key: 'tagline', label: { en: 'Tagline', ar: 'الشعار النصي' }, value: 'Your Premier Property Marketplace', type: 'text', enabled: true },
    { key: 'home', label: { en: 'Home', ar: 'الرئيسية' }, value: 'Home', type: 'text', enabled: true },
    { key: 'about', label: { en: 'About Us', ar: 'من نحن' }, value: 'About Us', type: 'text', enabled: true },
    { key: 'products', label: { en: 'Products', ar: 'المنتجات' }, value: 'Products', type: 'text', enabled: true },
    { key: 'blog', label: { en: 'Blog', ar: 'المدونة' }, value: 'Blog', type: 'text', enabled: true },
    { key: 'contact', label: { en: 'Contact', ar: 'تواصل معنا' }, value: 'Contact', type: 'text', enabled: true },
]

export const homepageEditable = [
    { key: 'heroTitle1', label: { en: 'Hero Title 1', ar: 'العنوان الرئيسي 1' }, value: 'Your Premier Property Marketplace', type: 'textarea' },
    { key: 'heroTitle2', label: { en: 'Hero Title 2', ar: 'العنوان الرئيسي 2' }, value: 'List Your Unit or Find Your Dream Home', type: 'textarea' },
    { key: 'heroSubtitle', label: { en: 'Hero Subtitle', ar: 'النص الفرعي' }, value: 'Connecting property owners with buyers directly.', type: 'textarea' },
    { key: 'cta', label: { en: 'Primary CTA', ar: 'زر الدعوة الرئيسي' }, value: 'Contact Us', type: 'text' },
]

export const aboutUsEditable = [
    { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, value: 'Connecting Property Owners with Buyers Directly', type: 'textarea' },
    { key: 'description', label: { en: 'Description', ar: 'الوصف' }, value: 'We empower owners to showcase their units to thousands of verified buyers.', type: 'textarea' },
]

export const authHeroEditable = [
    { key: 'heroTitle', label: { en: 'Auth Hero Title', ar: 'عنوان صفحة التسجيل' }, value: 'Unleash Your Living Spirit!', type: 'textarea' },
    { key: 'heroDesc', label: { en: 'Auth Hero Description', ar: 'وصف صفحة التسجيل' }, value: 'Discover a world filled with premier luxury homes.', type: 'textarea' },
]

export const platformRevenue = {
    grossRevenue: 412800,
    netRevenue: 326500,
    commissionFees: 86300,
    totalProfit: 240200,
    monthlyRevenue: [300000, 340000, 320000, 388000, 355000, 415000, 398000, 412800],
    monthlyTransactions: [120, 145, 132, 160, 150, 175, 168, 186],
    monthlyProfit: [172000, 195000, 183000, 224000, 205000, 240000, 228000, 240200],
} as const