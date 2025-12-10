// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://heatshockpineapple.com',
  // *** DELETE THIS LINE ***
  // base: '/heatshockpineapple-portfolio/', 
  // *************************
  output: 'static',
  build: {
    format: 'file'
  }
});