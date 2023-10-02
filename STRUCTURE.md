## New vs Old Structure

> Needs to get reworked

- [Player Structure](#player-structure)
- [Enka Profile Structure](#enka-profile-structure)

## Player Structure

| New | Old |
| :-- | :-- |
| [player](#player) | playerInfo |
| [characters](#characters) | charactersInfo |
| ttl | tll |
| uid | ??? |   

# Player

| New | Old |
| :-- | :-- |
| username | nickname |
| [levels](#levels) | level & worldLevel |
| signature | signature |
| [namecard](#namecard) | nameCardId |
| achievements | finishAchievementNum |
| [abyss](#abyss) | towerFloorIndex & towerLevelIndex |  
| [showcase](#showcase) | showCharactersInfoList | 
| [namecardsList](#namecard) | showNameCardIdList | 
| [profilePicture](#profile-picture) | profilePicture |  

# Levels

| New | Old |
| :-- | :-- |
| world | worldLevel |
| rank | level | 

# Namecard

| New | Old |
| :-- | :-- |
| id | id |
| assets | assets |
| name (property) | name (method) |     

# Abyss

| New | Old |
| :-- | :-- |
| floor | towerFloorIndex |
| chamber | towerLevelIndex |

# Showcase

| New | Old |
| :-- | :-- |
| characterId | characterId |
| level | level |
| costumeId | costumeId |
| assets | assets |
| name (property) | name (method) |

# Profile Picture

| New | Old |
| :-- | :-- |
| characterId | characterId |
| assets | assets |
| name (property) | name (method) |

# Characters

| New | Old |
| :-- | :-- |
| characterId | characterId |
| [properties](#properties) | propMap |
| [stats](#stats) | stats |
| [constellationsList](#constellations-list) | constellationsIdList |
| skillDepotId | skillDepotId |
| inherentProudSkillList | inherentProudSkillList |
| [skills](#skills) | talentsLevelMap |
| skillsExtraLevel | proudSkillExtraLevelMap |
| [equipment](#equipment) | equipList |
| [friendship](#friendship) | fetterInfo |
| assets | assets |
| costumeId | costumeId |
| name (property) | name (method) |

# Properties

| New | Old |
| :-- | :-- |
| [xp](#properties-content) | xp |
| [ascension](#properties-content) | ascension |
| [level](#properties-content) | level |
| [stamina](#properties-content) | 10010 |
| ??? | 1003 |
| ??? | 1004 |

# Properties Content

| New | Old |
| :-- | :-- |
| type | type |
| val | val |
| ??? | ival |

# Stats

| New | Old |
| :-- | :-- |
| [baseHp](#stat) | baseHp |
| [hpPercentage](#stat-percentage) | ??? |
| [baseAtk](#stat) | baseAtk |
| [atkPercentage](#stat-percentage) | ??? |
| [baseDef](#stat) | baseDef |
| [defPercentage](#stat-percentage) | ??? |
| [critRate](#stat-percentage) | critRate |
| [critDamage](#stat-percentage) | critDamage |
| [energyRecharge](#stat-percentage) | energyRecharge |
| [healingBonus](#stat-percentage) | healingBonus |
| [incomingHealingBonus](#stat-percentage) | incomingHealingBonus |
| [elementalMastery](#stat) | elementalMastery |
| [physicalRes, pyroRes, etc](#stat-percentage) | physicalRes, pyroRes, etc |
| [physicalDamageBonus, pyroDamageBonus, etc](#stat-percentage) | physicalDamageBonus, pyroDamageBonus, etc |
| [pyroEnergyCost, hydroEnergyCost, etc](#stat) | pyroEnergyCost, hydroEnergyCost, etc |
| [cooldownReduction](#stat-percentage) | ??? |
| [shieldStrength](#stat-percentage) | ??? |
| [currentPyroEnergy, currentHydroEnergy, etc](#stat) | ??? |
| [currentHp](#stat) | ??? |
| [maxHp](#stat) | maxHp |
| [atk](#stat) | atk |
| [def](#stat) | def |

# Stat

| New | Old |
| :-- | :-- |
| value | value |
| toRounded (method) | toRounded (method) |

# Stat Percentage

| New | Old |
| :-- | :-- |
| value | value |
| toPercentage (method) | toPercentage (method) |

# Constellations List

| New | Old |
| :-- | :-- |
| id | id |
| assets | assets |
| name (property) | name (method) |

# Skills

| New | Old |
| :-- | :-- |
| [normalAttacks](#skill) | normalAttacks |
| [elementalSkill](#skill) | elementalSkill |
| [elementalBurst](#skill) | elementalBurst |

# Skill

| New | Old |
| :-- | :-- |
| id | id |
| level | level |
| assets | assets |
| name (property) | name (method) |

# Equipment

| New | Old |
| :-- | :-- |
| [artifacts](#artifacts) | artifacts |
| [weapon](#weapon) | weapon |

# Artifacts

| New | Old |
| :-- | :-- |
| artifactId | artifactId |
| level | reliquary.level |
| nameTextMapHash | flat.nameTextMapHash |
| setNameTextMapHash | flat.setNameTextMapHash |
| stars | flat.stars |
| [mainstat](#artifact-main-stat) | flat.artifactMainstat |
| [substats](#artifact-sub-stats) | flat.artifactSubstats |
| rolledSubstatsIds | reliquary.subStatsIdList |
| itemType | flat.itemType |
| icon | flat.icon |
| equipType | flat.equipType |
| name (property) | flat.name (method) |
| setName (property) | flat.setName (method) |

# Artifact Main Stat

| New | Old |
| :-- | :-- |
| stat | mainStat |
| statValue | statValue |
| id | reliquary.mainStatId |

# Artifact Sub Stats

| New | Old |
| :-- | :-- |
| stat | stat |
| statValue | statValue |

# Weapon

| New | Old |
| :-- | :-- |
| weaponId | weaponId |
| level | weaponInfo.level |
| ascensionLevel | weaponInfo.promoteLevel |
| [refinement](#weapon-refinement) | weaponInfo.refinementLevel |
| nameTextMapHash | flat.nameTextMapHash |
| stars | flat.stars |
| [weaponStats](#weapon-stats) | flat.weaponStats |
| itemType | flat.itemType |
| assets | ??? |
| name (property) | flat.name (method) |

# Weapon Refinement

| New | Old |
| :-- | :-- |
| id | id |
| level | value |

# Weapon Stats

| New | Old |
| :-- | :-- |
| stat | stat |
| statValue | statValue |

# Friendship

| New | Old |
| :-- | :-- |
| level | expLevel |

## Enka Profile Structure

| getEnkaProfile (method) (new) | ??? |
| :-- | :-- |
| username | ??? |
| [profile](#profile) | ??? |

| getEnkaHoyos (method) (new) | getUser (method) (old) |
| :-- | :-- |
| isUidPublic | isUidPublic |
| public | ??? |
| verified | ??? |
| uid | uid |
| [player](#player) | player |
| hash | ??? |
| region | ??? |
| order | ??? |

| getEnkaHoyoBuilds (method) (new) | getUserBuilds (method) (old) |
| :-- | :-- |
| id | id |
| name | name |
| characterId | characterId |
| characterName | characterName |
| [characterInfo](#characters) | characterInfo |
| order | order |
| live | live |
| settings | settings |
| isPublic | isPublic |

# Profile

| New | Old |
| :-- | :-- |
| bio | ??? |
| level | ??? |
| signup_state | ??? |
| pfp_url | ??? |