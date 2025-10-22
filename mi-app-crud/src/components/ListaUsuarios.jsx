import React from 'react';
import { Link } from 'react-router-dom';
import './ListaUsuarios.css'; 

function ListaUsuarios({ usuarios, eliminarUsuario }) {
  return (
    <div className="lista-usuarios">
      <h2>Lista de Usuarios</h2>
      <Link to="/crear" className="crear-usuario">Crear Nuevo Usuario</Link>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="usuario-card">
            <div className="user-info">
              <div className="nombre">{usuario.nombre}</div>
              <div className="correo">{usuario.correo}</div>
            </div>
            <div className="user-actions">
              <Link to={`/editar/${usuario.id}`}>
                <button className="editar">Editar</button>
              </Link>
              <button className="eliminar" onClick={() => eliminarUsuario(usuario.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;