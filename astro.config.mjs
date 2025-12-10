import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://heatshockpineapple.com',
  // *** ADD THIS NEW LINE ***
  base: '/heatshockpineapple-portfolio/', 
  // *************************
  output: 'static',
  build: {
    format: 'file'
  }
});