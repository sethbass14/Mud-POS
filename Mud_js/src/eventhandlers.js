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
    let string
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
        console.log(4)
        break;
    }
  }
}

function deleteDrink(id, domShowSpace) {
  document.getElementById(`drink-name-display-${parseInt(id)}`).remove()
  DrinkAdapter.deleteDrink(event.target.dataset.id).then(resp => {
    Drink.deleteDrinkMemory(resp);
    renderSpace(domShowSpace, `<p>${resp.message}</p>`);
  });
  clearSpace(domShowSpace)
}


function workSpaceHandler(domShow, workSpace, domDrinkNames) {
  return event => {
    console.log(event.target.type)
    event.preventDefault();
    switch(event.target.id) {
      case 'submit-edit-drink':
        drinkFormHandler(domShow);
      case 'submit-new-drink':
        drinkFormHandler(domShow, domDrinkNames);
    }
    if (event.target.type === 'submit') {
      clearSpace(workSpace)
    }
  }
}

function formHandler(domWorkSpace, domShow) {
  return event => {
    event.preventDefault();
    switch(event.target.id) {
      case 'new-drink':
      clearSpace(domWorkSpace)
      renderSpace(domWorkSpace, new Drink({}).renderForm())
      break;
    }
  }
}

function newDrink(name, description, price, domShow, domDrinkNames) {
  const newDrink = new Drink({name: name, description: description, price: price});
  DrinkAdapter.postNewDrink(newDrink).then(drinkObj => {
     setDataId(drinkObj);
     setId(drinkObj)
     new Drink(drinkObj)
  });
  return newDrink
}

function editDrink(name, description, price, domShow) {
  const updateDrink = Drink.getDrinkById(parseInt(event.target.parentElement.dataset.id));
  updateDrink.name = name;
  updateDrink.description = description;
  updateDrink.price = price;
  DrinkAdapter.postEditDrink(updateDrink)
  return updateDrink
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

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}

function setId(drinkObj) {
  document.getElementById(`drink-name-display-undefined`).id = `drink-name-display-${drinkObj.id}`
}
