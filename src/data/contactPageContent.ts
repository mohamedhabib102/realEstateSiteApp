// Mock editable content for the Contact page.
// The management interface edits this content and separately lists incoming messages.

import contactHero from '../assets/images/about.png'
import type { EditableSection } from './contentTypes'

export const contactPageSections: EditableSection[] = [
    {
        key: 'hero',
        label: { en: 'Hero Section', ar: 'قسم البطل' },
        hint: { en: 'Banner at the top of the contact page', ar: 'الشريط أعلى صفحة التواصل' },
        fields: [
            { key: 'badge', label: { en: 'Badge Text', ar: 'نص الشارة' }, type: 'text', value: { en: 'Get In Touch', ar: 'تواصل معنا' } },
            { key: 'title', label: { en: 'Hero Title', ar: 'العنوان الرئيسي' }, type: 'textarea', value: { en: 'We Are Here To Help\nYou Build Your Dream', ar: 'نحن هنا لمساعدتك\nفي بناء حلمك' } },
        ],
        images: [
            { key: 'background', label: { en: 'Background Image', ar: 'صورة الخلفية' }, value: contactHero },
        ],
    },
    {
        key: 'info',
        label: { en: 'Contact Information', ar: 'معلومات التواصل' },
        hint: { en: 'Intro paragraph, location, phone and email details', ar: 'المقدمة والموقع وأرقام الهاتف والبريد' },
        fields: [
            { key: 'intro', label: { en: 'Intro Paragraph', ar: 'فقرة المقدمة' }, type: 'textarea', value: { en: 'Have questions or inquiries? Our team is always ready to answer and provide the consultation you need.', ar: 'لديك أسئلة أو استفسارات؟ فريقنا جاهز دائمًا للرد وتقديم الاستشارة التي تحتاجها.' } },
            { key: 'locationTitle', label: { en: 'Location Title', ar: 'عنوان الموقع' }, type: 'text', value: { en: 'Our Location', ar: 'مقرنا' } },
            { key: 'locationAddress', label: { en: 'Location Address', ar: 'العنوان' }, type: 'textarea', value: { en: '123 Nile Street, Zamalek\nCairo, Egypt', ar: '123 شارع النيل، الزمالك\nالقاهرة، مصر' } },
            { key: 'phoneTitle', label: { en: 'Phone Title', ar: 'عنوان الهاتف' }, type: 'text', value: { en: 'Phone Number', ar: 'رقم الهاتف' } },
            { key: 'phoneValue1', label: { en: 'Phone 1', ar: 'الهاتف 1' }, type: 'text', value: { en: '+20 123 456 7890', ar: '+20 123 456 7890' } },
            { key: 'phoneValue2', label: { en: 'Phone 2', ar: 'الهاتف 2' }, type: 'text', value: { en: '+20 098 765 4321', ar: '+20 098 765 4321' } },
            { key: 'emailTitle', label: { en: 'Email Title', ar: 'عنوان البريد' }, type: 'text', value: { en: 'Email Address', ar: 'البريد الإلكتروني' } },
            { key: 'emailValue1', label: { en: 'Email 1', ar: 'البريد 1' }, type: 'text', value: { en: 'info@dwello.com', ar: 'info@dwello.com' } },
            { key: 'emailValue2', label: { en: 'Email 2', ar: 'البريد 2' }, type: 'text', value: { en: 'support@dwello.com', ar: 'support@dwello.com' } },
        ],
        images: [],
    },
    {
        key: 'form',
        label: { en: 'Message Form', ar: 'نموذج الرسالة' },
        hint: { en: 'Labels of the contact form that visitors submit', ar: 'تسميات نموذج التواصل الذي يرسله الزوار' },
        fields: [
            { key: 'formTitle', label: { en: 'Form Title', ar: 'عنوان النموذج' }, type: 'text', value: { en: 'Send Us A Message', ar: 'أرسل لنا رسالة' } },
            { key: 'firstNameLabel', label: { en: 'First Name Label', ar: 'تسمية الاسم الأول' }, type: 'text', value: { en: 'First Name', ar: 'الاسم الأول' } },
            { key: 'lastNameLabel', label: { en: 'Last Name Label', ar: 'تسمية اسم العائلة' }, type: 'text', value: { en: 'Last Name', ar: 'اسم العائلة' } },
            { key: 'emailLabel', label: { en: 'Email Label', ar: 'تسمية البريد' }, type: 'text', value: { en: 'Email Address', ar: 'البريد الإلكتروني' } },
            { key: 'messageLabel', label: { en: 'Message Label', ar: 'تسمية الرسالة' }, type: 'text', value: { en: 'Your Message', ar: 'رسالتك' } },
            { key: 'sendLabel', label: { en: 'Send Button', ar: 'زر الإرسال' }, type: 'text', value: { en: 'Send Message', ar: 'إرسال الرسالة' } },
        ],
        images: [],
    },
]
