class DrinkOrderAdapter {
  static postNewDrinkOrder(drinkOrderObj) {
    fetch('http://localhost:3000/api/v1/drink_orders', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(drinkOrderObj)
    }).then(resp => resp.json())
  }

  static updateDrinkOrder(drinkOrderObj) {
    fetch(`http://localhost:3000/api/v1/drink_orders/${drinkOrderObj.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(drinkOrderObj)
    }).then(resp => resp.json())
  }
}
