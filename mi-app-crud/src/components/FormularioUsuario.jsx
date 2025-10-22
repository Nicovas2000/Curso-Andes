import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FormularioUsuario.css';

function FormularioUsuario({ onSubmit, usuarios }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    if (id) {
      const usuarioEncontrado = usuarios.find(u => u.id === Number(id));
      if (usuarioEncontrado) {
        setNombre(usuarioEncontrado.nombre);
        setCorreo(usuarioEncontrado.correo);
      }
    }
  }, [id, usuarios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = { nombre, correo };
    if (id) {
      onSubmit(Number(id), usuario);
    } else {
      onSubmit(usuario);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <button type="submit">{id ? 'Guardar Cambios' : 'Crear Usuario'}</button>
      </form>
    </div>
  );
}

export default FormularioUsuario;