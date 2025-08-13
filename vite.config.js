/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages идёт из подпути /<repo>/
const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? ''
const base = repo ? `/${repo}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',       // авто-регистрация service worker
      registerType: 'autoUpdate',
      manifest: {
        name: 'Astro CRM mini',
        short_name: 'Astro CRM',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#0a0f16',
        theme_color: '#22ff88',
        // !!! Эти иконки должны существовать (см. шаг B)
        icons: [
          { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
          { src: `${base}icons/maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: 'index.html'
      }
    })
  ]
})
