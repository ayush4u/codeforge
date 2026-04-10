import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// Use Vite's provided `mode` instead of NODE_ENV. GitHub Actions doesn't set
// NODE_ENV for `vite build`, so assets were emitted with absolute `/assets/*`
// URLs, which 404 on GitHub Pages under `/codeforge/` and left only the bare
// HTML skeleton visible.
export default defineConfig(({ mode }) => ({
  plugins: [glsl()],
  base: mode === 'production' ? '/codeforge/' : '/',
  server: {
    port: 5179,
    open: true,
  },
}));
