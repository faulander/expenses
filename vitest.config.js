import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'build', '.svelte-kit', 'src']
  }
});