# Raíz Cerámica — Catálogo digital demostrativo

Tienda/catálogo de **cerámica artesanal** con carrito y pedidos por **WhatsApp**, pensada como pieza de portfolio para ofrecer catálogos digitales a emprendimientos.

> **Raíz Cerámica es una marca ficticia.** Productos, precios (en ARS), textos, correo e Instagram son demostrativos. Las fotografías son de [Unsplash](https://unsplash.com) (licencia gratuita) y no muestran piezas producidas por la marca.

## Qué incluye

- Inicio editorial: hero, beneficios, categorías, piezas destacadas, historia, proceso artesanal, preguntas frecuentes y contacto.
- **Catálogo** (`/catalogo`) con 12 productos: filtro por categoría, búsqueda por nombre (ignora tildes y mayúsculas), orden por precio y estado vacío. Los filtros quedan en la URL (`/catalogo?categoria=tazas-y-vasos&orden=precio-asc`), así se pueden compartir.
- **Ficha de producto** (`/productos/[id]`): foto grande, precio, descripción, información artesanal, cantidad, “Agregar al carrito”, “Consultar por WhatsApp” y productos relacionados. Prerenderizadas en el build.
- **Carrito lateral**: agregar, cambiar cantidades, eliminar, subtotales, total, vaciar (con confirmación), seguir comprando y **enviar pedido por WhatsApp**.
- **Nuestra historia** (`/nuestra-historia`), 404 propio, `sitemap.xml`, `robots.txt`, metadata y Open Graph por página.
- Responsive (mobile first), foco visible, etiquetas accesibles, `prefers-reduced-motion`, paneles con `<dialog>` nativo (foco atrapado, Esc para cerrar).

## Tecnologías

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react. Sin backend, base de datos, autenticación ni pagos.

## Requisitos

- Node.js 20.9 o superior (probado con Node 22.17).

## Instalar y ejecutar

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build de producción
npm run lint     # ESLint
```

## Configurar WhatsApp

El número se define en `src/config/site.ts` (`WHATSAPP_PHONE`) o, preferentemente, con una variable de entorno:

```bash
# .env.local  (copiá .env.example)
NEXT_PUBLIC_WHATSAPP_PHONE=5492291XXXXXX
```

- Formato internacional, **solo dígitos, sin `+` ni espacios**. Para un celular argentino: `54` + `9` + característica sin 0 + número sin 15. Ej.: Miramar (2291) → `5492291XXXXXX`.
- Mientras el valor siga siendo el marcador `549XXXXXXXXXX`, el sitio está en **modo demostración**: abre `https://wa.me/?text=…` con el mensaje listo para elegir el destinatario, y muestra un aviso en el carrito. Nada se envía automáticamente.
- Como es una variable `NEXT_PUBLIC_`, se incorpora al compilar: después de cambiarla, volvé a ejecutar el build (o redeploy).

Mensaje que se genera desde el carrito:

```
Hola, Raíz Cerámica. Quiero consultar por este pedido:

- Taza Alba x 2 — $24.000
- Bowl Tierra x 1 — $15.000

Total estimado: $39.000

¿Me podrían confirmar disponibilidad y formas de entrega?
```

El carrito **no se vacía al abrir WhatsApp**: el panel pregunta “¿Se abrió WhatsApp con tu pedido?” y solo se vacía si el usuario confirma que lo envió.

## Personalizar contenido

| Qué | Dónde |
| --- | --- |
| Nombre, eslogan, ubicación, email, Instagram, avisos, WhatsApp | `src/config/site.ts` |
| Productos (precio, descripción, categoría, etiqueta, destacado) | `src/data/products.ts` |
| Categorías | `src/data/categories.ts` |
| URLs y textos alternativos de todas las fotos | `src/data/images.ts` |
| Hero, historia, proceso, beneficios y preguntas frecuentes | `src/data/content.ts` |
| Colores y tipografías | `src/app/globals.css` (`@theme`) y `src/app/layout.tsx` |

- El `id` de cada producto es su URL (`/productos/taza-alba`): único, en minúsculas y con guiones.
- Etiquetas disponibles: `"Nuevo"`, `"Más elegido"`, `"Edición limitada"` (opcional).
- Para usar fotos propias, guardalas en `public/` y usá rutas como `/productos/taza-alba.jpg`; si usás otro dominio remoto, agregalo en `images.remotePatterns` de `next.config.ts`. Si una imagen falla, se muestra una alternativa con la marca.

## Persistencia del carrito

El carrito vive en memoria (React Context) y se guarda en `localStorage` solo como comodidad (únicamente IDs y cantidades). Si `localStorage` está vacío, bloqueado o falla, la tienda funciona igual. El contenido guardado se lee después del montaje para evitar errores de hidratación.

## Publicar

**Vercel (recomendado):**

1. Subí el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → *Add New Project* → importá el repositorio (detecta Next.js solo).
3. En *Environment Variables* agregá `NEXT_PUBLIC_WHATSAPP_PHONE` y `NEXT_PUBLIC_SITE_URL` (la URL final, ej. `https://raiz-ceramica.vercel.app`).
4. *Deploy*. Si cambiás las variables, hacé *Redeploy*.

También funciona en cualquier plataforma que ejecute Next.js 16 con Node.js (Netlify, Render, Railway, etc.) usando `npm run build` y `npm start`. No requiere VPS ni base de datos.

## Estructura

```
src/
  app/                 rutas (inicio, catálogo, productos/[slug], nuestra-historia), layout, estilos, sitemap, robots
  components/
    layout/            Header, MobileMenu, Footer
    home/              secciones de la página de inicio e historia
    catalog/           CatalogView (estado + URL) y CatalogFilters
    product/           ProductCard, ProductPurchase, AddToCartButton, ProductBadge
    cart/              CartProvider, CartDrawer, CartLineItem, CartButton, cart-storage
    ui/                Logo, SafeImage, SectionHeading, QuantitySelector
  config/site.ts       configuración del negocio
  data/                productos, categorías, imágenes y textos
  lib/                 whatsapp, catálogo (filtros/orden), formato de precios, navegación
  types/               tipos compartidos
```

## Limitaciones conocidas

- Las fotos se cargan desde Unsplash: si el servicio no responde, se ve la alternativa visual.
- Los precios y la disponibilidad son orientativos; el sitio no gestiona stock, pagos ni envíos (se coordinan por WhatsApp).
- Una URL de producto inexistente muestra la página 404 (con `noindex`); en la primera visita a una URL desconocida el código HTTP puede ser 200 por el renderizado en streaming de Next.js, y las siguientes responden 404.
