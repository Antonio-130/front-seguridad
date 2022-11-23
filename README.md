## Requerimientos

Instalar [Node.js](https://nodejs.org/en/) en su versión LTS.

## Scripts

Puedes ejecutar:

### `npm install`

Instala todas las dependencias / paquetes que necesita el proyecto. Los mismos se ecncuentran en el archivo 'package.json'.

post-data: Ignorar los warnings (vulnerabilidades) que se muestran en la consola. Tiene que ver con las dependencias de desarrollo, no ejecute el comando `npm audit fix` ya que puede generar errores en el proyecto.

### `npm start`

Inicia la app en modo desarrollador.\
Abre [http://localhost:3000](http://localhost:3000) para ver la app en tu navegador.

La pagina va a recargar cada vez que hagas cambios.\
Puedes ver cualquier error en la consola.

### `npm run build`

Empaqueta la aplicacion en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

El empaquetado es para el deploy.

Más info: [deployment](https://facebook.github.io/create-react-app/docs/deployment)

---
### Deployment

Info: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` no logra minificar.

Info: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
