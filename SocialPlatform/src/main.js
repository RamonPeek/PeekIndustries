import { createApp } from 'vue'
import { router } from './router'
import { createHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import './assets/main.css' // contains: @import "tailwindcss"; @import "@nuxt/ui";

const app = createApp(App)

app.use(router)
app.use(createHead())
app.use(ui)

app.mount('#app')
