import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.png'
import product4 from '../assets/images/product4.png'

export interface Product {
    id: string;
    titleEn: string;
    titleAr: string;
    locationEn: string;
    locationAr: string;
    price: number;
    priceTypeEn: string;
    priceTypeAr: string;
    rating: number;
    image: string;
    descriptionEn: string;
    descriptionAr: string;
    featuresEn: string[];
    featuresAr: string[];
    bedrooms: number;
    bathrooms: number;
    area: number;
}

export const products: Product[] = [
    {
        id: '1',
        titleEn: 'Luxury Apartment in Zamalek',
        titleAr: 'شقة فاخرة في الزمالك',
        locationEn: 'Cairo',
        locationAr: 'القاهرة',
        price: 35000,
        priceTypeEn: 'For Rent',
        priceTypeAr: 'للإيجار',
        rating: 4.8,
        image: product1,
        descriptionEn: 'Experience luxury living in the heart of Zamalek with stunning Nile views and modern amenities.',
        descriptionAr: 'استمتع بالعيش الفاخر في قلب الزمالك مع إطلالات خلابة على النيل ووسائل الراحة الحديثة.',
        featuresEn: ['Gym', 'Pool', '24/7 Security', 'Smart Home'],
        featuresAr: ['صالة رياضية', 'مسبح', 'أمن 24/7', 'منزل ذكي'],
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
    },
    {
        id: '2',
        titleEn: 'Cozy Studio in Maadi',
        titleAr: 'استوديو دافئ في المعادي',
        locationEn: 'Cairo',
        locationAr: 'القاهرة',
        price: 12000,
        priceTypeEn: 'For Rent',
        priceTypeAr: 'للإيجار',
        rating: 4.5,
        image: product2,
        descriptionEn: 'A beautiful and cozy studio perfect for young professionals located in the vibrant Degla Maadi area.',
        descriptionAr: 'استوديو جميل ودافئ مثالي للمهنيين الشباب يقع في منطقة دجلة المعادي النابضة بالحياة.',
        featuresEn: ['Furnished', 'Near Metro', 'Pet Friendly'],
        featuresAr: ['مفروش', 'قريب من المترو', 'يسمح بالحيوانات الأليفة'],
        bedrooms: 1,
        bathrooms: 1,
        area: 60,
    },
    {
        id: '3',
        titleEn: 'Spacious Family Villa in New Cairo',
        titleAr: 'فيلا عائلية واسعة في التجمع الخامس',
        locationEn: 'New Cairo',
        locationAr: 'القاهرة الجديدة',
        price: 15000000,
        priceTypeEn: 'For Sale',
        priceTypeAr: 'للبيع',
        rating: 4.9,
        image: product3,
        descriptionEn: 'A magnificent villa offering plenty of space for the whole family, featuring a large garden and private pool.',
        descriptionAr: 'فيلا رائعة توفر مساحة واسعة لجميع أفراد الأسرة، وتتميز بحديقة كبيرة ومسبح خاص.',
        featuresEn: ['Private Pool', 'Large Garden', 'Garage', 'Balcony'],
        featuresAr: ['مسبح خاص', 'حديقة كبيرة', 'كراج', 'شرفة'],
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
    },
    {
        id: '4',
        titleEn: 'Modern Chalet in North Coast',
        titleAr: 'شاليه حديث في الساحل الشمالي',
        locationEn: 'North Coast',
        locationAr: 'الساحل الشمالي',
        price: 8500000,
        priceTypeEn: 'For Sale',
        priceTypeAr: 'للبيع',
        rating: 4.7,
        image: product4,
        descriptionEn: 'Wake up to the sound of waves in this modern chalet located right on the Mediterranean beach.',
        descriptionAr: 'استيقظ على صوت الأمواج في هذا الشاليه الحديث الواقع على شاطئ البحر الأبيض المتوسط مباشرة.',
        featuresEn: ['Beach Access', 'Sea View', 'Renovated'],
        featuresAr: ['دخول للشاطئ', 'إطلالة على البحر', 'مجدد'],
        bedrooms: 3,
        bathrooms: 3,
        area: 200,
    },
    {
        id: '5',
        titleEn: 'Urban Loft in Sheikh Zayed',
        titleAr: 'شقة لوفت في الشيخ زايد',
        locationEn: 'Giza',
        locationAr: 'الجيزة',
        price: 28000,
        priceTypeEn: 'For Rent',
        priceTypeAr: 'للإيجار',
        rating: 4.6,
        image: product1,
        descriptionEn: 'Stylish apartment with high ceilings, luxurious finishes, and a great location near Arkan Plaza.',
        descriptionAr: 'شقة أنيقة بأسقف عالية وتشطيبات فاخرة، وموقع رائع بالقرب من أركان بلازا.',
        featuresEn: ['High Ceilings', 'Premium Finishes', 'Central AC'],
        featuresAr: ['أسقف عالية', 'تشطيبات فاخرة', 'تكييف مركزي'],
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
    },
    {
        id: '6',
        titleEn: 'Classic Apartment in Alexandria',
        titleAr: 'شقة كلاسيكية في الإسكندرية',
        locationEn: 'Alexandria',
        locationAr: 'الإسكندرية',
        price: 5200000,
        priceTypeEn: 'For Sale',
        priceTypeAr: 'للبيع',
        rating: 4.4,
        image: product2,
        descriptionEn: 'Historic and elegant apartment located on the corniche with unmatched Mediterranean sea views.',
        descriptionAr: 'شقة تاريخية وأنيقة تقع على الكورنيش بإطلالات لا مثيل لها على البحر الأبيض المتوسط.',
        featuresEn: ['Sea View', 'Historic Building', 'High Ceilings'],
        featuresAr: ['إطلالة على البحر', 'مبنى تاريخي', 'أسقف عالية'],
        bedrooms: 4,
        bathrooms: 2,
        area: 220,
    },
    {
        id: '7',
        titleEn: 'Penthouse in Downtown Cairo',
        titleAr: 'بنتهاوس في وسط البلد',
        locationEn: 'Cairo',
        locationAr: 'القاهرة',
        price: 150000,
        priceTypeEn: 'For Rent',
        priceTypeAr: 'للإيجار',
        rating: 5.0,
        image: product3,
        descriptionEn: 'The ultimate luxury penthouse offering breathtaking 360-degree views of the Nile and Cairo Tower.',
        descriptionAr: 'أقصى درجات الفخامة في بنتهاوس يقدم إطلالات 360 درجة خلابة على النيل وبرج القاهرة.',
        featuresEn: ['Terrace', 'Private Elevator', 'Nile View'],
        featuresAr: ['تراس', 'مصعد خاص', 'إطلالة على النيل'],
        bedrooms: 4,
        bathrooms: 5,
        area: 600,
    },
    {
        id: '8',
        titleEn: 'Luxury Estate in King Mariout',
        titleAr: 'قصر فاخر في كينج مريوط',
        locationEn: 'Alexandria',
        locationAr: 'الإسكندرية',
        price: 45000000,
        priceTypeEn: 'For Sale',
        priceTypeAr: 'للبيع',
        rating: 4.9,
        image: product4,
        descriptionEn: 'A stunning modern estate featuring timeless architecture, a huge private pool, and immense gardens.',
        descriptionAr: 'قصر حديث مذهل يتميز بهندسة معمارية خالدة ومسبح خاص ضخم وحدائق شاسعة.',
        featuresEn: ['Private Pool', 'Gated', 'Guest House', 'Tennis Court'],
        featuresAr: ['مسبح خاص', 'مسور', 'بيت ضيافة', 'ملعب تنس'],
        bedrooms: 6,
        bathrooms: 7,
        area: 1200,
    }
];
