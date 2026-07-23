import ContactoHero from '../sections/ContactoHero';
import PreguntasFrecuentes from '../sections/PreguntasFrecuentes';
import ProgrameTratamiento from '../sections/ProgrameTratamiento';
import ContactoFormulario from '../sections/ContactoFormulario';

export default function Contacto() {
  return (
    <>
      <ContactoHero />
      <PreguntasFrecuentes />
      <ProgrameTratamiento />
      <ContactoFormulario />
    </>
  );
}