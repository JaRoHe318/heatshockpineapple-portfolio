// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://portfolio.heatshockpineapple.com',
  output: 'static',
  build: {
    format: 'file'
  }
});