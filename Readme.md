# Mesa de juegos.

## Descripción.
Módulo de administrador.

## Ejecutar como developer.
### Requerimientos:
* [Node 7.9.0] (https://nodejs.org/es/) o mayor

### Procedimiento

1. Instalar las dependencias necesarias.

```
npm install
```

2. Ejecutar Webpack.

```
node_modules/.bin/webpack --watch
```

3. Ejecutar la aplicación.

```
node index.js
```

4. Abrir el navegador e introducir la URL: http://localhost:3000

### Estructura del proyecto.

```
.
├── development
|   ├── react
|   |   ├── controllers
|   |   ├── pages
|   |   └── App.jsx
|   ├── app.jsx
|   └──  index.html
├── production
|   └── app.js
├── .babelrc
├── .gitignore
├──  index.js
└──  webpack.config.js

```
