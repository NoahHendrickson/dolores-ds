import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// Library build — emits dist/index.js, dist/index.d.ts, dist/style.css.
// Run with: vite build --config vite.lib.config.ts
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: fileURLToPath(new URL('./src', import.meta.url)),
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.stories.@(js|jsx|ts|tsx)',
        'src/**/*.test.@(js|jsx|ts|tsx)',
        'src/main.tsx',
        'src/App.tsx',
        'src/stories/**',
      ],
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'react-aria',
        'react-aria-components',
        '@react-aria/utils',
        '@react-stately/utils',
        '@untitledui/icons',
        '@phosphor-icons/react',
        'input-otp',
        'react-hook-form',
        'tailwind-merge',
      ],
      output: {
        preserveModules: false,
        assetFileNames: (asset) => (asset.name?.endsWith('.css') ? 'style.css' : 'assets/[name][extname]'),
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  // Don't copy public/ assets (favicon, icons.svg) into the npm package.
  publicDir: false,
})
