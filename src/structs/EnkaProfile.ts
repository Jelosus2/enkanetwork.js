import { EnkaProfileAPI, EnkaProfileDataAPI } from "../types";

/**
 * A class that structures the profile data.
 */
export class EnkaProfile {
    /**
     * The username of the profile.
     */
    username: string;

    /**
     * The profile info.
     */
    profile: Profile;

    /**
     * Creates a new `EnkaProfile` instance.
     * @param data - The data of the profile.
     */
    constructor(data: EnkaProfileAPI) {
        this.username = data.username;
        this.profile = new Profile(data.profile);
    }
}

/**
 * A class to structure the profile info.
 */
export class Profile {
    /**
     * The bio of the profile
     */
    bio: string;

    /**
     * The level of the profile.
     */
    level: number;

    /**
     * The signup state of the profile.
     */
    signup_state: number;

    /**
     * The url of the profile picture
     */
    pfp_url: string;

    /**
     * Creates a new `Profile` instance.
     * @param data - The data of the profile's info.
     */
    constructor(data: EnkaProfileDataAPI) {
        this.bio = data.bio;
        this.level = data.level;
        this.signup_state = data.signup_state;
        this.pfp_url = data.image_url;
    }
}