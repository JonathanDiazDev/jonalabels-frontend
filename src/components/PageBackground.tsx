import { cloudinaryImage } from '../config/cloudinary'

export const LIGHT_BG_URL =
  'https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg'

export const DARK_BG_URL =
  'https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg'

export default function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <img
        src={cloudinaryImage(LIGHT_BG_URL, 'background')}
        alt=""
        decoding="async"
        loading="lazy"
        fetchPriority="low"
        className="h-full w-full object-cover dark:hidden"
      />
      <img
        src={cloudinaryImage(DARK_BG_URL, 'background')}
        alt=""
        decoding="async"
        loading="lazy"
        fetchPriority="low"
        className="hidden h-full w-full object-cover dark:block"
      />
    </div>
  )
}
