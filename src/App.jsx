import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <div className="bg-[var(--color-abrow-cream)] min-h-screen text-[var(--color-abrow-dark)]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}