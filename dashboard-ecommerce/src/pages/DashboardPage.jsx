// src/pages/DashboardPage.jsx
import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";

// ✅ Registro ÚNICO y completo de Chart.js (incluye escalas necesarias)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

function DashboardPage() {
  const { products = [] } = useOutletContext() || {};

  // 🔒 Fallbacks seguros para evitar crashes si no hay datos
  const safeProducts = Array.isArray(products) ? products : [];
  const hasData = safeProducts.length > 0;

  // 🧮 KPIs (memoizados para rendimiento)
  const { categories, labels, counts, avgPrice } = useMemo(() => {
    const cats = safeProducts.reduce((acc, p) => {
      const key = p?.category ?? "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const lbls = Object.keys(cats);
    const vals = Object.values(cats);
    const avg =
      safeProducts.length > 0
        ? (safeProducts.reduce((acc, p) => acc + Number(p?.price || 0), 0) / safeProducts.length).toFixed(2)
        : "0.00";

    return { categories: cats, labels: lbls, counts: vals, avgPrice: avg };
  }, [safeProducts]);

  // 📊 Datos y opciones Chart.js (memoizados)
  const barData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Productos por categoría",
          data: counts,
          backgroundColor: "#007bff",
          borderRadius: 6,
        },
      ],
    }),
    [labels, counts]
  );

  const pieData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Distribución",
          data: counts,
          backgroundColor: ["#007bff", "#dc3545", "#ffc107", "#28a745", "#6c757d", "#17a2b8"],
        },
      ],
    }),
    [labels, counts]
  );

  const commonOpts = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // 👈 evita problemas de re-render
      plugins: {
        legend: { position: "top" },
        title: { display: false },
        tooltip: { enabled: true },
      },
    }),
    []
  );

  // 🧹 Claves estables para forzar remount limpio SOLO cuando cambia el dataset
  const barKey = useMemo(() => `bar-${labels.join("|")}-${counts.join("|")}`, [labels, counts]);
  const pieKey = useMemo(() => `pie-${labels.join("|")}-${counts.join("|")}`, [labels, counts]);

  return (
    <>
      <h2 className="page-title">Dashboard de métricas</h2>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(180px, 1fr))",
          gap: "1rem",
          margin: "1.5rem 0",
        }}
      >
        <div className="card">
          <h3>Total Productos</h3>
          <p style={{ fontSize: 24, fontWeight: 700 }}>{safeProducts.length}</p>
        </div>

        <div className="card">
          <h3>Categorías</h3>
          <p style={{ fontSize: 24, fontWeight: 700 }}>{Object.keys(categories).length}</p>
        </div>

        <div className="card">
          <h3>Precio Promedio</h3>
          <p style={{ fontSize: 24, fontWeight: 700 }}>${avgPrice}</p>
        </div>
      </div>

      {/* Si no hay datos, mostramos un mensaje amable */}
      {!hasData ? (
        <div className="card">
          <p>No hay datos suficientes para generar gráficos todavía.</p>
          <p style={{ opacity: 0.8 }}>Agrega productos o vuelve a la lista para cargar desde la API.</p>
        </div>
      ) : (
        // Gráficos
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="card" style={{ height: 360 }}>
            <Bar key={barKey} data={barData} options={{ ...commonOpts, plugins: { ...commonOpts.plugins, title: { display: true, text: "Productos por categoría" } } }} />
          </div>

          <div className="card" style={{ height: 360 }}>
            <Pie key={pieKey} data={pieData} options={{ ...commonOpts, plugins: { ...commonOpts.plugins, title: { display: true, text: "Distribución de categorías" } } }} />
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
