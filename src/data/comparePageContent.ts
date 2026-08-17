// Mock editable content for the public Compare Properties page.
// Only static page content is editable here — the comparison table itself is
// dynamic product data and will be served by the backend later.

import type { EditableSection } from './contentTypes'

export const comparePageSections: EditableSection[] = [
    {
        key: 'hero',
        label: { en: 'Hero Section', ar: 'قسم البطل' },
        hint: { en: 'Badge, title and subtitle at the top of the page', ar: 'الشارة والعنوان والنص الفرعي في أعلى الصفحة' },
        fields: [
            { key: 'badge', label: { en: 'Badge Text', ar: 'نص الشارة' }, type: 'text', value: { en: 'Smart Property Comparison', ar: 'مقارنة العقارات والمواصفات' } },
            { key: 'title', label: { en: 'Hero Title', ar: 'العنوان الرئيسي' }, type: 'text', value: { en: 'Property Comparison Matrix', ar: 'مقارنة المواصفات والعقارات' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'textarea', value: { en: 'Compare features, specifications, and prices side-by-side to choose the perfect property', ar: 'قارن بين تفاصيل ومميزات وأسعار عقارين جنباً إلى جنب لاختيار الخيار الأفضل لك' } },
        ],
        images: [],
    },
    {
        key: 'stats',
        label: { en: 'Stats Labels', ar: 'تسميات الإحصائيات' },
        hint: { en: 'Labels under the hero counters (values are dynamic)', ar: 'التسميات أسفل العدادات في البطل (القيم ديناميكية)' },
        fields: [
            { key: 'properties', label: { en: 'Properties Label', ar: 'تسمية العقارات' }, type: 'text', value: { en: 'Properties', ar: 'عقار متاح' } },
            { key: 'features', label: { en: 'Features Compared Label', ar: 'تسمية المميزات المقارنة' }, type: 'text', value: { en: 'Features Compared', ar: 'مميزة مقارنة' } },
            { key: 'combinations', label: { en: 'Combinations Label', ar: 'تسمية التركيبات' }, type: 'text', value: { en: 'Combinations', ar: 'تركيبة ممكنة' } },
        ],
        images: [],
    },
    {
        key: 'selector',
        label: { en: 'Selector Panel', ar: 'لوحة الاختيار' },
        hint: { en: 'Labels around the property A / B selectors', ar: 'التسميات حول قائمتي اختيار العقار أ / ب' },
        fields: [
            { key: 'propertyA', label: { en: 'Slot A Label', ar: 'تسمية الحقل أ' }, type: 'text', value: { en: 'Property (A)', ar: 'العقار (أ)' } },
            { key: 'primary', label: { en: 'Slot A Badge', ar: 'شارة الحقل أ' }, type: 'text', value: { en: 'Primary', ar: 'أساسي' } },
            { key: 'propertyB', label: { en: 'Slot B Label', ar: 'تسمية الحقل ب' }, type: 'text', value: { en: 'Property (B)', ar: 'العقار (ب)' } },
            { key: 'compare', label: { en: 'Slot B Badge', ar: 'شارة الحقل ب' }, type: 'text', value: { en: 'Compare', ar: 'للمقارنة' } },
        ],
        images: [],
    },
    {
        key: 'cta',
        label: { en: 'Bottom CTA', ar: 'الدعوة السفلية' },
        hint: { en: 'Call-to-action banner below the comparison table', ar: 'شريط الدعوة أسفل جدول المقارنة' },
        fields: [
            { key: 'title', label: { en: 'CTA Title', ar: 'عنوان الشريط' }, type: 'text', value: { en: 'Ready to decide?', ar: 'جاهز للاختيار؟' } },
            { key: 'description', label: { en: 'CTA Description', ar: 'وصف الشريط' }, type: 'textarea', value: { en: 'Contact the owner directly or browse more', ar: 'تواصل مع المالك مباشرة أو استعرض المزيد' } },
            { key: 'browseAll', label: { en: 'Browse All Button', ar: 'زر تصفح الكل' }, type: 'text', value: { en: 'Browse All', ar: 'تصفح الكل' } },
            { key: 'viewDetails', label: { en: 'View Details Button', ar: 'زر عرض التفاصيل' }, type: 'text', value: { en: 'View A Details', ar: 'عرض العقار A' } },
        ],
        images: [],
    },
]
