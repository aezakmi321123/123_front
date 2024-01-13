import vue from '@vitejs/plugin-vue';
// import ViteSvgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/assets', import.meta.url)),
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
