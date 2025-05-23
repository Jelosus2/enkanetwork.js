# EnkaNetwork.js


[EN](./README.md) | ES

Un paquete para obetener datos de la API de enka, para Genshin y Star Rail, también incluye un "buscador" que puedes usar para buscar nombres e imágenes de assets del juego, por ejemplo el nombre o imagen de un personaje. Revisa [Buscadores](#buscadores) para más información.

## Changelog
<details>
  <summary>Haz click para expandir</summary>

  - v2.10.9:
    - Añadido el contenido de la versión 3.3 de Star Rail.
  - v2.10.8:
    - Añadido el contenido de la versión 5.6 de Genshin.
  - v2.10.7:
    - Añadido el contenido de la versión 3.2 de Star Rail.
  - v2.10.6:
    - Añadido el contenido de la versión 5.5 de Genshin.
  - v2.10.5:
	  - Añadido el contenido de la versión 3.1 de Star Rail.
  - v2.10.4:
    - Añadido el contenido de la versión 5.4 de Genshin.
  - v2.10.3:
	  - Añadido el contenido de la versión 3.0 de Star Rail.
	  - Optimizado el rendimiento un poco.
	  - Eliminada la propiedad `name` de `player.characters[].traces[].baseSkill` (Star Rail) ya que ahora esta está presente el objeto `traces`.
	  - Añadidas las skins de personaje y las propiedades sobre los ajuste de privacidad de Star Rail.
  - v2.9.3:
	  - Feliz año nuevo! :)
	  - Añadido el contenido de la versión 5.3 de Genshin.
  - v2.9.2:
	  - Añadido el contenido de la versión 2.7 de Star Rail.
  - v2.9.1:
    - Añadido el contenido de la versión 5.2 de Genshin.
  - v2.9.0:
    - Añadido el contenido de la versión 2.6 de Star Rail.
  - v2.8.9:
    - Añadido el contenido de la versión 5.1 de Genshin.
  - v2.8.8:
    - Añadido el último excel para el árbol de habilidades en Star Rail (parece que no lo incluí en la última actualización).
	- Arreglada la propiedad `theaterMode` para las usuarios que no intentaron jugar el teatro.
  - v2.8.7:
	  - Añadido el contenido de la versión 2.5 de Star Rail.
  - v2.8.6:
	  - Arreglado el valor incorrecto para la dificultad del teatro.
	  - Corregido un error gramatical en las propiedad `theaterModeIndex` y `theaterMode` (antes era theat**h**erModeIndex y theat**h**erMode).
  - v2.8.5:
	  - Añadido el contenido de la versión 5.0 de Genshin.
	- Nuevos campos añadidos a la clase `Player`. (Nota: Estos nuevos campos no se mostraran a los usuarios recuperados que no hayan iniciado sesión después de la actualización):
		```
		# propiedad: tipo | valor si está vacia o si es nula
		theaterAct: number | ""
		theaterModeIndex: number | ""
		theaterMode: string | ""
		theaterStars: number | 0
		publicConstellations: boolean | false
		maxFriendshipCount: number | 0

		abyss.stars: number | 0

		showcase.elementIndex: number | ""
		showcase.element: string | ""
		showcase.constellations: number | 0
  - v2.8.3:
	  - Añadido el contenido de la versión 2.4 de Star Rail.
  - v2.8.2:
	  - Añadido el contenido de la versión 4.8 de Genshin.
  - v2.8.1:
	  - `pureFictionLastFinishedStage` y `pureFictionStarCount` fueron cambiados por `currentRotatingEndgameContentLastFinishedStage` y `currentRotatingEndgameContentScore` ya que no es solo pura ficción, sino todo el contenido del endgame que rota como la Memoria Caótica.
	  - Añadido el contenido de la versión 2.3 de Star Rail.
  - v2.8.0:
	  - Error en las fotos de perfil que no son de un personaje solucionado (Genshin).
	  - Añadido el contenido de la versión 4.7 de Genshin.
  - v2.7.8:
	  - `booksCollected`, `relicsOwned`, `musicCollected`, `pureFictionLastFinishedStage` y `pureFictionStarCount` añadido a **\<request\>.player.recordInfo**.
	  - Añadido el contenido de la versión 2.2 de Star Rail.
  - v2.7.6:
	  - Añadido el contenido de la versión 4.6 de Genshin.
  - v2.7.5:
	  - Añadido el contenido de la versión 2.1 de Star Rail.
  - v2.7.4:
	  - Añadida la rareza de los personajes y armas.
	  - Estructura actualizada un poco.
  - v2.7.3:
    - Añadido el contenido de la versión 4.5 de Genshin.
  - v2.7.2:
    - Arreglado el error cuando un artefacto no tiene substats tira un error al intentar obtener la calidad del roll (Genshin).
  - v2.7.1:
    - Añadido el contenido de la versión 2.0 de Star Rail.
 - v2.7.0:
	  - Añadido el contenido de la versión 4.4 de Genshin.
	  - Actualizado el regex para la validación de UID por las nuevas UIDs (18XXXXXXXX). Gracias a yuko1101 por proveerlo!
	  - Añadida la calidad de roll para los substats de los artefactos en Genshin y Star Rail.
  - v2.6.6:
	  - Soporte añadido para las nuevas UIDs de China (3XXXXXXXX)
		- Añadido el nivel máximo de cada personaje por su ascensión en Genshin y Star Rail.
  - v2.6.5:
	  - Arreglado el error donde los valores del Salón olvidado y la Memoria del Caos eran incorrectos.
	  - Añadidos los elementos de los personajes en Genshin Impact.
	  - Cambiado como funciona `fhLastFinishedFloor` para añadir los valores del último piso acabado para jarilo vi y el xianzhou luofu. Revisa los cambios importantes (BREAKING_CHANGES.md)
  - v2.6.3:
	  - Añadido el contenido de la versión 1.6 de Star Rail.
  - v2.6.2:
	  - Me he olvidado de incluir algunas propiedades en el json de los hashes de Genshin :)
  - v2.6.1:
	  - Añadido el contenido de la versión 4.3 de Genshin.
  - v2.6.0:
	  - Añadido el calculo de stats de los personajes en Star Rail.
	  - Añadido el contenido de la versión de 1.5 de Star Rail.
  - v2.5.3:
	  - Añadido el contenido de la versión 4.2 de Genshin.
  - v2.5.2:
    - Arreglada la ruta de los iconos de los rastros.
	  - Arreglado un bug sobre las fotos de perfil en Star Rail.
  - v2.5.1:
	  - Añadido el contenido de la versión 1.4 de Star Rail.
	  - Actualizada la estructura de los registros del jugador para que coincida con la API.
  - v2.5.0 ([contiene cambios importantes menores](./BREAKING_CHANGES.md#from-v221-to-250)):
	  - Añadido full soporte para la API de Star Rail.
	  - Implementado el nuevo sistema de fotos de perfil de Genshin.
	  - Mejorada la optimización.
	  - Arreglados algunos bugs.
  - v2.2.1:
	  - Añadido el contenido de la versión 4.0.
	  - Arreglado cuando un jugador tenía en su perfil al Viajero sin elemento, tiraría un error.
	  - Arreglada la incorrecta visualización de los assets del Viajero.
	  - Algunos bugs arreglados.
  - v2.1.9:
	  - Añadida barra diagonal al final de los endpoints relacionados con los perfiles de Enka para evitar redirecciones y mejorar la estabilidad de los rate limits.
  - v2.1.8:
	  - Arreglo rápido del problema de cuando un usuario tenía builds de Honkai: Star Rail en el hoyo de su perfil tiraría un error al intentar obtenerlas, el soporte para dichos hoyos vendrá muy pronto.
  - v2.1.7:
	  - Añadido el contenido de la versión 3.8.
  - v2.1.6:
	  - Añadido el contenido de la versión 3.7.
	  - Añadido un parseador para parsear las IDs de los substats de un artefacto: `Wrapper.parseSubstats()`.
  - v2.1.4:
	  - Removido el recargar automático de los archivos porque incrementaría enormemente el tiempo de petición de información de los jugadores.
  - v2.1.3:
	  - Arreglado cuando al usar el método `character()` de la clase **AssetFinder** e introducir la id de personaje de uno de los viajeros con su id de habilidad de elemento tiraraba un error.
	  - Arreglado cuando el actualizador de contenido descargaba los archivos con el contenido incompleto, desembocando en errores.
	  - Ahora no será necesario reiniciar la aplicación cuando los archivos de contenido se descarguen para leer su nuevo contenido.
	  - Si algún archivo caché se corrompe se eliminará automáticamente y se creará uno nuevo con datos frescos.
	  - Ahora puedes borrar el directorio del caché con `CacheHandler.deleteCacheDirectory()`.
  - v2.1.2:
	  - Arreglado cuando el jugador tenía al Viajero/a en el perfil tiraba un error.
  - v2.1.1:
	  - Arreglado el error que mostraba erróneamente el orden de las habilidades de los personajes.
	  - Añadido un buscador de disfraces a `AssetFinder`.
	  - Añadido el contenido de la versión 3.5.
  - v2.1.0 ([Cambios rompedores](/BREAKING_CHANGES.md) desde <v2.0.2):
	  - Implementadas las nuevas rutas y los datos de los perfiles.
	  - Cambia la estructura de los perfiles, revisé la [nueva estructura](/STRUCTURE.md).
	  - Actualizado la estructura del jugador para añadir el campo `owner`.
	  - Arreglado cuando buscas el nombre de un arma devuelve un string vacío.
	  - Arreglados bugs y errores.
  - v2.0.2:
	  - Arreglado cuando el arma del personaje no tiene refinamiento salta un error.
  - v2.0.1:
	  - Cambiada la ruta de peticiones de información del jugador, ya que `/u/<UID>/__data.json` no se usará más y en 2 días dejará de existir.
	  - Eliminado el parametro `key` de la clase **Wrapper** ya que no se necesita más.
	  - Añadida la ruta del perfil del jugador (en caso de exista) a la estructura del jugador.
  - v2.0.0:
	  - La estructura de los datos y alguna estructura del paquete han sido rediseñadas.
	  - Se han juntado las clases `AssetNameFinder` y `AssetImageFinder` en `AssetFinder`.
	  - Añadido un auto actualizador de contenido para el contenido de las nuevas versiones de Genshin Impact.
	  - Añadido un sistema de caché (opcional) para reducir las peticiones a la API de Enka.
	  - Arreglados algunos bugs y errores.
	  - Añadido JSDoc.
  - v1.3.10: 
	  - Archivos del paquete reducidos.
  - v1.3.9:
	  - Añadido el contenido de la versión 3.3 + los idiomas IT y TR.
  - v1.3.6
	  - Añadido el contenido de la versión 3.2.
	  - Ahora puedes acceder a los nombres/imágenes de los assets directamente desde los objetos de personajes, tarjetas, etc.
  - v1.3.0:
	  - Arreglados los talentos de Ayaka y Mona.
	  - Añadido el proudSkillExtraLevelMap faltante.
	  - Añadido soporte para User Agent personalizados en las solicitudes.
	  - Añadido el contenido de la versión 3.1.
  - v1.2.1:
	  - Mejorada la estructura de los datos para un mejor manejo.
	  - Ahora los valores vacíos retornarán arreglos, objetos y strings vacíos en vez de null.
	  - Solucionados algunos bugs.
	  - Añadido soporte para la API de perfiles.
  - v1.1.1:
	  - Añadido el contenido de la versión 3.0.
	  - Añadidas las imágenes gacha de los personajes.
	  - Cambiada la url del CDN de enka.
  - v1.0.1:
	  - Cambiada la URL de peticiones para evitar códigos 301 innecesarios.
</details>

## Tabla de Contenidos
- [Wrapper](#wrapper)
	- [Empezando](#empezando)
	- [Sistema caché](#sistema-caché)
	- [Perfiles de usuario](#perfiles-de-enka)
	- [Estructura del wrapper vs Estructura de la API](#estructura-del-wrapper-vs-estructura-de-la-api)
- [Actualizador de Contenido](#actualizador-de-contenido)
- [Buscadores](#buscadores)
	- [¿He obtenido el nombre del icono, pero donde está la imagen?](#¿he-obtenido-el-nombreruta-del-icono-pero-donde-está-la-imagen)
- [Posición de Ratros](#posición-de-ratros)
- [Lista de Calidad del Roll](#lista-de-calidad-del-roll)
- [Creador y Soporte](#creador-y-soporte) 
- [Créditos](#créditos)

## Wrapper

### Empezando
Puedes obtener la información sobre un jugador usando la función `getPlayer`. Un ejemplo:
```js
const { Wrapper } = require('enkanetwork.js')

