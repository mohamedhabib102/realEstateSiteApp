// Mock editable content for the public Products page.
// Only static page content is editable here — the product grid, filters and
// dropdown options come from product data and will be served by the backend later.

import heroBg from '../assets/images/Rectangle 110.png'
import type { EditableSection } from './contentTypes'

export const productsPageSections: EditableSection[] = [
    {
        key: 'hero',
        label: { en: 'Hero Section', ar: 'قسم البطل' },
        hint: { en: 'Full-width banner with title and subtitle', ar: 'شريط بعرض الصفحة مع العنوان والنص الفرعي' },
        fields: [
            { key: 'title', label: { en: 'Hero Title', ar: 'العنوان الرئيسي' }, type: 'text', value: { en: 'From Concept to Creation', ar: 'من الفكرة إلى الإبداع' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'text', value: { en: 'Your Partner in Remodeling and New Builds', ar: 'شريكك في إعادة التصميم والبناء' } },
        ],
        images: [
            { key: 'background', label: { en: 'Background Image', ar: 'صورة الخلفية' }, value: heroBg },
        ],
    },
    {
        key: 'filters',
        label: { en: 'Filters Bar', ar: 'شريط الفلاتر' },
        hint: { en: 'Labels of the search & filter bar above the product grid', ar: 'تسميات شريط البحث والفلترة أعلى شبكة المنتجات' },
        fields: [
            { key: 'search', label: { en: 'Search Placeholder', ar: 'نص البحث' }, type: 'text', value: { en: 'Search Products', ar: 'ابحث عن المنتجات' } },
            { key: 'allLocations', label: { en: 'Locations Default Option', ar: 'خيار المواقع الافتراضي' }, type: 'text', value: { en: 'All Locations', ar: 'كل المواقع' } },
            { key: 'allPrices', label: { en: 'Prices Default Option', ar: 'خيار الأسعار الافتراضي' }, type: 'text', value: { en: 'All Prices', ar: 'كل الأسعار' } },
            { key: 'location', label: { en: 'Location Label', ar: 'تسمية الموقع' }, type: 'text', value: { en: 'Location', ar: 'الموقع' } },
            { key: 'price', label: { en: 'Price Label', ar: 'تسمية السعر' }, type: 'text', value: { en: 'Price', ar: 'السعر' } },
        ],
        images: [],
    },
]
