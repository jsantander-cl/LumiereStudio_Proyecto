import React from 'react';

import { Link } from 'react-router-dom';

function Footer() {
  const enlaces = [
    { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
    { label: 'Galería', href: '/#galeria' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Tarjetas de Regalo', href: '/#gift-cards' },
  ];

  const redes = [
    {
      nombre: 'Twitter',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1c.5 1.6 2 2.8 3.9 2.8A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
        </svg>
      ),
    },
    {
      nombre: 'Facebook',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7C16.5 3.6 15.5 3.5 14.4 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H8v3.1h2.5v8h3z" />
        </svg>
      ),
    },
    {
      nombre: 'Instagram',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      nombre: 'Youtube',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 8.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.3 5 12 5 12 5s-4.3 0-7.1.2c-.4 0-1.3.1-2.1 1C2.2 6.9 2 8.5 2 8.5S1.8 10.4 1.8 12.3v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.3.2 7.3.2s4.3 0 7.1-.2c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8zM9.9 15.4V8.9l6 3.3-6 3.2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[var(--color-abrow-footer)] pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Logotipo Central */}
        <div className="text-center">
          <h4 className="font-serif text-3xl text-[var(--color-abrow-dark)]">
            Lumiere
          </h4>
        </div>

        {/* Fila principal: Horarios / Descripción+menú / Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          {/* Open Hours */}
          <div className="space-y-3">
            <h5 className="font-serif text-lg text-[var(--color-abrow-dark)]">
              Horario de atención
            </h5>
            <div className="w-8 h-[2px] bg-[var(--color-abrow-dark)]" />
            <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
              Lunes a Viernes: 09:00-20:00
              <br />
              Sábado: 09:00-18:00
              <br />
              Domingo: Cerrado
            </p>
          </div>

          {/* Descripción + Menú + Redes */}
          <div className="flex flex-col items-center text-center space-y-6">
            <p className="font-sans text-sm text-[var(--color-abrow-muted)] max-w-xs">
              Somos un acogedor estudio de belleza en la ciudad de Antofagasta.
              Transformamos tu imagen cambiando tu mirada.
            </p>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-serif italic text-sm text-[var(--color-abrow-muted)]">
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

            <div className="flex gap-4">
              {redes.map((red) => (
                <a key={red.nombre} href={red.url} className="...">
                  {red.nombre}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-3 md:text-right">
            <h5 className="font-serif text-lg text-[var(--color-abrow-dark)]">
              Contacto
            </h5>
            <div className="w-8 h-[2px] bg-[var(--color-abrow-dark)] md:ml-auto" />
            <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
              +56 (9) 630 66 110
              <br />
              Oficina Solferino #236
              <br />
              Antofagasta, Chile
            </p>
          </div>
        </div>

        {/* Fila Inferior: Créditos */}
        <div className="border-t border-[var(--color-abrow-dark)]/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--color-abrow-muted)] gap-2">
          <p>© Created by jsantander-cl</p>
          <p>Reservados todos los derechos</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;