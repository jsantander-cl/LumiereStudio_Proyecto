import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función de desplazamiento suave personalizada compensando la barra fija
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({
      top: yCoordinate + yOffset,
      behavior: 'smooth'
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 sm:py-5 px-6 md:px-12 lg:px-24 select-none ${
        scrolled 
          ? 'bg-[#3D1D1C]/90 backdrop-blur-md shadow-lg py-3 sm:py-4' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO TEXTO */}
        <Link 
          to="/" 
          className="font-serif text-xl sm:text-2xl text-white tracking-wide hover:opacity-90 transition-opacity"
        >
          Lumiere
        </Link>

        {/* NAVEGACIÓN DESKTOP CON NUEVO ORDEN Y SCROLL SUAVE */}
        <nav className="hidden lg:flex items-center gap-8">
          <HashLink 
            smooth 
            to="/#sobre-nosotros" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Sobre Nosotros
          </HashLink>

          <HashLink 
            smooth 
            to="/#servicios" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Servicios
          </HashLink>

          <HashLink 
            smooth 
            to="/#gift-cards" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Tarjetas de Regalo
          </HashLink>

          <HashLink 
            smooth 
            to="/#galeria-insta" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Galería
          </HashLink>

          <Link 
            to="/contacto" 
            className="font-sans text-xs tracking-widest uppercase text-white/90 hover:text-white transition-colors"
          >
            Contacto
          </Link>
        </nav>

        {/* BOTÓN RESERVA */}
        <div>
          <Link
            to="/agenda"
            className="hidden sm:inline-block border border-white/80 text-white font-sans text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Reserva una Cita
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;