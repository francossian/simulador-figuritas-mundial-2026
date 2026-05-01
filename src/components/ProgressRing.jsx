const SIZE = 120
const STROKE = 10
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R

export default function ProgressRing({ percent }) {
  const filled = (percent / 100) * CIRC
  const pctDisplay = percent < 100 ? percent.toFixed(1) + '%' : '100%'

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        stroke="var(--surface-3)"
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${CIRC}`}
        strokeDashoffset={CIRC * 0.25}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--blue)" />
          <stop offset="50%" stopColor="var(--sky)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <text
        x={SIZE / 2}
        y={SIZE / 2 - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="17"
        fontWeight="900"
        className="ring-text-pct"
      >
        {pctDisplay}
      </text>
      <text
        x={SIZE / 2}
        y={SIZE / 2 + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        className="ring-text-label"
      >
        completado
      </text>
    </svg>
  )
}