// El cliente de Genshin y Star Rail.
const { genshin, starrail } = new Wrapper(opciones);

/** opciones:
 * userAgent: string -> opcional (por defecto es enkanetwork.js/v<versión_del_paquete>)
 * language: string -> opcional (por defecto es Inglés)
 * cache: booleano -> opcional (por defecto es false) 
 */

// O starrail. Funciona para ambos
genshin.getPlayer(738081787)
.then((jugador) => console.log(jugador))
.catch((err) => console.log(err));
```

### Sistema caché
Puedes habilitar el sistema caché para que los datos estén en caché hasta que expire el ttl. Ayuda a prevenir rate limits.
```js
const { Wrapper } = require('enkanetwork.js')

// El cliente de Genshin y Star Rail.
const { genshin, starrail } = new Wrapper({
  cache: true
});

// O starrail. Pide la información del jugador y la guarda en caché hasta que el ttl expire.
genshin.getPlayer(738081787)
.then((jugador) => console.log(jugador))
.catch((err) => console.log(err));
```

### Perfiles de Enka
Puedes obtener la información de perfiles, cuentas vínculadas al perfil y builds de un perfil de Enka.
```js
const { Wrapper } = require('enkanetwork.js')

// El cliente de Genshin y Star Rail.
const { genshin, starrail } = new Wrapper();

