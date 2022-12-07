import fetch from "node-fetch"
import { WrapperOptions } from "../types"
import { APIError } from '../errors/APIError'
import { WrapperError } from "../errors/WrapperError"

export class RequestHandler {
  options?: WrapperOptions 

  constructor(options?: WrapperOptions) {
    this.options = options
  }

  async request(path: string) {
    let url = ''
    let uid

    if (path.startsWith('u')) {
      uid = path.split('/')[1]

      if (isNaN(+uid) || +uid < 100000000 || +uid > 999999999) throw new WrapperError('The UID format is not correct')
      url = this.options?.key ? `https://enka.network/${path}/__data.json?key=${this.options.key}` : `https://enka.network/${path}/__data.json`
    } else {
      url = `https://enka.network/${path}`
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: { 
        "User-Agent": `${this.options?.userAgent ? `${this.options.userAgent}` : 'enkanetwork.js/v1.3.0'}` 
      } 
    }).catch(() => {})
    if (res?.status == 500) throw new APIError(res.status, `${res.statusText} (Probably you set an invalid parameter)`, `${path}`)

    const data = res?.json().catch(() => {})

    return data
  }
}