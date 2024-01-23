import vue from '@vitejs/plugin-vue';
import obfuscator from 'rollup-plugin-obfuscator';
// import ViteSvgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    obfuscator({
      options: {
        compact: true,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        domainLock: [],
        domainLockRedirectUrl: 'about:blank',
        forceTransformStrings: [],
        identifierNamesCache: null,
        identifierNamesGenerator: 'hexadecimal',
        identifiersDictionary: [],
        identifiersPrefix: '',
        ignoreImports: false,
        inputFileName: '',
        log: false,
        numbersToExpressions: false,
        optionsPreset: 'default',
        renameGlobals: false,
        renameProperties: false,
        renamePropertiesMode: 'safe',
        reservedNames: [],
        reservedStrings: [],
        seed: 0,
        selfDefending: false,
        simplify: true,
        sourceMap: false,
        sourceMapBaseUrl: '',
        sourceMapFileName: '',
        sourceMapMode: 'separate',
        sourceMapSourcesMode: 'sources-content',
        splitStrings: false,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.5,
        stringArrayEncoding: [],
        stringArrayIndexesType: ['hexadecimal-number'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        target: 'browser',
        transformObjectKeys: false,
        unicodeEscapeSequence: false,
      },
      exclude: ['node_modules/**'],
    }),
  ],
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
  assetsDir: 'assets',
  build: {
    target: 'es2020',
    outDir: 'dist',
    chunkSizeWarningLimit: 3000,
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
