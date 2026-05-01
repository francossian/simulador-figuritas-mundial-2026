import { TOTAL_STICKERS, formatCurrency } from "../constants";
import KPICard from "./KPICard";
import ProgressRing from "./ProgressRing";
import HistoryChart from "./HistoryChart";
import LastPack from "./LastPack";

export default function Dashboard({
  totalCost,
  owned,
  missing,
  duplicates,
  percentComplete,
  packsOpened,
  lastPack,
  chartPoints,
  isComplete,
  onBuyPacks,
  onAutoComplete,
  onReset,
}) {
  const milestones = [25, 50, 75, 100];

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="dash-title">
          Álbum <span>Mundial 2026</span>
        </div>
        <button className="btn-reset" onClick={onReset}>
          Empezar de cero
        </button>
      </header>

      {isComplete && (
        <div className="completed-banner">
          <h2>¡Álbum completado!</h2>
          <p>
            Compraste {packsOpened.toLocaleString("es-AR")} paquetes y gastaste{" "}
            {formatCurrency(totalCost)} para terminar el álbum.
          </p>
        </div>
      )}

      <div className="kpi-grid">
        <KPICard
          className="kpi-cost"
          label="Gasto total"
          value={formatCurrency(totalCost)}
          sub={`${packsOpened.toLocaleString("es-AR")} paquete${packsOpened !== 1 ? "s" : ""}`}
        />
        <KPICard
          className="kpi-owned"
          label="Figuritas pegadas"
          value={owned.toLocaleString("es-AR")}
          sub={`de ${TOTAL_STICKERS}`}
        />
        <KPICard
          className="kpi-missing"
          label="Figuritas faltantes"
          value={missing.toLocaleString("es-AR")}
          sub={missing === 0 ? "¡Álbum completo!" : `faltan ${missing}`}
        />
        <KPICard
          className="kpi-dupes"
          label="Figuritas repetidas"
          value={duplicates.toLocaleString("es-AR")}
          sub={
            packsOpened > 0
              ? `${((duplicates / (packsOpened * 7)) * 100).toFixed(1)}% del total`
              : "—"
          }
        />
      </div>

      <div className="dash-main">
        <div className="progress-section">
          <div className="progress-ring-wrap">
            <ProgressRing percent={percentComplete} />
          </div>
          <div className="progress-info">
            <div className="progress-label">Progreso del álbum</div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <div className="progress-milestones">
              {milestones.map((m) => (
                <span
                  key={m}
                  className={`milestone ${percentComplete >= m ? "reached" : ""}`}
                >
                  {m}%
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button
            className="btn-primary"
            onClick={() => onBuyPacks(1)}
            disabled={isComplete}
          >
            Comprar paquete · {formatCurrency(2000)}
          </button>

          <div className="btn-secondary-row">
            <button
              className="btn-secondary"
              onClick={() => onBuyPacks(10)}
              disabled={isComplete}
            >
              × 10 paquetes
            </button>
            <button
              className="btn-secondary"
              onClick={() => onBuyPacks(50)}
              disabled={isComplete}
            >
              × 50 paquetes
            </button>
          </div>

          <button
            className="btn-autocomplete"
            onClick={onAutoComplete}
            disabled={isComplete}
          >
            Completar álbum automáticamente
          </button>
        </div>

        <HistoryChart points={chartPoints} />

        <LastPack stickers={lastPack} />
      </div>

      <footer className="dash-footer">
        Desarrollado por{" "}
        <a
          href="https://www.linkedin.com/in/fguiragossian"
          target="_blank"
          rel="noreferrer"
        >
          Franco Guiragossian
        </a>
      </footer>
    </div>
  );
}
