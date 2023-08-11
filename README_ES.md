# EnkaNetwork.js


[EN](/README.md) | ES

Un paquete para obetener datos de la API de enka, también incluye un "buscador" que puedes usar para buscar nombres e imágenes de assets del juego, por ejemplo el nombre o imagen de un personaje. Revisa [Buscadores](#buscadores) para más información.

## Changelog
- v1.0.1:
	- Cambiada la URL de peticiones para evitar códigos 301 innecesarios.
- v1.1.1:
	- Añadido el contenido de la versión 3.0.
	- Añadidas las imágenes gacha de los personajes.
	- Cambiada la url del CDN de enka.
- v1.2.1:
	- Mejorada la estructura de los datos para un mejor manejo.
	- Ahora los valores vacíos retornarán arreglos, objetos y strings vacíos en vez de null.
	- Solucionados algunos bugs.
	- Añadido soporte para la API de perfiles.
- v1.3.0:
	- Arreglados los talentos de Ayaka y Mona.
	- Añadido el proudSkillExtraLevelMap faltante.
	- Añadido soporte para User Agent personalizados en las solicitudes.
	- Añadido el contenido de la versión 3.1.
- v1.3.6
	- Añadido el contenido de la versión 3.2.
	- Ahora puedes acceder a los nombres/imágenes de los assets directamente desde los objetos de personajes, tarjetas, etc.
- v1.3.9:
	- Añadido el contenido de la versión 3.3 + los idiomas IT y TR.
- v1.3.10: 
	- Archivos del paquete reducidos.
- v2.0.0:
	- La estructura de los datos y alguna estructura del paquete han sido rediseñadas.
	- Se han juntado las clases `AssetNameFinder` y `AssetImageFinder` en `AssetFinder`.
	- Añadido un auto actualizador de contenido para el contenido de las nuevas versiones de Genshin Impact.
	- Añadido un sistema de caché (opcional) para reducir las peticiones a la API de Enka.
	- Arreglados algunos bugs y errores.
	- Añadido JSDoc.
- v2.0.1:
	- Cambiada la ruta de peticiones de información del jugador, ya que `/u/<UID>/__data.json` no se usará más y en 2 días dejará de existir.
	- Eliminado el parametro `key` de la clase **Wrapper** ya que no se necesita más.
	- Añadida la ruta del perfil del jugador (en caso de exista) a la estructura del jugador.
- v2.0.2:
	- Arreglado cuando el arma del personaje no tiene refinamiento salta un error.
- v2.1.0 ([Cambios rompedores](/BREAKING_CHANGES.md) desde <v2.0.2):
	- Implementadas las nuevas rutas y los datos de los perfiles.
	- Cambia la estructura de los perfiles, revisé la [nueva estructura](/STRUCTURE.md).
	- Actualizado la estructura del jugador para añadir el campo `owner`.
	- Arreglado cuando buscas el nombre de un arma devuelve un string vacío.
	- Arreglados bugs y errores.
- v2.1.1:
	- Arreglado el error que mostraba erroneamente el orden de las habilidades de los personajes.
	- Añadido un buscador de disfraces a `AssetFinder`.
	- Añadido el contenido de la versión 3.5. 
- v2.1.2:
	- Arreglado cuando el jugador tenía al viajero/a en el perfil tiraba un error.
- v2.1.3:
	- Arreglado cuando al usar el método `character()` de la clase **AssetFinder** e introducir la id de personaje de uno de los viajeros con su id de habilidad de elemento tiraraba un error.
	- Arreglado cuando el actualizador de contenido descargaba los archivos con el contenido incompleto, desembocando en errores.
	- Ahora no será necesario reiniciar la aplicación cuando los archivos de contenido se descarguen para leer su nuevo contenido.
	- Si algún archivo caché se corrompe se eliminará automaticamente y se creará uno nuevo con datos frescos.
	- Ahora puedes borrar el directorio del caché con `CacheHandler.deleteCacheDirectory()`
- v2.1.4:
	- Removido el recargar automático de los archivos porque incrementaría enormemente el tiempo de petición de información de los jugadores.
- v2.1.6:
	- Añadido el contenido de la versión 3.7.
	- Añadido un parseador para parsear las IDs de los substats de un artfacto: `Wrapper.parseSubstats()`.
- v2.1.7:
	- Añadido el contenido de la vérsion 3.8.
- v2.1.8:
	- Arreglo rápido del problema de cuando un usuario tenia builds de Honkai: Star Rail en el hoyo de su perfil tiraría un error al intentar obtenerlas, el soporte para dichos hoyos vendrá muy pronto. 
- v2.1.9:
	- Añadida barra diagonal al final de los endpoints relacionados con los perfiles de Enka para evitar redirecciones y mejorar la estabilidad de los rate limits.

## Tabla de Contenidos
- [Wrapper](#wrapper)
	- [Empezando](#empezando)
	- [Sistema caché](#sistema-caché)
	- [Perfiles de usuario](#perfiles-de-usuario)
	- [Estructura del wrapper vs Estructura de la API](#estructura-del-wrapper-vs-estructura-de-la-api)
- [Actualizador de Contenido](#actualizador-de-contenido)
- [Buscadores](#buscadores)
	- [¿He obtenido el nombre del icono, pero donde está la imagen?](#¿he-obtenido-el-nombre-del-icono-pero-donde-está-la-imagen)
- [Creador y Soporte](#creador-y-soporte) 

## Wrapper

### Empezando

```js
const { Wrapper } = require('enkanetwork.js')

const cliente = new Wrapper(opciones)
/** opciones:
 * userAgent: string -> opcional (por defecto es enkanetwork.js/v<versión_del_paquete>)
 * language: string -> opcional (por defecto es Inglés)
 * cache: boolean -> opcional (por defecto es false) 
 */

async function obtenerDatos(uid) {
	const datos = await cliente.getPlayer(uid)
	console.log(datos)
}

obtenerDatos(738081787)
```

### Sistema caché

```js
const { Wrapper } = require('enkanetwork.js')

const cliente = new Wrapper({
	cache: true
})

async function obtenerDatosConCache(uid) {
	const datos = await cliente.getPlayer(uid)
	console.log(datos)
}

obtenerDatosConCache(738081787)
```

### Perfiles de Enka

```js
const { Wrapper } = require('enkanetwork.js')

const cliente = new Wrapper(opciones)
/** opciones:
 * userAgent: string -> opcional (por defecto es enkanetwork.js/v<versión_del_paquete>)
 * language: string -> opcional (por defecto es Inglés)
 * cache: boolean -> opcional (por defecto es false) 
 */

// EL lenguaje es opcional
async function obtenerUsuario(usuario, hash, lenguaje) {
	const perfil = await cliente.getEnkaProfile(usuario)

	const hoyos = await cliente.getEnkaHoyos(usuario, lenguaje)

	const builds = await cliente.getEnkaHoyoBuilds(usuario, hash, lenguaje)
}

obtenerUsuarios('algoinde', '4Wjv2e', 'es')
```

### Estructura del wrapper vs Estructura de la API

Puedes encontrar los cambios de la estructura [aquí](/STRUCTURE.md)

Puedes encontrar las propiedas originales de `fightPropMap` en [Datos de las fightPropMap](https://api.enka.network/#/api_es?id=fightprop)

## Actualizador de Contenido

```js
const { ContentUpdater } = require('enkanetwork.js')
const actualizador = new ContentUpdater(opciones)
/** opciones:
 * checkInterval: number -> opcional (por defecto son 20000 ms (20 segundos))
 */

actualizador.on('onUpdateSuccess', () => {
    console.log('¡Los archivos de contenido se han actualizado correctamente!')
})

actualizador.on('onUpdateFail', (mensajeDeError) => {
    console.log(mensajeDeError)
})

actualizador.checkForUpdates()
```

## Buscadores

El "buscador" **solo** puede encontrar los nombres y los assets que están disponibles en la API de enka, por ejemplo, no encontrarás el nombre de una misión aunque tengas el hash del nombre.

```js
const { AssetFinder } = require('enkanetwork.js')

const buscador = new AssetNameFinder(opciones)
/** opciones:
 * language: string -> opcional.
 * El idioma por defecto es el Inglés.
 * Todos los idiomas dentro del juego son soportados.
 */

function obtenerPersonaje(idPersonaje) {
	const assets = buscador.character(idPersonaje).assets
	const nombre = buscador.character(idPersonaje).name
	console.log(assets, nombre) // Salida: los assets y el nombre de Hu Tao
}

function obtenerNombrePorHash(hash) {
	const nombre = buscador.hash(hash).value
	console.log(nombre) // Salida: Hu Tao (depende del lenguaje)
} 

obtenerPersonaje(10000046) // ID de personaje de Hu Tao
obtenerNombrePorHash(1940919994) // Hash de Hu Tao
```

También puedes obtener las imagenes de personajes, constelaciones, habilidades, armas, disfraces y tarjetas de presentación.

### ¿He obtenido el nombre del icono, pero donde está la imagen?

Puedes obtener la imagen con la siguiente URL: `https://enka.network/ui/[NOMBRE_DEL_ICONO].png`, aunque también puedes obtenerla directamente con este código:

```js
function obtenerLinkDeImagen(nombreIcono) {
	const url = buscador.toLink(nombreIcono)
	console.log(url) // Resultado: https://enka.network/ui/UI_AvatarIcon_Hutao.png
}

obtenerLinkDeImagen("UI_AvatarIcon_Hutao")
```

## Creador y Soporte

Creador: [Jelosus1](https://github.com/Jelosus2/)
Si necesitas soporte puedes contactarme por discord: Jelosus1#7864.
Unete al [servidor de discord de enka](https://discord.gg/eUv6gcsjqe). Puedes mencionarme allí también para obtener soporte.
