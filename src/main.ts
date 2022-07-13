import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Storage, { StorageType } from 'vue3-storage'
import VCalendar from 'v-calendar'
import 'ress'
import 'v-calendar/dist/style.css'

loadFonts()

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(VCalendar, {})
  .use(Vue3Storage, { namespace: 'todoapp_', storage: StorageType.Local })
  .use(vuetify)
  .mount('#app')
