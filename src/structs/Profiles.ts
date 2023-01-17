import { Wrapper } from "../client";
import { AssetFinderOptions, ProfileDataAPI } from "../types";
import { Player } from "./Player";

/**
 * A class that structures the data of the profiles.
 */
export class Profiles {
    /**
     * If the UID of the user's profile is public.
     */
    isUidPublic: boolean;

    /**
     * The user's profile UID.
     */
    uid: number | string;

    /**
     * The user's profile player data.
     */
    player: Player;

    /**
     * Creates a new `UserProfiles` instance.
     * @param data - The data of the user profiles.
     * @param language - The language to get the names.
     * @param username - The user's username.
     * @param index - The index of the profile.
     * @param wrapper - The wrapper class.
     */
    constructor(
        data: ProfileDataAPI,
        private language: AssetFinderOptions["language"],
        private username: string,
        private index: number,
        private wrapper: Wrapper
    ) {
        this.isUidPublic = data.is_uid_public;
        this.uid = data.uid || "";
        this.player = new Player(data.player_info, this.language);
    }

    /**
     * A method that fetch the builds of the profile.
     * @returns The profile builds.
     */
    async getBuilds() {
        const builds = await this.wrapper.getUserBuilds(
            this.username,
            this.index,
            this.language
        );

        return builds || "";
    }
}
