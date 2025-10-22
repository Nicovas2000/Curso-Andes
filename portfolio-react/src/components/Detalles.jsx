import { useParams, Link } from 'react-router';
function Detalles() {
    const { proyecto } = useParams();
    const proyectos = {
        'ecommerce-react': 'Tienda Online con React y Redux',
        'portfolio-personal': 'Portfolio Personal Responsivo',
        'blog-gatsby': 'Blog Estático con Gatsby'
    };
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Detalles del Proyecto</h1>
            <h2>{proyectos[proyecto] || 'Proyecto no encontrado'}</h2>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}
export default Detalles