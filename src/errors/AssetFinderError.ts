/**
 * A class to throw errors coming from the `AssetFinder`.
 * @extends Error
 */
export class AssetFinderError extends Error {
  /**
   * The message of the error.
   */
  message: string;

  /**
   * Creates a new `AssetFinderError` instance.
   * @param message - The message of the error.
   */
  constructor(message: string) {
    super();

    this.message = message;
  }
}
