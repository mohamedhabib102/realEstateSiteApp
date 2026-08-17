import { createRouter, createWebHistory } from "vue-router";
import Home from "../features/home/views/Home.vue";
import Products from "../features/products/views/Products.vue";
import ProductDetails from "../features/products/views/ProductDetails.vue";
import CompareProperties from "../features/products/views/CompareProperties.vue";
import About from "../features/about/views/About.vue";
import Contact from "../features/contact/views/Contact.vue";
import Blog from "../features/blog/views/Blog.vue";
import BlogDetails from "../features/blog/views/BlogDetails.vue";
import Login from "../features/auth/views/Login.vue";
import Register from "../features/auth/views/Register.vue";
import ForgotPassword from "../features/auth/views/ForgotPassword.vue";
import EmailVerification from "../features/auth/views/EmailVerification.vue";
import OwnerProfile from "../features/owners/views/OwnerProfile.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { i18n } from "../i18n";
import DashboardLayout from "../features/dashboards/layouts/DashboardLayout.vue";
import { roleConfig } from "../features/dashboards/roles";
import { currentRole } from "../data/currentRole";

// Build dashboard children ONLY for the active role.
// The user never sees sections for roles they are not currently in.
const dashboardChildren = roleConfig[currentRole].items.map((item) => ({
    path: item.path,
    name: item.name,
    component: item.component,
}));

const routes = [
    {
        path: "/",
        redirect: "/ar"
    },
    {
        path: "/:locale/login",
        name: "login",
        component: Login
    },
    {
        path: "/:locale/register",
        name: "register",
        component: Register
    },
    {
        path: "/:locale/forgot-password",
        name: "forgot-password",
        component: ForgotPassword
    },
    {
        path: "/:locale/verify-email",
        name: "verify-email",
        component: EmailVerification
    },
    {
        path: "/:locale/auth",
        redirect: (to: any) => `/${to.params.locale || 'ar'}/login`
    },
    {
        path: "/:locale/dashboards",
        component: DashboardLayout,
        children: dashboardChildren
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
                path: "compare",
                name: "compareProperties",
                component: CompareProperties
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
                path: "blog/:id",
                name: "blogDetails",
                component: BlogDetails
            },
            {
                path: "contact",
                name: "contact",
                component: Contact
            },
            {
                path: "owners/:id",
                name: "ownerProfile",
                component: OwnerProfile
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