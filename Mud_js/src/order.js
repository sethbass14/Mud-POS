class Order {
  constructor(orderObj) {
    this.id = orderObj.id,
    this.client = orderObj.client,
    this.date = orderObj.date,
    this.drinks = orderObj.drinks,
    Order.all.push(this)
  }

  renderName() {
    return `<div id="order-name-display"data-id="${this.id}"><h3 id="order-name" data-id="${this.id}">${this.client}</h3></div>`
  }

  renderAll() {
    return `<div id='order-show'><ul class="show-list" id='order-show-list'><li>${this.client}</li><li>${this.date}</li></ul></div>`
  }
}

Order.all = []
