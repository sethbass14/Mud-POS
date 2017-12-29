function deleteDrink(id, domShowSpace) {
  document.getElementById(`drink-name-display-${parseInt(id)}`).remove()
  DrinkAdapter.deleteDrink(event.target.dataset.id).then(resp => {
    Drink.deleteDrinkMemory(resp);
    renderSpace(domShowSpace, `<p>${resp.message}</p>`);
  });
  clearSpace(domShowSpace)
}

function setDrinkId(drinkObj) {
  document.getElementById(`drink-name-display-undefined`).id = `drink-name-display-${drinkObj.id}`
}

function newDrink(name, description, price) {
  const newDrink = new Drink({name: name, description: description, price: price});
  DrinkAdapter.postNewDrink(newDrink).then(drinkObj => {
     setDataId(drinkObj);
     setDrinkId(drinkObj)
     new Drink(drinkObj)
  });
  return newDrink
}

function editDrink(name, description, price) {
  const updateDrink = Drink.getDrinkById(parseInt(event.target.parentElement.dataset.id));
  updateDrink.name = name;
  updateDrink.description = description;
  updateDrink.price = price;
  DrinkAdapter.postEditDrink(updateDrink)
  return updateDrink
}
