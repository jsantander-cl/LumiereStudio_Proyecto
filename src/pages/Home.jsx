import Hero from '../sections/Hero';
import Introduccion from '../sections/Introduccion';
import Beneficios from '../sections/Beneficios';
import ServiciosPrecios from '../sections/ServiciosPrecios';
import Partners from '../sections/Partners';
import ResultadosExcepcionales from '../sections/ResultadosExcepcionales';
import Sobrenosotros from '../sections/Sobrenosotros';
import Caracteristicas from '../sections/Caracteristicas';
import BannerTransicion from '../sections/BannerTransicion';
import CTABanner from '../sections/CTABanner';
import Galeria from '../sections/Galeria';
import Contadores from '../sections/Contadores';
import TarjetasRegalo from '../sections/TarjetasRegalo';
import Servicios from '../sections/Servicios';
import Blog from '../sections/Blog';
import InstagramGaleria from '../sections/InstagramGaleria';

export default function Home() {
  return (
    <>
      <Hero />
      <Introduccion />
      <Beneficios />
      <ServiciosPrecios />
      <Partners />
      <ResultadosExcepcionales />
      <Sobrenosotros />
      <Caracteristicas />
      <BannerTransicion />
      <CTABanner />
      <Galeria />
      <Contadores />
      <TarjetasRegalo />
      <Servicios />
      <Blog />
      <InstagramGaleria />
    </>
  );
}