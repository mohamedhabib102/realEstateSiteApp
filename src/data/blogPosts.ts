import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.png'
import product4 from '../assets/images/product4.png'

export interface BlogPostListItem {
    titleEn: string
    titleAr: string
    descEn: string
    descAr: string
}

export interface BlogPost {
    id: number
    titleEn: string
    titleAr: string
    excerptEn: string
    excerptAr: string
    descriptionEn: string
    descriptionAr: string
    list?: BlogPostListItem[]
    date: string
    dateAr: string
    authorEn: string
    authorAr: string
    image: string
    categoryEn: string
    categoryAr: string
    readTimeEn: string
    readTimeAr: string
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        titleEn: 'The Future of Smart Home Technology',
        titleAr: 'مستقبل تقنيات المنزل الذكي',
        excerptEn: 'Discover how smart home technology is revolutionizing the way we live, from automated lighting to AI-driven climate control.',
        excerptAr: 'اكتشف كيف تحدث تقنيات المنزل الذكي ثورة في طريقة حياتنا، من الإضاءة الآلية إلى التحكم المناخي بالذكاء الاصطناعي.',
        descriptionEn: 'Smart home technology is rapidly transforming our daily lives. From voice-activated assistants to fully automated security systems, modern homes are becoming smarter by the day.\n\nThe integration of AI and IoT (Internet of Things) has made it possible for homeowners to control virtually every aspect of their homes remotely. Imagine adjusting your thermostat, turning off lights, or checking who is at your door — all from your smartphone while you are miles away.\n\nAs technology continues to advance, the smart home of tomorrow will be even more intuitive, energy-efficient, and secure.',
        descriptionAr: 'تقنيات المنزل الذكي تحول حياتنا اليومية بشكل سريع. من المساعدات الصوتية إلى أنظمة الأمن الآلية الكاملة، أصبحت المنازل الحديثة أكثر ذكاءً يوماً بعد يوم.\n\nجعل دمج الذكاء الاصطناعي وإنترنت الأشياء من الممكن لأصحاب المنازل التحكم في كل جانب من جوانب منازلهم عن بُعد. تخيل ضبط الحرارة، وإطفاء الأضواء، أو التحقق من الزوار — كل ذلك من هاتفك الذكي وأنت بعيد.\n\nمع استمرار تطور التكنولوجيا، سيكون المنزل الذكي في الغد أكثر بداهة وكفاءة في الطاقة وأماناً.',
        list: [
            {
                titleEn: 'Smart Lighting Systems',
                titleAr: 'أنظمة الإضاءة الذكية',
                descEn: 'Automated lighting that adjusts based on time of day, occupancy, and even your mood.',
                descAr: 'إضاءة آلية تتكيف بناءً على الوقت والإشغال وحتى مزاجك.'
            },
            {
                titleEn: 'AI Climate Control',
                titleAr: 'التحكم المناخي بالذكاء الاصطناعي',
                descEn: 'Systems that learn your preferences and optimize energy usage automatically.',
                descAr: 'أنظمة تتعلم تفضيلاتك وتحسن استهلاك الطاقة تلقائياً.'
            },
            {
                titleEn: 'Security & Surveillance',
                titleAr: 'الأمن والمراقبة',
                descEn: 'Smart cameras, doorbells, and locks that provide real-time alerts and remote access.',
                descAr: 'كاميرات ذكية وأجراس أبواب وأقفال توفر تنبيهات فورية وإمكانية وصول عن بُعد.'
            },
            {
                titleEn: 'Voice Assistants',
                titleAr: 'المساعدون الصوتيون',
                descEn: 'Seamless integration with Alexa, Google Home, and Siri for hands-free control.',
                descAr: 'تكامل سلس مع أليكسا وجوجل هوم وسيري للتحكم بدون يدين.'
            }
        ],
        date: '2024-03-15',
        dateAr: '15 مارس 2024',
        authorEn: 'Ahmed Hassan',
        authorAr: 'أحمد حسن',
        image: product1,
        categoryEn: 'Technology',
        categoryAr: 'تكنولوجيا',
        readTimeEn: '5 min read',
        readTimeAr: '5 دقائق قراءة'
    },
    {
        id: 2,
        titleEn: 'Interior Design Trends for Modern Homes',
        titleAr: 'اتجاهات التصميم الداخلي للمنازل الحديثة',
        excerptEn: 'Explore the latest interior design trends that are shaping modern living spaces with elegance and functionality.',
        excerptAr: 'استكشف أحدث اتجاهات التصميم الداخلي التي تشكل المساحات السكنية الحديثة بأناقة ووظائف عملية.',
        descriptionEn: 'Interior design is constantly evolving. Modern homes are embracing a blend of minimalism, functionality, and personalization that creates spaces that are both beautiful and livable. The key to timeless interior design is balance — between old and new, bold and subtle, functional and decorative. Invest in quality pieces that speak to your personal style.',
        descriptionAr: 'يتطور التصميم الداخلي باستمرار. ما كان عصرياً قبل خمس سنوات قد يبدو قديماً اليوم. تتبنى المنازل الحديثة مزيجاً من البساطة والوظائفية والتخصيص الذي يخلق مساحات جميلة وقابلة للعيش. مفتاح التصميم الداخلي الخالد هو التوازن — بين القديم والجديد، الجريء والخفي، الوظيفي والزخرفي.',
        list: [
            {
                titleEn: 'Biophilic Design',
                titleAr: 'التصميم البيوفيلي',
                descEn: 'Bringing nature indoors with plants, natural materials, and organic shapes to promote wellness.',
                descAr: 'جلب الطبيعة إلى الداخل بالنباتات والمواد الطبيعية والأشكال العضوية لتعزيز الصحة.'
            },
            {
                titleEn: 'Warm Minimalism',
                titleAr: 'البساطة الدافئة',
                descEn: 'Clean lines and uncluttered spaces, but with warm earth tones and cozy textures.',
                descAr: 'خطوط نظيفة ومساحات منظمة، مع درجات ترابية دافئة وملمس مريح.'
            },
            {
                titleEn: 'Multifunctional Spaces',
                titleAr: 'المساحات متعددة الاستخدام',
                descEn: 'Rooms designed to serve multiple purposes — a home office that doubles as a guest room.',
                descAr: 'غرف مصممة لخدمة أغراض متعددة — مكتب منزلي يعمل أيضاً كغرفة ضيوف.'
            },
            {
                titleEn: 'Statement Ceilings',
                titleAr: 'الأسقف المميزة',
                descEn: 'The fifth wall is getting attention with bold colors, patterns, and architectural details.',
                descAr: 'تحظى الجدار الخامس باهتمام بألوان جريئة وأنماط وتفاصيل معمارية.'
            },
            {
                titleEn: 'Curved Furniture',
                titleAr: 'الأثاث المنحني',
                descEn: 'Soft, rounded edges replacing sharp corners for a more welcoming, organic feel.',
                descAr: 'حواف ناعمة ومدورة تحل محل الزوايا الحادة لإحساس أكثر ترحيباً.'
            }
        ],
        date: '2024-02-20',
        dateAr: '20 فبراير 2024',
        authorEn: 'Sara Ali',
        authorAr: 'سارة علي',
        image: product2,
        categoryEn: 'Design',
        categoryAr: 'تصميم',
        readTimeEn: '6 min read',
        readTimeAr: '6 دقائق قراءة'
    },
    {
        id: 3,
        titleEn: "Investing in Real Estate: A Beginner's Guide",
        titleAr: 'الاستثمار العقاري: دليل المبتدئين',
        excerptEn: 'Everything you need to know about getting started in real estate investment and building long-term wealth.',
        excerptAr: 'كل ما تحتاج لمعرفته عن بدء الاستثمار العقاري وبناء الثروة على المدى الطويل.',
        descriptionEn: 'Real estate has long been considered one of the safest and most reliable forms of investment. Unlike stocks that can fluctuate wildly, property tends to appreciate steadily over time while providing rental income. Real estate investment requires patience and due diligence, but the rewards can be substantial and long-lasting.',
        descriptionAr: 'يُعتبر العقار منذ فترة طويلة أحد أكثر أشكال الاستثمار أماناً وموثوقية. على عكس الأسهم التي يمكن أن تتقلب بشكل كبير، تميل العقارات إلى الارتفاع بشكل مطرد مع مرور الوقت مع توفير دخل الإيجار. الاستثمار العقاري يتطلب الصبر والدراسة الدقيقة، ولكن العوائد مجزية ومستمرة.',
        list: [
            {
                titleEn: 'Buy-to-Rent',
                titleAr: 'الشراء للإيجار',
                descEn: 'Purchase a property and rent it out for steady monthly income.',
                descAr: 'شراء عقار وتأجيره للحصول على دخل شهري ثابت.'
            },
            {
                titleEn: 'Buy-to-Sell (Flipping)',
                titleAr: 'الشراء للبيع',
                descEn: 'Buy undervalued properties, renovate, and sell for profit.',
                descAr: 'شراء عقارات مقيمة بأقل من قيمتها وتجديدها وبيعها بربح.'
            },
            {
                titleEn: 'REITs',
                titleAr: 'صناديق الاستثمار العقاري',
                descEn: 'Real Estate Investment Trusts allow you to invest in real estate without owning physical property.',
                descAr: 'تتيح لك الاستثمار في العقارات دون امتلاك عقار مادي.'
            }
        ],
        date: '2024-01-10',
        dateAr: '10 يناير 2024',
        authorEn: 'Omar Khaled',
        authorAr: 'عمر خالد',
        image: product3,
        categoryEn: 'Investment',
        categoryAr: 'استثمار',
        readTimeEn: '8 min read',
        readTimeAr: '8 دقائق قراءة'
    },
    {
        id: 4,
        titleEn: 'Sustainable Building Materials for Your Home',
        titleAr: 'مواد البناء المستدامة لمنزلك',
        excerptEn: 'Learn about eco-friendly building materials that reduce environmental impact without compromising on quality.',
        excerptAr: 'تعرف على مواد البناء الصديقة للبيئة التي تقلل الأثر البيئي دون المساومة على الجودة.',
        descriptionEn: 'Sustainable construction is no longer just a trend — it is becoming an industry standard. As environmental awareness grows, more homeowners and builders are turning to eco-friendly materials that reduce carbon footprints without sacrificing quality or aesthetics. Building sustainably not only benefits the environment but also results in lower energy bills and healthier indoor air quality.',
        descriptionAr: 'البناء المستدام لم يعد مجرد اتجاه — إنه يصبح معياراً في الصناعة. مع تنامي الوعي البيئي، يتجه المزيد من أصحاب المنازل والمقاولين نحو المواد الصديقة للبيئة التي تقلل البصمة الكربونية دون التضحية بالجودة أو الجماليات. البناء المستدام لا يفيد البيئة فحسب، بل يؤدي أيضاً إلى انخفاض فواتير الطاقة وجودة أفضل للهواء الداخلي.',
        list: [
            {
                titleEn: 'Bamboo',
                titleAr: 'الخيزران',
                descEn: 'Grows much faster than traditional timber, incredibly strong, and naturally beautiful.',
                descAr: 'ينمو أسرع بكثير من الأخشاب التقليدية، وقوي بشكل لا يصدق وجميل بطبيعته.'
            },
            {
                titleEn: 'Recycled Steel',
                titleAr: 'الفولاذ المعاد تدويره',
                descEn: 'Using recycled steel reduces energy consumption by up to 75% compared to new steel production.',
                descAr: 'يقلل من استهلاك الطاقة بما يصل إلى 75٪ مقارنة بإنتاج الفولاذ الجديد.'
            },
            {
                titleEn: 'Rammed Earth',
                titleAr: 'الطين المدكوك',
                descEn: 'Ancient technique experiencing a modern revival — naturally insulating, fire-resistant, and stunning.',
                descAr: 'أسلوب قديم يشهد انتعاشاً حديثاً — عازل طبيعياً ومقاوم للحريق ورائع.'
            },
            {
                titleEn: 'Cork',
                titleAr: 'الفلين',
                descEn: 'Harvested without harming trees, excellent insulator, and comfortable underfoot.',
                descAr: 'يُحصد دون الإضرار بالأشجار، ومعزول ممتاز ومريح للوقوف عليه.'
            },
            {
                titleEn: 'Reclaimed Wood',
                titleAr: 'الخشب المُستعاد',
                descEn: 'Gives old timber new life while reducing deforestation.',
                descAr: 'يمنح الأخشاب القديمة حياة جديدة مع تقليل إزالة الغابات.'
            }
        ],
        date: '2024-03-01',
        dateAr: '1 مارس 2024',
        authorEn: 'Nour Mahmoud',
        authorAr: 'نور محمود',
        image: product4,
        categoryEn: 'Sustainability',
        categoryAr: 'استدامة',
        readTimeEn: '7 min read',
        readTimeAr: '7 دقائق قراءة'
    },
    {
        id: 5,
        titleEn: 'How to Choose the Perfect Location for Your Home',
        titleAr: 'كيف تختار الموقع المثالي لمنزلك',
        excerptEn: 'Location is everything in real estate. Here are the key factors to consider when choosing where to buy your next property.',
        excerptAr: 'الموقع هو كل شيء في العقارات. إليك العوامل الأساسية التي يجب مراعاتها عند اختيار مكان شراء عقارك القادم.',
        descriptionEn: '"Location, location, location" — this real estate mantra has stood the test of time for good reason. The location of a property determines not only its current value but also its future appreciation potential. Proximity to roads, transport, schools, and business districts significantly affects property value and your quality of life.',
        descriptionAr: '"الموقع، الموقع، الموقع" — هذا الشعار العقاري اجتاز اختبار الزمن لسبب وجيه. يحدد موقع العقار ليس فقط قيمته الحالية ولكن أيضاً إمكانية ارتفاع قيمته في المستقبل. القرب من الطرق الرئيسية والمواصفات المتميزة يؤثر بشكل كبير على قيمة العقار وجودة حياتك.',
        list: [
            {
                titleEn: 'Accessibility & Transportation',
                titleAr: 'إمكانية الوصول والمواصلات',
                descEn: 'Proximity to major roads, public transport, airports, and business districts significantly affects property value.',
                descAr: 'القرب من الطرق الرئيسية والمواصلات العامة والمطارات والمناطق التجارية يؤثر بشكل كبير على قيمة العقار.'
            },
            {
                titleEn: 'Schools & Education',
                titleAr: 'المدارس والتعليم',
                descEn: 'Even if you don\'t have children, buying near good schools is a smart investment — these areas hold value well.',
                descAr: 'حتى لو لم يكن لديك أطفال، الشراء بالقرب من مدارس جيدة استثمار ذكي — هذه المناطق تحافظ على قيمتها.'
            },
            {
                titleEn: 'Safety & Security',
                titleAr: 'الأمن والسلامة',
                descEn: 'Safe neighborhoods offer peace of mind and better long-term value retention.',
                descAr: 'الأحياء الآمنة توفر راحة البال والاحتفاظ بالقيمة على المدى الطويل.'
            },
            {
                titleEn: 'Future Development Plans',
                titleAr: 'خطط التطوير المستقبلية',
                descEn: 'Check local government plans for infrastructure development — these can dramatically boost property values.',
                descAr: 'تحقق من خطط الحكومة المحلية لتطوير البنية التحتية — يمكن أن ترفع هذه القيم العقارية بشكل كبير.'
            }
        ],
        date: '2024-02-05',
        dateAr: '5 فبراير 2024',
        authorEn: 'Laila Youssef',
        authorAr: 'ليلى يوسف',
        image: product1,
        categoryEn: 'Tips',
        categoryAr: 'نصائح',
        readTimeEn: '6 min read',
        readTimeAr: '6 دقائق قراءة'
    },
    {
        id: 6,
        titleEn: "Renovating vs. Building New: What's Best for You?",
        titleAr: 'التجديد مقابل البناء الجديد: ما الأفضل لك؟',
        excerptEn: 'We break down the pros and cons of renovating an existing home versus building a brand-new one from scratch.',
        excerptAr: 'نحلل إيجابيات وسلبيات تجديد منزل قائم مقابل بناء منزل جديد من الصفر.',
        descriptionEn: 'One of the biggest decisions any homeowner or property investor faces is whether to renovate an existing property or build a brand-new one. Both options have their merits and drawbacks, and the right choice depends on your budget, timeline, and vision.',
        descriptionAr: 'أحد أكبر القرارات التي يواجهها أي مالك منزل أو مستثمر عقاري هو ما إذا كان سيجدد عقاراً قائماً أم يبني واحداً جديداً من الصفر. كلا الخيارين له مزاياه وعيوبه، والحياد يكمن في تحديد ميزانيتك وجدولك الزمني.',
        list: [
            {
                titleEn: 'Renovating an Existing Home',
                titleAr: 'تجديد منزل قائم',
                descEn: 'Lower upfront costs, preserve building character, faster completion, located in established neighborhoods.',
                descAr: 'تكاليف أولية أقل، الحفاظ على طابع وسحر المباني، إنجاز أسرع، تقع في أحياء راسخة.'
            },
            {
                titleEn: 'Building New',
                titleAr: 'البناء الجديد من الصفر',
                descEn: 'Custom design from scratch, latest building codes, energy efficiency, modern layouts, no repair costs for years.',
                descAr: 'تصميم مخصص من الصفر، أحدث قوانين البناء والكفاءة الطاقية، تخطيطات حديثة، لا تكاليف إصلاح خفية.'
            }
        ],
        date: '2024-01-25',
        dateAr: '25 يناير 2024',
        authorEn: 'Karim Farid',
        authorAr: 'كريم فريد',
        image: product2,
        categoryEn: 'Construction',
        categoryAr: 'بناء',
        readTimeEn: '9 min read',
        readTimeAr: '9 دقائق قراءة'
    }
]