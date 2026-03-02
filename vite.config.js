import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),       // Главная страница
        player: resolve(__dirname, 'player/index.html'), // Вторая страница в подпапке
      },
    },
  },
});