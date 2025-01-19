import { ProfilePictureImage } from "../../../types";
import { genshinFinder, profilepictures as pContent} from "../../../utils";

const profilepictures: { [key: string]: any } = pContent;

/**
 * A class that structures the profile pictures assets and names
 */
export class ProfilePictureAssets {
  /**
   * The name of the profile picture.
   */
  name: string;

  /**
   * The assets of the profile picture.
   */
  assets: ProfilePictureImages;

  /**
   * Creates a new `ProfilePictureAssets` instance.
   * @param profilePictureId - The ID of the profile picture.
   * @param language - The language to get the name.
   */
  constructor(profilePictureId: string | number, language: string) {
    const profilepicture = profilepictures[profilePictureId];

    this.name = genshinFinder[language].hash(profilepicture?.nameTextMapHash).value;
    this.assets = profilepicture
      ? new ProfilePictureImages(profilepicture)
      : ({} as ProfilePictureImages);
  }
}

export class ProfilePictureImages {
  /**
   * The icon of the profile picture.
   */
  icon: string;

  /**
   * The old format icon of the profile picture.
   */
  oldIcon: string;

  /**
   * Creates a new `ProfilePictureImages` instance.
   * @param data - The data of the profile picture.
   */
  constructor(data: ProfilePictureImage) {
    this.icon = data?.icon || "";
    this.oldIcon = data?.oldIcon || "";
  }
}
