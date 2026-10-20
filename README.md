# Tu Tanque Tuy — Catálogo web

Sitio estático responsive inspirado en el branding y los flyers suministrados. Está preparado para verse primero en teléfonos y para dirigir cada consulta a WhatsApp.

## Qué incluye
- Catálogo filtrable: modelos cónicos y cilíndricos.
- Buscador por tipo/capacidad y fichas con las medidas que venían en el material.
- Botones que abren WhatsApp con un mensaje precargado para el tanque seleccionado.
- Botón fijo para WhatsApp en teléfonos, navegación móvil, animaciones de entrada y movimiento suave.
- Secciones de garantía, material, envío, pagos, ubicación y contacto.
- Sin precios inventados ni backend; funciona como web estática.
- Ilustraciones vectoriales de referencia para ambos tipos de tanque; los flyers entregados se conservan en `referencias-branding/` y `assets/flyers/`.

## Ver la web en tu computadora
1. Descomprime el archivo ZIP.
2. Abre la carpeta `tu-tanque-tuy-catalogo`.
3. Abre `index.html` en Chrome, Edge o Firefox. El catálogo y los filtros funcionan localmente; los enlaces de WhatsApp necesitan internet.

## Cambiar el número de WhatsApp
En `app.js`, al principio, cambia estas dos constantes:

```js
const BUSINESS_PHONE_DIGITS = "584129775362"; // código de país +58 y número sin el 0 inicial
const BUSINESS_PHONE_DISPLAY = "0412-9775362"; // cómo se muestra en la web
```

Para Venezuela, el enlace usa el formato internacional sin el cero inicial: `+58` seguido del número móvil. Conserva solo números en `BUSINESS_PHONE_DIGITS`, sin espacios ni guiones.

**Nota:** el material suministrado tiene flyers antiguos que muestran 0424-1253309 y recursos del 20/10/2026 que muestran 0412-9775362. Se configuró el número más reciente, 0412-9775362; conviene confirmarlo con el cliente antes de publicar.

## Publicar gratis en Vercel
1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta, incluida `assets/`.
3. Entra en Vercel y selecciona **Add New → Project**; importa ese repositorio.
4. No hace falta configurar comandos de build. Déjalos vacíos y publica.

También puedes subir la carpeta a otro hosting de sitios estáticos. No elimines la carpeta `assets`. Las ilustraciones activas se pueden reemplazar conservando los nombres `assets/tank-conico.svg` y `assets/tank-cilindrico.svg`.

## Datos que conviene confirmar antes de publicar
- Confirmar número comercial de WhatsApp.
- Confirmar si los precios deben seguir siendo por consulta y si hay otras formas de pago.
- Las medidas que no aparecen en el material se dejan para consulta; no se inventaron.
