export class Stat {
  value: number

  constructor(data: any) {
    this.value = data
  }

  toRoundedValue() {
    return Math.round(this.value)
  }
}