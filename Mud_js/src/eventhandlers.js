function showList(obj, domElement) {
  domElement.innerHTML += obj.renderName()
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
  domElement.innerHTML += string
}

function clearSpace(domElement) {
  if (domElement.children.length > 1) {
    domElement.removeChild(domElement.children[1])
  }
}


function showSpaceHandler(domWorkSpace, domShowSpace) {
  return event => {
    event.preventDefault();
    clearSpace(domWorkSpace);
    const id = parseInt(event.target.dataset.id)
    switch(event.target.id) {
      case 'edit-drink':
        console.log(1)
        renderSpace(domWorkSpace, Drink.getDrinkById(id).renderForm())
        break;
      case 'delete-drink':
        document.getElementById(`drink-name-display-${parseInt(event.target.dataset.id)}`).remove()
        DrinkAdapter.deleteDrink(event.target.dataset.id).then(resp => renderSpace(domShowSpace, resp.message));
        clearSpace(domShowSpace)
        // debugger
        break;
      case 'edit-order':
        console.log(3)
        renderSpace(domWorkSpace, Order.getOrderById(id).renderEditForm())
        break;
      case 'delete-order':
        console.log(4)
        break;
    }
  }
}

function newDrinkSpaceHandler(domNewDrink, domShow, domDrinkNames) {
  return event => {
    event.preventDefault();
    switch(event.target.id) {
      case 'new-drink':
        clearSpace(domNewDrink)
        renderSpace(domNewDrink, new Drink({}).renderForm())
        break;
      case 'submit':
        const name = document.getElementById('name').value
        const description = document.getElementById('description').value
        const price = parseFloat(document.getElementById('price').value)
        const newDrink = new Drink({name: name, description: description, price: price })
        DrinkAdapter.postNewDrink(newDrink).then(drinkObj => { setDataId(drinkObj);
        setId(drinkObj)})
        clearSpace(domShow)
        renderSpace(domShow, newDrink.renderAll());
        renderSpace(domDrinkNames, newDrink.renderName());
        clearSpace(domNewDrink);
        break;
    }
  }
}

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}

function setId(drinkObj) {
  document.getElementById(`drink-name-display-undefined`).id = `drink-name-display-${drinkObj.id}`
}
