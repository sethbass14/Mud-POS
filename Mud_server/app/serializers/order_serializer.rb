class OrderSerializer < ActiveModel::Serializer
  attributes :id, :client, :date
  has_many :drink_orders
  has_many :drinks
  has_many :drink_ids
end
