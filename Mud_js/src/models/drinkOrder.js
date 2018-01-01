class DrinkOrder {
  constructor(drinkOrderObj) {
    this.id = drinkOrderObj.id
    this.drink_id = drinkOrderObj.drink_id,
    this.order_id = drinkOrderObj.order_id,
    this.quantity = drinkOrderObj.quantity,
    DrinkOrder.all.push(this)
  }

  render() {
    return `<li data-id =${this.id}>${Drink.getDrinkById(this.drink_id).name} | $${Drink.getDrinkById(this.drink_id).price} | order: ${this.quantity}</li>`
  }

  static getDoByOrderIdDrinkId(order_id, drink_id) {
    return DrinkOrder.all.filter(DrinkOrder => {
      return (DrinkOrder.order_id === order_id && DrinkOrder.drink_id === drink_id)
    })[0]
  }

  static deleteDrinkOrderMemory(json) {
    DrinkOrder.all = DrinkOrder.all.filter(drinkOrder => drinkOrder.id !== json.id)
  }

}

DrinkOrder.all = []
