# A-Brow Studio (React + Tailwind v4)

Réplica del sitio https://browbar.weblium.site/ construida con React + Tailwind CSS v4.

## Estructura

```
src/
├── assets/
├── components/
│   └── Boton.jsx
├── img/
├── layouts/
│   ├── Header.jsx              (Nav + logo "A- Brow" + Book an Appointment)
│   └── Footer.jsx              (Open Hours / menú+redes / Contact Us)
├── sections/
│   ├── Hero.jsx                 (Título "A-Brow Studio : the Art of Brow Transformation" + redes + imagen)
│   ├── Introduccion.jsx         (NUEVO) ("Unleash the Power of Your Brows...")
│   ├── Beneficios.jsx           (NUEVO) (5 iconos + video + cita de Linda Evangelista)
│   ├── ServiciosPrecios.jsx     (NUEVO) ("Our Artists Have Every Treatment You Need to Glow" + 3 tarjetas)
│   ├── Partners.jsx             (NUEVO) (Carrusel de marcas: Anastasia, Glossier, Maybelline, Milk, benefit, NYX)
│   ├── ResultadosExcepcionales.jsx (NUEVO) ("Delivering Exceptional Results Every Time" - sección oscura)
│   ├── Sobrenosotros.jsx        (Premium & High-Quality Products)
│   ├── Caracteristicas.jsx      (Resultados Antes / Después con slider interactivo)
│   ├── BannerTransicion.jsx     ("Celebrate Your Natural Beauty")
│   ├── CTABanner.jsx            (NUEVO) ("We Care for Your Brows with the Attention They Deserve")
│   ├── Galeria.jsx              (Mosaico oscuro "The Latest Brow Artistry" + Testimonios con carrusel)
│   ├── Contadores.jsx           (Estadísticas 5 columnas)
│   ├── TarjetasRegalo.jsx       (Gift Cards 3 columnas)
│   ├── Servicios.jsx            (Master Classes en zigzag)
│   ├── Blog.jsx                 (Artículos "Our News & Articles")
│   └── InstagramGaleria.jsx     (NUEVO) (Galería de Instagram con 6 imágenes)
├── App.jsx
├── index.css                    (Variables @theme de Tailwind v4)
└── main.jsx
```

## Notas

- Todas las imágenes referenciadas (`/img/...`) deben colocarse en `public/img/` con esos nombres, o
  reemplazarse por las rutas reales de tus assets.
- Los anclajes del menú (`#sobre-nosotros`, `#galeria`, `#servicios`, `#gift-cards`, `#contacto`) ya
  están enlazados a sus secciones correspondientes en `App.jsx`.

## Scripts

```
npm install
npm run dev
npm run build
```
