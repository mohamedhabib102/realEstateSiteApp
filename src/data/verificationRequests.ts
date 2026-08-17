// Mock verification requests for the Super Admin verification management page.
// Frontend-only; the backend will serve real submitted requests later.

import idFrontA from '../assets/images/img1.jpg'
import idFrontB from '../assets/images/img2.jpg'
import idBackA from '../assets/images/img3.jpg'
import idBackB from '../assets/images/img4.jpg'

export type VerificationStatus = 'pending' | 'approved' | 'rejected'

export interface VerificationRequest {
    id: string
    userNameEn: string
    userNameAr: string
    avatar: string
    role: 'owner' | 'buyer'
    status: VerificationStatus
    submittedAt: string
    nationalIdFront: string
    nationalIdBack: string
}

export const verificationRequests: VerificationRequest[] = [
    {
        id: 'VR-1024',
        userNameEn: 'Ahmed Mohamed',
        userNameAr: 'أحمد محمد',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
        role: 'owner',
        status: 'pending',
        submittedAt: '2026-08-16',
        nationalIdFront: idFrontA,
        nationalIdBack: idBackA,
    },
    {
        id: 'VR-1023',
        userNameEn: 'Sarah Johnson',
        userNameAr: 'سارة جونسون',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        role: 'buyer',
        status: 'pending',
        submittedAt: '2026-08-15',
        nationalIdFront: idFrontB,
        nationalIdBack: idBackB,
    },
    {
        id: 'VR-1021',
        userNameEn: 'Mona Reda',
        userNameAr: 'منى رضا',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
        role: 'owner',
        status: 'approved',
        submittedAt: '2026-08-12',
        nationalIdFront: idFrontA,
        nationalIdBack: idBackA,
    },
    {
        id: 'VR-1018',
        userNameEn: 'Omar Farouk',
        userNameAr: 'عمر فاروق',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        role: 'buyer',
        status: 'rejected',
        submittedAt: '2026-08-09',
        nationalIdFront: idFrontB,
        nationalIdBack: idBackB,
    },
]