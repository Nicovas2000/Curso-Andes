// src/pages/NewProductPage.jsx
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function NewProductPage() {
  const { setProducts } = useOutletContext();
  const navigate = useNavigate();

  const handleCreate = (formData) => {
    const newProduct = {
      ...formData,
      id: Date.now(),
      thumbnail: "https://placehold.co/100x100"
    };

    setProducts(prev => [newProduct, ...prev]);
    navigate("/");
  };

  return (
    <ProductForm
      initialData={{ title: "", description: "", price: 0, category: "" }}
      onSubmit={handleCreate}
    />
  );
}

export default NewProductPage;
