import { TOTAL_STICKERS, PACK_SIZE, PACK_COST, ALBUM_COST, formatCurrency, expectedPacks } from '../constants'

const EXP_PACKS = expectedPacks()
const EXP_COST = formatCurrency(ALBUM_COST + EXP_PACKS * PACK_COST)

export default function StartScreen({ onBuyAlbum }) {
  return (
    <div className="start-screen">
      <div className="start-badge">FIFA World Cup 2026™</div>

      <h1 className="start-title">Simulador de<br />Álbum de Figuritas</h1>
      <p className="start-subtitle">¿Cuánto te va a salir completarlo?</p>

      <div className="start-stats">
        <div className="start-stat">
          <div className="start-stat-value">{TOTAL_STICKERS}</div>
          <div className="start-stat-label">Figuritas totales</div>
        </div>
        <div className="start-stat">
          <div className="start-stat-value">{PACK_SIZE}</div>
          <div className="start-stat-label">Por paquete</div>
        </div>
        <div className="start-stat">
          <div className="start-stat-value">{formatCurrency(PACK_COST)}</div>
          <div className="start-stat-label">Por paquete</div>
        </div>
        <div className="start-stat">
          <div className="start-stat-value">{formatCurrency(ALBUM_COST)}</div>
          <div className="start-stat-label">El álbum</div>
        </div>
      </div>

      <p className="start-description">
        Cada paquete trae <strong>{PACK_SIZE} figuritas aleatorias</strong> con igual probabilidad (1/{TOTAL_STICKERS}).
        El álbum del Mundial USA·Canadá·México 2026 tiene <strong>{TOTAL_STICKERS} figuritas</strong>.
        Comprá paquete a paquete y mirá cómo se llena tu álbum.
      </p>

      <button className="btn-buy-album" onClick={onBuyAlbum}>
        Comprar Álbum
        <span className="btn-buy-album-sub">{formatCurrency(ALBUM_COST)} · ¡A completarlo!</span>
      </button>

      <p className="start-expected">
        Según la matemática del coleccionista, se necesitan en promedio{' '}
        <span>~{EXP_PACKS.toLocaleString('es-AR')} paquetes</span> para completar el álbum
        (costo estimado: <span>{EXP_COST}</span>).
      </p>
    </div>
  )
}
