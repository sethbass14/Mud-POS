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
      console.log(model)
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
  }
  return order
}

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}
