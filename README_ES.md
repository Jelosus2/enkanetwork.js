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

## Tabla de Contenidos
- [Wrapper](#wrapper)
	- [Empezando](#empezando)
	- [Estructura del wrapper vs Estructura de la API](#estructura-del-wrapper-vs-estructura-de-la-api)
- [Buscadores](#buscadores)
	- [Nombres de Assets](#nombres-de-assets)  
		- [¿Como puedo obtener el hash de personajes, tarjetas de presentación, etc?](#¿como-puedo-obtener-el-hash-de-personajes-tarjetas-de-presentación-etc) 
	- [Imágenes de Assets](#imágenes-de-assets) 
		- [¿He obtenido el nombre del icono, pero donde está la imagen?](#¿he-obtenido-el-nombre-del-icono-pero-donde-está-la-imagen)
- [Creador y Soporte](#creador-y-soporte) 

## Wrapper

### Empezando

```js
const { Wrapper } = require('enkanetwork.js')

const cliente = new Wrapper(opciones)
/** opciones:
 * key: opcional
 */

async function obtenerDatos(uid) {
	const datos = await cliente.getPlayer(uid)
	console.log(datos)
}

obtenerDatos(738081787)
```

### Estructura del wrapper vs Estructura de la API

Las propiedades que no aparecen aquí tienen el mismo nombre que en la API oficial. Puedes revisar su [documentación](https://api.enka.network/#/) para más información.

| Wrapper | API |
| :---------- | :--- | 
| charactersInfo | avatarInfoList |
| showCharactersInfoList | showAvatarInfoList |
| characterId | avatarId |
| stats | fightPropMap |
| constellationsIdList | talentIdList |
| talentsLevelMap | skillLevelMap |
| xp | propMap.1001 |
| ascension | propMap.1002 |
| level | propMap.4001 |
| normalAttacks | skillLevelMap -> 1st value |
| elementalSkill | skillLevelMap -> 2nd value |
| elementalBurst | skillLevelMap -> 3rd value |
| artifactId | itemId `[Artifacts]` |
| mainStatId | mainPropId |
| subStatsIdList | appendPropIdList |
| stars | rankLevel |
| artifactMainstat | reliquaryMainstat |
| artifactSubstats | reliquarySubstats |
| mainStat | mainPropId `[reliquaryMainstat]` |
| stat | appendPropId |
| weaponId | itemId `[Weapon]` |
| weaponInfo | weapon |
| refinementLevel | affixMap |

Puedes encontrar las propiedas originales de `fightPropMap` en [Datos de las fightPropMap](https://api.enka.network/#/api_es?id=fightprop)

## Buscadores

## Nombres de Assets

El "buscador" **solo** puede encontrar los nombres de los assets que son dados en la API de enka, por ejemplo, no encontrará el nombre de una misión aunque tengas el hash del nombre.

```js
const { AssetNameFinder } = require('enkanetwork.js')

const buscador = new AssetNameFinder(opciones)
/** opciones:
 * language: opcional. El idioma por defecto es el Inglés
 * Todos los idiomas dentro del juego son soportados.
 */

function obtenerNombreAsset(nameHash) {
	const nombre = buscador.search(nameHash).value
	console.log(nombre)
} 

obtenerNombreAsset(1997709467)
```

### ¿Como puedo obtener el hash de personajes, tarjetas de presentación, etc?

Puedes obtener el hash de nombre de personajes, tarjetas de presentación, constelaciones y talentos usando sus correspondientes ids, por ejemplo:

```js
function obtenerHashPersonaje(nameHash) {
	const nombre = buscador.search(nameHash).value
	console.log(nombre) //Resultado: Xiao (depende del idioma seleccionado)
}

obtenerHashPersonaje(buscador.getCharacterHash(10000026).value)
// 10000026 es la id de personaje de Xiao
```

## Imágenes de Assets

El "buscador" **solo** puede encontrar imágenes de los assets que son dados en la API de enka, por ejemplo, no encontrará la imagen de un NPC aunque tengas la id.

```js
const { AssetImageFinder } = require('enkanetwork.js')

const buscador = new AssetImageFinder()

function obtenerImagenPersonaje(id) {
	const imagen = buscador.character(id).icon
	console.log(imagen) // Resultado: UI_AvatarIcon_Xiao
}

obtenerImagenPersonaje(10000026)
// 10000026 es la id de personaje de Xiao
```

Puedes obtener las imágenes de constelaciones, talentos, armas y tarjetas de presentación también.

### ¿He obtenido el nombre del icono, pero donde está la imagen?

Puedes obtener la imagen con la siguiente URL: `https://enka.network/ui/[NOMBRE_DEL_ICONO].png`, aunque también puedes obtenerla directamente con este código:

```js
function obtenerLinkImagenAsset(iconName) {
	const url = finder.toLink(iconName)
	console.log(url) // Resultado: https://enka.network/ui/UI_AvatarIcon_Xiao.png
}

obtenerLinkImagenAsset("UI_AvatarIcon_Xiao")
```

## Creador y Soporte

Creador: [Jelosus1](https://github.com/Jelosus2/)
Si necesitas soporte puedes contactarme por discord: Jelosus1#7864.
Unete al [servidor de discord de enka](https://discord.gg/eUv6gcsjqe). Puedes mencionarme allí también para obtener soporte.