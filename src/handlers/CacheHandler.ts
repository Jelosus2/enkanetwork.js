import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { PackageError } from "../errors";

/**
 * A class that handles the cache. 
 */
export class CacheHandler {
    /**
     * Creates a new `CacheHandler` instance.
     */
    constructor() {};

    /**
     * It creates a directory where the cache files get stored if it doesn't exist already.
     */
    setupCacheDirectory(): void {
        const cacheDirectory = path.join(__dirname, '../cache');

        if (!fs.existsSync(cacheDirectory)) {
            fs.mkdir(cacheDirectory, (err) => {
                if (err) throw new PackageError('Failed to setup the cache directory');
            });
        }
    }

    /**
     * It creates a cache file with the data given.
     * @param key - The key to create the hash for the file name.
     * @param value - The value that will be stored in the file.
     */
    set(key: string, value: object): void {
        const cacheFileName = `${createHash('md5').update(key).digest('hex')}.json`;
        const cacheFilePath = path.join(__dirname, `../cache/${cacheFileName}`);

        if (!fs.existsSync(cacheFilePath)) {
            fs.writeFile(cacheFilePath, JSON.stringify(value, null, 2), (err) => {
                if (err) throw new PackageError('Failed to create the cache file.');
            });
        }
    }

    /**
     * Get and retrieve the cached data and also deletes the expired cache files.
     * @param key - The key to create the hash for the file name.
     * @returns The data of the cache file or undefined if cache file was not found.
     */
    get(key: string): any {
        const cacheFileName = `${createHash('md5').update(key).digest('hex')}.json`;
        const cacheFilePath = path.join(__dirname, `../cache/${cacheFileName}`);

        if (!fs.existsSync(cacheFilePath)) return undefined;
        
        const data = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
        const date = new Date(); date.setSeconds(date.getSeconds() - data?.ttl);
        const fileTime = fs.statSync(cacheFilePath).mtime;

        if (date > fileTime) {
            fs.unlink(cacheFilePath, (err) => {
                if (err) throw new PackageError('Failed to delete the expired cache file.');
            });
            return undefined;
        }        

        return data;
    }
}