import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Storage, { StorageType } from 'vue3-storage'
import VCalendar from 'v-calendar'
import 'ress'
import 'v-calendar/dist/style.css'

loadFonts()

createApp(App)
  .use(VCalendar, {})
  .use(Vue3Storage, { namespace: 'pro_', storage: StorageType.Local })
  .use(vuetify)
  .mount('#app')
