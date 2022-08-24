export class IconLinks {
  value: string

  constructor(data: any) {
    this.value = data
  }

  toLink() {
    return `https://enka.network/ui/${this.value}.png`
  }
}