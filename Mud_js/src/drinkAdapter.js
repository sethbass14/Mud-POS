class DrinkAdapter {
  static getDrinks() {
    return fetch('http://localhost:3000/api/v1/drinks').then(resp => resp.json())
  }
}
