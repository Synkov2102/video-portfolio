const clipLoaders = import.meta.glob('../../../assets/video/*.webm')

const posterModules = import.meta.glob('../../../assets/video/posters/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function fileStem(filePath) {
  const name = filePath.split('/').pop() ?? filePath
  return name.replace(/\.(webm|jpe?g|png|webp)$/i, '')
}

function posterByStem(stem) {
  for (const [path, url] of Object.entries(posterModules)) {
    if (fileStem(path) === stem) return url
  }
  return undefined
}

async function resolveAssetUrl(loader) {
  const mod = await loader()
  const url = mod?.default ?? mod
  if (typeof url !== 'string') {
    throw new TypeError('Expected video URL string from asset import')
  }
  return url
}

/**
 * Локальные ролики (webm) из `src/assets/video`.
 * `cover` — превью в сетке (posters/*.webp).
 * `loadSrc` — ленивый импорт: видео скачивается только при открытии плеера.
 */
export const videos = Object.keys(clipLoaders)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => {
    const stem = fileStem(path)
    const loader = clipLoaders[path]

    return {
      id: `clip-${stem}`,
      title: `Ролик · ${stem}`,
      cover: posterByStem(stem),
      loadSrc: () => resolveAssetUrl(loader),
    }
  })
