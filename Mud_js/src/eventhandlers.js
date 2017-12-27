function drinkList(drink, domElement) {
  domElement.innerHTML += drink.renderName()
}

function orderList(order, domElement) {
  console.log(domElement)
  domElement.innerHTML += order.renderName()
}

function drinkNameHandler(domElement) {
  return function(event) {
    event.preventDefault();
    clearShowSpace(domElement)
    domElement.innerHTML += Drink.getDrinkById(parseInt(event.target.dataset.id)).renderAll()
  }
}

function clearShowSpace(domElement) {
  if (domElement.children.length > 1) {
    domElement.removeChild(domElement.children[1])
  }
}
