import { createRouter, createWebHistory } from "vue-router";
import Home from "../features/home/views/Home.vue";
import Products from "../features/products/views/Products.vue";
import ProductDetails from "../features/products/views/ProductDetails.vue";
import About from "../features/about/views/About.vue";
import Contact from "../features/contact/views/Contact.vue";
import Blog from "../features/blog/views/Blog.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { i18n } from "../i18n";

const routes = [
    {
        path: "/",
        redirect: "/ar"
    },
    {
        path: "/:locale",
        component: MainLayout,
        children: [
            {
                path: "",
                name: "home",
                component: Home
            },
            {
                path: "products",
                name: "products",
                component: Products
            },
            {
                path: "products/:id",
                name: "productDetails",
                component: ProductDetails
            },
            {
                path: "about",
                name: "about",
                component: About
            },
            {
                path: "blog",
                name: "blog",
                component: Blog
            },
            {
                path: "contact",
                name: "contact",
                component: Contact
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0, behavior: 'smooth' };
    }
});

router.beforeEach((to, _from, next) => {
    const locale = to.params.locale as string;
    const supportedLocales = ['en', 'ar'];

    if (locale && supportedLocales.includes(locale)) {
        // Update i18n locale
        i18n.global.locale.value = locale as any;
        
        // Update HTML attributes for styling
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        
        // If the path has extra segments that don't match, redirect to the base locale
        if (to.matched.length === 0) {
            next(`/${locale}`);
        } else {
            next();
        }
    } else {
        // Extract potential locale from path or default to 'ar'
        const pathSegments = to.path.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];
        
        if (supportedLocales.includes(firstSegment)) {
            // Valid locale but unmatched route, redirect to base of that locale
            next(`/${firstSegment}`);
        } else {
            // No valid locale, redirect to /ar
            next('/ar');
        }
    }
});