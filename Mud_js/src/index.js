document.addEventListener('DOMContentLoaded', function() {

const drinkUl = document.getElementById('drink-names')

DrinkAdapter.getDrinks().then(json => {
  console.log(json);
  json.forEach(drinkObj => {
    console.log(drinkObj)
    const newDrink = new Drink(drinkObj);
    drinkList(drinkUl, newDrink)
  })
})





})
