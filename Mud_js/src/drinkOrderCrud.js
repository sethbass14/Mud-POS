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

//below is a bad problem. I should instantiate drink orders seperately from the order
function deleteDrinkOrderFromDrinkDelete(id) {
  const arr = DrinkOrder.all.filter(drinkOrder => drinkOrder.drink_id === id)
  arr.map(drinkOrder => {
    DrinkOrderAdapter.deleteDrinkOrder(drinkOrder)
    DrinkOrder.all = DrinkOrder.all.filter(dO => dO.id !== drinkOrder.id)
  })

}

//edited on 2/21/18

function deleteDrinkOrderFront(drinkOrderObj, orderObj) {
  // DrinkOrderAdapter.deleteDrinkOrder(drinkOrderObj).then(drinkOrderObj => DrinkOrder.deleteDrinkOrderMemory(drinkOrderObj))
  DrinkOrder.deleteDrinkOrderMemory(drinkOrderObj)
  orderObj.drink_orders = orderObj.drink_orders.filter(dO => dO.id !== drinkOrderObj.id )
  orderObj.drink_ids = orderObj.drink_ids.filter(id => id !== drinkOrderObj.drink_id)
}

//edited on 2/21/18
function updateDrinkOrderFront(drinkOrder, drinkQuantity) {
  drinkOrder.quantity = drinkQuantity
  // DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
}
