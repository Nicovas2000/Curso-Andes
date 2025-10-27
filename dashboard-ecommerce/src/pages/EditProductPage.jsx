// src/pages/EditProductPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function EditProductPage() {
  const { productId } = useParams();
  const { setProducts } = useOutletContext();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  // Fetch individual product
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProductData(data);
    }
    fetchProduct();
  }, [productId]);

  const handleUpdate = (formData) => {
    setProducts(prev =>
      prev.map(p => p.id === Number(productId) ? { ...p, ...formData } : p)
    );
    navigate("/");
  };

  if (!productData) return <div>Cargando datos del producto...</div>;

  return <ProductForm initialData={productData} onSubmit={handleUpdate} />;
}

export default EditProductPage;
