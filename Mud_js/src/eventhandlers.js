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

function renderSpace(domElement1, string1, domElement2, string2) {
  domElement1.innerHTML += string1;
    if (domElement2) {
      domElement2.innerHTML += string2
    }
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
        renderSpace(domWorkSpace, Drink.getDrinkById(id).renderForm())
        break;
      case 'delete-drink':
        deleteDrink(id, domShowSpace)
        break;
      case 'edit-order':
        renderSpace(domWorkSpace, Order.getOrderById(id).renderEditForm())
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
    renderSpace(domShowSpace, `<p>${resp.message}</p>`);
  });
  clearSpace(domShowSpace)
}

function newDrinkSpaceHandler(domNewDrink, domShow, domDrinkNames) {
  return event => {
    event.preventDefault();
    switch(event.target.id) {
      case 'new-drink':
        clearSpace(domNewDrink)
        renderSpace(domNewDrink, new Drink({}).renderForm())
        break;
      case 'submit-drink':
        makeNewDrink(domShow, domDrinkNames, domNewDrink)
        break;
    }
  }
}

function workSpaceHandler(domShow) {
  return event => {
    event.preventDefault();
    switch(event.target.id) {
      case 'submit-drink':
        editDrink(domShow, event)
    }
  }

}

function editDrink(domShow, event) {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const updateDrink = Drink.getDrinkById(parseInt(event.target.parentElement.dataset.id));
  debugger
  updateDrink.name = name;
  updateDrink.description = description;
  updateDrink.price = price;
  DrinkAdapter.postEditDrink(updateDrink)
  clearSpace(domShow)
  renderSpace(domShow, updateDrink.renderAll())
}

//Reuse this function for updating a drink
function makeNewDrink(domShow, domDrinkNames, domNewDrink, event) {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const newDrink = new Drink({name: name, description: description, price: price});
  debugger
  DrinkAdapter.postNewDrink(newDrink).then(drinkObj => {
     setDataId(drinkObj);
     setId(drinkObj)
     new Drink(drinkObj)
  });
  clearSpace(domShow)
  renderSpace(domShow, newDrink.renderAll(), domDrinkNames, newDrink.renderName());
  clearSpace(domNewDrink);
}

function setDataId(obj) {
  document.querySelectorAll('[data-id=undefined]').forEach(element => element.dataset.id = obj.id)
}

function setId(drinkObj) {
  document.getElementById(`drink-name-display-undefined`).id = `drink-name-display-${drinkObj.id}`
}
