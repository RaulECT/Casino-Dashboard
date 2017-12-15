# Mesa de juegos.

## Descripción.
Módulo del administrador.
## Ejecutar como developer
### Requerimientos: 
* [Node 8.2.1] (https://nodejs.org/es/) o mayor
* [Yarn] (https://yarnpkg.com/lang/en/docs/install/) 
* [windows-build-tools] (https://www.npmjs.com/package/windows-build-tools)
o [Visual Studio Community (c++)] (https://www.visualstudio.com/vs/community/)

### Procedimiento

#### En caso de usar Visual Studio Community

Crer un proyecto de terminal c++ en VS Community y compilarlo.

#### General

1. Instalamos paquetes necesarios.

```
npm install -g bower
bower install
npm install node-pre-gyp
npm install grunt-cli
npm install escodegen
npm install --save-dev electron-rebuild
./node_modules/.bin/electron-rebuild
npm install
npm run yarn
```

2. Ejecutamos.
```
npm run start
```


## Instalación.
1. Instalar los paquetes para obsfuscación.
```
npm install -g grunt
```
2. Obsfuscamos el código.
```
grunt
```
3. Copiamos los archivos requeridos en el directorio obsfuscate.
```
cd ./obsfuscate
cp ../package.json ./
cp ../bower.json ./
cp -r ../assets/img ./assets/img
```
4. Instalamos paquetes necesarios.
```
npm install
bower install
npm run yarn
```

5. Creamos el instalador.
```
npm run dist
```

## Estructura del proyecto.
```
.
├── assets           
|   ├── css
|   ├── img
|   ├── js
|   ├── language
|   └── libs
├── templates
├── main.js
├── index.html
├── package.json
├── Gruntfile.js
└── casino.ico

```