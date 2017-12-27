function drinkList(drink, domElement) {
  domElement.innerHTML += drink.renderName()
}

function orderList(order, domElement) {
  domElement.innerHTML += order.renderName()
}

function nameHandler(domElement) {
  return event => {
    event.preventDefault();
    clearSpace(domElement)
    const id = parseInt(event.target.dataset.id)
    if (event.target.id === 'drink-name') {
      renderSpace(domElement, Drink.getDrinkById(id).renderAll())
    } else if (event.target.id === 'order-name') {
      renderSpace(domElement, Order.getOrderById(id).renderAll())
    }
  }
}

function renderSpace(domElement, string) {
  console.log(string)
  domElement.innerHTML += string
}

function clearSpace(domElement) {
  if (domElement.children.length > 1) {
    domElement.removeChild(domElement.children[1])
  }
}

function showSpaceHandler(domElement) {
  return event => {
    event.preventDefault();
    clearSpace(domElement);
    const id = parseInt(event.target.dataset.id)
    switch(event.target.id) {
      case 'edit-drink':
        console.log(1)
        renderSpace(domElement, Drink.getDrinkById(id).renderForm())
        break;
      case 'delete-drink':
        console.log(2)
        break;
      case 'edit-order':
        console.log(3)
        renderSpace(domElement, Order.getOrderById(id).renderEditForm())
        break;
      case 'delete-order':
        console.log(4)
        break;
    }
  }
}

function newDrinkSpaceHandler(domElement, domElement2) {
  return event => {
    event.preventDefault();
    console.log(event.target)
    switch(event.target.id) {
      case 'new-drink':
        clearSpace(domElement)
        renderSpace(domElement, new Drink({}).renderForm())
        break;
      case 'submit':
        console.log(1)
        const name = document.getElementById('name').value
        const description = document.getElementById('description').value
        const price = parseFloat(document.getElementById('price').value)
        // console.log({name: name, description: description, price: price })
        DrinkAdapter.postNewDrink({name: name, description: description, price: price })
        break;
    }
  }
}
