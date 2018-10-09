# Bingo app



## Correr la app localmente

Para poder ejecutar la app de manera local se deben seguir las siguientes instrucciones:

1.  Instalar las dependencias de la app mediante el comando `npm install`.
2.  Iniciar la aplicación mediante el comando `npm start`
3.  Ingresar al navegador a la URL: [http://localhost:3000/](http://localhost:3000/)

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

### Próxima partida

Esta sección aparecera una vez que el usuario haya ingresado a la aplicación. En esta pantalla se mostrará la siguiente partida que se tiene registrada. Para poder dar comienzo a esa partida es necesario registrar al menos 1 folio de un carton, se recomienda el folio **123456** para probar todo el juego. 

### Control de partida en tiempo real

Esta sección corresponde a los controles de la partica actual. En esta pantalla se muestra la información de la partida actual, número de turnos y carta actual. Esta sección cuenta con accesos a la aplicación del bingo e historial de cartas cantadas.

Esta sección cuenta con la opción de validar si algún carton de lotería es ganador, solo basta con ingresar el folio del carton y la apliación verificará si ese carton ha ganado la partida o no.

### Creación de partidas

Esta sección corresponde al formulario para crear partidas de lotería. 



## Aplicación de Bingo

Para acceder a esta aplicación ingrese a la dirección  [http://localhost:3000/game](http://localhost:3000/game). Esta aplicación corresponde a la que los jugadores estarán observando durante la partida de lotería.



## Producción

En caso de subir la aplicación a un servidor de producción, se tendrá que modificar el archivo `socket.js` ubicado en la carpeta `/development`.  Se tendrá que realizar la siguiente modificación:

```javascript
...
/*
 * SE TENDRÁ QUE COMENTAR LA SIGUIENTE LINEA Y DESCOMENTAR LA QUE HACE REFERENCIA AL   
 * SERVIDOR DE PRODUCCIÓN SUSTITUYENDO 'PRODUCTION_URL' CON LA URL DEL SERVER.
 */
const socketURL = 'http://localhost:3000' // COMENTAR ESTA LINEA
//const socketURL = 'PRODUCTION_URL' // PRODUCTION // DESCOMENTAR ESTA LINEA
...
```