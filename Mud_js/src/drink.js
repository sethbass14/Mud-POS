class Drink {
  constructor(drinkObj) {
    this.id = drinkObj.id,
    this.name = drinkObj.name,
    this.description = drinkObj.description,
    this.price = drinkObj.price,
    this.orders = drinkObj.orders,
    Drink.all.push(this)
  }

  renderName() {
    return `<div id="drink-name-display"data-id="${this.id}"><h3 id="drink-name" data-id="${this.id}">${this.name}</h3></div>`
  }

  renderAll() {
    return `<div id='drink-show'><ul class="show-list" id='drink-show-list'><li>${this.name}</li><li>${this.description}</li><li>$${this.price}</li></ul></div>`
  }

  static getDrinkById(id) {
    return Drink.all.find(drink => drink.id === id)
  }

}

Drink.all = []
