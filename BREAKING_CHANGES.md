# Breaking changes

## From v2.0.2 to v2.1.0
```diff
+ <wrapper>.getEnkaProfile(username);
// Returns the data of 'api/profile/<username>'

+ <wrapper>.getHoyos(username, language);
- <wrapper>.getUser(username, language);
// Returns the data of 'api/profile/<username>/hoyos'

+ <wrapper>.getEnkaHoyoBuilds(username, hash, language);
- <wrapper>.getUserBuilds(username, buildsProfileIndex, language);
// Returns the data of 'api/profile/<username>/hoyos/<hash>/builds'
```

## From v2.2.1 to v2.5.0
```diff
+ const genshinClient = <wrapper>.genshin;
+ const starrailClient = <wrapper>.starrail;
- const wrapper = new Wrapper();
// Separate clients, one for each game

+ const genshinFinder = <assetFinder>.genshin;
+ const starrailFinder = <assetFinder>.starrail;
- const finder = new AssetFinder();
// Separate finders, one for each game
```

## From v2.6.3 to v2.6.5
```diff
+ <player>.recordInfo.fhLastFinishedFloor -> SRFHInfo (class)
- <player>.recordInfo.fhLastFinishedFloor -> number

// Structure for SRFHInfo class
{
  jarilo: number;
  xianzhou: number;
}
```