import { Wrapper } from "../client";
import { AssetFinderOptions, ProfileDataAPI } from "../types";
import { Profiles } from "./Profiles";

/**
 * A class that structures the user data.
 */
export class UserData {
    /**
     * The profiles of the user.
     */
    profiles: Profiles[];

    /**
     * Creates a new `UserData` instance.
     * @param username - The user's username.
     * @param profileData - The data of the profiles.
     * @param language - The language to get the names.
     * @param wrapper - The wrapper class.
     */
    constructor(
        username: string,
        profileData: ProfileDataAPI[],
        language: AssetFinderOptions["language"],
        wrapper: Wrapper
    ) {
        this.profiles = profileData
            ? profileData.map((data, i) => new Profiles(data, language, username, i, wrapper))
            : [];
    }
}