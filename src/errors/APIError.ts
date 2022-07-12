export class APIError extends Error {
  status: number
  message: string
  path: string

  constructor(status: number, message: string, path: string) {
    super()
    
    this.status = status
    this.message = message
    this.path = path
  }
}