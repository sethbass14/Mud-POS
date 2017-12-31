class DrinkOrder {
  constructor(drinkOrderObj) {
    this.id = drinkOrderObj.id
    this.drink_id = drinkOrderObj.drink_id,
    this.order_id = drinkOrderObj.order_id,
    this.quantity = drinkOrderObj.quantity,
    DrinkOrder.all.push(this)
  }

  render() {
    return `<li>${Drink.getDrinkById(this.drink_id).name} | $${Drink.getDrinkById(this.drink_id).price} | order: ${this.quantity}</li>`
  }

}

DrinkOrder.all = []
