class DrinkOrder {
  constructor(drinkOrderObj) {
    this.id = drinkOrderObj.id
    this.drink_id = drinkOrderObj.drink_id,
    this.order_id = drinkOrderObj.order_id,
    this.quantity = drinkOrderObj.quantity,
    DrinkOrder.all.push(this)
  }
}

DrinkOrder.all = []
