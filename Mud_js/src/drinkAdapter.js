class DrinkAdapter {
  static getDrinks() {
    return fetch('http://localhost:3000/api/v1/drinks').then(resp => resp.json())
  }

  static postNewDrink(drinkObj) {
    return fetch('http://localhost:3000/api/v1/drinks', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(drinkObj)
    }).then(resp => resp.json())
  }
}
