import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const vscodeExtDir = path.join(os.homedir(), '.vscode', 'extensions')
const projectRoot = process.cwd()

const outputTs = path.join(projectRoot, 'src', 'mock', 'extensions.ts')
const iconOutputDir = path.join(projectRoot, 'public', 'extension-icons')

fs.mkdirSync(path.dirname(outputTs), { recursive: true })
fs.mkdirSync(iconOutputDir, { recursive: true })

const dirs = fs
  .readdirSync(vscodeExtDir)
  .filter((name) => !name.startsWith('.'))
  .map((name) => path.join(vscodeExtDir, name))
  .filter((p) => fs.statSync(p).isDirectory())

const extensions = []

for (const dir of dirs) {
  const pkgPath = path.join(dir, 'package.json')
  if (!fs.existsSync(pkgPath)) continue

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

  const id = `${pkg.publisher}.${pkg.name}`
  let icon = '/extension-icons/default.svg'

  if (pkg.icon) {
    const iconSource = path.join(dir, pkg.icon)
    const ext = path.extname(iconSource) || '.png'
    const safeName = id.replace(/[^a-zA-Z0-9.-]/g, '_') + ext
    const iconTarget = path.join(iconOutputDir, safeName)

    if (fs.existsSync(iconSource)) {
      fs.copyFileSync(iconSource, iconTarget)
      icon = `/extension-icons/${safeName}`
    }
  }

  extensions.push({
    id,
    name: pkg.displayName ?? pkg.name,
    publisher: pkg.publisher ?? 'Unknown',
    version: pkg.version ?? '0.0.0',
    description: pkg.description ?? '',
    categories: pkg.categories ?? [],
    icon,
    enabled: Math.random() > 0.45,
    favorite: Math.random() > 0.8,
    rating: Number((3.8 + Math.random() * 1.2).toFixed(1)),
    downloads: Math.floor(10000 + Math.random() * 50000000),
    size: `${(1 + Math.random() * 30).toFixed(1)} MB`,
    updatedAt: '2026-06-28',
  })
}

const content = `export type ExtensionStatus = "enabled" | "disabled";

export interface ExtensionItem {
  id: string;
  name: string;
  publisher: string;
  version: string;
  description: string;
  categories: string[];
  icon: string;
  enabled: boolean;
  favorite: boolean;
  rating: number;
  downloads: number;
  size: string;
  updatedAt: string;
}

export const mockExtensions: ExtensionItem[] = ${JSON.stringify(extensions, null, 2)};
`

fs.writeFileSync(outputTs, content)
console.log(`Generated ${extensions.length} extensions.`)
