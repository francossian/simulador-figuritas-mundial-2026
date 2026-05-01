export default function KPICard({ label, value, sub, className }) {
  return (
    <div className={`kpi-card ${className ?? ''}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}
