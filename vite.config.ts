import { execFileSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Date the content last changed (YYYY-MM-DD): the last commit touching the texts in
 * src/i18n/locales. Falls back to the build date without git (e.g. a tarball), and is never
 * later than the build date. In CI the checkout is shallow, so it is the date of the commit
 * being built. Shown on the résumé ("Updated …") and used as dateModified and sitemap lastmod.
 */
function contentDate(): string {
  const today = new Date().toISOString().slice(0, 10)
  try {
    const committed = execFileSync('git', ['log', '-1', '--format=%cI', '--', 'src/i18n/locales'], {
      cwd: import.meta.dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .trim()
      .slice(0, 10)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(committed)) return today
    return committed > today ? today : committed
  } catch {
    return today
  }
}

// https://vite.dev/config/
// BASE_PATH comes from GitHub Pages (empty with a custom domain, "/<repo>/" without one).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  // The lazy PostHog chunk (posthog-js + replay recorder, src/lib/posthog.ts) is ~510 kB
  // minified; it loads after the page is idle, so it doesn't need the default 500 kB warning.
  build: { chunkSizeWarningLimit: 600 },
  // A build-time constant, identical in the client and SSR bundles, so hydration matches.
  define: { __CONTENT_DATE__: JSON.stringify(contentDate()) },
})
