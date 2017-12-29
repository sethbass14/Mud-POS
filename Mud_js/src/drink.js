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
    return `<div id="drink-name-display-${this.id}"data-id="${this.id}"><h3 id="drink-name" data-id="${this.id}" data-name="Drink">${this.name}</h3></div>`
  }

  renderAll() {
    return `<div id='drink-show'><ul class="show-list" id='drink-show-list'><li>${this.name}</li><li>${this.description}</li><li>$${this.price}</li></ul><button id='edit-drink' data-id="${this.id}">edit</button><button id='delete-drink' data-id="${this.id}">delete</button></div>`
  }

  renderForm() {
    return `<form id="drink-form" data-id="${this.id}"><label>Name:  </label><input id='name' type="text" value="${this.name ? this.name : ''}"></input></br><label>Description:  </label><input id='description' type="text" value="${this.description ? this.description : ''}"></input></br><label>Price:  </label><input id='price' type="text" value="${this.price ? this.price : ''}"></input></br><input type='submit' id=${this.name? "submit-edit-drink" : "submit-new-drink"} data-id="drink"value='submit'></input><form>`

  }

  editName() {
    document.getElementById(`drink-name-display-${this.id}`).innerHTML = `<h3 id="drink-name" data-id="${this.id}">${this.name}</h3>`
  }

  static deleteDrinkMemory(json) {
    Drink.all = Drink.all.filter(drink => drink.id !== json.id)
  }

  static getDrinkById(id) {
    return Drink.all.find(drink => drink.id === id)
  }

}


Drink.all = []
