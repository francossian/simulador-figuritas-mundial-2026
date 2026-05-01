import { TOTAL_STICKERS } from '../constants'

const W = 700
const H = 180
const PAD = { top: 12, right: 16, bottom: 28, left: 44 }
const CW = W - PAD.left - PAD.right
const CH = H - PAD.top - PAD.bottom

const MILESTONES = [
  { owned: TOTAL_STICKERS * 0.25, label: '25%' },
  { owned: TOTAL_STICKERS * 0.5,  label: '50%' },
  { owned: TOTAL_STICKERS * 0.75, label: '75%' },
  { owned: TOTAL_STICKERS,        label: '100%' },
]

export default function HistoryChart({ points }) {
  if (points.length < 2) {
    return (
      <div className="chart-section">
        <div className="section-title">Progreso del álbum</div>
        <div className="chart-empty">Comprá paquetes para ver la curva de progreso</div>
      </div>
    )
  }

  const maxPack = points[points.length - 1].pack
  const sx = (pack) => (pack / maxPack) * CW
  const sy = (owned) => CH - (owned / TOTAL_STICKERS) * CH

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.pack).toFixed(1)},${sy(p.owned).toFixed(1)}`)
    .join(' ')

  const xTicks = buildXTicks(maxPack)

  return (
    <div className="chart-section">
      <div className="section-title">Figuritas pegadas vs. paquetes comprados</div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="60%" stopColor="var(--sky)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect x={0} y={0} width={CW} height={CH} />
          </clipPath>
        </defs>

        <g transform={`translate(${PAD.left},${PAD.top})`}>
          {MILESTONES.map(m => (
            <g key={m.label}>
              <line
                x1={0} y1={sy(m.owned).toFixed(1)}
                x2={CW} y2={sy(m.owned).toFixed(1)}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={-6}
                y={sy(m.owned)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="9"
                fill="var(--text-dim)"
                fontFamily="Inter, sans-serif"
              >
                {m.label}
              </text>
            </g>
          ))}

          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinejoin="round"
            clipPath="url(#chartClip)"
          />

          <line x1={0} y1={0} x2={0} y2={CH} stroke="var(--border)" strokeWidth="1" />
          <line x1={0} y1={CH} x2={CW} y2={CH} stroke="var(--border)" strokeWidth="1" />

          {xTicks.map(t => (
            <g key={t} transform={`translate(${sx(t)},${CH})`}>
              <line y1={0} y2={4} stroke="var(--border)" strokeWidth="1" />
              <text
                y={14}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-dim)"
                fontFamily="Inter, sans-serif"
              >
                {t}
              </text>
            </g>
          ))}

          <text
            x={CW / 2}
            y={CH + 25}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-dim)"
            fontFamily="Inter, sans-serif"
          >
            Paquetes comprados
          </text>
        </g>
      </svg>
    </div>
  )
}

function buildXTicks(maxPack) {
  const TARGET = 6
  const raw = maxPack / TARGET
  const step = Math.max(1, Math.pow(10, Math.round(Math.log10(raw))))
  const ticks = []
  for (let t = step; t < maxPack; t += step) ticks.push(Math.round(t))
  ticks.push(maxPack)
  return [...new Set(ticks)]
}
