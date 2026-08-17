import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.png'
import product4 from '../assets/images/product4.png'

export interface OwnerInfo {
    nameEn: string
    nameAr: string
    role: 'owner'
    email: string
    phone: string
    avatar: string
}

export const ownerInfo: OwnerInfo = {
    nameEn: 'Ahmed Mohamed',
    nameAr: 'أحمد محمد',
    role: 'owner',
    email: 'ahmed.owner@dwello.com',
    phone: '+20 100 123 4567',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
}

export type PropertyStatus = 'active' | 'pending' | 'sold' | 'inactive'

export interface Property {
    id: string
    titleEn: string
    titleAr: string
    locationEn: string
    locationAr: string
    price: number
    image: string
    typeEn: string
    typeAr: string
    bedrooms: number
    bathrooms: number
    area: number
    status: PropertyStatus
    views: number
    listedAt: string
    negotiable: boolean
}

export const properties: Property[] = [
    {
        id: '1',
        titleEn: 'Large 4-room apartment with a beautiful terrace',
        titleAr: 'شقة واسعة 4 غرف مع تراس رائع',
        locationEn: 'Trient, Italy TN',
        locationAr: 'ترينت، إيطاليا TN',
        price: 2400,
        image: product1,
        typeEn: 'Apartment',
        typeAr: 'شقة',
        bedrooms: 4,
        bathrooms: 2,
        area: 160,
        status: 'active',
        views: 1284,
        listedAt: '2024-03-10',
        negotiable: true,
    },
    {
        id: '2',
        titleEn: 'Luxury Modern Villa with Private Garden',
        titleAr: 'فيلا عصرية فاخرة مع حديقة خاصة',
        locationEn: 'New Cairo, Egypt',
        locationAr: 'القاهرة الجديدة، مصر',
        price: 3500,
        image: product3,
        typeEn: 'Villa',
        typeAr: 'فيلا',
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        status: 'active',
        views: 3209,
        listedAt: '2024-04-01',
        negotiable: false,
    },
    {
        id: '3',
        titleEn: 'Cozy Modern Studio near Metro & Downtown',
        titleAr: 'استوديو عصري أنيق بالقرب من المترو',
        locationEn: 'Degla Maadi, Cairo',
        locationAr: 'دجلة المعادي، القاهرة',
        price: 1200,
        image: product2,
        typeEn: 'Studio',
        typeAr: 'استوديو',
        bedrooms: 1,
        bathrooms: 1,
        area: 65,
        status: 'pending',
        views: 540,
        listedAt: '2024-02-15',
        negotiable: true,
    },
    {
        id: '4',
        titleEn: 'Waterfront Modern Chalet with Panoramic Sea View',
        titleAr: 'شاليه ساحلي مودرن مع إطلالة بحرية',
        locationEn: 'North Coast, Egypt',
        locationAr: 'الساحل الشمالي، مصر',
        price: 4800,
        image: product4,
        typeEn: 'Chalet',
        typeAr: 'شاليه',
        bedrooms: 3,
        bathrooms: 2,
        area: 190,
        status: 'sold',
        views: 4110,
        listedAt: '2024-04-12',
        negotiable: false,
    },
    {
        id: '5',
        titleEn: 'Urban Designer Loft with Double-Height Ceilings',
        titleAr: 'لوفت بتصميم معماري فريد وأسقف مرتفعة',
        locationEn: 'Sheikh Zayed, Giza',
        locationAr: 'الشيخ زايد، الجيزة',
        price: 2100,
        image: product1,
        typeEn: 'Loft',
        typeAr: 'لوفت',
        bedrooms: 2,
        bathrooms: 2,
        area: 135,
        status: 'active',
        views: 1890,
        listedAt: '2024-03-28',
        negotiable: true,
    },
    {
        id: '6',
        titleEn: 'Sky Penthouse with 360 Panoramic Views',
        titleAr: 'بنتهاوس سماوي بإطلالة 360 درجة',
        locationEn: 'Zamalek, Cairo',
        locationAr: 'الزمالك، القاهرة',
        price: 5500,
        image: product3,
        typeEn: 'Penthouse',
        typeAr: 'بنتهاوس',
        bedrooms: 4,
        bathrooms: 3,
        area: 320,
        status: 'inactive',
        views: 2754,
        listedAt: '2024-04-08',
        negotiable: true,
    },
]

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded'

