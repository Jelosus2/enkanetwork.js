import { AssetFinderError, PackageError } from "../../errors";
import { RequestHandler } from "../../handlers";
import { ZZZPlayerData } from "../../structs/Zenless/ZZZPlayerData";
import type { WrapperOptions } from "../../types";

export class ZenlessClient {
  private readonly handler: RequestHandler;
  private language: string;
  private caching?: boolean;
  private languages: string[] = [
    "en",
    "ru",
    "vi",
    "th",
    "pt",
    "ko",
    "ja",
    "id",
    "fr",
    "es",
    "de",
    "zh-TW",
    "zh-CN",
  ];

  constructor(options?: WrapperOptions) {
    this.handler = new RequestHandler(options);
    this.language = options?.language || "en";
    this.caching = options?.cache;
    if (!this.languages.includes(this.language))
      throw new AssetFinderError("Invalid or not available language");
  }

  async getPlayer(uid: string | number, language: string = this.language): Promise<ZZZPlayerData> {
    if (!uid) 
      throw new PackageError("The UID parameter is missing");
    if (!this.languages.includes(language))
      throw new AssetFinderError("Invalid or not available language.");

    const data = await this.handler.player(uid, "zzz");

    return new ZZZPlayerData(data);
  }
}