import { WrapperOptions } from '../types' 
import { RequestHandler } from '../requests/RequestHandler'
import { Data } from '../structs'

export class Wrapper {
  private readonly handler: RequestHandler

  constructor(options?: WrapperOptions) {
    this.handler = new RequestHandler(options)
  }

  async getPlayer(uid: string | number) {
    const data = await this.handler.request(uid)

    return new Data(data)
  }
}