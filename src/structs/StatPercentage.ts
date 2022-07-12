export class StatPercentage {
  value: number

  constructor(data: any) {
    this.value = data
  }

  toPercentage() {
    return Math.round((this.value * 100 + Number.EPSILON + 0.0001) * 10) / 10
  }
}