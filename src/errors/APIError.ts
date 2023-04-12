/**
 * An object which contains the error messages with their error codes.
 */
const errors: { [key: string]: string } = {
    400: "Wrong UID format",
    404: "The player or profile doesn't exists",
    424: "Maintenance or everything is broken",
    429: "You are rate limited",
    500: "General server error",
    503: "Service Unavailable"
};

/**
 * A class to throw errors coming from the API.
 * @extends Error
 */
export class APIError extends Error {
    /**
     * The status of the error.
     */
    status: number;

    /**
     * The message of the error.
     */
    message: string;

    /**
     * The path of the error.
     */
    path: string;

    /**
     * Creates a new `APIError` instance.
     * @param status - The status of the error.
     * @param path - The path of the error.
     */
    constructor(status: number, path: string) {
        super();

        this.status = status;
        this.message = errors[status] || "An unkown error ocurred";
        this.path = path;
    }
}
