// Mock editable content for the public Blog page.
// Only static page content is editable here — blog posts themselves are managed
// in the Blog tab and will be served by the backend later.

import heroBg from '../assets/images/Rectangle 110.png'
import type { EditableSection } from './contentTypes'

export const blogPageSections: EditableSection[] = [
    {
        key: 'hero',
        label: { en: 'Hero Section', ar: 'قسم البطل' },
        hint: { en: 'Full-width banner with title and subtitle', ar: 'شريط بعرض الصفحة مع العنوان والنص الفرعي' },
        fields: [
            { key: 'title', label: { en: 'Hero Title', ar: 'العنوان الرئيسي' }, type: 'text', value: { en: 'Our Blog', ar: 'المدونة' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'text', value: { en: 'Latest articles and news from the real estate world', ar: 'أحدث المقالات والأخبار من عالم العقارات' } },
        ],
        images: [
            { key: 'background', label: { en: 'Background Image', ar: 'صورة الخلفية' }, value: heroBg },
        ],
    },
    {
        key: 'cards',
        label: { en: 'Post Cards', ar: 'بطاقات المقالات' },
        hint: { en: 'Labels used on the article cards', ar: 'التسميات المستخدمة على بطاقات المقالات' },
        fields: [
            { key: 'readMore', label: { en: 'Read More Label', ar: 'تسمية اقرأ المزيد' }, type: 'text', value: { en: 'Read More', ar: 'اقرأ المزيد' } },
        ],
        images: [],
    },
]