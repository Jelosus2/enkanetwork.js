# EnkaNetwork.js

EN | [ES](/README_ES.md)

A package to get data from the enka API, it also includes a finder that you can use to search for names and images of game assets, for example a name or image of a character. Check [Finders](#finders) for more information.

## Table of Content
- [Wrapper](#wrapper)
	- [Getting started](#getting-started)
	- [Wrapper Structure vs API Structure](#wrapper-structure-vs-api-structure)
- [Finders](#finders)
	- [Asset Names](#asset-names)  
		- [How can i get the hash of characters, namecards, etc?](#how-can-i-get-the-hash-of-characters-namecards-etc) 
	- [Asset Images](#asset-images) 
		- [I got the icon name, but where is the image?](#i-got-the-icon-name-but-where-is-the-image)
- [Creator and Support](#creator-and-support) 

## Wrapper

### Getting Started

```js
const { Wrapper } = require('enkanetwork.js')

const client = new Wrapper(options)
/** options:
 * key: optional
 */

async function getData(uid) {
	const data = await client.getPlayer(uid)
	console.log(data)
}

getData(738081787)
```

### Wrapper Structure vs API Structure
The properties that doesn't appear here have the same name as in the official API. You can check their [documentation](https://api.enka.network/#/) for more information.

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

You can find `fightPropMap` original properties in [fightPropMap Data](https://api.enka.network/#/api?id=fightprop)

## Finders

## Asset Names

The finder can **only** find names of the assets provided in the enka API, for example it won't find the name of a quest even if you have the name hash.

```js
const { AssetNameFinder } = require('enkanetwork.js')

const finder = new AssetNameFinder(options)
/** options:
 * language: optional. English is the default language
 * All in-game languages supported
 */

function getAssetName(nameHash) {
	const name = finder.search(nameHash).value
	console.log(name)
} 

getAssetName(1997709467)
```

### How can i get the hash of characters, namecards, etc?

You can get the name hash of characters, namecards, constellations and talents using their corresponding id, for example:

```js
function getCharacterName(nameHash) {
	const name = finder.search(nameHash).value
	console.log(name) //Output: Xiao (depends on selected language)
}

getCharacterName(finder.getCharacterHash(10000026).value)
// 10000026 is the character id for Xiao
```

## Asset Images

The finder can **only** find images of the assets provided in the enka API, for example it won't find the image of a NPC even if you have the id.

```js
const { AssetImageFinder } = require('enkanetwork.js')

const finder = new AssetImageFinder()

function getCharacterImage(id) {
	const image = finder.character(id).icon
	console.log(image) // Output: UI_AvatarIcon_Xiao
}

getCharacterImage(10000026)
// 10000026 is Xiao's character id
```

You can get the images of constellations, talents, weapons and namecards too.

### I got the icon name, but where is the image?

You can get the image with the following URL: `https://enka.shinshin.moe/ui/[ICON_NAME].png`, however you can get it directly with this code:

```js
function getAssetImageLink(iconName) {
	const url = finder.toLink(iconName)
	console.log(url) // Output: https://enka.shinshin.moe/ui/UI_AvatarIcon_Xiao.png
}

getAssetImageLink("UI_AvatarIcon_Xiao")
```

## Creator and Support

Creator: [Jelosus1](https://github.com/Jelosus2/)
If you need support you can contact me on discord: Jelosus1#7864.
Join the [discord server of enka](https://discord.gg/eUv6gcsjqe). You can ping me there for support too.