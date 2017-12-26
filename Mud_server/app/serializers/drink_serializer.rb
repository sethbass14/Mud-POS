class DrinkSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price
  has_many :orders
end
