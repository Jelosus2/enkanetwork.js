const { Wrapper, AssetFinder } = require('./dist/index')
const api = new Wrapper({
    cache: true
})
const finder = new AssetFinder()

const player = async (uid) => {
    let playerD = await api.getPlayer(uid)
    console.log(playerD)
}

//player(738081787)
console.log(finder.toLink(finder.character(10000046).assets.icon))