// Las funciones de abajo funcionan tanto en el cliente de Genshin como en el de Star Rail.

// Obtener información sobre el perfil de alguien.
genshin.getEnkaProfile('Jelosus1')
.then((perfil) => console.log(perfil))
.catch((err) => console.log(err));

// Obtener información sobre los hoyos (cuentas del juego) de alguien. 
genshin.getEnkaHoyos('Jelosus1')
.then(async (hoyo) => {
  console.log(hoyo);

  // Puedes obtener directamente las builds guardadas en un hoyo o puedes usar el metodo fuera de el callback "then".
  const builds = await hoyo[0].getHoyoBuilds();
  console.log(builds);
})
.catch((err) => console.log(err));

// Metodo alternativo para obtener las builds de un hoyo. El hash del hoyo es requerido.
genshin.getEnkaHoyoBuilds('Jelosus1', '3A8F5o')
.then((builds) => console.log(builds))
.catch((err) => console.log(err));
```

### Estructura del wrapper vs Estructura de la API

> Necesita ser remodelado. Estate atento!

Puedes encontrar los cambios de la estructura [aquí](/STRUCTURE.md)

Puedes encontrar las propiedas originales de `fightPropMap` en [Datos de las fightPropMap](https://api.enka.network/#/api_es?id=fightprop)

## Actualizador de Contenido
Puedes descargar automaticamente el contenido de los juegos (Requiere reiniciar el proceso para aplicar los cambios).
```js
const { ContentUpdater } = require('enkanetwork.js')
const actualizador = new ContentUpdater(opciones);
/** opciones:
 * checkInterval: número -> opcional (por defecto son 20000 ms (20 segundos))
 */

