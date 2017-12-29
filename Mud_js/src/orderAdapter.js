class OrderAdapter {
  static getOrders() {
    return fetch('http://localhost:3000/api/v1/orders').then(resp => resp.json())
  }

  static postNewOrder(orderObj) {
    return fetch('http://localhost:3000/api/v1/orders', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(orderObj)
    }).then(resp => resp.json())
  }

  static postEditOrder(orderObj) {
    return fetch(`http://localhost:3000/api/v1/orders/${orderObj.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(orderObj)
    }).then(resp => resp.json())
  }

}
