import { Link } from 'react-router-dom';

export default function ContactoHero() {
  return (
    <section className="bg-[var(--color-abrow-darkbg)] text-white py-20 md:py-28 px-6 text-center">
      <h1 className="font-serif text-4xl md:text-6xl">Contactos</h1>
      <p className="mt-4 font-sans text-sm md:text-base text-white/70">
        <Link to="/" className="hover:text-white transition-colors">
          Inicio
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="underline underline-offset-4 font-semibold text-white">Contacto</span>
      </p>
    </section>
  );
}