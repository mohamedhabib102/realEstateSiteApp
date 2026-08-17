// Shared mock categories used by the Super Admin Categories page.
// These will later populate the Category Select field inside the Property
// creation forms used by both Super Admin and Owner.

export interface Category {
    id: string
    nameEn: string
    nameAr: string
    status: 'active' | 'inactive'
    properties: number
    createdAt: string
}

export const categories: Category[] = [
    { id: 'c1', nameEn: 'Apartment', nameAr: 'شقة', status: 'active', properties: 48, createdAt: '2024-01-10' },
    { id: 'c2', nameEn: 'Villa', nameAr: 'فيلا', status: 'active', properties: 36, createdAt: '2024-01-10' },
    { id: 'c3', nameEn: 'Studio', nameAr: 'استوديو', status: 'active', properties: 22, createdAt: '2024-02-03' },
    { id: 'c4', nameEn: 'Chalet', nameAr: 'شاليه', status: 'active', properties: 15, createdAt: '2024-02-18' },
    { id: 'c5', nameEn: 'Loft', nameAr: 'لوفت', status: 'active', properties: 11, createdAt: '2024-03-05' },
    { id: 'c6', nameEn: 'Penthouse', nameAr: 'بنتهاوس', status: 'active', properties: 9, createdAt: '2024-03-22' },
    { id: 'c7', nameEn: 'Estate', nameAr: 'قصر', status: 'inactive', properties: 4, createdAt: '2024-04-01' },
    { id: 'c8', nameEn: 'Commercial Office', nameAr: 'مكتب تجاري', status: 'inactive', properties: 7, createdAt: '2024-04-15' },
]