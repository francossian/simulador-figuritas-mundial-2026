export const TOTAL_STICKERS = 980
export const PACK_SIZE = 7
export const PACK_COST = 2000
export const ALBUM_COST = 15000

export function formatCurrency(n) {
  return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function expectedPacks() {
  let harmonic = 0
  for (let i = 1; i <= TOTAL_STICKERS; i++) harmonic += 1 / i
  return Math.round((TOTAL_STICKERS * harmonic) / PACK_SIZE)
}
