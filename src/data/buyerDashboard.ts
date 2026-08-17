export interface BuyerInfo {
    nameEn: string
    nameAr: string
    email: string
    phone: string
    avatar: string
    memberSince: string
}

export const buyerInfo: BuyerInfo = {
    nameEn: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    email: 'sarah.buyer@dwello.com',
    phone: '+20 111 987 6543',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    memberSince: '2023',
}

export interface BuyerMessage {
    id: string
    ownerEn: string
    ownerAr: string
    propertyEn: string
    propertyAr: string
    lastMessageEn: string
    lastMessageAr: string
    time: string
    unread: number
    avatar: string
    online: boolean
}

export const buyerMessages: BuyerMessage[] = [
    {
        id: '1',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        lastMessageEn: 'The villa is still available. Would you like to schedule a viewing?',
        lastMessageAr: 'الفيلا ما زالت متاحة. هل ترغب في حجز موعد معاينة؟',
        time: '5m',
        unread: 2,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
        online: true,
    },
    {
        id: '2',
        ownerEn: 'Layla Hassan',
        ownerAr: 'ليلى حسن',
        propertyEn: 'Waterfront Modern Chalet',
        propertyAr: 'شاليه ساحلي مودرن',
        lastMessageEn: 'Great! The payment was received successfully.',
        lastMessageAr: 'رائع! تم استلام الدفعة بنجاح.',
        time: '1h',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        online: false,
    },
    {
        id: '3',
        ownerEn: 'Omar Farouk',
        ownerAr: 'عمر فاروق',
        propertyEn: 'Urban Designer Loft',
        propertyAr: 'لوفت بتصميم معماري فريد',
        lastMessageEn: 'Can we negotiate the monthly price?',
        lastMessageAr: 'هل يمكننا التفاوض على السعر الشهري؟',
        time: '3h',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        online: true,
    },
    {
        id: '4',
        ownerEn: 'Mona Reda',
        ownerAr: 'منى رضا',
        propertyEn: 'Sky Penthouse',
        propertyAr: 'بنتهاوس سماوي',
        lastMessageEn: 'I sent you the required documents, please check.',
        lastMessageAr: 'أرسلت لك المستندات المطلوبة، يرجى مراجعتها.',
        time: '1d',
        unread: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        online: false,
    },
]

export type ChatRequestStatus = 'pending' | 'accepted' | 'rejected'

export interface ChatRequest {
    id: string
    ownerEn: string
    ownerAr: string
    propertyEn: string
    propertyAr: string
    messageEn: string
    messageAr: string
    time: string
    avatar: string
    status: ChatRequestStatus
}

export const chatRequests: ChatRequest[] = [
    {
        id: '1',
        ownerEn: 'Ahmed Mohamed',
        ownerAr: 'أحمد محمد',
        propertyEn: 'Luxury Modern Villa',
        propertyAr: 'فيلا عصرية فاخرة',
        messageEn: 'I am interested in discussing the rental terms for your villa.',
        messageAr: 'أنا مهتم بمناقشة شروط الإيجار لفلتك.',
        time: '2h',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
        status: 'pending',
    },
    {
        id: '2',
        ownerEn: 'Omar Farouk',
        ownerAr: 'عمر فاروق',
        propertyEn: 'Urban Designer Loft',
        propertyAr: 'لوفت بتصميم معماري فريد',
        messageEn: 'Could we set up a time for a property viewing?',
        messageAr: 'هل يمكننا تحديد موعد لمعاينة العقار؟',
        time: '5h',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        status: 'accepted',
    },
    {
        id: '3',
        ownerEn: 'Mona Reda',
        ownerAr: 'منى رضا',
        propertyEn: 'Sky Penthouse',
        propertyAr: 'بنتهاوس سماوي',
        messageEn: 'Request to start a conversation about your penthouse listing.',
        messageAr: 'طلب بدء محادثة بخصوص إعلان البنتهاوس الخاص بك.',
        time: '1d',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        status: 'rejected',
    },
    {
        id: '4',
        ownerEn: 'Layla Hassan',
        ownerAr: 'ليلى حسن',
        propertyEn: 'Waterfront Modern Chalet',
        propertyAr: 'شاليه ساحلي مودرن',
        messageEn: 'Is the chalet available for a long-term lease?',
        messageAr: 'هل الشاليه متاح لإيجار طويل الأمد؟',
        time: '2d',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        status: 'accepted',
    },
]

export interface BuyerBankCard {
    id: string
    bank: string
    accountNumber: string
    holderEn: string
    holderAr: string
    expired: boolean
    isDefault: boolean
}

export const buyerBankCards: BuyerBankCard[] = [
    {
        id: '1',
        bank: 'National Bank of Egypt',
        accountNumber: '•••• •••• 4521',
        holderEn: 'Sarah Johnson',
        holderAr: 'سارة جونسون',
        expired: false,
        isDefault: true,
    },
    {
        id: '2',
        bank: 'Commercial International Bank',
        accountNumber: '•••• •••• 8890',
        holderEn: 'Sarah Johnson',
        holderAr: 'سارة جونسون',
        expired: false,
        isDefault: false,
    },
]

export interface BuyerPayment {
    id: string
    propertyEn: string
    propertyAr: string
    amount: number
    status: 'completed' | 'pending' | 'failed' | 'refunded'
    date: string
    methodEn: string
    methodAr: string
}

export const buyerPayments: BuyerPayment[] = [
    { id: 'PY-8821', propertyEn: 'Waterfront Modern Chalet', propertyAr: 'شاليه ساحلي مودرن', amount: 4800, status: 'completed', date: '2026-08-14', methodEn: 'Visa •••• 4521', methodAr: 'فيزا •••• 4521' },
    { id: 'PY-8806', propertyEn: 'Luxury Modern Villa', propertyAr: 'فيلا عصرية فاخرة', amount: 3500, status: 'pending', date: '2026-08-12', methodEn: 'Bank Transfer', methodAr: 'تحويل بنكي' },
    { id: 'PY-8790', propertyEn: 'Urban Designer Loft', propertyAr: 'لوفت بتصميم معماري فريد', amount: 2100, status: 'completed', date: '2026-08-09', methodEn: 'Mastercard •••• 8823', methodAr: 'ماستركارد •••• 8823' },
    { id: 'PY-8775', propertyEn: 'Cozy Modern Studio', propertyAr: 'استوديو عصري أنيق', amount: 1200, status: 'failed', date: '2026-08-05', methodEn: 'Visa •••• 1209', methodAr: 'فيزا •••• 1209' },
    { id: 'PY-8761', propertyEn: 'Sky Penthouse', propertyAr: 'بنتهاوس سماوي', amount: 5500, status: 'refunded', date: '2026-07-28', methodEn: 'Bank Transfer', methodAr: 'تحويل بنكي' },
]

export const buyerAnalytics = {
    savedProperties: 8,
    messages: 12,
    pendingRequests: 2,
    totalSpent: 15800,
    bookings: 6,
}

// Product ids the buyer has saved to their Favorites page.
export const buyerFavorites: string[] = ['1', '3', '5', '7']