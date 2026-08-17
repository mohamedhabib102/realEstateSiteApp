// Mock editable content for the About Us page.
// Matches the public About page structure (hero, story, stats, core values, banner).

import aboutHero from '../assets/images/about.png'
import about1 from '../assets/images/about1.png'
import about2 from '../assets/images/about2.png'
import type { Bilingual, EditableSection } from './contentTypes'

export interface AboutStat {
    id: number
    value: number
    suffix: string
    label: Bilingual
}

export interface AboutValue {
    id: number
    /** Fixed icon key (rendered from a fixed icon set) */
    icon: string
    title: Bilingual
    desc: Bilingual
}

export const aboutPageSections: EditableSection[] = [
    {
        key: 'hero',
        label: { en: 'Hero Section', ar: 'قسم البطل' },
        hint: { en: 'Full-width banner with badge and heading', ar: 'شريط بعرض الصفحة مع شارة وعنوان' },
        fields: [
            { key: 'badge', label: { en: 'Badge Text', ar: 'نص الشارة' }, type: 'text', value: { en: 'How we work', ar: 'كيف نعمل' } },
            { key: 'heroTitle', label: { en: 'Hero Title', ar: 'العنوان الرئيسي' }, type: 'textarea', value: { en: 'Transforming Homes and\nCreating Dream Spaces', ar: 'تحويل المنازل وخلق\nمساحات الأحلام' } },
        ],
        images: [
            { key: 'background', label: { en: 'Background Image', ar: 'صورة الخلفية' }, value: aboutHero },
        ],
    },
    {
        key: 'story',
        label: { en: 'Our Story Section', ar: 'قسم قصتنا' },
        hint: { en: 'Story heading, paragraphs, button and images', ar: 'عنوان القصة والفقرات والزر والصور' },
        fields: [
            { key: 'heading', label: { en: 'Heading', ar: 'العنوان' }, type: 'textarea', value: { en: 'Building Dreams,\nOne Home at a Time', ar: 'نبني الأحلام،\nمنزلاً تلو الآخر' } },
            { key: 'paragraph1', label: { en: 'Paragraph 1', ar: 'الفقرة 1' }, type: 'textarea', value: { en: 'Since our inception, we have been committed to transforming houses into homes. Our journey started with a simple belief: everyone deserves a space that reflects their personality and aspirations.', ar: 'منذ انطلاقتنا، التزمنا بتحويل المنازل إلى أوطان. بدأت رحلتنا بإيمان بسيط: كل شخص يستحق مساحة تعكس شخصيته وطموحاته.' } },
            { key: 'paragraph2', label: { en: 'Paragraph 2', ar: 'الفقرة 2' }, type: 'textarea', value: { en: 'We blend cutting-edge technology with timeless aesthetics, ensuring that every project we undertake stands as a testament to our dedication to excellence and innovation.', ar: 'نحن نمزج بين أحدث التقنيات والجمال الخالد، مما يضمن أن كل مشروع نتولاه يمثل شهادة على تفانينا في التميز والابتكار.' } },
            { key: 'buttonLabel', label: { en: 'Button Label', ar: 'نص الزر' }, type: 'text', value: { en: 'Contact Us', ar: 'تواصل معنا' } },
        ],
        images: [
            { key: 'image1', label: { en: 'Story Image 1', ar: 'صورة القصة 1' }, value: about1 },
            { key: 'image2', label: { en: 'Story Image 2', ar: 'صورة القصة 2' }, value: about2 },
        ],
    },
    {
        key: 'values',
        label: { en: 'Core Values Section', ar: 'قسم القيم الأساسية' },
        hint: { en: 'Heading and intro above the four value cards', ar: 'العنوان والمقدمة أعلى بطاقات القيم الأربع' },
        fields: [
            { key: 'title', label: { en: 'Section Title', ar: 'عنوان القسم' }, type: 'text', value: { en: 'Our Core Values', ar: 'قيمنا الأساسية' } },
            { key: 'subtitle', label: { en: 'Subtitle', ar: 'النص الفرعي' }, type: 'textarea', value: { en: 'The principles that guide everything we do, ensuring we deliver nothing but the best to our clients.', ar: 'المبادئ التي توجه كل ما نقوم به، لضمان تقديم الأفضل فقط لعملائنا.' } },
        ],
        images: [],
    },
    {
        key: 'banner',
        label: { en: 'Bottom Banner', ar: 'الشريط السفلي' },
        hint: { en: 'Call-to-action banner before the footer', ar: 'شريط دعوة لاتخاذ إجراء قبل التذييل' },
        fields: [
            { key: 'title', label: { en: 'Banner Title', ar: 'عنوان الشريط' }, type: 'text', value: { en: 'Ready to Start Your Project?', ar: 'جاهز لبدء مشروعك؟' } },
            { key: 'desc', label: { en: 'Banner Description', ar: 'وصف الشريط' }, type: 'textarea', value: { en: 'Join hundreds of satisfied homeowners and let\'s create something extraordinary together.', ar: 'انضم إلى مئات أصحاب المنازل الراضين ودعنا ننشئ شيئًا استثنائيًا معًا.' } },
            { key: 'buttonLabel', label: { en: 'Button Label', ar: 'نص الزر' }, type: 'text', value: { en: 'Get a Free Consultation', ar: 'احصل على استشارة مجانية' } },
        ],
        images: [],
    },
]

export const aboutStats: AboutStat[] = [
    { id: 1, value: 15, suffix: '+', label: { en: 'Years Experience', ar: 'سنوات خبرة' } },
    { id: 2, value: 350, suffix: '+', label: { en: 'Projects Completed', ar: 'مشاريع مكتملة' } },
    { id: 3, value: 20, suffix: '+', label: { en: 'Awards Won', ar: 'جوائز حصلنا عليها' } },
    { id: 4, value: 100, suffix: '%', label: { en: 'Client Satisfaction', ar: 'رضا العملاء' } },
]

export const aboutCoreValues: AboutValue[] = [
    {
        id: 1,
        icon: 'target',
        title: { en: 'Our Vision', ar: 'رؤيتنا' },
        desc: { en: 'To redefine modern living through innovative architecture and sustainable design, creating homes that inspire.', ar: 'إعادة تعريف الحياة العصرية من خلال الهندسة المعمارية المبتكرة والتصميم المستدام، وخلق منازل تلهم.' },
    },
    {
        id: 2,
        icon: 'shield',
        title: { en: 'Our Mission', ar: 'مهمتنا' },
        desc: { en: 'Delivering exceptional quality, unmatched comfort, and a seamless experience for every homeowner we work with.', ar: 'تقديم جودة استثنائية، وراحة لا مثيل لها، وتجربة سلسة لكل صاحب منزل نعمل معه.' },
    },
    {
        id: 3,
        icon: 'users',
        title: { en: 'Our Team', ar: 'فريقنا' },
        desc: { en: 'A dedicated group of architects, designers, and engineers passionate about turning your dreams into reality.', ar: 'مجموعة متخصصة من المهندسين المعماريين والمصممين والمهندسين الشغوفين بتحويل أحلامك إلى حقيقة.' },
    },
    {
        id: 4,
        icon: 'award',
        title: { en: 'Excellence', ar: 'التميز' },
        desc: { en: 'We never compromise on quality, ensuring every detail meets the highest standards of luxury and durability.', ar: 'نحن لا نتنازل أبداً عن الجودة، ونضمن أن كل تفصيل يلبي أعلى معايير الفخامة والمتانة.' },
    },
]
