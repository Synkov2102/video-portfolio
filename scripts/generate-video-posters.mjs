import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'

const __dirname = dirname(fileURLToPath(import.meta.url))
const videoDir = join(__dirname, '../src/assets/video')
const posterDir = join(videoDir, 'posters')

if (!ffmpegPath) {
  console.error('ffmpeg-static: бинарник не найден для этой платформы')
  process.exit(1)
}

mkdirSync(posterDir, { recursive: true })

const stems = new Set()

for (const file of readdirSync(videoDir)) {
  if (!/\.webm$/i.test(file)) continue
  stems.add(basename(file, extname(file)))
}

for (const stem of [...stems].sort()) {
  const source = join(videoDir, `${stem}.webm`)
  if (!existsSync(source)) continue

  const out = join(posterDir, `${stem}.webp`)
  if (existsSync(out)) {
    console.log(`skip ${stem}.webp`)
    continue
  }

  console.log(`poster ${stem}`)
  execFileSync(ffmpegPath, [
    '-y',
    '-i',
    source,
    '-ss',
    '00:00:00.500',
    '-vframes',
    '1',
    '-q:v',
    '75',
    out,
  ])
}

console.log('done')
