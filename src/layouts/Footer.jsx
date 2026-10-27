import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Footer() {
  const enlaces = [
    { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
    { label: 'Galería', href: '/#galeria-insta' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Tarjetas de Regalo', href: '/#gift-cards' },
  ];

  const redes = [
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/lumiere.antofagasta/',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      nombre: 'Facebook',
      url: 'https://web.facebook.com/profile.php?id=61574360982174',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7C16.5 3.6 15.5 3.5 14.4 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H8v3.1h2.5v8h3z" />
        </svg>
      ),
    },
    {
      nombre: 'TikTok',
      url: 'https://www.tiktok.com/@lumiere.antofagasta',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
    {
      nombre: 'Youtube',
      url: 'https://www.youtube.com/@lumiereestudio',
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 8.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.3 5 12 5 12 5s-4.3 0-7.1.2c-.4 0-1.3.1-2.1 1C2.2 6.9 2 8.5 2 8.5S1.8 10.4 1.8 12.3v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.3.2 7.3.2s4.3 0 7.1-.2c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8zM9.9 15.4V8.9l6 3.3-6 3.2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[var(--color-abrow-footer)] pt-16 pb-8 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Logo superior */}
        <div className="text-center">
          <Link to="/" className="font-serif text-3xl text-[var(--color-abrow-dark)] tracking-wide">
            Lumiere
          </Link>
        </div>

        {/* Contenedor principal con orden adaptable (Flex en mobile, Grid en desktop) */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-12 text-sm">
          
          {/* 1. Bloque Central (Descripción y Redes) -> Primero en mobile */}
          <div className="flex flex-col items-center text-center space-y-6 order-1 md:order-2">
            <p className="font-sans text-xs text-[var(--color-abrow-muted)] max-w-xs leading-relaxed">
              Somos un acogedor estudio de belleza en la ciudad de Antofagasta. Transformamos tu imagen cambiando tu mirada.
            </p>

            {/* Redes Sociales interactivas */}
            <div className="flex items-center gap-5 pt-1">
              {redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.nombre}
                  className="w-8 h-8 rounded-full border border-[var(--color-abrow-dark)]/20 flex items-center justify-center text-[var(--color-abrow-dark)] hover:bg-[var(--color-abrow-dark)] hover:text-white transition-all duration-300"
                >
                  {red.icono}
                </a>
              ))}
            </div>

            {/* Enlaces de navegación rápida (visibles en mobile debajo de las redes) */}
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-xs text-[var(--color-abrow-muted)] pt-4 md:hidden">
              {enlaces.map((enlace) => (
                <li key={enlace.label}>
                  <HashLink smooth to={enlace.href} className="hover:text-[var(--color-abrow-dark)] transition-colors">
                    {enlace.label}
                  </HashLink>
                </li>
              ))}
              <li>
                <Link to="/contacto" className="hover:text-[var(--color-abrow-dark)] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Horario de atención (Centrado en mobile, izquierda en desktop) */}
          <div className="space-y-3 flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1">
            <h5 className="font-serif text-lg text-[var(--color-abrow-dark)]">
              Horario de atención
            </h5>
            <div className="w-8 h-[2px] bg-[var(--color-abrow-dark)]" />
            <p className="font-sans text-xs text-[var(--color-abrow-muted)] leading-relaxed">
              Lunes a Viernes: 09:00 - 20:00
              <br />
              Sábado: 09:00 - 18:00
              <br />
              Domingo: Cerrado
            </p>
          </div>

          {/* 3. Información de contacto (Centrado en mobile, derecha en desktop) */}
          <div className="space-y-3 flex flex-col items-center text-center md:items-end md:text-right order-3 md:order-3">
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

        {/* Enlaces de navegación visibles solo en Desktop en su columna central original */}
        <div className="hidden md:flex flex-col items-center space-y-4">
          <ul className="flex flex-wrap justify-center gap-x-8 font-sans text-xs text-[var(--color-abrow-muted)]">
            {enlaces.map((enlace) => (
              <li key={enlace.label}>
                <HashLink smooth to={enlace.href} className="hover:text-[var(--color-abrow-dark)] transition-colors">
                  {enlace.label}
                </HashLink>
              </li>
            ))}
            <li>
              <Link to="/contacto" className="hover:text-[var(--color-abrow-dark)] transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright inferior en 3 líneas centradas */}
        <div className="border-t border-[var(--color-abrow-dark)]/10 pt-6 flex flex-col items-center justify-center text-center text-xs font-sans text-[var(--color-abrow-muted)] space-y-1.5">
          <p>© {new Date().getFullYear()} Lumiere Studio.</p>
          <p>Todos los derechos reservados.</p>
          <p>Antofagasta, Chile</p>
        </div>

      </div>
    </footer>
  );
}