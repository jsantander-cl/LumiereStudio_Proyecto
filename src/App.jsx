import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Agenda from './pages/Agenda'
import AdminLogin from './pages/AdminLogin'
import AdminReservas from './pages/AdminReservas'

export default function App() {
  return (
    <div className="bg-[var(--color-abrow-cream)] min-h-screen text-[var(--color-abrow-dark)]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/reservas" element={<AdminReservas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}