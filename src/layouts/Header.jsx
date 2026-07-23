import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlaces = [
    { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
    { label: 'Galería', href: '/#galeria' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Tarjetas de Regalo', href: '/#gift-cards' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-abrow-nude)] border-b border-[var(--color-abrow-dark)]/5 px-6 py-5 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logotipo Izquierda */}
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl text-[var(--color-abrow-dark)] tracking-wide"
        >
          Lumiere
        </Link>

        {/* Enlaces de navegación Centro */}
        <nav className="hidden md:flex items-center gap-8 font-sans italic font-bold text-[15px] text-[var(--color-abrow-muted)]/80">
          {enlaces.map((enlace) => (
            <a
              key={enlace.label}
              href={enlace.href}
              className="hover:text-[var(--color-abrow-dark)] transition-colors"
            >
              {enlace.label}
            </a>
          ))}
          <Link
            to="/contacto"
            className="hover:text-[var(--color-abrow-dark)] transition-colors"
          >
            Contacto
          </Link>
        </nav>

        {/* Botón de Reserva Derecha */}
        <div className="hidden md:block">
          <Link
            to="/contacto"
            className="inline-block border border-[var(--color-abrow-dark)] text-[var(--color-abrow-dark)] px-6 py-3 font-[var(--font-btn)] text-[13px] font-bold uppercase tracking-wide hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300"
          >
            Reserva una cita
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-[var(--color-abrow-dark)]"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <nav className="md:hidden flex flex-col items-start gap-4 mt-6 font-serif italic text-base text-[var(--color-abrow-muted)]">
          {enlaces.map((enlace) => (
            <a
              key={enlace.label}
              href={enlace.href}
              onClick={() => setMenuAbierto(false)}
            >
              {enlace.label}
            </a>
          ))}
          <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
            Contacto
          </Link>
          <Link
            to="/contacto"
            onClick={() => setMenuAbierto(false)}
            className="inline-block border border-[var(--color-abrow-dark)] text-[var(--color-abrow-dark)] px-6 py-3 text-xs font-sans font-semibold uppercase tracking-wider"
          >
            Reserva una cita
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;