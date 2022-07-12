export class IconLinks {
  value: string

  constructor(data: any) {
    this.value = data
  }

  toLink() {
    return `https://enka.shinshin.moe/ui/${this.value}.png`
  }
}