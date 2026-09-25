import { memo, useState, type CSSProperties } from 'react'
import { IMAGES, type ImageKey } from '../data/event'
import { Scene } from './Scene'

/* Real photographs placed in src/assets/photos are picked up automatically at
   build time (hashed, cached, no 404s). Any image not supplied falls back to
   its illustrated <Scene>. */
const files = import.meta.glob('../assets/photos/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byBase: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop()!.replace(/\.(webp|avif|jpe?g|png)$/, '')
  byBase[base] = url
}

export function photoUrl(key: ImageKey): string | undefined {
  return byBase[IMAGES[key].file.replace(/\.[a-z]+$/, '')]
}

type Props = {
  image: ImageKey
  className?: string
  /** eager-load (hero); everything else is lazy */
  priority?: boolean
  /** show a light leak on this print */
  leak?: 'tl' | 'tr' | 'bl' | 'br' | false
  /** metadata shown by the focus cursor */
  meta?: string
  sizes?: string
  style?: CSSProperties
  /** decorative prints don't need alt text repeated to screen readers */
  decorative?: boolean
}

export const Photo = memo(function Photo({ image, className = '', priority, leak = false, meta, style, decorative, sizes = '(max-width: 768px) 100vw, 50vw' }: Props) {
  const spec = IMAGES[image]
  const src = photoUrl(image)
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`photo ${loaded ? 'is-loaded' : ''} ${className}`}
      data-photo
      data-meta={meta ?? `${spec.caption.toUpperCase()} · ISO 400 · 1/125 · ƒ2.8`}
      style={style}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : spec.alt}
      aria-hidden={decorative || undefined}
    >
      <div className="photo__media">
        <Scene kind={spec.scene} className="photo__scene" />
        {src && (
          <img
            src={src}
            alt=""
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className="photo__img"
          />
        )}
      </div>
      {leak && <span className={`photo__leak photo__leak--${leak}`} aria-hidden="true" />}
      <span className="photo__dust" aria-hidden="true" />
      <span className="photo__grain" aria-hidden="true" />
    </div>
  )
})
