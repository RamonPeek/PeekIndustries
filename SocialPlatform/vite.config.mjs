import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [vue(), ui({
      // 👇 customize theme colors
      ui: {
        colors: {
          primary: 'blue',   // or 'emerald', 'violet', 'red', etc.
          gray: 'cool'       // optional: tweak gray palette too
        }
      }
    })],
  server: { port: 5173 }
})