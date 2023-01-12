# EnkaNetwork.js

EN | [ES](/README_ES.md)

A package to get data from the enka API, it also includes a finder that you can use to search for names and images of game assets, for example a name or image of a character. Check [Finders](#asset-finder) for more information.

## Changelog
- v1.0.1:
	- Changed the request url to prevent getting unnecessary 301s.
- v1.1.1:
	- Added 3.0 version content.
	- Added gacha images for characters.
	- Changed the url of enka CDN.
- v1.2.1:
	- Improved data structure for better data management.
	- Now empty values will return empty strings, arrays and objects depending on the value type instead of null.
	- Fixed some bugs.
	- Added profiles API support.
- v1.3.0:
	- Fixed Ayaka and Mona talents.
	- Added missing proudSkillExtraLevelMap.
	- Added support for custom User-Agent on requests.
	- Added 3.1 version content.
- v1.3.6
	- Added 3.2 version content.
	- Now you can access to asset names/images directly from characters, namecards, etc objects.
- v1.3.9:
	- Added 3.3 version content + IT and TR Languages
- v1.3.10: 
	- Reduced file amount of the package.
- v2.0.0-dev:
	- Reworked the entire data structure and some package structure.
	- Merged `AssetNameFinder` and `AssetImageFinder` into `AssetFinder`.
	- Added an auto updater for the new genshin versions content.
	- Added cache system (optional) to reduce the request sent to Enka API.
	- Fixed some bugs and errors.
	- Added JSDoc. 

## Table of Content
- [Wrapper](#wrapper)
	- [Getting started](#getting-started)
	- [User profiles](#user-profiles)
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
 * key: string -> optional
 * userAgent: string -> optional
 * language: string -> optional
 * cache: boolean -> optional
 */

async function getData(uid) {
	const data = await client.getPlayer(uid)
	console.log(data)
}

getData(738081787)
```

### User Profiles

```js
const { Wrapper } = require('enkanetwork.js')

const client = new Wrapper(options)
/** options:
 * key: string -> optional
 * userAgent: string -> optional
 * language: string -> optional
 * cache: boolean -> optional
 */

async function getUser(username, language) {
	const user = await client.getUser(username, language)
	
	/* To get the profiles */
	const profiles = user.profiles
	/* To get the builds of a profile */
	const characterBuilds = await profiles[index].getBuilds()
}

getUser('algoinde', 'en')
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

More coming in the stable 2.0.0 version

You can find `fightPropMap` original properties in [fightPropMap Data](https://api.enka.network/#/api?id=fightprop)

## Asset Finder

The finder can **only** find names and images of the assets provided in the enka API, for example it won't find the name of a quest even if you have the name hash.

```js
const { AssetFinder } = require('enkanetwork.js')

const finder = new AssetFinder(options)
/** options:
 * language: string -> optional. 
 * English is the default language.
 * All in-game languages supported.
 */

function getCharacter(characterId) {
	const assets = finder.character(characterId).assets
	const name = finder.character(characterId).name
	console.log(assets, name)
} 

function getNameByHash(nameTextMapHash) {
	const name = finder.hash(nameTextMapHash).value
	console.log(name) // Output: Hu Tao (depends on the language)
}

getAssetName(10000046) // Hu Tao ID. 
getNameByHash(1940919994) // Hu Tao name hash
```

You can get the images of characters, constellations, skills, weapons and namecards too.

### I got the icon name, but where is the image?

You can get the image with the following URL: `https://enka.network/ui/[ICON_NAME].png`, however you can get it directly with this code:

```js
function getAssetImageLink(imageName) {
	const url = finder.toLink(imagineName)
	console.log(url) // Output: https://enka.network/ui/UI_AvatarIcon_Hutao.png
}

getAssetImageLink("UI_AvatarIcon_Hutao")
```

## Creator and Support

Creator: [Jelosus1](https://github.com/Jelosus2/)
If you need support you can contact me on discord: Jelosus1#7864.
Join the [discord server of enka](https://discord.gg/eUv6gcsjqe). You can ping me there for support too.