export interface PurchaseTransaction {
    id: string
    buyerEn: string
    buyerAr: string
    propertyId: string
    propertyEn: string
    propertyAr: string
    amount: number
    status: TransactionStatus
    date: string
    methodEn: string
    methodAr: string
    avatar: string
}

export const purchaseTransactions: PurchaseTransaction[] = [
    {
        id: 'TX-4821',
        buyerEn: 'Sarah Johnson',
        buyerAr: 'سارة جونسون',
        propertyId: '4',
        propertyEn: 'Waterfront Modern Chalet',
        propertyAr: 'شاليه ساحلي مودرن',
        amount: 4800,
        status: 'completed',
        date: '2026-08-14',
        methodEn: 'Visa •••• 4521',
        methodAr: 'فيزا •••• 4521',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4806',
        buyerEn: 'Mohamed Hassan',
        buyerAr: 'محمد حسن',
        propertyId: '2',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        amount: 3500,
        status: 'pending',
        date: '2026-08-12',
        methodEn: 'Bank Transfer',
        methodAr: 'تحويل بنكي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4790',
        buyerEn: 'Layla Ibrahim',
        buyerAr: 'ليلى إبراهيم',
        propertyId: '1',
        propertyEn: 'Large 4-room apartment',
        propertyAr: 'شقة واسعة 4 غرف',
        amount: 2400,
        status: 'completed',
        date: '2026-08-09',
        methodEn: 'Mastercard •••• 8823',
        methodAr: 'ماستركارد •••• 8823',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4775',
        buyerEn: 'Omar Farouk',
        buyerAr: 'عمر فاروق',
        propertyId: '5',
        propertyEn: 'Urban Designer Loft',
        propertyAr: 'لوفت بتصميم معماري فريد',
        amount: 2100,
        status: 'failed',
        date: '2026-08-05',
        methodEn: 'Visa •••• 1209',
        methodAr: 'فيزا •••• 1209',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4761',
        buyerEn: 'Nour El-Din',
        buyerAr: 'نور الدين',
        propertyId: '3',
        propertyEn: 'Cozy Modern Studio',
        propertyAr: 'استوديو عصري أنيق',
        amount: 1200,
        status: 'refunded',
        date: '2026-07-28',
        methodEn: 'Bank Transfer',
        methodAr: 'تحويل بنكي',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    },
    {
        id: 'TX-4748',
        buyerEn: 'Mona Reda',
        buyerAr: 'منى رضا',
        propertyId: '2',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        amount: 3200,
        status: 'completed',
        date: '2026-07-21',
        methodEn: 'Visa •••• 3390',
        methodAr: 'فيزا •••• 3390',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
]

export interface Conversation {
    id: string
    clientEn: string
    clientAr: string
    lastMessageEn: string
    lastMessageAr: string
    time: string
    unread: number
    avatar: string
    online: boolean
}

export const conversations: Conversation[] = [
    {
        id: '1',
        clientEn: 'Sarah Johnson',
        clientAr: 'سارة جونسون',
        lastMessageEn: 'Is the chalet still available this weekend?',
        lastMessageAr: 'هل الشاليه ما زال متاحاً هذا الأسبوع؟',
        time: '2m',
        unread: 3,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        online: true,
    },
    {
        id: '2',
        clientEn: 'Mohamed Hassan',
        clientAr: 'محمد حسن',
        lastMessageEn: 'Can we negotiate the price of the villa?',
        lastMessageAr: 'هل يمكننا التفاوض على سعر الفيلا؟',
        time: '1h',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        online: false,
    },
    {
        id: '3',
        clientEn: 'Layla Ibrahim',
        clientAr: 'ليلى إبراهيم',
        lastMessageEn: 'Thanks! We completed the payment.',
        lastMessageAr: 'شكراً! لقد أكملنا عملية الدفع.',
        time: '3h',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        online: true,
    },
    {
        id: '4',
        clientEn: 'Omar Farouk',
        clientAr: 'عمر فاروق',
        lastMessageEn: 'Could you send more photos of the loft?',
        lastMessageAr: 'هل يمكنك إرسال المزيد من صور اللوفت؟',
        time: '1d',
        unread: 1,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        online: false,
    },
    {
        id: '5',
        clientEn: 'Nour El-Din',
        clientAr: 'نور الدين',
        lastMessageEn: 'The payment failed, could you check?',
        lastMessageAr: 'فشلت عملية الدفع، هل يمكنك التحقق؟',
        time: '2d',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        online: false,
    },
]

export interface NotificationItem {
    id: string
    titleEn: string
    titleAr: string
    time: string
    unread: boolean
    tone: 'accent' | 'primary' | 'amber'
}

export const notifications: NotificationItem[] = [
    { id: '1', titleEn: 'New purchase request on Luxury Modern Villa', titleAr: 'طلب شراء جديد على الفيلا العصرية الفاخرة', time: '10m', unread: true, tone: 'primary' },
    { id: '2', titleEn: 'Your withdrawal of EGP 12,000 was approved', titleAr: 'تمت الموافقة على سحب مبلغ 12,000 ج.م', time: '2h', unread: true, tone: 'accent' },
    { id: '3', titleEn: 'Sarah Johnson sent you a new message', titleAr: 'أرسلت لك سارة جونسون رسالة جديدة', time: '5h', unread: false, tone: 'amber' },
]

export interface BankCard {
    id: string
    bank: string
    accountNumber: string
    holderEn: string
    holderAr: string
    expired: boolean
    isDefault: boolean
}

export const bankCards: BankCard[] = [
    {
        id: '1',
        bank: 'National Bank of Egypt',
        accountNumber: '•••• •••• 4521',
        holderEn: 'Ahmed Mohamed',
        holderAr: 'أحمد محمد',
        expired: false,
        isDefault: true,
    },
    {
        id: '2',
        bank: 'Commercial International Bank',
        accountNumber: '•••• •••• 8890',
        holderEn: 'Ahmed Mohamed',
        holderAr: 'أحمد محمد',
        expired: true,
        isDefault: false,
    },
]

export interface WithdrawalRequest {
    id: string
    amount: number
    methodEn: string
    methodAr: string
    date: string
    status: 'approved' | 'pending' | 'processing'
}

export const withdrawals: WithdrawalRequest[] = [
    { id: 'WD-301', amount: 12000, methodEn: 'NBE •••• 4521', methodAr: 'البنك الأهلي •••• 4521', date: '2026-08-11', status: 'approved' },
    { id: 'WD-298', amount: 8500, methodEn: 'CIB •••• 8890', methodAr: 'البنك التجاري •••• 8890', date: '2026-08-03', status: 'processing' },
    { id: 'WD-290', amount: 5400, methodEn: 'NBE •••• 4521', methodAr: 'البنك الأهلي •••• 4521', date: '2026-07-25', status: 'pending' },
]

export const analytics = {
    revenue: 82400,
    revenueGrowth: 12.4,
    transactions: 186,
    viewGrowth: 18.2,
    avgBooking: 15,
}

export const activityFeed: { id: string; icon: 'property' | 'payment' | 'message'; titleEn: string; titleAr: string; time: string }[] = [
    { id: '1', icon: 'property', titleEn: 'New property listed: Sky Penthouse', titleAr: 'عقار جديد: بنتهاوس سماوي', time: '1h' },
    { id: '2', icon: 'payment', titleEn: 'Transaction TX-4806 completed', titleAr: 'اكتملت المعاملة TX-4806', time: '4h' },
    { id: '3', icon: 'message', titleEn: 'New message from Mohamed Hassan', titleAr: 'رسالة جديدة من محمد حسن', time: '6h' },
    { id: '4', icon: 'property', titleEn: 'Property #4 booked for viewing', titleAr: 'تم حجز معاينة للعقار رقم 4', time: '1d' },
]