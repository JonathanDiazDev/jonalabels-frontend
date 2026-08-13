type ImagePreset = 'background' | 'hero' | 'card' | 'thumb'

const WIDTH_BY_PRESET: Record<ImagePreset, number> = {
  background: 1400,
  hero: 1920,
  card: 800,
  thumb: 600,
}

/** Insert Cloudinary transforms after `/upload/`. No-op for non-Cloudinary URLs. */
export function cloudinaryImage(url: string, preset: ImagePreset = 'card'): string {
  if (!url.includes('res.cloudinary.com/oisispbh/image/upload/')) return url

  const width = WIDTH_BY_PRESET[preset]
  const transforms = `f_auto,q_auto,w_${width}`
  return url.replace('/upload/', `/upload/${transforms}/`)
}

export function cloudinaryVideo(url: string): string {
  if (!url.includes('res.cloudinary.com/oisispbh/video/upload/')) return url

  return url.replace('/upload/', '/upload/q_auto,w_1280/')
}
