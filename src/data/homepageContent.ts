// Mock editable content for the homepage. Every section shown on the public
// homepage has a matching editor here. The backend will later bind these keys
// to real API fields via Laravel + Inertia.

import heroImage from '../assets/images/hero-new.svg'
import about1 from '../assets/images/about1.png'
import about2 from '../assets/images/about2.png'
import communityBg from '../assets/images/Rectangle 110.png'
import room1 from '../assets/images/room1.png'
import type { Bilingual, EditableSection } from './contentTypes'

export interface HeroSlide {
    id: number
    title1: Bilingual
    title2: Bilingual
    subtitle: Bilingual
    buttonLabel: Bilingual
    image: string
}

export interface TestimonialReview {
    id: number
    nameEn: string
    nameAr: string
    role: 'buyer' | 'seller'
    rating: number
    textEn: string
    textAr: string
    propertyEn: string
    propertyAr: string
    dateEn: string
    dateAr: string
    avatar: string
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title1: { en: 'Your Premier Property Marketplace', ar: 'منصتك الأولى للعقارات' },
        title2: { en: 'List Your Unit or Find Your Dream Home', ar: 'اعرض وحدتك أو امتلك بيت أحلامك' },
        subtitle: {
            en: 'Whether you are an owner looking to sell or rent your property,\nor a buyer searching for your dream home, we deliver a seamless experience.',
            ar: 'سواء كنت مالكاً ترغب في عرض عقاراتك للبيع أو الإيجار،\nأو مشترياً يبحث عن منزله المستقبلي، نوفر لك تجربة استثنائية.',
        },
        buttonLabel: { en: 'Contact Us', ar: 'تواصل معنا' },
        image: heroImage,
    },
    {
        id: 2,
        title1: { en: 'Smart Real Estate Investment', ar: 'استثمر وسوق وحدتك بذكاء' },
        title2: { en: 'Direct Connection Between Sellers & Buyers', ar: 'تواصل مباشر بين البائع والمشتري' },
        subtitle: {
            en: 'Thousands of active buyers browse our marketplace daily.\nList your unit in minutes and connect with interested clients directly.',
            ar: 'آلاف المستثمرين والمشترين يصفحون منصتنا يومياً.\nأضف عقارك الآن في خطوات بسيطة وتواصل مع عملائك.',
        },
        buttonLabel: { en: 'Contact Us', ar: 'تواصل معنا' },
        image: heroImage,
    },
    {
        id: 3,
        title1: { en: 'Your Trusted Property Destination', ar: 'وجهتك العقارية الموثوقة' },
        title2: { en: 'Exclusive Residential & Commercial Listings', ar: 'عروض حصرية وحدات سكنية وتجارية' },
        subtitle: {
            en: 'Explore premium apartments, villas, and spaces at competitive prices\nand find the perfect property tailored just for you.',
            ar: 'تصفح أرقى الشقق، الفلل، والاستوديوهات بأفضل الأسعار\nواختر ما يناسب تطلعاتك بكل سهولة وأمان.',
        },
        buttonLabel: { en: 'Contact Us', ar: 'تواصل معنا' },
        image: heroImage,
    },
]

