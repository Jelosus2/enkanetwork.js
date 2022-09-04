import { WrapperOptions } from '../types' 
import { RequestHandler } from '../requests/RequestHandler'
import { Data, UserData } from '../structs'

export class Wrapper {
  private readonly handler: RequestHandler

  constructor(options?: WrapperOptions) {
    this.handler = new RequestHandler(options)
  }

  async getPlayer(uid: string | number) {
    const data = await this.handler.request(`u/${uid}`)

    return new Data(data)
  }

  async getUser(username: string, buildsProfileIndex?: number) {
    if (!buildsProfileIndex) buildsProfileIndex = 0

    const profileData = await this.handler.request(`api/profile/${username}/hoyos`)
    const buildData = await this.handler.request(`api/profile/${username}/hoyos/${buildsProfileIndex}/builds`)

    return new UserData(profileData, buildData)
  }
}