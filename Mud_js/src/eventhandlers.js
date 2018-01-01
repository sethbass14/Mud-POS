function showList(obj, domElement) {
  domElement.innerHTML += obj.renderName()
}

function nameHandler(domElement, domWorkSpace) {
  return event => {
    event.preventDefault();
    clearSpace(domWorkSpace)
    clearSpace(domElement)
    let htmlString
    const id = parseInt(event.target.dataset.id)
    if (event.target.id === 'drink-name') {
      htmlString = Drink.getDrinkById(id).renderAll()
    } else if (event.target.id === 'order-name') {
      htmlString = Order.getOrderById(id).renderAll()
    }
    if (htmlString) {
      renderSpace(domElement, htmlString)
    }
  }
}

function renderSpace(domElement, string) {
  domElement.innerHTML += string;
}

function clearSpace(domElement) {
  if (domElement.children.length > 1) {
    domElement.removeChild(domElement.children[1])
  }
}

function showSpaceHandler(domWorkSpace, domShowSpace, domNameSpace ) {
  return event => {
    event.preventDefault();
    const id = parseInt(event.target.dataset.id)
    if (event.target.tagName === "BUTTON") {
      clearSpace(domWorkSpace)
    }
    if (event.target.parentElement.id === "drink-show") {
      drinkShowSpaceHandler(domWorkSpace, domShowSpace, domNameSpace, id)
    } else if (event.target.parentElement.id === "order-show") {
      orderShowSpaceHandler(domWorkSpace, domShowSpace, domNameSpace, id)
    }
  }
}

function orderShowSpaceHandler(domWorkSpace, domShowSpace, domNameSpace, id) {
  if (event.target.id === "edit-order") {
    renderSpace(domWorkSpace, Order.getOrderById(id).renderForm());
    Order.getOrderById(id).setFormDrinkQuantityValue()
  } else if (event.target.id === 'delete-order') {
    deleteOrder(id, domShowSpace)
  }
}

function drinkShowSpaceHandler(domWorkSpace, domShowSpace, domNamesSpace, id) {
  if (event.target.id === "edit-drink") {
    renderSpace(domWorkSpace, Drink.getDrinkById(id).renderForm())
  } else if (event.target.id === 'delete-drink') {
    deleteDrink(id, domShowSpace)
  }
}


function newFormHandler(domWorkSpace, domShow) {
  return event => {
    event.preventDefault();
    clearSpace(domWorkSpace)
    if (event.target.id === 'new-drink') {
        renderSpace(domWorkSpace, new Drink({}).renderForm())
    } else if (event.target.id === 'new-order') {
      renderSpace(domWorkSpace, new Order({}).renderForm())
    }
  }
}

function workSpaceHandler(domShow, workSpace, domDrinkNames, domOrderClients) {
  return event => {
    event.preventDefault();
    let model
    if (event.target.dataset.id === 'drink') {
      model = drinkFormHandler(domShow, domDrinkNames)
    } else if (event.target.dataset.id === 'order') {
      model = orderFormHandler(domShow, domOrderClients)
    }
    if (event.target.type === 'submit') {
       clearSpace(workSpace)
       clearSpace(domShow);
       renderSpace(domShow, model.renderAll())
    }
  }
}


function drinkFormHandler(domShow, domDrinkNames) {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  let drink
  if (event.target.id === 'submit-new-drink') {
    drink = newDrink(name, description, price, domShow, domDrinkNames)
    renderSpace(domDrinkNames, drink.renderName());
  } else if (event.target.id === 'submit-edit-drink') {
    drink = editDrink(name, description, price)
  }
  return drink
}

function orderFormHandler(domShow, domOrderClients) {
  const client = document.getElementById('client').value
  const date = document.getElementById('date').value
  let order
  if (event.target.id === 'submit-new-order') {
    order = newOrder(client, date)
    renderSpace(domOrderClients, order.renderName())
  } else if (event.target.id === 'submit-edit-order') {
    order = editOrder(client, date);
    drinkOrderCheck();
  }
  return order
}


