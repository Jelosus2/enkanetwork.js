import { StarRailFinder } from "../client/StarRail/StarRailFinder";

const finders: { [key: string]: StarRailFinder } = {
    'en': new StarRailFinder({ language: 'en' }),
    'ru': new StarRailFinder({ language: 'ru' }),
    'vi': new StarRailFinder({ language: 'vi' }),
    'th': new StarRailFinder({ language: 'th' }),
    'pt': new StarRailFinder({ language: 'pt' }),
    'ko': new StarRailFinder({ language: 'ko' }),
    'ja': new StarRailFinder({ language: 'ja' }),
    'id': new StarRailFinder({ language: 'id' }),
    'fr': new StarRailFinder({ language: 'fr' }),
    'es': new StarRailFinder({ language: 'es' }),
    'de': new StarRailFinder({ language: 'de' }),
    'zh-TW': new StarRailFinder({ language: 'zh-TW' }),
    'zh-CN': new StarRailFinder({ language: 'zh-CN' }),
}

export default finders;