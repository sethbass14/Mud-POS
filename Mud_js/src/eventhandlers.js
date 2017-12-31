function showList(obj, domElement) {
  domElement.innerHTML += obj.renderName()
}

function nameHandler(domElement, domWorkSpace) {
  return event => {
    event.preventDefault();
    clearSpace(domWorkSpace)
    clearSpace(domElement)
    let string
    const id = parseInt(event.target.dataset.id)
    if (event.target.id === 'drink-name') {
      string = Drink.getDrinkById(id).renderAll()
    } else if (event.target.id === 'order-name') {
      string = Order.getOrderById(id).renderAll()
    }
    if (string) {
      renderSpace(domElement, string)
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

// refactor this below
function showSpaceHandler(domWorkSpace, domShowSpace, domNameSpace ) {
  return event => {
    event.preventDefault();
    const id = parseInt(event.target.dataset.id)
    switch(event.target.id) {
      case 'edit-drink':
        clearSpace(domWorkSpace)
        renderSpace(domWorkSpace, Drink.getDrinkById(id).renderForm())
        break;
      case 'delete-drink':
        clearSpace(domWorkSpace)
        deleteDrink(id, domShowSpace)
        break;
      case 'edit-order':
        clearSpace(domWorkSpace)
        renderSpace(domWorkSpace, Order.getOrderById(id).renderForm())
        Order.getOrderById(id).setFormDrinkQuantityValue()
        break;
      case 'delete-order':
        clearSpace(domWorkSpace)
        deleteOrder(id, domShowSpace)
        break;
    }
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
      // drinkOrderCheck()
    }
    if (event.target.type === 'submit') {
       clearSpace(workSpace)
       clearSpace(domShow);
       renderSpace(domShow, model.renderAll())
    }
  }
}

// function drinkOrderHandler () {
//
// }


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

// function drinkOrderCheck() {
//   const arr = [...document.getElementsByClassName('order-drink')]
//   const orderId = parseInt(document.getElementById('edit-order').dataset.id)
//   arr.forEach(element => {
//     if (parseInt(element.value) > 0) {
//       if (Order.getOrderById(orderId).drink_ids.includes(parseInt(element.dataset.id))) {
//          const drinkOrder = DrinkOrder.getDoByOrderIdDrinkId(orderId, parseInt(element.dataset.id))
//          drinkOrder.quantity = parseInt(element.value)
//          debugger
//          DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
//       } else {
//         const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: parseInt(element.dataset.id), quantity: parseInt(element.value)})
//         Order.getOrderById(orderId).drink_orders.push(newDrinkOrder)
//         DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder)
//       }
//     }
//   })
// }

function drinkOrderCheck() {
  const arr = [...document.getElementsByClassName('order-drink')]
  const orderId = parseInt(document.getElementById('edit-order').dataset.id)
  arr.forEach(element => {
      // debugger
      if (Order.getOrderById(orderId).drink_ids.includes(parseInt(element.dataset.id))) {
        const drinkOrder = DrinkOrder.getDoByOrderIdDrinkId(orderId, parseInt(element.dataset.id))
        if (parseInt(element.value) > 0 && drinkOrder.quantity !== parseInt(element.value)) {
         drinkOrder.quantity = parseInt(element.value)
         DrinkOrderAdapter.updateDrinkOrder(drinkOrder)
       } else if (parseInt(element.value) === 0 ) {
         console.log(drinkOrder)
         DrinkOrderAdapter.deleteDrinkOrder(drinkOrder)

         Order.getOrderById(orderId).drink_orders = Order.getOrderById(orderId).drink_orders.filter(dO => dO.id !== drinkOrder.id )
         Order.getOrderById(orderId).drink_ids = Order.getOrderById(orderId).drink_ids.filter(id => id !== drinkOrder.drink_id)
       }
      } else if (parseInt(element.value) > 0) {
        const newDrinkOrder = new DrinkOrder({order_id: orderId, drink_id: parseInt(element.dataset.id), quantity: parseInt(element.value)})
        DrinkOrderAdapter.postNewDrinkOrder(newDrinkOrder).then(dO => {
          console.log(dO)
          setDataId(dO)
          setDrinkOrderIdDom(orderId, dO)
        })
        Order.getOrderById(orderId).drink_orders.push(newDrinkOrder);
        Order.getOrderById(orderId).drink_ids.push(parseInt(element.dataset.id))

      }
    })
}

function setDrinkOrderIdDom(order_id, drinkOrderObj) {
  Order.getOrderById(order_id).drink_orders.map(dO => {
    if (dO.id === undefined) {
      console.log(dO)
      console.log(drinkOrderObj)
      dO.id = drinkOrderObj.id
    }
  })
}

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}
