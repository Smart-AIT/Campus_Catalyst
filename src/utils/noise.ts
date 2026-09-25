/** Paints a small tile of random luminance noise once and exposes it as a CSS
 *  variable (--noise). Every grain overlay on the page reuses this one tile. */
export function installNoise(size = 160) {
  if (typeof document === 'undefined') return
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) return
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  document.documentElement.style.setProperty('--noise', `url(${c.toDataURL('image/png')})`)
}
