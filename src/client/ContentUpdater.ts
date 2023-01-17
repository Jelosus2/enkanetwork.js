import { EventEmitter } from "node:events";
import { RequestHandler } from "../handlers";
import { AutoUpdaterOptions } from "../types";
import { PackageError } from "../errors";

import fs from "fs";
import path from "path";
import unzipper from "unzipper";

// To compile the config.json file with the ts files.
import * as config from '../utils/config.json'

/**
 * Events that the `ContentUpdater` class can emit.
 */
interface UpdaterEvents {
    /**
     * Emitted when the content update is successful.
     */
    onUpdateSuccess: () => void;
    /**
     * Emitted when the content update fails.
     * @param errorMessage - The error message.
     */
    onUpdateFail: (errorMessage: string) => void;
}

/**
 * A class for updating content.
 * @extends EventEmitter
 */
export class ContentUpdater extends EventEmitter {
    /**
     * The Request handler.
     */
    private readonly handler: RequestHandler;

    /**
     * Creates a new `ContentUpdater` instance.
     * @param options - The options for the ContentUpdater class.
     * @param options.checkInterval - The interval set to check for updates.
     */
    constructor(private options?: AutoUpdaterOptions) {
        super();

        this.handler = new RequestHandler();
    }

    /**
     * Automatically updates the content at a given interval.
     */
    checkForUpdates(): void {
        if (
            this.options?.checkInterval &&
            typeof this.options.checkInterval !== "number"
        ) {
            throw new PackageError("The interval must be a number in ms");
        }

        if (this.options?.checkInterval && this.options.checkInterval < 20000) {
            throw new PackageError("The interval must be longer than 20000 ms (20 seconds)");
        }

        setInterval(async () => {
            try {
                const { lastVersion, zip } = await this.handler.updateInfo();

                const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../utils/config.json'), 'utf-8'));
                const fPath = path.join(__dirname, "../utils");

                const parseVersion = (version: string) => { return version.split('.').join(''); };

                if (parseVersion(lastVersion) > parseVersion(config.version)) {
                    await zip.pipe(unzipper.Extract({ path: fPath }));
                    this.emit("onUpdateSuccess");
                }
            } catch (_) {
                this.emit(
                    "onUpdateFail",
                    "Failed to update the version content."
                );
            }
        }, this.options?.checkInterval || 20000);
    }

    /**
     * Adds an event listener to the `ContentUpdater` instance.
     * @param event - The event to listen for.
     * @param listener - The event listener.
     * @returns The `ContentUpdater` instance.
     */
    on<E extends keyof UpdaterEvents>(
        event: E,
        listener: UpdaterEvents[E]
    ): this {
        return super.on(event, listener);
    }

    /**
     * Adds an event listener that will be invoked only once to the `ContentUpdater` instance.
     * @param event - The event to listen for.
     * @param listener - The event listener.
     * @returns The `ContentUpdater` instance.
     */
    once<E extends keyof UpdaterEvents>(
        event: E,
        listener: UpdaterEvents[E]
    ): this {
        return super.once(event, listener);
    }

    /**
     * Emits an event on the `ContentUpdater` instance.
     * @param event - The event to emit.
     * @param args - The arguments to pass to the event listeners.
     * @returns `true` if the event had listeners, `false` otherwise.
     */
    emit<S extends keyof UpdaterEvents>(event: S, ...args: any[]): boolean {
        return super.emit(event, ...args);
    }
}
