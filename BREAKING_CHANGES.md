# Breaking changes

## From v2.0.2 to v2.1.0

```diff
+ <wrapper>.getEnkaProfile(username)
// Returns the data of 'api/profile/<username>'

+ <wrapper>.getHoyos(username, language)
- <wrapper>.getUser(username, language)
// Returns the data of 'api/profile/<username>/hoyos'

+ <wrapper>.getEnkaHoyoBuilds(username, hash, language)
- <wrapper>.getUserBuilds(username, buildsProfileIndex, language)
// Returns the data of 'api/profile/<username>/hoyos/<hash>/builds'
```