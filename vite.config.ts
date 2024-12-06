/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import pluginAPIRoutes from 'vite-plugin-api-routes'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), pluginAPIRoutes()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: '.vitest/setup',
        include: ['**/*.test.{ts,tsx}']
    }
})