//refactor all of this for sure
// function drinkOrderCheck() {
//   const arr = [...document.getElementsByClassName('order-drink')]
//   const orderId = parseInt(document.getElementById('edit-order').dataset.id)
//   arr.forEach(element => {
//       if (Order.getOrderById(orderId).drink_ids.includes(parseInt(element.dataset.id))) {
//         const drinkOrder = DrinkOrder.getDoByOrderIdDrinkId(orderId, parseInt(element.dataset.id))
//         if (parseInt(element.value) > 0 && drinkOrder.quantity !== parseInt(element.value)) {
//          drinkOrder.quantity = parseInt(element.value)
//          DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
//        } else if (parseInt(element.value) === 0 ) {
//          DrinkOrderAdapter.deleteDrinkOrder(drinkOrder)
//          Order.getOrderById(orderId).drink_orders = Order.getOrderById(orderId).drink_orders.filter(dO => dO.id !== drinkOrder.id )
//          Order.getOrderById(orderId).drink_ids = Order.getOrderById(orderId).drink_ids.filter(id => id !== drinkOrder.drink_id)
//        }
//       } else if (parseInt(element.value) > 0) {
//         const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: parseInt(element.dataset.id), quantity: parseInt(element.value)})
//         DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder).then(dO => {
//           console.log(dO)
//           setDataId(dO)
//           setDrinkOrderIdDom(orderId, dO)
//         })
//         Order.getOrderById(orderId).drink_orders.push(newDrinkOrder);
//         Order.getOrderById(orderId).drink_ids.push(parseInt(element.dataset.id))
//
//       }
//     })
// }
function drinkOrderCheck() {
  const arr = [...document.getElementsByClassName('order-drink')]
  const orderId = parseInt(document.getElementById('edit-order').dataset.id)
  const workOrder = Order.getOrderById(orderId)
  arr.forEach(element => {
      const drinkId = parseInt(element.dataset.id)
      const drinkQuantity = parseInt(element.value)
      if (workOrder.drink_ids.includes(drinkId)) {
        const drinkOrder = DrinkOrder.getDoByOrderIdDrinkId(orderId, drinkId)
        if (drinkQuantity > 0 && drinkOrder.quantity !== drinkQuantity) {
         drinkOrder.quantity = drinkQuantity
         DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
       } else if (drinkQuantity === 0 ) {
         deleteDrinkOrderFront(drinkOrder, workOrder)
        //  DrinkOrderAdapter.deleteDrinkOrder(drinkOrder)
        //  workOrder.drink_orders = workOrder.drink_orders.filter(dO => dO.id !== drinkOrder.id )
        //  workOrder.drink_ids = workOrder.drink_ids.filter(id => id !== drinkOrder.drink_id)
       }
     } else if (drinkQuantity > 0) {
        newDrinkOrder(orderId, drinkId, drinkQuantity, workOrder)
      }
    })
}

function deleteDrinkOrderFront(drinkOrderObj, orderObj) {
  DrinkOrderAdapter.deleteDrinkOrder(drinkOrderObj).then(drinkOrderObj => DrinkOrder.deleteDrinkOrderMemory(drinkOrderObj))
  orderObj.drink_orders = orderObj.drink_orders.filter(dO => dO.id !== drinkOrderObj.id )
  orderObj.drink_ids = orderObj.drink_ids.filter(id => id !== drinkOrderObj.drink_id)
}

// function newDrinkOrder(orderId, drinkId, drinkQuantity, orderObj) {
//   const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: drinkId, quantity: drinkQuantity})
//   DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder).then(dO => {
//     setDataId(dO)
//     setDrinkOrderIdDom(orderId, dO)
//   })
//   orderObj.drink_orders.push(newDrinkOrder);
//   orderObj.drink_ids.push(drinkId)
// }

// function setDrinkOrderIdDom(order_id, drinkOrderObj) {
//   Order.getOrderById(order_id).drink_orders.map(dO => {
//     if (dO.id === undefined) {
//       dO.id = drinkOrderObj.id
//     }
//   })
// }

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}
