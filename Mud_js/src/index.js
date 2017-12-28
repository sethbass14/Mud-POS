document.addEventListener('DOMContentLoaded', function() {

const drinkNames = document.getElementById('drink-names')
const showSpace = document.getElementById('showspace')
const orderClients = document.getElementById('order-clients')
const workSpace = document.getElementById('workspace')
const newDrink = document.getElementById('new-drink')
const newDrinkSpace = document.getElementById('new-drink-space')

DrinkAdapter.getDrinks().then(json => {
  json.forEach(drinkObj => {
    const newDrink = new Drink(drinkObj);
    showList(newDrink, drinkNames)
  })
});

OrderAdapter.getOrders().then(json => {
  json.forEach(orderObj => {
    const newOrder = new Order(orderObj);
    showList(newOrder, orderClients)
  })
});

drinkNames.addEventListener('click', nameHandler(showSpace));
orderClients.addEventListener('click', nameHandler(showSpace));
showSpace.addEventListener('click', showSpaceHandler(workSpace, showSpace))
newDrinkSpace.addEventListener('click', newDrinkSpaceHandler(newDrinkSpace, showSpace, drinkNames));






})
