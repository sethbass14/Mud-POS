class Order {
  constructor(orderObj) {
    this.id = orderObj.id,
    this.client = orderObj.client,
    this.date = orderObj.date,
    this.drink_ids = orderObj.drink_ids
    orderObj.drink_orders !== undefined ? this.drink_orders = orderObj.drink_orders.map(drinkOrderObj => new DrinkOrder(drinkOrderObj)) : null
    Order.all.push(this)
  }

  renderName() {
    return `<div id="order-name-display-${this.id}"data-id="${this.id}"><h3 id="order-name" data-id="${this.id}">${this.client}</h3></div>`
  }

  renderDrinkOrders() {
    return this.drink_orders.map(drink_order => drink_order.render()).join('')
  }

  renderDrinkOrdersForm() {

  }

  renderDrinkOrderTotal() {
    return this.drink_orders.length ? this.renderDrinkOrders() + `<li>Total | $` + this.totalCost()+ `</li>` : `<li>click edit to add drinks to this order</li>`
  }

  renderAll() {
    return `<div id='order-show'><ul class="show-list" id='order-show-list'><li>${this.client}</li><li>${this.date}</li><ul>${this.renderDrinkOrderTotal()}</ul></ul><button id='edit-order' data-id="${this.id}">edit</button><button id='delete-order' data-id="${this.id}">delete</button></div>`
  }

  totalCost() {
    return this.drink_orders.map(drink_order => {
      return Drink.getDrinkById(drink_order.drink_id).price * drink_order.quantity
    }).reduce(function (a, b) {
      return a + b
    })
  }

  renderForm() {
    return `<form id="edit-order-form" data-id="${this.id ? this.id : ''}"><label>Client:</label><input id='client' type="text" value="${this.client ? this.client : ''}"></input></br><label>Date:</label><input id='date' type="text" value="${this.date ? this.date : ''}"></input></br>${this.id ? Drink.all.map(drink => drink.renderDrinkOrderDisplay()).join(''): ''}<input type='submit' id="${this.id ? 'submit-edit-order': 'submit-new-order'}" data-id="order" value='submit'></input><form>`
  }

  setFormDrinkQuantityValue() {
    this.drink_orders.forEach(drinkOrder => {
      [...document.getElementsByClassName('order-drink')].forEach(element => {
        if (parseInt(element.dataset.id) === drinkOrder.drink_id) {
          element.value = drinkOrder.quantity
        }
      })
    })
  }

  editName() {
    document.getElementById(`order-name-display-${this.id}`).innerHTML = `<h3 id="order-name" data-id="${this.id}">${this.client}</h3>`
  }

  static getOrderById(id) {
    return Order.all.find(order => order.id === id)
  }

  static deleteOrderMemory(json) {
    Order.all = Order.all.filter(order => order.id !== json.id)
  }

  static deleteDrinkOrderMemory(drinkId) {
    Order.all = Order.all.map(order => {
      order.drink_orders = order.drink_orders.filter(drinkOrder => drinkOrder.drink_id !== drinkId)
      return order
    })
  }
}

Order.all = []