// Si el contenido se actualiza con éxito.
actualizador.on('onUpdateSuccess', () => {
  console.log('Los archivos de contenido se han actualizado con éxito!');
});

// Si la actualización del contenido falla.
actualizador.on('onUpdateFail', (mensajeDeError) => {
  console.log(mensajeDeError);
});

// Revisa las actualizaciones, tanto de Genshin como Star Rail.
actualizador.checkForUpdates();
```

## Buscadores
El "buscador" **solo** puede encontrar los nombres y los assets que están disponibles en la API de enka, por ejemplo, no encontrarás el nombre de una misión aunque tengas el hash del nombre.

```js
const { AssetFinder } = require('enkanetwork.js')

// El buscador de assets de Genshin y Star Rail.
const { genshin, starrail } = new AssetFinder(opciones);
/** opciones:
 * language: string -> opcional. 
 * Inglés es el idioma por defecto.
 * Todos los lenguajes del juego soportados.
 */

// Aquí 2 ejemplos que funcionan en los dos tipos de buscadores.

// Assets y nombre de un personaje de Genshin y Star Rail (iconos, constelaciones/eidolones imágenes, etc).
genshin.character(10000046).name; // Hu Tao
genshin.character(10000046).assets; // Assets de Hu Tao

starrail.character(1208).name; // Fu Xuan
starrail.character(1208).assets; // Assets de Fu Xuan.

