import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'dist')

const ROUTES = ['/', '/productos', '/nosotros', '/blog', '/cotizar', '/visualizar', '/privacidad', '/terminos', '/login']

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['node_modules/vite/bin/vite.js', 'preview', '--port', '4173', '--strictPort'],
      { cwd: root, stdio: 'ignore' },
    )
    const deadline = setTimeout(() => reject(new Error('vite preview no arrancó a tiempo')), 30000)

    const probe = () => {
      fetch('http://localhost:4173/')
        .then((res) => {
          if (res.ok) {
            clearTimeout(deadline)
            resolve(child)
          } else {
            probe()
          }
        })
        .catch(() => setTimeout(probe, 200))
    }
    probe()
  })
}

async function collectContent(url) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(
      () => {
        const el = document.getElementById('root')
        return el && el.textContent.trim().length > 40
      },
      undefined,
      { timeout: 20000 },
    )
    await page.waitForTimeout(800)
    return await page.content()
  } finally {
    await browser.close()
  }
}

function fileNameFor(route) {
  if (route === '/') return 'index.html'
  return `${route.replace(/^\//, '')}/index.html`
}

async function main() {
  if (!existsSync(join(outDir, 'index.html'))) {
    console.error('dist/ no tiene index.html. Ejecuta "vite build" antes del prerender.')
    process.exit(1)
  }

  console.log('> sirviendo dist/ en :4173')
  const server = await startPreviewServer()

  try {
    for (const route of ROUTES) {
      console.log(`> prerender ${route}`)
      const html = await collectContent(`http://localhost:4173${route}`)
      const file = join(outDir, fileNameFor(route))
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html, 'utf8')
    }

    await rm(join(outDir, '404.html'), { force: true })
    const notFound = await collectContent('http://localhost:4173/ruta-inexistente-prerender')
    await writeFile(join(outDir, '404.html'), notFound, 'utf8')

    const entries = (await readdir(outDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory())
      .filter((d) => d.name !== 'assets')
      .map((d) => `${d.name}/`)
      .join(' ')
    console.log(`> prerender completo: / ${entries}`)
  } finally {
    server.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
