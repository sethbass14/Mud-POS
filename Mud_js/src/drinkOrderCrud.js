function setDrinkOrderIdDom(orderId, drinkId, drinkOrderObj) {
  Order.getOrderById(orderId).drink_orders.map(dO => {
    // if (dO.id === undefined) {
    if (dO.drink_id === drinkId) {
      dO.id = drinkOrderObj.id
    }
  })
}

function newDrinkOrder(orderId, drinkId, drinkQuantity, orderObj) {
  const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: drinkId, quantity: drinkQuantity})
  // debugger
  DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder).then(dO => {
    setDataId(dO)
    setDrinkOrderIdDom(orderId, drinkId, dO)
  })
  // this should be an instance method for Order
  orderObj.drink_orders.push(newDrinkOrder);
  orderObj.drink_ids.push(drinkId)
}

function deleteDrinkOrderFront(drinkOrderObj, orderObj) {
  DrinkOrderAdapter.deleteDrinkOrder(drinkOrderObj).then(drinkOrderObj => DrinkOrder.deleteDrinkOrderMemory(drinkOrderObj))
  orderObj.drink_orders = orderObj.drink_orders.filter(dO => dO.id !== drinkOrderObj.id )
  orderObj.drink_ids = orderObj.drink_ids.filter(id => id !== drinkOrderObj.drink_id)
}

function updateDrinkOrderFront(drinkOrder, drinkQuantity) {
  drinkOrder.quantity = drinkQuantity,
  DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
}