// Valor de los hashes de Genshin y Star Rail.
genshin.hash(1940919994).value; // Hu Tao
starrail.hash(1558534342).value; // Fu Xuan
```

También puedes obtener las imágenes de personajes, constelaciones, habilidades, armas, disfraces, tarjetas de presentación y fotos de perfil para Genshin. También puedes obtener las imágenes de personajes, eidolones, habilidades, conos de luz, rastros, artefactos y fotos de perfil para Star Rail.

### ¿He obtenido el nombre/ruta del icono, pero donde está la imagen?

Puedes obtener la imagen con la siguiente URL: `https://enka.network/ui/[NOMBRE_DEL_ICONO].png` para Genshin o `https://enka.network/ui/[RUTA_DEL_ICONO].png`, aunque también puedes obtenerla directamente con este código:

```js
// Genshin
const url = genshin.toLink('UI_AvatarIcon_Hutao');
console.log(url); // Resultado: https://enka.network/ui/UI_AvatarIcon_Hutao.png

// Star Rail
const url = starrail.toLink('SpriteOutput/AvatarRoundIcon/1208.png');
console.log(url); // Resultado: https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/1208.png
```

## Posición de Ratros
La posición de los rastros depende del tipo de vía del personaje. Aquí muestro un esquema por cada vía, creditos para [FortOfFans](https://github.com/FortOfFans) por crearlo.

![rastros](./images/Traces.png)

## Lista de Calidad del Roll

| Genshin | Star Rail |
|---------|-----------|
| 4 - Roll maximo | 3 - Roll maximo |
| 3 - Roll casi maximo | 2 - Roll medio |
| 2 - Roll medio | 1 - Roll bajo |
| 1 - Roll bajo | - |

## Creador y Soporte

Creador: [Jelosus1](https://github.com/Jelosus2/)
Si necesitas soporte puedes contactarme por discord: Jelosus1.
Unete al [servidor de discord de enka](https://discord.gg/eUv6gcsjqe). Puedes mencionarme allí también para obtener soporte.

## Créditos

- Algoinde
	- Aportó el código base para hacer los calculos de los stats de los personajes en Star Rail.