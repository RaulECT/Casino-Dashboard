# Bingo app



## Correr la app localmente

Para poder ejecutar la app de manera local se deben seguir las siguientes instrucciones:

1.  Instalar las dependencias de la app mediante el comando `npm install`.
2. Ejecutar los siguientes scripts en terminales separadas:
   1. Webpack: `npm run watch:webpack`.
   2. Node server: `npm run devserver`.
3. Ingresar al navegador a la URL: [http://localhost:3000/](http://localhost:3000/)

**Nota:** si se desea ver la interacción del dashboard y la aplicación de bingo, ingresar en ventanas diferentes al dashboard y a la aplicación de bingo.

## Dashboard

Si no se ha iniciado sesión con anterioridad, la aplicación mostrara la pantalla de Login al usuario. Para poder iniciar sesión dentro del dashboard se necesita ingresar el siguiente usuario y contraseña:

```javascript
{
    email: "SuperAdminPruebas",
    password: "UptPD74PA"
}
```

En caso de un inicio éxitoso de sesión, la aplicación redirigirá al usuario a la sección de *Control de Juego* para poder iniciar una partida de lotería.



### Control de partida en tiempo real

El control de partida en tiempo real ocurrira una vez que el usuario presione el boton *Iniciar Partida*. En esta pantalla el usuario podrá ver los datos de la partida actual y cantar cartas para que se muestren en la aplicación de bingo.

Así mismo el usuario podrá ingresar el folio de una posible cartilla ganadora, para ver una demostración, ingrese el folio: **1234**. Se le notificará al usuario que el folio corresponde al ganador y en la aplicación de bingo mostrara la pantalla del ganador.



## Aplicación de Bingo

Para acceder a esta aplicación ingrese a la dirección  [http://localhost:3000/game](http://localhost:3000/game). Si desear cantar cartas en esa aplicación, se podrá hacer precionando la tecla **enter**.



## Producción

En caso de subir la aplicación a un servidor de producción, se tendrá que modificar el archivo `socket.js` ubicado en la carpeta `/development`.  Se tendrá que realizar la siguiente modificación:

```javascript
...
/*
 * SE TENDRÁ QUE COMENTAR LA SIGUIENTE LINEA Y DESCOMENTAR LA QUE HACE REFERENCIA AL   
 * SERVIDOR DE PRODUCCIÓN SUSTITUYENDO 'PRODUCTION_URL' CON LA URL DEL SERVER.
 */
const socketURL = 'http://localhost:3000' 
//const socketURL = 'PRODUCTION_URL' // PRODUCTION
...
```