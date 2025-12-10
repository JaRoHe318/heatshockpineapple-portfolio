import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://heatshockpineapple.com',
  output: 'static',
  build: {
    format: 'file'
  }
});