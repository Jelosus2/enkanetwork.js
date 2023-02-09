# EnkaNetwork.js

EN | [ES](./README_ES.md)

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
- v2.0.0:
	- Reworked the entire data structure and some package structure.
	- Merged `AssetNameFinder` and `AssetImageFinder` into `AssetFinder`.
	- Added an auto updater for the new genshin versions content.
	- Added cache system (optional) to reduce the requests sent to Enka API.
	- Fixed some bugs and errors.
	- Added JSDoc. 
- v2.0.1:
	- Changed the player request endpoint since `/u/<UID>/__data.json` is now deprecated and will stop existing in 2 days.
	- Removed the `key` parameter from the **Wrapper** class since it's no longer needed.
	- Added profile API route (in case it exists) in the player structure.
- v2.0.2:
	- Fixed when a character's weapon doesn't have refinement throws an error.
- v2.1.0 ([Breaking changes](/BREAKING_CHANGES.md) from <v2.0.2):
	- Implemented the new profile routes and data.
	- Changed profile structure, refer to the [new structure](/STRUCTURE.md)
	- Updated the player structure to add the `owner` field.
	- Fixed when you search for a weapon name it returns an empty string.
	- Fixed errors and bugs.

## Table of Content
- [Wrapper](#wrapper)
	- [Getting started](#getting-started)
	- [Cache system](#cache-system)
	- [User profiles](#user-profiles)
	- [Wrapper Structure vs API Structure](#wrapper-structure-vs-api-structure)
- [Content Updater](#content-updater)
- [Finders](#asset-finder)
	- [I got the icon name, but where is the image?](#i-got-the-icon-name-but-where-is-the-image)
- [Creator and Support](#creator-and-support) 

## Wrapper

### Getting Started

```js
const { Wrapper } = require('enkanetwork.js')

const client = new Wrapper(options)
/** options:
 * userAgent: string -> optional (default is enkanetwork.js/v<package_version>)
 * language: string -> optional (default is English)
 * cache: boolean -> optional (default is false)
 */

async function getData(uid) {
	const data = await client.getPlayer(uid)
	console.log(data)
}

getData(738081787)
```

### Cache System

```js
const { Wrapper } = require('enkanetwork.js')

const client = new Wrapper({
	cache: true
})

async function getDataWithCache(uid) {
	const data = await client.getPlayer(uid)
	console.log(data)
}

getDataWithCache(738081787)
```

### Enka Profiles

```js
const { Wrapper } = require('enkanetwork.js')

const client = new Wrapper(options)
/** options:
 * userAgent: string -> optional (default is enkanetwork.js/v<package_version>)
 * language: string -> optional (default is English)
 * cache: boolean -> optional (default is false)
 */

// The language is optional
async function getProfile(username, hash, language) {
	const profile = await client.getEnkaProfile(username)

	const hoyos = await client.getEnkaHoyos(username, language)

	const builds = await client.getEnkaHoyoBuilds(username, hash, language)
}

getUser('algoinde', '4Wjv2e', 'en')
```

### Wrapper Structure vs API Structure

You can check the structure change [here](/STRUCTURE.md)

You can find `fightPropMap` original properties in [fightPropMap Data](https://api.enka.network/#/api?id=fightprop)

## Content Updater

```js
const { ContentUpdater } = require('./dist/index')
const updater = new ContentUpdater(options)
/** options:
 * checkInterval: number -> optional (default is 20000 ms (20 seconds))
 */

updater.on('onUpdateSuccess', () => {
    console.log('The content files were successfully updated!')
})

updater.on('onUpdateFail', (errorMessage) => {
    console.log(errorMessage)
})

updater.checkForUpdates()
```

## Asset Finder

The finder can **only** find names and images of the assets provided in the enka API, for example it won't find the name of a quest name even if you have the hash of the name.

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
	console.log(assets, name) // Output: Hu Tao assets and name.
} 

function getNameByHash(nameTextMapHash) {
	const name = finder.hash(nameTextMapHash).value
	console.log(name) // Output: Hu Tao (depends on the language)
}

getAssetName(10000046) // Hu Tao ID. 
getNameByHash(1940919994) // Hu Tao name hash.
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
