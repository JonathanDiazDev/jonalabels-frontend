interface FixedBackgroundProps {
  className?: string
}

export const LIGHT_BG_URL =
  'https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg'

export const DARK_BG_URL =
  'https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg'

export default function FixedBackground({ className = '' }: FixedBackgroundProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <img
        src={LIGHT_BG_URL}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover dark:hidden"
      />
      <img
        src={DARK_BG_URL}
        alt=""
        loading="lazy"
        decoding="async"
        className="hidden h-full w-full object-cover dark:block"
      />
    </div>
  )
}
