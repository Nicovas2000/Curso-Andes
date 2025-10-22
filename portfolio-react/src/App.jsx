import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Perfil from './components/Perfil';
import Detalles from './components/Detalles';

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/detalles/:proyecto" element={<Detalles />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
