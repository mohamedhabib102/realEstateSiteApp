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
      compare: 'Compare',
      newsletter: 'Newsletter',
      email: 'E.mail',
      login: 'Login',
      register: 'Sign Up'
    },
    testimonials: {
      tag: 'Client Experiences',
      title: 'What Our Valued Clients Say',
      subtitle: 'Real stories from verified property owners, sellers, and buyers across our platform',
      buyer: 'Property Buyer',
      seller: 'Property Seller',
      verifiedReview: 'Verified Transaction'
    },
    compare: {
      title: 'Property Comparison Matrix',
      subtitle: 'Compare features, specifications, and prices side-by-side to choose the perfect property',
      selectPromptA: 'Choose First Property',
      selectPromptB: 'Choose Second Property',
      features: 'Features & Amenities',
      price: 'Price',
      location: 'Location',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Total Area',
      capacity: 'Capacity',
      bedType: 'Bed Type',
      negotiable: 'Negotiable',
      videoTour: 'Video Tour Available',
      viewDetails: 'View Details',
      changeProperty: 'Change'
    },
    hero: {
      slides: [
        {
          title1: 'Your Premier Property Marketplace',
          title2: 'List Your Unit or Find Your Dream Home',
          subtitle: 'Whether you are an owner looking to sell or rent your property,\nor a buyer searching for your dream home, we deliver a seamless experience.',
        },
        {
          title1: 'Smart Real Estate Investment',
          title2: 'Direct Connection Between Sellers & Buyers',
          subtitle: 'Thousands of active buyers browse our marketplace daily.\nList your unit in minutes and connect with interested clients directly.',
        },
        {
          title1: 'Your Trusted Property Destination',
          title2: 'Exclusive Residential & Commercial Listings',
          subtitle: 'Explore premium apartments, villas, and spaces at competitive prices\nand find the perfect property tailored just for you.',
        }
      ],
      contactUs: 'Contact Us'
    },
    about: {
      subtitle: 'How Dwello Works',
      title: 'Connecting Property Owners with Buyers Directly',
      description1: 'Welcome to Dwello, the premier real estate marketplace designed for seamless property buying, selling, and renting.',
      description2: 'We empower property owners to showcase their residential and commercial units to thousands of verified buyers, while providing buyers with transparent pricing, verified listings, and direct contact with owners.',
      contactUs: 'Start Exploring'
    },
    rooms: {
      title: 'Featured Properties & Units',
      subtitle: 'Curated Real Estate Marketplace',
      cardSubtitle: 'PREMIUM LISTINGS',
      cardTitle: 'Explore Top Residential & Commercial Spaces',
      cardDesc: 'Discover handpicked luxury apartments, modern villas, and commercial spaces listed directly by verified property owners across prime locations.',
      contactUs: 'View Listings'
    },
    community: {
      title: 'Find Your Ideal Property',
      projectType: 'Property Type',
      projectTypePlaceholder: 'Apartment / Villa',
      location: 'City / Location',
      locationPlaceholder: 'Riyadh / Dubai / Cairo',
      maxPrice: 'Listing Purpose',
      maxPricePlaceholder: 'For Sale / For Rent',
      searchBtn: 'Search Properties',
      newsletterTitle: 'Subscribe to Exclusive Property Alerts',
      newsletterPlaceholder: 'Enter your email address',
      subscribeBtn: 'Subscribe',
      projectTypes: ['Apartment', 'Villa', 'Duplex', 'Commercial Office', 'Land Plot'],
      locations: ['Riyadh', 'Dubai', 'Cairo', 'Alexandria', 'Jeddah'],
      prices: ['For Sale', 'For Rent', 'Under $100K', '$100K - $300K', 'Over $300K']
    },
    experience: {
      title: 'Empowering Real Estate Trading with Trust and Speed',
      years: 'Successful Transactions',
      desc1: 'Dwello simplifies real estate for owners and buyers alike. Property owners can list their units with high-resolution photos, detailed specifications, and transparent pricing.',
      desc2: 'Buyers enjoy advanced location filtering, verified owner profiles, direct negotiation options, and hassle-free transactions.',
      contactUs: 'List Your Property'
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
      area: 'Area (sq ft)',
      contactUs: 'Contact Owner',
      negotiable: 'Negotiable',
      notNegotiable: 'Not Negotiable',
      negotiationStatus: 'Negotiation Status'
    },
    owner: {
      profile: 'Owner Profile',
      verifiedOwner: 'Verified Owner',
      memberSince: 'Member Since',
      city: 'City',
      properties: 'Properties',
      sold: 'Sold',
      responseRate: 'Response Rate',
      viewListings: 'View All Listings',
      sendMessage: 'Send Message',
      listedProperties: 'Listed Properties',
      about: 'About the Owner'
    }, 
    buyerProfile: {
      common: {
        back: 'Back'
      },
        memberSince: 'Member Since',
        verified: 'Verified Account',
        unverified: 'Unverified Account',
        editProfile: 'Edit Profile',
        personalInfo: 'Personal Information',
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        dob: 'Date of Birth',
        gender: 'Gender (Optional)',
        male: 'Male',
        female: 'Female',
        notSpecified: 'Not Specified',
        location: 'Country & City',
        verifyIdentityTitle: 'Verify Your Identity',
        verifyIdentityDesc: 'Please verify your identity to get the verified badge and increase trust with sellers.',
        verifyNow: 'Verify Now',
        security: 'Security',
        changePassword: 'Change Password',
        changeEmail: 'Change Email Address',
        changePhone: 'Change Phone Number',
        dangerZone: 'Danger Zone',
        logoutAll: 'Logout from All Devices',
        deleteAccount: 'Delete Account'
    }
    ,
    aboutPage: {
      heroTitle: 'Transforming Homes and\nCreating Dream Spaces',
      heroSubtitle: 'How we work',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the leading provider of innovative home remodeling and construction services.',
      missionTitle: 'Our Mission',
      missionDesc: 'Delivering exceptional quality and unparalleled customer satisfaction in every project.',
      contactUs: 'Contact Us'
    },
    auth: {
      loginTitle: 'Welcome Back !',
      registerTitle: 'Hello User !',
      loginSubtitle: 'Enter below details to sign in to your account',
      registerSubtitle: 'Enter below details to create an account',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Mail',
      emailPlaceholder: 'Enter your mail',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      role: 'Account Type',
      roleOwner: 'Owner',
      roleClient: 'Client',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      or: 'Or',
      alreadyHaveAccount: 'Already have an account ?',
      dontHaveAccount: "Don't have an account ?",
      loginHere: 'Login Here',
      registerHere: 'Sign Up Here',
      heroTitle: 'Unleash Your Living Spirit!',
      heroDesc: 'Discover a world filled with premier luxury homes, modern architecture, and exclusive real estate deals tailored just for you.',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      googleButton: 'Continue with Google'
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
      compare: 'مقارنة العقارات',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    },
    testimonials: {
      tag: 'تجارب وآراء عملائنا',
      title: 'ماذا يقول عملاؤنا الموثوقون؟',
      subtitle: 'قصص نجاح وتجارب حقيقية من أصحاب العقارات، البائعين والمشترين عبر منصة دويلو',
      buyer: 'مشتري عقار',
      seller: 'بائع عقار',
      verifiedReview: 'معاملة موثقة'
    },
    compare: {
      title: 'مقارنة المواصفات والعقارات',
      subtitle: 'قارن بين تفاصيل ومميزات وأسعار عقارين جنباً إلى جنب لاختيار الخيار الأفضل لك',
      selectPromptA: 'اختر العقار الأول',
      selectPromptB: 'اختر العقار الثاني',
      features: 'المميزات والكماليات',
      price: 'السعر',
      location: 'الموقع',
      bedrooms: 'غرف النوم',
      bathrooms: 'الحمامات',
      area: 'المساحة الإجمالية',
      capacity: 'سعة الأفراد',
      bedType: 'نوع السرير',
      negotiable: 'قابل للتفاوض',
      videoTour: 'فيديو معاينة متاح',
      viewDetails: 'عرض تفاصيل العقار',
      changeProperty: 'تغيير العقار'
    },
    hero: {
      slides: [
        {
          title1: 'منصتك الأولى للعقارات',
          title2: 'اعرض وحدتك أو امتلك بيت أحلامك',
          subtitle: 'سواء كنت مالكاً ترغب في عرض عقاراتك للبيع أو الإيجار،\nأو مشترياً يبحث عن منزله المستقبلي، نوفر لك تجربة استثنائية.',
        },
        {
          title1: 'استثمر وسوق وحدتك بذكاء',
          title2: 'تواصل مباشر بين البائع والمشتري',
          subtitle: 'آلاف المستثمرين والمشترين يصفحون منصتنا يومياً.\nأضف عقارك الآن في خطوات بسيطة وتواصل مع عملائك.',
        },
        {
          title1: 'وجهتك العقارية الموثوقة',
          title2: 'عروض حصرية وحدات سكنية وتجارية',
          subtitle: 'تصفح أرقى الشقق، الفلل، والاستوديوهات بأفضل الأسعار\nواختر ما يناسب تطلعاتك بكل سهولة وأمان.',
        }
      ],
      contactUs: 'تواصل معنا'
    },
    about: {
      subtitle: 'كيف تعمل منصة دويلو',
      title: 'ربط أصحاب العقارات بالمشترين والمستثمرين مباشرة',
      description1: 'مرحباً بك في دويلو، المنصة العقارية الرائدة المصممة لتسهيل عمليات بيع وشراء وإيجار العقارات بكل سهولة وأمان.',
      description2: 'نمكّن أصحاب الوحدات العقارية من عرض عقاراتهم السكنية والتجارية أمام آلاف المشترين والمستثمرين، مع توفير تجربة تصفح سلسة، أسعار شفافة، وتواصل مباشر بدون تعقيدات.',
      contactUs: 'ابدأ الاستكشاف'
    },
    rooms: {
      title: 'أحدث العقارات والوحدات المميزة',
      subtitle: 'سوق عقاري متكامل',
      cardSubtitle: 'عقارات مختارة',
      cardTitle: 'تصفح أرقى الوحدات السكنية والتجارية',
      cardDesc: 'استكشف شققاً فاخرة، وفللاً حديثة، ومقرات تجارية مميزة معروضة مباشرة من أصحاب الوحدات في أرقى الأحياء والمواقع.',
      contactUs: 'استعرض العقارات'
    },
    community: {
      title: 'ابحث عن عقارك المناسب',
      projectType: 'نوع العقار',
      projectTypePlaceholder: 'شقة / فيلا',
      location: 'المدينة / الموقع',
      locationPlaceholder: 'الرياض / دبي / القاهرة',
      maxPrice: 'الغرض من الإعلان',
      maxPricePlaceholder: 'للبيع / للإيجار',
      searchBtn: 'بحث عن عقار',
      newsletterTitle: 'اشترك للحصول على أحدث العروض العقارية',
      newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
      subscribeBtn: 'اشتراك',
      projectTypes: ['شقة سكنية', 'فيلا فاخرة', 'دوبلكس', 'مكتب تجاري', 'أرض معدة للبناء'],
      locations: ['الرياض', 'دبي', 'القاهرة', 'الإسكندرية', 'جدة'],
      prices: ['للبيع', 'للإيجار', 'أقل من ١٠٠ ألف دولار', '١٠٠ - ٣٠٠ ألف دولار', 'أكثر من ٣٠٠ ألف دولار']
    },
    experience: {
      title: 'نمكّن تداول العقارات بأمان وسرعة فائقة',
      years: 'صفقة عقارية ناجحة',
      desc1: 'تبسط منصة دويلو عملية تداول العقارات لأصحاب الوحدات والمشترين على حد سواء. يمكن لمالك العقار إضافة وحدته خلال دقائق مع صور عالية الجودة ومواصفات تفصيلية وسعر واضح.',
      desc2: 'ويتمتع المشتري بفلترة فائقة السرعة، استعراض الملف الشخصي للمالك الموثق، والتواصل المباشر لإتمام الصفقات بدون وسائط معقدة.',
      contactUs: 'أضف عقارك الآن'
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
      area: 'المساحة (متر مربع)',
      contactUs: 'تواصل مع المالك',
      negotiable: 'قابل للتفاوض',
      notNegotiable: 'غير قابل للتفاوض',
      negotiationStatus: 'حالة التفاوض'
    },
    owner: {
      profile: 'الملف الشخصي للمالك',
      verifiedOwner: 'مالك موثق',
      memberSince: 'عضو منذ',
      city: 'المدينة',
      properties: 'العقارات',
      sold: 'المباعة',
      responseRate: 'معدل الاستجابة',
      viewListings: 'عرض كل الإعلانات',
      sendMessage: 'إرسال رسالة',
      listedProperties: 'العقارات المنشورة',
      about: 'عن المالك'
    },
      buyerProfile: {
      common: {
        back: 'رجوع'
      },
        memberSince: 'عضو منذ',
        verified: 'حساب موثق',
        unverified: 'حساب غير موثق',
        editProfile: 'تعديل الملف الشخصي',
        personalInfo: 'المعلومات الشخصية',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        dob: 'تاريخ الميلاد',
        gender: 'الجنس (اختياري)',
        male: 'ذكر',
        female: 'أنثى',
        notSpecified: 'غير محدد',
        location: 'الدولة والمدينة',
        verifyIdentityTitle: 'تحقق من هويتك',
        verifyIdentityDesc: 'يرجى التحقق من هويتك للحصول على شارة التوثيق وزيادة الثقة مع البائعين.',
        verifyNow: 'تحقق الآن',
        security: 'الأمان',
        changePassword: 'تغيير كلمة المرور',
        changeEmail: 'تغيير البريد الإلكتروني',
        changePhone: 'تغيير رقم الهاتف',
        dangerZone: 'منطقة الخطر',
        logoutAll: 'تسجيل الخروج من جميع الأجهزة',
        deleteAccount: 'حذف الحساب'
    },
    aboutPage: {
      heroTitle: 'تحويل المنازل وخلق\nمساحات الأحلام',
      heroSubtitle: 'كيف نعمل',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن نكون المزود الرائد لخدمات إعادة تصميم وبناء المنازل المبتكرة.',
      missionTitle: 'مهمتنا',
      missionDesc: 'تقديم جودة استثنائية ورضا عملاء لا مثيل له في كل مشروع.',
      contactUs: 'تواصل معنا'
    },
    auth: {
      loginTitle: 'أهلاً بعودتك !',
      registerTitle: 'مرحباً بك !',
      loginSubtitle: 'أدخل بياناتك أدناه لتسجيل الدخول إلى حسابك',
      registerSubtitle: 'أدخل بياناتك أدناه لإنشاء حساب جديد',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phone: 'رقم الهاتف',
      phonePlaceholder: 'أدخل رقم هاتفك',
      role: 'نوع الحساب',
      roleOwner: 'مالك',
      roleClient: 'عميل',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أعد كتابة كلمة المرور',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      or: 'أو',
      alreadyHaveAccount: 'لديك حساب بالفعل ؟',
      dontHaveAccount: 'ليس لديك حساب ؟',
      loginHere: 'سجل دخولك هنا',
      registerHere: 'أنشئ حسابك هنا',
      heroTitle: 'أطلق العنان لمنزل أحلامك!',
      heroDesc: 'اكتشف عالماً مليئاً بأرقى العقارات الفاخرة، والتصاميم المعمارية الحديثة، والعروض الحصرية المصممة خصيصاً لراحتك وأسلوب حياتك.',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      googleButton: 'المتابعة باستخدام Google'
    }
  }
}

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'ar', // default locale
  fallbackLocale: 'en',
  messages,
})
