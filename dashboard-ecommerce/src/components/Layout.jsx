import { NavLink, Outlet } from "react-router-dom";
import { FiHome, FiBox, FiPlus } from "react-icons/fi";

function Layout({ context }) {
  return (
    <div className="layout-container">

      {/* TOPBAR */}
      <header className="topbar">
        <div className="logo">InventarioPro</div>
      </header>

      <div className="layout-body">

        {/* SIDEBAR */}
        <nav className="sidebar">
          <NavLink to="/dashboard"><FiHome /> Dashboard</NavLink>
          <NavLink to="/"><FiBox /> Productos</NavLink>
          <NavLink to="/new"><FiPlus /> Añadir Producto</NavLink>
        </nav>

        {/* CONTENT */}
        <main className="content">
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}

export default Layout;
