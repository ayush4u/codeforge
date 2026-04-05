import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  base: '/codeforge/',
  server: {
    port: 5179,
    open: true,
  },
});
