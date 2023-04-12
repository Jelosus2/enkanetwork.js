/**
 * A class to throw errors coming from the package.
 * @extends Error
 */
export class PackageError extends Error {
    /**
     * The message of the error.
     */
    message: string;

    /**
     * Creates a new `PackageError` instance.
     * @param message - The message of the error.
     */
    constructor(message: string) {
        super();

        this.message = message;
    }
}
