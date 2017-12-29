function showList(obj, domElement) {
  domElement.innerHTML += obj.renderName()
}

function nameHandler(domElement) {
  return event => {
    event.preventDefault();
    clearSpace(domElement)
    let string
    const id = parseInt(event.target.dataset.id)
    if (event.target.id === 'drink-name') {
      string = Drink.getDrinkById(id).renderAll()
    } else if (event.target.id === 'order-name') {
      string = Order.getOrderById(id).renderAll()
    }
    renderSpace(domElement, string)
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


function showSpaceHandler(domWorkSpace, domShowSpace) {
  return event => {
    event.preventDefault();
    const id = parseInt(event.target.dataset.id)
    switch(event.target.id) {
      case 'edit-drink':
        renderSpace(domWorkSpace, Drink.getDrinkById(id).renderForm())
        break;
      case 'delete-drink':
        deleteDrink(id, domShowSpace)
        break;
      case 'edit-order':
        renderSpace(domWorkSpace, Order.getOrderById(id).renderForm())
        break;
      case 'delete-order':
        deleteOrder(id, domShowSpace)
        console.log(4)
        break;
    }
  }
}


function newFormHandler(domWorkSpace, domShow) {
  return event => {
    event.preventDefault();
    clearSpace(domWorkSpace)
    switch(event.target.id) {
      case 'new-drink':
      renderSpace(domWorkSpace, new Drink({}).renderForm())
      break;
      case 'new-order':
      renderSpace(domWorkSpace, new Order({}).renderForm())
    }
  }
}

function workSpaceHandler(domShow, workSpace, domDrinkNames, domOrderClients) {
  return event => {
    console.log(event.target)
    console.log(event.target.dataset.id)
    event.preventDefault();
    switch(event.target.dataset.id) {
      case 'drink':
        drinkFormHandler(domShow, domDrinkNames);
        break;
      case 'order':
        orderFormHandler(domShow, domOrderClients)
    }
    if (event.target.type === 'submit') {
      clearSpace(workSpace)
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
    drink.editName()
  }
  clearSpace(domShow)
  renderSpace(domShow, drink.renderAll())
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
    order.editName()
  }
  clearSpace(domShow);
  renderSpace(domShow, order.renderAll())
}

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}

// function setDrinkId(drinkObj) {
//   document.getElementById(`drink-name-display-undefined`).id = `drink-name-display-${drinkObj.id}`
// }
