class Drink {
  constructor(drinkObj) {
    this.id = drinkObj.id,
    this.name = drinkObj.name,
    this.description = drinkObj.description,
    this.price = drinkObj.price,
    this.orders = drinkObj.orders,
    Drink.all.push(this)
  }

  render() {
    return `<div data-id="${this.id}"><li data-id="${this.id}">${this.name}</li></div>`
  }
}

Drink.all = []
