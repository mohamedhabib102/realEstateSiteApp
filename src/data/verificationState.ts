import { reactive } from 'vue'

export type VerificationStatus = 'not-verified' | 'pending' | 'approved' | 'rejected'

interface RoleVerification {
    status: VerificationStatus
    submittedAt: string
    fullNameAr: string
    fullNameEn: string
    nationalIdFront: string
    nationalIdBack: string
}

export const verificationState = reactive<{ owner: RoleVerification; buyer: RoleVerification }>({
    owner: {
        status: 'not-verified',
        submittedAt: '',
        fullNameAr: '',
        fullNameEn: '',
        nationalIdFront: '',
        nationalIdBack: '',
    },
    buyer: {
        status: 'not-verified',
        submittedAt: '',
        fullNameAr: '',
        fullNameEn: '',
        nationalIdFront: '',
        nationalIdBack: '',
    },
})

export function submitVerification(role: 'owner' | 'buyer', data: {
    fullNameAr: string
    fullNameEn: string
    nationalIdFront: string
    nationalIdBack: string
}) {
    verificationState[role].status = 'pending'
    verificationState[role].submittedAt = new Date().toISOString().slice(0, 10)
    verificationState[role].fullNameAr = data.fullNameAr
    verificationState[role].fullNameEn = data.fullNameEn
    verificationState[role].nationalIdFront = data.nationalIdFront
    verificationState[role].nationalIdBack = data.nationalIdBack
}