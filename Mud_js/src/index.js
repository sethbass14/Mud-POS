document.addEventListener('DOMContentLoaded', function() {

const drinkNames = document.getElementById('drink-names')
const showSpace = document.getElementById('showspace')
const orderClients = document.getElementById('order-clients')

DrinkAdapter.getDrinks().then(json => {
  json.forEach(drinkObj => {
    const newDrink = new Drink(drinkObj);
    drinkList(newDrink, drinkNames)
  })
});

OrderAdapter.getOrders().then(json => {
  json.forEach(orderObj => {
    const newOrder = new Order(orderObj);
    console.log(newOrder)
    orderList(newOrder, orderClients)
  })
});

drinkNames.addEventListener('click', drinkNameHandler(showSpace))





})
