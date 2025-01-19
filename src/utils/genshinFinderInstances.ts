import { GenshinFinder } from '../client/Genshin/GenshinFinder';

const finders: { [key: string]: GenshinFinder } = {
    'en': new GenshinFinder({ language: 'en' }),
    'ru': new GenshinFinder({ language: 'ru' }),
    'vi': new GenshinFinder({ language: 'vi' }),
    'th': new GenshinFinder({ language: 'th' }),
    'pt': new GenshinFinder({ language: 'pt' }),
    'ko': new GenshinFinder({ language: 'ko' }),
    'ja': new GenshinFinder({ language: 'ja' }),
    'id': new GenshinFinder({ language: 'id' }),
    'fr': new GenshinFinder({ language: 'fr' }),
    'es': new GenshinFinder({ language: 'es' }),
    'de': new GenshinFinder({ language: 'de' }),
    'zh-TW': new GenshinFinder({ language: 'zh-TW' }),
    'zh-CN': new GenshinFinder({ language: 'zh-CN' }),
    'it': new GenshinFinder({ language: 'it' }),
    'tr': new GenshinFinder({ language: 'tr' }),
}

export default finders;