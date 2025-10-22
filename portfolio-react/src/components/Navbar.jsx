import { NavLink } from 'react-router';
function Navbar() {
    return (
        <nav style={{ padding: '1rem', backgroundColor: '#8C98CA' }}>
            <NavLink
                to="/"
                style={({ isActive }) => ({
                    color: isActive ? 'white' : 'lightgray',
                })}
                end
            >
                Inicio
            </NavLink>
            <NavLink to="/perfil/123">Mi Perfil</NavLink>
            <NavLink to="/detalles/proyecto-web">Proyectos</NavLink>
        </nav>
    );
}
export default Navbar