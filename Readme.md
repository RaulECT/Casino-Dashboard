# Mesa de juegos.

## Índice
1. Descripción.
2. Estructura del proyecto.
2. Requerimientos.
3. Ejecutar como developer.
4. Generar instaladores.
5. Documentación.

## Descripción.
Módulo de administración del casino que controla las siguientes caracteristicas:
1. Configuraciones del casino como lo pueden ser: _Valores de fichas_, _Montos rápidos de recargas_, _Tipo de cambio_, _Precios de membresía_ y _Horarios_.
2. Gestión de roles.
3. Administración de empleados.
4. Promociones.
5. Estadisticas.
6. Historial de operaciones.


## Estructura del proyecto.

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
├──  out
├── .gitignore
├──  index.js
├──  main.js
├──  package.json
└──  webpack.config.js

```


## Requeriminetos
* [Node 7.9.0](https://nodejs.org/es/) o mayor
* [Webpack 3.10.0](https://webpack.js.org/)
* [Electron](https://electronjs.org/)

## Ejecutar como developer.


### Procedimiento

1. Instalar las dependencias necesarias.

```
npm install
```

2. Ejecutar Webpack.

```
node_modules/.bin/webpack --watch 
```
o
```
webpack --watch
```

3. En el archivo __main.js__ descomentarla linea:
```javascript
win.openDevTools()
```

4. Ejecutar la aplicación:

```
electron main.js
```

## Generar instaladores
### Pre-empaquetado
En esta modalidad __no__ se empaqueta la apicación para distribuir, pero se genera el directorio correspondiente generando una apliación portable, esta modalidad es sugerida para realizar pruebas.

```
npm run pack
```

### Empaquetar la apliación
En esta modalidad se genera el instalador de la aplicación.
```
npm run dist
```
Por defecto se genera una carpeta __/dist__ en la raíz del proyecto con el instalador para __Windows__. En caso de requerir un instalador para otro sistema operativo se requiere modificar el archivo __package.json__ en la raíz del proyecto y colocar la [configuración](https://www.electron.build/configuration/configuration) correspondiente al sistema operativo:
```javascript
...},
  "build": {
    "appId": "com.app.dashboard",
    "win": {
      "target": "nsis"
    }
  },
}
```

## Documentación
La documentación general se encuentra en el archivo __index.html__ dentro del directorio __out__ de la raíz del proyecto. Para ver la documentación de cada uno de los archivos del proyecto basta con buscar el nombre de la clase y/o componente en la carpeta __out__. Por ejemplo: __Login.html__

