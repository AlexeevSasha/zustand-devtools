import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'devtools',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['zustand', 'zustand/middleware'],
      output: {
        globals: {
          zustand: 'zustand',
          'zustand/middleware': 'zustand/middleware',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [dts()],
});
