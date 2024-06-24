import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/TBA2024/' : '/',
	plugins: [sveltekit()]
});
