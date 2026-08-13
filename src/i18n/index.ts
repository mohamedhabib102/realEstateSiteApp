import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      rooms: 'Our Spaces',
      community: 'Community',
      contact: 'Contact',
      blog: 'Blog',
      newsletter: 'Newsletter',
      email: 'E.mail'
    },
    hero: {
      slides: [
        {
          title1: 'Smart Home Integration',
          title2: 'Enhance Your Home with Technology',
          subtitle: 'Your Partner in Remodeling and\nNew Builds',
        },
        {
          title1: 'Unparalleled Luxury',
          title2: 'Experience Modern Architecture',
          subtitle: 'Spaces Designed for Your\nUltimate Comfort and Elegance',
        },
        {
          title1: 'Secure Your Future',
          title2: 'Invest in Premium Real Estate',
          subtitle: 'Building Wealth Through\nStrategic Property Acquisitions',
        }
      ],
      contactUs: 'Contact Us'
    },
    about: {
      subtitle: 'How we work',
      title: 'Transforming Homes and\nCreating Dream Spaces',
      description1: 'Welcome to Dwello, your one-stop destination for all things home improvement,',
      description2: 'from remodeling and new home construction to home studios and shed structures. We are passionate about helping homeowners create the spaces they\'ve always dreamed of, and we have the expertise and resources to make it happen',
      contactUs: 'Contact Us'
    },
    rooms: {
      title: 'Explore Our Spaces',
      subtitle: 'Designed for Comfort',
      cardSubtitle: 'RESIDENTIAL',
      cardTitle: 'Transforming Homes and Creating Dream Spaces',
      cardDesc: 'from remodeling and new home construction to home studios and shed structures. We are passionate about helping homeowners create the',
      contactUs: 'Contact Us'
    },
    community: {
      title: 'Find Your Community',
      projectType: 'Project Type',
      projectTypePlaceholder: 'Apartment',
      location: 'Location',
      locationPlaceholder: 'Columbus',
      maxPrice: 'Max Price',
      maxPricePlaceholder: 'For Rent',
      searchBtn: 'Search',
      newsletterTitle: 'Subscribe Our Newsletter',
      newsletterPlaceholder: 'Write E.Mail Here',
      subscribeBtn: 'Subscribe',
      projectTypes: ['Apartment', 'Villa', 'Studio', 'Townhouse'],
      locations: ['Columbus', 'New York', 'Los Angeles', 'Miami'],
      prices: ['For Rent', 'For Sale', 'Under $1000', '$1000 - $3000', 'Over $3000']
    },
    experience: {
      title: 'Transforming Homes and Creating Dream Spaces',
      years: 'Years Of Experience',
      desc1: 'from remodeling and new home construction to home studios and shed structures. We are passionate about helping homeowners create the spaces they\'ve always dreamed of, and we have the expertise and resources to make it happen',
      desc2: 'from remodeling and new home construction to home studios and shed structures. We are passionate about helping homeowners create the spaces they\'ve always dreamed of, and we have the expertise and resources to make it happen',
      contactUs: 'Contact Us'
    },
    search: {
      location: 'Location',
      type: 'Type',
      priceRange: 'Price Range'
    },
    products: {
      heroTitle: 'From Concept to Creation',
      heroSubtitle: 'Your Partner in Remodeling and New Builds',
      filterLocation: 'Location',
      filterPrice: 'Price',
      filterRating: 'Rating',
      search: 'Search Products',
      allLocations: 'All Locations',
      allPrices: 'All Prices',
      allRatings: 'All Ratings',
      details: 'View Details',
      features: 'Features',
      description: 'Description',
      priceType: 'Price Type',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area (sq ft)'
    },
    aboutPage: {
      heroTitle: 'Transforming Homes and\nCreating Dream Spaces',
      heroSubtitle: 'How we work',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the leading provider of innovative home remodeling and construction services.',
      missionTitle: 'Our Mission',
      missionDesc: 'Delivering exceptional quality and unparalleled customer satisfaction in every project.',
      contactUs: 'Contact Us'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      rooms: 'مساحاتنا',
      community: 'المجتمع',
      contact: 'تواصل معنا',
      blog: 'المدونة',
      newsletter: 'النشرة البريدية',
      email: 'البريد الإلكتروني'
    },
    hero: {
      slides: [
        {
          title1: 'تكامل المنزل الذكي',
          title2: 'عزز منزلك بأحدث التقنيات',
          subtitle: 'شريكك الأول في إعادة التصميم\nوإنشاء المباني الحديثة',
        },
        {
          title1: 'رفاهية لا مثيل لها',
          title2: 'اكتشف روعة العمارة الحديثة',
          subtitle: 'مساحات مصممة خصيصاً\nلضمان راحتك وأناقتك الفائقة',
        },
        {
          title1: 'أمّن مستقبلك',
          title2: 'استثمر في عقارات فاخرة',
          subtitle: 'بناء الثروة من خلال\nالاستحواذ العقاري الاستراتيجي',
        }
      ],
      contactUs: 'تواصل معنا'
    },
    about: {
      subtitle: 'كيف نعمل',
      title: 'تحويل المنازل و\nخلق مساحات الأحلام',
      description1: 'مرحباً بك في دويلو، وجهتك المتكاملة لكل ما يخص تحسين المنزل،',
      description2: 'بدءاً من إعادة التصميم والبناء وحتى تجهيز الاستوديوهات والهياكل الحديثة. نحن شغوفون بمساعدة أصحاب المنازل في إنشاء المساحات التي لطالما حلموا بها، ولدينا الخبرة والموارد اللازمة لتحقيق ذلك على أكمل وجه.',
      contactUs: 'تواصل معنا'
    },
    rooms: {
      title: 'استكشف مساحاتنا',
      subtitle: 'مصممة لراحتك',
      cardSubtitle: 'سكني',
      cardTitle: 'تحويل المنازل وخلق مساحات الأحلام',
      cardDesc: 'من إعادة التصميم والبناء وحتى تجهيز الاستوديوهات والهياكل الحديثة. نحن شغوفون بمساعدة أصحاب المنازل في إنشاء الـ',
      contactUs: 'تواصل معنا'
    },
    community: {
      title: 'ابحث عن مجتمعك',
      projectType: 'نوع المشروع',
      projectTypePlaceholder: 'شقة',
      location: 'الموقع',
      locationPlaceholder: 'كولومبوس',
      maxPrice: 'أقصى سعر',
      maxPricePlaceholder: 'للإيجار',
      searchBtn: 'بحث',
      newsletterTitle: 'اشترك في النشرة الإخبارية',
      newsletterPlaceholder: 'اكتب بريدك الإلكتروني هنا',
      subscribeBtn: 'اشتراك',
      projectTypes: ['شقة', 'فيلا', 'استوديو', 'منزل مستقل'],
      locations: ['كولومبوس', 'نيويورك', 'لوس أنجلوس', 'ميامي'],
      prices: ['للإيجار', 'للبيع', 'أقل من ١٠٠٠ دولار', '١٠٠٠ - ٣٠٠٠ دولار', 'أكثر من ٣٠٠٠ دولار']
    },
    experience: {
      title: 'تحويل المنازل وخلق مساحات الأحلام',
      years: 'عاماً من الخبرة',
      desc1: 'من إعادة التصميم والبناء وحتى تجهيز الاستوديوهات والهياكل الحديثة. نحن شغوفون بمساعدة أصحاب المنازل في إنشاء المساحات التي لطالما حلموا بها، ولدينا الخبرة والموارد اللازمة لتحقيق ذلك.',
      desc2: 'من إعادة التصميم والبناء وحتى تجهيز الاستوديوهات والهياكل الحديثة. نحن شغوفون بمساعدة أصحاب المنازل في إنشاء المساحات التي لطالما حلموا بها، ولدينا الخبرة والموارد اللازمة لتحقيق ذلك.',
      contactUs: 'تواصل معنا'
    },
    search: {
      location: 'الموقع',
      type: 'النوع',
      priceRange: 'نطاق السعر'
    },
    products: {
      heroTitle: 'من الفكرة إلى الإبداع',
      heroSubtitle: 'شريكك في إعادة التصميم والبناء',
      filterLocation: 'الموقع',
      filterPrice: 'السعر',
      filterRating: 'التقييم',
      search: 'ابحث عن المنتجات',
      allLocations: 'كل المواقع',
      allPrices: 'كل الأسعار',
      allRatings: 'كل التقييمات',
      details: 'عرض التفاصيل',
      features: 'المميزات',
      description: 'الوصف',
      priceType: 'نوع السعر',
      bedrooms: 'غرف النوم',
      bathrooms: 'الحمامات',
      area: 'المساحة (متر مربع)'
    },
    aboutPage: {
      heroTitle: 'تحويل المنازل وخلق\nمساحات الأحلام',
      heroSubtitle: 'كيف نعمل',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن نكون المزود الرائد لخدمات إعادة تصميم وبناء المنازل المبتكرة.',
      missionTitle: 'مهمتنا',
      missionDesc: 'تقديم جودة استثنائية ورضا عملاء لا مثيل له في كل مشروع.',
      contactUs: 'تواصل معنا'
    }
  }
}

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'ar', // default locale
  fallbackLocale: 'en',
  messages,
})
