# Challenge técnico Front-end
Este repositorio contiene el código del frontend y del backend utilizados para completar el challenge técnico de Front-end de Mercado Libre. Todo el código relacionado al frontend está dentro de la carpeta client y el del backend en la carpeta server.
## Descripción de la aplicación
La aplicación es un buscador de productos de Mercado Libre Argentina.
### Home
En la pantalla principal (Home), se muestra únicamente el encabezado (header) con el logo de Mercado Libre y un campo de búsqueda. Al hacer clic en el logo, se navega a la pantalla principal. El campo de búsqueda permite ingresar el nombre del producto (hasta 120 caracteres) y al hacer clic en el ícono de búsqueda, se navega a la pantalla de resultados. Este encabezado permanece visible en todas las pantallas de la aplicación.
### Pantalla de Resultados de la búsqueda
En la pantalla, después de una breve carga, se muestra la lista de productos encontrados según los parámetros de búsqueda, que pueden incluir la consulta del buscador o una categoría y el número de página.

Arriba de la lista se muestran las categorías relacionadas con la búsqueda, ordenadas de menor a mayor especificidad. Al seleccionar una, se visualizan los productos correspondientes (no se permite seleccionar una categoría si ya se están viendo sus productos). Se muestran como máximo los primeros 4 productos encontrados.

Cada producto en la lista incluye:
- Una imagen
- El precio en pesos o dólares
- El nombre del producto
- Un ícono si el producto tiene envío gratis; de lo contrario, no se muestra nada
- Localidad del vendedor

Al seleccionar un producto, se navega a su detalle. Al final de la pantalla, hay una sección de paginación que permite navegar entre los productos.
### Pantalla de Detalle del Producto
En la pantalla, después de una breve carga, se muestran las categorías relacionadas con el producto. Al seleccionar una, se navega a los resultados correspondientes a esa categoría.

Debajo de las categorías, se muestra el detalle del producto, que incluye:
- Una imagen del producto
- Su estado (nuevo o usado)
- El nombre del producto
- El precio
- Un botón de compra que redirige a la Home
- La descripción del producto en caso de que esté disponible
## Stack tecnológico
- Nextjs
- Typescript
- Sass
- Node
- Express
## Librerias
- FontAwesome para todos los íconos en la página
- React testing library y Jest para los tests unitarios
- Concurrently para poder ejecutar el client y el servidor con un solo comando
- Eslint para el linting del código
- Prettier para formatear el código
- Axios para el llamado de apis desde el backend
- Dotenv para acceder a las variables de entorno desde el backend
## Instalación
Requisitos:
- Node.js v18.17 o mayor

Como primer paso, instalar las dependencias del proyecto de frontend en la carpeta client:

```bash
cd client
npm install
```
y al finalizar para instalar las del backend en la carpeta server:
```bash
cd ../server
npm install
```
## Configuración del proyecto
El proyecto tiene configurado prettier para formatear el código. El archivo .prettierrc dentro de cada carpeta contiene un objeto vacio ya que es la config por default.

El frontend corre localmente en el puerto 3000, aunque puede modificarse cambiando el argumento -p del script "dev" dentro del package.json, y el backend corre por defecto en el 8000 pero puede configurarse mediante la variable de entorno PORT en el archivo .env
## Instrucciones
Hay dos formas de correr el proyecto.

La primera es utilizando la libreria [concurrently](https://www.npmjs.com/package/concurrently):
El script dev:server ejecutará dos comandos, uno para correr el frontend y otro para el backend. Podrá ver en la terminal el output del frontend con el prefijo CLIENT y un fondo verde y el del backend con el prefijo SERVER y un fondo azul.
Para ejecutar el script:
```bash
cd client
npm run dev:server
```
La segunda es mediante dos terminales.
En una nos pararemos dentro de la carpeta client y ejecutaremos el siguiente comando:
```bash
npm run dev
```
En la otra terminal nos pararemos dentro de la carpeta server y ejecutaremos el siguiente comando:
```bash
npm run dev
```
## Endpoints
Los endpoints que se utilizaron de la api de mercado libre son los siguientes:
- [/sites/MLA/search](https://api.mercadolibre.com/sites/MLA/search) - Obtener el listado de productos
- [/items/:id](https://api.mercadolibre.com/items/:id) - Obtener el detalle de un producto
- [/currencies/:id](https://api.mercadolibre.com/currencies/:id) - Obtener el símbolo y los caracteres de una moneda
- [/users/:id](https://api.mercadolibre.com/users/:id) - Obtener la ciudad del vendedor
- [/pictures/:id](https://api.mercadolibre.com/pictures/:id) - Obtener la imágen de un producto
- [/items/:id/description](https://api.mercadolibre.com/items/:id/description) - Obtener la descripción de un producto
- [/categories/:id](https://api.mercadolibre.com/categories/:id) - Obtener el listado de categorias relacionadas a un producto
## Testing
Se crearon pruebas unitarias en el frontend para todos los componentes y páginas con una cobertura del 100% en todos los casos.
Para ejecutar las pruebas correr el siguiente comando dentro de la carpeta client:
```bash
npm test
```
Si desea ver el detalle de la cobertura, luego de ejecutar el comando, busque la carpeta coverage que se creo dentro de client y levante un servidor local que ejecute el archivo index.html dentro de la carpeta Icov-report.
## Notas
- Se comentaron, con el formato de JSDoc, los principales métodos y los componentes que tienen algún tipo de lógica dentro de la aplicación
- El listado de productos se obtiene desde el componente Items y no desde la página debido a un workaround con Suspense
- Se utilizaron cuatro breakpoints para el responsive de la página:
  - width <= 530px para dispositivos mobile
  - width <= 760px para un caso específico dentro de la pantalla de detalle de un producto
  - width <= 930px para tablets
  - width > 930px para dispositivos más grandes
