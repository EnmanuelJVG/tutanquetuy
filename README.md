# TanqueTuy — Catálogo web

Sitio estático responsive adaptado al logotipo negro y blanco de TanqueTuy y a los flyers suministrados. Está preparado para verse primero en teléfonos y para dirigir cada consulta a WhatsApp.

## Qué incluye
- Catálogo filtrable: modelos cónicos y cilíndricos.
- Buscador por tipo/capacidad y fichas con las medidas que venían en el material.
- Selector de asesor: el cliente puede elegir entre Adolfo y Ailan antes de abrir WhatsApp.
- Los botones del catálogo conservan el modelo elegido dentro del mensaje precargado.
- Botón fijo para WhatsApp en teléfonos, navegación móvil, animaciones de entrada y movimiento suave.
- Identidad visual monocromática en negro, blanco y grises; el logotipo suministrado está en `assets/logo.png`.
- Secciones de garantía, envío, pagos, ubicación y contacto. No se afirma un material específico.
- Sin precios inventados ni backend; funciona como web estática.
- Ilustraciones vectoriales de referencia para ambos tipos de tanque; los flyers entregados se conservan en `referencias-branding/` y `assets/flyers/`.

## Ver la web en tu computadora
1. Descomprime el archivo ZIP.
2. Abre la carpeta `tanquetuy-catalogo`.
3. Abre `index.html` en Chrome, Edge o Firefox. El catálogo y los filtros funcionan localmente; los enlaces de WhatsApp necesitan internet.

## Cambiar los contactos de WhatsApp

Los dos contactos se editan al principio de `app.js`, dentro del bloque `CONTACTS`. Cada registro tiene nombre, número para el enlace y número que se muestra en pantalla:

```js
const CONTACTS = [
  { id: "adolfo", name: "Adolfo", phoneDigits: "584129775362", phoneDisplay: "0412-9775362" },
  { id: "ailan", name: "Ailan", phoneDigits: "584241253309", phoneDisplay: "0424-1253309" }
];
```

- `name`: el nombre que verá el cliente en el selector.
- `phoneDigits`: número internacional con código de país, solo dígitos y sin `+` ni el cero inicial. Ejemplo: `584241253309`.
- `phoneDisplay`: formato legible para mostrar en el selector.
- `id`: identificador único y sin espacios; no hace falta cambiarlo si solo cambias el nombre o el teléfono.

**Contactos configurados:** Adolfo aparece con `0412-9775362` y Ailan con `+584241253309` (se muestra como `0424-1253309`). Si los números pertenecen a la persona contraria, intercambia las líneas dentro de `CONTACTS` al principio de `app.js`. Ese es el único lugar que necesitas modificar.

Todos los botones de WhatsApp —incluidos los botones de cada modelo— abren primero este selector. Al elegir a una persona se abre su chat con el mensaje correspondiente ya preparado.

## Publicar gratis en Vercel
1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta, incluida `assets/`.
3. Entra en Vercel y selecciona **Add New → Project**; importa ese repositorio.
4. No hace falta configurar comandos de build. Déjalos vacíos y publica.

También puedes subir la carpeta a otro hosting de sitios estáticos. No elimines la carpeta `assets`. Las ilustraciones activas se pueden reemplazar conservando los nombres `assets/tank-conico.svg` y `assets/tank-cilindrico.svg`.

## Datos que conviene confirmar antes de publicar
- Confirmar que cada uno de los dos números corresponde a la persona indicada en el selector.
- Confirmar si los precios deben seguir siendo por consulta y si hay otras formas de pago.
- Las medidas que no aparecen en el material se dejan para consulta; no se inventaron.