export const homepageSections: EditableSection[] = [
    {
        key: 'about',
        label: { en: 'About Section', ar: 'قسم من نحن' },
        hint: { en: 'Introductory text and images below the hero', ar: 'النصوص والصور التعريفية أسفل البطل' },
        fields: [
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'text', value: { en: 'How Dwello Works', ar: 'كيف تعمل منصة دويلو' } },
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'textarea', value: { en: 'Connecting Property Owners with Buyers Directly', ar: 'ربط أصحاب العقارات بالمشترين والمستثمرين مباشرة' } },
            { key: 'description1', label: { en: 'Description 1', ar: 'الوصف 1' }, type: 'textarea', value: { en: 'Welcome to Dwello, the premier real estate marketplace designed for seamless property buying, selling, and renting.', ar: 'مرحباً بك في دويلو، المنصة العقارية الرائدة المصممة لتسهيل عمليات بيع وشراء وإيجار العقارات بكل سهولة وأمان.' } },
            { key: 'description2', label: { en: 'Description 2', ar: 'الوصف 2' }, type: 'textarea', value: { en: 'We empower property owners to showcase their residential and commercial units to thousands of verified buyers, while providing buyers with transparent pricing, verified listings, and direct contact with owners.', ar: 'نمكّن أصحاب الوحدات العقارية من عرض عقاراتهم السكنية والتجارية أمام آلاف المشترين والمستثمرين، مع توفير تجربة تصفح سلسة، أسعار شفافة، وتواصل مباشر بدون تعقيدات.' } },
            { key: 'contactUs', label: { en: 'Button Label', ar: 'نص الزر' }, type: 'text', value: { en: 'Start Exploring', ar: 'ابدأ الاستكشاف' } },
        ],
        images: [
            { key: 'image1', label: { en: 'Image 1', ar: 'الصورة 1' }, value: about1 },
            { key: 'image2', label: { en: 'Image 2', ar: 'الصورة 2' }, value: about2 },
        ],
    },
    {
        key: 'rooms',
        label: { en: 'Latest Properties Section', ar: 'قسم أحدث العقارات' },
        hint: { en: 'Headline texts above the latest property cards', ar: 'النصوص الرئيسية أعلى بطاقات العقارات الأحدث' },
        fields: [
            { key: 'badge', label: { en: 'Badge', ar: 'الشارة' }, type: 'text', value: { en: 'Latest Properties', ar: 'العقارات الأحدث' } },
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'text', value: { en: 'Recently Added Units', ar: 'أحدث الوحدات المضافة حديثاً' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'textarea', value: { en: 'Handpicked residential and commercial units listed directly by verified property owners.', ar: 'وحدات سكنية وتجارية مختارة بعناية معروضة مباشرة من أصحاب العقارات الموثقين.' } },
            { key: 'viewAll', label: { en: 'View All Button', ar: 'زر عرض الكل' }, type: 'text', value: { en: 'View All Properties', ar: 'عرض كافة العقارات' } },
            { key: 'browseAll', label: { en: 'Browse Button', ar: 'زر التصفح' }, type: 'text', value: { en: 'Browse All Available Properties', ar: 'تصفح جميع العقارات المتاحة' } },
        ],
        images: [],
    },
    {
        key: 'community',
        label: { en: 'Search & Newsletter Section', ar: 'قسم البحث والنشرة البريدية' },
        hint: { en: 'Advanced search widget and newsletter subscription block', ar: 'أداة البحث المتطور وكتلة الاشتراك في النشرة' },
        fields: [
            { key: 'badge', label: { en: 'Badge', ar: 'الشارة' }, type: 'text', value: { en: 'Advanced Real Estate Search', ar: 'محرك البحث العقاري المتطور' } },
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'text', value: { en: 'Find Your Ideal Property', ar: 'ابحث عن عقارك المناسب' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'textarea', value: { en: 'Specify your preferred unit type, location, and budget to narrow down the best options for you.', ar: 'حدد نوع الوحدة المفضل والموقع والميزانية لتضييق نطاق الخيارات الأنسب لك.' } },
            { key: 'searchBtn', label: { en: 'Search Button', ar: 'زر البحث' }, type: 'text', value: { en: 'Search Properties', ar: 'بحث عن عقار' } },
            { key: 'newsletterTitle', label: { en: 'Newsletter Title', ar: 'عنوان النشرة' }, type: 'text', value: { en: 'Subscribe to Exclusive Property Alerts', ar: 'اشترك للحصول على أحدث العروض العقارية' } },
            { key: 'newsletterPlaceholder', label: { en: 'Newsletter Placeholder', ar: 'نص الحقل' }, type: 'text', value: { en: 'Enter your email address', ar: 'أدخل بريدك الإلكتروني' } },
            { key: 'subscribeBtn', label: { en: 'Subscribe Button', ar: 'زر الاشتراك' }, type: 'text', value: { en: 'Subscribe', ar: 'اشتراك' } },
        ],
        images: [
            { key: 'background', label: { en: 'Background Image', ar: 'صورة الخلفية' }, value: communityBg },
        ],
    },
    {
        key: 'experience',
        label: { en: 'Experience Section', ar: 'قسم الخبرة' },
        hint: { en: 'Trust building block with years counter', ar: 'كتلة بناء الثقة مع عدّاد السنوات' },
        fields: [
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'textarea', value: { en: 'Empowering Real Estate Trading with Trust and Speed', ar: 'نمكّن تداول العقارات بأمان وسرعة فائقة' } },
            { key: 'yearsValue', label: { en: 'Years Counter', ar: 'عدد السنوات' }, type: 'text', value: { en: '12', ar: '12' } },
            { key: 'yearsLabel', label: { en: 'Years Label', ar: 'وصف السنوات' }, type: 'text', value: { en: 'Successful Transactions', ar: 'صفقة عقارية ناجحة' } },
            { key: 'desc1', label: { en: 'Description 1', ar: 'الوصف 1' }, type: 'textarea', value: { en: 'Dwello simplifies real estate for owners and buyers alike. Property owners can list their units with high-resolution photos, detailed specifications, and transparent pricing.', ar: 'تبسط منصة دويلو عملية تداول العقارات لأصحاب الوحدات والمشترين على حد سواء. يمكن لمالك العقار إضافة وحدته خلال دقائق مع صور عالية الجودة ومواصفات تفصيلية وسعر واضح.' } },
            { key: 'desc2', label: { en: 'Description 2', ar: 'الوصف 2' }, type: 'textarea', value: { en: 'Buyers enjoy advanced location filtering, verified owner profiles, direct negotiation options, and hassle-free transactions.', ar: 'ويتمتع المشتري بفلترة فائقة السرعة، استعراض الملف الشخصي للمالك الموثق، والتواصل المباشر لإتمام الصفقات بدون وسائط معقدة.' } },
            { key: 'contactUs', label: { en: 'Button Label', ar: 'نص الزر' }, type: 'text', value: { en: 'List Your Property', ar: 'أضف عقارك الآن' } },
        ],
        images: [
            { key: 'image', label: { en: 'Counter Image', ar: 'صورة العداد' }, value: room1 },
        ],
    },
    {
        key: 'testimonials',
        label: { en: 'Testimonials Section', ar: 'قسم آراء العملاء' },
        hint: { en: 'Client reviews header and review cards', ar: 'ترويسة آراء العملاء وبطاقات التقييمات' },
        fields: [
            { key: 'tag', label: { en: 'Tag', ar: 'الشارة' }, type: 'text', value: { en: 'Client Experiences', ar: 'تجارب وآراء عملائنا' } },
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'text', value: { en: 'What Our Valued Clients Say', ar: 'ماذا يقول عملاؤنا الموثوقون؟' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'textarea', value: { en: 'Real stories from verified property owners, sellers, and buyers across our platform', ar: 'قصص نجاح وتجارب حقيقية من أصحاب العقارات، البائعين والمشترين عبر منصة دويلو' } },
        ],
        images: [],
    },
]

