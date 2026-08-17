import authBg from '../assets/images/auth.jpg'

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

export interface AuthFormField {
    key: string
    labelEn: string
    labelAr: string
    placeholderEn: string
    placeholderAr: string
}

export interface AuthPageText {
    key: string
    labelEn: string
    labelAr: string
}

export interface AuthPageImage {
    key: string
    labelEn: string
    labelAr: string
    value: string
}

export interface AuthPageContent {
    key: string
    titleEn: string
    titleAr: string
    subtitleEn: string
    subtitleAr: string
    descriptionEn?: string
    descriptionAr?: string
    buttonLabelEn: string
    buttonLabelAr: string
    formFields?: AuthFormField[]
    texts: AuthPageText[]
    images: AuthPageImage[]
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
        formFields: [
            { key: 'email', labelEn: 'Email Address', labelAr: 'البريد الإلكتروني', placeholderEn: 'Enter your email', placeholderAr: 'أدخل بريدك الإلكتروني' },
            { key: 'password', labelEn: 'Password', labelAr: 'كلمة المرور', placeholderEn: 'Enter your password', placeholderAr: 'أدخل كلمة المرور' },
        ],
        texts: [
            { key: 'rememberMe', labelEn: 'Remember me', labelAr: 'تذكرني' },
            { key: 'forgotPassword', labelEn: 'Forgot password?', labelAr: 'نسيت كلمة المرور؟' },
            { key: 'or', labelEn: 'Or', labelAr: 'أو' },
            { key: 'googleButton', labelEn: 'Continue with Google', labelAr: 'المتابعة باستخدام Google' },
            { key: 'dontHaveAccount', labelEn: "Don't have an account?", labelAr: 'ليس لديك حساب؟' },
            { key: 'registerHere', labelEn: 'Sign Up Here', labelAr: 'أنشئ حسابك هنا' },
        ],
        images: [
            { key: 'side', labelEn: 'Side Illustration', labelAr: 'الصورة الجانبية', value: authBg },
            { key: 'background', labelEn: 'Background Image', labelAr: 'صورة الخلفية', value: authBg },
        ],
    },
    {
        key: 'register',
        titleEn: 'Hello User!',
        titleAr: 'مرحباً بك!',
        subtitleEn: 'Enter below details to create an account',
        subtitleAr: 'أدخل بياناتك أدناه لإنشاء حساب جديد',
        buttonLabelEn: 'Sign Up',
        buttonLabelAr: 'إنشاء حساب',
        formFields: [
            { key: 'name', labelEn: 'Full Name', labelAr: 'الاسم الكامل', placeholderEn: 'Enter your full name', placeholderAr: 'أدخل اسمك الكامل' },
            { key: 'email', labelEn: 'Email Address', labelAr: 'البريد الإلكتروني', placeholderEn: 'Enter your email', placeholderAr: 'أدخل بريدك الإلكتروني' },
            { key: 'phone', labelEn: 'Phone Number', labelAr: 'رقم الهاتف', placeholderEn: 'Enter your phone number', placeholderAr: 'أدخل رقم هاتفك' },
            { key: 'password', labelEn: 'Password', labelAr: 'كلمة المرور', placeholderEn: 'Enter your password', placeholderAr: 'أدخل كلمة المرور' },
            { key: 'confirmPassword', labelEn: 'Confirm Password', labelAr: 'تأكيد كلمة المرور', placeholderEn: 'Re-enter your password', placeholderAr: 'أعد إدخال كلمة المرور' },
        ],
        texts: [
            { key: 'role', labelEn: 'Account Type', labelAr: 'نوع الحساب' },
            { key: 'roleOwner', labelEn: 'Owner', labelAr: 'مالك' },
            { key: 'roleClient', labelEn: 'Client', labelAr: 'عميل' },
            { key: 'or', labelEn: 'Or', labelAr: 'أو' },
            { key: 'googleButton', labelEn: 'Continue with Google', labelAr: 'المتابعة باستخدام Google' },
            { key: 'alreadyHaveAccount', labelEn: 'Already have an account?', labelAr: 'لديك حساب بالفعل؟' },
            { key: 'loginHere', labelEn: 'Login Here', labelAr: 'سجل دخولك هنا' },
        ],
        images: [
            { key: 'side', labelEn: 'Side Illustration', labelAr: 'الصورة الجانبية', value: authBg },
            { key: 'background', labelEn: 'Background Image', labelAr: 'صورة الخلفية', value: authBg },
        ],
    },
    {
        key: 'forgotPassword',
        titleEn: 'Forgot Password?',
        titleAr: 'نسيت كلمة المرور؟',
        subtitleEn: 'No worries, enter your email below and we will send you a reset link.',
        subtitleAr: 'لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.',
        descriptionEn: 'You will receive an email with instructions to reset your password in a few minutes.',
        descriptionAr: 'ستصلك رسالة بريد إلكتروني تتضمن تعليمات إعادة تعيين كلمة المرور خلال دقائق.',
        buttonLabelEn: 'Send Reset Link',
        buttonLabelAr: 'إرسال رابط إعادة التعيين',
        formFields: [
            { key: 'email', labelEn: 'Email Address', labelAr: 'البريد الإلكتروني', placeholderEn: 'Enter your email', placeholderAr: 'أدخل بريدك الإلكتروني' },
        ],
        texts: [
            { key: 'backToLogin', labelEn: 'Back to Login', labelAr: 'العودة لتسجيل الدخول' },
        ],
        images: [
            { key: 'side', labelEn: 'Side Illustration', labelAr: 'الصورة الجانبية', value: authBg },
            { key: 'background', labelEn: 'Background Image', labelAr: 'صورة الخلفية', value: authBg },
        ],
    },
    {
        key: 'emailVerification',
        titleEn: 'Verify Your Email',
        titleAr: 'تحقق من بريدك الإلكتروني',
        subtitleEn: 'We have sent a verification code to your email. Enter it below to verify your account.',
        subtitleAr: 'أرسلنا رمز التحقق إلى بريدك الإلكتروني. أدخل الرمز أدناه للتحقق من حسابك.',
        descriptionEn: 'The code is valid for 10 minutes. Check your inbox or spam folder.',
        descriptionAr: 'الرمز صالح لمدة 10 دقائق. تحقق من صندوق الوارد أو البريد غير المرغوب فيه.',
        buttonLabelEn: 'Verify Email',
        buttonLabelAr: 'تأكيد البريد الإلكتروني',
        formFields: [
            { key: 'code', labelEn: 'Verification Code', labelAr: 'رمز التحقق', placeholderEn: 'Enter the 6-digit code', placeholderAr: 'أدخل الرمز المكون من 6 أرقام' },
        ],
        texts: [
            { key: 'didntReceive', labelEn: "Didn't receive the code?", labelAr: 'لم يصلك الرمز؟' },
            { key: 'resend', labelEn: 'Resend Code', labelAr: 'إعادة إرسال الرمز' },
            { key: 'backToLogin', labelEn: 'Back to Login', labelAr: 'العودة لتسجيل الدخول' },
        ],
        images: [
            { key: 'side', labelEn: 'Side Illustration', labelAr: 'الصورة الجانبية', value: authBg },
            { key: 'background', labelEn: 'Background Image', labelAr: 'صورة الخلفية', value: authBg },
        ],
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
    { key: 'compare', label: { en: 'Compare', ar: 'مقارنة' }, value: 'Compare', type: 'text', enabled: true },
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

// ---------- Overview widgets: conversations & transactions between Buyers and Owners ----------
// The Super Admin only monitors this activity, they do not participate in it.

export interface PlatformChatMessage {
    sender: 'buyer' | 'owner'
    textEn: string
    textAr: string
    time: string
    date: string
}

export interface PlatformConversation {
    id: string
    buyerEn: string
    buyerAr: string
    ownerEn: string
    ownerAr: string
    propertyEn: string
    propertyAr: string
    propertyImage: string
    lastMessageEn: string
    lastMessageAr: string
    time: string
    buyerAvatar: string
    ownerAvatar: string
    buyerOnline: boolean
    ownerOnline: boolean
    unread: number
    status: 'active' | 'pending' | 'closed'
    startedAt: string
    messages: PlatformChatMessage[]
}

export const platformConversations: PlatformConversation[] = [
    {
        id: '1',
        buyerEn: 'Sarah Johnson',
        buyerAr: 'سارة جونسون',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400',
        lastMessageEn: 'Is the villa still available this weekend?',
        lastMessageAr: 'هل الفيلا ما زالت متاحة هذا الأسبوع؟',
        time: '2m',
        buyerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
        buyerOnline: true,
        ownerOnline: false,
        unread: 2,
        status: 'active',
        startedAt: '2026-08-10',
        messages: [
            { sender: 'buyer', textEn: 'Hello! I saw the Luxury Modern Villa listing and I am very interested.', textAr: 'مرحباً! لقد رأيت إعلان الفيلا العصرية الفاخرة وأنا مهتم جداً.', time: '10:02 AM', date: '2026-08-10' },
            { sender: 'owner', textEn: 'Hi Sarah! Glad to hear that. The villa is available for monthly rent.', textAr: 'مرحباً سارة! سعيد بذلك. الفيلا متاحة للإيجار الشهري.', time: '10:15 AM', date: '2026-08-10' },
            { sender: 'buyer', textEn: 'Is the villa still available this weekend?', textAr: 'هل الفيلا ما زالت متاحة هذا الأسبوع؟', time: '10:32 AM', date: '2026-08-17' },
            { sender: 'owner', textEn: 'Yes, it is. You can visit anytime on Saturday morning.', textAr: 'نعم، ما زالت متاحة. يمكنك زيارتها صباح السبت.', time: '10:40 AM', date: '2026-08-17' },
        ],
    },
    {
        id: '2',
        buyerEn: 'Mohamed Hassan',
        buyerAr: 'محمد حسن',
        ownerEn: 'Mona Reda',
        ownerAr: 'منى رضا',
        propertyEn: 'Waterfront Modern Chalet',
        propertyAr: 'شاليه ساحلي مودرن',
        propertyImage: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=400',
        lastMessageEn: 'Can we negotiate the monthly price?',
        lastMessageAr: 'هل يمكننا التفاوض على السعر الشهري؟',
        time: '1h',
        buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        buyerOnline: false,
        ownerOnline: true,
        unread: 0,
        status: 'pending',
        startedAt: '2026-08-12',
        messages: [
            { sender: 'buyer', textEn: 'Hi, is the chalet still on the market?', textAr: 'مرحباً، هل الشاليه ما زال متاحاً؟', time: '09:20 AM', date: '2026-08-12' },
            { sender: 'owner', textEn: 'Yes it is. Are you interested in renting it?', textAr: 'نعم، هل أنت مهتم باستئجاره؟', time: '09:45 AM', date: '2026-08-12' },
            { sender: 'buyer', textEn: 'Can we negotiate the monthly price?', textAr: 'هل يمكننا التفاوض على السعر الشهري؟', time: '10:05 AM', date: '2026-08-17' },
        ],
    },
    {
        id: '3',
        buyerEn: 'Layla Ibrahim',
        buyerAr: 'ليلى إبراهيم',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Urban Designer Loft',
        propertyAr: 'لوفت بتصميم معماري فريد',
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400',
        lastMessageEn: 'Thanks! We completed the payment.',
        lastMessageAr: 'شكراً! لقد أكملنا عملية الدفع.',
        time: '3h',
        buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
        buyerOnline: true,
        ownerOnline: false,
        unread: 0,
        status: 'closed',
        startedAt: '2026-08-05',
        messages: [
            { sender: 'buyer', textEn: 'Hi! Is the loft available for viewing this week?', textAr: 'مرحباً! هل اللوفت متاح للمعاينة هذا الأسبوع؟', time: '03:10 PM', date: '2026-08-05' },
            { sender: 'owner', textEn: 'Sure, Thursday at 2 PM works for me.', textAr: 'بالتأكيد، يوم الخميس الساعة 2 ظهراً يناسبني.', time: '03:30 PM', date: '2026-08-05' },
            { sender: 'buyer', textEn: 'Great, I will confirm shortly.', textAr: 'رائع، سأؤكد قريباً.', time: '03:40 PM', date: '2026-08-05' },
            { sender: 'buyer', textEn: 'Thanks! We completed the payment.', textAr: 'شكراً! لقد أكملنا عملية الدفع.', time: '05:20 PM', date: '2026-08-16' },
        ],
    },
    {
        id: '4',
        buyerEn: 'Omar Farouk',
        buyerAr: 'عمر فاروق',
        ownerEn: 'Layla Hassan',
        ownerAr: 'ليلى حسن',
        propertyEn: 'Sky Penthouse',
        propertyAr: 'بنتهاوس سماوي',
        propertyImage: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=400',
        lastMessageEn: 'Could you send more photos of the penthouse?',
        lastMessageAr: 'هل يمكنك إرسال المزيد من صور البنتهاوس؟',
        time: '1d',
        buyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        buyerOnline: false,
        ownerOnline: true,
        unread: 1,
        status: 'active',
        startedAt: '2026-08-11',
        messages: [
            { sender: 'buyer', textEn: 'Good morning, I am interested in the Sky Penthouse.', textAr: 'صباح الخير، أنا مهتم ببنتهاوس السماوي.', time: '11:00 AM', date: '2026-08-11' },
            { sender: 'owner', textEn: 'Good morning! Great choice. It has a 360-degree view.', textAr: 'صباح الخير! اختيار رائع. يتمتع بإطلالة 360 درجة.', time: '11:20 AM', date: '2026-08-11' },
            { sender: 'buyer', textEn: 'Could you send more photos of the penthouse?', textAr: 'هل يمكنك إرسال المزيد من صور البنتهاوس؟', time: '09:15 AM', date: '2026-08-16' },
        ],
    },
    {
        id: '5',
        buyerEn: 'Nour El-Din',
        buyerAr: 'نور الدين',
        ownerEn: 'Omar Farouk',
        ownerAr: 'عمر فاروق',
        propertyEn: 'Cozy Modern Studio',
        propertyAr: 'استوديو عصري أنيق',
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400',
        lastMessageEn: 'The payment failed, could you check?',
        lastMessageAr: 'فشلت عملية الدفع، هل يمكنك التحقق؟',
        time: '2d',
        buyerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        buyerOnline: false,
        ownerOnline: false,
        unread: 0,
        status: 'pending',
        startedAt: '2026-08-14',
        messages: [
            { sender: 'buyer', textEn: 'Hi, I tried to pay for the studio but the payment failed.', textAr: 'مرحباً، حاولت الدفع مقابل الاستوديو لكن العملية فشلت.', time: '08:40 AM', date: '2026-08-15' },
            { sender: 'owner', textEn: 'Let me check the transaction status for you.', textAr: 'دعني أتحقق من حالة المعاملة لك.', time: '09:00 AM', date: '2026-08-15' },
            { sender: 'buyer', textEn: 'The payment failed, could you check?', textAr: 'فشلت عملية الدفع، هل يمكنك التحقق؟', time: '10:10 AM', date: '2026-08-15' },
        ],
    },
]

export interface PlatformTransaction {
    id: string
    buyerEn: string
    buyerAr: string
    ownerEn: string
    ownerAr: string
    propertyEn: string
    propertyAr: string
    amount: number
    status: 'completed' | 'pending' | 'failed' | 'refunded'
    date: string
    buyerAvatar: string
    ownerAvatar: string
}

export const platformTransactions: PlatformTransaction[] = [
    {
        id: 'TX-4821',
        buyerEn: 'Sarah Johnson',
        buyerAr: 'سارة جونسون',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        amount: 4800,
        status: 'completed',
        date: '2026-08-14',
        buyerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4806',
        buyerEn: 'Mohamed Hassan',
        buyerAr: 'محمد حسن',
        ownerEn: 'Mona Reda',
        ownerAr: 'منى رضا',
        propertyEn: 'Waterfront Modern Chalet',
        propertyAr: 'شاليه ساحلي مودرن',
        amount: 3500,
        status: 'pending',
        date: '2026-08-12',
        buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4790',
        buyerEn: 'Layla Ibrahim',
        buyerAr: 'ليلى إبراهيم',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Urban Designer Loft',
        propertyAr: 'لوفت بتصميم معماري فريد',
        amount: 2400,
        status: 'completed',
        date: '2026-08-09',
        buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4775',
        buyerEn: 'Omar Farouk',
        buyerAr: 'عمر فاروق',
        ownerEn: 'Layla Hassan',
        ownerAr: 'ليلى حسن',
        propertyEn: 'Sky Penthouse',
        propertyAr: 'بنتهاوس سماوي',
        amount: 2100,
        status: 'failed',
        date: '2026-08-05',
        buyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4761',
        buyerEn: 'Nour El-Din',
        buyerAr: 'نور الدين',
        ownerEn: 'Omar Farouk',
        ownerAr: 'عمر فاروق',
        propertyEn: 'Cozy Modern Studio',
        propertyAr: 'استوديو عصري أنيق',
        amount: 1200,
        status: 'refunded',
        date: '2026-07-28',
        buyerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
]