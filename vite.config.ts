import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    headers: securityHeaders,
  },
})
