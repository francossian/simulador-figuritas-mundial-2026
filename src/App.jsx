import { useReducer, useCallback } from 'react'
import StartScreen from './components/StartScreen'
import Dashboard from './components/Dashboard'
import { TOTAL_STICKERS, PACK_SIZE, PACK_COST, ALBUM_COST } from './constants'

function generatePack() {
  const pack = []
  for (let i = 0; i < PACK_SIZE; i++) {
    pack.push(Math.floor(Math.random() * TOTAL_STICKERS) + 1)
  }
  return pack
}

const initialState = {
  phase: 'start',
  stickerCounts: new Array(TOTAL_STICKERS + 1).fill(0),
  totalCost: 0,
  lastPack: [],
  chartPoints: [],
  packsOpened: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'BUY_ALBUM':
      return { ...state, phase: 'sim', totalCost: ALBUM_COST }

    case 'BUY_PACKS': {
      const { count } = action
      const counts = [...state.stickerCounts]
      let lastPack = state.lastPack
      const newPoints = []

      for (let p = 0; p < count; p++) {
        const raw = generatePack()
        const packWithMeta = raw.map(n => {
          const isNew = counts[n] === 0
          counts[n]++
          return { number: n, isNew }
        })

        const packNum = state.packsOpened + p + 1
        const owned = counts.reduce((acc, c, i) => (i > 0 && c > 0 ? acc + 1 : acc), 0)

        if (packNum <= 100 || packNum % 3 === 0) {
          newPoints.push({ pack: packNum, owned })
        }

        if (p === count - 1) lastPack = packWithMeta
      }

      return {
        ...state,
        stickerCounts: counts,
        totalCost: state.totalCost + PACK_COST * count,
        lastPack,
        chartPoints: [...state.chartPoints, ...newPoints],
        packsOpened: state.packsOpened + count,
      }
    }

    case 'AUTO_COMPLETE': {
      const counts = [...state.stickerCounts]
      let packsAdded = 0
      let lastPack = state.lastPack
      const newPoints = []

      while (true) {
        const owned = counts.reduce((acc, c, i) => (i > 0 && c > 0 ? acc + 1 : acc), 0)
        if (owned >= TOTAL_STICKERS) break

        const raw = generatePack()
        const packWithMeta = raw.map(n => {
          const isNew = counts[n] === 0
          counts[n]++
          return { number: n, isNew }
        })

        packsAdded++
        const packNum = state.packsOpened + packsAdded
        const ownedAfter = counts.reduce((acc, c, i) => (i > 0 && c > 0 ? acc + 1 : acc), 0)

        if (packNum <= 100 || packsAdded % 5 === 0) {
          newPoints.push({ pack: packNum, owned: ownedAfter })
        }

        lastPack = packWithMeta
      }

      return {
        ...state,
        stickerCounts: counts,
        totalCost: state.totalCost + PACK_COST * packsAdded,
        lastPack,
        chartPoints: [...state.chartPoints, ...newPoints],
        packsOpened: state.packsOpened + packsAdded,
      }
    }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const buyAlbum = useCallback(() => dispatch({ type: 'BUY_ALBUM' }), [])
  const buyPacks = useCallback((count) => dispatch({ type: 'BUY_PACKS', count }), [])
  const autoComplete = useCallback(() => dispatch({ type: 'AUTO_COMPLETE' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const { phase, stickerCounts, totalCost, lastPack, chartPoints, packsOpened } = state

  const owned = stickerCounts.reduce((acc, c, i) => (i > 0 && c > 0 ? acc + 1 : acc), 0)
  const missing = TOTAL_STICKERS - owned
  const totalStickersReceived = packsOpened * PACK_SIZE
  const duplicates = totalStickersReceived - owned
  const percentComplete = (owned / TOTAL_STICKERS) * 100
  const isComplete = owned >= TOTAL_STICKERS

  if (phase === 'start') {
    return <StartScreen onBuyAlbum={buyAlbum} />
  }

  return (
    <Dashboard
      totalCost={totalCost}
      owned={owned}
      missing={missing}
      duplicates={duplicates}
      percentComplete={percentComplete}
      packsOpened={packsOpened}
      lastPack={lastPack}
      chartPoints={chartPoints}
      isComplete={isComplete}
      onBuyPacks={buyPacks}
      onAutoComplete={autoComplete}
      onReset={reset}
    />
  )
}
