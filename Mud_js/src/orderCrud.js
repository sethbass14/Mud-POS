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

function editOrder(client, date, domShow) {
  const updateOrder = Order.getOrderById(parseInt(event.target.parentElement.dataset.id));
  updateOrder.client = client;
  updateOrder.date = date;
  OrderAdapter.postEditOrder(updateOrder)
  updateOrder.editName()
  return updateOrder
}

function deleteOrder(id, domShowSpace) {
  document.getElementById(`order-name-display-${parseInt(id)}`).remove()
  OrderAdapter.deleteOrder(event.target.dataset.id).then(resp => {
    Order.deleteOrderMemory(resp);
    renderSpace(domShowSpace, `<p>${resp.message}</p>`);
  });
  clearSpace(domShowSpace)
}
