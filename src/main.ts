import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routers/index.ts'
import { i18n } from './i18n/index.ts'
import { MotionPlugin } from '@vueuse/motion'

createApp(App)
.use(router)
.use(i18n)
.use(MotionPlugin)
.mount('#app')
