import { OwnerAPI } from "../../types";
import { Profile } from "./EnkaProfile";

/**
 * A class to structure the profile owner data.
 */
export class Owner {
  /**
   * The hash of the profile.
   */
  hash: string;

  /**
   * The username of the profile.
   */
  username: string;

  /**
   * The profile information data.
   */
  profile: Profile;

  /**
   * The ID of the profile.
   */
  id: number;

  /**
   * Creates a new `Owner` instance.
   * @param data - The data of the owner.
   */
  constructor(data: OwnerAPI) {
    this.hash = data.hash;
    this.username = data.username;
    this.profile = new Profile(data.profile);
    this.id = data.id;
  }
}
