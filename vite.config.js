/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages под подпутём /<repo>/
const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? ''
const base = repo ? `/${repo}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Astro CRM mini',
        short_name: 'Astro CRM',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#0a0f16',
        theme_color: '#22ff88'
        // icons добавим позже, после PR, когда загрузим PNG
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: 'index.html'
      }
    })
  ]
})

