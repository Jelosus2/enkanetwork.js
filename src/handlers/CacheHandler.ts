import { PackageError } from "../errors";
import { join } from "node:path";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdir,
  writeFile,
  readFileSync,
  statSync,
  unlink,
  rmdir,
} from "node:fs";

/**
 * A class that handles the cache.
 */
export class CacheHandler {
  /**
   * Creates a new `CacheHandler` instance.
   */
  constructor() {}

  /**
   * Creates a directory where the cache files get stored if it doesn't exist already.
   */
  setupCacheDirectory(): void {
    const cacheDirectory = join(__dirname, "../cache");

    if (!existsSync(cacheDirectory)) {
      mkdir(cacheDirectory, (err) => {
        if (err) throw new PackageError("Failed to setup the cache directory");
      });
    }
  }

  /**
   * Deletes the cache directory.
   */
  deleteCacheDirectory(): void {
    const cacheDirectory = join(__dirname, "../cache");

    if (existsSync(cacheDirectory)) {
      rmdir(cacheDirectory, (err) => {
        if (err) throw new PackageError("Failed to delete the cache directory");
      });
    }
  }

  /**
   * Creates a cache file with the given data.
   * @param key - The key to create the hash for the file name.
   * @param value - The value that will be stored in the file.
   */
  set(key: string, value: object): void {
    const cacheFileName = `${createHash("md5").update(key).digest("hex")}.json`;
    const cacheFilePath = join(__dirname, `../cache/${cacheFileName}`);

    if (!existsSync(cacheFilePath)) {
      writeFile(cacheFilePath, JSON.stringify(value, null, 2), (err) => {
        if (err) throw new PackageError("Failed to create the cache file.");
      });
    }
  }

  /**
   * Get and retrieve the cached data and deletes the expired and corrupted cache files.
   * @param key - The key to create the hash for the file name.
   * @returns The data of the cache file or undefined if cache file was not found.
   */
  get(key: string): any {
    const cacheFileName = `${createHash("md5").update(key).digest("hex")}.json`;
    const cacheFilePath = join(__dirname, `../cache/${cacheFileName}`);

    if (!existsSync(cacheFilePath)) return undefined;

    try {
      const data = JSON.parse(readFileSync(cacheFilePath, "utf-8"));
      const date = new Date();
      date.setSeconds(date.getSeconds() - data?.ttl);
      const fileTime = statSync(cacheFilePath).mtime;

      if (date > fileTime) {
        unlink(cacheFilePath, (err) => {
          if (err)
            throw new PackageError("Failed to delete the expired cache file.");
        });
        return undefined;
      }

      return data;
    } catch (_) {
      unlink(cacheFilePath, (err) => {
        if (err)
          throw new PackageError("Failed to delete the corrupted cache file.");
      });
      return undefined;
    }
  }
}
