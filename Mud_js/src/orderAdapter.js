class OrderAdapter {
  static getOrders() {
    return fetch('http://localhost:3000/api/v1/orders').then(resp => resp.json())
  }

}
