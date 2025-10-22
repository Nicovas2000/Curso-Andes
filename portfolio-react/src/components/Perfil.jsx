import { useParams } from 'react-router';
function Perfil() {
    const { id } = useParams();
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Perfil de Usuario</h1>
            <p>ID del usuario: <strong>{id}</strong></p>
            <div>
                <h3>Información Personal</h3>
                <p>Nombre: {id.replace('-', ' ')}</p>
                <p>Especialidad: React Developer</p>
            </div>
        </div>
    );
}
export default Perfil