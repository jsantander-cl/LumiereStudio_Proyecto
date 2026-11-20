import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Agenda from './pages/Agenda';
import AdminLogin from './pages/AdminLogin';
import AdminReservas from './pages/AdminReservas';
import ResetPassword from './pages/ResetPassword';
import Checkout from './pages/Checkout';
import InscripcionMasterClass from './pages/InscripcionMasterClass';
import GiftCardReveal from './pages/GiftCardReveal';
import CookieConsent from './components/CookieConsent';


export default function App() {
  const location = useLocation();

  // Ocultar Footer en rutas de administración o en la experiencia de Gift Card
  const esAdmin = location.pathname.startsWith('/admin');
  const esGiftCard = location.pathname.startsWith('/regalo');

  return (
    <div className="bg-[var(--color-abrow-cream)] min-h-screen text-[var(--color-abrow-dark)] flex flex-col justify-between">
      <div>
        <CookieConsent />
        {!esGiftCard && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/reservas" element={<AdminReservas />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/inscripcion-masterclass" element={<InscripcionMasterClass />} />
            <Route path="/regalo" element={<GiftCardReveal />} />
          </Routes>
        </main>
      </div>
      {!esAdmin && !esGiftCard && <Footer />}
    </div>
  );
}