import { describe, expect, it } from 'vitest'
import { cloudinaryImage, cloudinaryVideo } from './cloudinary'

describe('cloudinaryImage', () => {
  it('inserts transforms for Cloudinary image URLs', () => {
    const url =
      'https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg'

    expect(cloudinaryImage(url, 'hero')).toBe(
      'https://res.cloudinary.com/oisispbh/image/upload/f_auto,q_auto,w_1920/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg',
    )
  })

  it('leaves non-Cloudinary URLs unchanged', () => {
    const url = 'https://images.unsplash.com/photo-123'
    expect(cloudinaryImage(url)).toBe(url)
  })
})

describe('cloudinaryVideo', () => {
  it('inserts video transforms', () => {
    const url = 'https://res.cloudinary.com/oisispbh/video/upload/v1784917112/0724_njhd6w.mp4'

    expect(cloudinaryVideo(url)).toBe(
      'https://res.cloudinary.com/oisispbh/video/upload/q_auto,w_1280/v1784917112/0724_njhd6w.mp4',
    )
  })
})
