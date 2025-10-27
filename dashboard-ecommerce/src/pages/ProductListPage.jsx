// src/pages/ProductListPage.jsx
import { useState, useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";

function ProductListPage() {
  const { products = [], setProducts, loading, error } = useOutletContext();

  // --- Filtros/orden ---
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("none"); // none | asc | desc

  // Categorías dinámicas (derivadas de los datos)
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  // Aplicar filtros y orden
  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : [];

    // Buscar por nombre
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => (p.title || "").toLowerCase().includes(q));
    }

    // Filtro por categoría
    if (category !== "Todos") {
      list = list.filter(p => p.category === category);
    }

    // Orden por precio
    if (sort === "asc") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "desc") list.sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [products, search, category, sort]);

  // Eliminar
  const handleDelete = (id) => {
    if (!window.confirm("¿Deseas eliminar este producto?")) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Estados de carga/error
  if (loading) return <div className="loader-container">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <h2 className="page-title">Productos</h2>

      {/* FILTROS */}
      <div className="filters-row" style={{ marginBottom: "16px" }}>
        <input
          className="form-control"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="form-control"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="none">Sin orden</option>
          <option value="asc">Precio ↑</option>
          <option value="desc">Precio ↓</option>
        </select>
      </div>

      {/* TABLA */}
      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-thumbnail"
                    style={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <Link className="btn-edit" to={`/edit/${product.id}`}>
                      Editar
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "1rem", textAlign: "center", opacity: 0.7 }}>
                  No se encontraron productos con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductListPage;
