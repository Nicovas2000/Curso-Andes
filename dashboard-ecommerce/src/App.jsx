// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductListPage from "./pages/ProductListPage";
import NewProductPage from "./pages/NewProductPage";
import EditProductPage from "./pages/EditProductPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar desde localStorage si existe
useEffect(() => {
  const saved = localStorage.getItem("products");
  if (saved) {
    setProducts(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  if (products.length > 0) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}, [products]);

  // Cargar productos desde la API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              context={{ products, setProducts, loading, error }}
            />
          }
        >
          <Route index element={<ProductListPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="new" element={<NewProductPage />} />
          <Route path="edit/:productId" element={<EditProductPage />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
