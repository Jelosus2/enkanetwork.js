/**
 * An object which contains the error messages with their error codes.
 */
const errors: { [key: string]: string } = {
    204: "No Content: The account did not even choose Traveler",
    404: "Not Found: If the UID doesn't exists",
    424: "Failed Dependency: Maintenance",
    429: "Too Many Requests: You are rate limited",
    500: "General error: An error ocurred",
    503: "Service Unavailable: Internal request problems",
    504: "Gateway Timeout: Hoyoverse rate limit to enka",
    522: "Connection timed out",
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
