import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
// import ViteSvgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/icons'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/index.scss";
          @import "@/assets/scss/vars.scss";
          @import "@/assets/scss/layout.scss";
        `,
      },
    },
  },
});
