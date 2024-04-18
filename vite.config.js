import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()]
		}
	},
	plugins: [vue(), svgLoader()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
