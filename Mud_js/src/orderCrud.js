function setOrderId(orderObj) {
  document.getElementById(`order-name-display-undefined`).id = `order-name-display-${orderObj.id}`
}

function newOrder(client, date,) {
  const newOrder = new Order({client: client, date: date});
  OrderAdapter.postNewOrder(newOrder).then(OrderObj => {
     setDataId(OrderObj);
     setOrderId(OrderObj)
     new Order(OrderObj)
  });
  return newOrder
}
