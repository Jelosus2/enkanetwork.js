import { icons as iContent } from "../../../utils";

const icons: { [key: string]: any } = iContent;

/**
 * A class that structures the profile picture assets.
 */
export class SRProfilePicture {
  /**
   * The icon path of the profile picture.
   */
  icon: string;

  /**
   * Creates a new `SRProfilePicture` instance.
   * @param iconId - The ID of the icon.
   */
  constructor(iconId: string | number) {
    this.icon = icons[iconId]?.ImagePath || "";
  }
}
