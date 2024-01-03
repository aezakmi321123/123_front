import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      // Create an alias for images in the public folder
      '@images': path.resolve(__dirname, 'src/assets/icons'),
    },
  },
  alias: [
    {
      find: '@',
      replacement: path.resolve(__dirname, 'src'),
    },
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/index.scss";
          @import "./src/assets/scss/vars.scss";
          @import "./src/assets/scss/layout.scss";
      `,
      },
    },
  },
});
