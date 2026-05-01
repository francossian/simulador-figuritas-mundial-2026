export default function LastPack({ stickers }) {
  const newCount = stickers.filter(s => s.isNew).length

  return (
    <div className="last-pack-section">
      <div className="section-title">Último paquete</div>

      {stickers.length === 0 ? (
        <div className="last-pack-empty">Todavía no compraste ningún paquete</div>
      ) : (
        <>
          <div className="last-pack-grid">
            {stickers.map((s, i) => (
              <div
                key={i}
                className={`sticker-card ${s.isNew ? 'is-new' : 'is-dupe'}`}
              >
                <div className="sticker-number">
                  {String(s.number).padStart(3, '0')}
                </div>
                <div className="sticker-tag">
                  {s.isNew ? '¡NUEVA!' : 'Repetida'}
                </div>
              </div>
            ))}
          </div>
          <div className="pack-summary">
            {newCount === 0
              ? 'Todas repetidas — ¡qué mala suerte!'
              : newCount === stickers.length
                ? '¡Todas nuevas! Excelente paquete.'
                : `${newCount} nueva${newCount !== 1 ? 's' : ''}, ${stickers.length - newCount} repetida${stickers.length - newCount !== 1 ? 's' : ''}`}
          </div>
        </>
      )}
    </div>
  )
}
