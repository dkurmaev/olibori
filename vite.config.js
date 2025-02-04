import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin(),
    sitemap({
      hostname: 'https://bedachungen.olidort.de', // Домен сайта
      outDir: 'dist', // Куда сохраняется карта сайта
      changefreq: 'weekly', // Частота обновления
      priority: 0.8, // Приоритет страниц
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },

});
