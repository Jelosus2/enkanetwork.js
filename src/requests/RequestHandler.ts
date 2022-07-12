import fetch from "node-fetch"
import { WrapperOptions } from "../types"
import { APIError } from '../errors/APIError'
import { WrapperError } from "../errors/WrapperError"

export class RequestHandler {
  options?: WrapperOptions 

  constructor(options?: WrapperOptions) {
    this.options = options
  }

  async request(uid: string | number) {
    if (isNaN(+uid) || +uid < 100000000 || +uid > 999999999) throw new WrapperError('The UID format is not correct')

    const url = this.options?.key ? `https://enka.shinshin.moe/u/${uid}/__data.json?key=${this.options.key}` : `https://enka.shinshin.moe/u/${uid}/__data.json`

    const res = await fetch(url, { method: 'GET' }).catch(() => null)
    if (res?.status == 500) throw new APIError(res.status, `${res.statusText} (Probably you set an invalid uid)`, `${uid}/__data.json`)

    const data = res?.json().catch(() => null)

    return data
  }
}