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
        Drink.all = Drink.all.filter(drink => drink.id !== undefined)
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
          updateDrinkOrderFront(drinkOrder, drinkQuantity)
       } else if (drinkQuantity === 0 ) {
         deleteDrinkOrderFront(drinkOrder, workOrder)
       }
     } else if (drinkQuantity > 0) {
        newDrinkOrder(orderId, drinkId, drinkQuantity, workOrder)
      }
    })
}


function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}
