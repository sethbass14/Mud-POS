function setOrderId(orderObj) {
  debugger
  document.getElementById(`order-name-display-undefined`).id = `order-name-display-${orderObj.id}`
}

function newOrder(client, date) {
  const newOrder = new Order({client: client, date: date});
  console.log(newOrder)
  OrderAdapter.postNewOrder(newOrder).then(OrderObj => {
     setDataId(OrderObj);
     setOrderId(OrderObj)
     new Order(OrderObj)
  });
  return newOrder
}
