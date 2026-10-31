import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `--mode single` empaqueta todo en un único index.html (para publicarlo como artifact).
export default defineConfig(({ mode }) => ({
  // base relativa: funciona en GitHub Pages tanto en usuario.github.io como en usuario.github.io/repo/
  base: './',
  plugins: [react(), tailwindcss(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
  test: { environment: 'node' },
}));
