import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  base: process.env.NODE_ENV === 'production' ? '/codeforge/' : '/',
  server: {
    port: 5179,
    open: true,
  },
});
