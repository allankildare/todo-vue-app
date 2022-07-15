import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VCalendar from 'v-calendar'
import * as dayjs from 'dayjs'
import 'ress'
import 'v-calendar/dist/style.css'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

createApp(App)
  .use(pinia)
  .use(VCalendar, {})
  .use(vuetify)
  .mount('#app')

app.config.globalProperties.$dayjs = dayjs

// App logs
/* eslint no-console: */
console.log('%cTo-Do Vue App', 'color: #449646; font-size: 24px')
console.log('%cWelcome to DevTools\nThis application was developed by Allan Kildare\nhttps://github.com/allankildare', 'color: #449646; font-weight: bold')
