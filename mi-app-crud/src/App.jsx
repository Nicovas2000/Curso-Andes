import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ListaUsuarios from './components/ListaUsuarios';
import FormularioUsuario from './components/FormularioUsuario';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana García', correo: 'ana@email.com' },
    { id: 2, nombre: 'Carlos López', correo: 'carlos@email.com' }
  ]);

  const agregarUsuario = (usuario) => {
    setUsuarios([...usuarios, { ...usuario, id: Date.now() }]);
  };

  const actualizarUsuario = (id, usuarioActualizado) => {
    setUsuarios(usuarios.map(u => (u.id === id ? usuarioActualizado : u)));
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <h1>Gestión de Usuarios</h1>
        <Routes>
          <Route path="/" element={<ListaUsuarios usuarios={usuarios} eliminarUsuario={eliminarUsuario} />} />
          <Route path="/crear" element={<FormularioUsuario onSubmit={agregarUsuario} />} />
          <Route path="/editar/:id" element={<FormularioUsuario onSubmit={actualizarUsuario} usuarios={usuarios} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;