function setDrinkOrderIdDom(order_id, drinkOrderObj) {
  Order.getOrderById(order_id).drink_orders.map(dO => {
    if (dO.id === undefined) {
      dO.id = drinkOrderObj.id
    }
  })
}

function newDrinkOrder(orderId, drinkId, drinkQuantity, orderObj) {
  const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: drinkId, quantity: drinkQuantity})
  DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder).then(dO => {
    setDataId(dO)
    setDrinkOrderIdDom(orderId, dO)
  })
  // this should be an instance method for Order
  orderObj.drink_orders.push(newDrinkOrder);
  orderObj.drink_ids.push(drinkId)
}