export const testimonialReviews: TestimonialReview[] = [
    {
        id: 1,
        nameEn: 'Ahmed Hassan',
        nameAr: 'أحمد حسن',
        role: 'seller',
        rating: 5,
        textEn: 'Listing my villa on Dwello was effortless. I connected with serious buyers within days and closed the deal above my asking price.',
        textAr: 'إدراج فلتي على دويلو كان سهلاً للغاية. تواصلت مع مشترين جادين خلال أيام وأتممت الصفقة بسعر يفوق توقعاتي.',
        propertyEn: 'Modern Villa in New Cairo',
        propertyAr: 'فيلا عصرية في القاهرة الجديدة',
        dateEn: '2 weeks ago',
        dateAr: 'منذ أسبوعين',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 2,
        nameEn: 'Sarah Johnson',
        nameAr: 'سارة جونسون',
        role: 'buyer',
        rating: 5,
        textEn: 'Found my dream apartment in a week. Transparent pricing and verified listings made the whole process completely stress-free.',
        textAr: 'وجدت شقة أحلامي خلال أسبوع. الأسعار الشفافة والإعلانات الموثقة جعلت العملية برمتها خالية من التوتر.',
        propertyEn: 'Waterfront Chalet',
        propertyAr: 'شاليه ساحلي',
        dateEn: '1 month ago',
        dateAr: 'منذ شهر',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 3,
        nameEn: 'Mona Reda',
        nameAr: 'منى رضا',
        role: 'seller',
        rating: 5,
        textEn: 'The platform connected me directly with qualified renters. Professional, fast, and the negotiation tools are fantastic.',
        textAr: 'ربطتني المنصة مباشرة بمستأجرين مؤهلين. احترافية وسرعة في التعامل، وأدوات التفاوض رائعة.',
        propertyEn: 'Sky Penthouse in Zamalek',
        propertyAr: 'بنتهاوس في الزمالك',
        dateEn: '1 month ago',
        dateAr: 'منذ شهر',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 4,
        nameEn: 'Omar Farouk',
        nameAr: 'عمر فاروق',
        role: 'buyer',
        rating: 5,
        textEn: 'Great experience from search to closing. The verified owner profiles gave me complete confidence in every transaction.',
        textAr: 'تجربة رائعة من البحث حتى إتمام الصفقة. ملفات الملاك الموثقة منحتني ثقة كاملة في كل معاملة.',
        propertyEn: 'Designer Loft in Sheikh Zayed',
        propertyAr: 'لوفت في الشيخ زايد',
        dateEn: '2 months ago',
        dateAr: 'منذ شهرين',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
]
