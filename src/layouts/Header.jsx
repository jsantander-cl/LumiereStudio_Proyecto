import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

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
    setMenuAbierto(false); // Cierra el menú mobile al hacer clic
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 sm:py-5 px-6 md:px-12 lg:px-24 select-none ${
        scrolled 
          ? 'bg-[#3D1D1C]/90 backdrop-blur-md shadow-lg py-3 sm:py-4' 
          : 'bg-[#3D1D1C]/80 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO TEXTO */}
        <Link 
          to="/" 
          onClick={() => setMenuAbierto(false)}
          className="font-serif text-xl sm:text-2xl text-white tracking-wide hover:opacity-90 transition-opacity"
        >
          Lumiere
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
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

        {/* BOTÓN RESERVA DESKTOP & BOTÓN HAMBURGUESA MOBILE */}
        <div className="flex items-center gap-4">
          <Link
            to="/agenda"
            className="hidden sm:inline-block border border-white/80 text-white font-sans text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Reserva una Cita
          </Link>

          {/* Botón Hamburguesa Mobile con transición de icono */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú de navegación"
            className="lg:hidden text-white p-1.5 focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* MENÚ DESPLEGABLE MOBILE CON ANIMACIÓN FLUIDA */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[var(--color-abrow-cream)] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out border-b border-[var(--color-abrow-dark)]/10 ${
          menuAbierto ? 'max-h-[480px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <HashLink 
            smooth 
            to="/#sobre-nosotros" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-dark)] hover:text-[var(--color-abrow-muted)] py-2 border-b border-[var(--color-abrow-dark)]/10 transition-colors"
          >
            Sobre Nosotros
          </HashLink>

          <HashLink 
            smooth 
            to="/#servicios" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-dark)] hover:text-[var(--color-abrow-muted)] py-2 border-b border-[var(--color-abrow-dark)]/10 transition-colors"
          >
            Servicios
          </HashLink>

          <HashLink 
            smooth 
            to="/#gift-cards" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-dark)] hover:text-[var(--color-abrow-muted)] py-2 border-b border-[var(--color-abrow-dark)]/10 transition-colors"
          >
            Tarjetas de Regalo
          </HashLink>

          <HashLink 
            smooth 
            to="/#galeria-insta" 
            scroll={(el) => scrollWithOffset(el)}
            className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-dark)] hover:text-[var(--color-abrow-muted)] py-2 border-b border-[var(--color-abrow-dark)]/10 transition-colors"
          >
            Galería
          </HashLink>

          <Link 
            to="/contacto" 
            onClick={() => setMenuAbierto(false)}
            className="font-sans text-xs tracking-widest uppercase text-[var(--color-abrow-dark)] hover:text-[var(--color-abrow-muted)] py-2 border-b border-[var(--color-abrow-dark)]/10 transition-colors"
          >
            Contacto
          </Link>

          <div className="pt-2">
            <Link
              to="/agenda"
              onClick={() => setMenuAbierto(false)}
              className="block w-full text-center bg-[var(--color-abrow-dark)] text-white font-sans text-xs uppercase tracking-widest py-3 hover:opacity-95 shadow-sm transition-all"
            >
              Reserva una Cita
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;