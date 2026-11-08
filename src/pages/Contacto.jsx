import React from 'react';
import BtnRegresar from '../components/BtnRegresar';
import PreguntasFrecuentes from '../sections/PreguntasFrecuentes';
import ProgrameTratamiento from '../sections/ProgrameTratamiento';
import ContactoFormulario from '../sections/ContactoFormulario';

export default function Contacto() {
  return (
    <div className="relative">
      {/* BOTÓN REGRESAR FLOTANTE SIN FRANJA NI FONDO DE HEADER */}
      <div className="absolute top-6 left-6 md:left-12 lg:left-24 z-50">
        <BtnRegresar />
      </div>

      <PreguntasFrecuentes />
      <ProgrameTratamiento />
      <ContactoFormulario />
    </div>
  );
}