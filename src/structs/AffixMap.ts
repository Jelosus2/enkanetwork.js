export class AffixMap {
  id: number
  value: number

  constructor(data: any) {
    this.id = +Object.keys(data)[0]
    this.value = data[Object.keys(data)[0]]
  }
}