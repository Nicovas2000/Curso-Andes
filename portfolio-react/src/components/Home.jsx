import { Link } from 'react-router';
function Home() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Bienvenido a Mi Portfolio</h1>
            <p>Desarrollador Frontend especializado en React</p>
            <div>
                <Link to="/perfil/ana-developer">Ver mi perfil</Link>
                <br />
                <Link to="/detalles/ecommerce-react">Ver mis proyectos</Link>
            </div>
        </div>
    );
}
export default Home;