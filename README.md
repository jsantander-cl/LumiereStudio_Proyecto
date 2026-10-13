# 🌟 Lumiere Studio — Clínica de Estética y Estudio de Cejas & Pestañas

Sitio web dinámico y responsivo para **Lumiere Studio**, estudio especializado en tratamientos de cejas, pestañas, cosmetología profesional y formación continua (Master Classes) en Antofagasta. 

Construido como una **Single Page Application (SPA)** moderna con **React 19**, **Tailwind CSS v4**, **React Router v7** e integrado con **Supabase** para la gestión administrativa y autenticación.

---

## 🚀 Características Principales

- **Arquitectura Basada en Componentes**: Código modular organizado en secciones reutilizables y páginas de vistas independientes.
- **Enrutamiento Completo (SPA)**: Navegación entre páginas públicas y panel de administración, incluyendo desplazamiento suave por anclajes internos (`react-router-hash-link`).
- **Autenticación y Administración**: Integración con Supabase para el inicio de sesión administrativo, gestión/reserva de citas y flujo de restablecimiento de contraseña (`ResetPassword.jsx`).
- **Pasarela & Flujos de Registro**:
  - Checkout/Pasarela para la compra directa de **Gift Cards** y **Productos Cosméticos** (`Checkout.jsx`).
  - Pre-inscripción interactiva a talleres con captura de parámetros dinámicos (`InscripcionMasterClass.jsx`).
- **Diseño Responsivo y Elegante**: Sistema de diseño personalizado utilizando variables `@theme` de Tailwind CSS v4 basadas en la paleta oficial y tipografía refinada (*Cormorant*, *Lato*, *Poppins*).
- **Componentes Interactivos**:
  - Carrusel de testimonios dinámico.
  - Tira horizontal infinita para publicaciones de Instagram.
  - Modales flotantes para reproducción de video (demostraciones de productos).
  - Acordeón de preguntas frecuentes.
  - Comparadores e indicadores interactivos.
- **Despliegue Listo para Producción**: Configuración de reescritura de rutas para SPA mediante `vercel.json` y empaquetado optimizado con Vite.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Navegación**: [React Router v7](https://reactrouter.com/) + `react-router-hash-link`
- **Backend & Autenticación**: [Supabase JS Client v2](https://supabase.com/)
- **Tipografías**: Google Fonts (*Cormorant*, *Lato*, *Poppins*)

---

## 📂 Estructura del Proyecto

```text
proyectofinal-lumiere/
├── public/
│   ├── favicon.svg
│   └── img/                         # Assets estáticos e imágenes del sitio
├── src/
│   ├── components/
│   │   └── Boton.jsx                # Componentes UI atomizados
│   ├── layouts/
│   │   ├── Header.jsx               # Navegación principal, logo y reserva
│   │   └── Footer.jsx               # Horarios, redes sociales y contacto
│   ├── pages/                       # Vistas principales de la aplicación
│   │   ├── Home.jsx                 # Vista principal ensamblada
│   │   ├── Contacto.jsx             # Formulario e información de contacto
│   │   ├── Agenda.jsx               # Sistema de agenda
│   │   ├── AdminLogin.jsx           # Inicio de sesión administrativo
│   │   ├── AdminReservas.jsx        # Panel de control de reservas
│   │   ├── ResetPassword.jsx        # Recuperación de contraseña (Supabase)
│   │   ├── Checkout.jsx             # Pasarela de pago para productos/gift cards
│   │   └── InscripcionMasterClass.jsx # Registro a cursos y talleres
│   ├── sections/                    # Secciones modulares
│   │   ├── Hero.jsx                 # Banner principal con encabezado y redes
│   │   ├── Introduccion.jsx         # Bienvenida e iniciadores de tratamiento
│   │   ├── Beneficios.jsx           # Puntos clave y video institucional
│   │   ├── ServiciosPrecios.jsx     # Lista de precios y tarjetas de acción
│   │   ├── Partners.jsx             # Carrusel/Grid de marcas aliadas
│   │   ├── ResultadosExcepcionales.jsx # Sección informativa en fondo oscuro
│   │   ├── Sobrenosotros.jsx        # Productos de alta gama + modal de video
│   │   ├── Caracteristicas.jsx      # Muestra de resultados Antes / Después
│   │   ├── BannerTransicion.jsx    # Frase destacada / Separador visual
│   │   ├── CTABanner.jsx            # Banner de llamado a la acción con imagen fija (bg-fixed)
│   │   ├── Galeria.jsx              # Testimonios con carrusel interactivo
│   │   ├── Contadores.jsx           # Métricas y estadísticas del estudio
│   │   ├── TarjetasRegalo.jsx       # Catálogo de Gift Cards con redirección a Checkout
│   │   ├── Servicios.jsx            # Oferta de Master Classes en zigzag
│   │   ├── Blog.jsx                 # Artículos y novedades
│   │   ├── InstagramGaleria.jsx     # Galería continua estilo Instagram
│   │   ├── PreguntasFrecuentes.jsx  # Acordeón de preguntas frecuentes
│   │   └── ProgrameTratamiento.jsx  # Banner informativo previo a reserva
│   ├── App.jsx                      # Definición de rutas principales
│   ├── index.css                    # Configuración de variables @theme de Tailwind v4
│   └── main.jsx                     # Punto de entrada de React con BrowserRouter
├── index.html                       # HTML principal con Google Fonts
├── package.json                     # Dependencias y scripts
├── vite.config.js                   # Configuración del empaquetador Vite
└── vercel.json                      # Configuración de rewrite para SPA en Vercel

Paleta de Colores y Tipografía
Definidos en src/index.css a través de la directiva @theme:
Nombre Variable / Código HEX / Descripción
--color-abrow-cream#FCF8F6Fondo claro principal
--color-abrow-nude#F9F2EEFondo secundario / Acento suave
--color-abrow-dark#673231Tonalidad oscura para textos y encabezados
--color-abrow-muted#9B7675Textos secundarios y acentos
--color-abrow-darkbg#47231fFondo oscuro para secciones destacadas
--color-abrow-darkbg2#3D1D1CFondo oscuro para testimonios y estadísticas

Instalación y Uso Local
1 Clonar el repositorio:

Bash
git clone <URL_DEL_REPOSITORIO>
cd proyectofinal-lumiere

2 Clonar el repositorio:

Bash
git clone <URL_DEL_REPOSITORIO>
cd proyectofinal-lumiere

3 Variables de Entorno:
Crea un archivo .env en la raíz del proyecto para conectar con Supabase:

Fragmento de código
VITE_SUPABASE_URL=tu_supabase_project_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key

4 Iniciar el servidor de desarrollo:

Bash
npm run dev
Abre http://localhost:5173 en tu navegador para ver la aplicación.

5 Construir para producción:

Bash
npm run build

6 Despliegue
La aplicación cuenta con la regla de reescritura en vercel.json para permitir que React Router gestione las rutas sin generar errores 404 al recargar páginas secundarias:

JSON
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

7 Licencia
Este proyecto fue desarrollado para Lumiere Studio. Todos los derechos reservados.
