import { UserBuildsAPI, UserDataAPI } from "../types"
import { UserBuilds } from "./UserBuilds"
import { UserProfiles } from "./UserProfiles"

export class UserData {
    private profiles: UserProfiles[]
    characters: string[]
    private builds: UserBuilds[]
    private buildData: any

    constructor(profileData: UserDataAPI[], buildsData: any) {
        this.profiles = profileData.map((data) => new UserProfiles(data))
        this.characters = buildsData ? Object.keys(buildsData) : []
        this.builds = this.characters.length > 0 ? buildsData[this.characters[0]].map((data: UserBuildsAPI) => new UserBuilds(data)) : []
        this.buildData = buildsData
    }

    getProfiles() {
        this.profiles = this.profiles || []
        return this.profiles
    }

    getCharacterBuilds(characterId: number | string) {
        if (characterId) this.builds = this.characters.includes(characterId.toString()) ? this.buildData[this.characters[this.characters.indexOf(characterId.toString())]].map((data: UserBuildsAPI) => new UserBuilds(data)) : [] 
        return this.builds
    }
}