document.addEventListener('DOMContentLoaded', function() {

const drinkNames = document.getElementById('drink-names')
const showSpace = document.getElementById('showspace')
const orderClients = document.getElementById('order-clients')
const workSpace = document.getElementById('workspace')
const newDrink = document.getElementById('new-drink')
const newOrder = document.getElementById('new-order')

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

drinkNames.addEventListener('click', nameHandler(showSpace, workSpace));
orderClients.addEventListener('click', nameHandler(showSpace, workSpace));
showSpace.addEventListener('click', showSpaceHandler(workSpace, showSpace));
newDrink.addEventListener('click', newFormHandler(workSpace, showSpace));
newOrder.addEventListener('click', newFormHandler(workspace, showSpace));
workSpace.addEventListener('click', workSpaceHandler(showSpace, workSpace, drinkNames, orderClients));





})
