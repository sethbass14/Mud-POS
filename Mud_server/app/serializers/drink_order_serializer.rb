class DrinkOrderSerializer < ActiveModel::Serializer
  attributes :id, :order_id, :drink_id, :quantity
  # belongs_to :order, serializer: OrderSerializer
  # belongs_to :drink
end
