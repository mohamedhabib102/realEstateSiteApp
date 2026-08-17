// Mock platform users for the Super Admin Users management page.
// The Laravel + Inertia backend will later replace this with auth-driven API data.

export type PlatformUserRole = 'owner' | 'buyer' | 'super-admin'
export type PlatformUserStatus = 'active' | 'inactive' | 'suspended'

export const userRoleLabels: Record<PlatformUserRole, { en: string; ar: string }> = {
    owner: { en: 'Owner', ar: 'مالك' },
    buyer: { en: 'Buyer', ar: 'مشتري' },
    'super-admin': { en: 'Super Admin', ar: 'مشرف عام' },
}

export const userStatusLabels: Record<PlatformUserStatus, { en: string; ar: string }> = {
    active: { en: 'Active', ar: 'نشط' },
    inactive: { en: 'Inactive', ar: 'غير نشط' },
    suspended: { en: 'Suspended', ar: 'موقوف' },
}

export interface PlatformUser {
    id: string
    nameEn: string
    nameAr: string
    email: string
    phone: string
    role: PlatformUserRole
    status: PlatformUserStatus
    joinedAt: string
    avatar: string
    /** Number of listed properties (owners) or completed purchases (buyers) */
    activityCount: number
}

export const platformUsers: PlatformUser[] = [
    {
        id: 'U-001',
        nameEn: 'Ahmed Mohamed',
        nameAr: 'أحمد محمد',
        email: 'ahmed.owner@dwello.com',
        phone: '+20 100 123 4567',
        role: 'owner',
        status: 'active',
        joinedAt: '2023-02-11',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
        activityCount: 6,
    },
    {
        id: 'U-002',
        nameEn: 'Layla Hassan',
        nameAr: 'ليلى حسن',
        email: 'layla.hassan@dwello.com',
        phone: '+20 101 555 2233',
        role: 'owner',
        status: 'active',
        joinedAt: '2023-05-02',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        activityCount: 4,
    },
    {
        id: 'U-003',
        nameEn: 'Omar Farouk',
        nameAr: 'عمر فاروق',
        email: 'omar.farouk@dwello.com',
        phone: '+20 102 888 9900',
        role: 'owner',
        status: 'suspended',
        joinedAt: '2022-11-20',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        activityCount: 2,
    },
    {
        id: 'U-004',
        nameEn: 'Mona Reda',
        nameAr: 'منى رضا',
        email: 'mona.reda@dwello.com',
        phone: '+20 103 111 4477',
        role: 'owner',
        status: 'active',
        joinedAt: '2023-08-14',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
        activityCount: 3,
    },
    {
        id: 'U-005',
        nameEn: 'Sarah Johnson',
        nameAr: 'سارة جونسون',
        email: 'sarah.buyer@dwello.com',
        phone: '+20 111 987 6543',
        role: 'buyer',
        status: 'active',
        joinedAt: '2023-01-15',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        activityCount: 5,
    },
    {
        id: 'U-006',
        nameEn: 'Mohamed Hassan',
        nameAr: 'محمد حسن',
        email: 'mohamed.hassan@dwello.com',
        phone: '+20 112 333 7788',
        role: 'buyer',
        status: 'active',
        joinedAt: '2023-03-30',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        activityCount: 3,
    },
    {
        id: 'U-007',
        nameEn: 'Layla Ibrahim',
        nameAr: 'ليلى إبراهيم',
        email: 'layla.ibrahim@dwello.com',
        phone: '+20 113 222 1155',
        role: 'buyer',
        status: 'active',
        joinedAt: '2023-06-25',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        activityCount: 2,
    },
    {
        id: 'U-008',
        nameEn: 'Karim Farid',
        nameAr: 'كريم فريد',
        email: 'karim.farid@dwello.com',
        phone: '+20 114 666 3322',
        role: 'buyer',
        status: 'inactive',
        joinedAt: '2022-12-01',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
        activityCount: 0,
    },
    {
        id: 'U-009',
        nameEn: 'Omar Khaled',
        nameAr: 'عمر خالد',
        email: 'admin@dwello.com',
        phone: '+20 100 000 0001',
        role: 'super-admin',
        status: 'active',
        joinedAt: '2022-06-10',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        activityCount: 0,
    },
    {
        id: 'U-010',
        nameEn: 'Hana Nabil',
        nameAr: 'هنا نبيل',
        email: 'hana.admin@dwello.com',
        phone: '+20 100 000 0002',
        role: 'super-admin',
        status: 'active',
        joinedAt: '2022-09-18',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
        activityCount: 0,
    },
    {
        id: 'U-011',
        nameEn: 'Youssef Adel',
        nameAr: 'يوسف عادل',
        email: 'youssef.adel@dwello.com',
        phone: '+20 115 444 9901',
        role: 'buyer',
        status: 'suspended',
        joinedAt: '2023-10-05',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=100',
        activityCount: 1,
    },
    {
        id: 'U-012',
        nameEn: 'Nour El-Din',
        nameAr: 'نور الدين',
        email: 'nour.eldin@dwello.com',
        phone: '+20 116 777 2210',
        role: 'owner',
        status: 'inactive',
        joinedAt: '2023-04-22',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        activityCount: 1,
    },
]
