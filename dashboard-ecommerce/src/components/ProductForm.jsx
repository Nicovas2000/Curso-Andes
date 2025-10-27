// src/components/ProductForm.jsx
import { useEffect, useState } from "react";

function ProductForm({ initialData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div className="form-group">
        <label>Título</label>
        <input name="title" className="form-control" value={formData.title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea name="description" className="form-control" value={formData.description} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input name="price" type="number" className="form-control" value={formData.price} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input name="category" className="form-control" value={formData.category} onChange={handleChange}/>
      </div>

      <button disabled={isLoading} className="btn-save">
        Guardar
      </button>
    </form>
  );
}

export default ProductForm;
